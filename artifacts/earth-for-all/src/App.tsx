import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";
import Home from "@/pages/home";
import CleanEarth from "@/pages/clean-earth";
import Animals from "@/pages/animals";
import Forest from "@/pages/forest";
import Water from "@/pages/water";
import Technology from "@/pages/technology";
import Ideas from "@/pages/ideas";
import Report from "@/pages/report";
import Articles from "@/pages/articles";
import Resources from "@/pages/resources";
import Platform from "@/pages/platform";
import Evidence from "@/pages/evidence";
import LiveEarth from "@/pages/live-earth";
import SolutionBank from "@/pages/solution-bank";
import MemoryProject from "@/pages/memory-project";
import Library from "@/pages/library";
import Login from "@/pages/login";
import Register from "@/pages/register";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import Profile from "@/pages/profile";
import Admin from "@/pages/admin";
import AdminSetup from "@/pages/admin-setup";
import { useDepartmentResponseWatcher, useEmailSender } from "@/components/NotificationBell";

const queryClient = new QueryClient();

function App() {
  useDepartmentResponseWatcher();
  useEmailSender();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />

              <Route>
                <ProtectedRoute>
                  <MainLayout>
                    <Switch>
                      <Route path="/" component={Home} />
                      <Route path="/clean-earth" component={CleanEarth} />
                      <Route path="/animals" component={Animals} />
                      <Route path="/forest" component={Forest} />
                      <Route path="/water" component={Water} />
                      <Route path="/technology" component={Technology} />
                      <Route path="/ideas" component={Ideas} />
                      <Route path="/report" component={Report} />
                      <Route path="/articles" component={Articles} />
                      <Route path="/resources" component={Resources} />
                      <Route path="/platform" component={Platform} />
                      <Route path="/evidence" component={Evidence} />
                      <Route path="/live-earth" component={LiveEarth} />
                      <Route path="/solution-bank" component={SolutionBank} />
                      <Route path="/memory-project" component={MemoryProject} />
                      <Route path="/library" component={Library} />
                       <Route path="/profile" component={Profile} />
                       <Route path="/admin" component={Admin} />
                       <Route path="/admin-setup" component={AdminSetup} />
                       <Route component={NotFound} />
                    </Switch>
                  </MainLayout>
                </ProtectedRoute>
              </Route>
            </Switch>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
