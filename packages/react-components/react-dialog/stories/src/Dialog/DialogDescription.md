`Dialog` is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

### Portal mount node and z-index

`DialogSurface` uses a `Portal` internally to render the surface and backdrop. By default, the portal creates a mount node outside the application DOM tree. Pass `mountNode` to `DialogSurface`, not `Dialog`, to customize where that content is rendered; no additional `Portal` wrapper is needed.

See the shared [Portal documentation](./?path=/docs/components-portal-portal--docs) for rendering into an existing element, and [mount node customization and z-index guidance](./?path=/docs/components-portal-tomountnodeprops--docs) for styling a generated mount node. These options also apply to other components that expose `mountNode`.
