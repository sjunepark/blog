<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import { selectedTags, type Tag } from "@lib/stores/tags.ts";
  import { navigate } from "astro:transitions/client";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let type: "redirect" | "toggle" | "none" = "none";
  export let tag: Tag | "all";

  const onclick = () => {
    if (tag === "all") {
      return;
    }

    switch (type) {
      case "redirect":
        selectedTags.select(tag);
        navigate(`/posts`);
        break;
      case "toggle":
        selectedTags.toggle(tag);
        break;
    }
  };
</script>

{#if type === "none"}
  <Badge variant="secondary" class={className}>
    # {tag}
  </Badge>
{:else}
  <Badge
    variant="secondary"
    class={className}
    clickable={true}
    on:click={onclick}
  >
    # {tag}
  </Badge>
{/if}
