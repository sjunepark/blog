import { getCollection } from "astro:content";

export const getPublishedAndSortedPosts = async () => {
  const posts = await getCollection("post");

  return posts
    .filter((post) => {
      if (import.meta.env.PROD) {
        return post.data.published;
      }
      return true;
    })
    .sort((post1, post2) =>
      isDateBefore(post1.data.pubDate, post2.data.pubDate) ? 1 : -1,
    );
};

const isDateBefore = (date: Date, compareDate: Date) => {
  return date.getTime() < compareDate.getTime();
};
