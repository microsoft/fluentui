# Styled and headless contracts

## Styled Fluent UI

Use public exports from `@fluentui/react-components` when the API lookup recommends that facade. Follow the
component's queried props, slots, state, and accessibility contract. Slots are typed extension points: preserve
their element and custom-prop constraints rather than replacing them with arbitrary wrappers.

Use Griffel and Fluent design tokens for all visual values. Tokens keep themes, forced-colors behavior, and product
consistency intact. Validate keyboard behavior, labels, focus, high contrast, and the project's supported React
versions.

## Headless Fluent UI

Headless components provide behavior and state contracts, not styled-component defaults. Import from the exact
verified subpath reported by the CLI; the headless package root may intentionally export nothing. Preserve required
ARIA relationships, keyboard interactions, state attributes, slot composition, and ref behavior.

Prompt for **CSS Modules or Tailwind**, then follow the recorded `preferences.headlessStyling` choice. Headless
does not require Griffel. With CSS Modules, use semantic CSS variables such as `var(--colorNeutralForeground1)`.
With Tailwind, map utilities to the same semantic variables rather than substituting a hardcoded palette or spacing
scale. Preserve the project's theme/provider setup; variables must be defined in the rendered subtree.

Inspect named slots besides the root. For example, Dropdown exposes a trigger, `expandIcon`, and `clearButton`.
Some headless slots render without an icon or visibility styles. Set an unused optional slot to `null`; for an
enabled action, provide visible content, an accessible name, focus styles, and visibility driven by the documented
state attributes (for Dropdown, `data-clearable`). Do not leave empty interactive elements or hide every auxiliary
slot globally. Check the initial, selected, disabled, and keyboard-focus states.

Do not combine styled and headless packages merely to reconstruct an undocumented API. Query each symbol and use
the reported public route.
