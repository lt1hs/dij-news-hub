import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ViewShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export default function ViewShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  wide = false,
}: ViewShellProps) {
  return (
    <div className={cn("mx-auto px-4 pb-32 pt-14 sm:px-6 lg:px-8", wide ? "max-w-[1200px]" : "max-w-[980px]", className)}>
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-white/[.08] pb-6 sm:flex-row sm:items-end">
        <div className="min-w-0">
          {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sidebar-primary">{eyebrow}</p>}
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </header>
      {children}
    </div>
  );
}
