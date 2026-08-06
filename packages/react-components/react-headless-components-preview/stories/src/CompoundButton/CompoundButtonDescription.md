A compound button presents a primary action with optional secondary text that adds concise context. Both text lines contribute to the accessible name, so keep them brief and avoid repeating the same information.

`CompoundButton` renders a native button by default and can render an anchor with `as="a"` and `href`. A disabled button uses the native `disabled` attribute and cannot be focused or activated. A disabled-focusable button remains in the tab order, exposes `aria-disabled="true"`, and blocks activation.

The root exposes presence-based state attributes. Each attribute is present with the exact value `""` when its state is true and is omitted when false:

- `data-disabled`
- `data-disabled-focusable`
- `data-icon-only`
- `data-has-secondary-content`

The `contentContainer` slot groups the primary and secondary text, while `secondaryContent` represents the second textual line. These semantic slots let consumers apply their own layout and typography without changing the component's behavior.
