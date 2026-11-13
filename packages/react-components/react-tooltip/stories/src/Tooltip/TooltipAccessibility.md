## Accessibility

Tooltips should always wrap interactive controls like buttons, links, form fields, gridcells, etc. For tooltips that should be triggered by static icons, the `InfoLabel` control is available as an accessible tooltip-like pattern.

Tooltips should not be used to provide a full-text alternative to truncated content. For more infomation on the accessibility of truncated content, see our [truncation docs](https://react.fluentui.dev/?path=/docs/concepts-developer-accessibility-truncation--docs).

Use `secondaryContent` for supporting, noninteractive information, such as a keyboard shortcut.
Primary and secondary content contribute to the trigger's accessible name with `relationship="label"`,
or its description with `relationship="description"`, unless the trigger already supplies its own label or description.

Set `secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': true }}` to exclude the secondary slot from the generated
label or description. Only hide information that is redundant or available elsewhere.
Do not put links, buttons, or other interactive controls inside either content region. Use a Popover for interactive content.
