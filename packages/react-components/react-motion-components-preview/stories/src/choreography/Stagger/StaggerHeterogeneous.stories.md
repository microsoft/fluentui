Because stagger structure lives in the motion POJO, participants do not need to be direct JSX siblings or share the same animation.

This example uses `createChoreographyPresenceComponent` with `stagger([...])` and `layer(selector, motion, { delay })` to coordinate media scaling, title sliding, copy fading, and delayed action buttons across nested DOM elements under one `AnimationHandle`.
