`createStateMotionComponent()` creates a motion component from a flat graph of visual states and event-driven transitions. A pure JavaScript controller receives events, and the React component subscribes to the controller and animates the selected edge on one target element.

The graph is deliberately smaller than a general statechart: states are flat and each state/event pair identifies at most one transition. Events without a matching edge are ignored.

Event transitions commit their target synchronously. A state can declare an `animation` that starts when the state is entered and names the state reached when that animation finishes. The controller ignores stale animation completion IDs after an interruption. Because active animation phases are ordinary graph states, they can define their own event transitions and choose the semantic destination of an interruption.

Each state defines its canonical resting keyframe. An edge can omit `motion` to animate directly between its source and target keyframes, provide an `AtomMotion`, or use a function to derive motion from a typed event payload.

Machine skins can also resolve state keyframes from a typed `context` prop. This keeps reusable machine states independent from layout-specific values such as an origin and destination, while the skin maps the current context to concrete presentation values.

The state name `target` is reserved because `{ state: 'target' }` refers to the active animation's destination keyframe.

If several events occur before React commits, the component animates the latest selected animation from the element's current presentation; this matches React's normal batching behavior while preserving the full logical state progression in the controller.

One component owns completion for an active animation. Additional components can animate the same controller snapshot with `completeAnimation={false}`. This is useful for synchronized presentation such as a card and its state graph without letting multiple renderers race to settle the machine.
