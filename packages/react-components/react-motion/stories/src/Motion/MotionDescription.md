Fluent UI components use `@fluentui/react-motion` to handle animations. Components that expose a motion slot can be configured by consumers to disable or customize the animation.

There are three ways to configure a motion slot:

- **Disable** with `slot={null}` — renders the content with no animation.
- **Tune** with direct params — pass motion params (e.g. `{ duration: 600, outScale: 0.5 }`) directly on the slot object, the same way any Fluent UI slot accepts props.
- **Replace** with a `children` render function — substitute a different animation entirely, built with `createMotionComponent()` or `createPresenceComponent()`.

For technical details on how components expose motion slots in the first place, see:

- [motionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-motionslot--docs) — for one-way or looping animations
- [presenceMotionSlot()](https://react.fluentui.dev/?path=/docs/motion-apis-presencemotionslot--docs) — for enter/exit presence animations
