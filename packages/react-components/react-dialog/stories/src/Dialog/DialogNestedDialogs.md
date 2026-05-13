# Nested Dialogs

Nested dialogs (opening a dialog from within another dialog) are an anti-pattern and should be avoided whenever possible.
If you must use them, ensure focus management is correct to keep keyboard navigation predictable and accessible.

## Key Principle

When using nested dialogs, **prefer `DialogTrigger` for focus restoration**. If you open a dialog programmatically without `DialogTrigger`, you become responsible for managing open state and focus restoration.

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

## Programmatic Control: Managing open state and focus

If you must open dialogs programmatically (without user click), use `useRestoreFocusTarget()` on the elements that open each dialog. Note that you are responsible for ensuring focus is correctly restored:

```tsx
const [outerOpen, setOuterOpen] = React.useState(false);
const [innerOpen, setInnerOpen] = React.useState(false);

const outerTargetAttrs = useRestoreFocusTarget();
const innerTargetAttrs = useRestoreFocusTarget();

return (
  <>
    <Button {...outerTargetAttrs} onClick={() => setOuterOpen(true)}>
      Open Outer Dialog
    </Button>
    <Dialog open={outerOpen} onOpenChange={(e, data) => setOuterOpen(data.open)}>
      <DialogSurface>
        <Button {...innerTargetAttrs} onClick={() => setInnerOpen(true)}>
          Open Inner Dialog
        </Button>

        <Dialog open={innerOpen} onOpenChange={(e, data) => setInnerOpen(data.open)}>
          <DialogSurface>{/* Inner dialog content */}</DialogSurface>
        </Dialog>
      </DialogSurface>
    </Dialog>
  </>
);
```

`DialogSurface` already provides restore-focus source attributes internally when used inside `Dialog`.

**How it works:**

- `useRestoreFocusTarget()` attributes go on the button/element that opens the dialog
- When a dialog closes, focus returns to the element with `useRestoreFocusTarget()` attributes
- Each dialog opener should have its own restore-focus target

For a complete programmatic-open example, see [Trigger outside Dialog](https://react.fluentui.dev/?path=/docs/components-dialog--docs#trigger-outside-dialog).

## Best Practices

1. **Avoid nested dialogs when possible** - Prefer simpler flows when the design allows it
2. **Use DialogTrigger by default** - It provides automatic focus restoration for user-triggered opens
3. **Use restore-focus targets for programmatic dialogs** - Add `useRestoreFocusTarget()` to elements that open dialogs
4. **Test with keyboard navigation** - Verify that Escape key and backdrop clicks work correctly, and Tab/Shift+Tab navigate through the dialog stack

## Accessibility

Proper focus management in nested dialogs is crucial for:

- **Keyboard users** - They can close dialogs with Escape and navigate through the dialog stack using Tab
- **Screen reader users** - Focus announcements help users understand which dialog is active
- **Motor control users** - They depend on consistent focus behavior for reliable navigation

See [focus management utilities documentation](https://react.fluentui.dev/?path=/docs/utilities-focus-management-userestorefocussource--docs) for more details on focus management utilities.
