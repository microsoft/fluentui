<details>
<summary>
 Best Practices
</summary>

### Do

- Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.
- Provide label to the Breadcrumb component using `aria-label` or `aria-labelledby` prop.
- `aria-current="page"` should be used in the current BreadcrumbItem, to indicate which page is currently displayed. If the BreadcrumbItem representing the current page is not a link, `aria-current` is optional.
- Use `slash` dividers only for small and non-interactive breadcrums.

### Don't

- Don't use Breadcrumbs as a primary way to navigate an app or site.
- Avoid using custom dividers.

</details>
