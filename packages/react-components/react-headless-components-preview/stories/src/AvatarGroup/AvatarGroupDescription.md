An AvatarGroup displays a collection of Avatars, grouped together to represent a list of people or entities.

Compose it from `AvatarGroupItem`s for each person. When the list is longer than what should be shown inline, use `partitionAvatarGroupItems` to split the items and render the overflow inside an `AvatarGroupPopover`. The popover is built on the headless `Popover`, so opening, closing, light-dismiss, and positioning all flow through the same primitive — no styling is imposed, leaving presentation fully to the consumer.
