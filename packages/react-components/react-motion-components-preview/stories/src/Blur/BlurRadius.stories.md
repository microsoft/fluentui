The `Blur` component accepts three graph-level radius props:

- **`fromRadius`** — blur amount before the element enters (defaults to `10px`)
- **`restRadius`** — blur amount while the element is visible (defaults to `0px`)
- **`toRadius`** — blur amount after the element exits (defaults to `fromRadius`)

Each card shows a different transition graph, including asymmetric exits. `animateOpacity` is disabled to isolate the blur effect.
