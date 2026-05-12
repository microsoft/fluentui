# Nested Dialogs

Nested dialogs (opening a dialog from within another dialog) require proper focus management to ensure accessibility and predictable user experience.

## Key Principle

When using nested dialogs, **always use `DialogTrigger` for focus restoration**. If you open a dialog programmatically without `DialogTrigger`, you become responsible for managing focus restoration using `useRestoreFocusSource()` and `useRestoreFocusTarget()` hooks.

## Recommended: Using DialogTrigger

Use `DialogTrigger` for opening nested dialogs. This provides automatic focus restoration when dialogs close:

```tsx
<Dialog>
  <DialogTrigger disableButtonEnhancement>
    <Button>Open Outer Dialog</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Outer Dialog</DialogTitle>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open Inner Dialog</Button>
        </DialogTrigger>
        <DialogSurface>{/* Inner dialog content */}</DialogSurface>
      </Dialog>
    </DialogBody>
  </DialogSurface>
</Dialog>
```

**Benefits:**

- Focus is automatically restored when dialogs close
- Simpler to implement
- No manual focus management needed

## Programmatic Control: Using Focus Restoration Hooks

If you must open dialogs programmatically (without user click), use `useRestoreFocusSource()` and `useRestoreFocusTarget()` hooks. Note that you are responsible for ensuring focus is correctly restored:

```tsx
const [outerOpen, setOuterOpen] = React.useState(false);
const [innerOpen, setInnerOpen] = React.useState(false);

const outerSourceAttrs = useRestoreFocusSource();
const outerTargetAttrs = useRestoreFocusTarget();
const innerSourceAttrs = useRestoreFocusSource();
const innerTargetAttrs = useRestoreFocusTarget();

return (
  <Dialog open={outerOpen} onOpenChange={(e, data) => setOuterOpen(data.open)}>
    <Button {...outerTargetAttrs} onClick={() => setOuterOpen(true)}>
      Open Outer Dialog
    </Button>
    <DialogSurface {...outerSourceAttrs}>
      <Button {...innerTargetAttrs} onClick={() => setInnerOpen(true)}>
        Open Inner Dialog
      </Button>
    </DialogSurface>

    <Dialog open={innerOpen} onOpenChange={(e, data) => setInnerOpen(data.open)}>
      <DialogSurface {...innerSourceAttrs}>{/* Inner dialog content */}</DialogSurface>
    </Dialog>
  </Dialog>
);
```

**How it works:**

- `useRestoreFocusTarget()` attributes go on the button/element that opens the dialog
- `useRestoreFocusSource()` attributes go on the DialogSurface
- When the dialog closes, focus returns to the element with `useRestoreFocusTarget()` attributes
- Each dialog pair (source/target) manages its own focus restoration

## Best Practices

1. **Use DialogTrigger by default** - It provides automatic focus restoration for user-triggered opens
2. **Use focus hooks for programmatic dialogs** - When you open dialogs from code (not user clicks), use the focus restoration hooks
3. **Always apply focus attributes** - Don't skip focus management; it's essential for accessibility
4. **Test with keyboard navigation** - Verify that Escape key and backdrop clicks work correctly, and Tab/Shift+Tab navigate through the dialog stack

## Accessibility

Proper focus management in nested dialogs is crucial for:

- **Keyboard users** - They can close dialogs with Escape and navigate through the dialog stack using Tab
- **Screen reader users** - Focus announcements help users understand which dialog is active
- **Motor control users** - They depend on consistent focus behavior for reliable navigation

See [useRestoreFocusSource hook documentation](/docs/utilities-focus-management-userestorefocussource--docs) for more details on focus management utilities.
