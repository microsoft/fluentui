### Layout

Placeholder

### Focus after data updates

`focusRestorePolicy` defaults to `preserve`: data and color updates retain focus owned by the chart, without taking it from an external control. `none` disables automatic restoration while retaining navigation memory. Changing the policy alone does not move focus.

Use `reset` when an application deliberately wants a content update to return focus to a remembered chart target. For Plotly multi-plots and Vega `hconcat`/`vconcat`, only the last-focused subplot receives that reset intent. Plotly identifies the recipient by its axis group (or non-Cartesian trace group), and Vega uses the child index. These are positional identities, not stable identities for reordered data.

Other subplots retain their own navigation memory and use `preserve`; they do not compete for external focus. If the intended subplot is removed or its remembered target is inactive, missing, or not focusable, focus stays where it is rather than falling back to another subplot. With no previously focused subplot, reset does not choose an arbitrary destination. Each leaf chart remains responsible for resolving and focusing its own point, bar, or segment.
