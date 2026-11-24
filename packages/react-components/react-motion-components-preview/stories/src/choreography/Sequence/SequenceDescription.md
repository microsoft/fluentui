> **⚠️ Preview APIs are considered unstable**

`sequence(children, { gap? })` and `hold(duration)` express serial motion steps as plain POJO data rather than switching React components:

- **Persistent DOM identity:** Every step runs on the same mounted DOM node through one `AnimationHandle`, preserving focus and internal state.
- **Automatic WAAPI fill normalization:** Later steps touching the same `(target, property)` automatically strip backwards fill so they never clobber earlier steps during their delay window.
- **Composable with `layer` and `stagger`:** Nest `sequence()` inside `layer()` / `stagger()`, or wrap `stagger()` inside `sequence()` for container-then-items choreography with zero manual delay math.
