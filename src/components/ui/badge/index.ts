import { tv, type VariantProps } from "tailwind-variants";

export { default as Badge } from "./badge.svelte";
export const badgeVariants = tv({
  base: "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary-foreground/20",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-foreground/20",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive-foreground/20",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type Variant = VariantProps<typeof badgeVariants>["variant"];
