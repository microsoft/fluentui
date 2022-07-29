<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview components are considered unstable:**
>
> ```jsx
>
> import {
>  Dialog,
>  DialogBody,
>  DialogTitle,
>  DialogSurface,
>  DialogActions,
>  DialogTrigger,
> } from '@fluentui/react-components/unstable';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product

`Dialog` is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.
