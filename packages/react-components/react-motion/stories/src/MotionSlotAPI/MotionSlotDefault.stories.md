This example shows how a component author creates a motion slot from scratch using `motionSlot()`.

The pattern involves four steps:

1. **Create a default motion** with `createMotionComponent()` — this defines the animation (here, a looping pulse).
2. **Define slot types** — add a `Slot<MotionSlotProps>` to your component's slots.
3. **Wire the slot** in your state hook — call `motionSlot()` with `elementType` and `defaultProps`.
4. **Render the slot** — use `assertSlots()` and render `<state.pulseMotion>` wrapping the animated content.

Consumers of the component can then disable the motion by passing `null`, or customize it with a render function.
