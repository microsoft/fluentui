`createStateMotionComponent()` creates a motion component from a flat graph of visual states and event-driven transitions. A pure JavaScript controller receives events and commits the next logical state synchronously; the React component subscribes to the controller and animates the selected edge on one target element.

The graph is deliberately smaller than a general statechart: states are flat, each state/event pair identifies at most one transition, and animation completion does not implicitly send another event. Events without a matching edge are ignored.

Each state defines its canonical resting keyframe. An edge can omit `motion` to animate directly between its source and target keyframes, provide an `AtomMotion`, or use a function to derive motion from a typed event payload.

The state name `target` is reserved because `{ state: 'target' }` refers to the selected edge's destination keyframe in transition motion definitions.

The controller commits every accepted event synchronously. If several events occur before React commits, the component animates the latest selected edge from the element's current presentation; this matches React's normal batching behavior while preserving the full logical state progression in the controller.
