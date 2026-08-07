A compound button presents a primary action with optional secondary text that adds concise context. Both text lines contribute to the accessible name, so keep them brief and avoid repeating the same information.

`CompoundButton` renders a native button by default and can render an anchor with `as="a"` and `href`. A disabled native button uses the `disabled` attribute and cannot be focused or activated. A disabled anchor cannot use a native disabled attribute, so it exposes `aria-disabled="true"`, removes `href`, blocks activation, and still emits the root `data-disabled` attribute. Disabled native buttons also emit root `data-disabled`. A disabled-focusable button remains in the tab order, exposes `aria-disabled="true"`, and blocks activation.

The `contentContainer` slot groups the primary and secondary text, while `secondaryContent` represents the second textual line. These semantic slots let consumers apply their own layout and typography without changing the component's behavior.

## State attributes

State attributes are applied to the root, omitted when false, and form the supported CSS targeting contract.

| Attribute                    | Meaning                                                                      | Value when present |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------ |
| `data-disabled`              | Disabled prop/state is active                                                | `""`               |
| `data-disabled-focusable`    | Disabled-focusable state active                                              | `""`               |
| `data-icon-only`             | Only icon content rendered                                                   | `""`               |
| `data-has-secondary-content` | Normalized secondary-content slot is present and the button is not icon-only | `""`               |
