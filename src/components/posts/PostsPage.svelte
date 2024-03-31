<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import ArticleCard from "@components/posts/PostCard.svelte";
  import { selectedTags } from "@lib/stores/tags";
  import Tag from "@components/posts/Tag.svelte";
  import { derived } from "svelte/store";

  export let posts: CollectionEntry<"post">[];

  const selectedPosts = derived(selectedTags, ($selectedTags) => {
    if ($selectedTags.size === 0) return posts;

    const selectedTagsArray = Array.from($selectedTags);

    return posts.filter((post) => {
      return selectedTagsArray.every((tag) => post.data.tags.includes(tag));
    });
  });
</script>

<div class="mb-3 flex flex-wrap gap-1.5 py-2">
  <span>Tags: </span>
  {#if $selectedTags.size === 0}
    <Tag type="none" tag={"all"} />
  {/if}
  {#each $selectedTags as tag}
    <Tag type="toggle" {tag} />
  {/each}
</div>
<div class="mt-4 flex h-full flex-col md:border-l md:border-border md:pl-6">
  <div class="h-full max-w-3xl flex-1 flex-col space-y-16">
    {#each $selectedPosts as post (post.data.id)}
      <ArticleCard {post} />
    {/each}
  </div>
</div>
