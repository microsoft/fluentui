This section is for **consumers** of Fluent UI components that expose motion slots. If you're a component author looking to add motion slots to your own component, see the API docs for [motionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-motionslot--docs) and [presenceMotionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-presencemotionslot--docs) instead.

A motion slot gives the consumer three levers, without touching the component's internals:

- **Disable** with `slot={null}` — render the content with no animation.
- **Tune** with direct params — pass motion params (e.g. `{ duration: 600, outScale: 0.5 }`) directly on the slot object, the same way any Fluent UI slot accepts props.
- **Replace** with a `children` render function — substitute a different animation entirely, built with `createMotionComponent()` or `createPresenceComponent()`.

The stories in this section demonstrate each lever against real Fluent components. The [Components with motion slots](https://react.fluentui.dev/?path=/docs/motion-using-motion-slots-components-with-motion-slots--docs) page lists every v9 component that exposes a motion slot, with a link to a motion-specific story in each component's own package.
