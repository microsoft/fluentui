`flip-block` — the browser swaps the block axis (`above` ↔ `below`) when the requested side would overflow. Each demo lives in a dashed, `contain: layout` box so the overflow check happens relative to the box.

Both triggers overflow their requested side → native `position-try-fallbacks: flip-block` swaps the block axis. Compare the **Requested** label with the live **Actual** readout rendered from `[data-placement]`.
