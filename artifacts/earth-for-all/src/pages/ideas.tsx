import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Plus, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useListIdeas,
  useCreateIdea,
  useUpvoteIdea,
  getListIdeasQueryKey,
  getGetRecentIdeasQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const CATEGORIES = [
  { value: "clean-earth", label: "Clean Earth" },
  { value: "animal-welfare", label: "Animal Welfare" },
  { value: "forest", label: "Forest & Nature" },
  { value: "water", label: "Water Conservation" },
  { value: "technology", label: "Technology" },
  { value: "cities", label: "Future Cities" },
];

const CATEGORY_STYLE: Record<string, string> = {
  "clean-earth": "border-emerald-700/50 text-emerald-300 bg-emerald-900/30",
  "animal-welfare": "border-amber-700/50 text-amber-300 bg-amber-900/30",
  "forest": "border-green-700/50 text-green-300 bg-green-900/30",
  "water": "border-blue-700/50 text-blue-300 bg-blue-900/30",
  "technology": "border-indigo-700/50 text-indigo-300 bg-indigo-900/30",
  "cities": "border-orange-700/50 text-orange-300 bg-orange-900/30",
};

const ideaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  authorName: z.string().min(2, "Name must be at least 2 characters"),
});

type IdeaForm = z.infer<typeof ideaSchema>;

export default function Ideas() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: ideas, isLoading } = useListIdeas(
    activeCategory ? { category: activeCategory, limit: 50 } : { limit: 50 },
    { query: { queryKey: getListIdeasQueryKey(activeCategory ? { category: activeCategory, limit: 50 } : { limit: 50 }) } }
  );

  const createIdea = useCreateIdea({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListIdeasQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentIdeasQueryKey() });
        form.reset();
        setShowForm(false);
      },
    },
  });

  const upvote = useUpvoteIdea({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListIdeasQueryKey() });
      },
    },
  });

  const form = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
    defaultValues: { title: "", description: "", category: "", authorName: "" },
  });

  function onSubmit(data: IdeaForm) {
    createIdea.mutate({ data });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">Community Ideas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Ideas Board</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            Share your vision for a better Earth. Every idea, however small, can spark a revolution.
          </p>
          <Button
            data-testid="button-submit-idea"
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 hover:bg-amber-500 text-white border-0 h-12 px-8"
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit Your Idea
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Submit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 mb-10 max-w-2xl mx-auto"
          >
            <h2 className="text-xl font-bold text-white mb-6">Share Your Idea</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Idea Title</FormLabel>
                    <FormControl>
                      <Input data-testid="input-idea-title" placeholder="e.g. Solar-powered animal water stations" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Describe Your Idea</FormLabel>
                    <FormControl>
                      <Textarea data-testid="input-idea-description" placeholder="Explain how this idea would help..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500/50 min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-idea-category" className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-white/10">
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c.value} value={c.value} className="text-white/80 focus:bg-white/10 focus:text-white">{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="authorName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Your Name</FormLabel>
                      <FormControl>
                        <Input data-testid="input-idea-author" placeholder="Your name" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="flex gap-3">
                  <Button data-testid="button-idea-submit" type="submit" className="bg-amber-600 hover:bg-amber-500 text-white border-0" disabled={createIdea.isPending}>
                    {createIdea.isPending ? "Submitting..." : "Submit Idea"}
                  </Button>
                  <Button type="button" variant="ghost" className="text-white/50 hover:text-white" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            data-testid="filter-all"
            onClick={() => setActiveCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${!activeCategory ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              data-testid={`filter-${c.value}`}
              onClick={() => setActiveCategory(c.value === activeCategory ? undefined : c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === c.value ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Ideas Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 animate-pulse h-44" />
            ))}
          </div>
        ) : ideas && ideas.length > 0 ? (
          <motion.div initial="hidden" animate="show" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ideas.map((idea) => (
              <motion.div key={idea.id} variants={itemVariants} data-testid={`idea-card-${idea.id}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group flex flex-col">
                <div className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 border ${CATEGORY_STYLE[idea.category] ?? "border-white/20 text-white/60 bg-white/5"}`}>
                  {CATEGORIES.find((c) => c.value === idea.category)?.label ?? idea.category}
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-amber-300 transition-colors flex-1">{idea.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{idea.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-white/30 text-xs">{idea.authorName}</span>
                  <button
                    data-testid={`button-upvote-${idea.id}`}
                    onClick={() => upvote.mutate({ id: idea.id })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/30 transition-all text-xs font-semibold"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    {idea.upvotes}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Be the first to share an idea</h3>
            <p className="text-white/40">Every revolution starts with a single thought. What's yours?</p>
          </div>
        )}
      </div>
    </div>
  );
}
