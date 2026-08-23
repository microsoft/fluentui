/** `TeachingPopover` -> `teaching-popover`. */
export declare function toKebab(name: string): string;

/** The `title` a story's `meta` declares, if it has one. */
export declare function storyTitle(source: string): string | undefined;

/** The page path for a story, relative to its tree, derived from `meta.title`. */
export declare function storySlug(source: string, fallbackName: string): string;
