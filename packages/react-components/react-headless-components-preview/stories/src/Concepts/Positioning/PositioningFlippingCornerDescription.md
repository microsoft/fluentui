Combined flip — when the requested placement overflows on both axes, `flip-block` and `flip-inline` fire together and yield the diagonally opposite placement (e.g. a top-left trigger requesting `above-end` → actual `below-start`).

Each trigger sits in a corner of its dashed box and requests a placement that overflows on both axes. Native `flip-block` + `flip-inline` together resolve to the diagonally opposite placement.
