When using a `Dialog` without a `DialogTrigger`, you become responsible for managing the dialog's behavior. This applies to:

- Opening dialogs programmatically (via state, API calls, side effects)
- Opening nested dialogs where the inner dialog is not wrapped in a `DialogTrigger`

**Your responsibilities:**

1. **Control the open state** - React to the `onOpenChange` callback and ensure the `open` state reflects the dialog's visibility
2. **Restore focus** - When the dialog closes, you must restore focus to the element that triggered the open. Use `useRestoreFocusTarget` on the trigger element and `useRestoreFocusSource` on the `DialogSurface`, or manually invoke `.focus()` on the target element.

The example below showcases both responsibilities:
