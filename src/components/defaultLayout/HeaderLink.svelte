<script lang="ts">
  import { cn } from "@lib/utils.ts";

  let className: string;
  export { className as class };
  export let pathname: string;
  export let href: string;

  let subpath: RegExpMatchArray;
  let isActive: boolean;

  $: subpath = pathname.match(/[^/]+/g) ?? [""];
  $: isActive = href === pathname || href === "/" + subpath[0];
</script>

<a
  class={cn(
    className,
    "block px-3 py-2 transition duration-200 hover:text-primary focus-visible:text-primary",
    isActive ? "active" : "",
  )}
  {href}
  {...$$restProps}
>
  <slot />
</a>
<!--todo: add underbar when active-->
