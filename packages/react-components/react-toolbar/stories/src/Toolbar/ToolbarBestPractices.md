## Best practices

- Use toolbar as a grouping element only if the group contains 3 or more controls. Refer to ['toolbar aria practices'](https://www.w3.org/TR/wai-aria-practices-1.2/#toolbar) for details.
- Label each toolbar when the application contains more than one toolbar (using `aria-label` or `aria-labelledby` props). Refer to [toolbar(role)](https://www.w3.org/WAI/PF/aria/roles#toolbar) for details.
- Avoid controls that require the same arrow keys used for toolbar navigation. If a textbox is necessary, include only one and place it last in a horizontal toolbar. See the [WAI-ARIA toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and the **With Input** example.
