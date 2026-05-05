Consumers have two ways to customize a presence motion slot:

- **Direct params** — if the component typed its slot as `Slot<PresenceMotionSlotProps<Params>>`, those params can be passed directly on the slot object (e.g. `surfaceMotion={{ duration: 1000, outOpacity: 0.2 }}`). This is the lightweight path for tweaking the existing motion.
- **`children` render function** — the render function receives the default motion component and its props, so you can substitute a completely different animation built with `createPresenceComponent()`. Use this when you want to replace the motion rather than tune it.
