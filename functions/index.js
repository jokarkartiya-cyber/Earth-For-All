const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
const db = admin.firestore();

/*
  ENVIRONMENT VARIABLES (set via `firebase functions:config:set`):
    firebase functions:config:set sendgrid.api_key="YOUR_SENDGRID_API_KEY"
    firebase functions:config:set sendgrid.from_email="noreply@earthforall.org"
    firebase functions:config:set app.name="Earth For All"
    firebase functions:config:set app.url="https://spontaneous-buttercream-c771ba.netlify.app"
*/

const TYPE_LABELS = {
  pollution: "Air / Smoke Pollution",
  garbage: "Garbage / Waste",
  "animal-emergency": "Animal Emergency",
  "tree-cutting": "Illegal Tree Cutting",
  "water-pollution": "Water Pollution",
  "forest-fire": "Forest Fire",
  poaching: "Poaching / Hunting",
  other: "Environmental Issue",
};

const DEPT_NAMES = {
  "pollution-board": "Pollution Control Board",
  municipal: "Municipal Corporation",
  forest: "Forest Department",
  "animal-welfare": "Animal Welfare",
  "fire-services": "Fire Services",
  "water-resources": "Water Resources Department",
  "local-admin": "Local Administration",
};

/**
 * When a notification document is created in Firestore,
 * send an email to ALL registered users.
 */
exports.sendEmailOnNotification = functions.firestore
  .document("notifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    const notifId = context.params.notificationId;

    // Skip if email already sent
    if (notification.emailStatus === "sent") return;

    // Get SendGrid config
    const sgApiKey = functions.config().sendgrid?.api_key;
    const fromEmail = functions.config().sendgrid?.from_email || "noreply@earthforall.org";
    const appName = functions.config().app?.name || "Earth For All";
    const appUrl = functions.config().app?.url || "https://spontaneous-buttercream-c771ba.netlify.app";

    if (!sgApiKey) {
      console.error("SendGrid API key not configured. Run: firebase functions:config:set sendgrid.api_key=\"...\"");
      await snap.ref.update({ emailStatus: "failed", emailError: "SendGrid API key not configured" });
      return;
    }

    sgMail.setApiKey(sgApiKey);

    // Get ALL user emails from profiles collection
    let userEmails = [];
    try {
      const profilesSnap = await db.collection("profiles").get();
      profilesSnap.forEach((doc) => {
        const data = doc.data();
        if (data.email) userEmails.push(data.email);
      });
    } catch (err) {
      console.error("Failed to fetch profiles:", err);
      await snap.ref.update({ emailStatus: "failed", emailError: err.message });
      return;
    }

    // Also get emails from Firebase Auth users
    try {
      const listUsers = await admin.auth().listUsers();
      listUsers.users.forEach((u) => {
        if (u.email && !userEmails.includes(u.email)) {
          userEmails.push(u.email);
        }
      });
    } catch (err) {
      console.error("Failed to list auth users:", err);
      // Continue with profiles emails
    }

    if (userEmails.length === 0) {
      console.warn("No user emails found");
      await snap.ref.update({ emailStatus: "skipped", emailError: "No users found" });
      return;
    }

    // Build email content
    const category = TYPE_LABELS[notification.reportType] || notification.reportType || "Environmental";
    const deptName = DEPT_NAMES[notification.department] || notification.department || "Concerned Department";
    const reportLink = `${appUrl}/report`;

    const subject = `[${appName}] ${deptName} Responded to Your ${category} Report`;
    const html = `
      <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
        <div style="background:linear-gradient(135deg,#065f46,#047857);padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">🌍 ${appName}</h1>
        </div>

        <div style="background:#0a1a14;padding:32px;border:1px solid rgba(255,255,255,0.1);border-top:none;border-radius:0 0 12px 12px">
          <h2 style="color:#34d399;font-size:18px;margin:0 0 8px">Department Response Received</h2>
          <p style="color:#9ca3af;font-size:14px;line-height:1.6">
            <strong style="color:#e5e7eb">${deptName}</strong> has responded to a
            <strong style="color:#e5e7eb">${category}</strong> report.
          </p>

          <div style="background:#1a2e24;border-left:3px solid #3b82f6;padding:16px;margin:16px 0;border-radius:4px">
            <p style="color:#93c5fd;font-size:14px;margin:0;line-height:1.6">
              "${notification.message}"
            </p>
          </div>

          <a href="${reportLink}" style="display:inline-block;background:#dc2626;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;margin:16px 0">
            View Report Details
          </a>

          <p style="color:#6b7280;font-size:12px;margin-top:24px">
            You received this email because you are registered with ${appName}.
            <br>Earth For All — धरती सबकी है
          </p>
        </div>
      </div>
    `;

    // Send in batches of 100 (SendGrid limit)
    const batchSize = 100;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < userEmails.length; i += batchSize) {
      const batch = userEmails.slice(i, i + batchSize);
      try {
        await sgMail.sendMultiple({
          to: batch,
          from: fromEmail,
          subject,
          html,
        });
        successCount += batch.length;
      } catch (err) {
        console.error(`Batch ${i / batchSize} failed:`, err);
        failCount += batch.length;
      }
    }

    console.log(`Email sent to ${successCount} users${failCount > 0 ? `, ${failCount} failed` : ""}`);
    await snap.ref.update({
      emailStatus: failCount > 0 ? "partial" : "sent",
      emailSentTo: successCount,
      emailFailed: failCount,
      emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return;
  });
