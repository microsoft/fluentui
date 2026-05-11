# Nested Dialogs

When implementing nested dialogs (a dialog opened from within another dialog), proper focus management is critical to ensure users can navigate back through the dialog stack correctly.

## Important: Nested Dialogs Should Be Closed Programmatically

Nested dialogs should **always be closed programmatically** through state management, not manually by clicking outside or pressing Escape. This ensures predictable focus behavior and a better user experience.

## Two Approaches

### Approach 1: Using DialogTrigger (Recommended for User-Triggered Opens)

If the nested dialog is opened by a button click (user interaction), use `DialogTrigger` for automatic focus restoration:

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
- No need for manual focus management hooks

### Approach 2: Using Focus Restoration Hooks (For Programmatic Control)

If the nested dialog is opened programmatically (not triggered by user interaction), use `useRestoreFocusSource()` and `useRestoreFocusTarget()` hooks:

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
4. **Close dialogs programmatically** - Don't rely on manual close (clicking outside, pressing Escape) for nested dialogs
5. **Test with keyboard navigation** - Verify that Tab and Shift+Tab work correctly through the dialog stack

## Accessibility

Proper focus management in nested dialogs is crucial for:

- **Keyboard users** - They can navigate back through the dialog stack using Tab
- **Screen reader users** - Focus announcements help users understand which dialog is active
- **Motor control users** - They depend on consistent focus behavior for reliable navigation

See [useRestoreFocusSource hook documentation](/docs/utilities-focus-management-userestorefocussource--docs) for more details on focus management utilities.
