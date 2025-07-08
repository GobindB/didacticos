"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { projects } from "@/lib/mockData";
import { useRouter } from "next/navigation";

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

function ProjectList() {
  const router = useRouter();
  return (
    <div className="min-h-screen subtle-bg">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen glass border-r border-slate-200/20 dark:border-slate-700/20">
          <nav className="p-6">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start glass text-slate-700 dark:text-slate-300">
                <Folder className="w-4 h-4 mr-3" /> Projects
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Projects</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your active projects</p>
          </div>
          <div className="space-y-3">
            {projects.map(project => (
              <Card key={project.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/${project.id}`)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-slate-500">{project.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={project.status} />
                    <div className="text-sm text-slate-400">{project.assignee}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectList;
