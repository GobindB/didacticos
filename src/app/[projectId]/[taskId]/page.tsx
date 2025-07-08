"use client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { projects } from "@/lib/mockData";

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId;
  const taskId = params.taskId;
  const project = projects.find((p) => String(p.id) === String(projectId));
  const task = project?.todayTasks?.find((t: any) => String(t.id) === String(taskId));

  // Fallbacks for missing data
  const projectName = project ? truncate(project.name, 22) : "Project";
  const taskTitle = task ? truncate(task.title, 16) : "Task";

  return (
    <div className="flex flex-col min-h-screen p-8">
      <BreadcrumbNav
        segments={[
          { label: "Projects", href: "/" },
          { label: projectName, href: `/${projectId}` },
          { label: taskTitle }
        ]}
        onBack={() => router.push(`/${projectId}`)}
      />
      {/* Main content placeholder */}
      <div className="w-full h-96 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 text-xl">
        Task detail content goes here
      </div>
    </div>
  );
} 