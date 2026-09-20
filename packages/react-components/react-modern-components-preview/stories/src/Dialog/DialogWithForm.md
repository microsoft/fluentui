Having a `form` inside the `Dialog` its quite simple, you simply add a `<form>` element inside `DialogSurface` and wrap the dialog sections. This allows a button inside `DialogActions` to be properly used as submission button.

> Keep in mind that controlling the `open` state of the `Dialog` might be ideal in this scenario, since validation and submission are possibly synchronous activities. For example, closing the `Dialog` only after the submission is successful would require control of the `open` state, to properly set `open` to `false` only once the submission has succeeded.
