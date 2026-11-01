import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

/** Adds `minutesRead` to each post's frontmatter. */
export function remarkReadingTime() {
  return (tree, { data }) => {
    const { minutes } = getReadingTime(toString(tree));
    data.astro.frontmatter.minutesRead = Math.max(1, Math.round(minutes));
  };
}
