<script lang="ts">
  import { onMount } from "svelte";
  import type { PostsGetResponse } from "@pages/api/posts/views/[postId].ts";

  export let postId: number;

  onMount(async () => {
    const postData = (await fetch(`/api/posts/views/${postId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })) as PostsGetResponse;

    if (postData.error) {
      console.error(postData.error);
      return;
    }
  });
</script>

<div></div>
