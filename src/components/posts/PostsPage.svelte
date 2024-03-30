<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import ArticleCard from "@components/posts/PostCard.svelte";
  import { initAllTags, selectedTags } from "@lib/stores/tags.js";
  import { onMount } from "svelte";
  import Tag from "@components/posts/Tag.svelte";

  export let posts: CollectionEntry<"post">[];

  onMount(async () => {
    initAllTags(posts);
  });
</script>

<div class="mb-3 flex flex-wrap gap-1.5">
  <span>Tags: </span>
  {#each $selectedTags as tag}
    <Tag type="toggle" {tag} />
  {/each}
</div>
<div class="mt-4 flex h-full flex-col md:border-l md:border-border md:pl-6">
  <div class="h-full max-w-3xl flex-1 flex-col space-y-16">
    {#each posts as post}
      <ArticleCard {post} />
    {/each}
  </div>
</div>
