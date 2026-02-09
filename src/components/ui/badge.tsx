import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        validated:
          "bg-status-validated-bg text-status-validated border border-status-validated/30",
        pending:
          "bg-status-pending-bg text-status-pending border border-status-pending/30",
        validating:
          "bg-status-validating-bg text-status-validating border border-status-validating/30",
        error:
          "bg-status-error-bg text-status-error border border-status-error/30",
        payment:
          "bg-status-payment-bg text-status-payment border border-status-payment/30",
        default:
          "bg-neutral-100 text-neutral-600 border border-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
