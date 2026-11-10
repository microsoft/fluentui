## Accessibility

Tooltips should always wrap interactive controls like buttons, links, form fields, gridcells, etc. For tooltips that should be triggered by static icons, the `InfoLabel` control is available as an accessible tooltip-like pattern.

Tooltips should not be used to provide a full-text alternative to truncated content. For more infomation on the accessibility of truncated content, see our [truncation docs](https://react.fluentui.dev/?path=/docs/concepts-developer-accessibility-truncation--docs).

`secondaryContent` is supporting, noninteractive information, such as a keyboard shortcut or sharing metadata.
With `relationship="label"`, the primary and secondary regions form the trigger's accessible name unless the trigger
already supplies `aria-label` or `aria-labelledby`. With `relationship="description"`, both regions describe the trigger;
an authored `aria-describedby` takes precedence. `relationship="inaccessible"` does not create an accessibility relationship.

Do not put links, buttons, or other interactive controls inside either content region. Use a Popover for interactive content.
Secondary content wraps at constrained widths and follows the logical end alignment in both left-to-right and right-to-left layouts.
During server rendering, string primary content provides a fallback label, combined with string secondary content when available.
Rich secondary content participates after hydration, when the tooltip's DOM is available.
