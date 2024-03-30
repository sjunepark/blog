<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import { selectedTags, type Tag } from "@lib/stores/tags.ts";
  import { navigate } from "astro:transitions/client";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let type: "redirect" | "toggle" | "none" = "none";
  export let tag: Tag;

  const onclick = () => {
    switch (type) {
      case "redirect":
        redirect();
        break;
      case "toggle":
        selectedTags.toggle(tag);
        break;
    }
  };

  const redirect = () => {
    selectedTags.select(tag);
    navigate(`/posts`);
  };
</script>

<Badge
  variant="secondary"
  class={className}
  clickable={true}
  on:click={onclick}
>
  {tag}
</Badge>
