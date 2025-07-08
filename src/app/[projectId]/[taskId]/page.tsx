"use client";
import { useRouter, useParams } from "next/navigation";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { projects } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

interface Task {
  id: number;
  title: string;
  status: string;
  time: string;
  contractor: string;
  critical: boolean;
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "pending":
      return "Pending";
    default:
      return "Unknown";
  }
}

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId;
  const taskId = params.taskId;
  const project = projects.find((p) => String(p.id) === String(projectId));
  const task = project?.todayTasks?.find((t: Task) => String(t.id) === String(taskId));

  // Fallbacks for missing data
  const projectName = project ? truncate(project.name, 22) : "Project";
  const taskTitle = task ? truncate(task.title, 16) : "Task";

  // State for AI plan confirmation/editing
  const [planConfirmed, setPlanConfirmed] = useState(false);
  const [editingPlan, setEditingPlan] = useState(false);
  const [planText, setPlanText] = useState(project?.sentinelUseCase || "");
  const [planDraft, setPlanDraft] = useState(planText);

  return (
    <div className="flex flex-col h-screen">
      {/* BreadcrumbNav at the top, not padded */}
      <div className="px-8 pt-6 pb-2">
        <BreadcrumbNav
          segments={[
            { label: "Projects", href: "/" },
            { label: projectName, href: `/${projectId}` },
            { label: taskTitle }
          ]}
          onBack={() => router.push(`/${projectId}`)}
        />
      </div>
      {/* Main content fills the rest of the screen */}
      <div className="flex flex-1 gap-6 px-8 pb-6 h-0 min-h-0">
        {/* Left Column - Task Detail Card */}
        <div className="w-80 flex-shrink-0 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold">
                    {task?.title || "Task Not Found"}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {project?.name}
                  </CardDescription>
                </div>
                {task?.critical && (
                  <Badge variant="destructive" className="ml-2">
                    Critical
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 overflow-y-auto">
              {/* Task Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task?.status || "pending")}`}>
                  {getStatusLabel(task?.status || "pending")}
                </div>
              </div>
              {/* Task Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Scheduled Time</h3>
                  <p className="text-sm text-gray-900">{task?.time || "Not scheduled"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contractor</h3>
                  <p className="text-sm text-gray-900">{task?.contractor || "Unassigned"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Task ID</h3>
                  <p className="text-sm text-gray-900">#{task?.id || "N/A"}</p>
                </div>
              </div>
              {/* Project Context */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Project Context</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {project?.description || "No project description available."}
                </p>
              </div>
              {/* Sentinel Use Case */}
              {project?.sentinelUseCase && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Sentinel Use Case</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project.sentinelUseCase}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right Column - Main Content Area */}
        <div className="flex-1 h-full min-w-0 flex flex-col gap-4">
          {/* AI Agent Resolution Plan Card (shown until confirmed) */}
          {!planConfirmed && (
            <Card className="mb-2">
              <CardHeader>
                <CardTitle>AI Agent Resolution Plan</CardTitle>
                <CardDescription>
                  Review and confirm the AI agent's proposed resolution plan for this task.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingPlan ? (
                  <div className="flex flex-col gap-3">
                    <textarea
                      className="w-full min-h-[100px] rounded-md border bg-background p-2 text-sm text-foreground"
                      value={planDraft}
                      onChange={e => setPlanDraft(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/80"
                        onClick={() => {
                          setPlanText(planDraft);
                          setEditingPlan(false);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setPlanDraft(planText);
                          setEditingPlan(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-100 mb-4 whitespace-pre-line">{planText}</p>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/80"
                        onClick={() => setPlanConfirmed(true)}
                      >
                        Confirm Plan
                      </button>
                      <button
                        className="px-4 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
                        onClick={() => setEditingPlan(true)}
                      >
                        Edit Plan
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
          {/* Task Actions & Updates Card (shown after plan is confirmed) */}
          {planConfirmed && (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Task Actions & Updates</CardTitle>
                <CardDescription>
                  Manage task progress and view related information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 w-full bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 text-xl">
                  Task actions and updates content goes here
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 