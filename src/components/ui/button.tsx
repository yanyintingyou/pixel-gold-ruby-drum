import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-(--motion-quick) ease-(--ease-out) disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg hover:bg-accent/90 shadow-[var(--shadow-border)]",
        secondary:
          "bg-surface-2 text-fg hover:bg-fg/8 shadow-[var(--shadow-border)]",
        ghost: "text-muted hover:text-fg hover:bg-fg/6",
        toggle:
          "bg-surface-2 text-muted hover:text-fg shadow-[var(--shadow-border)] data-[on=true]:text-fg data-[on=true]:bg-fg/10",
      },
      size: {
        md: "h-11 rounded-md px-4 text-sm",
        sm: "h-9 rounded-sm px-3 text-xs",
        icon: "size-11 rounded-md",
        iconSm: "size-9 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
