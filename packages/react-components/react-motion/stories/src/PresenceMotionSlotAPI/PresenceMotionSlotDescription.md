This page is for **component authors** integrating a presence motion component into Fluent UI's slot system. If you're a consumer configuring an existing motion slot on a component, see [Using motion slots](https://react.fluentui.dev/?path=/docs/motion-using-motion-slots--docs) instead.

`presenceMotionSlot()` wraps a presence motion component (created with `createPresenceComponent()`) so that consumers can disable or customize enter/exit animations via props.

This is the API used by components like Dialog, Drawer, Popover, Menu, Accordion, Nav, and Tree to expose their animations as configurable slots. It manages `visible`, `appear`, and `unmountOnExit` state automatically.

### Customizing the motion

A consumer has three levers on a presence motion slot:

1. **Disable** it with `slot={null}`.
2. **Tune** it via direct params — if the component declared its slot as `Slot<PresenceMotionSlotProps<Params>>`, those params can be passed directly on the slot object (e.g. `surfaceMotion={{ duration: 600, outScale: 0.5 }}`). This mirrors how regular Fluent UI slots accept direct props (`badge={{ status: 'available' }}`).
3. **Replace** it via a `children` render function — swap in a completely different animation built with `createPresenceComponent()`.

### Props forwarded to the motion component

`PresenceMotionSlotProps` also exposes the props that any `createPresenceComponent`-based motion accepts. These flow through the slot to the underlying motion component:

- `imperativeRef` — exposes `setPlaybackRate` and `setPlayState` for runtime control. See [CreateMotionComponent › ImperativeRefPlayState](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent-imperativerefplaystate--docs).
- `onMotionStart`, `onMotionFinish`, `onMotionCancel` — lifecycle callbacks, each receiving `{ direction: 'enter' | 'exit' }`. See [CreatePresenceComponent › LifecycleCallbacks](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent-lifecyclecallbacks--docs).

For details on creating the underlying animations, see the [createPresenceComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs) documentation.
