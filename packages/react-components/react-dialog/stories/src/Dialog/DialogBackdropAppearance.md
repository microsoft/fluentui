The `backdrop` slot on `DialogSurface` accepts an `appearance` prop that allows you to explicitly control the backdrop appearance of the dialog.

By default, DialogSurface automatically determines the backdrop appearance based on context: standalone dialogs show a dimmed backdrop, while nested dialogs (inside another Dialog) show a transparent backdrop to avoid stacking multiple dimmed layers.

Use `backdrop={{ appearance: "dimmed" }}` when rendering a Dialog inside components that internally use Dialog (like `OverlayDrawer`) but the dialog should visually behave as standalone with a dimmed backdrop.

- **`'dimmed'`**: Always shows a dimmed backdrop, regardless of nesting.
- **`'transparent'`**: Always shows a transparent backdrop.

```tsx
<DialogSurface backdrop={{ appearance: 'dimmed' }} />
```
