"use client";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Clock, AlertCircle, FileText } from "lucide-react";
import { projects } from "@/lib/mockData";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

interface Task {
  id: number;
  title: string;
  status: string;
  time: string;
  contractor: string;
  critical: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "In Progress"
      ? "bg-amber-400/20 text-amber-700 dark:text-amber-300"
      : status === "Done"
      ? "bg-emerald-400/20 text-emerald-700 dark:text-emerald-300"
      : "bg-slate-400/20 text-slate-700 dark:text-slate-300";
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{status}</span>
  );
}

function TaskStatusIcon({ status }: { status: string }) {
  if (status === "completed") return <span className="w-4 h-4 text-emerald-500">●</span>;
  if (status === "in-progress") return <span className="w-4 h-4 text-amber-500">●</span>;
  return <span className="w-4 h-4 text-slate-300">○</span>;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId;
  const project = projects.find((p) => String(p.id) === String(projectId));
  const projectName = project ? project.name : "Project";

  if (!project) return <div className="p-8">Project not found.</div>;

  return (
    <div className="flex flex-col min-h-screen p-8">
      <BreadcrumbNav
        segments={[
          { label: "Projects", href: "/" },
          { label: projectName }
        ]}
        onBack={() => router.push("/")}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Project Info Card */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Folder className="w-6 h-6 text-slate-500" />
            <div>
              <div className="text-xl font-bold">{project.name}</div>
              <div className="text-sm text-slate-500">{project.type}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Overview</div>
              <div className="text-sm">{project.description}</div>
            </div>
            <div className="flex gap-4">
              <div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Status</div>
                <StatusBadge status={project.status} />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Assignee</div>
                <div className="text-sm">{project.assignee}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Sentinel Use Case</div>
              <div className="text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-md">{project.sentinelUseCase}</div>
            </div>
          </div>
        </Card>

        {/* Action Plan Filesystem Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-500" />
              Today&apos;s Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {project.todayTasks?.map((task: Task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group
                    ${task.critical
                      ? 'border-l-4 border-red-500 bg-slate-800/70 dark:bg-slate-900/60'
                      : 'border-l-4 border-transparent bg-slate-800/40 dark:bg-slate-900/40'}
                    hover:bg-slate-700/60 dark:hover:bg-slate-800/80
                  `}
                  onClick={() => router.push(`/${project.id}/${task.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <FileText className={`w-4 h-4 flex-shrink-0 mt-0.5 ${task.critical ? 'text-red-500' : 'text-slate-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-slate-100 truncate">{task.title}</span>
                      {task.critical && (
                        <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </div>
                      <span className="truncate">{task.contractor}</span>
                    </div>
                  </div>
                  <TaskStatusIcon status={task.status} />
                </div>
              ))}
            </div>
            {/* Summary Stats */}
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-sm text-slate-400">
              <span>
                {project.todayTasks?.filter((t: Task) => t.critical).length} critical tasks
              </span>
              <span>
                {project.todayTasks?.filter((t: Task) => t.status === 'completed').length} completed
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 