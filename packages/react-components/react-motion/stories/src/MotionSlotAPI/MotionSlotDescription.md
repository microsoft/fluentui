`motionSlot()` integrates a motion component (created with `createMotionComponent()`) into Fluent UI's slot system. It allows component consumers to disable or customize one-way animations on a component via props.

Use `motionSlot()` for animations that play automatically without enter/exit visibility semantics — for example, looping animations like loading indicators, pulsing badges, or indeterminate progress bars. For animations that need to respond to a `visible` state, use [presenceMotionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-presencemotionslot--docs) instead.

For details on creating the underlying animations, see the [createMotionComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent--docs) documentation.
