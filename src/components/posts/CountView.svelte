<script lang="ts">
  import { onMount } from "svelte";
  import type { PostsGetResponse } from "@pages/api/posts/views/[postId].ts";

  export let postId: number;
  let views: number;
  let render = false;

  onMount(async () => {
    const res = await fetch(`/api/posts/views/${postId}`, {
      method: "GET",
    }).then((res) => res.json() as Promise<PostsGetResponse>);

    const resViews = res.result?.views;

    if (res.error || !resViews) {
      console.error(res.error);
      render = false;
      return;
    }

    views = resViews;
    render = true;
  });
</script>

{#if render}
  <div class="flex items-center gap-1.5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
    {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
  </div>
{/if}
