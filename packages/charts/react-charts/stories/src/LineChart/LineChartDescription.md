A line chart is a visual representation of data that shows the relationship between two variables, often used to show trends over a period of time or number line. Line charts plot data at regular intervals connected by lines. Multi-line charts enable comparison between multiple series over the same x domain.

Time intervals are traditionally mapped to the horizontal axis. Data values are mapped to the vertical axis.

### Interactive extension examples

- **LineChartKeyedScales**: four independent raw-value scales, two hidden axes, declared gap connection, a native gradient baseline fill, and a narrow layout. Use the switches to compare behavior without changing the observations or domains.
- **LineChartControlledInspection**: accept or decline pointer proposals, choose a measured point or unavailable slot, and clear controlled state. The readout distinguishes logical selection, native keyboard focus, and exact curve hits; external selection never moves focus.
- **LineChartMotion**: replay entrance, update values/domain, remove and quickly restore a comparison, or force reduced motion. A frame-bound SVG row shows the actual phase, progress, reveal, and retained-exit state; OS reduced-motion preferences remain respected.
- **LineChartIntervalAnnotations**: partial/transitive overlaps, a singleton band, exact active-on-slot membership, native grouped actions, and a read-only details dialog. Loading, failure, and cancellation are explicitly simulated; numeric and fixed-UTC-hour variants share the same annotation model.

These examples use the additive chart APIs in this branch. Published-package sandboxes may not contain these APIs until release; use the PR Storybook or a local build to exercise them.
