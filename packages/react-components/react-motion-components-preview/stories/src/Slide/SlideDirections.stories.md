Use `fromX` and `fromY` to choose the entrance position, and `toX` and `toY` to choose an independent exit destination. Values accept CSS lengths such as `px` and `%`. The present position uses `inX` and `inY`, which default to `'0px'`.

On `Slide.In`, supply `fromX`/`fromY` to animate from that offset to `(0px, 0px)`. On `Slide.Out`, supply `toX`/`toY` to animate from `(0px, 0px)` to that offset. Omitted axes in an authored endpoint use `'0px'`.
