# Change Log - @fluentui/react-calendar-preview

<!-- This log was last generated on Thu, 22 Oct 2026 11:25:58 GMT and should not be manually modified. -->

<!-- Start content -->

## [0.2.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-calendar-preview_v0.2.0)

Thu, 22 Oct 2026 11:25:58 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-calendar-preview_v0.1.0..@fluentui/react-calendar-preview_v0.2.0)

### Minor changes

- feat: render Calendar grid rows and cells from picker state with grid-owned keyboard navigation and a roving tab stop; add CalendarDay renderDay and remove the row and cell components; preserve button currentTarget for picker selection events and support selection from SVG and descendant-focusgroup cell content; clear range hover and pressed state when leaving editable day content; preserve cancelled-click focus, a single eligible tab stop through hidden-panel updates and reveal while excluding individually hidden dates, restricted-date focus with allFocusable, focus after synchronous controlled navigation, and explicitly empty navigation-button content ([PR #36948](https://github.com/microsoft/fluentui/pull/36948) by dmytrokirpa@microsoft.com)

## [0.1.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-calendar-preview_v0.1.0)

Mon, 19 Oct 2026 16:49:00 GMT

### Minor changes

- chore: initial release ([PR #36751](https://github.com/microsoft/fluentui/pull/36751) by dmytrokirpa@microsoft.com)
- Bump @fluentui/react-context-selector to v9.2.21 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)
- Bump @fluentui/react-jsx-runtime to v9.4.7 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)
- Bump @fluentui/react-motion to v9.16.5 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)
- Bump @fluentui/react-motion-components-preview to v0.15.10 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)
- Bump @fluentui/react-tabster to v9.26.19 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)
- Bump @fluentui/react-utilities to v9.27.0 ([commit](https://github.com/microsoft/fluentui/commit/undefined) by beachball)

### Patches

- fix: Align Calendar sizing, popup focus, and keyboard selection behavior. ([PR #36917](https://github.com/microsoft/fluentui/pull/36917) by dmytrokirpa@microsoft.com)
- fix: restore class-independent Calendar focus, two-dimensional grid arrows that skip unfocusable cells, and consumer keyboard event ordering and cancellation ([PR #36884](https://github.com/microsoft/fluentui/pull/36884) by dmytrokirpa@microsoft.com)
