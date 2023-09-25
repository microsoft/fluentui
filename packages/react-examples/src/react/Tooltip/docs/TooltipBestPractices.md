### Content

- Don’t use a tooltip to restate a button name that’s already shown in the UI.
- When a control or UI element is unlabeled, use a simple, descriptive noun phrase. For example: “Highlighting pen”. Only capitalize the first word (unless a subsequent word is a proper noun), and don’t use a period.
- For a disabled control that could use an explanation, provide a brief description of the state in which the control will be enabled. For example: “This feature is available for line charts.”
- Only use periods for complete sentences.

For a UI label that needs some explanation:

- Briefly describe what you can do with the UI element.
- Use the imperative verb form. For example, "Find text in this file" (not "Finds text in this file").
- Don't include end punctuation unless there is at least one complete sentence.

For a truncated label or a label that’s likely to truncate in some languages:

- Provide the untruncated label in the tooltip.
- Don't provide a tooltip if the untruncated info is provided elsewhere on the page or flow.
- Optional: On another line, provide a clarifying description, but only if needed.

### Accessibility

- Don't add tooltips to unfocusable or disabled controls. People using the keyboard or screen readers can't consistently access or read tooltips associated with elements that can't receive focus or are disabled. Consider having the information statically available on the page or through a "help"-style toggle button.
