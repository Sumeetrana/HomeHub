import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 px-4 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center mb-6">
        <Icon className="h-9 w-9 text-dark-400" />
      </div>
      <h3 className="text-xl font-semibold text-dark-100 mb-2">{title}</h3>
      <p className="text-dark-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
