<details>
<summary>
 Best Practices
</summary>

### Do

- Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.
- Provide label to the Breadcrumb component using `aria-label` or `aria-labelledby` prop.
- Put `current` attribute to the last item.
- Use `aria-current="page"` in the current BreadcrumbButton, to indicate which page is currently displayed.
- For BreadcrumbItem `aria-current="page"` is optional because it's a non-interactive item.
- Use `slash` dividers only for small and non-interactive breadcrums.
- If long items are truncated, add a Tooltip to display the full text.

### Don't

- Don't use Breadcrumbs as a primary way to navigate an app or site.
- Avoid using custom dividers.
- Do not wrap breadcrumb items.
- The last item shouldn't be interactive.
- Don't show overflow menu for non-interactive collapsed items. Tooltip shold be shown instead.

</details>
