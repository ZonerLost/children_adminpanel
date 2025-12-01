import { Lightbulb, FileText, Plus, BookOpenCheck, BadgeCheck, Atom } from "lucide-react";
import Button from "../../components/ui/Button";
import ClassCard from "./components/ClassCard";
import AiToolCard from "./components/AiToolCard";
import type { AiTool, ClassGroup } from "./types";

const CLASS_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: "Grade 5 Math (A)",
    students: 28,
    assignments: 5,
  },
  {
    id: 2,
    name: "Grade 6 Science",
    students: 25,
    assignments: 3,
  },
  {
    id: 3,
    name: "High School English Lit",
    students: 25,
    assignments: 7,
  },
];

const AI_TOOLS: AiTool[] = [
  {
    id: 1,
    name: "Vocabulary Builder",
    description:
      "Generate tailored vocabulary lists and practice exercises from any text or topic for specific student groups.",
    ctaLabel: "Use Tool",
  },
  {
    id: 2,
    name: "Differentiated Content",
    description:
      "Adapt reading materials and questions to various reading levels, ensuring every student can engage effectively.",
    ctaLabel: "Use Tool",
  },
  {
    id: 3,
    name: "Quiz Question Generator",
    description:
      "Automatically create a variety of quiz questions based on content (MCQs, true/false, short answer).",
    ctaLabel: "Use Tool",
  },
];

const ClassroomToolsPage = () => {
  const handleViewClassDetails = (group: ClassGroup) => {
    // later: navigate to detail route or open drawer
    console.log("View details for class", group);
  };

  const handleUseAiTool = (tool: AiTool) => {
    // later: route to each tool's workspace
    console.log("Use AI tool", tool);
  };

  return (
    <section className="space-y-8">
      {/* Page header + top CTAs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Classroom &amp; Assignment Tools
          </h1>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
            Administer classes, groups, and create tailored assignments with AI
            assistance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* orange CTAs – we override button colors to match design */}
          <Button
            pill
            variant="secondary"
            className="flex items-center gap-2 bg-brand-accent text-white hover:bg-[#ff8a58] dark:bg-brand-accent dark:hover:bg-[#ff8a58]"
          >
            <Lightbulb className="h-4 w-4" />
            Generate AI Assignment
          </Button>

          <Button
            pill
            variant="secondary"
            className="flex items-center gap-2 bg-brand-accent text-white hover:bg-[#ff8a58] dark:bg-brand-accent dark:hover:bg-[#ff8a58]"
          >
            <FileText className="h-4 w-4" />
            Build Worksheet/Quiz
          </Button>
        </div>
      </div>

      {/* Manage classes & groups */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Manage Classes &amp; Groups
            </h2>
          </div>
          <div>
            <Button
              pill
              className="flex items-center gap-2 px-4 py-1.5 text-sm"
            >
              <Plus className="h-4 w-4" />
              Create New Class/Group
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CLASS_GROUPS.map((group) => (
            <ClassCard
              key={group.id}
              item={group}
              onViewDetails={handleViewClassDetails}
            />
          ))}
        </div>
      </section>

      {/* AI-powered assignment tools */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            AI-Powered Assignment Tools
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Leverage AI to create dynamic and differentiated learning
            experiences.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {AI_TOOLS.map((tool) => {
            const icon =
              tool.id === 1 ? (
                <BookOpenCheck className="h-4 w-4" />
              ) : tool.id === 2 ? (
                <Atom className="h-4 w-4" />
              ) : (
                <BadgeCheck className="h-4 w-4" />
              );

            return (
              <AiToolCard
                key={tool.id}
                tool={tool}
                icon={icon}
                onUseTool={handleUseAiTool}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default ClassroomToolsPage;
