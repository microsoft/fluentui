I using a `Dialog` without a `DialogTrigger`, it is up to the user to make sure that the focus is restored correctly
when the dialog is closed. This can be done quite easily by using the `useRestoreFocusTarget` hook. The `Dialog` already
uses the `useRestoreFocusSource` hook directly, which will restore focus to the most recently focused target on close.
