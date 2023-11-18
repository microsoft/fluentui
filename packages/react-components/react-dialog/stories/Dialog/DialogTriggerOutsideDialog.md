When using a `Dialog` without a `DialogTrigger` (or when using a `DialogTrigger` outside of a `Dialog`), it becomes your responsibility to control some of the dialog's behavior.

1. You must make sure that the `open` state is set accordingly to the dialog's visibility (mostly this means to properly react to the events provided by `onOpenChange` callback on `Dialog` component).
2. You must make sure that focus is properly restored once the dialog is closed (this can be achieved by using the `useRestoreFocusTarget` hook, or by manually invoking `.focus()` on the target element).

The example bellow showcases both explicit responsibilities:
