The root `Blur` component accepts three radius props:

- **`fromRadius`**: blur radius at the start of entry (defaults to `10px`).
- **`inRadius`**: blur radius when present (defaults to `0px`).
- **`toRadius`**: blur radius at the end of exit (defaults to `fromRadius`).

Each card omits `toRadius` to mirror its entrance radius on exit. The active radius value is **bolded** in the header. `animateOpacity` is disabled to isolate the blur effect.

On `Blur.In`, use `fromRadius` to animate into the present pose (`'0px'`). On `Blur.Out`, use `toRadius` to animate away from `'0px'`. `inRadius` belongs only to the root presence component.
