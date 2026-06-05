Consumers have two ways to customize a motion slot:

- **Direct params** — if the component typed its slot as `Slot<MotionSlotProps<Params>>`, those params can be passed directly on the slot object (`pulseMotion={{ duration: 100 }}`). This is the lightweight path for tweaks.
- **`children` render function** — the render function receives the default motion component and its props, so you can substitute a completely different animation built with `createMotionComponent()`. Use this when you want to replace the motion rather than tune it.
