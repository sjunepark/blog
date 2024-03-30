<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import { selectedTags, type Tag } from "@lib/stores/tags.ts";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let type: "redirect" | "toggle" | "none" = "none";
  export let tag: Tag;

  const onclick = () => {
    console.log("clicked");
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
    const state = {
      tag: tag,
    };
    const searchParams = new URLSearchParams(state);
    window.location.href = `/posts?${searchParams.toString()}`;
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
