import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

interface BreadcrumbNavProps {
  segments: { label: string; href?: string }[];
  onBack?: () => void; // Not used anymore, but kept for compatibility
}

export function BreadcrumbNav({ segments }: BreadcrumbNavProps) {
  const router = useRouter();
  const maxLens = [null, 22, 16];
  return (
    <nav className="mb-4 w-fit flex items-center gap-1 text-lg font-normal select-none" aria-label="Breadcrumb">
      <span className="mr-1 text-slate-400">←</span>
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-1 text-slate-400">/</span>}
            {isLast ? (
              <span className="text-slate-100">{truncate(seg.label, maxLens[i] || 18)}</span>
            ) : (
              <span
                className="text-slate-100 underline underline-offset-4 cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => seg.href && router.push(seg.href)}
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && seg.href) router.push(seg.href);
                }}
                aria-label={`Go to ${seg.label}`}
              >
                {truncate(seg.label, maxLens[i] || 18)}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
} 