<details>
<summary>
 Best Practices
</summary>

### Do

- Put `current` attribute to the last item.
- Long names must be truncated and the whole name should be shown in the tooltip.
- As BreadcrumbItem is non-interactive using `aria-current="page"` is optional.

### Don't

- Last items shouldn't be interactive.
- Don't show overflow menu for non-interactive collapsed items. Tooltip shold be shown intead.

</details>
