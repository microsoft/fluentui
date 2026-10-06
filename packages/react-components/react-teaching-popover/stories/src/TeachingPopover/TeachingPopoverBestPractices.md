## Best practices

### Do

- Use `TeachingPopoverCarouselFooter` for paired navigation. Setting a slot's `altText` to `null` hides that button at its boundary and transfers its focus to the other footer button, if focusable. This behavior is shared by the styled and headless footers through `useTeachingPopoverCarouselFooterBase_unstable`.
- Manage hiding and focus explicitly when composing standalone `TeachingPopoverCarouselFooterButton` components outside a footer.

### Don't
