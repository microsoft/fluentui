### Layout

- In larger configurations, the navigation pane is always on-screen, usually on the left of the view. On smaller screens, consider collapsing it into a skinnier version or hiding it behind a menu button (note that `Nav` does not currently have either of these behaviors built in).
- Don’t overload your navigation pane. Too many items in the `Nav` is indicative of an app that is poorly organized or trying to do too much.

### Content

- Keep the names of the navigation items brief and clear, rather than trying to be overly specific.
- Use the word that feels right for the navigation. For example, some items may make more sense as nouns (e.g. “Files”), others as adjectives (“Shared”). Use what makes sense for customers, and keep it short!
- Try to keep your app’s nav in a consistent order across platforms. This sort of consistency increases predictability which drives customer confidence, thus retaining and engaging them.
- If using a menu button to expand and collapse the `Nav`, use the tooltip “Expand navigation” or “Collapse navigation”.

### Accessibility

If your Nav items lose meaning by being truncated, they might benefit from being styled to wrap their text instead. Although the full text is exposed in a tooltip, that tooltip is not accessible through the keyboard, touch, voice control, or other assistive tech without hover functionality.

The Nav example "Nav with wrapped link text and no tooltips" shows how to override the default Nav styles to remove text truncation and tooltips.
