import { motion } from "framer-motion";
import { AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import {
  useListReports,
  useCreateReport,
  getListReportsQueryKey,
  getGetRecentReportsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const TYPES = [
  { value: "pollution", label: "Air / Smoke Pollution" },
  { value: "garbage", label: "Garbage / Waste" },
  { value: "animal-emergency", label: "Animal Emergency" },
  { value: "tree-cutting", label: "Illegal Tree Cutting" },
  { value: "water-pollution", label: "Water Pollution" },
];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
  "in-progress": "bg-blue-900/40 text-blue-300 border-blue-700/50",
  resolved: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
};

const TYPE_LABELS: Record<string, string> = {
  pollution: "Pollution",
  "animal-emergency": "Animal Emergency",
  "tree-cutting": "Tree Cutting",
  "water-pollution": "Water Pollution",
  garbage: "Garbage",
};

const reportSchema = z.object({
  type: z.string().min(1, "Select a report type"),
  description: z.string().min(10, "Please provide more detail"),
  location: z.string().min(3, "Please provide a location"),
  reporterName: z.string().optional(),
});
type ReportForm = z.infer<typeof reportSchema>;

export default function Report() {
  const queryClient = useQueryClient();
  const { data: reports, isLoading } = useListReports({ limit: 30 }, { query: { queryKey: getListReportsQueryKey({ limit: 30 }) } });

  const createReport = useCreateReport({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListReportsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentReportsQueryKey() });
        form.reset();
      },
    },
  });

  const form = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: { type: "", description: "", location: "", reporterName: "" },
  });

  function onSubmit(data: ReportForm) {
    createReport.mutate({ data });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400/70">Problem Reporting</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Report an Issue</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Spotted pollution, an injured animal, or illegal tree cutting? Report it here. Your voice can save lives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Submit a Report</h2>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Report Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-report-type" className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="What are you reporting?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-white/10">
                          {TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value} className="text-white/80 focus:bg-white/10 focus:text-white">{t.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Describe the Problem</FormLabel>
                      <FormControl>
                        <Textarea data-testid="input-report-description" placeholder="What did you see? Be specific — it helps authorities respond faster." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-500/50 min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                          <Input data-testid="input-report-location" placeholder="Street, neighborhood, city..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-500/50 pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="reporterName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Your Name (optional)</FormLabel>
                      <FormControl>
                        <Input data-testid="input-report-name" placeholder="Anonymous by default" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button data-testid="button-report-submit" type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white border-0 h-12" disabled={createReport.isPending}>
                    {createReport.isPending ? "Submitting..." : "Submit Report"}
                  </Button>
                  {createReport.isSuccess && (
                    <p className="text-emerald-400 text-sm text-center">Report submitted. Thank you for speaking up.</p>
                  )}
                </form>
              </Form>
            </div>
          </div>

          {/* Reports list */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Recent Reports</h2>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 animate-pulse h-24" />)}
              </div>
            ) : reports && reports.length > 0 ? (
              <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-4">
                {reports.map((report) => (
                  <motion.div key={report.id} variants={itemVariants} data-testid={`report-card-${report.id}`}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="outline" className="text-xs border-red-800/50 text-red-300 bg-red-900/20 shrink-0">
                        {TYPE_LABELS[report.type] ?? report.type}
                      </Badge>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[report.status] ?? "bg-white/10 text-white/50 border-white/20"}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2 mb-2">{report.description}</p>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 text-white/30">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No reports yet. Be the first to report an issue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
