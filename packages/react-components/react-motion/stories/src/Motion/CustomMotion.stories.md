You can replace a component's default animation by providing a `children` render function to a motion slot. The render function receives the default motion component and its props, and you return your own animation component built with [createPresenceComponent](?path=/docs/motion-apis-createpresencecomponent--docs).

**Dialog** has two customizable motion slots:

- `surfaceMotion` on `<Dialog>` — the surface enter/exit animation
- `backdropMotion` on `<DialogSurface>` — the backdrop overlay animation

**Drawer** also supports this via:

- `surfaceMotion` — the slide animation of the drawer panel
