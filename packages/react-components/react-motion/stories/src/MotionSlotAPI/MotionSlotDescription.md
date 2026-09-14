This page is for **component authors** integrating a motion component into Fluent UI's slot system. If you're a consumer configuring an existing motion slot on a component, see [Using motion slots](https://react.fluentui.dev/?path=/docs/motion-using-motion-slots--docs) instead.

`motionSlot()` wraps a motion component (created with `createMotionComponent()`) so that consumers can disable or customize one-way animations via props.

Use `motionSlot()` for animations that play automatically without enter/exit visibility semantics — for example, looping animations like loading indicators, pulsing badges, or indeterminate progress bars. For animations that need to respond to a `visible` state, use [presenceMotionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-presencemotionslot--docs) instead.

### Customizing the motion

A consumer has three levers on a motion slot:

1. **Disable** it with `slot={null}`.
2. **Tune** it via direct params — if the component declared its slot as `Slot<MotionSlotProps<Params>>`, those params can be passed directly on the slot object (e.g. `pulseMotion={{ duration: 100 }}`).
3. **Replace** it via a `children` render function — swap in a completely different animation built with `createMotionComponent()`.

### Props forwarded to the motion component

`MotionSlotProps` also exposes the props that any `createMotionComponent`-based motion accepts. These flow through the slot to the underlying motion component:

- `imperativeRef` — exposes `setPlaybackRate` and `setPlayState` for runtime control. See [CreateMotionComponent › ImperativeRefPlayState](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent-imperativerefplaystate--docs).
- `onMotionStart`, `onMotionFinish`, `onMotionCancel` — lifecycle callbacks. See [CreateMotionComponent › LifecycleCallbacks](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent-lifecyclecallbacks--docs).

For details on creating the underlying animations, see the [createMotionComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent--docs) documentation.
