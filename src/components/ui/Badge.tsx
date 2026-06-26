import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "green" | "blue" | "red" | "gray" | "dark";
  className?: string;
}

const variants = {
  gold: "bg-gold-500/20 text-gold-400 border border-gold-500/30",
  green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  red: "bg-red-500/20 text-red-400 border border-red-500/30",
  gray: "bg-dark-700/50 text-dark-300 border border-dark-600",
  dark: "bg-dark-800 text-dark-200 border border-dark-700",
};

export default function Badge({ children, variant = "dark", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
