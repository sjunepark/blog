<script lang="ts">
  import { type CollectionEntry } from "astro:content";
  import ArticleCard from "@components/posts/PostCard.svelte";
  import type { Tag as TagType } from "@lib/stores/tags.js";
  import { initAllTags, selectedTags } from "@lib/stores/tags.js";
  import { onMount } from "svelte";
  import Tag from "@components/posts/Tag.svelte";

  export let posts: CollectionEntry<"post">[];

  onMount(async () => {
    initAllTags(posts);

    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    const tag = params.get("tag") as TagType;
    if (tag) {
      selectedTags.select(tag);
    }
  });
</script>

<div class="mt-2 flex flex-wrap gap-1.5">
  <span>Tags: </span>
  {#each $selectedTags as tag}
    <Tag type="redirect" {tag} />
  {/each}
</div>
<div class="mt-4 flex h-full flex-col md:border-l md:border-border md:pl-6">
  <div class="h-full max-w-3xl flex-1 flex-col space-y-16">
    {#each posts as post}
      <ArticleCard {post} />
    {/each}
  </div>
</div>
