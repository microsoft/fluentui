The Drawer gives users a quick entry point to configuration and information. It should be used when retaining context is beneficial to users.

There are three main components to represent a Drawer:

- `OverlayDrawer`: An overlay Drawer renders on top of the whole page. By default blocks the screen and will require the user's full attention. Uses Dialog component under the hood.
- `InlineDrawer`: An inline Drawer renders within a container and can be placed next to any content.
- `Drawer`: A combination of OverlayDrawer and InlineDrawer. Used when toggling between the two modes is necessary. Often used for responsiveness.
