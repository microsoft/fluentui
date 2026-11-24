> **⚠️ Preview APIs are considered unstable**

Choreography and stagger definitions live in plain motion data (POJOs) rather than nested React motion components:

- **`layer(target, motion, options?)`** binds one or more motion atoms to a DOM element or CSS selector with an optional additive `delay`.
- **`cloneMotionToTargets(targets, motion, options?)`** creates one `MotionLayer` per target without mutating the motion or adding stagger offsets.
- **`stagger(members, { startInterval, order? })`** preserves ordered layer participants and adds `index * startInterval` to each member's existing delay.
- **`resolveChoreography(motion, rootOrOptions?)`** lowers choreography POJOs into target-bound `AtomMotion[]` for the Web Animations API.
- **`createChoreographyComponent` / `createChoreographyPresenceComponent`** turn choreography POJOs into motion or presence components controlled by one `AnimationHandle`.
- **`createStaggerComponent` / `createStaggerPresenceComponent`** create homogeneous staggered components over matched targets (default `':scope > *'`).
