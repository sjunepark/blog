<script lang="ts">
  import { Button } from "@components/ui/button";
  import { onMount } from "svelte";

  let isMounted = false;
  let theme: "light" | "dark";

  onMount(() => {
    isMounted = true;
    theme = localStorage.getItem("theme") as "light" | "dark";
    updateColorScheme();
  });

  $: if (isMounted) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      updateColorScheme();
    } else {
      document.documentElement.classList.remove("dark");
      updateColorScheme();
    }
  }

  $: if (isMounted) localStorage.setItem("theme", theme);

  const toggleMode = () => {
    theme = theme === "light" ? "dark" : "light";
    updateColorScheme();
  };

  const updateColorScheme = () => {
    document.documentElement.style.colorScheme = theme;
  };
</script>

<Button on:click={toggleMode} variant="icon" size="icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>

  <span class="sr-only">Toggle theme</span>
</Button>
