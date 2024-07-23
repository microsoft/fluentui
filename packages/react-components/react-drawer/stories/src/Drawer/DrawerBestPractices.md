## Best practices

### OverlayDrawer vs InlineDrawer vs Drawer

- `OverlayDrawer`: Should be used only when the full user attention is required. Uses Dialog component under the hood.
- `InlineDrawer`: Should be used when its content do not require full attention or for navigational elements on a page.
- `Drawer`: Should only be used when there is a strict need to toggle between overlay and inline modes. This is often useful for responsive design, so depending on the page viewport an inline drawer could become overlay to save screen space. <br><br>
  Drawer is a component that combines both OverlayDrawer and InlineDrawer. Although it is technically possible to use Drawer for either inline or overlay modes, it is far better to import and use its adequate component. <br><br>
  As an example, in case there is the need to only use the inline mode, it is better to use `<InlineDrawer />` instead of a `<Drawer mode="inline" />`. Drawer would use InlineDrawer internally, but also include OverlayDrawer in the mix. And as the OverlayDrawer has a strong dependency on Dialog component, more code would be included in the final build bundle.

### Accessibility

- `OverlayDrawer`: <br>Please refer to the Dialog component to understand the accessibility recommendations and implications.
- `InlineDrawer`: <br>
  **Semantics**: Renders a plain div and do not imply any accessibility semantics by default. It accepts all aria attributes and it should be customized depending on its context within a page. Consider using `role="region"` for large page-level drawers. <br><br>
  **Focus**: If the `InlineDrawer` has a trigger and can be closed, use the `useRestoreFocusTarget` and `useRestoreFocusSource` hooks to handle focus restoration as shown in our Default and Inline examples.
