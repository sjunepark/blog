<script lang="ts">
  import { onMount } from "svelte";
  import type { PostsPostResponse } from "@pages/api/posts/views/[postId].ts";

  export let postId: number;

  onMount(async () => {
    const postData = (await fetch(`/api/posts/views/${postId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })) as PostsPostResponse;

    if (postData.error) {
      console.error(postData.message);
      return;
    }

    console.log(`${postData.message}, inserted: ${postData.result.inserted}`);
  });
</script>

<div></div>
