### Layout

Placeholder

### Focus after data updates

`focusRestorePolicy` defaults to `preserve`: data and color updates retain focus owned by the chart, without taking it from an external control. `none` disables automatic restoration while retaining navigation memory. Changing the policy alone does not move focus.

Use `reset` when an application deliberately wants a content update to return focus to a remembered chart target. For Plotly multi-plots and Vega `hconcat`/`vconcat`, only the last-focused subplot receives that reset intent. Plotly identifies the recipient by its axis group (or non-Cartesian trace group), and Vega uses the child index. These are positional identities, not stable identities for reordered data.

Other subplots retain their own navigation memory and use `preserve`; they do not compete for external focus. If the intended subplot is removed or its remembered target is inactive, missing, or not focusable, focus stays where it is rather than falling back to another subplot. With no previously focused subplot, reset does not choose an arbitrary destination. Each leaf chart remains responsible for resolving and focusing its own point, bar, or segment.

For LineChart, the leaf also retains the source series/point coordinates of an open callout. It derives the displayed values and colors from the current data, using the existing callout mapping, and positions the callout against the current marker or path highlight. This refresh does not depend on another focus event: it works when the SVG node survives an update or when focus is inside the custom callout. Under `preserve`, a custom input retains its focus, value, and component instance while the payload and anchor update. ChartPopover's rendering and global autofocus behavior are unchanged; applications must keep their custom content's component type and key stable to retain its state.

Callout availability uses the same current X scale and effective primary or secondary Y scale as the rendered point. A finite value can still be unavailable: zero and negative values on a positive logarithmic axis close the callout instead of positioning against a removed marker. Valid positive log-scale values and linear-scale zero values retain their callouts and custom input state.

VerticalBarChart similarly derives open callout data from the selected source point and follows the current bar or line marker, preserving the original focus-center or relative hover position. GaugeChart already derives values and colors during rendering; it also resolves the selected segment's current legend and arc, including RTL changes. These leaf charts keep valid custom callout inputs mounted and focused under `preserve`, but close callouts whose selected target becomes unavailable. A content refresh alone does not reopen a dismissed callout; permitted focus restoration may open it through the normal focus handler. No equivalent reconciliation is duplicated in the declarative wrappers.

VerticalBarChart validates a selected line-overlay anchor against the current X and effective primary or secondary Y scale, including when that marker opened a stacked bar/line callout. Invalid overlay points are omitted from the path and marker list. Bars retain their own rendering scales and existing zero-height exclusion; an overlay's logarithmic scale must not invalidate an otherwise rendered bar.
