## Accessibility

### Do

- **Use `aria-busy` on the container when loading multiple Skeleton items simultaneously.** Add `aria-busy="true"` to the parent container element when content is loading and changes rapidly. This tells screen readers to wait until loading is complete before trying to read the content. Remove `aria-busy` or set it to `false` when loading is complete.
- **Label the Skeleton when it's the only loading element.** If there's a single Skeleton loader, provide an `aria-label` on the Skeleton's root element (e.g., `aria-label="Loading content"`).
- **Place labels on wrapper elements with nameable roles.** If the Skeleton is wrapped by a control with a nameable role (e.g., `article`, `group`, `region`), you can place the `aria-label` or `aria-labelledby` on that wrapper element instead of on the Skeleton itself.
- **Use unique labels for multiple simultaneous Skeleton loaders.** If there are several skeleton loaders visible at once and they represent different content (e.g., "Loading user profile", "Loading comments", "Loading recommendations"), give each a unique label so users can distinguish what's loading.
- **Limit loading announcements to once every 5 seconds at most.** If implementing live region announcements for loading states, ensure they don't fire more frequently than once every 5 seconds to avoid overwhelming screen reader users with repetitive updates.
- **Announce "loaded" status once for all content.** When multiple Skeleton loaders complete, make a single live region announcement (e.g., "Content loaded") rather than separate announcements for each skeleton. This provides a clear signal without being repetitive.

### Don't

- **Don't add live region announcements to individual Skeleton components when using many at once.** If you have multiple skeleton loaders on a page, do not implement `aria-live` regions on each one. Instead, manage announcements at the page or section level to prevent overwhelming users with excessive notifications.
- **Don't announce loading when content loads on scroll.** For content that loads progressively as the user scrolls (infinite scroll patterns), avoid live region announcements entirely. These would distract users from reading already-loaded content and don't provide useful context.
- **Don't rely solely on Skeleton for accessibility.** The Skeleton is a visual loading indicator. Always ensure the loading state is also communicated through appropriate ARIA attributes (`aria-busy`, `aria-live`) on the container elements.
- **Don't use overly detailed labels.** Keep labels concise and meaningful (e.g., "Loading profile" not "Loading profile skeleton animation with wave effect").
