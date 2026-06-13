import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
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

const queryClient = new QueryClient();

function Router() {
  return (
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
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
