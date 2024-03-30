import type { CollectionEntry } from "astro:content";
import { writable } from "svelte/store";

export type Tag = CollectionEntry<"post">["data"]["tags"][number];

const allTags = writable(new Set<Tag>());

export const initAllTags = (posts: CollectionEntry<"post">[]) => {
  allTags.set(new Set());
  for (const post of posts) {
    for (const tag of post.data.tags) {
      allTags.update((tags) => {
        tags.add(tag);
        return tags;
      });
    }
  }
};

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
