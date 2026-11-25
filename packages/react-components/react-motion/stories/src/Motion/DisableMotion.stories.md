You can disable any motion slot on a Fluent component by passing `null` to it. The content will appear and disappear instantly without animation.

Components may have multiple motion slots. For example, **Dialog** has two:

- `surfaceMotion` on `<Dialog>` — controls the surface enter/exit animation (scale + fade)
- `backdropMotion` on `<DialogSurface>` — controls the backdrop dim overlay animation

**Drawer** also has two:

- `surfaceMotion` — controls the slide animation of the drawer panel
- `backdropMotion` — controls the backdrop dim overlay (overlay drawers only)

You can disable them independently or together.
