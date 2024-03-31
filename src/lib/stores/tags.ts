import type { CollectionEntry } from "astro:content";
import { writable } from "svelte/store";

export type Tag = CollectionEntry<"post">["data"]["tags"][number];

const createSelectedTags = () => {
  const { subscribe, set, update } = writable(new Set<Tag>());

  return {
    subscribe,
    toggle: (tag: Tag) => {
      update((tags) => {
        if (tags.has(tag)) {
          tags.delete(tag);
        } else {
          tags.add(tag);
        }
        return tags;
      });
    },
    clear: () => set(new Set()),
    select: (tag: Tag) => set(new Set([tag])),
  };
};

export const selectedTags = createSelectedTags();
