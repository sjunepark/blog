<script lang="ts">
  import { onMount } from "svelte";
  import type { PostResponse } from "@pages/api/posts/[postId]";

  export let postId: number;

  onMount(async () => {
    console.log("Hi");
    // const postData = (await fetch(`/api/posts/${postId}`, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .catch((err) => {
    //     return { error: err.message };
    //   })) as PostResponse;
    //
    // if (postData.error) {
    //   console.error(postData.error);
    //   return;
    // }
  });
</script>

<div></div>
