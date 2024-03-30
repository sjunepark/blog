<script lang="ts">
  import { cn } from "@lib/utils";
  import { badgeVariants, type Variant } from "./index.js";

  let className: string | undefined | null = undefined;
  export let href: string | undefined = undefined;
  export let variant: Variant = "default";
  export { className as class };

  export let clickable = false;
</script>

{#if clickable}
  <svelte:element
    this={href ? "a" : "span"}
    {href}
    class={cn(badgeVariants({ variant, className }))}
    {...$$restProps}
    on:click
    role="button"
    tabindex="0"
  >
    <slot />
  </svelte:element>
{:else}
  <svelte:element
    this="span"
    class={cn(badgeVariants({ variant, className }))}
    {...$$restProps}
  >
    <slot />
  </svelte:element>
{/if}
