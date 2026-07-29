This example shows how a component author creates a presence motion slot from scratch using `presenceMotionSlot()`.

The pattern involves four steps:

1. **Create a default motion** with `createPresenceComponent()` — this defines the enter/exit animation.
2. **Define slot types** — add a `Slot<PresenceMotionSlotProps>` to your component's slots.
3. **Wire the slot** in your state hook — call `presenceMotionSlot()` with `elementType` and `defaultProps` (including `visible` and `unmountOnExit`).
4. **Render the slot** — use `assertSlots()` and render `<state.surfaceMotion>` wrapping the animated content.

Consumers of the component can then disable the motion by passing `null`, or customize it with a render function.
