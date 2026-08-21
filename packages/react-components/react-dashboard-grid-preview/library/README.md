# @fluentui/react-dashboard-grid-preview

**Dashboard Grid components for [Fluent UI React](https://react.fluentui.dev/)**

> **Preview package:** These APIs are not production-ready and may change before a stable release.

The package provides a responsive dashboard layout, item composition, shared-provider transfer support, drag sources,
and drop zones.

## Public entry points

- `@fluentui/react-dashboard-grid-preview` exposes the React components and hooks.
- `@fluentui/react-dashboard-grid-preview/engine` exposes the React-free and DOM-free layout engine.
- `@fluentui/react-dashboard-grid-preview/gridstack-compat` exposes explicit GridStack conversion and DOM adapters.

Preview APIs must be imported directly from this package. They are not re-exported from
`@fluentui/react-components/unstable`.

## React ownership modes

`DashboardGrid` supports three explicit, mutually exclusive ownership modes:

- `defaultItems` for uncontrolled model ownership.
- `items` with `onItemsChange` for controlled ownership.
- Declarative `DashboardGridItem` children for React-owned descriptors and content.

Declarative items remain registered for their mounted lifetime. A shared `DashboardGridProvider` preserves item
content state and focus during cross-grid transfer, including dynamically created nested grids.

## Layout and commands

Screen layout uses a relative surface with absolutely positioned item and placeholder shells. SSR uses deterministic
percentage geometry until client measurement resolves exact pixel geometry; print mode replaces screen positioning
with flow or exact print projection.

Use `imperativeRef` for commands such as querying, batching, fitting, compacting, changing columns, rotating,
enabling/disabling, focusing, and refreshing handles. The ordinary forwarded ref always targets the root HTML
element. The public command handle intentionally does not expose the mutable internal store.

Root and nested grids share the same options for columns, responsive layouts, row height, gap, row constraints,
drag/resize disablement, external acceptance, removal zones, dynamic nesting, print behavior, and optional engine
injection. Public callbacks follow Fluent's `(event, data)` convention and include committed item changes,
drag/resize progress, content resizing, enablement, and final item drops.
