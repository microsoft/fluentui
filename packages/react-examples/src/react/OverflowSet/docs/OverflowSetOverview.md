The OverflowSet is a flexible container component that is useful for displaying a primary set of content with additional content in an overflow callout. Note that the example below is only an example of how to render the component, not a specific use case.

### Accessibility

By default, the OverflowSet is simply `role=group`. If you used as an application menu, the `overflowItems` prop on CommandBar should be used instead. When `OverflowSet` is used on its own, any context-specific semantics (e.g. `role="menu"`, `role="nav"`) and interaction (e.g. arrow keys) will need to be manually added.
