Headless Fluent components that make use of positioning can all be configured in the same way. In this preview package, positioning applies to:

- Popover (and TeachingPopover, InfoLabel, AvatarGroup)
- Menu
- Tooltip
- Dropdown, Combobox and TagPicker

Components that have slots which are positioned will always expose a `positioning` prop where the positioning of the slot can be configured. The prop accepts the same `PositioningProps` contract as Fluent UI React v9.

Surfaces are positioned with native CSS anchor positioning by default. Options that CSS cannot express (`autoSize`, boundaries, …) require a JavaScript positioning **engine** — see the _Engine_ example below.

Below you can try out the different positioning options in the playground. Further examples try to explain more clearly different configuration options for the `positioning` prop.
