<script lang="ts">
  import { type CollectionEntry } from "astro:content";
  import ArticleCard from "@components/posts/ArticleCard.svelte";

  export let posts: CollectionEntry<"post">[];
</script>

<div class="mt-4 flex h-full flex-col md:border-l md:border-border md:pl-6">
  <div class="h-full max-w-3xl flex-1 flex-col space-y-16">
    {#each posts as post}
      <ArticleCard {post} />
    {/each}
  </div>
</div>
