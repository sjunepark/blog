<script lang="ts">
  import HamburgerMenu from "svelte-radix/HamburgerMenu.svelte";
  import { cn } from "@lib/utils";
  // noinspection ES6UnusedImports
  import ThemeIcon from "@components/ThemeIcon.svelte";
  // noinspection ES6UnusedImports
  import * as Popover from "@components/shadcn/ui/popover";
  import { buttonVariants } from "@components/shadcn/ui/button";

  const { variant, size } = buttonVariants.variants;
</script>

<header
  class="sticky top-0 z-50 w-full flex-none bg-gradient-to-b from-background from-65% via-background/30 via-90% px-4 pb-12 pt-6 sm:px-8 md:px-12 md:pb-16"
>
  <div
    class="mx-auto flex max-w-screen-lg items-center justify-end gap-4 sm:justify-center"
  >
    <div class="flex flex-1">Home</div>
    <!--MobileNavigation-->
    <nav class="sm:hidden">
      <Popover.Root>
        <Popover.Trigger>
          <div
            class={cn(
              variant.icon,
              size.icon_lg,
              "group flex items-center justify-center",
            )}
          >
            <HamburgerMenu class="h-5 w-5 group-hover:fill-primary" />
          </div>
        </Popover.Trigger>
        <Popover.Content>Place content for the popover here.</Popover.Content>
      </Popover.Root>
    </nav>
    <!--DesktopNavigation-->
    <nav class="hidden sm:block">
      <ul
        class="rounded-full flex px-3 font-medium shadow-md shadow-border ring-1 ring-border"
      >
        <li>
          <a
            href="/"
            class="block px-3 py-2 transition duration-200 hover:text-primary focus-visible:text-primary"
            >About</a
          >
        </li>
        <li>
          <a
            href="/posts"
            class="block px-3 py-2 transition duration-200 hover:text-primary focus-visible:text-primary"
            >Posts</a
          >
        </li>
      </ul>
    </nav>
    <div class="flex flex-1 justify-end">
      <ThemeIcon />
    </div>
  </div>
</header>
