# Change Log - @fluentui/react-components

This log was last generated on Mon, 17 Jun 2024 07:34:16 GMT and should not be manually modified.

<!-- Start content -->

## [9.54.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.54.2)

Mon, 17 Jun 2024 07:34:16 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.54.1..@fluentui/react-components_v9.54.2)

### Minor changes

- `@fluentui/react-motion`
  - feat: Implement `onMotionCancel` callback handler ([PR #31698](https://github.com/microsoft/fluentui/pull/31698) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - Exposing TabsterMoveFocusEvent. ([PR #31393](https://github.com/microsoft/fluentui/pull/31393) by marata@microsoft.com)

### Patches

- `@fluentui/react-context-selector`
  - fix: useContextSelector with React 18 ([PR #30951](https://github.com/microsoft/fluentui/pull/30951) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - Removing ignoreKeydown on MenuList as it has side effect on submenus. ([PR #31393](https://github.com/microsoft/fluentui/pull/31393) by marata@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Pulling Tabster 8.0.0 for the tree-shakeability improvements to reduce the bundle size. ([PR #31441](https://github.com/microsoft/fluentui/pull/31441) by marata@microsoft.com)

## [9.54.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.54.1)

Wed, 12 Jun 2024 13:17:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.54.0..@fluentui/react-components_v9.54.1)

### Minor changes

- `@fluentui/react-accordion`
  - Deprecated react-accordion navigation prop. Tab navigation only should be used according to W3 APG pattern. ([PR #31587](https://github.com/microsoft/fluentui/pull/31587) by vgenaev@gmail.com)
- `@fluentui/react-motion`
  - feat: add support for params ([PR #31566](https://github.com/microsoft/fluentui/pull/31566) by olfedias@microsoft.com)
  - feat: Add consistent start and finish lifecycle callbacks ([PR #31644](https://github.com/microsoft/fluentui/pull/31644) by lingfangao@hotmail.com)
- `@fluentui/react-nav-preview`
  - feat: Adding small size variant. ([PR #31589](https://github.com/microsoft/fluentui/pull/31589) by matejera@microsoft.com)
  - (chore): Remove NavDrawerHeaderNav component. ([PR #31646](https://github.com/microsoft/fluentui/pull/31646) by matejera@microsoft.com)
- `@fluentui/react-tree`
  - feature: onVisibilityChange method to TreeItemLayout action slot ([PR #31598](https://github.com/microsoft/fluentui/pull/31598) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-card`
  - fix: improve header alignment when no description is passed ([PR #31681](https://github.com/microsoft/fluentui/pull/31681) by marcosvmmoura@gmail.com)
- `@fluentui/react-motion`
  - fix(motions): improve compat for jsdom & jest ([PR #31602](https://github.com/microsoft/fluentui/pull/31602) by olfedias@microsoft.com)
- `@fluentui/react-nav-preview`
  - feat: Adding roles and current where appropriate. ([PR #31649](https://github.com/microsoft/fluentui/pull/31649) by matejera@microsoft.com)

## [9.54.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.54.0)

Thu, 06 Jun 2024 15:26:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.53.0..@fluentui/react-components_v9.54.0)

### Minor changes

- `@fluentui/react-aria`
  - add optional `window` argument to `scrollIntoView`. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-components`
  - chore: exports DialogModalType type ([PR #31549](https://github.com/microsoft/fluentui/pull/31549) by bernardo.sunderhus@gmail.com)
  - feat: re-export `useTimeout()` and `useAnimationFrame()`. ([PR #31527](https://github.com/microsoft/fluentui/pull/31527) by seanmonahan@microsoft.com)
  - feat: add @fluentui/react-motion to suite ([PR #31574](https://github.com/microsoft/fluentui/pull/31574) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: exports DialogModalType type ([PR #31549](https://github.com/microsoft/fluentui/pull/31549) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-drawer`
  - feat: allow aside as tag for Drawer components ([PR #31434](https://github.com/microsoft/fluentui/pull/31434) by marcosvmmoura@gmail.com)
- `@fluentui/react-motion`
  - feat: release stable ([PR #31574](https://github.com/microsoft/fluentui/pull/31574) by olfedias@microsoft.com)
- `@fluentui/react-nav-preview`
  - chore: Recomposing NavSectionHeader and Hamburger. Removing HamburgerInNav. Some other pixel pushing. ([PR #31387](https://github.com/microsoft/fluentui/pull/31387) by matejera@microsoft.com)
- `@fluentui/react-tag-picker`
  - feat: adds text property to TagPickerOption ([PR #31474](https://github.com/microsoft/fluentui/pull/31474) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tree`
  - feature: preventScroll on navigation ([PR #31577](https://github.com/microsoft/fluentui/pull/31577) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/priority-overflow`
  - chore: disable eslint rule ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-accordion`
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-aria`
  - chore: remove optional "win" argument ([PR #31470](https://github.com/microsoft/fluentui/pull/31470) by seanmonahan@microsoft.com)
- `@fluentui/react-calendar-compat`
  - feat(calendar-compat): changed design for the selected state ([PR #31509](https://github.com/microsoft/fluentui/pull/31509) by vkozlova@microsoft.com)
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
  - chore: Renaming useCalendarMonthStyles.ts to useCalendarMonthStyles.styles.ts. ([PR #31568](https://github.com/microsoft/fluentui/pull/31568) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-dialog`
  - chore: use @fluentui/react-motion ([PR #31574](https://github.com/microsoft/fluentui/pull/31574) by olfedias@microsoft.com)
- `@fluentui/react-list-preview`
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - chore: disable eslint rule. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-message-bar`
  - chore: disable eslint rule ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: Fixing typo in CheckboxShim migration. ([PR #31569](https://github.com/microsoft/fluentui/pull/31569) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-nav-preview`
  - fix: compatibility with Drawer slots ([PR #31434](https://github.com/microsoft/fluentui/pull/31434) by marcosvmmoura@gmail.com)
- `@fluentui/react-popover`
  - chore: disable eslint rule. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-search`
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-skeleton`
  - chore: rename useSkeletonStyles.ts to useSkeletonStyles.styles.ts ([PR #31503](https://github.com/microsoft/fluentui/pull/31503) by seanmonahan@microsoft.com)
- `@fluentui/react-slider`
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - fix: use requestAnimationFrame from Fluent context. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-teaching-popover`
  - Use `MutationObserver` from global context. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - fix: clear icon not working with freeform ([PR #31324](https://github.com/microsoft/fluentui/pull/31324) by yuanboxue@microsoft.com)
- `@fluentui/react-toast`
  - chore: migrate Toast to new motion library ([PR #31516](https://github.com/microsoft/fluentui/pull/31516) by olfedias@microsoft.com)
  - chore: use @fluentui/react-motion ([PR #31574](https://github.com/microsoft/fluentui/pull/31574) by olfedias@microsoft.com)
  - chore: adopt changes in motion APIs ([PR #31508](https://github.com/microsoft/fluentui/pull/31508) by olfedias@microsoft.com)
  - chore: disable eslint rule. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)
- `@fluentui/react-tree`
  - bugfix: ensure roving tab index when children content changes ([PR #31595](https://github.com/microsoft/fluentui/pull/31595) by bernardo.sunderhus@gmail.com)
  - chore: ensure only state or defaultState is provided on useControllableState hook invocation ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - chore: useControllableState warns if controlled and uncontrolled at the same time ([PR #31461](https://github.com/microsoft/fluentui/pull/31461) by bernardo.sunderhus@gmail.com)
  - fix: use globals from Fluent context. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)

### Changes

- `@fluentui/react-virtualizer`
  - fix: update internal function to optionally use global Fluent context. ([PR #30967](https://github.com/microsoft/fluentui/pull/30967) by seanmonahan@microsoft.com)

## [9.53.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.53.0)

Thu, 23 May 2024 08:02:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.52.0..@fluentui/react-components_v9.53.0)

### Minor changes

- `@fluentui/react-components`
  - chore: re-exports DialogProvider ([PR #31450](https://github.com/microsoft/fluentui/pull/31450) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-drawer`
  - deprecate: defaultOpen as it is not being used ([PR #31435](https://github.com/microsoft/fluentui/pull/31435) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-aria`
  - fix: add cleanup for timeout in announce ([PR #31264](https://github.com/microsoft/fluentui/pull/31264) by sarah.higley@microsoft.com)
- `@fluentui/react-avatar`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-breadcrumb`
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: migrate .shorthands() [cxe-red] ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-calendar-compat`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore(Dialog): migrate to new motion APIs ([PR #31380](https://github.com/microsoft/fluentui/pull/31380) by olfedias@microsoft.com)
- `@fluentui/react-drawer`
  - fix(OverlayDrawer): unlock scroll when reduced motion is enabled ([PR #31380](https://github.com/microsoft/fluentui/pull/31380) by olfedias@microsoft.com)
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-infolabel`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-list-preview`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-message-bar`
  - chore: replace usage of .shorthands() in styles ([PR #31458](https://github.com/microsoft/fluentui/pull/31458) by olfedias@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-nav-preview`
  - chore: replace usage of .shorthands() in styles ([PR #31458](https://github.com/microsoft/fluentui/pull/31458) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - fix: Update IconDirectionContextProvider imports to use export map ([PR #31006](https://github.com/microsoft/fluentui/pull/31006) by ololubek@microsoft.com)
- `@fluentui/react-radio`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-rating`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-swatch-picker`
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - fix: bump tabster to 7.1.4 containing fix for https://github.com/microsoft/tabster/issues/374. ([PR #31413](https://github.com/microsoft/fluentui/pull/31413) by marata@microsoft.com)
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-tag-picker`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-tags`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-teaching-popover`
  - chore: replace usage of .shorthands() in styles ([PR #31458](https://github.com/microsoft/fluentui/pull/31458) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: replace usage of .shorthands() in styles ([PR #31448](https://github.com/microsoft/fluentui/pull/31448) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: replace usage of .shorthands() in styles ([PR #31449](https://github.com/microsoft/fluentui/pull/31449) by olfedias@microsoft.com)
- `@fluentui/react-tree`
  - chore: replace usage of .shorthands() in styles ([PR #31432](https://github.com/microsoft/fluentui/pull/31432) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: replace usage of .shorthands() in styles ([PR #31458](https://github.com/microsoft/fluentui/pull/31458) by olfedias@microsoft.com)

## [9.52.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.52.0)

Mon, 20 May 2024 12:44:50 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.51.1..@fluentui/react-components_v9.52.0)

### Minor changes

- `@fluentui/react-components`
  - feat(react-swatch-picker): release SwatchPicker as 9.0.0 stable ([PR #31389](https://github.com/microsoft/fluentui/pull/31389) by vkozlova@microsoft.com)
  - feat: Export missing contextValues. ([PR #31383](https://github.com/microsoft/fluentui/pull/31383) by estebanmu@microsoft.com)
- `@fluentui/react-message-bar`
  - feat: Export missing contextValues. ([PR #31383](https://github.com/microsoft/fluentui/pull/31383) by estebanmu@microsoft.com)
- `@fluentui/react-nav-preview`
  - fix: Updating types for NavItem and NavSubItem to better handle keyboarding. ([PR #31352](https://github.com/microsoft/fluentui/pull/31352) by matejera@microsoft.com)
- `@fluentui/react-provider`
  - feat(react-swatch-picker): added CustomStyleHooks ([PR #31389](https://github.com/microsoft/fluentui/pull/31389) by vkozlova@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat(react-swatch-picker): added CustomStyleHooks ([PR #31389](https://github.com/microsoft/fluentui/pull/31389) by vkozlova@microsoft.com)
- `@fluentui/react-swatch-picker`
  - feat(react-swatch-picker): release SwatchPicker as 9.0.0 stable ([PR #31389](https://github.com/microsoft/fluentui/pull/31389) by vkozlova@microsoft.com)
- `@fluentui/react-tree`
  - feat: exposes createHeadlessTree ([PR #31343](https://github.com/microsoft/fluentui/pull/31343) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-breadcrumb`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-calendar-compat`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-drawer`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-field`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-infolabel`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-list-preview`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
  - fix: 8px menu section header padding ([PR #31396](https://github.com/microsoft/fluentui/pull/31396) by lingfangao@hotmail.com)
- `@fluentui/react-message-bar`
  - fix: MessageBar without actions should not take up space ([PR #31391](https://github.com/microsoft/fluentui/pull/31391) by lingfangao@hotmail.com)
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-motion-preview`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-motions-preview`
  - chore(motions): add mock for .animate() calls ([PR #31390](https://github.com/microsoft/fluentui/pull/31390) by olfedias@microsoft.com)
- `@fluentui/react-nav-preview`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-persona`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-rating`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-search`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-swatch-picker`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tag-picker`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tags`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-teaching-popover`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-tree`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)

### Changes

- `@fluentui/babel-preset-global-context`
  - chore: improve typings of exported preset ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-alert`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)
- `@fluentui/react-virtualizer`
  - chore: bump @griffel/react ([PR #31258](https://github.com/microsoft/fluentui/pull/31258) by olfedias@microsoft.com)

## [9.51.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.51.1)

Thu, 16 May 2024 09:25:11 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.51.0..@fluentui/react-components_v9.51.1)

### Minor changes

- `@fluentui/react-swatch-picker-preview`
  - feat(react-swatch-picker): added contrast ratio utils ([PR #31358](https://github.com/microsoft/fluentui/pull/31358) by vkozlova@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - force update the overflow when item is removed ([PR #31340](https://github.com/microsoft/fluentui/pull/31340) by miroslav.stastny@microsoft.com)
- `@fluentui/react-accordion`
  - chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-avatar`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-button`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-calendar-compat`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
  - fix: Make header button in overlaid month picker match the other header button's styles. ([PR #31381](https://github.com/microsoft/fluentui/pull/31381) by estebanmu@microsoft.com)
- `@fluentui/react-checkbox`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-datepicker-compat`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
  - bugfix: fix scroll locking issues introduced by a regression ([PR #31377](https://github.com/microsoft/fluentui/pull/31377) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-drawer`
  - fix: restore scroll when Drawer closes ([PR #31367](https://github.com/microsoft/fluentui/pull/31367) by marcosvmmoura@gmail.com)
- `@fluentui/react-field`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-infolabel`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-message-bar`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-motions-preview`
  - fix(motions): use useFirstMount() in createPresenceComponent() ([PR #31379](https://github.com/microsoft/fluentui/pull/31379) by olfedias@microsoft.com)
- `@fluentui/react-nav-preview`
  - chore: Update react-icons package to 2.0.239. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-overflow`
  - fix(OverflowItem): properly propagate refs to child elements ([PR #31347](https://github.com/microsoft/fluentui/pull/31347) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-rating`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-search`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-select`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-swatch-picker-preview`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - chore: uograde react-icons to 2.0.239 ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-tag-picker`
  - chore: Update react-icons package to 2.0.239. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-tags`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-teaching-popover`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-toast`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)
- `@fluentui/react-tree`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)

### Changes

- `@fluentui/react-alert`
  -  chore: Upgrade react-icons version to 2.0.239 to pick up provider export map fix. ([PR #31287](https://github.com/microsoft/fluentui/pull/31287) by ololubek@microsoft.com)

## [9.51.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.51.0)

Mon, 13 May 2024 12:34:18 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.50.0..@fluentui/react-components_v9.51.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Add missing Drawer and MessageBar context exports. ([PR #31328](https://github.com/microsoft/fluentui/pull/31328) by estebanmu@microsoft.com)
- `@fluentui/react-drawer`
  - feat: Add missing Drawer context exports. ([PR #31328](https://github.com/microsoft/fluentui/pull/31328) by estebanmu@microsoft.com)
- `@fluentui/react-message-bar`
  - feat: Add missing context exports. ([PR #31328](https://github.com/microsoft/fluentui/pull/31328) by estebanmu@microsoft.com)
- `@fluentui/react-nav-preview`
  - feat: release preview package ([PR #31304](https://github.com/microsoft/fluentui/pull/31304) by matejera@microsoft.com)
  - feat: Moving styles to new recomposed components. ([PR #31313](https://github.com/microsoft/fluentui/pull/31313) by matejera@microsoft.com)
- `@fluentui/react-swatch-picker-preview`
  - feat: Add missing SwatchPicker context exports. ([PR #31328](https://github.com/microsoft/fluentui/pull/31328) by estebanmu@microsoft.com)

### Patches

- `@fluentui/react-combobox`
  - fix(Combobox): `expandIcon={null}` should not throw ([PR #31326](https://github.com/microsoft/fluentui/pull/31326) by olfedias@microsoft.com)

## [9.50.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.50.0)

Thu, 09 May 2024 19:35:10 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.49.2..@fluentui/react-components_v9.50.0)

### Minor changes

- `@fluentui/react-components`
  - feat: add @fluentui/react-tag-picker to suite ([PR #31321](https://github.com/microsoft/fluentui/pull/31321) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-motions-preview`
  - BREAKING: fix motion token values and adjust structure to match original source ([PR #31262](https://github.com/microsoft/fluentui/pull/31262) by robert@robertpenner.com)
- `@fluentui/react-positioning`
  - fix overflowBoundaryPadding being ingored when autoSize was on ([PR #31277](https://github.com/microsoft/fluentui/pull/31277) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tag-picker`
  - feat: release stable ([PR #31321](https://github.com/microsoft/fluentui/pull/31321) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-combobox`
  - fix combobox empty string and zero value ([PR #31170](https://github.com/microsoft/fluentui/pull/31170) by mingyuanyu@microsoft.com)
  - fix: expand button should be disabled when Combobox is disabled ([PR #31300](https://github.com/microsoft/fluentui/pull/31300) by sarah.higley@microsoft.com)
- `@fluentui/react-dialog`
  - fix: move styles declared in useDisableBodyScroll() to a separate file ([PR #31299](https://github.com/microsoft/fluentui/pull/31299) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - fix: Add HC hover active styling to Switch. ([PR #31283](https://github.com/microsoft/fluentui/pull/31283) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - fix: replace internal useKeyborg() with useKeyborgRef() ([PR #31295](https://github.com/microsoft/fluentui/pull/31295) by olfedias@microsoft.com)

## [9.49.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.49.2)

Mon, 06 May 2024 12:55:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.49.1..@fluentui/react-components_v9.49.2)

### Minor changes

- `@fluentui/react-provider`
  - feat: adds TagPicker to custom style hooks ([PR #31272](https://github.com/microsoft/fluentui/pull/31272) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-shared-contexts`
  - feat: adds TagPicker to custom style hooks ([PR #31272](https://github.com/microsoft/fluentui/pull/31272) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tag-picker-preview`
  - chore: removes freeform prop ([PR #31273](https://github.com/microsoft/fluentui/pull/31273) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-aria`
  - feat: use ariaNotify in AriaLiveAnnouncer when available ([PR #31251](https://github.com/microsoft/fluentui/pull/31251) by sarah.higley@microsoft.com)
- `@fluentui/react-switch`
  - fix: Add HC styling for Switch font icon ([PR #31241](https://github.com/microsoft/fluentui/pull/31241) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - fix: bump keyborg to 2.6.0 nad tabster to 7.1.2 in order to fix iOS touch bug ([PR #31268](https://github.com/microsoft/fluentui/pull/31268) by marata@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - chore: ensure clicking on surface will toggle open state ([PR #31270](https://github.com/microsoft/fluentui/pull/31270) by bernardo.sunderhus@gmail.com)
  - chore: bug bash follow up ([PR #31272](https://github.com/microsoft/fluentui/pull/31272) by bernardo.sunderhus@gmail.com)

## [9.49.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.49.1)

Thu, 02 May 2024 11:36:28 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.49.0..@fluentui/react-components_v9.49.1)

### Minor changes

- `@fluentui/react-aria`
  - Adding function to focus last active descendant if it exists ([PR #31140](https://github.com/microsoft/fluentui/pull/31140) by stevenco@microsoft.com)
  - ActiveDescendantChangeEvent for tracking active item ([PR #31149](https://github.com/microsoft/fluentui/pull/31149) by jurokapsiar@gmail.com)
- `@fluentui/react-combobox`
  - Add onActiveOptionChange to Dropdown and Combobox ([PR #31149](https://github.com/microsoft/fluentui/pull/31149) by jurokapsiar@gmail.com)
- `@fluentui/react-drawer`
  - feat: move scroll detector to a dedicated react context ([PR #31156](https://github.com/microsoft/fluentui/pull/31156) by marcosvmmoura@gmail.com)
- `@fluentui/react-tabster`
  - Exposing MoverMemorizedElementEvent for the applications to be able to force forget or alter memorized elements. ([PR #31107](https://github.com/microsoft/fluentui/pull/31107) by marata@microsoft.com)
  - feat: useListenFocusedElement hook ([PR #31231](https://github.com/microsoft/fluentui/pull/31231) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tag-picker-preview`
  - feat: adds useTagPickerFilter hook (similar to useComboboxFilter, but with proper TagPicker related components) ([PR #31207](https://github.com/microsoft/fluentui/pull/31207) by bernardo.sunderhus@gmail.com)
  - feature: exports TagPicker event handlers types ([PR #31232](https://github.com/microsoft/fluentui/pull/31232) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-aria`
  - Updating ActiveDescendent scrollIntoView logic to work with ancester scroll containers and scroll margin styles ([PR #31158](https://github.com/microsoft/fluentui/pull/31158) by stevenco@microsoft.com)
- `@fluentui/react-avatar`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-button`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-calendar-compat`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-checkbox`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
  - Fixing initial keyboard focus issues with unparented listbox ([PR #31140](https://github.com/microsoft/fluentui/pull/31140) by stevenco@microsoft.com)
- `@fluentui/react-datepicker-compat`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - bugfix: ensures non-modal Dialog returns focus to trigger when closed ([PR #30628](https://github.com/microsoft/fluentui/pull/30628) by bernardo.sunderhus@gmail.com)
  - bugfix: open/close animation jumps when body is scrollable ([PR #31199](https://github.com/microsoft/fluentui/pull/31199) by bernardo.sunderhus@gmail.com)
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-field`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-infolabel`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
  - daniharo:fix-menu-split ([PR #30959](https://github.com/microsoft/fluentui/pull/30959) by lingfangao@hotmail.com)
  - refactor: use timeout and animation frame utilities ([PR #31168](https://github.com/microsoft/fluentui/pull/31168) by lingfangao@hotmail.com)
- `@fluentui/react-message-bar`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-motions-preview`
  - fix(PresenceGroup): cleanup children properly ([PR #31175](https://github.com/microsoft/fluentui/pull/31175) by olfedias@microsoft.com)
  - chore: improve state handling in createPresenceComponent() ([PR #31143](https://github.com/microsoft/fluentui/pull/31143) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - refactor: use timeout and animation frame utilities ([PR #31168](https://github.com/microsoft/fluentui/pull/31168) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-rating`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-search`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-select`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-spinner`
  - Fix spinner embedded in button animation ([PR #31195](https://github.com/microsoft/fluentui/pull/31195) by kirpadv@gmail.com)
- `@fluentui/react-swatch-picker-preview`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-table`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
  - refactor: use timeout and animation frame utilities ([PR #31168](https://github.com/microsoft/fluentui/pull/31168) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - Fixing issues where current keyborg status is not known to late subscribers ([PR #31140](https://github.com/microsoft/fluentui/pull/31140) by stevenco@microsoft.com)
  - Pulling Tabster 7.1.1 that supports more granular configuration of the aria-hidden handling for modal dialogs. ([PR #31181](https://github.com/microsoft/fluentui/pull/31181) by marata@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - chore: removes aria-checked from TagPickerOption ([PR #31172](https://github.com/microsoft/fluentui/pull/31172) by bernardo.sunderhus@gmail.com)
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
  - chore: removes multiselect from TagPicker signatures ([PR #31173](https://github.com/microsoft/fluentui/pull/31173) by bernardo.sunderhus@gmail.com)
  - chore: make expandIcon aria-hidden by default ([PR #31229](https://github.com/microsoft/fluentui/pull/31229) by bernardo.sunderhus@gmail.com)
  - chore: ensures cursor looks like a text on whole control ([PR #31152](https://github.com/microsoft/fluentui/pull/31152) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-teaching-popover`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
  - fix: Arrow was 1px offset and incorrect box-sizing ([PR #31161](https://github.com/microsoft/fluentui/pull/31161) by edwardwang.94@gmail.com)
  - chore: fix TeachingPopover package name in LICENSE file and import path in bundle size ([PR #31159](https://github.com/microsoft/fluentui/pull/31159) by seanmonahan@microsoft.com)
- `@fluentui/react-toast`
  - refactor: use timeout and animation frame utilities ([PR #31168](https://github.com/microsoft/fluentui/pull/31168) by lingfangao@hotmail.com)
  - fix: use "key" properly in ToastContainer ([PR #31104](https://github.com/microsoft/fluentui/pull/31104) by olfedias@microsoft.com)
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-tree`
  - chore: updates roving tab indexes to ensure Tree is focusable ([PR #31231](https://github.com/microsoft/fluentui/pull/31231) by bernardo.sunderhus@gmail.com)
  - fix: Apply aria-selected prop to aria-selected instead of aria-expanded. ([PR #31117](https://github.com/microsoft/fluentui/pull/31117) by estebanmu@microsoft.com)
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)

### Changes

- `@fluentui/react-alert`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-infobutton`
  -  chore: upgrade @fluentui/react-icons to 2.0.237. ([PR #31139](https://github.com/microsoft/fluentui/pull/31139) by ololubek@microsoft.com)
- `@fluentui/react-virtualizer`
  - Fix: Use Fluent hooks for IO and timeout functionality ([PR #31250](https://github.com/microsoft/fluentui/pull/31250) by mifraser@microsoft.com)

## [9.49.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.49.0)

Tue, 23 Apr 2024 08:17:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.48.0..@fluentui/react-components_v9.49.0)

### Minor changes

- `@fluentui/react-teaching-popover`
  - 'feat: Release TeachingPopover to stable ([PR #31112](https://github.com/microsoft/fluentui/pull/31112) by mifraser@microsoft.com)
- `@fluentui/react-components`
  - 'feat: Release TeachingPopover to stable ([PR #31112](https://github.com/microsoft/fluentui/pull/31112) by mifraser@microsoft.com)
  - feat: Implement MenuItemSwitch component ([PR #31099](https://github.com/microsoft/fluentui/pull/31099) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - feat: Implement MenuItemSwitch component ([PR #31099](https://github.com/microsoft/fluentui/pull/31099) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - feat: Implement MenuItemSwitch component ([PR #31099](https://github.com/microsoft/fluentui/pull/31099) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - feat: Implement MenuItemSwitch component ([PR #31099](https://github.com/microsoft/fluentui/pull/31099) by lingfangao@hotmail.com)
- `@fluentui/react-skeleton`
  - chore: deprecate the width prop. ([PR #31111](https://github.com/microsoft/fluentui/pull/31111) by ololubek@microsoft.com)
- `@fluentui/react-swatch-picker-preview`
  - fix: BREAKING CHANGE - api changes and fixes ([PR #31097](https://github.com/microsoft/fluentui/pull/31097) by vkozlova@microsoft.com)
- `@fluentui/react-table`
  - fix: Table and DataGrid should not remove cells from the accessibility tree ([PR #31068](https://github.com/microsoft/fluentui/pull/31068) by sarah.higley@microsoft.com)

### Patches

- `@fluentui/react-spinbutton`
  - fix: SpinButton buttons now display correct visuals at bounds ([PR #31126](https://github.com/microsoft/fluentui/pull/31126) by seanmonahan@microsoft.com)

## [9.48.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.48.0)

Thu, 18 Apr 2024 12:43:14 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.48.0..@fluentui/react-components_v9.48.0)

### Patches

- `@fluentui/react-tag-picker-preview`
  - chore: ensure navigation between TagPickerGroup and TagPickerInput ([PR #31085](https://github.com/microsoft/fluentui/pull/31085) by bernardo.sunderhus@gmail.com)

## [9.48.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.48.0)

Wed, 17 Apr 2024 21:53:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.5..@fluentui/react-components_v9.48.0)

### Minor changes

- `@fluentui/react-combobox`
  - feature: export internal hooks into API ([PR #30975](https://github.com/microsoft/fluentui/pull/30975) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - feat: add @fluentui/react-search to suite ([PR #30553](https://github.com/microsoft/fluentui/pull/30553) by sarah.higley@microsoft.com)
- `@fluentui/react-dialog`
  - fix: Dialog scrolls the whole surface on small screens ([PR #31026](https://github.com/microsoft/fluentui/pull/31026) by jirivyhnalek@microsoft.com)
- `@fluentui/react-list-preview`
  - Tabster 7.1.0. ([PR #30969](https://github.com/microsoft/fluentui/pull/30969) by marata@microsoft.com)
- `@fluentui/react-search`
  - feat: release stable ([PR #30553](https://github.com/microsoft/fluentui/pull/30553) by sarah.higley@microsoft.com)
- `@fluentui/react-swatch-picker-preview`
  - feat(react-swatch-picker): Added EmptySwatch component ([PR #30953](https://github.com/microsoft/fluentui/pull/30953) by vkozlova@microsoft.com)
- `@fluentui/react-table`
  - Tabster 7.1.0. ([PR #30969](https://github.com/microsoft/fluentui/pull/30969) by marata@microsoft.com)
- `@fluentui/react-tabster`
  - Tabster 7.1.0. ([PR #30969](https://github.com/microsoft/fluentui/pull/30969) by marata@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - feature:adds support for Field component ([PR #30995](https://github.com/microsoft/fluentui/pull/30995) by bernardo.sunderhus@gmail.com)
  - feat: adds inline property ([PR #31003](https://github.com/microsoft/fluentui/pull/31003) by bernardo.sunderhus@gmail.com)
  - feature: adds support for InteractionTag ([PR #30976](https://github.com/microsoft/fluentui/pull/30976) by bernardo.sunderhus@gmail.com)
  - feat: TagPickerInput input positioning ([PR #31036](https://github.com/microsoft/fluentui/pull/31036) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags`
  - feat: adds isInsideTagPicker exception case to TagGroupContextValue ([PR #31064](https://github.com/microsoft/fluentui/pull/31064) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-teaching-popover-preview`
  - feat: Ensure all sub components are overridable and enable better string pass through via slots ([PR #30998](https://github.com/microsoft/fluentui/pull/30998) by mifraser@microsoft.com)

### Patches

- `@fluentui/react-accordion`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-aria`
  - fix: End key should move activeOption  ([PR #30864](https://github.com/microsoft/fluentui/pull/30864) by sarah.higley@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb`
  - chore: Update react-icons version to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-button`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-calendar-compat`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-card`
  - fix: Card actions adopt custom high contrast mode colors ([PR #30941](https://github.com/microsoft/fluentui/pull/30941) by sarah.higley@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
  - fix: Inline Listbox should render on top of relatively positioned elements. ([PR #31022](https://github.com/microsoft/fluentui/pull/31022) by estebanmu@microsoft.com)
  - bugfix: removes freeform prop that was wrongly introduced by PR #30947  ([PR #30963](https://github.com/microsoft/fluentui/pull/30963) by bernardo.sunderhus@gmail.com)
  - fix: End key should move activeOption ([PR #30864](https://github.com/microsoft/fluentui/pull/30864) by sarah.higley@microsoft.com)
  - chore: fix useListBoxSlot signature to accept more triggerRef types ([PR #31038](https://github.com/microsoft/fluentui/pull/31038) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-drawer`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
- `@fluentui/react-field`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-infolabel`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-message-bar`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-portal`
  - chore: add "data-portal-node" attr in usePortalMountNode() ([PR #31002](https://github.com/microsoft/fluentui/pull/31002) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-rating`
  - chore: Update RatingDisplay value margin-left tokens. ([PR #31034](https://github.com/microsoft/fluentui/pull/31034) by ololubek@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-search`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-select`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-spinner`
  - chore: move tabindex to the root slot of Spinner. ([PR #31056](https://github.com/microsoft/fluentui/pull/31056) by ololubek@microsoft.com)
- `@fluentui/react-swatch-picker-preview`
  - fix(react-swatch-picker): colors in HC mode ([PR #31014](https://github.com/microsoft/fluentui/pull/31014) by vkozlova@microsoft.com)
  - fix(react-swatch-picker): a11y attrs for ImageSwatch ([PR #31060](https://github.com/microsoft/fluentui/pull/31060) by vkozlova@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - chore: removes disabled property from ComboboxBaseProps ([PR #30963](https://github.com/microsoft/fluentui/pull/30963) by bernardo.sunderhus@gmail.com)
  - bugfix: Space and Enter should close TagPicker when selecting ([PR #31053](https://github.com/microsoft/fluentui/pull/31053) by bernardo.sunderhus@gmail.com)
  - chore: adopt internal hooks provided by @fluentui/react-combobox ([PR #30975](https://github.com/microsoft/fluentui/pull/30975) by bernardo.sunderhus@gmail.com)
  - chore: ensure Click and Enter open/close popover properly ([PR #31010](https://github.com/microsoft/fluentui/pull/31010) by bernardo.sunderhus@gmail.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
  - chore: removes unused props ([PR #31001](https://github.com/microsoft/fluentui/pull/31001) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
  - fix: use colorBrandForeground2 for brand InteractionTag foreground color ([PR #30973](https://github.com/microsoft/fluentui/pull/30973) by yuanboxue@microsoft.com)
- `@fluentui/react-teaching-popover-preview`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-toast`
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-tree`
  - fix: Allow overriding aria-selected through props. ([PR #31020](https://github.com/microsoft/fluentui/pull/31020) by estebanmu@microsoft.com)
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
  - chore: refactor styles defined in makeResetStyles() to avoid shorthands.*() ([PR #30996](https://github.com/microsoft/fluentui/pull/30996) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: Update react-icons to 2.0.235 ([PR #31011](https://github.com/microsoft/fluentui/pull/31011) by ololubek@microsoft.com)

## [9.47.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.5)

Fri, 05 Apr 2024 14:17:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.4..@fluentui/react-components_v9.47.5)

### Patches

- `@fluentui/react-provider`
  - Avoid re-inserting Style Element to HEAD when re-rendering FluentProvider ([PR #30960](https://github.com/microsoft/fluentui/pull/30960) by ramyrafik@gmail.com)

## [9.47.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.4)

Thu, 04 Apr 2024 12:08:06 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.3..@fluentui/react-components_v9.47.4)

### Minor changes

- `@fluentui/react-list-preview`
  - feat: Release preview package ([PR #30898](https://github.com/microsoft/fluentui/pull/30898) by jirivyhnalek@microsoft.com)
- `@fluentui/react-search-preview`
  - export SearchBoxChangeEvent type. ([PR #30943](https://github.com/microsoft/fluentui/pull/30943) by seanmonahan@microsoft.com)
- `@fluentui/react-table`
  - add resizableColumnsOptions with option to allowContainerOverflow ([PR #30717](https://github.com/microsoft/fluentui/pull/30717) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - feature: adds freeform support for TagPicker ([PR #30947](https://github.com/microsoft/fluentui/pull/30947) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - fix: remove border from high contrast mode to match styles and make focus more visible ([PR #30865](https://github.com/microsoft/fluentui/pull/30865) by sarah.higley@microsoft.com)
- `@fluentui/react-combobox`
  - chore: move freeform and disabled to ComboboxBase types ([PR #30947](https://github.com/microsoft/fluentui/pull/30947) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - fix: Align arrow down behavior with Combobox. ([PR #30954](https://github.com/microsoft/fluentui/pull/30954) by estebanmu@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - feat: adds TagPickerOptionGroup component ([PR #30934](https://github.com/microsoft/fluentui/pull/30934) by bernardo.sunderhus@gmail.com)

## [9.47.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.3)

Tue, 02 Apr 2024 09:47:59 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.2..@fluentui/react-components_v9.47.3)

### Minor changes

- `@fluentui/react-shared-contexts`
  - deprecate unused ListItemButton exports ([PR #29760](https://github.com/microsoft/fluentui/pull/29760) by jirivyhnalek@microsoft.com)

### Patches

- `@fluentui/react-calendar-compat`
  - fix: When month picker is overlaid and gototoday button is pressed, hide month picker. ([PR #30870](https://github.com/microsoft/fluentui/pull/30870) by estebanmu@microsoft.com)
- `@fluentui/react-spinner`
  - fix: rotating SVG should not cause parent overflow ([PR #30615](https://github.com/microsoft/fluentui/pull/30615) by sarah.higley@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - bugfix: removes errouneous combobox imports ([PR #30926](https://github.com/microsoft/fluentui/pull/30926) by bernardo.sunderhus@gmail.com)

## [9.47.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.2)

Thu, 28 Mar 2024 10:43:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.2..@fluentui/react-components_v9.47.2)

### Minor changes

- `@fluentui/react-swatch-picker-preview`
  - feat(react-swatch-picker): changed API in rendering utils ([PR #30868](https://github.com/microsoft/fluentui/pull/30868) by vkozlova@microsoft.com)
- `@fluentui/react-tag-picker-preview`
  - feat: release preview package ([PR #30897](https://github.com/microsoft/fluentui/pull/30897) by bernardo.sunderhus@gmail.com)

## [9.47.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.2)

Wed, 27 Mar 2024 10:29:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.2..@fluentui/react-components_v9.47.2)

### Minor changes

- `@fluentui/react-swatch-picker-preview`
  - 'feat: release react-swatch-picker to unstable ([PR #30881](https://github.com/microsoft/fluentui/pull/30881) by vkozlova@microsoft.com)

### Patches

- `@fluentui/react-teaching-popover-preview`
  - fix: Focus borders and navigation container style (arrow vs group) ([PR #30862](https://github.com/microsoft/fluentui/pull/30862) by mifraser@microsoft.com)

## [9.47.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.2)

Mon, 25 Mar 2024 11:12:13 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.1..@fluentui/react-components_v9.47.2)

### Minor changes

- `@fluentui/react-calendar-compat`
  - fix: Build errors in TypeScript 5.3 ([PR #30810](https://github.com/microsoft/fluentui/pull/30810) by behowell@microsoft.com)
- `@fluentui/react-table`
  - fix: column resizing in StrictMode now works ([PR #30743](https://github.com/microsoft/fluentui/pull/30743) by jirivyhnalek@microsoft.com)
  - fix: DataGrid - prevent unwanted sort after column resizing (#27803) ([PR #30780](https://github.com/microsoft/fluentui/pull/30780) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tags`
  - feat: adds appearance and dismissible to TagGroupContext ([PR #30800](https://github.com/microsoft/fluentui/pull/30800) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-combobox`
  - fix: Align Combobox's text baseline with other controls like Input ([PR #30733](https://github.com/microsoft/fluentui/pull/30733) by behowell@microsoft.com)
- `@fluentui/react-field`
  - fix: Align horizontal Field labels with control text ([PR #30732](https://github.com/microsoft/fluentui/pull/30732) by behowell@microsoft.com)
- `@fluentui/react-input`
  - Revert #30845 "fix: Input should start with undefined, same as textarea" ([PR #30845](https://github.com/microsoft/fluentui/pull/30845) by lingfangao@hotmail.com)
  - chore: Increase hit target of input element to fill to the border ([PR #30825](https://github.com/microsoft/fluentui/pull/30825) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - bugfix: add system colors on hover ([PR #30071](https://github.com/microsoft/fluentui/pull/30071) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-teaching-popover-preview`
  - bug: Fix accessibility labels and roles ([PR #30805](https://github.com/microsoft/fluentui/pull/30805) by mifraser@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - docs: update Readme to remove unstable statement ([PR #30735](https://github.com/microsoft/fluentui/pull/30735) by yuanboxue@microsoft.com)

## [9.47.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.1)

Mon, 18 Mar 2024 19:50:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.47.0..@fluentui/react-components_v9.47.1)

### Changes

- `@fluentui/tokens`
  - reverting #30770 which caused compilation issues ([PR #30803](https://github.com/microsoft/fluentui/pull/30803) by mgodbolt@microsoft.com)

## [9.47.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.47.0)

Fri, 15 Mar 2024 21:43:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.8..@fluentui/react-components_v9.47.0)

### Minor changes

- `@fluentui/react-components`
  - 'feat: add @fluentui/react-rating to suite. ([PR #30740](https://github.com/microsoft/fluentui/pull/30740) by ololubek@microsoft.com)
- `@fluentui/react-rating`
  - 'feat: Release Rating to stable. ([PR #30740](https://github.com/microsoft/fluentui/pull/30740) by ololubek@microsoft.com)

### Patches

- `@fluentui/react-button`
  - fix: Applying correct styles to icon when ToggleButton is checked and has a subtle or transparent appearance. ([PR #30775](https://github.com/microsoft/fluentui/pull/30775) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-infolabel`
  - fix: add aria-labelledby to infolabel note ([PR #30761](https://github.com/microsoft/fluentui/pull/30761) by sarah.higley@microsoft.com)

### Changes

- `@fluentui/tokens`
  - feat: enable .js extension addition and directory import/export unwrapping in build output ([PR #30770](https://github.com/microsoft/fluentui/pull/30770) by martinhochel@microsoft.com)

## [9.46.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.8)

Thu, 07 Mar 2024 19:33:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.7..@fluentui/react-components_v9.46.8)

### Minor changes

- `@fluentui/react-aria`
  - feat: active descendants imperative handle to toggle attribute ([PR #30716](https://github.com/microsoft/fluentui/pull/30716) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v8-v9`
  - feat: Add color tokens ([PR #30412](https://github.com/microsoft/fluentui/pull/30412) by miroslav.stastny@microsoft.com)
- `@fluentui/react-popover`
  - feat: Add usePopoverContextValues_unstable hook for simplified context ([PR #30423](https://github.com/microsoft/fluentui/pull/30423) by mifraser@microsoft.com)
- `@fluentui/react-positioning`
  - feat: allow null on positioningRef setTarget ([PR #30662](https://github.com/microsoft/fluentui/pull/30662) by yuanboxue@microsoft.com)
- `@fluentui/react-rating-preview`
  - breaking: Update icon api type to ElementType ([PR #30666](https://github.com/microsoft/fluentui/pull/30666) by ololubek@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: Deprecate legacy TeachingPopoverCarousel style hooks ([PR #30423](https://github.com/microsoft/fluentui/pull/30423) by mifraser@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Rewrite Spinner animation using only rotation transforms. ([PR #30567](https://github.com/microsoft/fluentui/pull/30567) by behowell@microsoft.com)
- `@fluentui/react-teaching-popover-preview`
  - feat: Refactor carousel into a unified component, add navigation classes for nav icons ([PR #30423](https://github.com/microsoft/fluentui/pull/30423) by mifraser@microsoft.com)

### Patches

- `@fluentui/react-accordion`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-context-selector`
  - chore: update required version of scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - fix: Updating tokens used in strong and subtle variants to match design spec. ([PR #27169](https://github.com/microsoft/fluentui/pull/27169) by kakrookaran@gmail.com)
- `@fluentui/react-infolabel`
  - fix: InfoLabel popover dismisses if the InfoButton is clicked when it is already open ([PR #30731](https://github.com/microsoft/fluentui/pull/30731) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - docs: Deprecate unused TeachingPopoverCarousel style hooks ([PR #30423](https://github.com/microsoft/fluentui/pull/30423) by mifraser@microsoft.com)
- `@fluentui/react-radio`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-rating-preview`
  - chore: Update jsdocs and stories in Rating ([PR #30653](https://github.com/microsoft/fluentui/pull/30653) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - fix: allRowsSelected is false when there are no rows ([PR #30706](https://github.com/microsoft/fluentui/pull/30706) by lingfangao@hotmail.com)
- `@fluentui/react-tabs`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
  - Removed unneeded zIndex from tab active indicator ([PR #30729](https://github.com/microsoft/fluentui/pull/30729) by gcox@microsoft.com)
- `@fluentui/react-toast`
  - fix: Use semantic colours ([PR #30715](https://github.com/microsoft/fluentui/pull/30715) by lingfangao@hotmail.com)
- `@fluentui/react-tree`
  - fix: aria-selected is no longer required for treeitem ([PR #30687](https://github.com/microsoft/fluentui/pull/30687) by sarah.higley@microsoft.com)

### Changes

- `@fluentui/global-context`
  - chore: remove invalid peerDependency on scheduler ([PR #30587](https://github.com/microsoft/fluentui/pull/30587) by olfedias@microsoft.com)
- `@fluentui/react-theme-sass`
  - feat: Add color tokens ([PR #30412](https://github.com/microsoft/fluentui/pull/30412) by miroslav.stastny@microsoft.com)
- `@fluentui/tokens`
  - feat: Add/update color tokens ([PR #30412](https://github.com/microsoft/fluentui/pull/30412) by miroslav.stastny@microsoft.com)

## [9.46.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.7)

Thu, 29 Feb 2024 14:44:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.6..@fluentui/react-components_v9.46.7)

### Minor changes

- `@fluentui/react-tags`
  - feat: export TagGroupContextValues type ([PR #30645](https://github.com/microsoft/fluentui/pull/30645) by bernardo.sunderhus@gmail.com)

## [9.46.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.6)

Wed, 28 Feb 2024 02:34:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.5..@fluentui/react-components_v9.46.6)

### Minor changes

- `@fluentui/react-combobox`
  - refactor: Deprecate ComboboxContext in favour of ListboxContext ([PR #30575](https://github.com/microsoft/fluentui/pull/30575) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/react-components`
  - chore: deprecate ComboboxContext ([PR #30575](https://github.com/microsoft/fluentui/pull/30575) by lingfan.gao@microsoft.com)
- `@fluentui/react-input`
  - fix: Input should start with undefined, same as textarea ([PR #30534](https://github.com/microsoft/fluentui/pull/30534) by angel6v3@gmail.com)
- `@fluentui/react-rating-preview`
  - fix: Add focus border styling to Rating ([PR #30581](https://github.com/microsoft/fluentui/pull/30581) by ololubek@microsoft.com)
  - fix: update RatingItem styling to use flex to align all items properly ([PR #30638](https://github.com/microsoft/fluentui/pull/30638) by ololubek@microsoft.com)
  - fix: Add flex wrap to Rating and RatingDisplay ([PR #30639](https://github.com/microsoft/fluentui/pull/30639) by ololubek@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat(swatch-picker): Added plain ColorSwatch sub component. ([PR #30544](https://github.com/microsoft/fluentui/pull/30544) by vkozlova@microsoft.com)

### Changes

- `@fluentui/react-virtualizer`
  - feat: Add pagination for both static and dynamic virtualizers ([PR #30560](https://github.com/microsoft/fluentui/pull/30560) by mifraser@microsoft.com)

## [9.46.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.5)

Tue, 20 Feb 2024 14:22:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.4..@fluentui/react-components_v9.46.5)

### Minor changes

- `@fluentui/react-aria`
  - feat: adds a context for active descendant ([PR #30528](https://github.com/microsoft/fluentui/pull/30528) by lingfan.gao@microsoft.com)
- `@fluentui/react-combobox`
  - feat: Decouple activedescendant handling from react state ([PR #30539](https://github.com/microsoft/fluentui/pull/30539) by lingfan.gao@microsoft.com)
- `@fluentui/react-conformance`
  - Deprecate consistent-callback-args test ([PR #30301](https://github.com/microsoft/fluentui/pull/30301) by yuanboxue@microsoft.com)
  - BREAKING CHANGE: change `consistent-callback-args` test option to test selected props instead of ignoring props ([PR #30376](https://github.com/microsoft/fluentui/pull/30376) by yuanboxue@microsoft.com)
- `@fluentui/react-menu`
  - Dismiss Menu when MenuLinkItem is clicked. ([PR #30497](https://github.com/microsoft/fluentui/pull/30497) by santoshsrisai36@gmail.com)
- `@fluentui/react-motions-preview`
  - BREAKING: rename createAtom() to createMotionComponent() & createPresence() to createPresenceMotion() ([PR #30550](https://github.com/microsoft/fluentui/pull/30550) by olfedias@microsoft.com)
  - BREAKING: remove exports for atom & presence definitions ([PR #30548](https://github.com/microsoft/fluentui/pull/30548) by olfedias@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - feat: add "clearable" prop ([PR #30512](https://github.com/microsoft/fluentui/pull/30512) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-breadcrumb`
  - fix: moved sized icons to styling ([PR #30551](https://github.com/microsoft/fluentui/pull/30551) by vkozlova@microsoft.com)
- `@fluentui/react-calendar-compat`
  - fix: remove new Date() from prop destructuring ([PR #30519](https://github.com/microsoft/fluentui/pull/30519) by seanmonahan@microsoft.com)
- `@fluentui/react-combobox`
  - chore: disable consistent-callback-type lint rule for existing callbacks ([PR #30293](https://github.com/microsoft/fluentui/pull/30293) by yuanboxue@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: DatePicker renders a semantic button for voice control ([PR #30499](https://github.com/microsoft/fluentui/pull/30499) by sarah.higley@microsoft.com)
  - fix: remove new Date() from prop destructuring ([PR #30519](https://github.com/microsoft/fluentui/pull/30519) by seanmonahan@microsoft.com)
- `@fluentui/react-field`
  - chore: update style hooks to return state ([PR #30513](https://github.com/microsoft/fluentui/pull/30513) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: update style hooks to return state ([PR #30513](https://github.com/microsoft/fluentui/pull/30513) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - fix: MenuPopover should stay open for submenu even when not openOnHover ([PR #30486](https://github.com/microsoft/fluentui/pull/30486) by lingfangao@hotmail.com)
  - chore: update style hooks to return state ([PR #30513](https://github.com/microsoft/fluentui/pull/30513) by olfedias@microsoft.com)
- `@fluentui/react-motions-preview`
  - feat: add onMotionFinish() callback to createPresenceComponent() ([PR #30529](https://github.com/microsoft/fluentui/pull/30529) by olfedias@microsoft.com)
  - feat: add PresenceGroup component ([PR #30543](https://github.com/microsoft/fluentui/pull/30543) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: update style hooks to return state ([PR #30513](https://github.com/microsoft/fluentui/pull/30513) by olfedias@microsoft.com)
- `@fluentui/react-rating-preview`
  - fix: remove component assignment from prop destructuring ([PR #30520](https://github.com/microsoft/fluentui/pull/30520) by seanmonahan@microsoft.com)
  - fix: update vertical styling for RatingDisplay to fix vertical alignment ([PR #30465](https://github.com/microsoft/fluentui/pull/30465) by ololubek@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: disable consistent-callback-type lint rule for existing callbacks ([PR #30293](https://github.com/microsoft/fluentui/pull/30293) by yuanboxue@microsoft.com)
- `@fluentui/react-tabster`
  - fix: focus-visible polyfill should only register in scope ([PR #30517](https://github.com/microsoft/fluentui/pull/30517) by lingfangao@hotmail.com)
  - Active modal checks if an element outside of it is a virtual child of a modal before setting aria-hidden.' ([PR #30501](https://github.com/microsoft/fluentui/pull/30501) by marata@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - refactor: update activedescendant management from combobox ([PR #30539](https://github.com/microsoft/fluentui/pull/30539) by lingfan.gao@microsoft.com)
- `@fluentui/react-toast`
  - chore: disable consistent-callback-type lint rule for existing callbacks ([PR #30293](https://github.com/microsoft/fluentui/pull/30293) by yuanboxue@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: update style hooks to return state ([PR #30513](https://github.com/microsoft/fluentui/pull/30513) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - fix: Remove import cycle between assertSlots.ts and index.ts ([PR #30555](https://github.com/microsoft/fluentui/pull/30555) by behowell@microsoft.com)

## [9.46.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.4)

Tue, 06 Feb 2024 17:55:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.3..@fluentui/react-components_v9.46.4)

### Minor changes

- `@fluentui/react-rating-preview`
  - chore: Simplify high contrast visuals for RatingItem, and remove iconOutline from RatingDisplay ([PR #30457](https://github.com/microsoft/fluentui/pull/30457) by behowell@microsoft.com)
- `@fluentui/react-tabster`
  - feat: useSetKeyboardNavigation hook ([PR #30316](https://github.com/microsoft/fluentui/pull/30316) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-aria`
  - chore: adds @fluentui/react-jsx-runtime as dependency ([PR #30485](https://github.com/microsoft/fluentui/pull/30485) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-calendar-compat`
  - fix: Update year and month pickers to use the correct keyboard navigation type and apply requested focus indicator width from design for day picker. ([PR #30435](https://github.com/microsoft/fluentui/pull/30435) by estebanmu@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: Apply aria-disabled to DatePicker's contentAfter slot to avoid confusion when using screen readers. ([PR #30435](https://github.com/microsoft/fluentui/pull/30435) by estebanmu@microsoft.com)
- `@fluentui/react-message-bar`
  - fix: MessageBar with no actions should have correct spacing ([PR #30481](https://github.com/microsoft/fluentui/pull/30481) by lingfangao@hotmail.com)
- `@fluentui/react-migration-v0-v9`
  - fix(react-migration-v0-v9): add northstar to dependencies ([PR #30303](https://github.com/microsoft/fluentui/pull/30303) by martinhochel@microsoft.com)
  - chore: bump northstar version ([PR #30478](https://github.com/microsoft/fluentui/pull/30478) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - fix: Resize heuristic should account for zero dimensions ([PR #30439](https://github.com/microsoft/fluentui/pull/30439) by lingfangao@hotmail.com)
- `@fluentui/react-rating-preview`
  - chore: add accesibility props to Rating and RatingDisplay ([PR #30414](https://github.com/microsoft/fluentui/pull/30414) by ololubek@microsoft.com)
  - chore: add accessibility props to Rating and RatingDisplay ([PR #30421](https://github.com/microsoft/fluentui/pull/30421) by ololubek@microsoft.com)
- `@fluentui/react-search-preview`
  - Adds custom onChange callback on SearchBox preview so consumers can handle clear event. ([PR #29038](https://github.com/microsoft/fluentui/pull/29038) by syphe@outlook.com)
- `@fluentui/react-tree`
  - bugfix: regression fix for focus and blur events on TreeItem ([PR #30436](https://github.com/microsoft/fluentui/pull/30436) by bernardo.sunderhus@gmail.com)
  - bugfix: onOpenChange inconsistent between Tree and TreeItem ([PR #30050](https://github.com/microsoft/fluentui/pull/30050) by bernardo.sunderhus@gmail.com)

## [9.46.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.3)

Tue, 30 Jan 2024 23:16:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.2..@fluentui/react-components_v9.46.3)

### Minor changes

- `@fluentui/react-tabster`
  - Optional ShadowDOM support. ([PR #30429](https://github.com/microsoft/fluentui/pull/30429) by marata@microsoft.com)
- `@fluentui/react-utilities`
  - getParent() version with ShadowDOM support. ([PR #30429](https://github.com/microsoft/fluentui/pull/30429) by marata@microsoft.com)

### Patches

- `@fluentui/react-table`
  - DataGrid to use dedicated custom events instead of simulated keypresses. ([PR #30387](https://github.com/microsoft/fluentui/pull/30387) by marata@microsoft.com)
- `@fluentui/react-tabster`
  - Tabster 5.3.0 and Keyborg 2.4.1. ([PR #30387](https://github.com/microsoft/fluentui/pull/30387) by marata@microsoft.com)

## [9.46.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.2)

Mon, 29 Jan 2024 13:56:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.1..@fluentui/react-components_v9.46.2)

### Patches

- `@fluentui/react-combobox`
  - fix: add aria-controls to combobox and dropdown ([PR #30352](https://github.com/microsoft/fluentui/pull/30352) by sarah.higley@microsoft.com)
- `@fluentui/react-label`
  - fix: Update Label to use a token for its padding, instead of a hardcoded value ([PR #30254](https://github.com/microsoft/fluentui/pull/30254) by behowell@microsoft.com)
  - fix: Disabled Label should use GrayText in forced-colors mode ([PR #30245](https://github.com/microsoft/fluentui/pull/30245) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - fix: disabled menuitem has no pressed style ([PR #30340](https://github.com/microsoft/fluentui/pull/30340) by sarah.higley@microsoft.com)
- `@fluentui/react-positioning`
  - fix: Avoid infinite loop when comparing different documents ([PR #30415](https://github.com/microsoft/fluentui/pull/30415) by lingfangao@hotmail.com)

## [9.46.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.1)

Fri, 26 Jan 2024 10:40:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.46.0..@fluentui/react-components_v9.46.1)

### Minor changes

- `@fluentui/react-positioning`
  - feat: Add `disableUpdateOnResize` positioning option ([PR #30391](https://github.com/microsoft/fluentui/pull/30391) by lingfangao@hotmail.com)
- `@fluentui/react-rating-preview`
  - feat: Add RatingDisplay component ([PR #30323](https://github.com/microsoft/fluentui/pull/30323) by ololubek@microsoft.com)

## [9.46.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.46.0)

Tue, 23 Jan 2024 15:10:57 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.45.0..@fluentui/react-components_v9.46.0)

### Minor changes

- `@fluentui/react-aria`
  - feat: add AriaLiveAnnouncer component ([PR #30345](https://github.com/microsoft/fluentui/pull/30345) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - feat: add AriaLiveAnnouncer component ([PR #30345](https://github.com/microsoft/fluentui/pull/30345) by olfedias@microsoft.com)
- `@fluentui/react-motions-preview`
  - chore: initial release ([PR #30359](https://github.com/microsoft/fluentui/pull/30359) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - feat: helper type DistributiveOmit ([PR #30317](https://github.com/microsoft/fluentui/pull/30317) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-aria`
  - chore: import UnionToIntersection from react-utilities instead of redeclaring it locally ([PR #30317](https://github.com/microsoft/fluentui/pull/30317) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-calendar-compat`
  - feat: Add navigationIcons prop to allow customization of Calendar's navigation icons. ([PR #30329](https://github.com/microsoft/fluentui/pull/30329) by estebanmu@microsoft.com)
- `@fluentui/react-combobox`
  - fix: aria-multiselectable is unnecessary with menu roles ([PR #30225](https://github.com/microsoft/fluentui/pull/30225) by sarah.higley@microsoft.com)
  - fix(Dropdown): add `type=button` to `clearButton` ([PR #30362](https://github.com/microsoft/fluentui/pull/30362) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - fix: cleanup overflow manager on every unmount ([PR #30363](https://github.com/microsoft/fluentui/pull/30363) by marcosvmmoura@gmail.com)
- `@fluentui/react-tree`
  - chore: import DistributiveOmit from react-utilities instead of redeclaring it locally ([PR #30317](https://github.com/microsoft/fluentui/pull/30317) by bernardo.sunderhus@gmail.com)

## [9.45.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.45.0)

Thu, 18 Jan 2024 14:25:01 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.5..@fluentui/react-components_v9.45.0)

### Minor changes

- `@fluentui/react-combobox`
  - feat: add `useComboboxFilter()` hook ([PR #30046](https://github.com/microsoft/fluentui/pull/30046) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - feat: export AnnounceProvider & useAnnounce() ([PR #30328](https://github.com/microsoft/fluentui/pull/30328) by olfedias@microsoft.com)
  - feat: export `useComboboxFilter()` hook ([PR #30046](https://github.com/microsoft/fluentui/pull/30046) by olfedias@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: export AnnounceProvider & useAnnounce() ([PR #30328](https://github.com/microsoft/fluentui/pull/30328) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-spinner`
  - fix: Update isVisible initial value to false to prevent Spinner flicker ([PR #30330](https://github.com/microsoft/fluentui/pull/30330) by ololubek@microsoft.com)

## [9.44.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.5)

Wed, 17 Jan 2024 16:18:49 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.4..@fluentui/react-components_v9.44.5)

### Minor changes

- `@fluentui/react-drawer`
  - Add bottom position ([PR #29137](https://github.com/microsoft/fluentui/pull/29137) by yiliu9@microsoft.com)
- `@fluentui/react-utilities`
  - Add new type EventHandler/EventData for callback props ([PR #30322](https://github.com/microsoft/fluentui/pull/30322) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-combobox`
  - fix: allow expandIcon to be null ([PR #30339](https://github.com/microsoft/fluentui/pull/30339) by yuanboxue@microsoft.com)
- `@fluentui/react-dialog`
  - fix: only apply transition css properties when animating ([PR #30327](https://github.com/microsoft/fluentui/pull/30327) by marcosvmmoura@gmail.com)
- `@fluentui/react-tabster`
  - chore: use Types.TabsterAttributeName in useTabsterAttributes() ([PR #30321](https://github.com/microsoft/fluentui/pull/30321) by olfedias@microsoft.com)

## [9.44.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.4)

Tue, 16 Jan 2024 13:14:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.3..@fluentui/react-components_v9.44.4)

### Minor changes

- `@fluentui/react-combobox`
  - feat: add "clearable" prop to Combobox & Dropdown ([PR #30033](https://github.com/microsoft/fluentui/pull/30033) by olfedias@microsoft.com)
  - feat: allow typeable space on all comboboxes, not only freeform ([PR #30295](https://github.com/microsoft/fluentui/pull/30295) by sarah.higley@microsoft.com)

### Patches

- `@fluentui/react-skeleton`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-slider`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-spinbutton`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-spinner`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-switch`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-table`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
  - fix: DataGrid selection performance improvement ([PR #30288](https://github.com/microsoft/fluentui/pull/30288) by lingfangao@hotmail.com)
  - bugfix: add system colors on hover ([PR #30073](https://github.com/microsoft/fluentui/pull/30073) by bernardo.sunderhus@gmail.com)
  - bugfix: Omit colliding content property from ComponentProps ([PR #29865](https://github.com/microsoft/fluentui/pull/29865) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabs`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
  - bugfix: Omit colliding content property from ComponentProps ([PR #29865](https://github.com/microsoft/fluentui/pull/29865) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabster`
  - fix: memoize tabster attributes ([PR #30289](https://github.com/microsoft/fluentui/pull/30289) by lingfangao@hotmail.com)
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-tags`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-text`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-textarea`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - fix: update types in styles to exclude "clearIcon" slot ([PR #30033](https://github.com/microsoft/fluentui/pull/30033) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - bugfix: Omit colliding content property from ComponentProps ([PR #29865](https://github.com/microsoft/fluentui/pull/29865) by bernardo.sunderhus@gmail.com)
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-tree`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-accordion`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-aria`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-avatar`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-badge`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-breadcrumb`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-button`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-card`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-checkbox`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-combobox`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-components`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-context-selector`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: set popup's z-index: 1 when rendering DatePickerCompat inline. ([PR #30281](https://github.com/microsoft/fluentui/pull/30281) by seanmonahan@microsoft.com)
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-dialog`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-divider`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-drawer`
  - chore: remove useHeadingProps() and React.useMemo() ([PR #29360](https://github.com/microsoft/fluentui/pull/29360) by olfedias@microsoft.com)
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-field`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-image`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-input`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-label`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-link`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-menu`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
  - bugfix: Omit colliding content property from ComponentProps ([PR #29865](https://github.com/microsoft/fluentui/pull/29865) by bernardo.sunderhus@gmail.com)
  - fix: MenuItem shortcut text should be caption ([PR #29811](https://github.com/microsoft/fluentui/pull/29811) by lingfangao@hotmail.com)
  - fix(MenuItem): bottom padding should be same as top padding ([PR #30291](https://github.com/microsoft/fluentui/pull/30291) by lingfangao@hotmail.com)
- `@fluentui/react-migration-v0-v9`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-motion-preview`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-overflow`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-persona`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-popover`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-portal`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-positioning`
  - chore: bumps @floating-ui/devtools version to latest ([PR #30299](https://github.com/microsoft/fluentui/pull/30299) by bernardo.sunderhus@gmail.com)
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-progress`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-provider`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-radio`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-rating-preview`
  - Scaffold RatingDisplay ([PR #30283](https://github.com/microsoft/fluentui/pull/30283) by ololubek@microsoft.com)
- `@fluentui/react-search-preview`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-select`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)

### Changes

- `@fluentui/react-virtualizer`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/global-context`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-alert`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)
- `@fluentui/react-infobutton`
  - fix: correct version of @types/react-dom peer dep that matches for 16.x ([PR #30259](https://github.com/microsoft/fluentui/pull/30259) by mgodbolt@microsoft.com)

## [9.44.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.3)

Thu, 11 Jan 2024 09:04:28 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.2..@fluentui/react-components_v9.44.3)

### Minor changes

- `@fluentui/react-aria`
  - feat: active descedant improvements ([PR #30253](https://github.com/microsoft/fluentui/pull/30253) by lingfan.gao@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - feat: implement CheckboxShim component for Checkbox migration ([PR #29968](https://github.com/microsoft/fluentui/pull/29968) by liminliu@microsoft.com)

### Patches

- `@fluentui/react-card`
  - fix: selectable card should not be focusable ([PR #30277](https://github.com/microsoft/fluentui/pull/30277) by marcosvmmoura@gmail.com)
  - fix: remove slow CSS selector from card styles ([PR #30278](https://github.com/microsoft/fluentui/pull/30278) by marcosvmmoura@gmail.com)
- `@fluentui/react-migration-v0-v9`
  - Remove dependency on v0 ([PR #30276](https://github.com/microsoft/fluentui/pull/30276) by jurokapsiar@gmail.com)
- `@fluentui/react-positioning`
  - fix: update styles to not flip in RTL ([PR #30252](https://github.com/microsoft/fluentui/pull/30252) by olfedias@microsoft.com)
- `@fluentui/react-rating-preview`
  - chore: Updating doc stories and API. ([PR #30092](https://github.com/microsoft/fluentui/pull/30092) by ololubek@microsoft.com)
- `@fluentui/react-teaching-popover-preview`
  - fix: Small style updates, changing 16px icons to 12px, slight padding changes ([PR #30270](https://github.com/microsoft/fluentui/pull/30270) by mifraser@microsoft.com)

## [9.44.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.2)

Tue, 09 Jan 2024 10:21:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.1..@fluentui/react-components_v9.44.2)

### Minor changes

- `@fluentui/react-positioning`
  - feat: Implement onPositioningEnd callback ([PR #30177](https://github.com/microsoft/fluentui/pull/30177) by lingfangao@hotmail.com)
- `@fluentui/react-timepicker-compat`
  - Stable release ([PR #30217](https://github.com/microsoft/fluentui/pull/30217) by yuanboxue@microsoft.com)
- `@fluentui/react-timepicker-compat-preview`
  - Deprecate preview package. Use @fluentui/react-timepicker-compat instead. ([PR #30217](https://github.com/microsoft/fluentui/pull/30217) by yuanboxue@microsoft.com)

## [9.44.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.1)

Mon, 08 Jan 2024 16:24:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.0..@fluentui/react-components_v9.44.1)

### Minor changes

- `@fluentui/react-positioning`
  - feat: Update position when target or container dimensions change ([PR #30179](https://github.com/microsoft/fluentui/pull/30179) by lingfangao@hotmail.com)
- `@fluentui/react-radio`
  - chore: Update Radio indicator for perf and alignment at 125% DPI ([PR #30207](https://github.com/microsoft/fluentui/pull/30207) by behowell@microsoft.com)
- `@fluentui/react-table`
  - fix(useArrowNavigationGroup): should always memorize last focused element ([PR #30112](https://github.com/microsoft/fluentui/pull/30112) by lingfan.gao@microsoft.com)
- `@fluentui/react-tabster`
  - feat: `useOnKeyboardNavigationChange` to subscribe to changes in keyboard navigation mode ([PR #30219](https://github.com/microsoft/fluentui/pull/30219) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-accordion`
  - update @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-avatar`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-button`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-calendar-compat`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-checkbox`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-field`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-infolabel`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-message-bar`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-positioning`
  - chore: update react-positioning to use latest floating ui dev tools to take latest fix ([PR #30235](https://github.com/microsoft/fluentui/pull/30235) by mgodbolt@microsoft.com)
- `@fluentui/react-provider`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-radio`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-search-preview`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-select`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - fix(useArrowNavigationGroup): should always memorize last focused element ([PR #30112](https://github.com/microsoft/fluentui/pull/30112) by lingfangao@hotmail.com)
- `@fluentui/react-tags`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-teaching-popover-preview`
  - Update react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-toast`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-tree`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-utilities`
  - Allow isSlot to work with multiple react-utilities instances ([PR #30209](https://github.com/microsoft/fluentui/pull/30209) by 36034483+daniel-hauser@users.noreply.github.com)

### Changes

- `@fluentui/react-alert`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)
- `@fluentui/react-infobutton`
  - Update version of @fluentui/react-icons to 2.0.224 ([PR #30078](https://github.com/microsoft/fluentui/pull/30078) by ololubek@microsoft.com)

## [9.44.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.0)

Thu, 04 Jan 2024 09:48:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.44.0..@fluentui/react-components_v9.44.0)

### Patches

- `@fluentui/react-calendar-compat`
  - fix: Make day labels non-actionable. ([PR #30160](https://github.com/microsoft/fluentui/pull/30160) by estebanmu@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: Add missing CalendarStrings export and guidance on localization. ([PR #30160](https://github.com/microsoft/fluentui/pull/30160) by estebanmu@microsoft.com)
- `@fluentui/react-timepicker-compat`
  - undefined ([PR #30199](https://github.com/microsoft/fluentui/pull/30199) by yuanboxue@microsoft.com)
  - feat: release compat package ([PR #30201](https://github.com/microsoft/fluentui/pull/30201) by yuanboxue@microsoft.com)

## [9.44.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.44.0)

Wed, 03 Jan 2024 09:26:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.43.3..@fluentui/react-components_v9.44.0)

### Minor changes

- `@fluentui/react-components`
  - chore: Export combobox selection types. ([PR #28245](https://github.com/microsoft/fluentui/pull/28245) by tfaller1@gmx.de)
- `@fluentui/react-rating-preview`
  - 'feat: release rating to preview ([PR #30153](https://github.com/microsoft/fluentui/pull/30153) by ololubek@microsoft.com)

### Patches

- `@fluentui/react-aria`
  - chore: deprecate old slot API methods and types ([PR #29646](https://github.com/microsoft/fluentui/pull/29646) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-combobox`
  - fix: trigger focus should mount hidden listbox ([PR #30133](https://github.com/microsoft/fluentui/pull/30133) by lingfan.gao@microsoft.com)
- `@fluentui/react-components`
  - chore: deprecate old slot API methods and types ([PR #29646](https://github.com/microsoft/fluentui/pull/29646) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal-compat-context`
  - fix: re-introduce ecma transpilation to ES5 to make it work with v8  in ES5 only browsers ([PR #30053](https://github.com/microsoft/fluentui/pull/30053) by wfwf1997@gmail.com)
- `@fluentui/react-utilities`
  - chore: deprecate old slot API methods and types ([PR #29646](https://github.com/microsoft/fluentui/pull/29646) by bernardo.sunderhus@gmail.com)

## [9.43.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.43.3)

Thu, 21 Dec 2023 17:00:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.43.2..@fluentui/react-components_v9.43.3)

### Minor changes

- `@fluentui/react-teaching-popover-preview`
  - feat: Release react-teaching-popover-preview package ([PR #30140](https://github.com/microsoft/fluentui/pull/30140) by behowell@microsoft.com)

### Patches

- `@fluentui/react-breadcrumb`
  - fix(breadcrumb): BreadcrumbButton focus border has incorrent width and transition ([PR #30135](https://github.com/microsoft/fluentui/pull/30135) by vkozlova@microsoft.com)
- `@fluentui/react-combobox`
  - fix: make hover color in contrast theme accessible. ([PR #30101](https://github.com/microsoft/fluentui/pull/30101) by yuanboxue@microsoft.com)
- `@fluentui/react-timepicker-compat-preview`
  - fix: set default value of hourCycle to undefined ([PR #30108](https://github.com/microsoft/fluentui/pull/30108) by yuanboxue@microsoft.com)

## [9.43.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.43.2)

Mon, 18 Dec 2023 17:48:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.43.1..@fluentui/react-components_v9.43.2)

### Patches

- `@fluentui/react-combobox`
  - refactor: Encapsulates listbox and trigger slot construction ([PR #30010](https://github.com/microsoft/fluentui/pull/30010) by lingfan.gao@microsoft.com)
- `@fluentui/react-positioning`
  - chore: move from floating-ui-devtools to @floating-ui/devtools ([PR #30107](https://github.com/microsoft/fluentui/pull/30107) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-timepicker-compat-preview`
  - fix: provides a default aria-labelledby for the chevron icon if the TimePicker is wrapped in a Field. ([PR #30103](https://github.com/microsoft/fluentui/pull/30103) by yuanboxue@microsoft.com)

## [9.43.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.43.1)

Mon, 18 Dec 2023 14:40:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.43.0..@fluentui/react-components_v9.43.1)

### Minor changes

- `@fluentui/react-tabster`
  - feat: focus-visible polyfill shadow DOM support ([PR #30098](https://github.com/microsoft/fluentui/pull/30098) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - feat: deprecates useARIAButtonShorthand in favor of useARIAButtonProps ([PR #29735](https://github.com/microsoft/fluentui/pull/29735) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-tabster`
  - fix: focus outline should have `Highlight` colour in high contrast ([PR #30099](https://github.com/microsoft/fluentui/pull/30099) by lingfan.gao@microsoft.com)
- `@fluentui/react-timepicker-compat-preview`
  - fix: use useEventCallback instead of useCallback ([PR #30056](https://github.com/microsoft/fluentui/pull/30056) by yuanboxue@microsoft.com)
  - fix: letter key navigation in listbox should be case insensitive ([PR #30072](https://github.com/microsoft/fluentui/pull/30072) by yuanboxue@microsoft.com)
  - fix: add custom style hook for TimePicker compat. ([PR #30058](https://github.com/microsoft/fluentui/pull/30058) by yuanboxue@microsoft.com)
  - fix: set autoComeplete to off by default ([PR #30057](https://github.com/microsoft/fluentui/pull/30057) by yuanboxue@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: stop using deprecated keyborg property ([PR #30098](https://github.com/microsoft/fluentui/pull/30098) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - chore: adopts useARIAButtonProps instead of deprecated method useARIAButtonShorthand ([PR #29735](https://github.com/microsoft/fluentui/pull/29735) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-breadcrumb`
  - partitionBreadcrumbItems miscalculated endDisplayedItems when endDisplayedItems is incorrect when numberOfItemsToHide <= 0 ([PR #30005](https://github.com/microsoft/fluentui/pull/30005) by GordonJSmith@gmail.com)
- `@fluentui/react-button`
  - chore: adopts useARIAButtonProps instead of deprecated method useARIAButtonShorthand ([PR #29735](https://github.com/microsoft/fluentui/pull/29735) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-card`
  - fix: interactive cards not having the focus ring when focused ([PR #30067](https://github.com/microsoft/fluentui/pull/30067) by marcosvmmoura@gmail.com)
- `@fluentui/react-components`
  - chore: add "wyw-in-js" field for tag processor ([PR #30032](https://github.com/microsoft/fluentui/pull/30032) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - fix: Add a namespace to CSS variables in react-positioning package to avoid potential collisions. ([PR #30068](https://github.com/microsoft/fluentui/pull/30068) by makotom@microsoft.com)
- `@fluentui/react-provider`
  - fix: add custom style hook for TimePicker compat. ([PR #30058](https://github.com/microsoft/fluentui/pull/30058) by yuanboxue@microsoft.com)
- `@fluentui/react-shared-contexts`
  - fix: add custom style hook for TimePicker compat. ([PR #30058](https://github.com/microsoft/fluentui/pull/30058) by yuanboxue@microsoft.com)
- `@fluentui/react-table`
  - chore: adopts useARIAButtonProps instead of deprecated method useARIAButtonShorthand ([PR #29735](https://github.com/microsoft/fluentui/pull/29735) by bernardo.sunderhus@gmail.com)

## [9.43.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.43.0)

Thu, 14 Dec 2023 09:58:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.42.0..@fluentui/react-components_v9.43.0)

### Minor changes

- `@fluentui/react-aria`
  - feat(useActiveDescendant): Changing active descendant scrolls into view ([PR #29992](https://github.com/microsoft/fluentui/pull/29992) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - feat: Export useAvatarGroupPopovercontextValues hook. ([PR #29984](https://github.com/microsoft/fluentui/pull/29984) by esteban.230@hotmail.com)
- `@fluentui/react-components`
  - feat: Export useAvatarGroupPopovercontextValues hook. ([PR #29984](https://github.com/microsoft/fluentui/pull/29984) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - fix: Dialog now transitions in on first render ([PR #30044](https://github.com/microsoft/fluentui/pull/30044) by jirivyhnalek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - feat: List v0 migration shim ([PR #29975](https://github.com/microsoft/fluentui/pull/29975) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tabs`
  - feat: added select tab on focus behavior ([PR #29854](https://github.com/microsoft/fluentui/pull/29854) by gcox@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: updates should be synchronous in unit tests ([PR #30014](https://github.com/microsoft/fluentui/pull/30014) by lingfangao@hotmail.com)
- `@fluentui/react-calendar-compat`
  - chore: disallow `window` and `document` access ([PR #29962](https://github.com/microsoft/fluentui/pull/29962) by seanmonahan@microsoft.com)
- `@fluentui/react-combobox`
  - fix: Applies border-box sizing to listbox slot ([PR #30028](https://github.com/microsoft/fluentui/pull/30028) by lingfan.gao@microsoft.com)
- `@fluentui/react-drawer`
  - fix: OverlayDrawer accepts mountNode in types ([PR #29871](https://github.com/microsoft/fluentui/pull/29871) by sarah.higley@microsoft.com)
- `@fluentui/react-link`
  - fix: User-provided props win over defined defaults in Link component. ([PR #30062](https://github.com/microsoft/fluentui/pull/30062) by makotom@microsoft.com)
- `@fluentui/react-menu`
  - fix: Using correct colors when MenuItem is pressed. ([PR #29951](https://github.com/microsoft/fluentui/pull/29951) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-motion-preview`
  - chore: disallow `window` and `document` access ([PR #29962](https://github.com/microsoft/fluentui/pull/29962) by seanmonahan@microsoft.com)
- `@fluentui/react-portal`
  - fix: Virtual parent cannot be the DOM child of mount node ([PR #29990](https://github.com/microsoft/fluentui/pull/29990) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix: Allows matchTargetSize middleware to be overidden with inline style ([PR #30028](https://github.com/microsoft/fluentui/pull/30028) by lingfan.gao@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: disallow `window` and `document` access ([PR #29962](https://github.com/microsoft/fluentui/pull/29962) by seanmonahan@microsoft.com)
- `@fluentui/react-timepicker-compat-preview`
  - fix: add max-height to show 12 items in listbox ([PR #29989](https://github.com/microsoft/fluentui/pull/29989) by yuanboxue@microsoft.com)
  - fix: use default time format instead of h23 hour cycle. ([PR #30035](https://github.com/microsoft/fluentui/pull/30035) by yuanboxue@microsoft.com)
- `@fluentui/react-utilities`
  - chore: disallow `window` and `document` access ([PR #29962](https://github.com/microsoft/fluentui/pull/29962) by seanmonahan@microsoft.com)

### Changes

- `@fluentui/global-context`
  - chore: disallow `window` and `document` access ([PR #29962](https://github.com/microsoft/fluentui/pull/29962) by seanmonahan@microsoft.com)

## [9.42.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.42.0)

Thu, 30 Nov 2023 13:42:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.41.0..@fluentui/react-components_v9.42.0)

### Minor changes

- `@fluentui/react-aria`
  - feat: Implement aria-activedescendant utility ([PR #29904](https://github.com/microsoft/fluentui/pull/29904) by lingfan.gao@microsoft.com)
- `@fluentui/react-components`
  - feat: export useUncontrolledFocus hook ([PR #29895](https://github.com/microsoft/fluentui/pull/29895) by lingfangao@hotmail.com)
  - add useFocusVisible() to exports ([PR #29935](https://github.com/microsoft/fluentui/pull/29935) by seanmonahan@microsoft.com)
- `@fluentui/react-link`
  - feat: Adding span as an option for Link to render as. ([PR #29937](https://github.com/microsoft/fluentui/pull/29937) by humbertomakotomorimoto@gmail.com)
- `@fluentui/react-tabster`
  - feat: implement useTabsterUncontrolled hook ([PR #29895](https://github.com/microsoft/fluentui/pull/29895) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - feature: adds semantic elements (strong, b, em, i) to Text root signature ([PR #29884](https://github.com/microsoft/fluentui/pull/29884) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-combobox`
  - fix: listbox closes on blur after scroll click ([PR #29877](https://github.com/microsoft/fluentui/pull/29877) by sarah.higley@microsoft.com)
  - fix: Dropdown button gets focus in Safari when clicked ([PR #29855](https://github.com/microsoft/fluentui/pull/29855) by sarah.higley@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - chore: move up NODE_ENV check in warnIfElementTypeIsInvalid ([PR #29886](https://github.com/microsoft/fluentui/pull/29886) by wfwf1997@gmail.com)
- `@fluentui/react-positioning`
  - feat: adds floating-ui-devtools support ([PR #29905](https://github.com/microsoft/fluentui/pull/29905) by bernardo.sunderhus@gmail.com)
  - fix: Infinite reset loop in matchTargetSize middleware ([PR #29915](https://github.com/microsoft/fluentui/pull/29915) by lingfan.gao@microsoft.com)
- `@fluentui/react-table`
  - fix: Brand row appearance should be brandBackground2 in pressed state ([PR #29957](https://github.com/microsoft/fluentui/pull/29957) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-virtualizer`
  - feat: Add default auto-measuring on dynamic virtualizezr if no sizing function provided ([PR #29868](https://github.com/microsoft/fluentui/pull/29868) by mifraser@microsoft.com)

## [9.41.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.41.0)

Mon, 20 Nov 2023 09:55:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.40.0..@fluentui/react-components_v9.41.0)

### Minor changes

- `@fluentui/react-checkbox`
  - fix: Replace child selectors with css vars in Checkbox styles ([PR #29796](https://github.com/microsoft/fluentui/pull/29796) by behowell@microsoft.com)
- `@fluentui/react-components`
  - chore: Re-export missing exports from @fluentui/react-drawer in @fluentui/react-components. ([PR #29873](https://github.com/microsoft/fluentui/pull/29873) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-provider`
  - feat: Add TeachingPopover style hooks ([PR #29782](https://github.com/microsoft/fluentui/pull/29782) by mifraser@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: TeachingPopover style hooks added ([PR #29782](https://github.com/microsoft/fluentui/pull/29782) by mifraser@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: Tooltips are no longer triggered by programmatic focus() moves. ([PR #29791](https://github.com/microsoft/fluentui/pull/29791) by behowell@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: disconnect should dispose all state correctly ([PR #29375](https://github.com/microsoft/fluentui/pull/29375) by lingfan.gao@microsoft.com)
- `@fluentui/react-dialog`
  - Remove CSS containment from DialogSurface ([PR #29878](https://github.com/microsoft/fluentui/pull/29878) by jurokapsiar@gmail.com)
- `@fluentui/react-overflow`
  - fix: register should happen again once observe options change ([PR #29375](https://github.com/microsoft/fluentui/pull/29375) by lingfan.gao@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Export KeyborgFocusInEvent and KEYBORG_FOCUSIN ([PR #29791](https://github.com/microsoft/fluentui/pull/29791) by behowell@microsoft.com)

## [9.40.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.40.0)

Tue, 14 Nov 2023 17:51:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.39.0..@fluentui/react-components_v9.40.0)

### Minor changes

- `@fluentui/react-breadcrumb`
  - feat: release stable ([PR #29826](https://github.com/microsoft/fluentui/pull/29826) by marcosvmmoura@gmail.com)
- `@fluentui/react-components`
  - feat: add @fluentui/react-breadcrumb to suite ([PR #29826](https://github.com/microsoft/fluentui/pull/29826) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-breadcrumb`
  - docs(breadcrumb): removed preview from all the links ([PR #29838](https://github.com/microsoft/fluentui/pull/29838) by vkozlova@microsoft.com)
- `@fluentui/react-tabster`
  - Improving how Tabster uncontrolled areas are handled for better interop with third party focus management tools like FocusZone. ([PR #29832](https://github.com/microsoft/fluentui/pull/29832) by marata@microsoft.com)
- `@fluentui/react-tree`
  - chore: refactor tree navigation ([PR #29731](https://github.com/microsoft/fluentui/pull/29731) by bernardo.sunderhus@gmail.com)

## [9.39.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.39.0)

Fri, 10 Nov 2023 13:46:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.38.0..@fluentui/react-components_v9.39.0)

### Minor changes

- `@fluentui/react-components`
  - feat: export useOverflowVisibility hook ([PR #29809](https://github.com/microsoft/fluentui/pull/29809) by lingfangao@hotmail.com)
- `@fluentui/react-overflow`
  - feat: Implement useOverflowVisibility hook ([PR #29809](https://github.com/microsoft/fluentui/pull/29809) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - fix: use button when no href is defined ([PR #29803](https://github.com/microsoft/fluentui/pull/29803) by sarah.higley@microsoft.com)
- `@fluentui/react-menu`
  - fix: MenuTrigger tabster attributes can be overriden by user ([PR #29810](https://github.com/microsoft/fluentui/pull/29810) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-virtualizer`
  - feat: Ensure IO handles RTL margin and mutations ([PR #29501](https://github.com/microsoft/fluentui/pull/29501) by mifraser@microsoft.com)

## [9.38.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.38.0)

Thu, 09 Nov 2023 17:29:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.37.4..@fluentui/react-components_v9.38.0)

### Minor changes

- `@fluentui/react-components`
  - feat: release Drawer as stable ([PR #29711](https://github.com/microsoft/fluentui/pull/29711) by marcosvmmoura@gmail.com)
  - chore: Export missing useDrawerStyles_unstable from react-drawer. ([PR #29768](https://github.com/microsoft/fluentui/pull/29768) by Humberto.Morimoto@microsoft.com)
  - feat: re-export toMountNodeProps() ([PR #29772](https://github.com/microsoft/fluentui/pull/29772) by jaguilarvega@microsoft.com)
  - feat: Export selection utils ([PR #29801](https://github.com/microsoft/fluentui/pull/29801) by jirivyhnalek@microsoft.com)
- `@fluentui/react-drawer`
  - chore: Export missing useDrawerStyles_unstable. ([PR #29768](https://github.com/microsoft/fluentui/pull/29768) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-portal`
  - feat: export toMountNodeProps() ([PR #29772](https://github.com/microsoft/fluentui/pull/29772) by jaguilarvega@microsoft.com)
- `@fluentui/react-positioning`
  - feat: add `matchTargetSize` positioning option ([PR #29690](https://github.com/microsoft/fluentui/pull/29690) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - feat: Add API for List ([PR #29771](https://github.com/microsoft/fluentui/pull/29771) by jirivyhnalek@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: Add custom style hook types for List ([PR #29771](https://github.com/microsoft/fluentui/pull/29771) by jirivyhnalek@microsoft.com)

### Patches

- `@fluentui/react-checkbox`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-combobox`
  - refactor: Removes double render infavour of matchTargetSize ([PR #29690](https://github.com/microsoft/fluentui/pull/29690) by lingfangao@hotmail.com)
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-components`
  - fix: mark react-tree apis as deprecated and add Deprecation heading to the /unstable module ([PR #29762](https://github.com/microsoft/fluentui/pull/29762) by martinhochel@microsoft.com)
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-conformance`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-context-selector`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
  - fix: Apply onClick callback to contentAfter's span to allow usage of custom icons. ([PR #29746](https://github.com/microsoft/fluentui/pull/29746) by stevenco@microsoft.com)
- `@fluentui/react-dialog`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-divider`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-drawer`
  - feat: release stable 9.0.0 ([PR #29711](https://github.com/microsoft/fluentui/pull/29711) by marcosvmmoura@gmail.com)
- `@fluentui/react-field`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-image`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-infolabel`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-input`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-label`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-link`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-menu`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-message-bar`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-motion-preview`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-overflow`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-persona`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-popover`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-portal`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-progress`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-provider`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
  - fix: useFluentProvider now returns the same empty object every time, fixing unnecessary re-renders ([PR #29757](https://github.com/microsoft/fluentui/pull/29757) by jirivyhnalek@microsoft.com)
- `@fluentui/react-radio`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-select`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-slider`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-spinner`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-switch`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-table`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-tabs`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-tabster`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-tags`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-text`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-textarea`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-theme`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-timepicker-compat-preview`
  - fix: rename `formatTimeStringToDate` to `parseTimeStringToDate`. ([PR #29707](https://github.com/microsoft/fluentui/pull/29707) by yuanboxue@microsoft.com)
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-toast`
  - fix: Toast text content should wrap ([PR #29678](https://github.com/microsoft/fluentui/pull/29678) by lingfangao@hotmail.com)
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-tree`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-utilities`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/keyboard-keys`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/priority-overflow`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-accordion`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-aria`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-avatar`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-badge`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-button`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-calendar-compat`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-card`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)

### Changes

- `@fluentui/react-theme-sass`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/react-virtualizer`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/tokens`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/babel-preset-global-context`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)
- `@fluentui/global-context`
  - chore: use package.json#files setup instead of npmignore for all v9 libraries ([PR #29734](https://github.com/microsoft/fluentui/pull/29734) by martinhochel@microsoft.com)

## [9.37.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.37.4)

Mon, 06 Nov 2023 13:16:03 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.37.3..@fluentui/react-components_v9.37.4)

### Patches

- `@fluentui/react-calendar-compat`
  - fix(Calendar): Calendar should memoize today's default value since it causes rerenders by creating a new object each time. ([PR #29747](https://github.com/microsoft/fluentui/pull/29747) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - chore: set default DialogTransitionProvider value to `undefined` to remove animation styles from test environment. ([PR #29755](https://github.com/microsoft/fluentui/pull/29755) by yuanboxue@microsoft.com)

## [9.37.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.37.3)

Thu, 02 Nov 2023 17:38:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.37.2..@fluentui/react-components_v9.37.3)

### Patches

- `@fluentui/react-tree`
  - chore: throws if FlatTree is used as a subtree ([PR #29729](https://github.com/microsoft/fluentui/pull/29729) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-drawer`
  - breaking: open prop now only accepts a boolean instead of MotionShorthand  ([PR #29736](https://github.com/microsoft/fluentui/pull/29736) by marcosvmmoura@gmail.com)

## [9.37.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.37.2)

Wed, 01 Nov 2023 19:15:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.37.1..@fluentui/react-components_v9.37.2)

### Minor changes

- `@fluentui/react-breadcrumb-preview`
  - feat: made BreadcrumbButton semantically as a link ([PR #29679](https://github.com/microsoft/fluentui/pull/29679) by vkozlova@microsoft.com)

### Patches

- `@fluentui/react-tree`
  - chore: stop unnecessary re-rendering when no actions are available ([PR #29694](https://github.com/microsoft/fluentui/pull/29694) by bernardo.sunderhus@gmail.com)

## [9.37.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.37.1)

Wed, 01 Nov 2023 12:55:58 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.37.0..@fluentui/react-components_v9.37.1)

### Minor changes

- `@fluentui/react-motion-preview`
  - fix: separate timeouts to better synchronize changes in between browser frames ([PR #29663](https://github.com/microsoft/fluentui/pull/29663) by marcosvmmoura@gmail.com)
- `@fluentui/react-timepicker-compat-preview`
  - feat: release preview package ([PR #29677](https://github.com/microsoft/fluentui/pull/29677) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-combobox`
  - fix: Combobox now collapses when mousing up outside of listbox after having moused within it. ([PR #29682](https://github.com/microsoft/fluentui/pull/29682) by makotom@microsoft.com)
- `@fluentui/react-dialog`
  - chore: remove animation from test environments ([PR #29692](https://github.com/microsoft/fluentui/pull/29692) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/tokens`
  - fix(tokens): Fix motion curves to match design ([PR #29546](https://github.com/microsoft/fluentui/pull/29546) by robertpenner@microsoft.com)

## [9.37.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.37.0)

Sat, 28 Oct 2023 23:35:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.36.0..@fluentui/react-components_v9.37.0)

### Major changes

- `@fluentui/react-breadcrumb-preview`
  - BREAKING CHANGE: Removed non-interactive item and `slash` divider ([PR #29623](https://github.com/microsoft/fluentui/pull/29623) by vkozlova@microsoft.com)
  - BREAKING CHANGE: remove `appearance` prop and set  `current` prop  for BreadcrumbButton last item ([PR #29554](https://github.com/microsoft/fluentui/pull/29554) by vkozlova@microsoft.com)

### Minor changes

- `@fluentui/react-components`
  - refactor: rename DrawerOverlay/DrawerInline components ([PR #29523](https://github.com/microsoft/fluentui/pull/29523) by marcosvmmoura@gmail.com)
- `@fluentui/react-motion-preview`
  - feat: add support to provide static duration to useMotion hook ([PR #29655](https://github.com/microsoft/fluentui/pull/29655) by marcosvmmoura@gmail.com)
- `@fluentui/react-provider`
  - feat: add new drawer global style hooks that are needed by drawer public api changes ([PR #29523](https://github.com/microsoft/fluentui/pull/29523) by marcosvmmoura@gmail.com)
- `@fluentui/react-shared-contexts`
  - refactor: rename main DrawerOverlay/DrawerInline components ([PR #29523](https://github.com/microsoft/fluentui/pull/29523) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-combobox`
  - fix: update `setActiveOption` type to be React Dispatch. ([PR #29643](https://github.com/microsoft/fluentui/pull/29643) by yuanboxue@microsoft.com)
- `@fluentui/react-components`
  - chore: Deprecate InfoLabel and InfoButton from react-infobutton in favor of react-infolabel. ([PR #29605](https://github.com/microsoft/fluentui/pull/29605) by esteban.230@hotmail.com)
  - chore: Deprecating Alert components and utilities. ([PR #29615](https://github.com/microsoft/fluentui/pull/29615) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-motion-preview`
  - fix: avoid breaking rule of hooks ([PR #29628](https://github.com/microsoft/fluentui/pull/29628) by marcosvmmoura@gmail.com)
- `@fluentui/react-provider`
  - fix: invoke useCustomStyleHook_unstable() ([PR #29632](https://github.com/microsoft/fluentui/pull/29632) by olfedias@microsoft.com)
- `@fluentui/react-shared-contexts`
  - fix: invoke useCustomStyleHook_unstable() ([PR #29632](https://github.com/microsoft/fluentui/pull/29632) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - fix: invoke useCustomStyleHook_unstable() ([PR #29632](https://github.com/microsoft/fluentui/pull/29632) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - feat: deprecate component and utilities ([PR #29615](https://github.com/microsoft/fluentui/pull/29615) by lingfan.gao@microsoft.com)
- `@fluentui/react-drawer`
  - fix: regression with mountNode prop not available after refactor ([PR #29524](https://github.com/microsoft/fluentui/pull/29524) by marcosvmmoura@gmail.com)
  - feat: use useMotionClassNames to create drawer motion styles ([PR #29662](https://github.com/microsoft/fluentui/pull/29662) by marcosvmmoura@gmail.com)
  - BREAKING CHANGE: rename main DrawerOverlay/DrawerInline components ([PR #29523](https://github.com/microsoft/fluentui/pull/29523) by marcosvmmoura@gmail.com)
  - fix: improve high contrast mode ([PR #29627](https://github.com/microsoft/fluentui/pull/29627) by marcosvmmoura@gmail.com)
  - docs: add example on how to implement multiple levels inside one drawer ([PR #29665](https://github.com/microsoft/fluentui/pull/29665) by marcosvmmoura@gmail.com)
- `@fluentui/react-infobutton`
  - chore: Deprecate InfoLabel and InfoButton from react-infobutton in favor of react-infolabel. ([PR #29605](https://github.com/microsoft/fluentui/pull/29605) by esteban.230@hotmail.com)

## [9.36.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.36.0)

Mon, 23 Oct 2023 09:51:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.35.1..@fluentui/react-components_v9.36.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Moving react-infolabel to stable. ([PR #29585](https://github.com/microsoft/fluentui/pull/29585) by esteban.230@hotmail.com)
- `@fluentui/react-datepicker-compat`
  - BREAKING: Update Datepicker to use react-calendar-compat and remove Calendar related exports. ([PR #29587](https://github.com/microsoft/fluentui/pull/29587) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - feat: adds motion to DialogSurface ([PR #29391](https://github.com/microsoft/fluentui/pull/29391) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-infolabel`
  - feat: Move InfoLabel to stable. ([PR #29585](https://github.com/microsoft/fluentui/pull/29585) by esteban.230@hotmail.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: Use container window's resize observer ([PR #29551](https://github.com/microsoft/fluentui/pull/29551) by lingfangao@hotmail.com)
- `@fluentui/react-calendar-compat`
  - fix: Classnames removed and added to day cells need to be split instead of providing a string with spaces. ([PR #29611](https://github.com/microsoft/fluentui/pull/29611) by esteban.230@hotmail.com)
- `@fluentui/react-table`
  - fix: use targetDocument resize observer ([PR #29551](https://github.com/microsoft/fluentui/pull/29551) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - fix: focus visible polyfill should be initialised/disposed correctly ([PR #29564](https://github.com/microsoft/fluentui/pull/29564) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-virtualizer`
  - fix: use targetDocument resize observer ([PR #29551](https://github.com/microsoft/fluentui/pull/29551) by lingfangao@hotmail.com)

## [9.35.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.35.1)

Wed, 18 Oct 2023 17:54:01 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.35.0..@fluentui/react-components_v9.35.1)

### Minor changes

- `@fluentui/react-infolabel-preview`
  - feat: release preview package ([PR #29562](https://github.com/microsoft/fluentui/pull/29562) by esteban.230@hotmail.com)
- `@fluentui/react-tabster`
  - feat: bump to tabster 4.8.0 in order to support support virtual parents ([PR #29549](https://github.com/microsoft/fluentui/pull/29549) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-calendar-compat`
  - chore: Add bundle size fixture for Calendar. ([PR #29560](https://github.com/microsoft/fluentui/pull/29560) by esteban.230@hotmail.com)
  - chore: Release react-calendar-compat. ([PR #29542](https://github.com/microsoft/fluentui/pull/29542) by esteban.230@hotmail.com)
- `@fluentui/react-combobox`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - chore: deprecate getNativeElementProps in favor of getIntrinsicElementProps ([PR #29535](https://github.com/microsoft/fluentui/pull/29535) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-divider`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-label`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-link`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - refactor: MenuItem uses makeResetStyles ([PR #29449](https://github.com/microsoft/fluentui/pull/29449) by lingfangao@hotmail.com)
- `@fluentui/react-message-bar`
  - chore Add bundle size fixture for MessageBar ([PR #29513](https://github.com/microsoft/fluentui/pull/29513) by lingfangao@hotmail.com)
- `@fluentui/react-persona`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-progress`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-skeleton`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinner`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabs`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabster`
  - chore: bump keyborg to 2.1.0 ([PR #29520](https://github.com/microsoft/fluentui/pull/29520) by lingfangao@hotmail.com)
- `@fluentui/react-tree`
  - bugfix(react-tree): stop coercing numbers to string on TreeItemValue ([PR #29529](https://github.com/microsoft/fluentui/pull/29529) by bernardo.sunderhus@gmail.com)
  - exporting TreeItemType from TreeItem component ([PR #29532](https://github.com/microsoft/fluentui/pull/29532) by petrduda@microsoft.com)
- `@fluentui/react-utilities`
  - chore: deprecate getNativeElementProps in favor of getIntrinsicElementProps ([PR #29535](https://github.com/microsoft/fluentui/pull/29535) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-infobutton`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29499](https://github.com/microsoft/fluentui/pull/29499) by bernardo.sunderhus@gmail.com)

## [9.35.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.35.0)

Thu, 12 Oct 2023 14:55:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.34.3..@fluentui/react-components_v9.35.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Release MessageBar as stable ([PR #29502](https://github.com/microsoft/fluentui/pull/29502) by lingfangao@hotmail.com)
- `@fluentui/react-message-bar`
  - feat: Release MessageBar as stable ([PR #29502](https://github.com/microsoft/fluentui/pull/29502) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - chore: migrate from getNativeElementProps for getIntrinsicElementProps ([PR #29498](https://github.com/microsoft/fluentui/pull/29498) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - fix: Transparent buttons visible in teams high contrast mode ([PR #29497](https://github.com/microsoft/fluentui/pull/29497) by lingfangao@hotmail.com)
- `@fluentui/react-card`
  - chore: migrate from getNativeElementProps for getIntrinsicElementProps ([PR #29498](https://github.com/microsoft/fluentui/pull/29498) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-image`
  - chore: migrate from getNativeElementProps for getIntrinsicElementProps ([PR #29498](https://github.com/microsoft/fluentui/pull/29498) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-jsx-runtime`
  - chore: add warning for resolution problems ([PR #29434](https://github.com/microsoft/fluentui/pull/29434) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v8-v9`
  - fix: adding checks for is inverted and using different colors accordingly on neutralForeground3 and 4 in the createV9Theme function. ([PR #29471](https://github.com/microsoft/fluentui/pull/29471) by matejera@microsoft.com)
- `@fluentui/react-text`
  - chore: migrate from getNativeElementProps for getIntrinsicElementProps ([PR #29498](https://github.com/microsoft/fluentui/pull/29498) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-drawer`
  - chore: migrate from getNativeElementProps for getIntrinsicElementProps ([PR #29498](https://github.com/microsoft/fluentui/pull/29498) by bernardo.sunderhus@gmail.com)

## [9.34.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.34.3)

Wed, 11 Oct 2023 13:54:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.34.2..@fluentui/react-components_v9.34.3)

### Minor changes

- `@fluentui/react-utilities`
  - feat: Add virtual parent utilties ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/react-button`
  - Fix: Buttons internal focus border was not consistent on firefox ([PR #29441](https://github.com/microsoft/fluentui/pull/29441) by mifraser@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: When the month picker is shown as overlay due to space restrictions, don't close the popover when selecting a month. ([PR #29481](https://github.com/microsoft/fluentui/pull/29481) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - chore: use default prevention instead of stop propagation for Escape handling ([PR #29262](https://github.com/microsoft/fluentui/pull/29262) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)
  - chore: use default prevention instead of stop propagation for Escape handling ([PR #29262](https://github.com/microsoft/fluentui/pull/29262) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-message-bar-preview`
  - fix: Align icons with text content ([PR #29482](https://github.com/microsoft/fluentui/pull/29482) by lingfan.gao@microsoft.com)
  - fix: MessageBarActions should not overflow into grid padding ([PR #29462](https://github.com/microsoft/fluentui/pull/29462) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)
  - chore: use default prevention instead of stop propagation for Escape handling ([PR #29262](https://github.com/microsoft/fluentui/pull/29262) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal`
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)
- `@fluentui/react-table`
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: use default prevention instead of stop propagation for Escape handling ([PR #29262](https://github.com/microsoft/fluentui/pull/29262) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tree`
  - chore: adds console error when mixing Tree and FlatTree components ([PR #29461](https://github.com/microsoft/fluentui/pull/29461) by bernardo.sunderhus@gmail.com)
  - bugfix: Tree indentation broken due to wrongly consuming root context instead of subtree context ([PR #29459](https://github.com/microsoft/fluentui/pull/29459) by bernardo.sunderhus@gmail.com)
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)

### Changes

- `@fluentui/react-infobutton`
  - refactor: consume virtual parent utilities from @fluentui/react-utilities ([PR #29286](https://github.com/microsoft/fluentui/pull/29286) by lingfan.gao@microsoft.com)

## [9.34.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.34.2)

Mon, 09 Oct 2023 20:45:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.34.1..@fluentui/react-components_v9.34.2)

### Minor changes

- `@fluentui/react-message-bar-preview`
  - feat: Add shape prop to MessageBar ([PR #29426](https://github.com/microsoft/fluentui/pull/29426) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - feat: Add MessageBar types to custom style hook context ([PR #29431](https://github.com/microsoft/fluentui/pull/29431) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-dialog`
  - react-dialog/chore: replace harcoded transparent to token ([PR #29406](https://github.com/microsoft/fluentui/pull/29406) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - fix: MenuSplitGroup styles should target MenuItems ([PR #29450](https://github.com/microsoft/fluentui/pull/29450) by lingfangao@hotmail.com)
- `@fluentui/react-message-bar-preview`
  - feat: Add custom style hook to MessageBar. ([PR #29431](https://github.com/microsoft/fluentui/pull/29431) by lingfangao@hotmail.com)
- `@fluentui/react-motion-preview`
  - fix: sync internal value of canRender with presence ([PR #29394](https://github.com/microsoft/fluentui/pull/29394) by marcosvmmoura@gmail.com)
- `@fluentui/react-popover`
  - fix: Add zIndex=1 to PopoverSurface when rendering inline to avoid elements positioned relative to render on top of it. ([PR #29425](https://github.com/microsoft/fluentui/pull/29425) by esteban.230@hotmail.com)
- `@fluentui/react-provider`
  - patch: update types for custom styles hook context ([PR #29431](https://github.com/microsoft/fluentui/pull/29431) by lingfangao@hotmail.com)
- `@fluentui/react-table`
  - fix(useMeasureElement): Should not remove parent element ([PR #29451](https://github.com/microsoft/fluentui/pull/29451) by lingfangao@hotmail.com)
  - fix: remove row focus background color  ([PR #29364](https://github.com/microsoft/fluentui/pull/29364) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - chore: add e2e test for useOnScrollOutside ([PR #29413](https://github.com/microsoft/fluentui/pull/29413) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-drawer`
  - feat: make dialog slot internal to be used for composition only ([PR #29392](https://github.com/microsoft/fluentui/pull/29392) by marcosvmmoura@gmail.com)
- `@fluentui/react-infobutton`
  - fix: Use caption 1 when size is small or medium. ([PR #29418](https://github.com/microsoft/fluentui/pull/29418) by esteban.230@hotmail.com)

## [9.34.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.34.1)

Thu, 05 Oct 2023 15:25:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.34.0..@fluentui/react-components_v9.34.1)

### Minor changes

- `@fluentui/react-breadcrumb-preview`
  - feat: register items via context ([PR #29393](https://github.com/microsoft/fluentui/pull/29393) by vkozlova@microsoft.com)
- `@fluentui/react-motion-preview`
  - feat: create useMotionClassNames hook ([PR #29401](https://github.com/microsoft/fluentui/pull/29401) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-components`
  - chore: re-exports DialogSurface context types and hooks ([PR #29397](https://github.com/microsoft/fluentui/pull/29397) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
  - bugfix: removes context hooks invocations from styles hook ([PR #29396](https://github.com/microsoft/fluentui/pull/29396) by bernardo.sunderhus@gmail.com)
  - chore: exports DialogSurface context types and hooks ([PR #29397](https://github.com/microsoft/fluentui/pull/29397) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-link`
  - chore: adds style to remove default outline style ([PR #29336](https://github.com/microsoft/fluentui/pull/29336) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-message-bar-preview`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
  - fix: screenreader narration improvements ([PR #29404](https://github.com/microsoft/fluentui/pull/29404) by lingfangao@hotmail.com)
- `@fluentui/react-migration-v0-v9`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - fix: Consider all parents as scroll parents ([PR #29378](https://github.com/microsoft/fluentui/pull/29378) by lingfan.gao@microsoft.com)
- `@fluentui/react-provider`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
  - fix(useTableColumnSizing): Removes the measuring div and measures parent ([PR #29363](https://github.com/microsoft/fluentui/pull/29363) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - chore: adds comments on createCustomFocusIndicatorStyle to explain that the default outline style is not removed ([PR #29336](https://github.com/microsoft/fluentui/pull/29336) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toast`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toolbar`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tree`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)
  - bugfix: ensure TreeItem emits events properly ([PR #29390](https://github.com/microsoft/fluentui/pull/29390) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - Revert fix: useOnScrollOutside should invoke callback on dragging scrollbar ([PR #29412](https://github.com/microsoft/fluentui/pull/29412) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: migrate from getNativeElementProps to getIntrinsicElementProps ([PR #29387](https://github.com/microsoft/fluentui/pull/29387) by bernardo.sunderhus@gmail.com)

## [9.34.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.34.0)

Wed, 04 Oct 2023 08:45:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.33.0..@fluentui/react-components_v9.34.0)

### Minor changes

- `@fluentui/react-components`
  - feat: exports getIntrinsicElementProps method ([PR #29310](https://github.com/microsoft/fluentui/pull/29310) by bernardo.sunderhus@gmail.com)
  - feat: release Tag component ([PR #29355](https://github.com/microsoft/fluentui/pull/29355) by yuanboxue@microsoft.com)
- `@fluentui/react-message-bar-preview`
  - feat: release preview package ([PR #29377](https://github.com/microsoft/fluentui/pull/29377) by lingfangao@hotmail.com)
- `@fluentui/react-tags`
  - feat: initial release ([PR #29355](https://github.com/microsoft/fluentui/pull/29355) by yuanboxue@microsoft.com)
- `@fluentui/react-utilities`
  - feat: creates getIntrinsicElementProps to replace getNativeElementProps on slots creation ([PR #29310](https://github.com/microsoft/fluentui/pull/29310) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-button`
  - Fix: Button focus borders were extending past bounding box causing overlap, focus border is now inset ([PR #28705](https://github.com/microsoft/fluentui/pull/28705) by mifraser@microsoft.com)
  - fix: Icon in disabled Button shouldn't change color on hover or pressed. ([PR #29342](https://github.com/microsoft/fluentui/pull/29342) by vkozlova@microsoft.com)
- `@fluentui/react-progress`
  - fix: Updated slots to be required in ProgressBarState ([PR #29366](https://github.com/microsoft/fluentui/pull/29366) by gcox@microsoft.com)
- `@fluentui/react-tree`
  - chore: replace makeStyles with makeResetStyles ([PR #29338](https://github.com/microsoft/fluentui/pull/29338) by bernardo.sunderhus@gmail.com)
  - chore: delegate focus outline to layout components ([PR #29293](https://github.com/microsoft/fluentui/pull/29293) by bernardo.sunderhus@gmail.com)

## [9.33.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.33.0)

Mon, 02 Oct 2023 08:56:03 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.32.3..@fluentui/react-components_v9.33.0)

### Minor changes

- `@fluentui/react-breadcrumb-preview`
  - fix: exported BreadcrumbProvider and useBreadcrumbContext ([PR #29315](https://github.com/microsoft/fluentui/pull/29315) by vkozlova@microsoft.com)
  - feat: add custom styling hooks for Breadcrumb component and its sub-components ([PR #29318](https://github.com/microsoft/fluentui/pull/29318) by vkozlova@microsoft.com)
- `@fluentui/react-components`
  - feat: export SubtreeContext from @fluentui/react-tree ([PR #29194](https://github.com/microsoft/fluentui/pull/29194) by bernardo.sunderhus@gmail.com)
  - feat: export useFluentProviderThemeStyleTag ([PR #29314](https://github.com/microsoft/fluentui/pull/29314) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - feat; Add optional parameter to Table column renderHeaderCell callback ([PR #29285](https://github.com/microsoft/fluentui/pull/29285) by msnyder@microsoft.com)
- `@fluentui/react-tags-preview`
  - chore: properly type ref in state hook ([PR #29316](https://github.com/microsoft/fluentui/pull/29316) by yuanboxue@microsoft.com)
- `@fluentui/react-tree`
  - feat: creates SubtreeContext ([PR #29194](https://github.com/microsoft/fluentui/pull/29194) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-portal-compat`
  - fix: handle multiple classes in PortalCompatProvider ([PR #29351](https://github.com/microsoft/fluentui/pull/29351) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - feat: add custom styling hooks for Breadcrumb component and its sub-components ([PR #29318](https://github.com/microsoft/fluentui/pull/29318) by vkozlova@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: add custom styling hooks for Breadcrumb component and its sub-components ([PR #29318](https://github.com/microsoft/fluentui/pull/29318) by vkozlova@microsoft.com)

## [9.32.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.32.3)

Tue, 26 Sep 2023 17:49:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.32.2..@fluentui/react-components_v9.32.3)

### Patches

- `@fluentui/keyboard-keys`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/priority-overflow`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-accordion`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-aria`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-avatar`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-badge`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-button`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-card`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-combobox`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-components`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-conformance`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-context-selector`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-dialog`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-divider`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-field`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-image`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-input`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-label`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-link`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-menu`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-motion-preview`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-overflow`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-persona`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-popover`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-portal`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-positioning`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-progress`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-provider`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-radio`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-select`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-slider`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-spinner`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-switch`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-table`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-tabs`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-tabster`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-tags-preview`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-text`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-textarea`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-theme`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-toast`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-tree`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-utilities`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/babel-preset-global-context`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/global-context`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-alert`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-drawer`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-theme-sass`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/react-virtualizer`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)
- `@fluentui/tokens`
  - chore: trigger manual version bump after broken release ([PR #29303](https://github.com/microsoft/fluentui/pull/29303) by yuanboxue@microsoft.com)

## [9.32.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.32.2)

Tue, 26 Sep 2023 15:31:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.32.1..@fluentui/react-components_v9.32.2)

### Minor changes

- `@fluentui/react-tree`
  - feat: FlatTree supports navigation without useHeadlessFlatTree ([PR #29091](https://github.com/microsoft/fluentui/pull/29091) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags-preview`
  - feat: set default aria-labelledby on InteractionTagSecondary ([PR #29234](https://github.com/microsoft/fluentui/pull/29234) by yuanboxue@microsoft.com)
  - fix: update handleTagDismiss type ([PR #29240](https://github.com/microsoft/fluentui/pull/29240) by yuanboxue@microsoft.com)
  - feat: add custom style hooks for tag components ([PR #29237](https://github.com/microsoft/fluentui/pull/29237) by yuanboxue@microsoft.com)
- `@fluentui/react-tabster`
  - feat: adds suffixes to selectors on focus creator methods ([PR #29209](https://github.com/microsoft/fluentui/pull/29209) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - feat: add sorting on individual columns ([PR #29196](https://github.com/microsoft/fluentui/pull/29196) by kakrookaran@gmail.com)
- `@fluentui/react-shared-contexts`
  - feat: add custom style hooks for tag components ([PR #29237](https://github.com/microsoft/fluentui/pull/29237) by yuanboxue@microsoft.com)
- `@fluentui/react-provider`
  - feat: add custom style hooks for tag components ([PR #29237](https://github.com/microsoft/fluentui/pull/29237) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-utilities`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-tree`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-toast`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-theme`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-text`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-textarea`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-tags-preview`
  - fix: remove double curve from dismissible circular InteractionTag on windows high contrast ([PR #29261](https://github.com/microsoft/fluentui/pull/29261) by yuanboxue@microsoft.com)
  - fix: useTag `getNativeElementProps` should conditionally use 'button' or 'span' ([PR #29236](https://github.com/microsoft/fluentui/pull/29236) by yuanboxue@microsoft.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: update props descriptions ([PR #29287](https://github.com/microsoft/fluentui/pull/29287) by yuanboxue@microsoft.com)
  - fix: remove hover color for disabled InteractionTag under windows high contrast ([PR #29275](https://github.com/microsoft/fluentui/pull/29275) by yuanboxue@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-tabs`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-switch`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-spinner`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-shared-contexts`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-skeleton`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-slider`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-search-preview`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-select`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-provider`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-radio`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-progress`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-portal`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-overflow`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-persona`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-popover`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-motion-preview`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-menu`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - fix: Context menu close should restore focus ([PR #29290](https://github.com/microsoft/fluentui/pull/29290) by lingfangao@hotmail.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-label`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-link`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-input`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - bugfix: react dev runtime call is missing source parameter ([PR #29295](https://github.com/microsoft/fluentui/pull/29295) by bernardo.sunderhus@gmail.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-image`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-field`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-divider`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-dialog`
  - fix: use makeResetStyles for base dialog components styles ([PR #29280](https://github.com/microsoft/fluentui/pull/29280) by marcosvmmoura@gmail.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
  - chore: adds CSS containment to DialogSurface ([PR #29213](https://github.com/microsoft/fluentui/pull/29213) by bernardo.sunderhus@gmail.com)
  - doc: updates documentation on alert dialog escape dismiss ([PR #29211](https://github.com/microsoft/fluentui/pull/29211) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-conformance-griffel`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-context-selector`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-components`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-conformance`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-card`
  - fix: sync controllable state for selectable cards ([PR #29276](https://github.com/microsoft/fluentui/pull/29276) by marcosvmmoura@gmail.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-checkbox`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-button`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - fix: used makeResetStyles instead of makeStyles ([PR #29278](https://github.com/microsoft/fluentui/pull/29278) by vkozlova@microsoft.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-aria`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-avatar`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/priority-overflow`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-accordion`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/keyboard-keys`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)

### Changes

- `@fluentui/tokens`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-virtualizer`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-theme-sass`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/react-infobutton`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/react-drawer`
  - fix: improve performance of CSS classes ([PR #29263](https://github.com/microsoft/fluentui/pull/29263) by marcosvmmoura@gmail.com)
  - fix: resolve technical debts ([PR #29272](https://github.com/microsoft/fluentui/pull/29272) by marcosvmmoura@gmail.com)
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - fix: use context to fetch dialog id ([PR #29273](https://github.com/microsoft/fluentui/pull/29273) by marcosvmmoura@gmail.com)
  - fix: remove defaultOpen prop from DrawerInline as it had no effect ([PR #29274](https://github.com/microsoft/fluentui/pull/29274) by marcosvmmoura@gmail.com)
  - feat: add dialog slot ([PR #29217](https://github.com/microsoft/fluentui/pull/29217) by marcosvmmoura@gmail.com)
- `@fluentui/react-alert`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
  - chore: Update react-icons version to pick up IconDirectionContextProvider updated export ([PR #29151](https://github.com/microsoft/fluentui/pull/29151) by ololubek@microsoft.com)
- `@fluentui/babel-preset-global-context`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)
- `@fluentui/global-context`
  - fix: bump swc core to mitigate transpilation memory leaks ([PR #29253](https://github.com/microsoft/fluentui/pull/29253) by martinhochel@microsoft.com)

## [9.32.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.32.1)

Wed, 20 Sep 2023 17:47:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.32.0..@fluentui/react-components_v9.32.1)

### Patches

- `@fluentui/react-accordion`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-avatar`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-badge`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-button`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-card`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-combobox`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-components`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-dialog`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-divider`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-field`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-image`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-input`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-label`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-link`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-menu`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-motion-preview`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-persona`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-popover`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-portal`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-progress`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-provider`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-radio`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-select`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-slider`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-spinner`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-switch`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-table`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-tabs`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-tabster`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-tags-preview`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-text`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-textarea`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-toast`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-tree`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-drawer`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)
- `@fluentui/react-virtualizer`
  - chore: trigger manual version bump after broken release ([PR #29197](https://github.com/microsoft/fluentui/pull/29197) by martinhochel@microsoft.com)

## [9.32.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.32.0)

Wed, 20 Sep 2023 14:59:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.31.1..@fluentui/react-components_v9.32.0)

### Minor changes

- `@fluentui/react-tree`
  - feat: adds treeType to tree context ([PR #29189](https://github.com/microsoft/fluentui/pull/29189) by bernardo.sunderhus@gmail.com)
  - creates FlatTreeItem component ([PR #29098](https://github.com/microsoft/fluentui/pull/29098) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-provider`
  - feat: add createCSSRuleFromTheme() to create CSS from themes ([PR #29052](https://github.com/microsoft/fluentui/pull/29052) by olfedias@microsoft.com)
  - feat: add custom styling hooks for Drawer subcomponents ([PR #29041](https://github.com/microsoft/fluentui/pull/29041) by marcosvmmoura@gmail.com)
- `@fluentui/react-shared-contexts`
  - feat: add custom styling hooks for Drawer subcomponents ([PR #29041](https://github.com/microsoft/fluentui/pull/29041) by marcosvmmoura@gmail.com)
- `@fluentui/react-dialog`
  - feat: exports contexts ([PR #29160](https://github.com/microsoft/fluentui/pull/29160) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - feat: creates FlatTreeItem component ([PR #29098](https://github.com/microsoft/fluentui/pull/29098) by bernardo.sunderhus@gmail.com)
  - feat: Export presence icons to let users override the new behavior in PresenceBadge. ([PR #29131](https://github.com/microsoft/fluentui/pull/29131) by estebanmu@microsoft.com)
  - feat: export createCSSRuleFromTheme() function ([PR #29052](https://github.com/microsoft/fluentui/pull/29052) by olfedias@microsoft.com)
  - feat: exports contexts from react-dialog ([PR #29160](https://github.com/microsoft/fluentui/pull/29160) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - feat: Presence badge should show Out of Office icon for Away+OOF and Offline+OOF statuses and export presence icon maps. ([PR #29131](https://github.com/microsoft/fluentui/pull/29131) by estebanmu@microsoft.com)

### Patches

- `@fluentui/react-tree`
  - chore: stop using global document on HTMLElementWalker ([PR #29097](https://github.com/microsoft/fluentui/pull/29097) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags-preview`
  - chore: add cypress tests ([PR #29166](https://github.com/microsoft/fluentui/pull/29166) by yuanboxue@microsoft.com)
  - fix: remove onClick handler for non-dismissible Tag to prevent screen readers announce 'clickable' ([PR #29165](https://github.com/microsoft/fluentui/pull/29165) by yuanboxue@microsoft.com)
- `@fluentui/react-motion-preview`
  - fix: only rerun hook for the dependencies triggered by parent components ([PR #29167](https://github.com/microsoft/fluentui/pull/29167) by marcosvmmoura@gmail.com)
- `@fluentui/react-jsx-runtime`
  - fix: static children problem on render function ([PR #29162](https://github.com/microsoft/fluentui/pull/29162) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - chore: useFocusFirstElement warns only in development ([PR #29190](https://github.com/microsoft/fluentui/pull/29190) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-breadcrumb-preview`
  - fix/added CSS variables to BreadcrumbItem icon ([PR #29158](https://github.com/microsoft/fluentui/pull/29158) by vkozlova@microsoft.com)
- `@fluentui/react-accordion`
  - fix: fix memory leak caused by context assignment ([PR #29193](https://github.com/microsoft/fluentui/pull/29193) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-drawer`
  - feat: add custom styling hooks for Drawer subcomponents ([PR #29041](https://github.com/microsoft/fluentui/pull/29041) by marcosvmmoura@gmail.com)
  - fix: use dialog id for drawer title heading element ([PR #29163](https://github.com/microsoft/fluentui/pull/29163) by marcosvmmoura@gmail.com)

## [9.31.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.31.1)

Thu, 14 Sep 2023 16:44:47 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.31.0..@fluentui/react-components_v9.31.1)

### Patches

- `@fluentui/react-jsx-runtime`
  - fix: strip comments for JSX pragma ([PR #29145](https://github.com/microsoft/fluentui/pull/29145) by olfedias@microsoft.com)

## [9.31.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.31.0)

Tue, 12 Sep 2023 08:51:31 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.30.4..@fluentui/react-components_v9.31.0)

### Major changes

- `@fluentui/react-breadcrumb-preview`
  - feat: removed breadcrumb-link component ([PR #29112](https://github.com/microsoft/fluentui/pull/29112) by vkozlova@microsoft.com)

### Minor changes

- `@fluentui/react-components`
  - feat: react-tree allows control of individual tree item open state ([PR #29081](https://github.com/microsoft/fluentui/pull/29081) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toast`
  - feat(Toaster): Adds `inline` prop ([PR #29085](https://github.com/microsoft/fluentui/pull/29085) by lingfan.gao@microsoft.com)
  - feat: Add center aligned positions for Toast ([PR #29080](https://github.com/microsoft/fluentui/pull/29080) by lingfan.gao@microsoft.com)
- `@fluentui/react-tree`
  - feat: react-tree allows control of individual tree item open state ([PR #29081](https://github.com/microsoft/fluentui/pull/29081) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - fix: icon spacing in Breadcrumb ([PR #29096](https://github.com/microsoft/fluentui/pull/29096) by vkozlova@microsoft.com)
- `@fluentui/react-button`
  - fix: subtle mode hover style is now visible in windows HCM. ([PR #29116](https://github.com/microsoft/fluentui/pull/29116) by tristan.watanabe@gmail.com)
- `@fluentui/react-jsx-runtime`
  - fix: make /jsx-runtime compatible with Webpack 4 ([PR #29129](https://github.com/microsoft/fluentui/pull/29129) by olfedias@microsoft.com)
  - bugfix: fix missing .d.ts types on build ([PR #29092](https://github.com/microsoft/fluentui/pull/29092) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - fix: don't apply modalizer attributes when focus trap isn't configured ([PR #29110](https://github.com/microsoft/fluentui/pull/29110) by lingfangao@hotmail.com)
- `@fluentui/react-search-preview`
  - Adds pointer as cursor when hovering on SearchBox clear button ([PR #29039](https://github.com/microsoft/fluentui/pull/29039) by syphe@outlook.com)
- `@fluentui/react-table`
  - fix: DataGrid Headers look weird on Safari ([PR #28588](https://github.com/microsoft/fluentui/pull/28588) by mehars.6925@gmail.com)
- `@fluentui/react-tabster`
  - fix: don't apply modalizer attributes when focus trap isn't configured ([PR #29110](https://github.com/microsoft/fluentui/pull/29110) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-infobutton`
  - feat(react-infobutton): Removing openOnHover from popover props and adding details about the infobutton pattern. ([PR #29120](https://github.com/microsoft/fluentui/pull/29120) by esteban.230@hotmail.com)
  - fix: Popover should close when tabbing out of the surface. ([PR #28913](https://github.com/microsoft/fluentui/pull/28913) by esteban.230@hotmail.com)

## [9.30.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.30.4)

Wed, 06 Sep 2023 13:31:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.30.3..@fluentui/react-components_v9.30.4)

### Minor changes

- `@fluentui/react-conformance`
  - feat: add option `disableTypeTests` to disable tests that require TypeScript information ([PR #28988](https://github.com/microsoft/fluentui/pull/28988) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - fix: styling for BreadcrumbItem ([PR #29059](https://github.com/microsoft/fluentui/pull/29059) by vkozlova@microsoft.com)
- `@fluentui/react-utilities`
  - Revert fix: `useOnClickOutside` should invoke callback on clicking scrollbar ([PR #29065](https://github.com/microsoft/fluentui/pull/29065) by yuanboxue@microsoft.com)

## [9.30.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.30.3)

Tue, 05 Sep 2023 15:39:03 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.30.2..@fluentui/react-components_v9.30.3)

### Patches

- `@fluentui/react-utilities`
  - fix: `useOnScrollOutside` should invoke callback on dragging scrollbar ([PR #29062](https://github.com/microsoft/fluentui/pull/29062) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-drawer`
  - refactor: organize code imports ([PR #29055](https://github.com/microsoft/fluentui/pull/29055) by marcosvmmoura@gmail.com)
  - test: add e2e tests for base Drawer components ([PR #29029](https://github.com/microsoft/fluentui/pull/29029) by marcosvmmoura@gmail.com)

## [9.30.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.30.2)

Tue, 05 Sep 2023 13:28:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.30.1..@fluentui/react-components_v9.30.2)

### Minor changes

- `@fluentui/react-motion-preview`
  - feat: create useReducedMotion and apply to useMotion to skip all motion calculations ([PR #29014](https://github.com/microsoft/fluentui/pull/29014) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-motion-preview`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-overflow`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-persona`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal-compat`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal-compat-context`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-progress`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-provider`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-search-preview`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-select`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-shared-contexts`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-skeleton`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-slider`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinbutton`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinner`
  - feat: Update Spinner appearance token to colorBrandStroke2Contrast ([PR #29008](https://github.com/microsoft/fluentui/pull/29008) by ololubek@microsoft.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-switch`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabs`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabster`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags-preview`
  - fix: add style for windows high contrast ([PR #29035](https://github.com/microsoft/fluentui/pull/29035) by yuanboxue@microsoft.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: use makeResetStyles to reduce classNames ([PR #29022](https://github.com/microsoft/fluentui/pull/29022) by yuanboxue@microsoft.com)
  - fix: remember last focused element in TagGroup ([PR #29023](https://github.com/microsoft/fluentui/pull/29023) by yuanboxue@microsoft.com)
- `@fluentui/react-text`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-textarea`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-theme`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toast`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toolbar`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tooltip`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tree`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: adds swc-plugin-de-indent-template-literal to remove indentation of consoles ([PR #29040](https://github.com/microsoft/fluentui/pull/29040) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: adds swc-plugin-de-indent-template-literal to remove indentation of consoles ([PR #29040](https://github.com/microsoft/fluentui/pull/29040) by bernardo.sunderhus@gmail.com)
  - fix: use timeout instead of requestAnimationFrame for ssr ([PR #29015](https://github.com/microsoft/fluentui/pull/29015) by marcosvmmoura@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/keyboard-keys`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/priority-overflow`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-accordion`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-aria`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-breadcrumb-preview`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-card`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-checkbox`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-combobox`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-conformance`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-conformance-griffel`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-context-selector`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: adds swc-plugin-de-indent-template-literal to remove indentation of consoles ([PR #29040](https://github.com/microsoft/fluentui/pull/29040) by bernardo.sunderhus@gmail.com)
  - bugfix: fixes DialogActions position on breakpoint ([PR #29021](https://github.com/microsoft/fluentui/pull/29021) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-divider`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-image`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-input`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-jsx-runtime`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-label`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-link`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v0-v9`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v8-v9`
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-theme-sass`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/tokens`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/babel-preset-global-context`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
- `@fluentui/global-context`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - bumps react peer dependencies to v16.14.0 ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-alert`
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-drawer`
  - fix: refactor DrawerHeaderTitle slot creation while keeping the same API ([PR #29042](https://github.com/microsoft/fluentui/pull/29042) by marcosvmmoura@gmail.com)
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)
  - test: add simple renderization tests for sub components ([PR #29043](https://github.com/microsoft/fluentui/pull/29043) by marcosvmmoura@gmail.com)
  - feat: add motion for Drawer ([PR #28999](https://github.com/microsoft/fluentui/pull/28999) by marcosvmmoura@gmail.com)
- `@fluentui/react-infobutton`
  - chore: migrate package to use JSX importSource ([PR #28959](https://github.com/microsoft/fluentui/pull/28959) by bernardo.sunderhus@gmail.com)
  - bumps @swc/helpers version to 0.5.1 ([PR #28989](https://github.com/microsoft/fluentui/pull/28989) by bernardo.sunderhus@gmail.com)

## [9.30.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.30.1)

Tue, 29 Aug 2023 12:57:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.30.0..@fluentui/react-components_v9.30.1)

### Minor changes

- `@fluentui/react-dialog`
  - feat: adds mountNode to DialogSurface API ([PR #29003](https://github.com/microsoft/fluentui/pull/29003) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-motion-preview`
  - feat: release preview package ([PR #29005](https://github.com/microsoft/fluentui/pull/29005) by marcosvmmoura@gmail.com)
  - feat: create react-motion-preview package with useMotion hook ([PR #28699](https://github.com/microsoft/fluentui/pull/28699) by marcosvmmoura@gmail.com)
- `@fluentui/react-popover`
  - feat: add closeOnIframeFocus prop to Popover ([PR #28881](https://github.com/microsoft/fluentui/pull/28881) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - feat: Add IconDirectionProvider to FluentProvider ([PR #28803](https://github.com/microsoft/fluentui/pull/28803) by ololubek@microsoft.com)
- `@fluentui/react-toast`
  - feat: adds mountNode to Toaster API ([PR #29003](https://github.com/microsoft/fluentui/pull/29003) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - feat: add disabledFocusOnIframe for useOnClickOutside() ([PR #28881](https://github.com/microsoft/fluentui/pull/28881) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-button`
  - fix: Small Button now uses token for its border radius ([PR #28589](https://github.com/microsoft/fluentui/pull/28589) by mehars.6925@gmail.com)
- `@fluentui/react-card`
  - fix: CardHeader grid layout ignoring line-height of content ([PR #28968](https://github.com/microsoft/fluentui/pull/28968) by marcosvmmoura@gmail.com)
- `@fluentui/react-table`
  - fix: Improve visuals when Table/DataGrid overflows it's parent ([PR #28940](https://github.com/microsoft/fluentui/pull/28940) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tags-preview`
  - fix: tag with secondary text has no top border under windows high contrast ([PR #28963](https://github.com/microsoft/fluentui/pull/28963) by yuanboxue@microsoft.com)
  - fix: use regular icon for dismiss ([PR #28958](https://github.com/microsoft/fluentui/pull/28958) by yuanboxue@microsoft.com)
- `@fluentui/react-utilities`
  - fix: `useOnClickOutside` should invoke callback on clicking scrollbar ([PR #28965](https://github.com/microsoft/fluentui/pull/28965) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-infobutton`
  - fix(react-infobutton): Making InfoButton's PopoverSurface inline by default. ([PR #28605](https://github.com/microsoft/fluentui/pull/28605) by esteban.230@hotmail.com)

## [9.30.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.30.0)

Thu, 24 Aug 2023 10:26:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.5..@fluentui/react-components_v9.30.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Export DataGridContextProvider. ([PR #28955](https://github.com/microsoft/fluentui/pull/28955) by esteban.230@hotmail.com)
- `@fluentui/react-table`
  - feat: Export DataGridContextProvider. ([PR #28955](https://github.com/microsoft/fluentui/pull/28955) by esteban.230@hotmail.com)
- `@fluentui/react-tooltip`
  - feat: Add documentKeyboardEvent to OnVisibleChangeData when Tooltip is hidden via Escape ([PR #28951](https://github.com/microsoft/fluentui/pull/28951) by behowell@microsoft.com)
- `@fluentui/react-utilities`
  - feat: create a new useAnimationFrame hook ([PR #28948](https://github.com/microsoft/fluentui/pull/28948) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-card`
  - docs: improve storybook and examples to better align with design guidelines ([PR #28969](https://github.com/microsoft/fluentui/pull/28969) by marcosvmmoura@gmail.com)
- `@fluentui/react-components`
  - expose useDataGridContext_unstable etc. contexts ([PR #28973](https://github.com/microsoft/fluentui/pull/28973) by email not defined)
- `@fluentui/react-jsx-runtime`
  - chore: decrease bundle size & adds fixtures ([PR #28962](https://github.com/microsoft/fluentui/pull/28962) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - fix(react-popover): Only apply modal attributes if the PopoverSurface traps focus. ([PR #28613](https://github.com/microsoft/fluentui/pull/28613) by esteban.230@hotmail.com)
- `@fluentui/react-table`
  - expose useDataGridContext_unstable etc. contexts ([PR #28973](https://github.com/microsoft/fluentui/pull/28973) by email not defined)
- `@fluentui/react-utilities`
  - fix: `useOnClickOutside` should consider text selection starting inside and finishing outside as an inside click ([PR #28765](https://github.com/microsoft/fluentui/pull/28765) by yuanboxue@microsoft.com)

## [9.29.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.5)

Wed, 23 Aug 2023 12:01:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.4..@fluentui/react-components_v9.29.5)

### Patches

- `@fluentui/react-accordion`
  - fix: added cursor style in AccordionHeader for AccordionItem disabled state ([PR #28850](https://github.com/microsoft/fluentui/pull/28850) by kakrookaran@gmail.com)
- `@fluentui/react-utilities`
  - bugfix: ensure interop between assertSlots and old API ([PR #28957](https://github.com/microsoft/fluentui/pull/28957) by bernardo.sunderhus@gmail.com)

## [9.29.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.4)

Mon, 21 Aug 2023 11:38:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.3..@fluentui/react-components_v9.29.4)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - fix: breadcrumb spacing ([PR #28883](https://github.com/microsoft/fluentui/pull/28883) by vkozlova@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: Make year picker react to go to today. ([PR #28907](https://github.com/microsoft/fluentui/pull/28907) by esteban.230@hotmail.com)
- `@fluentui/react-menu`
  - fix: make MenuItem with long content grow its height ([PR #28675](https://github.com/microsoft/fluentui/pull/28675) by yuanboxue@microsoft.com)
- `@fluentui/react-positioning`
  - fix: make event listners passive ([PR #28839](https://github.com/microsoft/fluentui/pull/28839) by olfedias@microsoft.com)
  - chore: fix lint warnings ([PR #28889](https://github.com/microsoft/fluentui/pull/28889) by seanmonahan@microsoft.com)
- `@fluentui/react-provider`
  - chore: fix lint warnings ([PR #28889](https://github.com/microsoft/fluentui/pull/28889) by seanmonahan@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: migrate to new slots API ([PR #28862](https://github.com/microsoft/fluentui/pull/28862) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags-preview`
  - chore: add documentation ([PR #28899](https://github.com/microsoft/fluentui/pull/28899) by yuanboxue@microsoft.com)
  - fix: use `:active` selector for pressed style instead of `:hover:active` ([PR #28884](https://github.com/microsoft/fluentui/pull/28884) by yuanboxue@microsoft.com)
- `@fluentui/react-tree`
  - chore: fix lint warnings ([PR #28889](https://github.com/microsoft/fluentui/pull/28889) by seanmonahan@microsoft.com)
  - fix: stabilize `handleActionsRef` created by TreeItem ([PR #28896](https://github.com/microsoft/fluentui/pull/28896) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-drawer`
  - fix: rename values of position prop from left/right to start/end ([PR #28905](https://github.com/microsoft/fluentui/pull/28905) by marcosvmmoura@gmail.com)
- `@fluentui/react-infobutton`
  - fix: Cursor should be pointer when hovering the button to show it's a button. ([PR #28893](https://github.com/microsoft/fluentui/pull/28893) by esteban.230@hotmail.com)

## [9.29.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.3)

Thu, 17 Aug 2023 13:49:56 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.2..@fluentui/react-components_v9.29.3)

### Patches

- `@fluentui/react-tree`
  - bugfix: headless flat tree itemType manual definition ([PR #28898](https://github.com/microsoft/fluentui/pull/28898) by bernardo.sunderhus@gmail.com)

## [9.29.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.2)

Wed, 16 Aug 2023 17:41:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.1..@fluentui/react-components_v9.29.2)

### Patches

- `@fluentui/react-components`
  - feat: stable release react-tree ([PR #28845](https://github.com/microsoft/fluentui/pull/28845) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-jsx-runtime`
  - chore: release stable version ([PR #28880](https://github.com/microsoft/fluentui/pull/28880) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tags-preview`
  - fix: tag changes hover pointer only when hovering dismiss icon ([PR #28791](https://github.com/microsoft/fluentui/pull/28791) by yuanboxue@microsoft.com)
- `@fluentui/react-tree`
  - feat: stable release ([PR #28845](https://github.com/microsoft/fluentui/pull/28845) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-virtualizer`
  - Fix: Ensure scrollViewRef is merged with container ref ([PR #28829](https://github.com/microsoft/fluentui/pull/28829) by mifraser@microsoft.com)

## [9.29.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.1)

Wed, 16 Aug 2023 11:38:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.29.0..@fluentui/react-components_v9.29.1)

### Minor changes

- `@fluentui/react-breadcrumb-preview`
  - removed iconPosition prop from the Breadcrumb ([PR #28846](https://github.com/microsoft/fluentui/pull/28846) by vkozlova@microsoft.com)
- `@fluentui/react-tags-preview`
  - BREAKING CHANGE: use JSX children for InteractionTag's action buttons ([PR #28739](https://github.com/microsoft/fluentui/pull/28739) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - Added CY tests for Breacrumb with Menu and Overflow ([PR #28790](https://github.com/microsoft/fluentui/pull/28790) by vkozlova@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: changes tsconfig target to ES2019 ([PR #28848](https://github.com/microsoft/fluentui/pull/28848) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-jsx-runtime`
  - feat: supports new automatic JSX runtime ([PR #28810](https://github.com/microsoft/fluentui/pull/28810) by bernardo.sunderhus@gmail.com)

## [9.29.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.29.0)

Mon, 14 Aug 2023 21:22:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.28.1..@fluentui/react-components_v9.29.0)

### Minor changes

- `@fluentui/react-components`
  - feat: re-export `resolvePositioningShorthand` from @fluentui/react-positioning ([PR #28843](https://github.com/microsoft/fluentui/pull/28843) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-tabs`
  - Defer tabs rectangle computation only when previousSelectedValue is defined ([PR #28749](https://github.com/microsoft/fluentui/pull/28749) by nasirvi@microsoft.com)

## [9.28.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.28.1)

Fri, 11 Aug 2023 12:14:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.28.0..@fluentui/react-components_v9.28.1)

### Minor changes

- `@fluentui/react-datepicker-compat`
  - feat: Added mountNode to DatePicker compat. ([PR #28747](https://github.com/microsoft/fluentui/pull/28747) by gcox@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: flickering in Overflow ([PR #28767](https://github.com/microsoft/fluentui/pull/28767) by vkozlova@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore(react-migration-v0-v9): migrate to new slot API ([PR #28775](https://github.com/microsoft/fluentui/pull/28775) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-overflow`
  - fix: flickering in Overflow ([PR #28767](https://github.com/microsoft/fluentui/pull/28767) by vkozlova@microsoft.com)
- `@fluentui/react-tabs`
  - chore(react-tabs): migrate to new slot API ([PR #28773](https://github.com/microsoft/fluentui/pull/28773) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - chore: tests for slot.resolveShorthand behavior ([PR #28819](https://github.com/microsoft/fluentui/pull/28819) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-virtualizer`
  - chore(react-virtualizer): migrate to new slot API ([PR #28774](https://github.com/microsoft/fluentui/pull/28774) by bernardo.sunderhus@gmail.com)

## [9.28.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.28.0)

Wed, 09 Aug 2023 13:16:47 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.27.4..@fluentui/react-components_v9.28.0)

### Minor changes

- `@fluentui/react-components`
  - chore: re-export slot and assertSlots methods ([PR #28755](https://github.com/microsoft/fluentui/pull/28755) by bernardo.sunderhus@gmail.com)
  - feat: Export useEventCallback and mergeCallbacks ([PR #28428](https://github.com/microsoft/fluentui/pull/28428) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: inaccurate calculation of size ([PR #28728](https://github.com/microsoft/fluentui/pull/28728) by vkozlova@microsoft.com)
- `@fluentui/react-accordion`
  - bugfix: Breaking Change, onHeaderClick erroneously removed ([PR #28764](https://github.com/microsoft/fluentui/pull/28764) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-aria`
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - fix: disabled BreadcrumbLink shouldn't be focusable ([PR #28720](https://github.com/microsoft/fluentui/pull/28720) by vkozlova@microsoft.com)
  - chore(cxe-prg): migrate to new slot API ([PR #28752](https://github.com/microsoft/fluentui/pull/28752) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - fix: Button icon no longer rendering off-center with falsy children. ([PR #28495](https://github.com/microsoft/fluentui/pull/28495) by andrew.enger48@gmail.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - fix: updated styles to icon fill on hover only for subtle and transparent variant of button ([PR #28616](https://github.com/microsoft/fluentui/pull/28616) by kakrookaran@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-prg): migrate to new slot API ([PR #28752](https://github.com/microsoft/fluentui/pull/28752) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-field`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-image`
  - chore(cxe-prg): migrate to new slot API ([PR #28752](https://github.com/microsoft/fluentui/pull/28752) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v0-v9`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - fix: inaccurate calculation of size ([PR #28728](https://github.com/microsoft/fluentui/pull/28728) by vkozlova@microsoft.com)
- `@fluentui/react-persona`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-coastal): migrate to new slot API ([PR #28754](https://github.com/microsoft/fluentui/pull/28754) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-switch`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-tags-preview`
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-prg): migrate to new slot API ([PR #28752](https://github.com/microsoft/fluentui/pull/28752) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-textarea`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toolbar`
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-drawer`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - chore(cxe-prg): migrate to new slot API ([PR #28752](https://github.com/microsoft/fluentui/pull/28752) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-infobutton`
  - chore(cxe-red): migrate to new slot API ([PR #28753](https://github.com/microsoft/fluentui/pull/28753) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/react-theme-sass`
  - feat(tokens): add durationGentle ([PR #28770](https://github.com/microsoft/fluentui/pull/28770) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tree`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
  - feat: implements nested tree selection ([PR #28668](https://github.com/microsoft/fluentui/pull/28668) by bernardo.sunderhus@gmail.com)
  - Docs(react-tree): Improve docs and stories ([PR #28741](https://github.com/microsoft/fluentui/pull/28741) by petrduda@microsoft.com)
  - bugfix: headless tree should respect itemType ([PR #28759](https://github.com/microsoft/fluentui/pull/28759) by bernardo.sunderhus@gmail.com)
  - chore(teams-prg): migrate to new slot API ([PR #28751](https://github.com/microsoft/fluentui/pull/28751) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - chore: Update Griffel to latest version ([PR #28684](https://github.com/microsoft/fluentui/pull/28684) by olfedias@microsoft.com)
- `@fluentui/tokens`
  - feat: add durationGentle ([PR #28770](https://github.com/microsoft/fluentui/pull/28770) by miroslav.stastny@microsoft.com)

## [9.27.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.27.4)

Fri, 04 Aug 2023 08:52:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.27.3..@fluentui/react-components_v9.27.4)

### Minor changes

- `@fluentui/react-accordion`
  - feat: make AccordionItemValue generic ([PR #28665](https://github.com/microsoft/fluentui/pull/28665) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-breadcrumb-preview`
  - feat: Added an icon for BreadcrumbItem ([PR #28682](https://github.com/microsoft/fluentui/pull/28682) by vkozlova@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - feat(tokens): Add colorBrandStroke2Contrast and colorNeutralStrokeAlpha2 ([PR #28638](https://github.com/microsoft/fluentui/pull/28638) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tabster`
  - feat: Adds ignoreDefaultKeydown for useFocusableGroup ([PR #28660](https://github.com/microsoft/fluentui/pull/28660) by lingfangao@hotmail.com)
- `@fluentui/react-toast`
  - feat: Add extra keyboard behaviour for multi toast scenario ([PR #28660](https://github.com/microsoft/fluentui/pull/28660) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - feat: implement new slot methods (slot and assertSlots) ([PR #28373](https://github.com/microsoft/fluentui/pull/28373) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - fix: made BreadcrumbButton consistent with other items ([PR #28672](https://github.com/microsoft/fluentui/pull/28672) by vkozlova@microsoft.com)
- `@fluentui/react-menu`
  - bugfix: disable menu opening if contextmenu event is prevented ([PR #28718](https://github.com/microsoft/fluentui/pull/28718) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-jsx-runtime`
  - chore: update createElement to support new slot methods ([PR #28373](https://github.com/microsoft/fluentui/pull/28373) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-theme-sass`
  - feat(tokens): Add colorBrandStroke2Contrast and colorNeutralStrokeAlpha2 ([PR #28638](https://github.com/microsoft/fluentui/pull/28638) by miroslav.stastny@microsoft.com)
  - feat(tokens): add status color tokens ([PR #28006](https://github.com/microsoft/fluentui/pull/28006) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tree`
  - bugfix: renames content slot to main ([PR #28695](https://github.com/microsoft/fluentui/pull/28695) by bernardo.sunderhus@gmail.com)
  - feat: converts actions to be a toolbar ([PR #28719](https://github.com/microsoft/fluentui/pull/28719) by bernardo.sunderhus@gmail.com)
- `@fluentui/tokens`
  - feat: add status color tokens ([PR #28006](https://github.com/microsoft/fluentui/pull/28006) by miroslav.stastny@microsoft.com)
  - Add colorBrandStroke2Contrast and colorNeutralStrokeAlpha2 ([PR #28638](https://github.com/microsoft/fluentui/pull/28638) by miroslav.stastny@microsoft.com)

## [9.27.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.27.3)

Tue, 01 Aug 2023 13:04:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.27.2..@fluentui/react-components_v9.27.3)

### Minor changes

- `@fluentui/react-tags-preview`
  - feat: release preview package ([PR #28696](https://github.com/microsoft/fluentui/pull/28696) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/react-menu`
  - fix: revert menuItem focus ring back to border ([PR #28698](https://github.com/microsoft/fluentui/pull/28698) by yuanboxue@microsoft.com)
- `@fluentui/react-provider`
  - feat(FluentProvider): emit errors on duplicate IDs ([PR #28670](https://github.com/microsoft/fluentui/pull/28670) by olfedias@microsoft.com)

## [9.27.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.27.2)

Tue, 01 Aug 2023 10:17:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.27.1..@fluentui/react-components_v9.27.2)

### Minor changes

- `@fluentui/react-accordion`
  - Accordion - export AccordionHeaderContextProvider ([PR #28542](https://github.com/microsoft/fluentui/pull/28542) by jirivyhnalek@microsoft.com)
- `@fluentui/react-combobox`
  - Added portal slot to Combobox and Dropdown ([PR #28661](https://github.com/microsoft/fluentui/pull/28661) by gcox@microsoft.com)
- `@fluentui/react-shared-contexts`
  - adds Announce context ([PR #28654](https://github.com/microsoft/fluentui/pull/28654) by eysjiang@gmail.com)

### Patches

- `@fluentui/react-menu`
  - fix: use css outline for MenuItem focus ring instead of pseudo element ([PR #28685](https://github.com/microsoft/fluentui/pull/28685) by yuanboxue@microsoft.com)
- `@fluentui/react-positioning`
  - fix: autoSize causing maximum positioning update ([PR #28689](https://github.com/microsoft/fluentui/pull/28689) by yuanboxue@microsoft.com)
- `@fluentui/react-toolbar`
  - Remove margin from Icon in ToolbarButton when vertical prop is passed ([PR #28658](https://github.com/microsoft/fluentui/pull/28658) by chassunc@microsoft.com)

### Changes

- `@fluentui/react-tree`
  - bugfix: Tree, vertical spacing of branches and children is inconsistent ([PR #28681](https://github.com/microsoft/fluentui/pull/28681) by petrduda@microsoft.com)
  - feat: adds openItems and checkedItems to tree callback data ([PR #28669](https://github.com/microsoft/fluentui/pull/28669) by bernardo.sunderhus@gmail.com)
  - chore: improves internal headless signature ([PR #28651](https://github.com/microsoft/fluentui/pull/28651) by bernardo.sunderhus@gmail.com)

## [9.27.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.27.1)

Thu, 27 Jul 2023 10:34:13 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.27.0..@fluentui/react-components_v9.27.1)

### Minor changes

- `@fluentui/react-menu`
  - feat: update style to prevent double scrollbar ([PR #28622](https://github.com/microsoft/fluentui/pull/28622) by yuanboxue@microsoft.com)
- `@fluentui/react-positioning`
  - feat: simplify autoSize options to make 'always'/'height-always'/'width-always' equivalent to true/'height'/'width'. ([PR #28649](https://github.com/microsoft/fluentui/pull/28649) by yuanboxue@microsoft.com)
  - feat: update maxSize middleware to apply height/width when overflow ([PR #28622](https://github.com/microsoft/fluentui/pull/28622) by yuanboxue@microsoft.com)

### Changes

- `@fluentui/react-tree`
  - bugfix: makes selector slot required when selection mode is defined ([PR #28648](https://github.com/microsoft/fluentui/pull/28648) by bernardo.sunderhus@gmail.com)

## [9.27.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.27.0)

Tue, 25 Jul 2023 13:29:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.26.2..@fluentui/react-components_v9.27.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Export useRestoreFocusTarget and useRestoreFocusSource ([PR #28530](https://github.com/microsoft/fluentui/pull/28530) by lingfan.gao@microsoft.com)
- `@fluentui/react-table`
  - Table/DataGrid: Improve keyboard column resizing experience ([PR #28493](https://github.com/microsoft/fluentui/pull/28493) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tabster`
  - feat: Implement useRestoreFocusSource and useRestoreFocusTarget based on the tabster restorer API ([PR #28530](https://github.com/microsoft/fluentui/pull/28530) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - fix: Overflow update should run show/hide steps twice ([PR #28628](https://github.com/microsoft/fluentui/pull/28628) by lingfan.gao@microsoft.com)
- `@fluentui/react-accordion`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-breadcrumb-preview`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
  - fix: updated readme, replaced MenuItem with MenuItemLink ([PR #28626](https://github.com/microsoft/fluentui/pull/28626) by vkozlova@microsoft.com)
  - fix: spacing in BreadcrumbButton and Link, added more examples to the stories ([PR #28578](https://github.com/microsoft/fluentui/pull/28578) by vkozlova@microsoft.com)
- `@fluentui/react-button`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-components`
  - feat: exports FlatTree ([PR #28620](https://github.com/microsoft/fluentui/pull/28620) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
  - fix: Focus should restore to a DialogTrigger outside of a Dialog ([PR #28530](https://github.com/microsoft/fluentui/pull/28530) by lingfan.gao@microsoft.com)
- `@fluentui/react-field`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
  - refactor: Remove custom focus code in favour of useRestoreFocus hooks ([PR #28530](https://github.com/microsoft/fluentui/pull/28530) by lingfan.gao@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-overflow`
  - fix: Overflow update should run show/hide steps twice ([PR #28628](https://github.com/microsoft/fluentui/pull/28628) by lingfan.gao@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-search-preview`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-select`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - 28456 ([PR #28577](https://github.com/microsoft/fluentui/pull/28577) by lingfan.gao@microsoft.com)
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-toast`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
- `@fluentui/react-tree`
  - chore: Update react-icons version to pick up fowardref change. ([PR #28590](https://github.com/microsoft/fluentui/pull/28590) by ololubek@microsoft.com)
  - chore: moves slots from TreeItem to TreeItemLayout ([PR #28621](https://github.com/microsoft/fluentui/pull/28621) by bernardo.sunderhus@gmail.com)
  - feat: creates FlatTree component ([PR #28620](https://github.com/microsoft/fluentui/pull/28620) by bernardo.sunderhus@gmail.com)

## [9.26.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.26.2)

Thu, 20 Jul 2023 18:27:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.26.1..@fluentui/react-components_v9.26.2)

### Minor changes

- `@fluentui/react-menu`
  - chore: Exporting MENU_ENTER_EVENT and dispatchMenuEnterEvent utilities. ([PR #28499](https://github.com/microsoft/fluentui/pull/28499) by Humberto.Morimoto@microsoft.com)

### Patches

- `@fluentui/react-button`
  - fix: high contrast mode hover style icon fixes ([PR #28156](https://github.com/microsoft/fluentui/pull/28156) by eysjiang@gmail.com)
  - fix: updated right border token in primary variant of split button ([PR #28555](https://github.com/microsoft/fluentui/pull/28555) by kakrookaran@gmail.com)
- `@fluentui/react-conformance`
  - fix: add @swc/helpers to deps instead of tslib as we use swc for transpilation ([PR #28599](https://github.com/microsoft/fluentui/pull/28599) by martinhochel@microsoft.com)
- `@fluentui/react-dialog`
  - bugfix: moves handleBackdropClick from defaultProps to an override  ([PR #28579](https://github.com/microsoft/fluentui/pull/28579) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - fix: MenuItem content should be spaced 12px from the boundary ([PR #28162](https://github.com/microsoft/fluentui/pull/28162) by lingfangao@hotmail.com)
- `@fluentui/react-portal-compat`
  - fix(PortalCompatProvider): support custom ID prefixes in themeClassName ([PR #28551](https://github.com/microsoft/fluentui/pull/28551) by alinazaieva@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: Remove empty makeStyles call. ([PR #28566](https://github.com/microsoft/fluentui/pull/28566) by 138819425+benlemmon-ms@users.noreply.github.com)

### Changes

- `@fluentui/react-tree`
  - feat: implements selection ([PR #28497](https://github.com/microsoft/fluentui/pull/28497) by bernardo.sunderhus@gmail.com)

## [9.26.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.26.1)

Mon, 17 Jul 2023 21:27:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.26.0..@fluentui/react-components_v9.26.1)

### Minor changes

- `@fluentui/react-breadcrumb-preview`
  - feat: release react-breadcrumb to unstable ([PR #28402](https://github.com/microsoft/fluentui/pull/28402) by vkozlova@microsoft.com)
- `@fluentui/react-search-preview`
  - feat: release preview package ([PR #28531](https://github.com/microsoft/fluentui/pull/28531) by eysjiang@gmail.com)
- `@fluentui/react-spinner`
  - feat: add extra-tiny value to size prop of Spinner ([PR #28249](https://github.com/microsoft/fluentui/pull/28249) by ololubek@microsoft.com)

### Patches

- `@fluentui/react-breadcrumb-preview`
  - made breadcrumb package public ([PR #28549](https://github.com/microsoft/fluentui/pull/28549) by vkozlova@microsoft.com)
- `@fluentui/react-card`
  - fix: use resolved slot instead of raw prop object ([PR #28517](https://github.com/microsoft/fluentui/pull/28517) by marcosvmmoura@gmail.com)

### Changes

- `@fluentui/react-infobutton`
  - fix(react-infobutton): Make InfoLabel only add aria-owns when the popover is open. ([PR #28463](https://github.com/microsoft/fluentui/pull/28463) by esteban.230@hotmail.com)
  - feat(react-infobutton): Remove InfoIcon files from react-infobutton. ([PR #28534](https://github.com/microsoft/fluentui/pull/28534) by esteban.230@hotmail.com)
- `@fluentui/react-virtualizer`
  - Feat: Add imperative ref access to both virtualizer length and current index ([PR #28450](https://github.com/microsoft/fluentui/pull/28450) by mifraser@microsoft.com)

## [9.26.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.26.0)

Tue, 11 Jul 2023 18:46:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.25.1..@fluentui/react-components_v9.26.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Export focus mode types for DataGrid ([PR #28475](https://github.com/microsoft/fluentui/pull/28475) by lingfan.gao@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - feat: release stable ([PR #28460](https://github.com/microsoft/fluentui/pull/28460) by martinhochel@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - breaking: Remove componentRef and IDatePicker since it's no longer necessary, fix ref forwarding to the input, change ref type for useDatePicker to use HTMLInputElement instead of HTMLElement, and fix focus movement when closing/opening popup. ([PR #28299](https://github.com/microsoft/fluentui/pull/28299) by esteban.230@hotmail.com)
- `@fluentui/react-menu`
  - fix: exported useOnMenuMouseEnter from react-menu ([PR #28413](https://github.com/microsoft/fluentui/pull/28413) by kakrookaran@gmail.com)
- `@fluentui/react-positioning`
  - feat: export options `strategy` from `PositioningProps`. Deprecate internal option `positionFixed` ([PR #28482](https://github.com/microsoft/fluentui/pull/28482) by yuanboxue@microsoft.com)
- `@fluentui/react-table`
  - feat(DataGridCell): Implemets `cell` and `none` focusModes ([PR #28475](https://github.com/microsoft/fluentui/pull/28475) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/react-datepicker-compat`
  - fix(react-datepicker-compat): Add focus styles to CalendarPicker's go to today button. ([PR #28458](https://github.com/microsoft/fluentui/pull/28458) by esteban.230@hotmail.com)

### Changes

- `@fluentui/react-data-grid-react-window`
  - feat: Deprecates package in favour of @fluentui-contrib/react-data-grid-react-window ([PR #28476](https://github.com/microsoft/fluentui/pull/28476) by lingfan.gao@microsoft.com)
- `@fluentui/react-tree`
  - chore: move slots back to TreeItem and creates slot context ([PR #28492](https://github.com/microsoft/fluentui/pull/28492) by bernardo.sunderhus@gmail.com)
  - chore: openItems property added to TreeOpenChangeData + minor internal improvements ([PR #28491](https://github.com/microsoft/fluentui/pull/28491) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - Fix: Ensure 'start buffer' is margin padded into the non-virtualized space on horizontal layouts ([PR #28437](https://github.com/microsoft/fluentui/pull/28437) by mifraser@microsoft.com)

## [9.25.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.25.1)

Mon, 03 Jul 2023 20:43:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.25.0..@fluentui/react-components_v9.25.1)

### Patches

- `@fluentui/react-toast`
  - fix: Toaster should play toasts on action dismiss ([PR #28420](https://github.com/microsoft/fluentui/pull/28420) by lingfan.gao@microsoft.com)

## [9.25.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.25.0)

Mon, 03 Jul 2023 13:34:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.24.0..@fluentui/react-components_v9.25.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Export useTableCompositeNavigation hook ([PR #28394](https://github.com/microsoft/fluentui/pull/28394) by lingfan.gao@microsoft.com)
- `@fluentui/react-table`
  - feat: Implement composite navigation for Table and DataGrid ([PR #28394](https://github.com/microsoft/fluentui/pull/28394) by lingfan.gao@microsoft.com)
- `@fluentui/react-tabster`
  - feat: Implmenent useMergeTabsterAttributes_unstable ([PR #28394](https://github.com/microsoft/fluentui/pull/28394) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/react-menu`
  - fix: menu item disabled style ([PR #28412](https://github.com/microsoft/fluentui/pull/28412) by kakrookaran@gmail.com)

## [9.24.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.24.0)

Mon, 03 Jul 2023 11:57:11 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.23.1..@fluentui/react-components_v9.24.0)

### Minor changes

- `@fluentui/react-components`
  - re-export GriffelResetStyle type ([PR #28367](https://github.com/microsoft/fluentui/pull/28367) by olfedias@microsoft.com)
  - feat: Implement MenuItemLink components ([PR #28369](https://github.com/microsoft/fluentui/pull/28369) by lingfan.gao@microsoft.com)
  - feat: Release Toast component ([PR #28399](https://github.com/microsoft/fluentui/pull/28399) by lingfan.gao@microsoft.com)
  - feat: re-export PortalMountNodeProvider & usePortalMountNode ([PR #28395](https://github.com/microsoft/fluentui/pull/28395) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - feat: Add styles for inverted background ([PR #28341](https://github.com/microsoft/fluentui/pull/28341) by lingfan.gao@microsoft.com)
- `@fluentui/react-menu`
  - feat: Implement MenuItemLink components ([PR #28369](https://github.com/microsoft/fluentui/pull/28369) by lingfan.gao@microsoft.com)
- `@fluentui/react-portal`
  - feat: support rendering to a mountNode from PortalMountNodeContext ([PR #28395](https://github.com/microsoft/fluentui/pull/28395) by olfedias@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: Background appearance context ([PR #28341](https://github.com/microsoft/fluentui/pull/28341) by lingfan.gao@microsoft.com)
  - feat: export PortalMountNodeProvider & usePortalMountNode ([PR #28395](https://github.com/microsoft/fluentui/pull/28395) by olfedias@microsoft.com)
- `@fluentui/react-toast`
  - feat: Initial release ([PR #28399](https://github.com/microsoft/fluentui/pull/28399) by lingfan.gao@microsoft.com)

### Patches

- `@fluentui/react-migration-v8-v9`
  - chore: updates dependencies version ([PR #28366](https://github.com/microsoft/fluentui/pull/28366) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - bugfix: removes default prevention verification on selection ([PR #28365](https://github.com/microsoft/fluentui/pull/28365) by bernardo.sunderhus@gmail.com)
  - chore: adds internal tag on jsdoc for getSlotsNext ([PR #28348](https://github.com/microsoft/fluentui/pull/28348) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-data-grid-react-window`
  - fix: Memoize virtualized renderer ([PR #28372](https://github.com/microsoft/fluentui/pull/28372) by lingfan.gao@microsoft.com)

## [9.23.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.23.1)

Wed, 28 Jun 2023 11:12:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.23.0..@fluentui/react-components_v9.23.1)

### Minor changes

- `@fluentui/react-utilities`
  - feat: creates useSelection hook ([PR #28335](https://github.com/microsoft/fluentui/pull/28335) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-components`
  - chore: exports context creation hooks for the tree ([PR #28344](https://github.com/microsoft/fluentui/pull/28344) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v8-v9`
  - chore: upgrade dependencies version ([PR #28345](https://github.com/microsoft/fluentui/pull/28345) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - uses useSelection from react-utilities instead of local implementation ([PR #28335](https://github.com/microsoft/fluentui/pull/28335) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-tree`
  - chore: export useTreeItemContextValues_unstable ([PR #28344](https://github.com/microsoft/fluentui/pull/28344) by bernardo.sunderhus@gmail.com)

## [9.23.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.23.0)

Tue, 27 Jun 2023 11:21:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.22.1..@fluentui/react-components_v9.23.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Observed element hooks ([PR #28291](https://github.com/microsoft/fluentui/pull/28291) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - feat: Observed element hooks ([PR #28291](https://github.com/microsoft/fluentui/pull/28291) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-components`
  - bugfix: react-tree remove TreeItemAside component ([PR #28318](https://github.com/microsoft/fluentui/pull/28318) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - fix: Calendar uses month-only selection string when only month picker is used ([PR #28301](https://github.com/microsoft/fluentui/pull/28301) by sarah.higley@microsoft.com)

### Changes

- `@fluentui/react-tree`
  - bugfix: makes value property on TreeItem less generic to simplify internals ([PR #28257](https://github.com/microsoft/fluentui/pull/28257) by bernardo.sunderhus@gmail.com)
  - bugfix: rollback to actions and aside as a slot to ensure positioning of internals ([PR #28318](https://github.com/microsoft/fluentui/pull/28318) by bernardo.sunderhus@gmail.com)

## [9.22.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.22.1)

Mon, 26 Jun 2023 09:53:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.22.0..@fluentui/react-components_v9.22.1)

### Patches

- `@fluentui/priority-overflow`
  - fix: remove overflow menu if the last overflowed item can take its place ([PR #28285](https://github.com/microsoft/fluentui/pull/28285) by vkozlova@microsoft.com)
- `@fluentui/react-card`
  - fix: infer a11y id from immediate header element ([PR #28266](https://github.com/microsoft/fluentui/pull/28266) by marcosvmmoura@gmail.com)
- `@fluentui/react-dialog`
  - bugfix: adds grid-template-columns to DialogBody styles to ensure grid template layout ([PR #28272](https://github.com/microsoft/fluentui/pull/28272) by bernardo.sunderhus@gmail.com)
  - bugfix: enables Escape to dismiss alert Dialog ([PR #28276](https://github.com/microsoft/fluentui/pull/28276) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tooltip`
  - fix: added overflowWrap to make sure content does not exceed the tooltip container and added vr test for the same ([PR #28264](https://github.com/microsoft/fluentui/pull/28264) by kakrookaran@gmail.com)
- `@fluentui/react-utilities`
  - fix: add compatibility with shadow ([PR #28307](https://github.com/microsoft/fluentui/pull/28307) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-drawer`
  - docs: improve types descriptions and fix TS circular references ([PR #28282](https://github.com/microsoft/fluentui/pull/28282) by marcosvmmoura@gmail.com)

## [9.22.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.22.0)

Tue, 20 Jun 2023 12:38:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.21.0..@fluentui/react-components_v9.22.0)

### Minor changes

- `@fluentui/priority-overflow`
  - feat: Added support for custom divider ([PR #28011](https://github.com/microsoft/fluentui/pull/28011) by vkozlova@microsoft.com)
- `@fluentui/react-components`
  - feat: Added Overflow divider ([PR #28011](https://github.com/microsoft/fluentui/pull/28011) by vkozlova@microsoft.com)
  - [FEATURE] Imperative scrolling functionality for react-virtualizer ([PR #27864](https://github.com/microsoft/fluentui/pull/27864) by mifraser@microsoft.com)
- `@fluentui/react-conformance`
  - BREAKING CHANGE: migrate package to v9 setup in order to be able to run generate-api task without build ([PR #28215](https://github.com/microsoft/fluentui/pull/28215) by martinhochel@microsoft.com)
- `@fluentui/react-menu`
  - feat: Add slide and fade in animation on open ([PR #28119](https://github.com/microsoft/fluentui/pull/28119) by lingfangao@hotmail.com)
- `@fluentui/react-migration-v8-v9`
  - Add/update theme tokens ([PR #27791](https://github.com/microsoft/fluentui/pull/27791) by miroslav.stastny@microsoft.com)
- `@fluentui/react-popover`
  - feat: Add slide and fade in animation on open ([PR #28119](https://github.com/microsoft/fluentui/pull/28119) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - feat: Implement shared styles for slide animations ([PR #28119](https://github.com/microsoft/fluentui/pull/28119) by lingfangao@hotmail.com)
- `@fluentui/react-table`
  - DataGrid now exposes containerWidthOffset prop, which is mainly used internally to adjust available space for column resizing based on other props ([PR #27983](https://github.com/microsoft/fluentui/pull/27983) by jirivyhnalek@microsoft.com)
  - feat: Implement `focusMode` for DataGridCell ([PR #28167](https://github.com/microsoft/fluentui/pull/28167) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - useArrowNavigationGroup grid-linear axis ([PR #28253](https://github.com/microsoft/fluentui/pull/28253) by jukapsia@microsoft.com)

### Patches

- `@fluentui/react-accordion`
  - chore: update @fluentui/react-icons to 2.0.203  ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-avatar`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
  - fix: Do not render the image when src prop is undefined. ([PR #28146](https://github.com/microsoft/fluentui/pull/28146) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-button`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-combobox`
  - fix: Option's checkIcon adds provided className at the end to avoid overrides. ([PR #28143](https://github.com/microsoft/fluentui/pull/28143) by esteban.230@hotmail.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: Do not move focus to the input on first render. ([PR #28188](https://github.com/microsoft/fluentui/pull/28188) by esteban.230@hotmail.com)
  - feat: Add null to value prop for controlled cases to work correctly. ([PR #28056](https://github.com/microsoft/fluentui/pull/28056) by esteban.230@hotmail.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - bugfix: Ensures dialog actions stretches on breakpoints ([PR #28258](https://github.com/microsoft/fluentui/pull/28258) by bernardo.sunderhus@gmail.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
  - fix: dialog title now takes whole row when there are no actions. This fixes an earlier regresssion. ([PR #28035](https://github.com/microsoft/fluentui/pull/28035) by derdem@microsoft.com)
- `@fluentui/react-field`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: migrate to ts 4.7 which wont emit undefined anymore for optional arguments ([PR #28067](https://github.com/microsoft/fluentui/pull/28067) by martinhochel@microsoft.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-overflow`
  - Added support for custom divider ([PR #28011](https://github.com/microsoft/fluentui/pull/28011) by vkozlova@microsoft.com)
- `@fluentui/react-portal`
  - fix: use `position: absolute` to prevent scroll jumps ([PR #28109](https://github.com/microsoft/fluentui/pull/28109) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: migrate to ts 4.7 which wont emit undefined anymore for optional arguments ([PR #28067](https://github.com/microsoft/fluentui/pull/28067) by martinhochel@microsoft.com)
  - fix: cleanup assignment of initial styles ([PR #28109](https://github.com/microsoft/fluentui/pull/28109) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-select`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-skeleton`
  - fix: Add reduced motion styling for Skeleton ([PR #28086](https://github.com/microsoft/fluentui/pull/28086) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - Update table styles to reflect token changes ([PR #27791](https://github.com/microsoft/fluentui/pull/27791) by miroslav.stastny@microsoft.com)
  - fix: TableHeaderCell should not render button when not sortable ([PR #28097](https://github.com/microsoft/fluentui/pull/28097) by lingfangao@hotmail.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - chore: migrate to ts 4.7 which wont emit undefined anymore for optional arguments ([PR #28067](https://github.com/microsoft/fluentui/pull/28067) by martinhochel@microsoft.com)
- `@fluentui/react-textarea`
  - fix: Remove fixed height so rows prop works and add missing max-height. ([PR #28181](https://github.com/microsoft/fluentui/pull/28181) by esteban.230@hotmail.com)
- `@fluentui/react-utilities`
  - fix: getNativeElementProps should support animation event handlers ([PR #28094](https://github.com/microsoft/fluentui/pull/28094) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-alert`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-data-grid-react-window`
  - Fixed an issue where columns would overflow when resizableColumns is on ([PR #27983](https://github.com/microsoft/fluentui/pull/27983) by jirivyhnalek@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: Create InfoIconLabel component scaffold. ([PR #28200](https://github.com/microsoft/fluentui/pull/28200) by esteban.230@hotmail.com)
  - chore: Create InfoTip component. ([PR #28071](https://github.com/microsoft/fluentui/pull/28071) by esteban.230@hotmail.com)
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
  - chore: Rename InfoTip to InfoIcon to better align with InfoButton. ([PR #28177](https://github.com/microsoft/fluentui/pull/28177) by esteban.230@hotmail.com)
- `@fluentui/react-theme-sass`
  - Add theme tokens ([PR #27791](https://github.com/microsoft/fluentui/pull/27791) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tree`
  - chore: update @fluentui/react-icons to 2.0.203 ([PR #28203](https://github.com/microsoft/fluentui/pull/28203) by ololubek@microsoft.com)
- `@fluentui/react-virtualizer`
  - feature: Add scrollTo index hook and callbacks, isScrolling flag ([PR #27864](https://github.com/microsoft/fluentui/pull/27864) by mifraser@microsoft.com)
  - chore: migrate to ts 4.7 which wont emit undefined anymore for optional arguments ([PR #28067](https://github.com/microsoft/fluentui/pull/28067) by martinhochel@microsoft.com)
- `@fluentui/tokens`
  - Add/update theme tokens ([PR #27791](https://github.com/microsoft/fluentui/pull/27791) by miroslav.stastny@microsoft.com)
  - fix:  cast to String keys interpolated within string literals ([PR #28067](https://github.com/microsoft/fluentui/pull/28067) by martinhochel@microsoft.com)

## [9.21.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.21.0)

Wed, 31 May 2023 06:46:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.20.4..@fluentui/react-components_v9.21.0)

### Minor changes

- `@fluentui/react-combobox`
  - export selection types from combobox ([PR #28054](https://github.com/microsoft/fluentui/pull/28054) by mgodbolt@microsoft.com)
- `@fluentui/react-components`
  - feat: release react-drawer to unstable ([PR #28005](https://github.com/microsoft/fluentui/pull/28005) by marcosvmmoura@gmail.com)
- `@fluentui/react-popover`
  - Add new optional useTransform parameter to allow disabling transform for positioning  ([PR #27929](https://github.com/microsoft/fluentui/pull/27929) by yiliu9@microsoft.com)
- `@fluentui/react-positioning`
  - Add new optional useTransform parameter to allow disabling transform for positioning ([PR #27929](https://github.com/microsoft/fluentui/pull/27929) by yiliu9@microsoft.com)
- `@fluentui/react-table`
  - A column header style now reflects if its being resized by keyboard ([PR #27953](https://github.com/microsoft/fluentui/pull/27953) by jirivyhnalek@microsoft.com)

### Patches

- `@fluentui/react-accordion`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-card`
  - fix: createFocusOutlineStyle cannot work with CSS variables ([PR #27966](https://github.com/microsoft/fluentui/pull/27966) by marcosvmmoura@gmail.com)
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
  - fix: make selected styles have higher priority ([PR #27985](https://github.com/microsoft/fluentui/pull/27985) by marcosvmmoura@gmail.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-components`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
  - fix: Remove focus function from the deps to avoid constant move of focus. ([PR #28053](https://github.com/microsoft/fluentui/pull/28053) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-divider`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-field`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-link`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-migration-v0-v9`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-persona`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-popover`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-portal`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-progress`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-select`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-table`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
  - fix: createFocusOutlineStyle cannot work with CSS variables ([PR #27966](https://github.com/microsoft/fluentui/pull/27966) by marcosvmmoura@gmail.com)
- `@fluentui/react-text`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-toolbar`
  - Fixed a bug where ToolbarDivider default styles were prioritized ([PR #28044](https://github.com/microsoft/fluentui/pull/28044) by jirivyhnalek@microsoft.com)
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-utilities`
  - fix: tweak type errors exposed in ts 4.5 ([PR #27936](https://github.com/microsoft/fluentui/pull/27936) by martinhochel@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-drawer`
  - feat: release react-drawer to unstable ([PR #28005](https://github.com/microsoft/fluentui/pull/28005) by marcosvmmoura@gmail.com)
  - bumps Griffel version to 1.5.7 from 1.5.2 ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
  - chore: move styles to .styles.ts files [react-drawer & react-toast] ([PR #27685](https://github.com/microsoft/fluentui/pull/27685) by olfedias@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-tree`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
- `@fluentui/react-virtualizer`
  - chore: Update Griffel to v1.5.7. ([PR #27925](https://github.com/microsoft/fluentui/pull/27925) by seanmonahan@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27685](https://github.com/microsoft/fluentui/pull/27685) by olfedias@microsoft.com)

## [9.20.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.20.4)

Thu, 25 May 2023 10:00:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.20.3..@fluentui/react-components_v9.20.4)

### Patches

- `@fluentui/react-dialog`
  - chore: fix useDialogTitle ref argument type ([PR #27990](https://github.com/microsoft/fluentui/pull/27990) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - fix(react-utilities): fix dispatcher behavior ([PR #27978](https://github.com/microsoft/fluentui/pull/27978) by olfedias@microsoft.com)

## [9.20.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.20.3)

Wed, 24 May 2023 20:45:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.20.2..@fluentui/react-components_v9.20.3)

### Minor changes

- `@fluentui/react-provider`
  - feat: add style overrides for drawer components ([PR #27582](https://github.com/microsoft/fluentui/pull/27582) by marcosvmmoura@gmail.com)
- `@fluentui/react-shared-contexts`
  - feat: add style overrides for drawer components ([PR #27582](https://github.com/microsoft/fluentui/pull/27582) by marcosvmmoura@gmail.com)
- `@fluentui/react-spinner`
  - feat: added delay prop to spinner ([PR #27852](https://github.com/microsoft/fluentui/pull/27852) by kakrookaran@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: ensures AccordionHeader expandIcon supports null ([PR #27912](https://github.com/microsoft/fluentui/pull/27912) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - fix: Only apply aria-owns when popup is open. ([PR #27989](https://github.com/microsoft/fluentui/pull/27989) by esteban.230@hotmail.com)
  - fix: DatePicker now focuses on today's date and works inside dialogs as expected. ([PR #27731](https://github.com/microsoft/fluentui/pull/27731) by esteban.230@hotmail.com)
- `@fluentui/react-divider`
  - bugfix: wrapper slot type to NonNullable ([PR #27928](https://github.com/microsoft/fluentui/pull/27928) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-migration-v0-v9`
  - feat(react-v0-v9-migration): Initial release ([PR #27909](https://github.com/microsoft/fluentui/pull/27909) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - fix: preventDefault when closing the popover surface to avoid closing parent dialogs. ([PR #27832](https://github.com/microsoft/fluentui/pull/27832) by esteban.230@hotmail.com)
- `@fluentui/react-textarea`
  - fix: Move disabled styles in textarea selector to the textarea styles. ([PR #27920](https://github.com/microsoft/fluentui/pull/27920) by esteban.230@hotmail.com)
- `@fluentui/react-toolbar`
  - packages/react-components/react-toolbar/src/components/ToolbarToggleButton/useToolbarToggleButton.ts ([PR #27796](https://github.com/microsoft/fluentui/pull/27796) by lingfangao@hotmail.com)

## [9.20.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.20.2)

Thu, 18 May 2023 13:11:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.20.1..@fluentui/react-components_v9.20.2)

### Patches

- `@fluentui/react-tabster`
  - chore: upgrade tabster to v4.4.0 ([PR #27540](https://github.com/microsoft/fluentui/pull/27540) by bernardo.sunderhus@gmail.com)

## [9.20.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.20.1)

Thu, 18 May 2023 00:39:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.20.0..@fluentui/react-components_v9.20.1)

### Minor changes

- `@fluentui/react-utilities`
  - feat: Implement a priority queue ([PR #27848](https://github.com/microsoft/fluentui/pull/27848) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-components`
  - chore: exports TreeItemAside unstable ([PR #27856](https://github.com/microsoft/fluentui/pull/27856) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - bugfix: removes unnecessary grid gaps ([PR #27845](https://github.com/microsoft/fluentui/pull/27845) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-textarea`
  - fix: When Textarea is disabled, make the text gray and add an outline for the filled appearance. ([PR #27837](https://github.com/microsoft/fluentui/pull/27837) by esteban.230@hotmail.com)

### Changes

- `@fluentui/react-infobutton`
  - fix: Add aria-owns to InfoLabel. ([PR #27834](https://github.com/microsoft/fluentui/pull/27834) by esteban.230@hotmail.com)

## [9.20.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.20.0)

Fri, 12 May 2023 20:27:14 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.19.1..@fluentui/react-components_v9.20.0)

### Minor changes

- `@fluentui/react-provider`
  - feat: add style overrides for drawer components ([PR #27581](https://github.com/microsoft/fluentui/pull/27581) by marcosvmmoura@gmail.com)
- `@fluentui/react-shared-contexts`
  - feat: add style overrides for drawer components ([PR #27581](https://github.com/microsoft/fluentui/pull/27581) by marcosvmmoura@gmail.com)
  - Updated to provide single hook for noop tree-shaking ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: Releasing react-skeleton to stable. ([PR #27767](https://github.com/microsoft/fluentui/pull/27767) by ololubek@microsoft.com)
- `@fluentui/react-tabster`
  - fix: move `outlineStyle: none` out of createCustomFocusIndicatorStyle and to createFocusOutlineStyle ([PR #26089](https://github.com/microsoft/fluentui/pull/26089) by sarah.higley@microsoft.com)
- `@fluentui/react-avatar`
  - feat: add `shape` to AvatarContext ([PR #27738](https://github.com/microsoft/fluentui/pull/27738) by yuanboxue@microsoft.com)
- `@fluentui/react-combobox`
  - feat: allow space character insertion while typing in freeform combobox ([PR #27025](https://github.com/microsoft/fluentui/pull/27025) by sarah.higley@microsoft.com)
- `@fluentui/react-components`
  - feat: added useOverflowCount to react-components exports ([PR #27678](https://github.com/microsoft/fluentui/pull/27678) by kakrookaran@gmail.com)
  - chore: Releasing react-skeleton to stable. ([PR #27767](https://github.com/microsoft/fluentui/pull/27767) by ololubek@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - fix: Make onValidationError onValidationResult so the error is updated when there's no longer an error. ([PR #27655](https://github.com/microsoft/fluentui/pull/27655) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-dialog`
  - bugfix: change DialogTitle default action icon from 24x24 to 20x20 ([PR #27815](https://github.com/microsoft/fluentui/pull/27815) by bernardo.sunderhus@gmail.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-divider`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-field`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27707](https://github.com/microsoft/fluentui/pull/27707) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-input`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - fix: update createCustomFocusIndicator usage to specify outline: none ([PR #26089](https://github.com/microsoft/fluentui/pull/26089) by sarah.higley@microsoft.com)
- `@fluentui/react-menu`
  - fix: Menu should not steal focus on re-render ([PR #27688](https://github.com/microsoft/fluentui/pull/27688) by lingfangao@hotmail.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - refactor: Consolidate all overflow state into one object ([PR #27756](https://github.com/microsoft/fluentui/pull/27756) by lingfangao@hotmail.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-persona`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - fix: Class ID detection compatible with React 18 ([PR #27577](https://github.com/microsoft/fluentui/pull/27577) by hanj@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-provider`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27707](https://github.com/microsoft/fluentui/pull/27707) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-theme`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: ToolbarToggleButton should not follow Toolbar size ([PR #27797](https://github.com/microsoft/fluentui/pull/27797) by lingfangao@hotmail.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-utilities`
  - feat: defers useControllableState state to initializer method ([PR #27717](https://github.com/microsoft/fluentui/pull/27717) by bernardo.sunderhus@gmail.com)
  - chore: updates useControllableState comments ([PR #27754](https://github.com/microsoft/fluentui/pull/27754) by bernardo.sunderhus@gmail.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: simplifies useControllableState hook internals ([PR #27702](https://github.com/microsoft/fluentui/pull/27702) by bernardo.sunderhus@gmail.com)
- `@fluentui/keyboard-keys`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/priority-overflow`
  - fix: overflowManager should always dispatch initial state ([PR #27756](https://github.com/microsoft/fluentui/pull/27756) by lingfangao@hotmail.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-accordion`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-aria`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - fix: Make AvatarGroup's content direction column. ([PR #27743](https://github.com/microsoft/fluentui/pull/27743) by esteban.230@hotmail.com)
  - fix: update createCustomFocusIndicator usage to specify outline: none ([PR #26089](https://github.com/microsoft/fluentui/pull/26089) by sarah.higley@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - fix: Make border around badge transparent, not a solid color ([PR #27527](https://github.com/microsoft/fluentui/pull/27527) by behowell@microsoft.com)
- `@fluentui/react-badge`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - fix: Remove white border around presence badge when on a dark background ([PR #27780](https://github.com/microsoft/fluentui/pull/27780) by behowell@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27707](https://github.com/microsoft/fluentui/pull/27707) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27708](https://github.com/microsoft/fluentui/pull/27708) by olfedias@microsoft.com)
  - Update to use single hook selector ([PR #27491](https://github.com/microsoft/fluentui/pull/27491) by gcox@microsoft.com)
- `@fluentui/react-components`
  - feature: Add dynamically sized virtualizer scroll view ([PR #27298](https://github.com/microsoft/fluentui/pull/27298) by mifraser@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-context-selector`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-datepicker-compat`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: update version ([PR #27666](https://github.com/microsoft/fluentui/pull/27666) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-infobutton`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27710](https://github.com/microsoft/fluentui/pull/27710) by olfedias@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: remove now-unnecessary enableOutline in createCustomFocusIndicator ([PR #26089](https://github.com/microsoft/fluentui/pull/26089) by sarah.higley@microsoft.com)
- `@fluentui/react-theme-sass`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-tree`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - feat: TreeItem itemType restructure ([PR #27799](https://github.com/microsoft/fluentui/pull/27799) by bernardo.sunderhus@gmail.com)
  - feat: creates TreeItemAside component ([PR #27701](https://github.com/microsoft/fluentui/pull/27701) by bernardo.sunderhus@gmail.com)
  - feat: makes useFlatTree generic ([PR #27682](https://github.com/microsoft/fluentui/pull/27682) by bernardo.sunderhus@gmail.com)
  - chore: updates useOpenItemsState internals ([PR #27697](https://github.com/microsoft/fluentui/pull/27697) by bernardo.sunderhus@gmail.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - feat: adds lazy loading story ([PR #27587](https://github.com/microsoft/fluentui/pull/27587) by bernardo.sunderhus@gmail.com)
  - bugfix: fix horizontal overflow on tree ([PR #27825](https://github.com/microsoft/fluentui/pull/27825) by bernardo.sunderhus@gmail.com)
  - bugfix: fix VisibleFlatTreeItemGenerator omitting visible items ([PR #27802](https://github.com/microsoft/fluentui/pull/27802) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - feature: Add dynamically sized virtualizer scroll view ([PR #27298](https://github.com/microsoft/fluentui/pull/27298) by mifraser@microsoft.com)
- `@fluentui/tokens`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/babel-preset-global-context`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/global-context`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-alert`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)
- `@fluentui/react-data-grid-react-window`
  - chore: move makeStyles() calls to .styles.ts files ([PR #27698](https://github.com/microsoft/fluentui/pull/27698) by olfedias@microsoft.com)
  - chore: exclude .swcrc from being published ([PR #27740](https://github.com/microsoft/fluentui/pull/27740) by olfedias@microsoft.com)

## [9.19.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.19.1)

Mon, 24 Apr 2023 08:12:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.19.0..@fluentui/react-components_v9.19.1)

### Minor changes

- `@fluentui/react-datepicker-compat`
  - feat: Add error handling to DatePicker. ([PR #27637](https://github.com/microsoft/fluentui/pull/27637) by esteban.230@hotmail.com)
  - feat: Move DatePicker compat to stable. ([PR #27378](https://github.com/microsoft/fluentui/pull/27378) by esteban.230@hotmail.com)
  - feat: Refactor DatePicker to remove Field and error handling logic. ([PR #27509](https://github.com/microsoft/fluentui/pull/27509) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-accordion`
  - feat: adopt custom JSX pragma ([PR #27601](https://github.com/microsoft/fluentui/pull/27601) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - chore: adopt custom JSX pragma ([PR #27602](https://github.com/microsoft/fluentui/pull/27602) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - chore: adopt custom JSX pragma ([PR #27603](https://github.com/microsoft/fluentui/pull/27603) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - chore: adopt custom JSX pragma ([PR #27605](https://github.com/microsoft/fluentui/pull/27605) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-card`
  - chore: adopt custom JSX pragma ([PR #27606](https://github.com/microsoft/fluentui/pull/27606) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-checkbox`
  - chore: adopt custom JSX pragma ([PR #27607](https://github.com/microsoft/fluentui/pull/27607) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-combobox`
  - chore: adopt custom JSX pragma ([PR #27608](https://github.com/microsoft/fluentui/pull/27608) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - removes TreeItemId type from react-tree ([PR #27532](https://github.com/microsoft/fluentui/pull/27532) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - chore: adopt custom JSX pragma ([PR #27609](https://github.com/microsoft/fluentui/pull/27609) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - bugfix: DialogTitle root as h2 by default ([PR #27555](https://github.com/microsoft/fluentui/pull/27555) by bernardo.sunderhus@gmail.com)
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
  - chore: hoist tabster modal attributes to Dialog component ([PR #27541](https://github.com/microsoft/fluentui/pull/27541) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-divider`
  - chore: adopt custom JSX pragma ([PR #27610](https://github.com/microsoft/fluentui/pull/27610) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - chore: adopt custom JSX pragma ([PR #27612](https://github.com/microsoft/fluentui/pull/27612) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-image`
  - chore: adopt custom JSX pragma ([PR #27613](https://github.com/microsoft/fluentui/pull/27613) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-input`
  - chore: adopt custom JSX pragma ([PR #27614](https://github.com/microsoft/fluentui/pull/27614) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-label`
  - chore: adopt custom JSX pragma ([PR #27616](https://github.com/microsoft/fluentui/pull/27616) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-link`
  - chore: adopt custom JSX pragma ([PR #27620](https://github.com/microsoft/fluentui/pull/27620) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-persona`
  - chore: adopt custom JSX pragma ([PR #27619](https://github.com/microsoft/fluentui/pull/27619) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - bugfix: ensure legacyTrapFocus works properly ([PR #27574](https://github.com/microsoft/fluentui/pull/27574) by bernardo.sunderhus@gmail.com)
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-progress`
  - chore: adopt custom JSX pragma ([PR #27617](https://github.com/microsoft/fluentui/pull/27617) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-provider`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - chore: adopt custom JSX pragma ([PR #27618](https://github.com/microsoft/fluentui/pull/27618) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-select`
  - chore: adopt custom JSX pragma ([PR #27621](https://github.com/microsoft/fluentui/pull/27621) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-slider`
  - chore: adopt custom JSX pragma ([PR #27624](https://github.com/microsoft/fluentui/pull/27624) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: adopt custom JSX pragma ([PR #27625](https://github.com/microsoft/fluentui/pull/27625) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinner`
  - chore: adopt custom JSX pragma ([PR #27622](https://github.com/microsoft/fluentui/pull/27622) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-switch`
  - chore: adopt custom JSX pragma ([PR #27627](https://github.com/microsoft/fluentui/pull/27627) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-table`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tabs`
  - chore: adopts custom JSX pragma ([PR #27640](https://github.com/microsoft/fluentui/pull/27640) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-text`
  - chore: adopt custom JSX pragma ([PR #27626](https://github.com/microsoft/fluentui/pull/27626) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-textarea`
  - chore: adopt custom JSX pragma ([PR #27631](https://github.com/microsoft/fluentui/pull/27631) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-toolbar`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tooltip`
  - chore: adopt custom JSX pragma ([PR #27630](https://github.com/microsoft/fluentui/pull/27630) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-alert`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-data-grid-react-window`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-infobutton`
  - chore: adopt custom JSX pragma ([PR #27615](https://github.com/microsoft/fluentui/pull/27615) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-jsx-runtime`
  - chore: simplify createElement method ([PR #27573](https://github.com/microsoft/fluentui/pull/27573) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-skeleton`
  - chore: adopt custom JSX pragma ([PR #27623](https://github.com/microsoft/fluentui/pull/27623) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tree`
  - bugfix: remove caret from react-jsx-runtime prerelease dependency ([PR #27588](https://github.com/microsoft/fluentui/pull/27588) by bernardo.sunderhus@gmail.com)
  - bugfix: fix parent navigation after independency from id ([PR #27642](https://github.com/microsoft/fluentui/pull/27642) by bernardo.sunderhus@gmail.com)
  - feat: value property over id ([PR #27532](https://github.com/microsoft/fluentui/pull/27532) by bernardo.sunderhus@gmail.com)
  - chore: restructure stories, add separate category for flat tree ([PR #27586](https://github.com/microsoft/fluentui/pull/27586) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - chore: adopt custom JSX pragma ([PR #27629](https://github.com/microsoft/fluentui/pull/27629) by bernardo.sunderhus@gmail.com)

## [9.19.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.19.0)

Mon, 17 Apr 2023 17:53:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.9..@fluentui/react-components_v9.19.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Release Field component as stable ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-field`
  - feat: Release Field component as stable ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-utilities`
  - feat: ensure compatibility with custom JSX pragma ([PR #27472](https://github.com/microsoft/fluentui/pull/27472) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-avatar`
  - fix: Correct Avatar's active-inactive transition animation curve ([PR #27537](https://github.com/microsoft/fluentui/pull/27537) by behowell@microsoft.com)
- `@fluentui/react-card`
  - fix: add support for Windows High Contrast Mode ([PR #27556](https://github.com/microsoft/fluentui/pull/27556) by marcosvmmoura@gmail.com)
- `@fluentui/react-checkbox`
  - chore: Remove deprecated CheckboxField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Remove deprecated ComboboxField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-components`
  - chore(react-components/unstable): Remove deprecated InputField, etc. shim components ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Remove the use of ContextSelector in RadioGroupContext ([PR #27476](https://github.com/microsoft/fluentui/pull/27476) by behowell@microsoft.com)
- `@fluentui/react-dialog`
  - chore: adopts custom JSX pragma ([PR #27475](https://github.com/microsoft/fluentui/pull/27475) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - chore: Remove utilities for deprecated shim InputField, etc. components ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
- `@fluentui/react-input`
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
  - chore: Remove deprecated InputField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - chore: adopt custom JSX pragma ([PR #27544](https://github.com/microsoft/fluentui/pull/27544) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - feat: adopt custom JSX pragma ([PR #27546](https://github.com/microsoft/fluentui/pull/27546) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-progress`
  - chore: Remove deprecated ProgressField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-provider`
  - feat: adopt custom JSX pragma ([PR #27547](https://github.com/microsoft/fluentui/pull/27547) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
  - chore: Remove deprecated RadioGroupField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Remove the use of ContextSelector in RadioGroupContext ([PR #27476](https://github.com/microsoft/fluentui/pull/27476) by behowell@microsoft.com)
- `@fluentui/react-select`
  - chore: Remove deprecated SelectField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-slider`
  - chore: Remove deprecated SliderField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
  - chore: Remove deprecated SpinButtonField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
- `@fluentui/react-switch`
  - chore: Remove deprecated SwitchField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-table`
  - chore: adopt custom JSX pragma ([PR #27543](https://github.com/microsoft/fluentui/pull/27543) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-textarea`
  - chore: Remove deprecated TextareaField_unstable shim component ([PR #27492](https://github.com/microsoft/fluentui/pull/27492) by behowell@microsoft.com)
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: adopt custom JSX pragma ([PR #27548](https://github.com/microsoft/fluentui/pull/27548) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - fix: Fix slot render functions ([PR #27561](https://github.com/microsoft/fluentui/pull/27561) by behowell@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: adopt custom JSX pragma ([PR #27550](https://github.com/microsoft/fluentui/pull/27550) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-data-grid-react-window`
  - chore: adopt custom JSX pragma ([PR #27552](https://github.com/microsoft/fluentui/pull/27552) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-datepicker-compat`
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-jsx-runtime`
  - feat: implements custom JSX pragma ([PR #27472](https://github.com/microsoft/fluentui/pull/27472) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-skeleton`
  - chore: Update react-field dependency version ([PR #27493](https://github.com/microsoft/fluentui/pull/27493) by behowell@microsoft.com)
- `@fluentui/react-theme-sass`
  - fix: add "style" to exports field ([PR #27274](https://github.com/microsoft/fluentui/pull/27274) by olfedias@microsoft.com)
- `@fluentui/react-tree`
  - chore: adopt custom jsx pragma ([PR #27542](https://github.com/microsoft/fluentui/pull/27542) by bernardo.sunderhus@gmail.com)

## [9.18.9](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.9)

Wed, 12 Apr 2023 09:31:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.8..@fluentui/react-components_v9.18.9)

### Patches

- `@fluentui/react-badge`
  - fix(react-badge): Use min-width: max-content on Badge to prevent shrinking smaller than content ([PR #27489](https://github.com/microsoft/fluentui/pull/27489) by behowell@microsoft.com)
- `@fluentui/react-combobox`
  - fix: popup now defines fallbackPositions to use when it doesn't fit the screen ([PR #27521](https://github.com/microsoft/fluentui/pull/27521) by sarah.higley@microsoft.com)
- `@fluentui/react-dialog`
  - fix: use tabster to focus on trigger, instead of manually invoking .focus ([PR #27512](https://github.com/microsoft/fluentui/pull/27512) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - fix: Have RadioGroup forward aria-describedby to each of the Radio items inside ([PR #27456](https://github.com/microsoft/fluentui/pull/27456) by behowell@microsoft.com)
- `@fluentui/react-tabs`
  - added aria-orientation attribute ([PR #27315](https://github.com/microsoft/fluentui/pull/27315) by kakrookaran@gmail.com)
- `@fluentui/react-utilities`
  - fix(hooks): cleanup event listeners only when "disabled" is false ([PR #27516](https://github.com/microsoft/fluentui/pull/27516) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-datepicker-compat`
  - feat: Make package public. ([PR #27524](https://github.com/microsoft/fluentui/pull/27524) by esteban.230@hotmail.com)
- `@fluentui/react-field`
  - fix: Make contextValues argument required on renderField_unstable ([PR #27436](https://github.com/microsoft/fluentui/pull/27436) by behowell@microsoft.com)

## [9.18.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.8)

Fri, 07 Apr 2023 00:01:35 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.7..@fluentui/react-components_v9.18.8)

### Minor changes

- `@fluentui/react-dialog`
  - feat: removes aria-expanded from DialogTrigger ([PR #27372](https://github.com/microsoft/fluentui/pull/27372) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-checkbox`
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
- `@fluentui/react-components`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Export hooks for FieldContext ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
- `@fluentui/react-input`
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-portal-compat`
  - fix: React 18 support in typings ([PR #27439](https://github.com/microsoft/fluentui/pull/27439) by miroslav.stastny@microsoft.com)
- `@fluentui/react-progress`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
- `@fluentui/react-radio`
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-select`
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-slider`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
- `@fluentui/react-spinbutton`
  - added width 100% to input of spin button ([PR #27421](https://github.com/microsoft/fluentui/pull/27421) by kakrookaran@gmail.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
- `@fluentui/react-switch`
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-tabs`
  - fix: Merged onClick callbacks in Tab ([PR #27477](https://github.com/microsoft/fluentui/pull/27477) by gcox@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
  - chore: Hook up FieldContext for use inside a Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)

### Changes

- `@fluentui/react-field`
  - feat: Add FieldContext to pass props to controls inside Field ([PR #27399](https://github.com/microsoft/fluentui/pull/27399) by behowell@microsoft.com)
  - chore: Bump react-field version to beta ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)
- `@fluentui/react-skeleton`
  - chore: Update package version of react-field ([PR #27458](https://github.com/microsoft/fluentui/pull/27458) by behowell@microsoft.com)

## [9.18.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.7)

Tue, 04 Apr 2023 18:44:47 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.6..@fluentui/react-components_v9.18.7)

### Patches

- `@fluentui/react-checkbox`
  - fix: Fix vertical alignment of inline Checkbox when checked vs. unchecked ([PR #27324](https://github.com/microsoft/fluentui/pull/27324) by behowell@microsoft.com)
- `@fluentui/react-combobox`
  - fix: make Option's checkIcon slot render conditionally ([PR #27409](https://github.com/microsoft/fluentui/pull/27409) by seanmonahan@microsoft.com)
- `@fluentui/react-dialog`
  - fix: DialogContent scrollbar always visible ([PR #27367](https://github.com/microsoft/fluentui/pull/27367) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - fix: Menu should not steal focus on close ([PR #27414](https://github.com/microsoft/fluentui/pull/27414) by lingfangao@hotmail.com)
- `@fluentui/react-overflow`
  - fix: overflow item style should be applied when overflow items are nested in wrapper elements ([PR #27402](https://github.com/microsoft/fluentui/pull/27402) by vkozlova@microsoft.com)
- `@fluentui/react-utilities`
  - bugfix: increments SlotRenderFunction signature to include children ([PR #27377](https://github.com/microsoft/fluentui/pull/27377) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-infobutton`
  - chore: Rename content slot to info. ([PR #27316](https://github.com/microsoft/fluentui/pull/27316) by esteban.230@hotmail.com)
- `@fluentui/react-tree`
  - chore: adds e2e flat tree tests ([PR #27318](https://github.com/microsoft/fluentui/pull/27318) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-virtualizer`
  - fix: remove disallowed v9 react-fabric/v8 from dependency to mitigate dep-tree creep ([PR #27334](https://github.com/microsoft/fluentui/pull/27334) by martinhochel@microsoft.com)

## [9.18.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.6)

Fri, 24 Mar 2023 17:36:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.5..@fluentui/react-components_v9.18.6)

### Patches

- `@fluentui/react-components`
  - Bump react-select to 9.1.6 ([PR #27321](https://github.com/microsoft/fluentui/pull/27321) by lingfangao@hotmail.com)

## [9.18.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.5)

Fri, 24 Mar 2023 14:58:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.4..@fluentui/react-components_v9.18.5)

### Patches

- `@fluentui/react-components`
  - fix: Bump @fluenti/react-combobox to 9.2.6 ([PR #27319](https://github.com/microsoft/fluentui/pull/27319) by lingfangao@hotmail.com)

## [9.18.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.4)

Fri, 24 Mar 2023 10:15:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.3..@fluentui/react-components_v9.18.4)

### Minor changes

- `@fluentui/react-provider`
  - feat: Render theme CSS variables in SSR style element ([PR #27277](https://github.com/microsoft/fluentui/pull/27277) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-components`
  - feat: Add static measurement hooks and embedded scroll option to react-virtualizer ([PR #26985](https://github.com/microsoft/fluentui/pull/26985) by mifraser@microsoft.com)

### Changes

- `@fluentui/react-tree`
  - tree stories and doc update ([PR #27270](https://github.com/microsoft/fluentui/pull/27270) by petrduda@microsoft.com)
- `@fluentui/react-virtualizer`
  - [feat] Add static measurement hooks and embedded scroll option ([PR #26985](https://github.com/microsoft/fluentui/pull/26985) by mifraser@microsoft.com)

## [9.18.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.3)

Tue, 21 Mar 2023 21:22:58 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.2..@fluentui/react-components_v9.18.3)

### Patches

- `@fluentui/react-shared-contexts`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-slider`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-spinner`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-switch`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - fix: Make checked switch more visible in high contrast mode ([PR #27257](https://github.com/microsoft/fluentui/pull/27257) by lingfangao@hotmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-table`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-tabs`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-tabster`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-text`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-textarea`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-theme`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-toolbar`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-tooltip`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-utilities`
  - chore: exports isHTMLElement as public ([PR #27178](https://github.com/microsoft/fluentui/pull/27178) by bernardo.sunderhus@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/keyboard-keys`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/priority-overflow`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-accordion`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-aria`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-avatar`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-badge`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: Adding the correct icons to away+out-of-office PresenceBadges and adding the correct icons to use in large PresenceBadges. ([PR #27253](https://github.com/microsoft/fluentui/pull/27253) by makotom@microsoft.com)
- `@fluentui/react-button`
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-card`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-checkbox`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-combobox`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-components`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-context-selector`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-dialog`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix(DialogTitle): adds type="button" to close action ([PR #27247](https://github.com/microsoft/fluentui/pull/27247) by bernardo.sunderhus@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-divider`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-image`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-input`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-label`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-link`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-menu`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix(MenuItem): Disabled should render correctly in high contrast mode ([PR #27258](https://github.com/microsoft/fluentui/pull/27258) by lingfangao@hotmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
- `@fluentui/react-overflow`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-persona`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-popover`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-portal`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-portal-compat`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-portal-compat-context`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-positioning`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-progress`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-provider`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-radio`
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-select`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)

### Changes

- `@fluentui/react-skeleton`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-theme-sass`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-tree`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by olfedias@microsoft.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: adds initial e2e cypress tests ([PR #27266](https://github.com/microsoft/fluentui/pull/27266) by email not defined)
- `@fluentui/react-virtualizer`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/tokens`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/babel-preset-global-context`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/global-context`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-alert`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-conformance-griffel`
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-data-grid-react-window`
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
- `@fluentui/react-field`
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
- `@fluentui/react-infobutton`
  - chore: Bumping version of @fluentui/react-icons to ^2.0.196. ([PR #27100](https://github.com/microsoft/fluentui/pull/27100) by makotom@microsoft.com)
  - fix: add node field to package.json exports map. ([PR #27154](https://github.com/microsoft/fluentui/pull/27154) by tristan.watanabe@gmail.com)
  - chore: migrate to swc transpilation approach. ([PR #27250](https://github.com/microsoft/fluentui/pull/27250) by tristan.watanabe@gmail.com)

## [9.18.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.2)

Thu, 16 Mar 2023 14:36:56 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.1..@fluentui/react-components_v9.18.2)

### Minor changes

- `@fluentui/react-dialog`
  - feat(DialogActions): Implment `fluid` prop ([PR #27229](https://github.com/microsoft/fluentui/pull/27229) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - feat: add options to useFocusVisible() hook ([PR #27198](https://github.com/microsoft/fluentui/pull/27198) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-components`
  - chore: Export InfoLabel from react-components/unstable ([PR #27118](https://github.com/microsoft/fluentui/pull/27118) by behowell@microsoft.com)
- `@fluentui/react-dialog`
  - fix(DialogBody): Remove `maxWidth` style ([PR #27230](https://github.com/microsoft/fluentui/pull/27230) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - fix: pass proper document instance to useFocusVisible() ([PR #27198](https://github.com/microsoft/fluentui/pull/27198) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - fix(getSlots): stops slotProps.slot to be typed as never ([PR #27231](https://github.com/microsoft/fluentui/pull/27231) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-infobutton`
  - feat: Add InfoLabel component ([PR #27118](https://github.com/microsoft/fluentui/pull/27118) by behowell@microsoft.com)

## [9.18.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.1)

Wed, 15 Mar 2023 10:19:50 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.18.0..@fluentui/react-components_v9.18.1)

### Minor changes

- `@fluentui/react-image`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27066](https://github.com/microsoft/fluentui/pull/27066) by gcox@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - feat: Add colorNeutralBackgroundAlpha and colorNeutralStrokeAlpha tokens ([PR #27034](https://github.com/microsoft/fluentui/pull/27034) by miroslav.stastny@microsoft.com)
- `@fluentui/react-portal`
  - feat: accept a className in mountNode in Portal ([PR #27008](https://github.com/microsoft/fluentui/pull/27008) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - Added support for keyboard navigation in Table/DataGrid ([PR #26956](https://github.com/microsoft/fluentui/pull/26956) by jirivyhnalek@microsoft.com)
- `@fluentui/react-text`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27078](https://github.com/microsoft/fluentui/pull/27078) by gcox@microsoft.com)

### Patches

- `@fluentui/react-card`
  - docs: improve readme description ([PR #27181](https://github.com/microsoft/fluentui/pull/27181) by marcosvmmoura@gmail.com)
- `@fluentui/react-progress`
  - fix: Smooth out animation of indeterminate progress bar ([PR #27201](https://github.com/microsoft/fluentui/pull/27201) by behowell@microsoft.com)

### Changes

- `@fluentui/react-theme-sass`
  - feat(tokens): Add colorNeutralBackgroundAlpha and colorNeutralStrokeAlpha tokens ([PR #27034](https://github.com/microsoft/fluentui/pull/27034) by miroslav.stastny@microsoft.com)
- `@fluentui/tokens`
  - feat(tokens): Add colorNeutralBackgroundAlpha and colorNeutralStrokeAlpha tokens ([PR #27034](https://github.com/microsoft/fluentui/pull/27034) by miroslav.stastny@microsoft.com)

## [9.18.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.18.0)

Mon, 13 Mar 2023 08:58:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.17.1..@fluentui/react-components_v9.18.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Release Card as stable ([PR #27111](https://github.com/microsoft/fluentui/pull/27111) by marcosvmmoura@gmail.com)
- `@fluentui/react-utilities`
  - feat: isHTMLElement to support all HTMLElement classes ([PR #27161](https://github.com/microsoft/fluentui/pull/27161) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-card`
  - feat: release 9.0.0 ([PR #27111](https://github.com/microsoft/fluentui/pull/27111) by marcosvmmoura@gmail.com)
- `@fluentui/react-components`
  - feat: release react-skeleton to unstable ([PR #27150](https://github.com/microsoft/fluentui/pull/27150) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - fix: stops using instaceof in favor of isHTMLElement ([PR #27161](https://github.com/microsoft/fluentui/pull/27161) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - fix: stops using instaceof in favor of isHTMLElement ([PR #27161](https://github.com/microsoft/fluentui/pull/27161) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-radio`
  - fix: stops using instaceof in favor of isHTMLElement ([PR #27161](https://github.com/microsoft/fluentui/pull/27161) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-skeleton`
  - feat: release react-skeleton to unstable ([PR #27150](https://github.com/microsoft/fluentui/pull/27150) by ololubek@microsoft.com)

## [9.17.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.17.1)

Fri, 10 Mar 2023 13:28:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.17.0..@fluentui/react-components_v9.17.1)

### Changes

- `@fluentui/react-tree`
  - feat: creates useFlatTree hook to improve API ([PR #27146](https://github.com/microsoft/fluentui/pull/27146) by bernardo.sunderhus@gmail.com)

## [9.17.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.17.0)

Fri, 10 Mar 2023 07:13:59 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.16.0..@fluentui/react-components_v9.17.0)

### Minor changes

- `@fluentui/react-components`
  - release @fluentui/react-tree unstable ([PR #27126](https://github.com/microsoft/fluentui/pull/27126) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27081](https://github.com/microsoft/fluentui/pull/27081) by gcox@microsoft.com)

### Patches

- `@fluentui/react-positioning`
  - fix: Export `pinned` prop from `PositioningProps` ([PR #27157](https://github.com/microsoft/fluentui/pull/27157) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - fix: ResolveShorthandOptions type to better reflect implementation ([PR #27112](https://github.com/microsoft/fluentui/pull/27112) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-tree`
  - release @fluentui/react-tree unstable ([PR #27126](https://github.com/microsoft/fluentui/pull/27126) by bernardo.sunderhus@gmail.com)

## [9.16.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.16.0)

Wed, 08 Mar 2023 17:42:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.6..@fluentui/react-components_v9.16.0)

### Minor changes

- `@fluentui/react-accordion`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27059](https://github.com/microsoft/fluentui/pull/27059) by gcox@microsoft.com)
- `@fluentui/react-avatar`
  - feat: Adding call to custom styles hook derived from context. ([PR #27060](https://github.com/microsoft/fluentui/pull/27060) by gcox@microsoft.com)
- `@fluentui/react-badge`
  - feat: Adding calls to custom styles hooks derived from context. ([PR #27061](https://github.com/microsoft/fluentui/pull/27061) by gcox@microsoft.com)
- `@fluentui/react-button`
  - feat: Added custom style hook call ([PR #26943](https://github.com/microsoft/fluentui/pull/26943) by gcox@microsoft.com)
- `@fluentui/react-checkbox`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27062](https://github.com/microsoft/fluentui/pull/27062) by gcox@microsoft.com)
- `@fluentui/react-combobox`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27063](https://github.com/microsoft/fluentui/pull/27063) by gcox@microsoft.com)
- `@fluentui/react-components`
  - feat: Added CustomStyleHooks types and context ([PR #26943](https://github.com/microsoft/fluentui/pull/26943) by gcox@microsoft.com)
- `@fluentui/react-dialog`
  - feature: introduces innerTrapFocus ([PR #26942](https://github.com/microsoft/fluentui/pull/26942) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-divider`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27064](https://github.com/microsoft/fluentui/pull/27064) by gcox@microsoft.com)
- `@fluentui/react-input`
  - feat: custom styles ([PR #27065](https://github.com/microsoft/fluentui/pull/27065) by gcox@microsoft.com)
- `@fluentui/react-label`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27067](https://github.com/microsoft/fluentui/pull/27067) by gcox@microsoft.com)
- `@fluentui/react-menu`
  - feat: Implements `fallback` positioning option ([PR #26980](https://github.com/microsoft/fluentui/pull/26980) by lingfangao@hotmail.com)
  - feat: add `mountNode` prop to `Menu` ([PR #27007](https://github.com/microsoft/fluentui/pull/27007) by olfedias@microsoft.com)
  - feat: custom styles ([PR #27068](https://github.com/microsoft/fluentui/pull/27068) by gcox@microsoft.com)
- `@fluentui/react-persona`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27069](https://github.com/microsoft/fluentui/pull/27069) by gcox@microsoft.com)
- `@fluentui/react-popover`
  - feat: custom styles ([PR #27070](https://github.com/microsoft/fluentui/pull/27070) by gcox@microsoft.com)
  - feature: introduces innerTrapFocus and deprecates legacyTrapFocus ([PR #26942](https://github.com/microsoft/fluentui/pull/26942) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-progress`
  - feat: custom styles ([PR #27082](https://github.com/microsoft/fluentui/pull/27082) by gcox@microsoft.com)
- `@fluentui/react-provider`
  - feat: Added customstylehooks property ([PR #26943](https://github.com/microsoft/fluentui/pull/26943) by gcox@microsoft.com)
- `@fluentui/react-radio`
  - feat: custom styles ([PR #27071](https://github.com/microsoft/fluentui/pull/27071) by gcox@microsoft.com)
- `@fluentui/react-select`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27072](https://github.com/microsoft/fluentui/pull/27072) by gcox@microsoft.com)
- `@fluentui/react-shared-contexts`
  - fix: Removing internal checkmark custom styles hook ([PR #27085](https://github.com/microsoft/fluentui/pull/27085) by gcox@microsoft.com)
  - feat: Added CustomStyleHooks types and context ([PR #26943](https://github.com/microsoft/fluentui/pull/26943) by gcox@microsoft.com)
- `@fluentui/react-slider`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27073](https://github.com/microsoft/fluentui/pull/27073) by gcox@microsoft.com)
- `@fluentui/react-spinbutton`
  - feat: custom styles ([PR #27074](https://github.com/microsoft/fluentui/pull/27074) by gcox@microsoft.com)
- `@fluentui/react-spinner`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27075](https://github.com/microsoft/fluentui/pull/27075) by gcox@microsoft.com)
- `@fluentui/react-switch`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27076](https://github.com/microsoft/fluentui/pull/27076) by gcox@microsoft.com)
- `@fluentui/react-table`
  - feat: Implement Home/End navigation with Control ([PR #26964](https://github.com/microsoft/fluentui/pull/26964) by lingfangao@hotmail.com)
  - chore: use Iterable instead of a Set for table selection API surface ([PR #26892](https://github.com/microsoft/fluentui/pull/26892) by bernardo.sunderhus@gmail.com)
  - feat: custom styles ([PR #27084](https://github.com/microsoft/fluentui/pull/27084) by gcox@microsoft.com)
- `@fluentui/react-tabs`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27077](https://github.com/microsoft/fluentui/pull/27077) by gcox@microsoft.com)
- `@fluentui/react-textarea`
  - feat: Adding calls to custom style hooks derived from context. ([PR #27079](https://github.com/microsoft/fluentui/pull/27079) by gcox@microsoft.com)
- `@fluentui/react-toolbar`
  - feat: custom styles ([PR #27083](https://github.com/microsoft/fluentui/pull/27083) by gcox@microsoft.com)
- `@fluentui/react-tooltip`
  - feat: Adding calls to custom styles hooks derived from context. ([PR #27080](https://github.com/microsoft/fluentui/pull/27080) by gcox@microsoft.com)

### Patches

- `@fluentui/react-badge`
  - updated colors for unknown variant for presence badge ([PR #26970](https://github.com/microsoft/fluentui/pull/26970) by kakrookaran@gmail.com)
- `@fluentui/react-components`
  - feat(react-card): bump to release candidate ([PR #26957](https://github.com/microsoft/fluentui/pull/26957) by marcosvmmoura@gmail.com)
- `@fluentui/react-dialog`
  - fix: updates useModalAttributes flags for legacyTrapFocus ([PR #27109](https://github.com/microsoft/fluentui/pull/27109) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - updated hover icon styles in MenuItem ([PR #27028](https://github.com/microsoft/fluentui/pull/27028) by kakrookaran@gmail.com)
- `@fluentui/react-popover`
  - fix: updates useModalAttributes flags for legacyTrapFocus ([PR #27109](https://github.com/microsoft/fluentui/pull/27109) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - fix: Nested submenus support positioning fallbacks for small viewports ([PR #26980](https://github.com/microsoft/fluentui/pull/26980) by lingfangao@hotmail.com)
- `@fluentui/react-progress`
  - fix: Align WHCM styles with figma and fix documentation typo. ([PR #27038](https://github.com/microsoft/fluentui/pull/27038) by ololubek@microsoft.com)
  - fix: Add error checking for incorrect values of max and value props ([PR #27029](https://github.com/microsoft/fluentui/pull/27029) by ololubek@microsoft.com)
  - fix: Update ProgressBar styling to have width when display is set to flex ([PR #27101](https://github.com/microsoft/fluentui/pull/27101) by ololubek@microsoft.com)
- `@fluentui/react-tabs`
  - Fixed missing outline when forced-colors active ([PR #27127](https://github.com/microsoft/fluentui/pull/27127) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - fix: updates useModalAttributes flags for legacyTrapFocus ([PR #27109](https://github.com/microsoft/fluentui/pull/27109) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - fix: adjust IntrinsicElementProps type to properly support void elements ([PR #27095](https://github.com/microsoft/fluentui/pull/27095) by bernardo.sunderhus@gmail.com)
  - fix: export omit function ([PR #26958](https://github.com/microsoft/fluentui/pull/26958) by martinhochel@microsoft.com)

### Changes

- `@fluentui/react-card`
  - feat: bump to release candidate ([PR #26957](https://github.com/microsoft/fluentui/pull/26957) by marcosvmmoura@gmail.com)

## [9.15.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.6)

Wed, 22 Feb 2023 23:06:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.5..@fluentui/react-components_v9.15.6)

### Minor changes

- `@fluentui/react-positioning`
  - feat: Set overflow on positioned element when `autosize` is applied ([PR #26868](https://github.com/microsoft/fluentui/pull/26868) by lingfangao@hotmail.com)
- `@fluentui/react-progress`
  - feat: Move ProgressBar to stable ([PR #26008](https://github.com/microsoft/fluentui/pull/26008) by ololubek@microsoft.com)

### Patches

- `@fluentui/react-accordion`
  - bugfix: uses min-height instead of height ([PR #26862](https://github.com/microsoft/fluentui/pull/26862) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - feat: Add react-progress to stable ([PR #26008](https://github.com/microsoft/fluentui/pull/26008) by ololubek@microsoft.com)
- `@fluentui/react-input`
  - chore: Clean up Input's interactive styles ([PR #26865](https://github.com/microsoft/fluentui/pull/26865) by behowell@microsoft.com)
  - fix: Fix the width of Input's focus border with appearance=underline ([PR #26881](https://github.com/microsoft/fluentui/pull/26881) by behowell@microsoft.com)
- `@fluentui/react-popover`
  - fix: Popover without focus trap should not be aria-hidden ([PR #26932](https://github.com/microsoft/fluentui/pull/26932) by lingfangao@hotmail.com)
- `@fluentui/react-spinbutton`
  - chore: update SpinButton to use makeResetStyles ([PR #26867](https://github.com/microsoft/fluentui/pull/26867) by seanmonahan@microsoft.com)

### Changes

- `@fluentui/react-card`
  - fix: allow elements of card to grow to fill the available space ([PR #26616](https://github.com/microsoft/fluentui/pull/26616) by marcosvmmoura@gmail.com)

## [9.15.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.5)

Thu, 16 Feb 2023 19:18:47 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.4..@fluentui/react-components_v9.15.5)

### Patches

- `@fluentui/react-components`
  - Fixing Build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)
- `@fluentui/react-input`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)
- `@fluentui/react-portal-compat`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)
- `@fluentui/react-spinbutton`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)

### Changes

- `@fluentui/react-data-grid-react-window`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)
- `@fluentui/react-virtualizer`
  - fixing build issues ([PR #26877](https://github.com/microsoft/fluentui/pull/26877) by mgodbolt@microsoft.com)

## [9.15.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.4)

Thu, 16 Feb 2023 16:18:01 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.3..@fluentui/react-components_v9.15.4)

### Patches

- `@fluentui/react-input`
  - chore: Update Input to use makeResetStyles and reduce the number of classes applied ([PR #26815](https://github.com/microsoft/fluentui/pull/26815) by behowell@microsoft.com)

### Changes

- `@fluentui/react-virtualizer`
  - fix: Updating peer dependencies to support React 18. ([PR #26866](https://github.com/microsoft/fluentui/pull/26866) by mgodbolt@microsoft.com)

## [9.15.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.3)

Wed, 15 Feb 2023 11:44:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.2..@fluentui/react-components_v9.15.3)

### Minor changes

- `@fluentui/react-utilities`
  - feat: Add event helpers to ease working with mouse and touch ([PR #26784](https://github.com/microsoft/fluentui/pull/26784) by jirivyhnalek@microsoft.com)

### Patches

- `@fluentui/react-utilities`
  - fix(useOnClickOutside): iframe focus detection uses `contains` ([PR #26845](https://github.com/microsoft/fluentui/pull/26845) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-table`
  - feat: Table - add support for resizing columns with touch ([PR #26784](https://github.com/microsoft/fluentui/pull/26784) by jirivyhnalek@microsoft.com)

## [9.15.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.2)

Mon, 13 Feb 2023 23:43:13 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.1..@fluentui/react-components_v9.15.2)

### Patches

- `@fluentui/react-badge`
  - chore: update Badge and PresenceBadge to use makeResetStyles ([PR #26817](https://github.com/microsoft/fluentui/pull/26817) by seanmonahan@microsoft.com)
- `@fluentui/react-persona`
  - chore: update Persona to use makeResetStyles ([PR #26814](https://github.com/microsoft/fluentui/pull/26814) by seanmonahan@microsoft.com)
- `@fluentui/react-utilities`
  - fix: `resolveShorthand` should resolve an object as its copy ([PR #26825](https://github.com/microsoft/fluentui/pull/26825) by yuanboxue@microsoft.com)
- `@fluentui/react-avatar`
  - chore: update Avatar to use makeResetStyles ([PR #26811](https://github.com/microsoft/fluentui/pull/26811) by seanmonahan@microsoft.com)

## [9.15.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.1)

Mon, 13 Feb 2023 09:35:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.15.0..@fluentui/react-components_v9.15.1)

### Patches

- `@fluentui/react-menu`
  - fix: MenuList is a single tabstop ([PR #26803](https://github.com/microsoft/fluentui/pull/26803) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix: Coordinates should be rounded to device pixels to prevent blurriness ([PR #26766](https://github.com/microsoft/fluentui/pull/26766) by behowell@microsoft.com)

### Changes

- `@fluentui/react-progress`
  - chore: Update docs and styling to fix visual bugs and clarify usage of ProgressBar ([PR #26768](https://github.com/microsoft/fluentui/pull/26768) by ololubek@microsoft.com)

## [9.15.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.15.0)

Fri, 10 Feb 2023 08:49:57 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.14.0..@fluentui/react-components_v9.15.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Release `Table` and `DataGrid` as stable ([PR #26736](https://github.com/microsoft/fluentui/pull/26736) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - feat: Add `overflowBoundaryPadding` positioning prop ([PR #26730](https://github.com/microsoft/fluentui/pull/26730) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-provider`
  - fix: Do not add an escape character for colons in the styleTagId since useId now removes colons from the generated id in React 18. ([PR #26745](https://github.com/microsoft/fluentui/pull/26745) by esteban.230@hotmail.com)
- `@fluentui/react-spinbutton`
  - chore: improve SpinButton documentation for home/end hotkeys ([PR #26724](https://github.com/microsoft/fluentui/pull/26724) by seanmonahan@microsoft.com)
  - fix: properly handle single character text input for SpinButton ([PR #26789](https://github.com/microsoft/fluentui/pull/26789) by seanmonahan@microsoft.com)
- `@fluentui/react-table`
  - feat: Release 9.0.0 ([PR #26736](https://github.com/microsoft/fluentui/pull/26736) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - fix: Generate id first to avoid hook order mismatch in React 18 and remove colons from generated id in React 18. ([PR #26745](https://github.com/microsoft/fluentui/pull/26745) by esteban.230@hotmail.com)

### Changes

- `@fluentui/react-card`
  - fix: keyboard navigation not working for select elements ([PR #26612](https://github.com/microsoft/fluentui/pull/26612) by marcosvmmoura@gmail.com)
- `@fluentui/react-table`
  - feat: TableCellLayout component now supports truncate prop ([PR #26738](https://github.com/microsoft/fluentui/pull/26738) by jirivyhnalek@microsoft.com)
  - feat: DataGrid - add support for resizable columns ([PR #26690](https://github.com/microsoft/fluentui/pull/26690) by jirivyhnalek@microsoft.com)

## [9.14.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.14.0)

Tue, 07 Feb 2023 14:13:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.13.0..@fluentui/react-components_v9.14.0)

### Minor changes

- `@fluentui/react-components`
  - chore: export SlotRenderFunction type ([PR #26600](https://github.com/microsoft/fluentui/pull/26600) by seanmonahan@microsoft.com)
  - Added export of column sizing ([PR #26477](https://github.com/microsoft/fluentui/pull/26477) by jirivyhnalek@microsoft.com)
- `@fluentui/react-tabster`
  - feat: add `unstable_hasDefault` option in `useArrowNavigationGroup` that specifies the arrow navigation group has default focusable item ([PR #26732](https://github.com/microsoft/fluentui/pull/26732) by yuanboxue@microsoft.com)
  - feat: Bump keyborg to 2.0.0 and tabster to 4.0.1 ([PR #26584](https://github.com/microsoft/fluentui/pull/26584) by lingfangao@hotmail.com)
- `@fluentui/react-combobox`
  - fix: update Combobox and Dropdown to never use the Option value string as a display value; input value must be set if selectedOptions or defaultSelectOptions is set" ([PR #26617](https://github.com/microsoft/fluentui/pull/26617) by sarah.higley@microsoft.com)

### Patches

- `@fluentui/react-components`
  - feat: exports `useDataGridContextValues_unstable` ([PR #26627](https://github.com/microsoft/fluentui/pull/26627) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix(createPositionManager): computePosition should not apply styles after destruction ([PR #26593](https://github.com/microsoft/fluentui/pull/26593) by lingfangao@hotmail.com)
- `@fluentui/priority-overflow`
  - fix: New overflow items all always dispatch updates to subscriber ([PR #26565](https://github.com/microsoft/fluentui/pull/26565) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - fix: Using correct icon and color for away + out-of-office PresenceBadge. ([PR #26655](https://github.com/microsoft/fluentui/pull/26655) by makotom@microsoft.com)
- `@fluentui/react-button`
  - fix: add forced-colors primary button variant ([PR #26623](https://github.com/microsoft/fluentui/pull/26623) by sarah.higley@microsoft.com)

### Changes

- `@fluentui/react-data-grid-react-window`
  - feat: Initial release react-data-grid-react-window ([PR #26731](https://github.com/microsoft/fluentui/pull/26731) by lingfangao@hotmail.com)
- `@fluentui/react-infobutton`
  - chore: Add aria-label to InfoButton's button and add a11y guidance for using InfoButton with a label. ([PR #26557](https://github.com/microsoft/fluentui/pull/26557) by esteban.230@hotmail.com)
  - chore: Making the content focusable and updating example's text. ([PR #26596](https://github.com/microsoft/fluentui/pull/26596) by esteban.230@hotmail.com)
- `@fluentui/react-table`
  - feat: exports `useDataGridContextValues_unstable` ([PR #26627](https://github.com/microsoft/fluentui/pull/26627) by lingfangao@hotmail.com)
  - Add support for column resizing ([PR #26477](https://github.com/microsoft/fluentui/pull/26477) by jirivyhnalek@microsoft.com)
- `@fluentui/react-card`
  - docs: improve API documentation of card props ([PR #26614](https://github.com/microsoft/fluentui/pull/26614) by marcosvmmoura@gmail.com)

## [9.13.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.13.0)

Tue, 31 Jan 2023 19:53:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.12.0..@fluentui/react-components_v9.13.0)

### Minor changes

- `@fluentui/react-components`
  - feat: release Combobox and Dropdown as stable components ([PR #26518](https://github.com/microsoft/fluentui/pull/26518) by sarah.higley@microsoft.com)
  - feat: expose all typography tokens as components ([PR #26403](https://github.com/microsoft/fluentui/pull/26403) by marcosvmmoura@gmail.com)
  - chore: Added context exports for react-tabs ([PR #26552](https://github.com/microsoft/fluentui/pull/26552) by gcox@microsoft.com)
  - feat: release `@fluentui/react-select` as stable ([PR #26491](https://github.com/microsoft/fluentui/pull/26491) by sarah.higley@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Added context exports ([PR #26552](https://github.com/microsoft/fluentui/pull/26552) by gcox@microsoft.com)
- `@fluentui/react-text`
  - feat: expose all typography tokens as components ([PR #26403](https://github.com/microsoft/fluentui/pull/26403) by marcosvmmoura@gmail.com)

### Patches

- `@fluentui/react-badge`
  - chore: Updates border-radius to use proper token ([PR #26531](https://github.com/microsoft/fluentui/pull/26531) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - fix: Fixing button padding + minHeight to get correct sizes from design spec. ([PR #26522](https://github.com/microsoft/fluentui/pull/26522) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-combobox`
  - feat: release Combobox and Dropdown as stable components ([PR #26518](https://github.com/microsoft/fluentui/pull/26518) by sarah.higley@microsoft.com)
- `@fluentui/react-components`
  - feat: re-export useFocusWithin() hook ([PR #26533](https://github.com/microsoft/fluentui/pull/26533) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: properly use tokens for border radius ([PR #26516](https://github.com/microsoft/fluentui/pull/26516) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-persona`
  - fix: Reduce spacing between first and second line. ([PR #26520](https://github.com/microsoft/fluentui/pull/26520) by esteban.230@hotmail.com)
  - fix: Make before and after textPositions align correctly when the Avatar size is larger than the text lines together. ([PR #26546](https://github.com/microsoft/fluentui/pull/26546) by esteban.230@hotmail.com)
- `@fluentui/react-select`
  - feat: release `@fluentui/react-select` as stable ([PR #26491](https://github.com/microsoft/fluentui/pull/26491) by sarah.higley@microsoft.com)
- `@fluentui/react-utilities`
  - fix: update definitions for SSRProvider ([PR #25582](https://github.com/microsoft/fluentui/pull/25582) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-field`
  - chore: Change the default value of validationState to error when a validationMessage is set. ([PR #26523](https://github.com/microsoft/fluentui/pull/26523) by behowell@microsoft.com)

## [9.12.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.12.0)

Thu, 26 Jan 2023 13:30:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.11.1..@fluentui/react-components_v9.12.0)

### Minor changes

- `@fluentui/react-avatar`
  - chore: deprecates AvatarSizes in favor of AvatarSize ([PR #26492](https://github.com/microsoft/fluentui/pull/26492) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - feature: creates ButtonContext ([PR #26478](https://github.com/microsoft/fluentui/pull/26478) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - feat: export TextareaOnChangeData type ([PR #26455](https://github.com/microsoft/fluentui/pull/26455) by olfedias@microsoft.com)
  - feat: add support for appearance overrides (unstable) ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
  - feat: add IdPrefixProvider ([PR #26496](https://github.com/microsoft/fluentui/pull/26496) by olfedias@microsoft.com)
  - chore(react-avatar): deprecates AvatarSizes in favor of AvatarSize ([PR #26492](https://github.com/microsoft/fluentui/pull/26492) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-input`
  - feat: Allow default appearance override ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
- `@fluentui/react-migration-v8-v9`
  - Moved to be a v9 convergence package ([PR #26503](https://github.com/microsoft/fluentui/pull/26503) by gcox@microsoft.com)
- `@fluentui/react-provider`
  - feat: add support for overrides (unstable) ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
- `@fluentui/react-shared-contexts`
  - feat: Overrides context ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
- `@fluentui/react-spinbutton`
  - feat: Allow default appearance override ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
- `@fluentui/react-textarea`
  - feat: Allow default appearance override ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
  - feat: export TextareaOnChangeData type ([PR #26455](https://github.com/microsoft/fluentui/pull/26455) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - feat: add IdPrefixProvider ([PR #26496](https://github.com/microsoft/fluentui/pull/26496) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-button`
  - fix: high contrast mode focus styles are applied ([PR #26116](https://github.com/microsoft/fluentui/pull/26116) by sarah.higley@microsoft.com)
- `@fluentui/react-checkbox`
  - Deprecate CheckboxField_unstable in favor of Field with Checkbox as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-components`
  - Add Field to react-components/unstable. Deprecate InputField/etc. in favor of Field with Input/etc. as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-input`
  - Deprecate InputField_unstable in favor of Field with Input as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-link`
  - fix: handle "tabIndex" from user's input ([PR #26456](https://github.com/microsoft/fluentui/pull/26456) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - fix: update elementContains() to handle circular references ([PR #26483](https://github.com/microsoft/fluentui/pull/26483) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - fix: Update FluentProvider's class name to use backslash when a colon is present. ([PR #26465](https://github.com/microsoft/fluentui/pull/26465) by esteban.230@hotmail.com)
- `@fluentui/react-radio`
  - Deprecate RadioGroupField_unstable in favor of Field with RadioGroup as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-slider`
  - Deprecate SliderField_unstable in favor of Field with Slider as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-spinbutton`
  - Deprecate SpinButtonField_unstable in favor of Field with SpinButton as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-switch`
  - Deprecate SwitchField_unstable in favor of Field with Switch as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-textarea`
  - Deprecate TextareaField_unstable in favor of Field with Textarea as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: export toolbar hooks as functions, not Typescript types ([PR #26462](https://github.com/microsoft/fluentui/pull/26462) by seanmonahan@microsoft.com)
- `@fluentui/react-utilities`
  - fix: Leverage React.useId when available for our useId hook. ([PR #26465](https://github.com/microsoft/fluentui/pull/26465) by esteban.230@hotmail.com)

### Changes

- `@fluentui/react-combobox`
  - fix: add popup maxHeight, and move shadow styles to combobox/dropdown ([PR #26470](https://github.com/microsoft/fluentui/pull/26470) by sarah.higley@microsoft.com)
  - chore: update spec and migration docs ([PR #26396](https://github.com/microsoft/fluentui/pull/26396) by sarah.higley@microsoft.com)
  - fix: combobox should recalculate the activedescendant when the children change while open, and clear it when moving text cursor ([PR #26444](https://github.com/microsoft/fluentui/pull/26444) by sarah.higley@microsoft.com)
  - fix: update multiselect checkbox styles to match checkbox ([PR #26509](https://github.com/microsoft/fluentui/pull/26509) by sarah.higley@microsoft.com)
  - Deprecate ComboboxField_unstable in favor of Field with Combobox as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-field`
  - Implement Field component to replace InputField, ComboboxField, etc. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-progress`
  - Deprecate ProgressField_unstable in favor of Field with Progress as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-select`
  - feat: Allow default appearance override ([PR #25262](https://github.com/microsoft/fluentui/pull/25262) by miroslav.stastny@microsoft.com)
  - Deprecate SelectField_unstable in favor of Field with Select as its child. ([PR #26430](https://github.com/microsoft/fluentui/pull/26430) by behowell@microsoft.com)
- `@fluentui/react-table`
  - chore(react-table): switch AvatarSizes in favor of AvatarSize ([PR #26492](https://github.com/microsoft/fluentui/pull/26492) by bernardo.sunderhus@gmail.com)

## [9.11.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.11.1)

Mon, 23 Jan 2023 16:43:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.11.0..@fluentui/react-components_v9.11.1)

### Patches

- `@fluentui/react-components`
  - make unsized icons searchable ([PR #26451](https://github.com/microsoft/fluentui/pull/26451) by martin.troback@axis.com)
  - feat: Export 'Virtualizer' as unstable ([PR #25451](https://github.com/microsoft/fluentui/pull/25451) by mifraser@microsoft.com)
- `@fluentui/react-portal`
  - clean up parent reference to avoid memory leaks ([PR #26435](https://github.com/microsoft/fluentui/pull/26435) by arthurd@microsoft.com)

### Changes

- `@fluentui/react-field`
  - chore: Simplify Field layout styles ([PR #26352](https://github.com/microsoft/fluentui/pull/26352) by behowell@microsoft.com)
  - fix: Stretch Field components to full width ([PR #26412](https://github.com/microsoft/fluentui/pull/26412) by behowell@microsoft.com)
  - fix: Update Field label padding to match spec ([PR #26413](https://github.com/microsoft/fluentui/pull/26413) by behowell@microsoft.com)
  - fix: Field sets role="alert" on its error message so it is announced by screen readers ([PR #26414](https://github.com/microsoft/fluentui/pull/26414) by behowell@microsoft.com)
- `@fluentui/react-progress`
  - Rename rectangular shape to square ([PR #26419](https://github.com/microsoft/fluentui/pull/26419) by miroslav.stastny@microsoft.com)
- `@fluentui/react-table`
  - docs: update imports in DataGrid stories ([PR #26454](https://github.com/microsoft/fluentui/pull/26454) by olfedias@microsoft.com)
- `@fluentui/react-virtualizer`
  - feat: Initial unstable release of the Virtualizer ([PR #25451](https://github.com/microsoft/fluentui/pull/25451) by mifraser@microsoft.com)

## [9.11.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.11.0)

Wed, 18 Jan 2023 16:32:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.10.1..@fluentui/react-components_v9.11.0)

### Minor changes

- `@fluentui/react-components`
  - Release @fluentui/react-overflow as stable ([PR #26380](https://github.com/microsoft/fluentui/pull/26380) by lingfangao@hotmail.com)
  - Release `@fluentui/react-toolbar` as stable ([PR #26384](https://github.com/microsoft/fluentui/pull/26384) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - feat: add modalizer id to `useModalAttributes` option ([PR #26387](https://github.com/microsoft/fluentui/pull/26387) by yuanboxue@microsoft.com)

### Patches

- `@fluentui/priority-overflow`
  - Release as stable ([PR #26380](https://github.com/microsoft/fluentui/pull/26380) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - Release @fluentui/react-table as RC ([PR #26381](https://github.com/microsoft/fluentui/pull/26381) by lingfangao@hotmail.com)
- `@fluentui/react-overflow`
  - Release as stable ([PR #26380](https://github.com/microsoft/fluentui/pull/26380) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - fix: Insert css variables class at render time ([PR #26377](https://github.com/microsoft/fluentui/pull/26377) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - Release `@fluentui/react-toolbar` as stable ([PR #26384](https://github.com/microsoft/fluentui/pull/26384) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-table`
  - Release @fluentui/react-table as RC ([PR #26381](https://github.com/microsoft/fluentui/pull/26381) by lingfangao@hotmail.com)
  - fix(TableCellActions): Background should match rown on hover and active ([PR #26373](https://github.com/microsoft/fluentui/pull/26373) by lingfangao@hotmail.com)

## [9.10.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.10.1)

Tue, 17 Jan 2023 12:22:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.10.0..@fluentui/react-components_v9.10.1)

### Patches

- `@fluentui/react-badge`
  - feat(PresenceBadge): Add blocked status ([PR #26366](https://github.com/microsoft/fluentui/pull/26366) by jukapsia@microsoft.com)
- `@fluentui/react-components`
  - BREAKING: table API naming changes ([PR #26304](https://github.com/microsoft/fluentui/pull/26304) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-table`
  - BREAKING: API naming changes ([PR #26304](https://github.com/microsoft/fluentui/pull/26304) by lingfangao@hotmail.com)
  - BREAKING(DataGrid): render functions need to by typed ([PR #26371](https://github.com/microsoft/fluentui/pull/26371) by lingfangao@hotmail.com)

## [9.10.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.10.0)

Mon, 16 Jan 2023 08:38:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.9.1..@fluentui/react-components_v9.10.0)

### Minor changes

- `@fluentui/react-components`
  - chore: Re-exporting missing exports from @fluentui/react-combobox. ([PR #26294](https://github.com/microsoft/fluentui/pull/26294) by Humberto.Morimoto@microsoft.com)
  - feat: Export RowIdContextProvider and useRowIdContext from react-table ([PR #26081](https://github.com/microsoft/fluentui/pull/26081) by lingfangao@hotmail.com)
  - chore: Re-exporting makeResetStyles. ([PR #26353](https://github.com/microsoft/fluentui/pull/26353) by makotom@microsoft.com)

### Patches

- `@fluentui/react-slider`
  - fix: allow refs passed in root slot to merge with focus refs ([PR #26243](https://github.com/microsoft/fluentui/pull/26243) by mgodbolt@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Switch to use griffel reset styles ([PR #26007](https://github.com/microsoft/fluentui/pull/26007) by behowell@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Simplify Checkbox style selectors using component checked/disabled state ([PR #26247](https://github.com/microsoft/fluentui/pull/26247) by behowell@microsoft.com)
- `@fluentui/react-input`
  - fix: Update contentBefore and contentAfter slot styling for svg ([PR #26115](https://github.com/microsoft/fluentui/pull/26115) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - fix: Tab should focus the window if trigger is the last focusable element ([PR #26163](https://github.com/microsoft/fluentui/pull/26163) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-table`
  - feat: Export RowIdProvider ([PR #26081](https://github.com/microsoft/fluentui/pull/26081) by lingfangao@hotmail.com)
  - fix(TableSelectionCell): Radios should not change selection on focus ([PR #26283](https://github.com/microsoft/fluentui/pull/26283) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - feat: add new ToolbarRadioGroup component and a11y fixes ([PR #26275](https://github.com/microsoft/fluentui/pull/26275) by chassunc@microsoft.com)
- `@fluentui/react-combobox`
  - fix: add aria-owns to combobox and dropdown" ([PR #26246](https://github.com/microsoft/fluentui/pull/26246) by sarah.higley@microsoft.com)
  - fix: button semantics for Combobox chevron, and pointer styles ([PR #26075](https://github.com/microsoft/fluentui/pull/26075) by sarah.higley@microsoft.com)
- `@fluentui/react-field`
  - fix: Field styles do not wrap SVG status icon in inline parent to avoid layout bugs ([PR #26150](https://github.com/microsoft/fluentui/pull/26150) by sarah.higley@microsoft.com)
- `@fluentui/react-infobutton`
  - fix: Update border for Teams HCM to be transparent. ([PR #26305](https://github.com/microsoft/fluentui/pull/26305) by esteban.230@hotmail.com)
  - fix: Update PopoverSurface's role to note and remove need to cast props passed to popover slot. ([PR #26300](https://github.com/microsoft/fluentui/pull/26300) by esteban.230@hotmail.com)

## [9.9.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.9.1)

Mon, 09 Jan 2023 21:51:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.9.0..@fluentui/react-components_v9.9.1)

### Patches

- `@fluentui/react-checkbox`
  - perf: Don't render Checkbox icon when unchecked ([PR #26248](https://github.com/microsoft/fluentui/pull/26248) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - revert: MenuItem root slot only supports div ([PR #26261](https://github.com/microsoft/fluentui/pull/26261) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-combobox`
  - fix: disabled cursor style, opening when disabled, and hover styles ([PR #26068](https://github.com/microsoft/fluentui/pull/26068) by sarah.higley@microsoft.com)
- `@fluentui/react-select`
  - fix: no interactive hover style when disabled ([PR #26068](https://github.com/microsoft/fluentui/pull/26068) by sarah.higley@microsoft.com)

## [9.9.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.9.0)

Mon, 09 Jan 2023 14:34:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.8.0..@fluentui/react-components_v9.9.0)

### Minor changes

- `@fluentui/react-components`
  - feat: implement `useScrollbarWidth` utility hook ([PR #26144](https://github.com/microsoft/fluentui/pull/26144) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - Stops using ARIAButton types for MenuItem root ([PR #26257](https://github.com/microsoft/fluentui/pull/26257) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - feat: add new prop unstable_disableAutoFocus on Popover ([PR #26141](https://github.com/microsoft/fluentui/pull/26141) by yuanboxue@microsoft.com)
- `@fluentui/react-portal`
  - feat: elementContains supports Node types ([PR #26158](https://github.com/microsoft/fluentui/pull/26158) by email not defined)
- `@fluentui/react-utilities`
  - feat: implement `useScrollbarWidth` utility hook ([PR #26144](https://github.com/microsoft/fluentui/pull/26144) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-menu`
  - fix: MenuList props should win over context props ([PR #26252](https://github.com/microsoft/fluentui/pull/26252) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix: setOverrideTarget should be an event callback ([PR #26157](https://github.com/microsoft/fluentui/pull/26157) by lingfangao@hotmail.com)

### Changes

- `@fluentui/priority-overflow`
  - fix: Minimum visible overflow items should be respected ([PR #26194](https://github.com/microsoft/fluentui/pull/26194) by lingfangao@hotmail.com)
- `@fluentui/react-combobox`
  - fix: perf improvements with useEventCallback ([PR #26191](https://github.com/microsoft/fluentui/pull/26191) by sarah.higley@microsoft.com)
  - fix: Combobox always starts at the first option if multiselect, and correctly sets focus visible" ([PR #26173](https://github.com/microsoft/fluentui/pull/26173) by sarah.higley@microsoft.com)
- `@fluentui/react-table`
  - fix: remove Event type in selectionManager ([PR #26211](https://github.com/microsoft/fluentui/pull/26211) by olfedias@microsoft.com)
  - refactor: Cleanup unused code ([PR #26219](https://github.com/microsoft/fluentui/pull/26219) by lingfangao@hotmail.com)
  - BREAKING(TableCellLayout): `wrapper` slot renamed to `content` ([PR #26220](https://github.com/microsoft/fluentui/pull/26220) by lingfangao@hotmail.com)

## [9.8.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.8.0)

Wed, 04 Jan 2023 01:40:03 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.7.4..@fluentui/react-components_v9.8.0)

### Minor changes

- `@fluentui/react-persona`
  - feat: Moving Persona to stable. ([PR #26114](https://github.com/microsoft/fluentui/pull/26114) by esteban.230@hotmail.com)
- `@fluentui/react-provider`
  - feat: FluentProvider applies style attributes defined by a renderer from Griffel ([PR #26046](https://github.com/microsoft/fluentui/pull/26046) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - feat: Moving Persona to stable. ([PR #26114](https://github.com/microsoft/fluentui/pull/26114) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-divider`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - fix: Portals should render correctly in strict mode ([PR #25956](https://github.com/microsoft/fluentui/pull/25956) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - fix: force update memory leak in positioning manager ([PR #26096](https://github.com/microsoft/fluentui/pull/26096) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
  - fix: Autosize middleware should set box-sizing border-box ([PR #26094](https://github.com/microsoft/fluentui/pull/26094) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
  - fix: Bump tabster to 3.0.6 ([PR #26076](https://github.com/microsoft/fluentui/pull/26076) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - feat: generalize is HTMLElement attribute to unknown ([PR #25991](https://github.com/microsoft/fluentui/pull/25991) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-accordion`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - fix: Export all relevant Toolbar components and utilities ([PR #26065](https://github.com/microsoft/fluentui/pull/26065) by lingfangao@hotmail.com)
  - chore: Migrate to new package structure. ([PR #26051](https://github.com/microsoft/fluentui/pull/26051) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-field`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-infobutton`
  - chore: migrate to new package structure. ([PR #26111](https://github.com/microsoft/fluentui/pull/26111) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
  - refactor: render function children called in component render function ([PR #26085](https://github.com/microsoft/fluentui/pull/26085) by lingfangao@hotmail.com)
  - fix: DataGridSelection cell should focus on input, not cell ([PR #26076](https://github.com/microsoft/fluentui/pull/26076) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
  - fix: Export all relevant Toolbar components and utilities ([PR #26065](https://github.com/microsoft/fluentui/pull/26065) by lingfangao@hotmail.com)
- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #26045](https://github.com/microsoft/fluentui/pull/26045) by olfedias@microsoft.com)

## [9.7.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.7.4)

Wed, 21 Dec 2022 10:20:28 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.7.3..@fluentui/react-components_v9.7.4)

### Patches

- `@fluentui/react-provider`
  - chore: re-export theme from tokens package ([PR #25966](https://github.com/microsoft/fluentui/pull/25966) by miroslav.stastny@microsoft.com)
- `@fluentui/react-theme`
  - chore: re-export theme from tokens package ([PR #25966](https://github.com/microsoft/fluentui/pull/25966) by miroslav.stastny@microsoft.com)

### Changes

- `@fluentui/react-combobox`
  - chore: Migrate to new package structure. ([PR #26037](https://github.com/microsoft/fluentui/pull/26037) by tristan.watanabe@gmail.com)
- `@fluentui/tokens`
  - Hoist theme tokens from react-theme to tokens package ([PR #25966](https://github.com/microsoft/fluentui/pull/25966) by miroslav.stastny@microsoft.com)

## [9.7.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.7.3)

Tue, 20 Dec 2022 14:59:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.7.2..@fluentui/react-components_v9.7.3)

### Minor changes

- `@fluentui/react-utilities`
  - feat: isHTMLElement helper function ([PR #25891](https://github.com/microsoft/fluentui/pull/25891) by bernardo.sunderhus@gmail.com)
  - feat: replace shouldPreventKeydown with isInteractiveHTMLElement ([PR #25942](https://github.com/microsoft/fluentui/pull/25942) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-avatar`
  - fix: Avatar shouldn't render an icon when displaying an image (performance) ([PR #25945](https://github.com/microsoft/fluentui/pull/25945) by behowell@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Checkbox to use griffel reset styles ([PR #25984](https://github.com/microsoft/fluentui/pull/25984) by behowell@microsoft.com)
- `@fluentui/react-components`
  - (chore): remove deprecated exports from ProgressBar ([PR #26027](https://github.com/microsoft/fluentui/pull/26027) by ololubek@microsoft.com)
  - chore: Rename Progress to ProgressBar ([PR #25929](https://github.com/microsoft/fluentui/pull/25929) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - fix: always apply typography styles in MenuPopover ([PR #25965](https://github.com/microsoft/fluentui/pull/25965) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - fix: always apply typography styles in PopoverSurface ([PR #25965](https://github.com/microsoft/fluentui/pull/25965) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - fix: Coordinates should be rounded to integers ([PR #26038](https://github.com/microsoft/fluentui/pull/26038) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - add "applyStylesToPortals" prop ([PR #25965](https://github.com/microsoft/fluentui/pull/25965) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Radio to use griffel reset styles ([PR #25984](https://github.com/microsoft/fluentui/pull/25984) by behowell@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Migrate to new package structure. ([PR #25833](https://github.com/microsoft/fluentui/pull/25833) by tristan.watanabe@gmail.com)
- `@fluentui/react-theme`
  - fix: update theme tokens ([PR #25903](https://github.com/microsoft/fluentui/pull/25903) by miroslav.stastny@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - fix: update tokens to match the spec ([PR #25855](https://github.com/microsoft/fluentui/pull/25855) by marigome@microsoft.com)
- `@fluentui/react-card`
  - fix: remove unnecessary selectable ref and add support for aria-describedby on card preview ([PR #25934](https://github.com/microsoft/fluentui/pull/25934) by marcosvmmoura@gmail.com)
  - fix selectable card accessibility ([PR #25827](https://github.com/microsoft/fluentui/pull/25827) by marcosvmmoura@gmail.com)
- `@fluentui/react-combobox`
  - feat: update Listbox and Option to use menu and menuitemcheckbox semantics for multiselect ([PR #25905](https://github.com/microsoft/fluentui/pull/25905) by sarah.higley@microsoft.com)
  - feat: multiselect Combobox does not display selected options in the text field ([PR #25898](https://github.com/microsoft/fluentui/pull/25898) by sarah.higley@microsoft.com)
- `@fluentui/react-progress`
  - chore: Change name to ProgressBar ([PR #25929](https://github.com/microsoft/fluentui/pull/25929) by ololubek@microsoft.com)
  - fix: Add @noflip to animation styles to prevent extra from css being generated ([PR #26029](https://github.com/microsoft/fluentui/pull/26029) by ololubek@microsoft.com)
  - (chore): remove deprecated exports from ProgressBar ([PR #26027](https://github.com/microsoft/fluentui/pull/26027) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - fix: Explicit focus outline for TableHeaderCell and TableSelectionCell ([PR #25938](https://github.com/microsoft/fluentui/pull/25938) by lingfangao@hotmail.com)
  - fix(DataGridSelectionCell): should render `aria-selected` on the cell ([PR #25950](https://github.com/microsoft/fluentui/pull/25950) by lingfangao@hotmail.com)
  - fix: DataGrid supports keyboard navigation by default ([PR #25939](https://github.com/microsoft/fluentui/pull/25939) by lingfangao@hotmail.com)
  - feat: Add row focus as unstable feature due to a11y unknowns ([PR #25944](https://github.com/microsoft/fluentui/pull/25944) by lingfangao@hotmail.com)
  - fix(DataGridRow): `children` type should only be render function ([PR #25930](https://github.com/microsoft/fluentui/pull/25930) by lingfangao@hotmail.com)
  - fix: DataGridRow should prevent default on spacebar ([PR #25942](https://github.com/microsoft/fluentui/pull/25942) by lingfangao@hotmail.com)
  - feat: DataGrid supports custom row Ids ([PR #25885](https://github.com/microsoft/fluentui/pull/25885) by lingfangao@hotmail.com)
  - fix(TableHeaderCell): should render `aria-sort="none"` if not sorted ([PR #25921](https://github.com/microsoft/fluentui/pull/25921) by lingfangao@hotmail.com)
- `@fluentui/react-theme-sass`
  - feat: add new tokens ([PR #25903](https://github.com/microsoft/fluentui/pull/25903) by miroslav.stastny@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: Migrate to new package structure. ([PR #25920](https://github.com/microsoft/fluentui/pull/25920) by tristan.watanabe@gmail.com)

## [9.7.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.7.2)

Mon, 05 Dec 2022 18:29:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.7.1..@fluentui/react-components_v9.7.2)

### Patches

- `@fluentui/react-avatar`
  - fix: AvatarGroup's pie layout places inline items correctly in rtl. ([PR #25822](https://github.com/microsoft/fluentui/pull/25822) by esteban.230@hotmail.com)
- `@fluentui/react-button`
  - chore: refactor to use makeResetStyles ([PR #25216](https://github.com/microsoft/fluentui/pull/25216) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - BREAKING: rename useTable->useTableFeatures, useSelection->useTableSelection, useSort->useTableSort ([PR #25797](https://github.com/microsoft/fluentui/pull/25797) by lingfangao@hotmail.com)
  - chore: add exports for CSS extraction in Griffel ([PR #25216](https://github.com/microsoft/fluentui/pull/25216) by olfedias@microsoft.com)
  - feat: Export `DataGrid` as unstable ([PR #25805](https://github.com/microsoft/fluentui/pull/25805) by lingfangao@hotmail.com)
  - chore: deprecates unused type UninitializedMenuListState ([PR #25672](https://github.com/microsoft/fluentui/pull/25672) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-input`
  - chore: Replace use of fontSize tokens with typographyStyles ([PR #25727](https://github.com/microsoft/fluentui/pull/25727) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - chore: removes prop spreading on MenuList state ([PR #25672](https://github.com/microsoft/fluentui/pull/25672) by bernardo.sunderhus@gmail.com)
  - fix: MenuDivider thickness should be `strokeWidthThin` ([PR #25711](https://github.com/microsoft/fluentui/pull/25711) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - chore: Migrate to new package structure. ([PR #25735](https://github.com/microsoft/fluentui/pull/25735) by tristan.watanabe@gmail.com)
  - fix: Invoke `onOpenChange` callback without checking if open state has flipped ([PR #25741](https://github.com/microsoft/fluentui/pull/25741) by yuanboxue@microsoft.com)
- `@fluentui/react-provider`
  - chore: Migrate to new package structure. ([PR #25809](https://github.com/microsoft/fluentui/pull/25809) by tristan.watanabe@gmail.com)
- `@fluentui/react-radio`
  - chore: Migrate to new package structure. ([PR #25810](https://github.com/microsoft/fluentui/pull/25810) by tristan.watanabe@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: Migrate to new package structure. ([PR #25813](https://github.com/microsoft/fluentui/pull/25813) by tristan.watanabe@gmail.com)
- `@fluentui/react-spinner`
  - chore: Migrate to new package structure. ([PR #25814](https://github.com/microsoft/fluentui/pull/25814) by tristan.watanabe@gmail.com)
- `@fluentui/react-switch`
  - chore: Migrate to new package structure. ([PR #25819](https://github.com/microsoft/fluentui/pull/25819) by tristan.watanabe@gmail.com)
- `@fluentui/react-tabster`
  - fix: focus-within attribute no longer the same as focus-visible ([PR #25790](https://github.com/microsoft/fluentui/pull/25790) by lingfangao@hotmail.com)
  - fix: allow GriffelResetStyle to be passed to createCustomFocusIndicatorStyle ([PR #25216](https://github.com/microsoft/fluentui/pull/25216) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Replace use of fontSize tokens with typographyStyles ([PR #25727](https://github.com/microsoft/fluentui/pull/25727) by behowell@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25820](https://github.com/microsoft/fluentui/pull/25820) by tristan.watanabe@gmail.com)
- `@fluentui/react-theme`
  - refactor: Use Object.assign to reduce loop runtime ([PR #25433](https://github.com/microsoft/fluentui/pull/25433) by tigeroakes@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25812](https://github.com/microsoft/fluentui/pull/25812) by tristan.watanabe@gmail.com)
- `@fluentui/react-tooltip`
  - chore: Migrate to new package structure. ([PR #25818](https://github.com/microsoft/fluentui/pull/25818) by tristan.watanabe@gmail.com)

### Changes

- `@fluentui/react-combobox`
  -  feat: update Option value to be a non-display value, and add an Option text prop that is required if the child is not a string ([PR #25379](https://github.com/microsoft/fluentui/pull/25379) by sarah.higley@microsoft.com)
  - fix: open Combobox popup when typing ([PR #25769](https://github.com/microsoft/fluentui/pull/25769) by sarah.higley@microsoft.com)
  - chore: Replace use of fontSize tokens with typographyStyles ([PR #25727](https://github.com/microsoft/fluentui/pull/25727) by behowell@microsoft.com)
  - fix: Combobox should close on blur after clicking expand icon ([PR #25771](https://github.com/microsoft/fluentui/pull/25771) by sarah.higley@microsoft.com)
- `@fluentui/react-field`
  - fix: Field should use aria-describedby instead of aria-errormessage ([PR #25580](https://github.com/microsoft/fluentui/pull/25580) by behowell@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25817](https://github.com/microsoft/fluentui/pull/25817) by tristan.watanabe@gmail.com)
- `@fluentui/react-persona`
  - chore: Updating Persona's docs to match implementation. ([PR #25770](https://github.com/microsoft/fluentui/pull/25770) by esteban.230@hotmail.com)
  - chore: Migrate to new package structure. ([PR #25737](https://github.com/microsoft/fluentui/pull/25737) by tristan.watanabe@gmail.com)
  - fix: Make Persona's text wrap when overflowing its container. ([PR #25880](https://github.com/microsoft/fluentui/pull/25880) by esteban.230@hotmail.com)
- `@fluentui/react-progress`
  - chore: Migrate to new package structure. ([PR #25744](https://github.com/microsoft/fluentui/pull/25744) by tristan.watanabe@gmail.com)
- `@fluentui/react-select`
  - chore: Replace use of fontSize tokens with typographyStyles ([PR #25727](https://github.com/microsoft/fluentui/pull/25727) by behowell@microsoft.com)
- `@fluentui/react-table`
  - fix: TableHeaderCell design fixes ([PR #25712](https://github.com/microsoft/fluentui/pull/25712) by lingfangao@hotmail.com)
  - BREAKING(useTable): `onSelectionChange` returns data object ([PR #25731](https://github.com/microsoft/fluentui/pull/25731) by lingfangao@hotmail.com)
  - docs: Update docstrings for props ([PR #25787](https://github.com/microsoft/fluentui/pull/25787) by lingfangao@hotmail.com)
  - fix: Various design fixes to Table components ([PR #25715](https://github.com/microsoft/fluentui/pull/25715) by lingfangao@hotmail.com)
  - fix: Cell actions should have correct background when row focused within ([PR #25790](https://github.com/microsoft/fluentui/pull/25790) by lingfangao@hotmail.com)
  - fix: Table row height is determined by cells ([PR #25717](https://github.com/microsoft/fluentui/pull/25717) by lingfangao@hotmail.com)
  - BREAKING: change `smaller` size to `extra-small` ([PR #25713](https://github.com/microsoft/fluentui/pull/25713) by lingfangao@hotmail.com)
  - fix(TableCellLayout): Icon sizes in should match design spec ([PR #25764](https://github.com/microsoft/fluentui/pull/25764) by lingfangao@hotmail.com)
  - feat: `DataGrid` supports row sorting ([PR #25655](https://github.com/microsoft/fluentui/pull/25655) by lingfangao@hotmail.com)
  - BREAKING: rename useTable->useTableFeatures, useSelection->useTableSelection, useSort->useTableSort ([PR #25797](https://github.com/microsoft/fluentui/pull/25797) by lingfangao@hotmail.com)
  - feat: DataGrid supports selection ([PR #25719](https://github.com/microsoft/fluentui/pull/25719) by lingfangao@hotmail.com)

## [9.7.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.7.1)

Thu, 17 Nov 2022 23:05:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.7.0..@fluentui/react-components_v9.7.1)

### Minor changes

- `@fluentui/react-menu`
  - feature: menu open change data union types ([PR #25503](https://github.com/microsoft/fluentui/pull/25503) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-utilities`
  - fix: supports colSpan property for th ([PR #25613](https://github.com/microsoft/fluentui/pull/25613) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-badge`
  - chore: Update Badge colors with new mappings from design ([PR #25599](https://github.com/microsoft/fluentui/pull/25599) by behowell@microsoft.com)
  - fix: Allow PresenceBadge's icon to be overridden by the user. ([PR #25684](https://github.com/microsoft/fluentui/pull/25684) by humberto_makoto@hotmail.com)
- `@fluentui/react-components`
  - feat: bump @fluentui/react-overflow to RC ([PR #25659](https://github.com/microsoft/fluentui/pull/25659) by lingfangao@hotmail.com)
  - feat: Adding InfoButton to unstable. ([PR #25686](https://github.com/microsoft/fluentui/pull/25686) by esteban.230@hotmail.com)
  - react-menu: deprecates MenuOpenEvents in favor of MenuOpenEvent ([PR #25503](https://github.com/microsoft/fluentui/pull/25503) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - feat: removes aria-haspopup ([PR #25611](https://github.com/microsoft/fluentui/pull/25611) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/priority-overflow`
  - feat: Bump to RC ([PR #25659](https://github.com/microsoft/fluentui/pull/25659) by lingfangao@hotmail.com)
- `@fluentui/react-infobutton`
  - chore: Making the package public and preparing to add to unstable. ([PR #25686](https://github.com/microsoft/fluentui/pull/25686) by esteban.230@hotmail.com)
- `@fluentui/react-overflow`
  - feat: Bump to RC ([PR #25659](https://github.com/microsoft/fluentui/pull/25659) by lingfangao@hotmail.com)
- `@fluentui/react-persona`
  - feat: Adding size and textAlignment props and updating styles. ([PR #25626](https://github.com/microsoft/fluentui/pull/25626) by esteban.230@hotmail.com)
- `@fluentui/react-progress`
  - fix: update validationState tokens to use background instead of foreground ([PR #25664](https://github.com/microsoft/fluentui/pull/25664) by ololubek@microsoft.com)
- `@fluentui/react-table`
  - BREAKING: `sortable` prop no longer enables `TableHeader` navigation ([PR #25656](https://github.com/microsoft/fluentui/pull/25656) by lingfangao@hotmail.com)
  - fix: Match hover background colors between table row and cell actions ([PR #25628](https://github.com/microsoft/fluentui/pull/25628) by tigeroakes@microsoft.com)
  - BREAKING: Headless table callbacks require event ([PR #25658](https://github.com/microsoft/fluentui/pull/25658) by lingfangao@hotmail.com)

## [9.7.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.7.0)

Fri, 11 Nov 2022 14:57:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.6.3..@fluentui/react-components_v9.7.0)

### Minor changes

- `@fluentui/react-tabs`
  - Added support for reserving space for selected state ([PR #25542](https://github.com/microsoft/fluentui/pull/25542) by gcox@microsoft.com)
  - Added large size tabs ([PR #25577](https://github.com/microsoft/fluentui/pull/25577) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - Add both options to axis config ([PR #25568](https://github.com/microsoft/fluentui/pull/25568) by chassunc@microsoft.com)
- `@fluentui/react-components`
  - feat: Move AvatarGroup to stable. ([PR #25005](https://github.com/microsoft/fluentui/pull/25005) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-portal`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25481](https://github.com/microsoft/fluentui/pull/25481) by tristan.watanabe@gmail.com)
- `@fluentui/react-portal-compat`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - chore: Migrate to new package structure. ([PR #25481](https://github.com/microsoft/fluentui/pull/25481) by tristan.watanabe@gmail.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-provider`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-radio`
  - chore: Move RadioGroupField into the @fluentui/react-radio package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-shared-contexts`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-slider`
  - chore: Move SliderField into the @fluentui/react-slider package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Move SpinButtonField into the @fluentui/react-spinbutton package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - fix: update disabled + underline and filled styles to match other text-like form control styles ([PR #25543](https://github.com/microsoft/fluentui/pull/25543) by sarah.higley@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-spinner`
  - Add documentation for Spinner when reduced-motion is active ([PR #25561](https://github.com/microsoft/fluentui/pull/25561) by ololubek@microsoft.com)
  - chore: Replacing use of hard-coded constants with curve and duration tokens from theme. ([PR #25522](https://github.com/microsoft/fluentui/pull/25522) by humberto_makoto@hotmail.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-switch`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - bugfix: adds line-height=0 to switch indicator slot ([PR #25507](https://github.com/microsoft/fluentui/pull/25507) by bernardo.sunderhus@gmail.com)
  - chore: Move SwitchField into the @fluentui/react-switch package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - chore: Replacing use of hard-coded constants with curve and duration tokens from theme. ([PR #25522](https://github.com/microsoft/fluentui/pull/25522) by humberto_makoto@hotmail.com)
- `@fluentui/react-tabs`
  - Added support for regular/filled icon toggling ([PR #25597](https://github.com/microsoft/fluentui/pull/25597) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-textarea`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Move TextareaField into the @fluentui/react-textarea package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
- `@fluentui/react-theme`
  - Fixed incorrect typography style ([PR #25577](https://github.com/microsoft/fluentui/pull/25577) by gcox@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-utilities`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/keyboard-keys`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-aria`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Replacing use of hard-coded constants with curve and duration tokens from theme. ([PR #25522](https://github.com/microsoft/fluentui/pull/25522) by humberto_makoto@hotmail.com)
  - fix: Update Avatar active ring color to match base color ([PR #25497](https://github.com/microsoft/fluentui/pull/25497) by behowell@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Remove AvatarGroup unstable warnings. ([PR #25005](https://github.com/microsoft/fluentui/pull/25005) by esteban.230@hotmail.com)
  - chore: Migrate to new package structure. ([PR #25473](https://github.com/microsoft/fluentui/pull/25473) by tristan.watanabe@gmail.com)
- `@fluentui/react-badge`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-button`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Replacing use of hard-coded constants with curve and duration tokens from theme. ([PR #25522](https://github.com/microsoft/fluentui/pull/25522) by humberto_makoto@hotmail.com)
  - fix: Showing correct behavior for icons inside of Buttons on hover, pressed and toggle states. ([PR #25479](https://github.com/microsoft/fluentui/pull/25479) by humberto_makoto@hotmail.com)
  - fix: Adding expanded styles for MenuButtons and making various other styling fixes for Button components. ([PR #25521](https://github.com/microsoft/fluentui/pull/25521) by humberto_makoto@hotmail.com)
- `@fluentui/react-checkbox`
  - chore: Move CheckboxField into the @fluentui/react-checkbox package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-components`
  - chore: Update exports for field components from @fluentui/react-components/unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - chore: Export ProgressField from @fluentui/react-components/unstable ([PR #25536](https://github.com/microsoft/fluentui/pull/25536) by behowell@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - feat: Exports `createColumn` utility from `@fluentui/react-table` as unstable ([PR #25495](https://github.com/microsoft/fluentui/pull/25495) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-dialog`
  - chore: removes unnecessary union case for DialogOpenChangeData ([PR #25504](https://github.com/microsoft/fluentui/pull/25504) by bernardo.sunderhus@gmail.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-divider`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-input`
  - fix: update disabled + underline styles, have all text-like form control disabled states match ([PR #25543](https://github.com/microsoft/fluentui/pull/25543) by sarah.higley@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Move InputField into the @fluentui/react-input package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
- `@fluentui/react-label`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-link`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-menu`
  - fix: remove unwanted aria attributes on context menu ([PR #25615](https://github.com/microsoft/fluentui/pull/25615) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)

### Changes

- `@fluentui/react-progress`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - Add styling and documentation for reduced-motion ([PR #25563](https://github.com/microsoft/fluentui/pull/25563) by ololubek@microsoft.com)
  - chore: Move ProgressField into the @fluentui/react-progress package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
- `@fluentui/react-select`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Move SelectField into the @fluentui/react-select package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - fix: update disabled + underline styles, have all text-like form control disabled states match ([PR #25543](https://github.com/microsoft/fluentui/pull/25543) by sarah.higley@microsoft.com)
- `@fluentui/react-table`
  - feat:  Implement child render function for DataGrid rows ([PR #25476](https://github.com/microsoft/fluentui/pull/25476) by lingfangao@hotmail.com)
  - feat: Implement `focusMode` prop for DataGrid, apply role="grid" correctly ([PR #25530](https://github.com/microsoft/fluentui/pull/25530) by lingfangao@hotmail.com)
  - BREAKING: ColumnDefinition type is stricter, use createColumn to create column definition. Implments render function for DataGridRow. ([PR #25495](https://github.com/microsoft/fluentui/pull/25495) by lingfangao@hotmail.com)
- `@fluentui/react-theme-sass`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/babel-preset-global-context`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/global-context`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/priority-overflow`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-card`
  - feat: add selectable feature to card ([PR #24486](https://github.com/microsoft/fluentui/pull/24486) by marcosvmmoura@gmail.com)
- `@fluentui/react-combobox`
  - chore: Move InputField into the @fluentui/react-input package and export as _unstable ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - fix: update disabled + underline styles, have all text-like form control disabled states match ([PR #25543](https://github.com/microsoft/fluentui/pull/25543) by sarah.higley@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-field`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
  - chore: Clean up Field tests and story imports in preparation of moving to individual packages ([PR #25594](https://github.com/microsoft/fluentui/pull/25594) by behowell@microsoft.com)
  - chore: Move individual field components into their respective packages, and out of @fluentui/react-field ([PR #25593](https://github.com/microsoft/fluentui/pull/25593) by behowell@microsoft.com)
- `@fluentui/react-overflow`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)
- `@fluentui/react-persona`
  - fix: create valid export maps ([PR #25558](https://github.com/microsoft/fluentui/pull/25558) by martinhochel@microsoft.com)

## [9.6.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.6.3)

Wed, 02 Nov 2022 14:27:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.6.2..@fluentui/react-components_v9.6.3)

### Changes

- `@fluentui/react-table`
  - fix(useTable): sort should adapt to enhanced row types ([PR #25487](https://github.com/microsoft/fluentui/pull/25487) by lingfangao@hotmail.com)

## [9.6.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.6.2)

Wed, 02 Nov 2022 11:57:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.6.1..@fluentui/react-components_v9.6.2)

### Minor changes

- `@fluentui/react-aria`
  - exposes internal typings: ARIAButtonAlteredProps and ARIAButtonElement ([PR #25403](https://github.com/microsoft/fluentui/pull/25403) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-context-selector`
  - exposes internal type: ContextSelector ([PR #25404](https://github.com/microsoft/fluentui/pull/25404) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-dialog`
  - removes exposing of internal type FluentTriggerComponent ([PR #25408](https://github.com/microsoft/fluentui/pull/25408) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - removes exposing of internal type FluentTriggerComponent ([PR #25410](https://github.com/microsoft/fluentui/pull/25410) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - removes exposing of internal type FluentTriggerComponent ([PR #25411](https://github.com/microsoft/fluentui/pull/25411) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - exposes new typings to avoid exposing internal methods ([PR #25407](https://github.com/microsoft/fluentui/pull/25407) by bernardo.sunderhus@gmail.com)
  - feat: position updates are handled out of react lifecycle ([PR #25456](https://github.com/microsoft/fluentui/pull/25456) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - exposes internal methods and types that are used in the API surface ([PR #25405](https://github.com/microsoft/fluentui/pull/25405) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-tooltip`
  - removes exposing of internal type FluentTriggerComponent ([PR #25409](https://github.com/microsoft/fluentui/pull/25409) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - feat: exposes internal methods that are used in the API surface ([PR #25406](https://github.com/microsoft/fluentui/pull/25406) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - fix: Removing gaps between ::after pseudo-element and AvatarGroupItem/AvatarGroupPopover." ([PR #25382](https://github.com/microsoft/fluentui/pull/25382) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore: Migrate to new package structure. ([PR #25360](https://github.com/microsoft/fluentui/pull/25360) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25469](https://github.com/microsoft/fluentui/pull/25469) by tristan.watanabe@gmail.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25470](https://github.com/microsoft/fluentui/pull/25470) by tristan.watanabe@gmail.com)
- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25471](https://github.com/microsoft/fluentui/pull/25471) by tristan.watanabe@gmail.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - refactor: usePortalMount node updates mount node attributes in memo ([PR #25456](https://github.com/microsoft/fluentui/pull/25456) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - Adding cursor pointer to the Slider component ([PR #25184](https://github.com/microsoft/fluentui/pull/25184) by petrduda@microsoft.com)
  - fix: Pad in slider so the thumb does not render outside the bounds of the root element ([PR #25378](https://github.com/microsoft/fluentui/pull/25378) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - make allowCondition a optional parameter for findAllFocusable function ([PR #25416](https://github.com/microsoft/fluentui/pull/25416) by marcosvmmoura@gmail.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-field`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-persona`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - fix: update styles based on design review ([PR #24339](https://github.com/microsoft/fluentui/pull/24339) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25359](https://github.com/microsoft/fluentui/pull/25359) by tristan.watanabe@gmail.com)
- `@fluentui/react-table`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - feat: Initialize DataGrid components ([PR #25442](https://github.com/microsoft/fluentui/pull/25442) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - chore: Update Griffel to latest version ([PR #25412](https://github.com/microsoft/fluentui/pull/25412) by olfedias@microsoft.com)
  - chore: remove dependencies on Fluent UI v8 ([PR #25466](https://github.com/microsoft/fluentui/pull/25466) by olfedias@microsoft.com)

## [9.6.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.6.1)

Wed, 26 Oct 2022 18:05:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.6.0..@fluentui/react-components_v9.6.1)

### Patches

- `@fluentui/react-components`
  - feat: export react-table logic hooks ([PR #25386](https://github.com/microsoft/fluentui/pull/25386) by bernardo.sunderhus@gmail.com)

## [9.6.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.6.0)

Tue, 25 Oct 2022 22:09:49 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.5.3..@fluentui/react-components_v9.6.0)

### Minor changes

- `@fluentui/react-components`
  - fix: Change react-persona to pinned version. ([PR #25367](https://github.com/microsoft/fluentui/pull/25367) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-components`
  - fix: Export PopoverTriggerChildProps ([PR #25159](https://github.com/microsoft/fluentui/pull/25159) by lingfangao@hotmail.com)

## [9.5.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.5.3)

Tue, 25 Oct 2022 00:35:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.5.2..@fluentui/react-components_v9.5.3)

### Patches

- `@fluentui/react-avatar`
  - fix: Add undefined option to overflowItems in partitionAvatarGroupItems. ([PR #25310](https://github.com/microsoft/fluentui/pull/25310) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - chore: Migrate to new package structure. ([PR #25335](https://github.com/microsoft/fluentui/pull/25335) by tristan.watanabe@gmail.com)
- `@fluentui/react-button`
  - chore: Migrate to new package structure. ([PR #25336](https://github.com/microsoft/fluentui/pull/25336) by tristan.watanabe@gmail.com)
- `@fluentui/react-checkbox`
  - chore: Migrate to new package structure. ([PR #25337](https://github.com/microsoft/fluentui/pull/25337) by tristan.watanabe@gmail.com)
- `@fluentui/react-components`
  - feat: add react-progress to react-components/unstable ([PR #25226](https://github.com/microsoft/fluentui/pull/25226) by ololubek@microsoft.com)
  - chore: Export missing partitionAvatarGroupItems in unstable. ([PR #25310](https://github.com/microsoft/fluentui/pull/25310) by esteban.230@hotmail.com)
  - chore: Updating react-persona's version. ([PR #25357](https://github.com/microsoft/fluentui/pull/25357) by esteban.230@hotmail.com)
- `@fluentui/react-dialog`
  - bugfix: adds cursor pointer style to dialog close button ([PR #25265](https://github.com/microsoft/fluentui/pull/25265) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-image`
  - chore: Migrate to new package structure. ([PR #25230](https://github.com/microsoft/fluentui/pull/25230) by tristan.watanabe@gmail.com)
- `@fluentui/react-spinbutton`
  - feat: updates internal SpinButton padding ([PR #25286](https://github.com/microsoft/fluentui/pull/25286) by seanmonahan@microsoft.com)
- `@fluentui/react-text`
  - chore: Migrate to new package structure. ([PR #25231](https://github.com/microsoft/fluentui/pull/25231) by tristan.watanabe@gmail.com)

### Changes

- `@fluentui/react-components`
  - Add uncomplete Input scenario ([PR #21651](https://github.com/microsoft/fluentui/pull/21651) by adam.samec@gmail.com)
- `@fluentui/react-field`
  - feat: Add support for validationState to ProgressField ([PR #25253](https://github.com/microsoft/fluentui/pull/25253) by behowell@microsoft.com)
- `@fluentui/react-persona`
  - chore: Change version back to beta. ([PR #25357](https://github.com/microsoft/fluentui/pull/25357) by esteban.230@hotmail.com)
- `@fluentui/react-progress`
  - feat: Add validationState to Progress, to make the bar red or green ([PR #25253](https://github.com/microsoft/fluentui/pull/25253) by behowell@microsoft.com)
  - feat: add react-progress to react-components/unstable ([PR #25226](https://github.com/microsoft/fluentui/pull/25226) by ololubek@microsoft.com)

## [9.5.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.5.2)

Thu, 20 Oct 2022 08:39:25 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.5.1..@fluentui/react-components_v9.5.2)

### Minor changes

- `@fluentui/react-tabster`
  - feat: Bump tabster to 3.0.4 ([PR #25294](https://github.com/microsoft/fluentui/pull/25294) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - fix: Fixing the styles of Buttons rendered as anchor tags. ([PR #25250](https://github.com/microsoft/fluentui/pull/25250) by makotom@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-context-selector`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-dialog`
  - chore: updates disallowed change types ([PR #25214](https://github.com/microsoft/fluentui/pull/25214) by bernardo.sunderhus@gmail.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - feat: Add red border when aria-invalid is set ([PR #25252](https://github.com/microsoft/fluentui/pull/25252) by behowell@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-link`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - fix: Menu trigger should be focused when dismissed by menuitem click ([PR #25289](https://github.com/microsoft/fluentui/pull/25289) by lingfangao@hotmail.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Migrate to new package structure ([PR #25015](https://github.com/microsoft/fluentui/pull/25015) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-persona`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-popover`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-portal`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: Bump react peer dependency to react 18. ([PR #25278](https://github.com/microsoft/fluentui/pull/25278) by mgodbolt@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - chore: Bump react peer dependency to react 18. ([PR #25278](https://github.com/microsoft/fluentui/pull/25278) by mgodbolt@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-provider`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: Bump react peer dependency to react 18. ([PR #25278](https://github.com/microsoft/fluentui/pull/25278) by mgodbolt@microsoft.com)
- `@fluentui/react-slider`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25240](https://github.com/microsoft/fluentui/pull/25240) by tristan.watanabe@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - feat: Add red border when aria-invalid is set ([PR #25252](https://github.com/microsoft/fluentui/pull/25252) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-switch`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Migrate to new package structure. ([PR #25241](https://github.com/microsoft/fluentui/pull/25241) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - feat: Disabling default browser outline should be an option ([PR #25202](https://github.com/microsoft/fluentui/pull/25202) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - feat: Add red border when aria-invalid is set ([PR #25252](https://github.com/microsoft/fluentui/pull/25252) by behowell@microsoft.com)
- `@fluentui/react-theme`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - chore: Bump react peer dependency to react 18. ([PR #25278](https://github.com/microsoft/fluentui/pull/25278) by mgodbolt@microsoft.com)
- `@fluentui/react-accordion`
  - chore: Migrate to new package structure. ([PR #25196](https://github.com/microsoft/fluentui/pull/25196) by tristan.watanabe@gmail.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-aria`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)

### Changes

- `@fluentui/react-card`
  - chore: Migrate to new package structure. ([PR #25229](https://github.com/microsoft/fluentui/pull/25229) by tristan.watanabe@gmail.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - feat: Add red border when aria-invalid is set ([PR #25252](https://github.com/microsoft/fluentui/pull/25252) by behowell@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump react peer dependency to react 18. ([PR #25278](https://github.com/microsoft/fluentui/pull/25278) by mgodbolt@microsoft.com)
- `@fluentui/react-field`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-progress`
  - feat: Add shape prop to Progress ([PR #25219](https://github.com/microsoft/fluentui/pull/25219) by ololubek@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - feat: Add red border when aria-invalid is set ([PR #25252](https://github.com/microsoft/fluentui/pull/25252) by behowell@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - fix: Row and header interactive styles are separate ([PR #25201](https://github.com/microsoft/fluentui/pull/25201) by lingfangao@hotmail.com)
  - feat(TableSelectionCell): Use Radio component, adds subtle and hidden ([PR #25202](https://github.com/microsoft/fluentui/pull/25202) by lingfangao@hotmail.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - feat: Add `appearance` prop to `TableRow` ([PR #25192](https://github.com/microsoft/fluentui/pull/25192) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/global-context`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
- `@fluentui/react-alert`
  - chore: Bump peer deps to support React 18 ([PR #24972](https://github.com/microsoft/fluentui/pull/24972) by mgodbolt@microsoft.com)
  - chore: Migrate to new package structure. ([PR #25197](https://github.com/microsoft/fluentui/pull/25197) by tristan.watanabe@gmail.com)
  - chore: Update Griffel to latest version ([PR #25212](https://github.com/microsoft/fluentui/pull/25212) by olfedias@microsoft.com)

## [9.5.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.5.1)

Thu, 13 Oct 2022 12:56:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.5.0..@fluentui/react-components_v9.5.1)

### Minor changes

- `@fluentui/react-menu`
  - feat: adds disableButtonEnhancement property on MenuTrigger ([PR #25112](https://github.com/microsoft/fluentui/pull/25112) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - feat: adds disableButtonEnhancement property on PopoverTrigger ([PR #25112](https://github.com/microsoft/fluentui/pull/25112) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/react-dialog`
  - feat: adds disableButtonEnhancement property on DialogTrigger ([PR #25112](https://github.com/microsoft/fluentui/pull/25112) by bernardo.sunderhus@gmail.com)

## [9.5.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.5.0)

Thu, 13 Oct 2022 11:02:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.4.0..@fluentui/react-components_v9.5.0)

### Minor changes

- `@fluentui/react-components`
  - feat: Re-export Portal component and related bits ([PR #25047](https://github.com/microsoft/fluentui/pull/25047) by mgodbolt@microsoft.com)
  - feat: react-dialog stable release ([PR #25181](https://github.com/microsoft/fluentui/pull/25181) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - feat: Adding subtle transition between states on Button components. ([PR #25106](https://github.com/microsoft/fluentui/pull/25106) by makotom@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - docs: update Icon docs with examples ([PR #24768](https://github.com/microsoft/fluentui/pull/24768) by ololubek@microsoft.com)
- `@fluentui/react-dialog`
  - feat: react-dialog stable release ([PR #25181](https://github.com/microsoft/fluentui/pull/25181) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-divider`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - chore: improves MenuTrigger types ([PR #25044](https://github.com/microsoft/fluentui/pull/25044) by bernardo.sunderhus@gmail.com)
  - fix: Menu trigger should be focused when menu is closed with keyboard ([PR #25165](https://github.com/microsoft/fluentui/pull/25165) by lingfangao@hotmail.com)
- `@fluentui/react-persona`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - chore: Add unit and conformance tests. ([PR #25007](https://github.com/microsoft/fluentui/pull/25007) by esteban.230@hotmail.com)
  - chore: Adding bundle-size command for bundle-size fixtures. ([PR #25055](https://github.com/microsoft/fluentui/pull/25055) by esteban.230@hotmail.com)
- `@fluentui/react-popover`
  - chore: improves PopoverTrigger types ([PR #25044](https://github.com/microsoft/fluentui/pull/25044) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - fix `usePositioning` to reset `overrideTargetRef` when target in hook options is undefined ([PR #25135](https://github.com/microsoft/fluentui/pull/25135) by yuanboxue@microsoft.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: improves Tooltip types ([PR #25044](https://github.com/microsoft/fluentui/pull/25044) by bernardo.sunderhus@gmail.com)
  - fix: The Tooltip should not hide if it gets keyboard focus ([PR #25138](https://github.com/microsoft/fluentui/pull/25138) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - chore: restricts trigger API types ([PR #25044](https://github.com/microsoft/fluentui/pull/25044) by bernardo.sunderhus@gmail.com)

### Changes

- `@fluentui/priority-overflow`
  - feat: Adds API to register overflow menus for better available space calculation ([PR #25091](https://github.com/microsoft/fluentui/pull/25091) by lingfangao@hotmail.com)
  - new overflow items should only be enqueued while observing ([PR #25122](https://github.com/microsoft/fluentui/pull/25122) by lingfangao@hotmail.com)
- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - fix: add ScrollIntoView hook for Listbox options ([PR #25080](https://github.com/microsoft/fluentui/pull/25080) by sarah.higley@microsoft.com)
  - feat: export contexts from react-combobox ([PR #25099](https://github.com/microsoft/fluentui/pull/25099) by sarah.higley@microsoft.com)
  - fix: Dropdown arrow icon layout when no placeholder or value is present ([PR #25049](https://github.com/microsoft/fluentui/pull/25049) by sarah.higley@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-dialog`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - feat: focus on surface if no focusable element is available ([PR #25173](https://github.com/microsoft/fluentui/pull/25173) by bernardo.sunderhus@gmail.com)
  - chore: improves DialogTrigger types ([PR #25044](https://github.com/microsoft/fluentui/pull/25044) by bernardo.sunderhus@gmail.com)
  - chore: cleanups in types ([PR #25070](https://github.com/microsoft/fluentui/pull/25070) by bernardo.sunderhus@gmail.com)
  - fix: aria-* properties should be reassignable ([PR #25092](https://github.com/microsoft/fluentui/pull/25092) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - Add ProgressField to @fluentui/react-field ([PR #25103](https://github.com/microsoft/fluentui/pull/25103) by ololubek@microsoft.com)
  - fix: CheckboxField to set a generated ID on the input, to match the label's htmlFor ([PR #25079](https://github.com/microsoft/fluentui/pull/25079) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - fix: Field should have block layout, not inline ([PR #25126](https://github.com/microsoft/fluentui/pull/25126) by behowell@microsoft.com)
- `@fluentui/react-overflow`
  - fix: useOverflowMenu should register overflow menu ([PR #25091](https://github.com/microsoft/fluentui/pull/25091) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-progress`
  - chore: Add vr and conformance tests. ([PR #25105](https://github.com/microsoft/fluentui/pull/25105) by ololubek@microsoft.com)
  - Add justify-self styling to Progress styles ([PR #25103](https://github.com/microsoft/fluentui/pull/25103) by ololubek@microsoft.com)
  - Add documentation ([PR #25194](https://github.com/microsoft/fluentui/pull/25194) by ololubek@microsoft.com)
  - fix: Progress should set aria-valuemin and aria-valuemax when the value is 0 ([PR #25198](https://github.com/microsoft/fluentui/pull/25198) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)
  - BREAKING: refactor `useTable` to be composable ([PR #24947](https://github.com/microsoft/fluentui/pull/24947) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - fix: Toolbar selection should work ([PR #25153](https://github.com/microsoft/fluentui/pull/25153) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #25075](https://github.com/microsoft/fluentui/pull/25075) by olfedias@microsoft.com)

## [9.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.4.0)

Mon, 03 Oct 2022 22:24:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.3.2..@fluentui/react-components_v9.4.0)

### Minor changes

- `@fluentui/react-avatar`
  - feat: Implement avatar context for slot overrides ([PR #24807](https://github.com/microsoft/fluentui/pull/24807) by lingfangao@hotmail.com)
  - feat: Avatar's aria label includes 'active' or 'inactive' when using the active prop ([PR #24901](https://github.com/microsoft/fluentui/pull/24901) by behowell@microsoft.com)
- `@fluentui/react-components`
  - feat: Moving Persona to unstable. ([PR #25008](https://github.com/microsoft/fluentui/pull/25008) by esteban.230@hotmail.com)
- `@fluentui/react-input`
  - chore: Deprecating filled with shadow appearance variant. ([PR #24900](https://github.com/microsoft/fluentui/pull/24900) by esteban.230@hotmail.com)
- `@fluentui/react-persona`
  - feat: Publishing package. ([PR #25008](https://github.com/microsoft/fluentui/pull/25008) by esteban.230@hotmail.com)

### Patches

- `@fluentui/react-aria`
  - chore: user defined tabIndex should prevail aria-button defined ([PR #24962](https://github.com/microsoft/fluentui/pull/24962) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - fix: Make AvatarGroupPopover's focus indicator the same for all layouts. ([PR #25006](https://github.com/microsoft/fluentui/pull/25006) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - fix: CounterBadge now always renders its children if provided ([PR #24916](https://github.com/microsoft/fluentui/pull/24916) by behowell@microsoft.com)
- `@fluentui/react-checkbox`
  - fix: Checkbox's label shouldn't have a pointer cursor when disabled ([PR #25018](https://github.com/microsoft/fluentui/pull/25018) by behowell@microsoft.com)
  - fix: Making the hidden input only cover the indicator and not also the label. ([PR #24638](https://github.com/microsoft/fluentui/pull/24638) by makotom@microsoft.com)
- `@fluentui/react-components`
  - feat: exports DialogContent as unstable ([PR #24943](https://github.com/microsoft/fluentui/pull/24943) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-menu`
  - fix: Menu triggers no longer take focus when they are mounted ([PR #25016](https://github.com/microsoft/fluentui/pull/25016) by behowell@microsoft.com)
- `@fluentui/react-persona`
  - docs: Add migration guide. ([PR #25022](https://github.com/microsoft/fluentui/pull/25022) by esteban.230@hotmail.com)
- `@fluentui/react-popover`
  - fix: update popover role to be note when it does not trap focus ([PR #24897](https://github.com/microsoft/fluentui/pull/24897) by sarah.higley@microsoft.com)
- `@fluentui/react-radio`
  - fix: Making the hidden input only cover the indicator and not also the label. ([PR #25025](https://github.com/microsoft/fluentui/pull/25025) by humberto_makoto@hotmail.com)
- `@fluentui/react-switch`
  - fix: Making the hidden input only cover the indicator and not also the label. ([PR #24638](https://github.com/microsoft/fluentui/pull/24638) by makotom@microsoft.com)
  - fix: Switch's label shouldn't have a pointer cursor when disabled ([PR #25026](https://github.com/microsoft/fluentui/pull/25026) by behowell@microsoft.com)
- `@fluentui/react-tabster`
  - fix: focus outline selectors are data attributes ([PR #24994](https://github.com/microsoft/fluentui/pull/24994) by lingfangao@hotmail.com)
- `@fluentui/react-textarea`
  - chore: Deprecating filled with shadow appearance variant. ([PR #24900](https://github.com/microsoft/fluentui/pull/24900) by esteban.230@hotmail.com)

### Changes

- `@fluentui/react-dialog`
  - feat: removes DialogSurface native dialog support  ([PR #24979](https://github.com/microsoft/fluentui/pull/24979) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - fix: Remove SwitchField's labelPosition prop, as it has no effect ([PR #24876](https://github.com/microsoft/fluentui/pull/24876) by behowell@microsoft.com)
- `@fluentui/react-table`
  - feat: `noNativeElements` renders a flex layout ([PR #24913](https://github.com/microsoft/fluentui/pull/24913) by lingfangao@hotmail.com)
  - feat: Use AvatarContext to override avatar size ([PR #24807](https://github.com/microsoft/fluentui/pull/24807) by lingfangao@hotmail.com)

## [9.3.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.3.2)

Fri, 23 Sep 2022 10:32:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.3.1..@fluentui/react-components_v9.3.2)

### Patches

- `@fluentui/react-menu`
  - fix: Make Menu openOnHover prop work again ([PR #24899](https://github.com/microsoft/fluentui/pull/24899) by behowell@microsoft.com)

### Changes

- `@fluentui/react-dialog`
  - feat: implements DialogContent as a swap of DialogBody ([PR #24855](https://github.com/microsoft/fluentui/pull/24855) by bernardo.sunderhus@gmail.com)

## [9.3.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.3.1)

Tue, 20 Sep 2022 20:55:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.3.0..@fluentui/react-components_v9.3.1)

### Minor changes

- `@fluentui/react-textarea`
  - feat: Adding filled with shadow appearance. ([PR #24512](https://github.com/microsoft/fluentui/pull/24512) by esteban.230@hotmail.com)
- `@fluentui/react-divider`
  - fix: Divider - allow props to override default values ([PR #24840](https://github.com/microsoft/fluentui/pull/24840) by mgodbolt@microsoft.com)
- `@fluentui/react-menu`
  - feat: replace keydown handlers by useARIAButtonShorthand on MenuItem ([PR #24738](https://github.com/microsoft/fluentui/pull/24738) by bernardo.sunderhus@gmail.com)

### Patches

- `@fluentui/react-tooltip`
  - bugfix: stops propagation on Escape key ([PR #24810](https://github.com/microsoft/fluentui/pull/24810) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - fix: export `tableCellActionsClassNames` from unstable ([PR #24830](https://github.com/microsoft/fluentui/pull/24830) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-table`
  - feat: Adds `visible` prop to `TableCellActions` ([PR #24831](https://github.com/microsoft/fluentui/pull/24831) by lingfangao@hotmail.com)
  - fix: `TableCellActions` displays correctly inside `TableHeaderCell` ([PR #24829](https://github.com/microsoft/fluentui/pull/24829) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-griffel`
  - bump react-conformance ([PR #24870](https://github.com/microsoft/fluentui/pull/24870) by mgodbolt@microsoft.com)
- `@fluentui/react-dialog`
  - bugfix(react-dialog): Adds color style to DialogSurface ([PR #24832](https://github.com/microsoft/fluentui/pull/24832) by bernardo.sunderhus@gmail.com)

## [9.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.3.0)

Thu, 15 Sep 2022 09:48:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.2.0..@fluentui/react-components_v9.3.0)

### Minor changes

- `@fluentui/react-utilities`
  - feat: add dialog properties to getNativeElementProps ([PR #24698](https://github.com/microsoft/fluentui/pull/24698) by bernardo.sunderhus@gmail.com)
  - fix: Replace deprecated ReactNodeArray for React 17 support. ([PR #24356](https://github.com/microsoft/fluentui/pull/24356) by tristan.watanabe@gmail.com)
  - feat(react-utilities): adds isResolvedShorthand guard method ([PR #24535](https://github.com/microsoft/fluentui/pull/24535) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-input`
  - feat: Adding optional shadow to filled appearances. ([PR #24730](https://github.com/microsoft/fluentui/pull/24730) by esteban.230@hotmail.com)
- `@fluentui/react-menu`
  - chore(react-menu): Updates trigger to use useARIAButton ([PR #24177](https://github.com/microsoft/fluentui/pull/24177) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-popover`
  - chore(react-popover): Updates trigger to use useARIAButton ([PR #24177](https://github.com/microsoft/fluentui/pull/24177) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - feat: Upgrade to Floating UI v1 ([PR #24254](https://github.com/microsoft/fluentui/pull/24254) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - feat: Add Body2 ([PR #24378](https://github.com/microsoft/fluentui/pull/24378) by miroslav.stastny@microsoft.com)
- `@fluentui/react-theme`
  - feat: Add fontWeightBold, add Body2, fix font weight for *Stronger typography ([PR #24378](https://github.com/microsoft/fluentui/pull/24378) by miroslav.stastny@microsoft.com)
- `@fluentui/react-aria`
  - feat: add helper types to assist DOM element handling ([PR #24722](https://github.com/microsoft/fluentui/pull/24722) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - feat: Adding functionality to AvatarGroupOverflow and updating AvatarGroup to use AvatarGroupOverflow. ([PR #24115](https://github.com/microsoft/fluentui/pull/24115) by esteban.230@hotmail.com)
  - chore: Renaming AvatarGroupOverflow to AvatarGroupPopover. ([PR #24338](https://github.com/microsoft/fluentui/pull/24338) by esteban.230@hotmail.com)
  - feat: Add pie layout implementation. ([PR #24241](https://github.com/microsoft/fluentui/pull/24241) by esteban.230@hotmail.com)
- `@fluentui/react-components`
  - feat: re-export GriffelRenderer type ([PR #24202](https://github.com/microsoft/fluentui/pull/24202) by olfedias@microsoft.com)

### Patches

- `@fluentui/react-tooltip`
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
  - fix: add microdata properties to allowed html properties ([PR #24652](https://github.com/microsoft/fluentui/pull/24652) by yuanboxue@microsoft.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
- `@fluentui/react-divider`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - fix: Remove box-shadow from filled appearances. ([PR #24491](https://github.com/microsoft/fluentui/pull/24491) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - fix: add type=button when rendered as a button ([PR #24327](https://github.com/microsoft/fluentui/pull/24327) by sarah.higley@microsoft.com)
  - fix: Replacing bottom border styles with text decoration underline. ([PR #24734](https://github.com/microsoft/fluentui/pull/24734) by humberto_makoto@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - bugfix: stops propagation on Escape keydown ([PR #24750](https://github.com/microsoft/fluentui/pull/24750) by bernardo.sunderhus@gmail.com)
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - fix: Allow PopoverSurface to trap focus when it's focusable. ([PR #24134](https://github.com/microsoft/fluentui/pull/24134) by esteban.230@hotmail.com)
  - bugfix: stops propagation on Escape keydown ([PR #24750](https://github.com/microsoft/fluentui/pull/24750) by bernardo.sunderhus@gmail.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-portal-compat`
  - fix: Portal compat should apply `focus-visible` ponyfill ([PR #24712](https://github.com/microsoft/fluentui/pull/24712) by lingfangao@hotmail.com)
- `@fluentui/react-portal-compat-context`
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - chore: fix no-context-default-value lint violations for cxe ([PR #24277](https://github.com/microsoft/fluentui/pull/24277) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
- `@fluentui/react-spinner`
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - (patch): Add line-height styling to Spinner ([PR #24643](https://github.com/microsoft/fluentui/pull/24643) by ololubek@microsoft.com)
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - (chore): Remove appearance conditional from Spinner slot styling ([PR #24480](https://github.com/microsoft/fluentui/pull/24480) by ololubek@microsoft.com)
- `@fluentui/react-switch`
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
- `@fluentui/react-tabs`
  - fix: add type=button to root slot  ([PR #24327](https://github.com/microsoft/fluentui/pull/24327) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - fix: Remove provider classname from focus styles ([PR #24710](https://github.com/microsoft/fluentui/pull/24710) by lingfangao@hotmail.com)
  - fix: Bumps tabster to 2.1.2 and removes deep import for KeyborgCallback ([PR #24376](https://github.com/microsoft/fluentui/pull/24376) by lingfangao@hotmail.com)
  - chore: Exports `applyFocusVisible` as internal ([PR #24712](https://github.com/microsoft/fluentui/pull/24712) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - fix: Change filled appearances' normal state's token. ([PR #24701](https://github.com/microsoft/fluentui/pull/24701) by esteban.230@hotmail.com)
  - fix: disabled textarea uses semantic contrast theme border color ([PR #24311](https://github.com/microsoft/fluentui/pull/24311) by sarah.higley@microsoft.com)
- `@fluentui/react-theme`
  - fix: update token values to fix failing color contrast ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - fix: update color neutral background inverted color in teams dark ([PR #24494](https://github.com/microsoft/fluentui/pull/24494) by seanmonahan@microsoft.com)
  - fix: Update color tokens mapping ([PR #24608](https://github.com/microsoft/fluentui/pull/24608) by miroslav.stastny@microsoft.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - fix: Change colorBrandForeground2 mapping in teamsDark theme ([PR #24579](https://github.com/microsoft/fluentui/pull/24579) by miroslav.stastny@microsoft.com)
  - fix: Swap Background1 and Foreground1 in HC color palette ([PR #24498](https://github.com/microsoft/fluentui/pull/24498) by miroslav.stastny@microsoft.com)
- `@fluentui/react-accordion`
  - chore: fix no-context-default-value lint violations for cxe ([PR #24277](https://github.com/microsoft/fluentui/pull/24277) by lingfangao@hotmail.com)
  - fix(Refactor accordion expandIcon styling) ([PR #24597](https://github.com/microsoft/fluentui/pull/24597) by ololubek@microsoft.com)
  - fix: add type=button to button slot ([PR #24327](https://github.com/microsoft/fluentui/pull/24327) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-aria`
  - docs(react-aria): re-generate api.md ([PR #23369](https://github.com/microsoft/fluentui/pull/23369) by martinhochel@microsoft.com)
  - chore(react-aria): improve internal typings ([PR #24742](https://github.com/microsoft/fluentui/pull/24742) by bernardo.sunderhus@gmail.com)
  - feat: upgrade typings on useARIAButtonProps to be more specific ([PR #24177](https://github.com/microsoft/fluentui/pull/24177) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - chore: Change content to render as ul and list item to render as li. ([PR #24347](https://github.com/microsoft/fluentui/pull/24347) by esteban.230@hotmail.com)
  - chore: Cleaning up use of AvatarGroup context. ([PR #24459](https://github.com/microsoft/fluentui/pull/24459) by esteban.230@hotmail.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - fix: Making PopoverSurface focusable, moving Overflow aria-label to PopoverSurface, and moving content styles to PopoverSurface. ([PR #24417](https://github.com/microsoft/fluentui/pull/24417) by esteban.230@hotmail.com)
  - fix: Set aria-hidden to AvatarGroupItem's label. ([PR #24359](https://github.com/microsoft/fluentui/pull/24359) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - chore: Update tests and add e2e tests. ([PR #24348](https://github.com/microsoft/fluentui/pull/24348) by esteban.230@hotmail.com)
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - chore: fix no-context-default-value lint violations for cxe ([PR #24277](https://github.com/microsoft/fluentui/pull/24277) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - fix: Adding 'aria-expanded=false' to collapsed MenuButtons. ([PR #24782](https://github.com/microsoft/fluentui/pull/24782) by humberto_makoto@hotmail.com)
  - chore: Remove max-width style from Button components. ([PR #24647](https://github.com/microsoft/fluentui/pull/24647) by makotom@microsoft.com)
  - chore: Cleaning up tokens in Button components so they better adhere to the design spec. ([PR #24732](https://github.com/microsoft/fluentui/pull/24732) by humberto_makoto@hotmail.com)
  - fix: Wrapping long text in Button components. ([PR #24682](https://github.com/microsoft/fluentui/pull/24682) by humberto_makoto@hotmail.com)
  - refactor: Replace useMergedEventCallbacks utility with mergeCallbacks ([PR #24152](https://github.com/microsoft/fluentui/pull/24152) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - fix: update color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
- `@fluentui/react-components`
  - feat: Export `TableCellActions` and `TablePrimaryCell` as unstable ([PR #24232](https://github.com/microsoft/fluentui/pull/24232) by lingfangao@hotmail.com)
  - fix: use caret for @fluentui/react-spinbutton ([PR #24206](https://github.com/microsoft/fluentui/pull/24206) by lingfangao@hotmail.com)
  - chore: Stop exporting TablePrimaryCell and associated utilities and types ([PR #24762](https://github.com/microsoft/fluentui/pull/24762) by lingfangao@hotmail.com)
  - feat: Adding missing AvatarGroup exports. ([PR #24770](https://github.com/microsoft/fluentui/pull/24770) by esteban.230@hotmail.com)
  - feat: Remove TableCellPrimaryLayout, adds `appearance` prop to TableCellLayout for primary layout ([PR #24789](https://github.com/microsoft/fluentui/pull/24789) by lingfangao@hotmail.com)
  - feat: Export table cell layout components from unstable ([PR #24773](https://github.com/microsoft/fluentui/pull/24773) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - feat: Export `TableSelectionCell` from unstable ([PR #24252](https://github.com/microsoft/fluentui/pull/24252) by lingfangao@hotmail.com)
  - fix: export ToolbarButton ([PR #24366](https://github.com/microsoft/fluentui/pull/24366) by olfedias@microsoft.com)
  - feat: Add *Field components to @fluentui/react-components/unstable ([PR #24235](https://github.com/microsoft/fluentui/pull/24235) by behowell@microsoft.com)
  - Changed from upgrade to migrate terminology ([PR #24695](https://github.com/microsoft/fluentui/pull/24695) by gcox@microsoft.com)
  - Move Icon Table to new page ([PR #24284](https://github.com/microsoft/fluentui/pull/24284) by ololubek@microsoft.com)

### Changes

- `@fluentui/react-dialog`
  - chore(react-dialog): Updates trigger to use useARIAButtonProps ([PR #24177](https://github.com/microsoft/fluentui/pull/24177) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - chore(react-dialog): removes react-button max-width overrides ([PR #24674](https://github.com/microsoft/fluentui/pull/24674) by bernardo.sunderhus@gmail.com)
  - feat: add scroll lock feature to Dialog ([PR #24375](https://github.com/microsoft/fluentui/pull/24375) by bernardo.sunderhus@gmail.com)
  - feat(react-dialog): moves backdrop slot from Dialog to DialogSurface ([PR #24669](https://github.com/microsoft/fluentui/pull/24669) by bernardo.sunderhus@gmail.com)
  - feat(react-dialog): adds proper style to make DialogBody responsive ([PR #24354](https://github.com/microsoft/fluentui/pull/24354) by bernardo.sunderhus@gmail.com)
  - chore: renames overlay slot to backdrop ([PR #24220](https://github.com/microsoft/fluentui/pull/24220) by bernardo.sunderhus@gmail.com)
  - bugfix: stops propagation on Escape key ([PR #24750](https://github.com/microsoft/fluentui/pull/24750) by bernardo.sunderhus@gmail.com)
  - feat: Adds padding-right style to avoid jumping on scroll lock ([PR #24408](https://github.com/microsoft/fluentui/pull/24408) by bernardo.sunderhus@gmail.com)
  - chore(react-dialog): removes document listener to Escape keydown ([PR #24668](https://github.com/microsoft/fluentui/pull/24668) by bernardo.sunderhus@gmail.com)
  - feat(react-dialog): replace `closeButton` to a more generic `action` slot ([PR #24719](https://github.com/microsoft/fluentui/pull/24719) by bernardo.sunderhus@gmail.com)
  - feat(react-dialog): 1st rule of ARIA for Dialog ([PR #24525](https://github.com/microsoft/fluentui/pull/24525) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-field`
  - Initial release ([PR #24235](https://github.com/microsoft/fluentui/pull/24235) by behowell@microsoft.com)
- `@fluentui/react-overflow`
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-table`
  - implement `useTable` state hook ([PR #24329](https://github.com/microsoft/fluentui/pull/24329) by lingfangao@hotmail.com)
  - feat: Remove TableCellPrimaryLayout, adds `appearance` prop to TableCellLayout for primary layout ([PR #24789](https://github.com/microsoft/fluentui/pull/24789) by lingfangao@hotmail.com)
  - BREAKING: TableCell layouts are handled by layout components ([PR #24762](https://github.com/microsoft/fluentui/pull/24762) by lingfangao@hotmail.com)
  - feat: Implement table cell layout components ([PR #24773](https://github.com/microsoft/fluentui/pull/24773) by lingfangao@hotmail.com)
  - feat: Remove inferred row state and add `rowEnhancer` option ([PR #24346](https://github.com/microsoft/fluentui/pull/24346) by lingfangao@hotmail.com)
  - feat: Implement unstable navigation modes ([PR #24383](https://github.com/microsoft/fluentui/pull/24383) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - refactor(useTable): selection manager to avoid calling multiple hooks ([PR #24377](https://github.com/microsoft/fluentui/pull/24377) by lingfangao@hotmail.com)
  - feat: Implement `TableSelectionCell` ([PR #24252](https://github.com/microsoft/fluentui/pull/24252) by lingfangao@hotmail.com)
  - refactor: Stop using context selector for Table primitives ([PR #24806](https://github.com/microsoft/fluentui/pull/24806) by lingfangao@hotmail.com)
  - feat: autocontrolled `useTable` hook ([PR #24688](https://github.com/microsoft/fluentui/pull/24688) by lingfangao@hotmail.com)
  - feat: Implement `TableCellActions` and `TablePrimaryCell` ([PR #24232](https://github.com/microsoft/fluentui/pull/24232) by lingfangao@hotmail.com)
- `@fluentui/react-theme-sass`
  - feat: add new color tokens ([PR #24027](https://github.com/microsoft/fluentui/pull/24027) by seanmonahan@microsoft.com)
  - feat: Add fontWeightBold ([PR #24378](https://github.com/microsoft/fluentui/pull/24378) by miroslav.stastny@microsoft.com)
  - fix: Rename colorNeutralForegroundInvertedStatic token to colorNeutralForegroundStaticInverted ([PR #24611](https://github.com/microsoft/fluentui/pull/24611) by miroslav.stastny@microsoft.com)
  - feat: add color neutral foreground inverted 2 token ([PR #24494](https://github.com/microsoft/fluentui/pull/24494) by seanmonahan@microsoft.com)
- `@fluentui/react-toolbar`
  - chore: fix no-context-default-value lint violations ([PR #24276](https://github.com/microsoft/fluentui/pull/24276) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
- `@fluentui/react-combobox`
  - fix: typing moves active option in Dropdown ([PR #24437](https://github.com/microsoft/fluentui/pull/24437) by sarah.higley@microsoft.com)
  - fix: Combobox and Dropdown hover/active border colors and padding styles ([PR #24362](https://github.com/microsoft/fluentui/pull/24362) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)
  - fix: Combobox and Dropdown only show option focus outline when navigating by keyboard ([PR #24700](https://github.com/microsoft/fluentui/pull/24700) by sarah.higley@microsoft.com)
  - fix: set popup Listbox width to trigger width ([PR #24733](https://github.com/microsoft/fluentui/pull/24733) by sarah.higley@microsoft.com)
  - fix: open/close combobox on icon click ([PR #24147](https://github.com/microsoft/fluentui/pull/24147) by sarah.higley@microsoft.com)
  - feat: Allow typing by default, add allowFreeform ([PR #23819](https://github.com/microsoft/fluentui/pull/23819) by sarah.higley@microsoft.com)
  - feat: make listbox slot nullable ([PR #24392](https://github.com/microsoft/fluentui/pull/24392) by sarah.higley@microsoft.com)
  - fix: react-combobox change onSelect to onOptionSelect to avoid conflicts with native onSelect ([PR #24550](https://github.com/microsoft/fluentui/pull/24550) by sarah.higley@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #24221](https://github.com/microsoft/fluentui/pull/24221) by olfedias@microsoft.com)

## [9.2.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.2.0)

Wed, 03 Aug 2022 16:03:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.1.1..@fluentui/react-components_v9.2.0)

### Minor changes

- `@fluentui/react-aria`
  - chore: Splits useARIAButton into useARIAButtonProps and useARIAButtonShorthand. ([PR #24032](https://github.com/microsoft/fluentui/pull/24032) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - chore: Updates Button to use useARIAButton over useARIAButtonShorthand ([PR #24032](https://github.com/microsoft/fluentui/pull/24032) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-components`
  - feat: update spinbutton to stable ([PR #23805](https://github.com/microsoft/fluentui/pull/23805) by seanmonahan@microsoft.com)
  - feat: adds react-dialog to react-components unstable ([PR #24140](https://github.com/microsoft/fluentui/pull/24140) by bernardo.sunderhus@gmail.com)
  - chore: Re-exporting useIsomorphicLayoutEffect from @fluentui/react-utilities in @fluentui/react-components. ([PR #24132](https://github.com/microsoft/fluentui/pull/24132) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-provider`
  - fix: Move to useLayoutEffect or useInsertionEffect for Theme Provider theme insertion. ([PR #24061](https://github.com/microsoft/fluentui/pull/24061) by mgodbolt@microsoft.com)
- `@fluentui/react-spinbutton`
  - feat: update spinbutton to stable ([PR #23805](https://github.com/microsoft/fluentui/pull/23805) by seanmonahan@microsoft.com)
- `@fluentui/react-tabster`
  - feat: Adds `ignoreDefaultKeydown` option to `useArrowNavigationGroup` ([PR #24101](https://github.com/microsoft/fluentui/pull/24101) by lingfangao@hotmail.com)
  - feat: create `:focus-visible` and `:focus-within` polyfills ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-accordion`
  - chore: Updates AccordionHeader to use useARIAButtonShorthand over useARIAButton ([PR #24032](https://github.com/microsoft/fluentui/pull/24032) by bernardo.sunderhus@gmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-aria`
  - feat: treats aria-disabled as disabled state on useARIAButtonProps ([PR #24197](https://github.com/microsoft/fluentui/pull/24197) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-avatar`
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-badge`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-button`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-checkbox`
  - refactor: use `useFocusWithin` hook for :focus-within styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-components`
  - feat: Adds `@fluentui/react-table` package to unstable exports ([PR #24182](https://github.com/microsoft/fluentui/pull/24182) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-divider`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-image`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-input`
  - Adds proper initialValue to value on useInput ([PR #24084](https://github.com/microsoft/fluentui/pull/24084) by bernardo.sunderhus@gmail.com)
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-label`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-link`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-menu`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
  - fix: Fix tabbing from within menu ([PR #24101](https://github.com/microsoft/fluentui/pull/24101) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-portal`
  - fix: use `useFocusVisible` hook for :focus-visible styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: enable AMD compatible build ([PR #24052](https://github.com/microsoft/fluentui/pull/24052) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-provider`
  - fix: use `useFocusVisible` hook for :focus-visible styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-radio`
  - refactor: use `useFocusWithin` hook for :focus-within styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-slider`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
  - refactor: use `useFocusWithin` hook for :focus-within styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
- `@fluentui/react-spinbutton`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
- `@fluentui/react-switch`
  - refactor: use `useFocusWithin` hook for :focus-within styles ([PR #24154](https://github.com/microsoft/fluentui/pull/24154) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Bump tabster to 2.1.0 ([PR #23811](https://github.com/microsoft/fluentui/pull/23811) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-text`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-textarea`
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
  - fix: Make <textarea> match its wrapper size and add documentation on changing its height. ([PR #23992](https://github.com/microsoft/fluentui/pull/23992) by esteban.230@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-card`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-combobox`
  - fix: prevent react-combobox keyboard selection of disabled options ([PR #24073](https://github.com/microsoft/fluentui/pull/24073) by sarah.higley@microsoft.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - fix: Griffel conformance test should use user container for render ([PR #24051](https://github.com/microsoft/fluentui/pull/24051) by lingfangao@hotmail.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-dialog`
  - chore: adds aria-labelledby and aria-describedby attributes ([PR #24141](https://github.com/microsoft/fluentui/pull/24141) by bernardo.sunderhus@gmail.com)
  - feat: adds react-dialog to react-components unstable ([PR #24140](https://github.com/microsoft/fluentui/pull/24140) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-overflow`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-select`
  - bugfix: add reduced motion styles for avatar, spinner, switch, and input focus styles ([PR #23788](https://github.com/microsoft/fluentui/pull/23788) by sarah.higley@microsoft.com)
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)
- `@fluentui/react-table`
  - feat: Make sorting more primitive ([PR #24198](https://github.com/microsoft/fluentui/pull/24198) by lingfangao@hotmail.com)
  - feat: Release package in `alpha` ([PR #24182](https://github.com/microsoft/fluentui/pull/24182) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - chore: Bump Griffel dependencies ([PR #24114](https://github.com/microsoft/fluentui/pull/24114) by miroslav.stastny@microsoft.com)

## [9.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.1.1)

Fri, 15 Jul 2022 18:27:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.1.1..@fluentui/react-components_v9.1.1)

### Patches

- `@fluentui/react-portal-compat-context`
  - Added mechanism for marking fluent-compatibility packages ([PR #23923](https://github.com/microsoft/fluentui/pull/23923) by gcox@microsoft.com)

## [9.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.1.1)

Thu, 14 Jul 2022 21:21:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.1.0..@fluentui/react-components_v9.1.1)

### Patches

- `@fluentui/react-menu`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-popover`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-portal`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-positioning`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-provider`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-radio`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-slider`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-spinner`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-switch`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tabs`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tabster`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-text`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-textarea`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-utilities`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-accordion`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-aria`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-avatar`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-badge`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-button`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-checkbox`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-components`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-context-selector`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-divider`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-image`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-input`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-label`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-link`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)

### Changes

- `@fluentui/react-overflow`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-select`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-spinbutton`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-toolbar`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/global-context`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-alert`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-combobox`
  - fix: Fixing bad version bump of @fluentui/react-utilities. ([PR #23920](https://github.com/microsoft/fluentui/pull/23920) by Humberto.Morimoto@microsoft.com)

## [9.1.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.1.0)

Thu, 14 Jul 2022 17:06:12 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.1..@fluentui/react-components_v9.1.0)

### Minor changes

- `@fluentui/react-components`
  - feat(react-card): Added CardHeader CSS variable to control gap ([PR #23449](https://github.com/microsoft/fluentui/pull/23449) by 39736248+andrefcdias@users.noreply.github.com)
  - feat: re-export `__css` from Griffel ([PR #23891](https://github.com/microsoft/fluentui/pull/23891) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - feat: boundary postitioning options can accept `null` ([PR #23839](https://github.com/microsoft/fluentui/pull/23839) by lingfangao@hotmail.com)

### Patches

- `@fluentui/react-avatar`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
  - fix: Remove override of role=list in AvatarGroup's PopoverSurface and fix trapFocus when Popover is triggered. ([PR #23823](https://github.com/microsoft/fluentui/pull/23823) by esteban.230@hotmail.com)
  - fix: Fixing focus indicator for pie layouts. ([PR #23860](https://github.com/microsoft/fluentui/pull/23860) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - Fix font sizes, padding, and colors to align with visual design. ([PR #23379](https://github.com/microsoft/fluentui/pull/23379) by behowell@microsoft.com)
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-button`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-components`
  - fix: Moving slider version to stable. ([PR #23790](https://github.com/microsoft/fluentui/pull/23790) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-portal`
  - fix: `Portal` does not use useIsSSR hook ([PR #23612](https://github.com/microsoft/fluentui/pull/23612) by lingfangao@hotmail.com)
- `@fluentui/react-radio`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-slider`
  - fix: Moving slider version to stable. ([PR #23790](https://github.com/microsoft/fluentui/pull/23790) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-tooltip`
  - fix: update `shouldRenderTooltip` to handle SSR ([PR #23612](https://github.com/microsoft/fluentui/pull/23612) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)

### Changes

- `@fluentui/react-alert`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
  - update Alert with live region attributes ([PR #23284](https://github.com/microsoft/fluentui/pull/23284) by sarah.higley@microsoft.com)
  - feat: Adding avatar slot support to Alert ([PR #23591](https://github.com/microsoft/fluentui/pull/23591) by rohitpag@microsoft.com)
- `@fluentui/react-card`
  - BREAKING CHANGE: new structural and styling approach applied to CardHeader ([PR #23449](https://github.com/microsoft/fluentui/pull/23449) by 39736248+andrefcdias@users.noreply.github.com)
  - feat: add `img` as allowed element for CardPreview's logo slot ([PR #23902](https://github.com/microsoft/fluentui/pull/23902) by 39736248+andrefcdias@users.noreply.github.com)
- `@fluentui/react-combobox`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - fix: Bump react-conformance in react-conformance-griffel to 0.14.0 ([PR #23909](https://github.com/microsoft/fluentui/pull/23909) by lingfangao@hotmail.com)
- `@fluentui/react-select`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update @fluentui/react-icons dependency to v2.0.175 ([PR #23812](https://github.com/microsoft/fluentui/pull/23812) by ololubek@microsoft.com)
  - fix: decrease number of react renders ([PR #23714](https://github.com/microsoft/fluentui/pull/23714) by seanmonahan@microsoft.com)
- `@fluentui/react-utilities`
  - chore: improve error message in useIsSSR() ([PR #23750](https://github.com/microsoft/fluentui/pull/23750) by olfedias@microsoft.com)

## [9.0.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.1)

Tue, 28 Jun 2022 17:39:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0..@fluentui/react-components_v9.0.1)

### Patches

- `@fluentui/react-accordion`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-input`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-radio`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-spinner`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-tabs`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-textarea`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-alert`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-card`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-combobox`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-griffel`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-overflow`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-select`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-spinbutton`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)
- `@fluentui/react-toolbar`
  - fix: Use caret dependency range for Griffel ([PR #23754](https://github.com/microsoft/fluentui/pull/23754) by lingfangao@hotmail.com)

## [9.0.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0)

Tue, 28 Jun 2022 15:13:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.15..@fluentui/react-components_v9.0.0)

### Patches

- `@fluentui/react-tabster`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-textarea`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-theme`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-input`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-portal-compat`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-portal-compat-context`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-radio`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-spinner`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-tabs`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/keyboard-keys`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - feat: Initial 9.0.0 release ([PR #23733](https://github.com/microsoft/fluentui/pull/23733) by lingfangao@hotmail.com)

### Changes

- `@fluentui/react-tabster`
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - feat: Add new `legacyTrapFocus` option to `useModalAttributes` ([PR #23598](https://github.com/microsoft/fluentui/pull/23598) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-textarea`
  - fix: Adding missing spacing to top+bottom padding, font family to large variant, and min-height to size variants. ([PR #23478](https://github.com/microsoft/fluentui/pull/23478) by esteban.230@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-theme-sass`
  - Add SASS variables mapped to CSS variables provided by react-theme ([PR #22964](https://github.com/microsoft/fluentui/pull/22964) by miroslav.stastny@microsoft.com)
  - fix(react-theme-sass): Remove color palette tokens which are no longer present in react-theme ([PR #23691](https://github.com/microsoft/fluentui/pull/23691) by miroslav.stastny@microsoft.com)
- `@fluentui/react-toolbar`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - fix: useOnClickOutside should trigger for webviews ([PR #23535](https://github.com/microsoft/fluentui/pull/23535) by jukapsia@microsoft.com)
  - feat: add void function component support to slots ([PR #23408](https://github.com/microsoft/fluentui/pull/23408) by 39736248+andrefcdias@users.noreply.github.com)
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - chore: moves trigger methods to separate folder ([PR #23574](https://github.com/microsoft/fluentui/pull/23574) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-button`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - README and migration guide cleanup. ([PR #23395](https://github.com/microsoft/fluentui/pull/23395) by Humberto.Morimoto@microsoft.com)
  - Button: Adding missing forced color adjust overrides. ([PR #23387](https://github.com/microsoft/fluentui/pull/23387) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Button: Fixing hover styles in High Contrast mode. ([PR #23384](https://github.com/microsoft/fluentui/pull/23384) by Humberto.Morimoto@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - feat: add `orientation` prop ([PR #23037](https://github.com/microsoft/fluentui/pull/23037) by 39736248+andrefcdias@users.noreply.github.com)
  - chore: add basic API documentation ([PR #23410](https://github.com/microsoft/fluentui/pull/23410) by 39736248+andrefcdias@users.noreply.github.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - feat: Add focus indicators ([PR #23456](https://github.com/microsoft/fluentui/pull/23456) by 39736248+andrefcdias@users.noreply.github.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - README, spec and migration guide cleanup. ([PR #23395](https://github.com/microsoft/fluentui/pull/23395) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - fix: Removing user-select: 'none' from label. ([PR #23590](https://github.com/microsoft/fluentui/pull/23590) by Humberto.Morimoto@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-combobox`
  - add combobox to preview components ([PR #23744](https://github.com/microsoft/fluentui/pull/23744) by sarah.higley@microsoft.com)
- `@fluentui/react-components`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on packages that use @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Re-exporting AvatarGroup and AvatarGroupItem in unstable. ([PR #23573](https://github.com/microsoft/fluentui/pull/23573) by esteban.230@hotmail.com)
  - add combobox to preview components ([PR #23744](https://github.com/microsoft/fluentui/pull/23744) by sarah.higley@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - README, spec and migration guide cleanup. ([PR #23439](https://github.com/microsoft/fluentui/pull/23439) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-image`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - README, spec and migration guide cleanup for react-image. ([PR #23447](https://github.com/microsoft/fluentui/pull/23447) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-input`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Fixing mention of SpinButton in README. ([PR #23424](https://github.com/microsoft/fluentui/pull/23424) by Humberto.Morimoto@microsoft.com)
  - README and migration guide cleanup. ([PR #23395](https://github.com/microsoft/fluentui/pull/23395) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - fix: improve internal typings ([PR #23574](https://github.com/microsoft/fluentui/pull/23574) by bernardo.sunderhus@gmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - fix: submenu indicator should be filled on hover ([PR #23331](https://github.com/microsoft/fluentui/pull/23331) by yuanboxue@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - fix: Use modern `::before` pseudoelement ([PR #23357](https://github.com/microsoft/fluentui/pull/23357) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - feat: Close context menu on scroll, new closeOnScroll prop ([PR #23351](https://github.com/microsoft/fluentui/pull/23351) by lingfangao@hotmail.com)
- `@fluentui/react-overflow`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - fix: do not throw in SSR ([PR #23372](https://github.com/microsoft/fluentui/pull/23372) by olfedias@microsoft.com)
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - feat: Adds `legacyTrapFocus` prop ([PR #23598](https://github.com/microsoft/fluentui/pull/23598) by lingfangao@hotmail.com)
  - Updates getTriggerChild internal usage ([PR #23574](https://github.com/microsoft/fluentui/pull/23574) by bernardo.sunderhus@gmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - fix: Add arrow padding to Popover arrrow ([PR #23607](https://github.com/microsoft/fluentui/pull/23607) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - feat: apply zIndex to Portal ([PR #22933](https://github.com/microsoft/fluentui/pull/22933) by olfedias@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - fix: update to create new stacking context ([PR #23507](https://github.com/microsoft/fluentui/pull/23507) by olfedias@microsoft.com)
- `@fluentui/react-portal-compat`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - fix: properly handle text direction in styles ([PR #22936](https://github.com/microsoft/fluentui/pull/22936) by olfedias@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-radio`
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - fix: Removing user-select: 'none' from label. ([PR #23590](https://github.com/microsoft/fluentui/pull/23590) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-select`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - export change data type from select ([PR #23701](https://github.com/microsoft/fluentui/pull/23701) by sarah.higley@microsoft.com)
  - fix: handle "defaultValue" ([PR #23463](https://github.com/microsoft/fluentui/pull/23463) by olfedias@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - add custom onChange with value data to react-select ([PR #23399](https://github.com/microsoft/fluentui/pull/23399) by sarah.higley@microsoft.com)
  - Remove inline prop from Select ([PR #23416](https://github.com/microsoft/fluentui/pull/23416) by sarah.higley@microsoft.com)
- `@fluentui/react-shared-contexts`
  - chore: Mark teams-prg owned APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - README, spec and migration guide cleanup. ([PR #23398](https://github.com/microsoft/fluentui/pull/23398) by Humberto.Morimoto@microsoft.com)
  - README update. ([PR #23439](https://github.com/microsoft/fluentui/pull/23439) by Humberto.Morimoto@microsoft.com)
  - fix: Removing user-select: 'none' from label. ([PR #23590](https://github.com/microsoft/fluentui/pull/23590) by Humberto.Morimoto@microsoft.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-spinbutton`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - fix: Making increment and decrement buttons of SpinButton have 'type=button' instead of 'type=submit'. ([PR #23710](https://github.com/microsoft/fluentui/pull/23710) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-spinner`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - fix: Move role attribute to root slot and update Spinner documentation ([PR #23385](https://github.com/microsoft/fluentui/pull/23385) by ololubek@microsoft.com)
  - undefined ([PR #23503](https://github.com/microsoft/fluentui/pull/23503) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-switch`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - fix: Removing user-select: 'none' from label. ([PR #23590](https://github.com/microsoft/fluentui/pull/23590) by Humberto.Morimoto@microsoft.com)
  - README update. ([PR #23439](https://github.com/microsoft/fluentui/pull/23439) by Humberto.Morimoto@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - fix: Making thumb be vertically centered in Switch. ([PR #23712](https://github.com/microsoft/fluentui/pull/23712) by Humberto.Morimoto@microsoft.com)
  - README, spec and migration guide cleanup. ([PR #23396](https://github.com/microsoft/fluentui/pull/23396) by Humberto.Morimoto@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
- `@fluentui/react-tabs`
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
- `@fluentui/babel-preset-global-context`
  - feat: beta release ([PR #23623](https://github.com/microsoft/fluentui/pull/23623) by lingfangao@hotmail.com)
- `@fluentui/global-context`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - feat: beta release ([PR #23623](https://github.com/microsoft/fluentui/pull/23623) by lingfangao@hotmail.com)
- `@fluentui/priority-overflow`
  - chore: Mark internal APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - fix: Removing user-select: 'none' from AccordionHeader styles. ([PR #23713](https://github.com/microsoft/fluentui/pull/23713) by Humberto.Morimoto@microsoft.com)
  - chore: updates AccordionHeader to follow design spec tokens ([PR #23295](https://github.com/microsoft/fluentui/pull/23295) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-alert`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
- `@fluentui/react-aria`
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Mark internal APIs with @internal ([PR #23689](https://github.com/microsoft/fluentui/pull/23689) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - fix: Fix wrong border radius for outline in webkit browsers. ([PR #23576](https://github.com/microsoft/fluentui/pull/23576) by esteban.230@hotmail.com)
  - Adding AvatarGroupItem implementation and AvatarGroup context. ([PR #23310](https://github.com/microsoft/fluentui/pull/23310) by esteban.230@hotmail.com)
  - chore: Using ::before and ::after instead of :before and :after. ([PR #23469](https://github.com/microsoft/fluentui/pull/23469) by Humberto.Morimoto@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)
  - docs: Adding AvatarGroup stories. ([PR #23493](https://github.com/microsoft/fluentui/pull/23493) by esteban.230@hotmail.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - PresenceBadge accessibility: fix placement of aria-label, sort out Avatar usage and examples ([PR #23256](https://github.com/microsoft/fluentui/pull/23256) by sarah.higley@microsoft.com)
  - Adding layout styles to AvatarGroupItem. ([PR #23468](https://github.com/microsoft/fluentui/pull/23468) by esteban.230@hotmail.com)
  - chore: Adding scheduler as a peer dependency since this package has a dependency on @fluentui/react-context-selector. ([PR #23681](https://github.com/microsoft/fluentui/pull/23681) by Humberto.Morimoto@microsoft.com)
  - Adding layout styles and overflow button styles to AvatarGroup. ([PR #23437](https://github.com/microsoft/fluentui/pull/23437) by esteban.230@hotmail.com)
  - fix: Fixing focus indicator and adding a focus ring to root for the pie layout. ([PR #23528](https://github.com/microsoft/fluentui/pull/23528) by esteban.230@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - chore: Added warning for AvatarGroup to check if children are of type AvatarGroupItem and for AvatarGroupItem to check if it's being used inside an AvatarGroup. ([PR #23498](https://github.com/microsoft/fluentui/pull/23498) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - README, spec and migration guide cleanup. ([PR #23424](https://github.com/microsoft/fluentui/pull/23424) by Humberto.Morimoto@microsoft.com)
  - Bump Griffel dependencies ([PR #23688](https://github.com/microsoft/fluentui/pull/23688) by lingfangao@hotmail.com)
  - Update 9.0.0-rc dependencies to use caret range ([PR #23732](https://github.com/microsoft/fluentui/pull/23732) by lingfangao@hotmail.com)
  - PresenceBadge accessibility: fix placement of aria-label, sort out Avatar usage and examples ([PR #23256](https://github.com/microsoft/fluentui/pull/23256) by sarah.higley@microsoft.com)
  - chore: Update @fluentui/react-icons to latest version ([PR #23459](https://github.com/microsoft/fluentui/pull/23459) by olfedias@microsoft.com)

## [9.0.0-rc.15](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.15)

Thu, 23 Jun 2022 14:25:31 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.14..@fluentui/react-components_v9.0.0-rc.15)

### Changes

- `@fluentui/react-theme`
  - BREAKING: reduce shared colors ([PR #23608](https://github.com/microsoft/fluentui/pull/23608) by miroslav.stastny@microsoft.com)

## [9.0.0-rc.14](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.14)

Tue, 31 May 2022 21:28:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.13..@fluentui/react-components_v9.0.0-rc.14)

### Changes

- `@fluentui/react-accordion`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-alert`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
  - Creating AvatarGroupItem component. ([PR #23287](https://github.com/microsoft/fluentui/pull/23287) by esteban.230@hotmail.com)
  - Adding .beta to AvatarGroup stories so it's not shown in the docsite. ([PR #23216](https://github.com/microsoft/fluentui/pull/23216) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - feat: Add `size` property to control card padding and border radius ([PR #22915](https://github.com/microsoft/fluentui/pull/22915) by 39736248+andrefcdias@users.noreply.github.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - feat(react-card): CSS var for `size` prop is now exported ([PR #22915](https://github.com/microsoft/fluentui/pull/22915) by 39736248+andrefcdias@users.noreply.github.com)
  - remove exports for internal APIs ([PR #23319](https://github.com/microsoft/fluentui/pull/23319) by olfedias@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - update popover trigger to use aria-expanded instead of aria-haspopup ([PR #23127](https://github.com/microsoft/fluentui/pull/23127) by sarah.higley@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal`
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-portal-compat`
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-positioning`
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - BREAKING: FluentProvider now adds `line-height` by default ([PR #23279](https://github.com/microsoft/fluentui/pull/23279) by behowell@microsoft.com)
  - updates import to react-shared-components, removes re-export to provider ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
  - remove export useTheme ([PR #23335](https://github.com/microsoft/fluentui/pull/23335) by me@levithomason.com)
  - chore: replace useConst() usage ([PR #23319](https://github.com/microsoft/fluentui/pull/23319) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-select`
  - update disabled select style ([PR #23265](https://github.com/microsoft/fluentui/pull/23265) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - Remove usage of focus-visible pseudo-class. ([PR #23282](https://github.com/microsoft/fluentui/pull/23282) by tristan.watanabe@gmail.com)
- `@fluentui/react-shared-contexts`
  - remove unused MenuContext ([PR #23277](https://github.com/microsoft/fluentui/pull/23277) by olfedias@microsoft.com)
  - remove useTheme from exports ([PR #23335](https://github.com/microsoft/fluentui/pull/23335) by me@levithomason.com)
  - mark context hooks and providers to unstable ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - Remove usage of focus-visible pseudo-class. ([PR #23305](https://github.com/microsoft/fluentui/pull/23305) by tristan.watanabe@gmail.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to latest version ([PR #23275](https://github.com/microsoft/fluentui/pull/23275) by olfedias@microsoft.com)
  - updates import to react-shared-components ([PR #23325](https://github.com/microsoft/fluentui/pull/23325) by bernardo.sunderhus@gmail.com)
- `@fluentui/react-utilities`
  - remove exports for internals APIs & unused hooks ([PR #23319](https://github.com/microsoft/fluentui/pull/23319) by olfedias@microsoft.com)

## [9.0.0-rc.13](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.13)

Thu, 26 May 2022 21:01:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.12..@fluentui/react-components_v9.0.0-rc.13)

### Changes

- `@fluentui/react-alert`
  - Publish react-alert as unstable component ([PR #23198](https://github.com/microsoft/fluentui/pull/23198) by rohitpag@microsoft.com)
- `@fluentui/react-avatar`
  - fix react-avatar: use initials as a fallback label even when no id is manually defined ([PR #23258](https://github.com/microsoft/fluentui/pull/23258) by sarah.higley@microsoft.com)
- `@fluentui/react-badge`
  - remove aria-hidden from badge ([PR #22858](https://github.com/microsoft/fluentui/pull/22858) by mgodbolt@microsoft.com)
- `@fluentui/react-button`
  - ToggleButton: Differentiating hover and checked styles. ([PR #23209](https://github.com/microsoft/fluentui/pull/23209) by Humberto.Morimoto@microsoft.com)
  - ToggleButton: Apply thicker border width to checked outline toggle buttons. ([PR #23207](https://github.com/microsoft/fluentui/pull/23207) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-components`
  - add Select to Preview Components ([PR #23208](https://github.com/microsoft/fluentui/pull/23208) by sarah.higley@microsoft.com)
  - feat: Export react-overflow utilities as unstable ([PR #23226](https://github.com/microsoft/fluentui/pull/23226) by lingfangao@hotmail.com)
  - Publish react-alert as unstable component ([PR #23198](https://github.com/microsoft/fluentui/pull/23198) by rohitpag@microsoft.com)
  - BREAKING: fix: Stop exporting `Portal` component from react-components ([PR #23178](https://github.com/microsoft/fluentui/pull/23178) by lingfangao@hotmail.com)
  - export slider var names from top level ([PR #23257](https://github.com/microsoft/fluentui/pull/23257) by mgodbolt@microsoft.com)
- `@fluentui/react-input`
  - Removing additional focus ring in native input for macOS safari. ([PR #23197](https://github.com/microsoft/fluentui/pull/23197) by esteban.230@hotmail.com)
- `@fluentui/react-label`
  - Renaming strong prop to weight to align with Text. ([PR #23250](https://github.com/microsoft/fluentui/pull/23250) by esteban.230@hotmail.com)
- `@fluentui/react-menu`
  - fix: MenuDivider should be visible in Windows high contrast mode ([PR #23238](https://github.com/microsoft/fluentui/pull/23238) by lingfangao@hotmail.com)
  - fix: use neutral foreground 2 as text color for menu item ([PR #22540](https://github.com/microsoft/fluentui/pull/22540) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - BREAKING: Popover no longer has an arrow by default. The `noArrow` prop is replaced by `withArrow`. ([PR #23205](https://github.com/microsoft/fluentui/pull/23205) by behowell@microsoft.com)
- `@fluentui/react-select`
  - add Select to Preview Components ([PR #23208](https://github.com/microsoft/fluentui/pull/23208) by sarah.higley@microsoft.com)
- `@fluentui/react-slider`
  - new high contrast styles for slider steps ([PR #23253](https://github.com/microsoft/fluentui/pull/23253) by mgodbolt@microsoft.com)
  - BREAKING: Remove slider origin to align with design and avoid inaccessible design ([PR #23257](https://github.com/microsoft/fluentui/pull/23257) by mgodbolt@microsoft.com)
- `@fluentui/react-spinbutton`
  - Removing additional focus ring in native input for macOS safari. ([PR #23197](https://github.com/microsoft/fluentui/pull/23197) by esteban.230@hotmail.com)
- `@fluentui/react-spinner`
  - BREAKING: Remove `status` prop in Spinner ([PR #23204](https://github.com/microsoft/fluentui/pull/23204) by ololubek@microsoft.com)
- `@fluentui/react-tabs`
  - Update README.md ([PR #23200](https://github.com/microsoft/fluentui/pull/23200) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - Remove usage of focus-visible pseudo-class to conform to browser support matrix. ([PR #23255](https://github.com/microsoft/fluentui/pull/23255) by tristan.watanabe@gmail.com)
- `@fluentui/react-textarea`
  - Removing additional focus ring in native textarea for macOS safari. ([PR #23197](https://github.com/microsoft/fluentui/pull/23197) by esteban.230@hotmail.com)

## [9.0.0-rc.12](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.12)

Mon, 23 May 2022 18:56:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.11..@fluentui/react-components_v9.0.0-rc.12)

### Changes

- `@fluentui/react-accordion`
  - BREAKING: stop exporting AccordionContext and AccordionItemContext ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-avatar`
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-button`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - Removing deprecated block prop from all button components. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - update tabster tab behaviors ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-checkbox`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-components`
  - BREAKING: Rename positioning types and APIs to avoid references to third party API ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - BREAKING: Exports of react context objects were removed, replaced with provider compoennts and hooks ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - fix(react-text): Change typography wrapper component names to match new design spec ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by 39736248+andrefcdias@users.noreply.github.com)
  - Remove webHighContrast theme ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by miroslav.stastny@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Bump @fluentui/react-conformance to 0.13.1 ([PR #23146](https://github.com/microsoft/fluentui/pull/23146) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-image`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - Image: Updating useImageStyles to use styles[state] pattern for props of string union types. ([PR #23121](https://github.com/microsoft/fluentui/pull/23121) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-input`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-label`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-link`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-menu`
  - BREAKING: changes to positioning prop ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - BREAKING: Stop exporting MenuContext and MenuListContext ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-popover`
  - BREAKING: changes to positioning prop ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - BREAKING: stop exporting PopoverContext ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-positioning`
  - BREAKING CHANGE: Encapsulate Popper API ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-radio`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - BREAKING: stop exporting RadioGroupContext ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-spinbutton`
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-tabs`
  - Removing commons type from Label. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
- `@fluentui/react-tabster`
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-text`
  - fix: Change typography wrapper component names to match new design spec ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by 39736248+andrefcdias@users.noreply.github.com)
  - Text: Ordering types alphabetically. ([PR #23120](https://github.com/microsoft/fluentui/pull/23120) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-textarea`
  - BREAKING: update string unions to use spinal-case ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by seanmonahan@microsoft.com)
- `@fluentui/react-theme`
  - Remove webHighContrast theme ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tooltip`
  - Removing <componentName>ClassName exports. ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by esteban.230@hotmail.com)
  - BREAKING: changes to positioning prop ([PR #23092](https://github.com/microsoft/fluentui/pull/23092) by lingfangao@hotmail.com)

## [9.0.0-rc.11](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.11)

Mon, 23 May 2022 12:13:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.10..@fluentui/react-components_v9.0.0-rc.11)

### Changes

- `@fluentui/react-overflow`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - feat: Initial beta release ([PR #22913](https://github.com/microsoft/fluentui/pull/22913) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - Removing PopoverCommons type. ([PR #22968](https://github.com/microsoft/fluentui/pull/22968) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - Removing PortalCommons type. ([PR #22969](https://github.com/microsoft/fluentui/pull/22969) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-portal-compat`
  - chore: use range for "@fluentui/react-portal-compat-context" dependency ([PR #22541](https://github.com/microsoft/fluentui/pull/22541) by olfedias@microsoft.com)
  - feat: ship rolluped only dts ([PR #22874](https://github.com/microsoft/fluentui/pull/22874) by martinhochel@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/react-positioning`
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - Removing FluentProviderCommons type. ([PR #23070](https://github.com/microsoft/fluentui/pull/23070) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - feat: ship rolluped only dts ([PR #22874](https://github.com/microsoft/fluentui/pull/22874) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Replace hardcoded padding with spacing tokens ([PR #22982](https://github.com/microsoft/fluentui/pull/22982) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Refactor styles to remove usage of flex gap ([PR #22975](https://github.com/microsoft/fluentui/pull/22975) by behowell@microsoft.com)
  - Updated react-label package version to RC. ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
- `@fluentui/react-shared-contexts`
  - feat: ship rolluped only dts ([PR #22965](https://github.com/microsoft/fluentui/pull/22965) by martinhochel@microsoft.com)
- `@fluentui/react-slider`
  - move slider commons into props and pick into state ([PR #22879](https://github.com/microsoft/fluentui/pull/22879) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Updated react-label package version to RC. ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/react-spinbutton`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - react-spinbutton: update appearance stories ([PR #22980](https://github.com/microsoft/fluentui/pull/22980) by seanmonahan@microsoft.com)
  - appearance story updates ([PR #22995](https://github.com/microsoft/fluentui/pull/22995) by seanmonahan@microsoft.com)
  - widen `value` type to include `null` ([PR #23025](https://github.com/microsoft/fluentui/pull/23025) by seanmonahan@microsoft.com)
  - Updated react-label package version to RC. ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
  - react-spinbutton: add aria-valuetext override ([PR #22905](https://github.com/microsoft/fluentui/pull/22905) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - react-spinbutton: use spacing tokens ([PR #22950](https://github.com/microsoft/fluentui/pull/22950) by gcox@microsoft.com)
  - react-spinbutton: remove "strings" prop ([PR #22948](https://github.com/microsoft/fluentui/pull/22948) by seanmonahan@microsoft.com)
  - Update react-input dependency version to release candidate. ([PR #23090](https://github.com/microsoft/fluentui/pull/23090) by seanmonahan@microsoft.com)
  - update stepper clamping behavior ([PR #23004](https://github.com/microsoft/fluentui/pull/23004) by seanmonahan@microsoft.com)
  - react-spinbutton: remove SpinButtonCommons type ([PR #22871](https://github.com/microsoft/fluentui/pull/22871) by seanmonahan@microsoft.com)
- `@fluentui/react-spinner`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Migrate react-spinner to rc ([PR #23009](https://github.com/microsoft/fluentui/pull/23009) by ololubek@microsoft.com)
  - Removing SpinnerCommons type. ([PR #22954](https://github.com/microsoft/fluentui/pull/22954) by Humberto.Morimoto@microsoft.com)
  - Updated react-label package version to RC. ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - Updated to use tokens were possible ([PR #22949](https://github.com/microsoft/fluentui/pull/22949) by gcox@microsoft.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/react-switch`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Replace hardcoded padding with spacing tokens ([PR #22982](https://github.com/microsoft/fluentui/pull/22982) by behowell@microsoft.com)
  - Refactor styles to remove usage of flex gap ([PR #22976](https://github.com/microsoft/fluentui/pull/22976) by behowell@microsoft.com)
  - Updated react-label package version to RC. ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - feat: ship rolluped only dts ([PR #22874](https://github.com/microsoft/fluentui/pull/22874) by martinhochel@microsoft.com)
  - Removing SwitchCommons type in @fluentui/react-switch. ([PR #22943](https://github.com/microsoft/fluentui/pull/22943) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - Removed TabListCommons and TabCommons types ([PR #22922](https://github.com/microsoft/fluentui/pull/22922) by gcox@microsoft.com)
  - Removed flexgap from useTabStyles ([PR #22920](https://github.com/microsoft/fluentui/pull/22920) by gcox@microsoft.com)
  - Updated to focus on current selected tab ([PR #22900](https://github.com/microsoft/fluentui/pull/22900) by gcox@microsoft.com)
  - Used background rather than border ([PR #22869](https://github.com/microsoft/fluentui/pull/22869) by gcox@microsoft.com)
  - Moved react-tabs to stable and rc.1 ([PR #22923](https://github.com/microsoft/fluentui/pull/22923) by gcox@microsoft.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Remove overflow to allow focus outline to display ([PR #22897](https://github.com/microsoft/fluentui/pull/22897) by gcox@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Add aria-label for icon only story ([PR #22898](https://github.com/microsoft/fluentui/pull/22898) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Update tabster dependency from ^1.3.3 to ^1.4.0 ([PR #23109](https://github.com/microsoft/fluentui/pull/23109) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/react-text`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Removing TextCommons type. ([PR #22971](https://github.com/microsoft/fluentui/pull/22971) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - Moving react-textarea to RC. ([PR #22999](https://github.com/microsoft/fluentui/pull/22999) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - feat: ship rolluped only dts ([PR #22874](https://github.com/microsoft/fluentui/pull/22874) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Update appearance stories and add best practices. ([PR #22987](https://github.com/microsoft/fluentui/pull/22987) by esteban.230@hotmail.com)
  - Remove commons from react-textarea. ([PR #22881](https://github.com/microsoft/fluentui/pull/22881) by esteban.230@hotmail.com)
  - Updating spec to match implementation. ([PR #22902](https://github.com/microsoft/fluentui/pull/22902) by esteban.230@hotmail.com)
  - Updating Textarea styles to use font tokens. ([PR #22885](https://github.com/microsoft/fluentui/pull/22885) by esteban.230@hotmail.com)
- `@fluentui/react-theme`
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/react-tooltip`
  - Removing TooltipCommons type. ([PR #22953](https://github.com/microsoft/fluentui/pull/22953) by Humberto.Morimoto@microsoft.com)
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - feat: ship rolluped only dts ([PR #22828](https://github.com/microsoft/fluentui/pull/22828) by martinhochel@microsoft.com)
- `@fluentui/priority-overflow`
  - feat: Initial beta release ([PR #22913](https://github.com/microsoft/fluentui/pull/22913) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - react-accordion: ship rolluped only dts. ([PR #23061](https://github.com/microsoft/fluentui/pull/23061) by tristan.watanabe@gmail.com)
- `@fluentui/react-avatar`
  - Add support for size={16} to Avatar ([PR #23003](https://github.com/microsoft/fluentui/pull/23003) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Moving Avatar stories to stories folder. ([PR #23047](https://github.com/microsoft/fluentui/pull/23047) by esteban.230@hotmail.com)
- `@fluentui/react-badge`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - react-badge: ship rolluped only dts. ([PR #23053](https://github.com/microsoft/fluentui/pull/23053) by tristan.watanabe@gmail.com)
  - remove commons types from badges ([PR #22868](https://github.com/microsoft/fluentui/pull/22868) by sarah.higley@microsoft.com)
  - pass in icon props to presence badge icon slot, and use default strings ([PR #22901](https://github.com/microsoft/fluentui/pull/22901) by mgodbolt@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - Using spacing tokens for button components. ([PR #23076](https://github.com/microsoft/fluentui/pull/23076) by Humberto.Morimoto@microsoft.com)
  - Removing flex gap from button components and fixing spacing to better align with design spec. ([PR #23091](https://github.com/microsoft/fluentui/pull/23091) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Removing Common types from all button components. ([PR #22904](https://github.com/microsoft/fluentui/pull/22904) by humberto_makoto@hotmail.com)
  - Removing ToggleButtonCommons type in @fluentui/react-button. ([PR #23067](https://github.com/microsoft/fluentui/pull/23067) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - CardPreview now expands properly, all the way to the Card's edges ([PR #22761](https://github.com/microsoft/fluentui/pull/22761) by 39736248+andrefcdias@users.noreply.github.com)
  - fix: focus no longer being managed when using `focusMode="off"` ([PR #23011](https://github.com/microsoft/fluentui/pull/23011) by 39736248+andrefcdias@users.noreply.github.com)
  - remove commons from Card ([PR #22872](https://github.com/microsoft/fluentui/pull/22872) by sarah.higley@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - Replacing spacing constants with tokens. ([PR #22994](https://github.com/microsoft/fluentui/pull/22994) by esteban.230@hotmail.com)
  - Moving Checkbox to RC. ([PR #22991](https://github.com/microsoft/fluentui/pull/22991) by esteban.230@hotmail.com)
  - Refactor styles to remove usage of flex gap ([PR #22974](https://github.com/microsoft/fluentui/pull/22974) by behowell@microsoft.com)
  - Updating spec to match implementation and added information to README. ([PR #22952](https://github.com/microsoft/fluentui/pull/22952) by esteban.230@hotmail.com)
  - feat: ship rolluped only dts ([PR #22793](https://github.com/microsoft/fluentui/pull/22793) by martinhochel@microsoft.com)
  - Removing commons from checkbox. ([PR #22916](https://github.com/microsoft/fluentui/pull/22916) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Use vertical and horizontal spacing tokens for padding ([PR #22982](https://github.com/microsoft/fluentui/pull/22982) by behowell@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-components`
  - Moving react-textarea from unstable to stable. ([PR #22999](https://github.com/microsoft/fluentui/pull/22999) by esteban.230@hotmail.com)
  - Re-exporting AvatarSizes from react-avatar. ([PR #22998](https://github.com/microsoft/fluentui/pull/22998) by esteban.230@hotmail.com)
  - Moved react-tabs to stable and rc.1 ([PR #22923](https://github.com/microsoft/fluentui/pull/22923) by gcox@microsoft.com)
  - react-spinbutton: remove "strings" prop ([PR #22948](https://github.com/microsoft/fluentui/pull/22948) by seanmonahan@microsoft.com)
  - Move react-label to release candidate ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - Move react-spinner from unstable to stable ([PR #23009](https://github.com/microsoft/fluentui/pull/23009) by ololubek@microsoft.com)
  - Moving Checkbox from unstable to stable. ([PR #22991](https://github.com/microsoft/fluentui/pull/22991) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Switch: Moving component out of unstable. ([PR #23094](https://github.com/microsoft/fluentui/pull/23094) by Humberto.Morimoto@microsoft.com)
  - Add uncomplete Input scenario ([PR #21651](https://github.com/microsoft/fluentui/pull/21651) by adam.samec@gmail.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Update react-input to release candidate. ([PR #23090](https://github.com/microsoft/fluentui/pull/23090) by seanmonahan@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - fix: update mock of mergeClasses() to return an empty string ([PR #22935](https://github.com/microsoft/fluentui/pull/22935) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-divider`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - react-divider: ship rolluped only dts. ([PR #23061](https://github.com/microsoft/fluentui/pull/23061) by tristan.watanabe@gmail.com)
  - Removing DividerCommons type. ([PR #22951](https://github.com/microsoft/fluentui/pull/22951) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Removing ImageCommons type. ([PR #22957](https://github.com/microsoft/fluentui/pull/22957) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - write readme ([PR #22993](https://github.com/microsoft/fluentui/pull/22993) by seanmonahan@microsoft.com)
  - react-input: update appearance stories background contrast ([PR #22966](https://github.com/microsoft/fluentui/pull/22966) by seanmonahan@microsoft.com)
  - feat: ship rolluped only dts ([PR #22793](https://github.com/microsoft/fluentui/pull/22793) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - Move from beta to release candidate. ([PR #23090](https://github.com/microsoft/fluentui/pull/23090) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - update README and package version ([PR #22865](https://github.com/microsoft/fluentui/pull/22865) by esteban.230@hotmail.com)
  - feat: ship rolluped only dts ([PR #22793](https://github.com/microsoft/fluentui/pull/22793) by martinhochel@microsoft.com)
  - Removing commons type from Label. ([PR #22880](https://github.com/microsoft/fluentui/pull/22880) by esteban.230@hotmail.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - feat: ship rolluped only dts ([PR #22793](https://github.com/microsoft/fluentui/pull/22793) by martinhochel@microsoft.com)
  - Removing LinkCommon type. ([PR #22942](https://github.com/microsoft/fluentui/pull/22942) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - chore: Update Griffel to latest version ([PR #22894](https://github.com/microsoft/fluentui/pull/22894) by olfedias@microsoft.com)
  - feat: Fill icon on hover ([PR #23084](https://github.com/microsoft/fluentui/pull/23084) by yuanboxue@microsoft.com)
  - fix: Context menu closes when its trigger is left clicked ([PR #23089](https://github.com/microsoft/fluentui/pull/23089) by lingfangao@hotmail.com)
  - chore: Update Griffel to latest version ([PR #23029](https://github.com/microsoft/fluentui/pull/23029) by olfedias@microsoft.com)
  - Removing Common types from all Menu components. ([PR #22958](https://github.com/microsoft/fluentui/pull/22958) by Humberto.Morimoto@microsoft.com)

## [9.0.0-rc.10](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.10)

Thu, 05 May 2022 18:26:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.9..@fluentui/react-components_v9.0.0-rc.10)

### Changes

- `@fluentui/react-context-selector`
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)
  - Removing star exports. ([PR #22801](https://github.com/microsoft/fluentui/pull/22801) by humberto_makoto@hotmail.com)
- `@fluentui/react-input`
  - Updated to use new theme tokens ([PR #22836](https://github.com/microsoft/fluentui/pull/22836) by gcox@microsoft.com)
- `@fluentui/react-menu`
  - Removing star exports. ([PR #22804](https://github.com/microsoft/fluentui/pull/22804) by humberto_makoto@hotmail.com)
- `@fluentui/react-popover`
  - Removing star exports. ([PR #22805](https://github.com/microsoft/fluentui/pull/22805) by humberto_makoto@hotmail.com)
- `@fluentui/react-portal`
  - Removing star exports. ([PR #22806](https://github.com/microsoft/fluentui/pull/22806) by humberto_makoto@hotmail.com)
- `@fluentui/react-positioning`
  - Removing star exports. ([PR #22807](https://github.com/microsoft/fluentui/pull/22807) by humberto_makoto@hotmail.com)
- `@fluentui/react-radio`
  - update README ([PR #22819](https://github.com/microsoft/fluentui/pull/22819) by seanmonahan@microsoft.com)
- `@fluentui/react-shared-contexts`
  - Removing star exports. ([PR #22808](https://github.com/microsoft/fluentui/pull/22808) by humberto_makoto@hotmail.com)
- `@fluentui/react-theme`
  - Export TypographyStyle type ([PR #22832](https://github.com/microsoft/fluentui/pull/22832) by miroslav.stastny@microsoft.com)
  - Removing star exports. ([PR #22810](https://github.com/microsoft/fluentui/pull/22810) by humberto_makoto@hotmail.com)
  - Added ms suffix to durations ([PR #22831](https://github.com/microsoft/fluentui/pull/22831) by gcox@microsoft.com)
- `@fluentui/react-utilities`
  - feat: add time element on nativeElementMap ([PR #22848](https://github.com/microsoft/fluentui/pull/22848) by bsunderhus@microsoft.com)
- `@fluentui/keyboard-keys`
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)
- `@fluentui/react-aria`
  - Removing star exports. ([PR #22798](https://github.com/microsoft/fluentui/pull/22798) by humberto_makoto@hotmail.com)
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)
- `@fluentui/react-avatar`
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)
- `@fluentui/react-button`
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)
- `@fluentui/react-card`
  - Added new `focusMode` property to control the focus behavior inside of the component ([PR #22312](https://github.com/microsoft/fluentui/pull/22312) by 39736248+andrefcdias@users.noreply.github.com)
- `@fluentui/react-components`
  - react-radio: move to release candidate ([PR #22819](https://github.com/microsoft/fluentui/pull/22819) by seanmonahan@microsoft.com)
  - Re-exporting GriffelStyle. ([PR #22845](https://github.com/microsoft/fluentui/pull/22845) by Humberto.Morimoto@microsoft.com)
  - Export TypographyStyle type ([PR #22832](https://github.com/microsoft/fluentui/pull/22832) by miroslav.stastny@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - feat: ship rolluped only dts ([PR #22823](https://github.com/microsoft/fluentui/pull/22823) by martinhochel@microsoft.com)

## [9.0.0-rc.9](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.9)

Wed, 04 May 2022 13:26:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.8..@fluentui/react-components_v9.0.0-rc.9)

### Changes

- `@fluentui/react-text`
  - feat: ship rolluped only dts ([PR #22708](https://github.com/microsoft/fluentui/pull/22708) by martinhochel@microsoft.com)
  - Updated react-text to use typography constants ([PR #22716](https://github.com/microsoft/fluentui/pull/22716) by gcox@microsoft.com)
- `@fluentui/react-theme`
  - Add px suffix to spacings ([PR #22722](https://github.com/microsoft/fluentui/pull/22722) by gcox@microsoft.com)
  - Fixed typo in typography ([PR #22625](https://github.com/microsoft/fluentui/pull/22625) by gcox@microsoft.com)
  - Fixed line-height in title2 ([PR #22716](https://github.com/microsoft/fluentui/pull/22716) by gcox@microsoft.com)
  - Added global theme types and tokens ([PR #22607](https://github.com/microsoft/fluentui/pull/22607) by gcox@microsoft.com)
  - fix(react-theme): Update CompoundBrandBackground and BrandStroke1 ([PR #22751](https://github.com/microsoft/fluentui/pull/22751) by miroslav.stastny@microsoft.com)
  - Add base font family per figma ([PR #22627](https://github.com/microsoft/fluentui/pull/22627) by gcox@microsoft.com)
  - Added typeography styles ([PR #22610](https://github.com/microsoft/fluentui/pull/22610) by gcox@microsoft.com)
  - feat(react-theme): Add colorNeutralForeground2Link color tokens ([PR #22570](https://github.com/microsoft/fluentui/pull/22570) by miroslav.stastny@microsoft.com)
- `@fluentui/keyboard-keys`
  - remove star exports ([PR #22681](https://github.com/microsoft/fluentui/pull/22681) by seanmonahan@microsoft.com)
- `@fluentui/react-accordion`
  - remove star exports ([PR #22682](https://github.com/microsoft/fluentui/pull/22682) by seanmonahan@microsoft.com)
- `@fluentui/react-card`
  - feat: ship rolluped only dts ([PR #22708](https://github.com/microsoft/fluentui/pull/22708) by martinhochel@microsoft.com)
- `@fluentui/react-components`
  - feat: re-exports positioning types at `react-components` ([PR #22666](https://github.com/microsoft/fluentui/pull/22666) by bsunderhus@microsoft.com)
  - feat: export `useThemeClassName` hook ([PR #22639](https://github.com/microsoft/fluentui/pull/22639) by olfedias@microsoft.com)
  - feat: re-export `createFocusOutlineStyle` on `react-components` ([PR #22747](https://github.com/microsoft/fluentui/pull/22747) by bsunderhus@microsoft.com)
  - feat: ship rolluped only dts ([PR #22746](https://github.com/microsoft/fluentui/pull/22746) by martinhochel@microsoft.com)
  - Fixed typo in typography ([PR #22625](https://github.com/microsoft/fluentui/pull/22625) by gcox@microsoft.com)
  - Exported typeography styles ([PR #22610](https://github.com/microsoft/fluentui/pull/22610) by gcox@microsoft.com)
  - Exported new theme types ([PR #22607](https://github.com/microsoft/fluentui/pull/22607) by gcox@microsoft.com)
- `@fluentui/react-image`
  - feat: ship rolluped only dts ([PR #22708](https://github.com/microsoft/fluentui/pull/22708) by martinhochel@microsoft.com)
- `@fluentui/react-input`
  - update content before/after stories; label usage in stories ([PR #22731](https://github.com/microsoft/fluentui/pull/22731) by seanmonahan@microsoft.com)
- `@fluentui/react-label`
  - Add style to make required match text when disabled ([PR #22715](https://github.com/microsoft/fluentui/pull/22715) by mgodbolt@microsoft.com)
- `@fluentui/react-link`
  - Link: Changing styles of focused links to align with design spec. ([PR #22732](https://github.com/microsoft/fluentui/pull/22732) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - feat: ship rolluped only dts ([PR #22791](https://github.com/microsoft/fluentui/pull/22791) by martinhochel@microsoft.com)
- `@fluentui/react-popover`
  - feat: Add inline prop to Popover ([PR #22789](https://github.com/microsoft/fluentui/pull/22789) by lingfangao@hotmail.com)
  - feat: ship rolluped only dts ([PR #22791](https://github.com/microsoft/fluentui/pull/22791) by martinhochel@microsoft.com)
  - feat: Adds prop `closeOnScroll` to close popover on scrolling outside ([PR #22784](https://github.com/microsoft/fluentui/pull/22784) by yuanboxue@microsoft.com)
  - feat: Adds prop `mouseLeaveDelay` to delay closing popover that opens on hover ([PR #22786](https://github.com/microsoft/fluentui/pull/22786) by yuanboxue@microsoft.com)
- `@fluentui/react-portal-compat`
  - initial release ([PR #22510](https://github.com/microsoft/fluentui/pull/22510) by olfedias@microsoft.com)
- `@fluentui/react-portal-compat-context`
  - initial release ([PR #22510](https://github.com/microsoft/fluentui/pull/22510) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - feat: ship rolluped only dts ([PR #22791](https://github.com/microsoft/fluentui/pull/22791) by martinhochel@microsoft.com)
- `@fluentui/react-provider`
  - check for styleTag.sheet before performing actions on the sheet ([PR #22684](https://github.com/microsoft/fluentui/pull/22684) by mgodbolt@microsoft.com)
  - feat: ship rolluped only dts ([PR #22791](https://github.com/microsoft/fluentui/pull/22791) by martinhochel@microsoft.com)
- `@fluentui/react-radio`
  - react-radio: update context usage ([PR #22803](https://github.com/microsoft/fluentui/pull/22803) by seanmonahan@microsoft.com)
  - add bundle size fixtures ([PR #22675](https://github.com/microsoft/fluentui/pull/22675) by seanmonahan@microsoft.com)
  - react-radio: add required prop to RadioGroup ([PR #22809](https://github.com/microsoft/fluentui/pull/22809) by seanmonahan@microsoft.com)
  - react-radio: remove required indicator from label ([PR #22782](https://github.com/microsoft/fluentui/pull/22782) by seanmonahan@microsoft.com)
  - write readme ([PR #22676](https://github.com/microsoft/fluentui/pull/22676) by seanmonahan@microsoft.com)
  - Allow data argument on onChange ([PR #22753](https://github.com/microsoft/fluentui/pull/22753) by miroslav.stastny@microsoft.com)
- `@fluentui/react-slider`
  - Adjust focus rect to match design, and update color tokens to improve dark mode contrast ([PR #22701](https://github.com/microsoft/fluentui/pull/22701) by mgodbolt@microsoft.com)
- `@fluentui/react-spinbutton`
  - remove MIGRATION.md ([PR #22737](https://github.com/microsoft/fluentui/pull/22737) by seanmonahan@microsoft.com)
  - react-spinbutton: remove "inputType" prop ([PR #22652](https://github.com/microsoft/fluentui/pull/22652) by seanmonahan@microsoft.com)
- `@fluentui/react-switch`
  - Switch: Fixing disabled styles in high contrast mode. ([PR #22817](https://github.com/microsoft/fluentui/pull/22817) by humberto_makoto@hotmail.com)
- `@fluentui/react-tabs`
  - Added aria-selected ([PR #22742](https://github.com/microsoft/fluentui/pull/22742) by gcox@microsoft.com)
  - Updated to use correct pseudo-elements ([PR #22768](https://github.com/microsoft/fluentui/pull/22768) by gcox@microsoft.com)
  - Updated to use tokens ([PR #22717](https://github.com/microsoft/fluentui/pull/22717) by gcox@microsoft.com)
  - Removed unnecessary width and height from indicators ([PR #22744](https://github.com/microsoft/fluentui/pull/22744) by gcox@microsoft.com)
  - Allow tab to animate when value is numeric zero ([PR #22754](https://github.com/microsoft/fluentui/pull/22754) by gcox@microsoft.com)

## [9.0.0-rc.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.8)

Mon, 25 Apr 2022 09:32:14 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.7..@fluentui/react-components_v9.0.0-rc.8)

### Changes

- `@fluentui/react-spinbutton`
  - use ::after pseudo element in styles ([PR #22591](https://github.com/microsoft/fluentui/pull/22591) by seanmonahan@microsoft.com)
  - react-spinbutton: remove private from package.json ([PR #22568](https://github.com/microsoft/fluentui/pull/22568) by seanmonahan@microsoft.com)
- `@fluentui/react-spinner`
  - Reexport react-spinner in react-components ([PR #22531](https://github.com/microsoft/fluentui/pull/22531) by ololubek@microsoft.com)
- `@fluentui/react-tabs`
  - Added styles to support future overflow calcs ([PR #22548](https://github.com/microsoft/fluentui/pull/22548) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - Adjusting accordion keyboard navigation. ([PR #21995](https://github.com/microsoft/fluentui/pull/21995) by marata@microsoft.com)
- `@fluentui/react-accordion`
  - Adjusting accordion keyboard navigation. ([PR #21995](https://github.com/microsoft/fluentui/pull/21995) by marata@microsoft.com)
- `@fluentui/react-button`
  - Adding useToggleState hook to scaffold toggleable behavior for individual consumption. ([PR #22279](https://github.com/microsoft/fluentui/pull/22279) by Humberto.Morimoto@microsoft.com)
  - fix(Button): Text color in HC mode for hover, active and checked states. ([PR #22566](https://github.com/microsoft/fluentui/pull/22566) by jukapsia@microsoft.com)
  - Button: Stop applying active styles when mouse moves away while it is being held and improving styles in High Contrast mode. ([PR #22574](https://github.com/microsoft/fluentui/pull/22574) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-checkbox`
  - Fix disabled HCM styles in Checkbox. ([PR #22595](https://github.com/microsoft/fluentui/pull/22595) by mgodbolt@microsoft.com)
- `@fluentui/react-components`
  - react-components: add SpinButton to /unstable ([PR #22568](https://github.com/microsoft/fluentui/pull/22568) by seanmonahan@microsoft.com)
  - Exporting useToggleState from @fluentui/react-button. ([PR #22279](https://github.com/microsoft/fluentui/pull/22279) by Humberto.Morimoto@microsoft.com)
  - Reexport react-spinner in react-components ([PR #22531](https://github.com/microsoft/fluentui/pull/22531) by ololubek@microsoft.com)
  - fix: restore SSRProvider export ([PR #22560](https://github.com/microsoft/fluentui/pull/22560) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - use ::after pseudo element in styles ([PR #22591](https://github.com/microsoft/fluentui/pull/22591) by seanmonahan@microsoft.com)
- `@fluentui/react-provider`
  - feat: export useFluentProviderThemeStyleTag from @fluentui/react-provider ([PR #22601](https://github.com/microsoft/fluentui/pull/22601) by olfedias@microsoft.com)

## [9.0.0-rc.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.7)

Tue, 19 Apr 2022 19:16:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.6..@fluentui/react-components_v9.0.0-rc.7)

### Changes

- `@fluentui/react-link`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports. ([PR #22112](https://github.com/microsoft/fluentui/pull/22112) by Humberto.Morimoto@microsoft.com)
  - Add static classnames to Link ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-menu`
  - fix(MenuItem): Alignment for non v9 icons ([PR #21949](https://github.com/microsoft/fluentui/pull/21949) by gcox@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Add static classnames to Menu ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
- `@fluentui/react-popover`
  - Add static classnames to Popover ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - update `mountNode` types to accept HTMLElement ([PR #22153](https://github.com/microsoft/fluentui/pull/22153) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-provider`
  - Add static classnames to Provider ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-radio`
  - Deprecate static classname string for Radio. ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - Remove star exports from react-radio ([PR #22106](https://github.com/microsoft/fluentui/pull/22106) by seanmonahan@microsoft.com)
  - Add onChange event prop to Radio ([PR #22104](https://github.com/microsoft/fluentui/pull/22104) by seanmonahan@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Radio/RadioGroup API alignment. ([PR #22065](https://github.com/microsoft/fluentui/pull/22065) by seanmonahan@microsoft.com)
- `@fluentui/react-slider`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports. ([PR #22150](https://github.com/microsoft/fluentui/pull/22150) by Humberto.Morimoto@microsoft.com)
  - add inline slider, update tests and examples ([PR #21813](https://github.com/microsoft/fluentui/pull/21813) by mgodbolt@microsoft.com)
  - Moved Slider to RC, updated exported CSS variable name ([PR #22224](https://github.com/microsoft/fluentui/pull/22224) by mgodbolt@microsoft.com)
- `@fluentui/react-switch`
  - Add deprecation messages to react-switch ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
  - Removing star exports. ([PR #22139](https://github.com/microsoft/fluentui/pull/22139) by Humberto.Morimoto@microsoft.com)
  - Switch: Updating spec and migration guide to reflect latest state of the component. ([PR #22011](https://github.com/microsoft/fluentui/pull/22011) by email not defined)
- `@fluentui/react-tabs`
  - Set disabled tab background to transparent ([PR #22342](https://github.com/microsoft/fluentui/pull/22342) by gcox@microsoft.com)
  - Add static classnames to Tabs ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports. ([PR #22151](https://github.com/microsoft/fluentui/pull/22151) by Humberto.Morimoto@microsoft.com)
  - fix missing dependencies and lint warnings ([PR #21924](https://github.com/microsoft/fluentui/pull/21924) by martinhochel@microsoft.com)
  - Fix subtle style on tabs ([PR #22439](https://github.com/microsoft/fluentui/pull/22439) by gcox@microsoft.com)
  - react-tabs fit and finish ([PR #22225](https://github.com/microsoft/fluentui/pull/22225) by gcox@microsoft.com)
  - Set subtle tab background to subtle background tokens ([PR #22346](https://github.com/microsoft/fluentui/pull/22346) by gcox@microsoft.com)
  - Updated to decrease gap of small vertical tab per figma change ([PR #22335](https://github.com/microsoft/fluentui/pull/22335) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports at src/index.ts. ([PR #22367](https://github.com/microsoft/fluentui/pull/22367) by Humberto.Morimoto@microsoft.com)
  - fix styles in getFocusOutlineStyles() ([PR #22070](https://github.com/microsoft/fluentui/pull/22070) by olfedias@microsoft.com)
  - feat(react-tabster): Add grid navigation ([PR #22085](https://github.com/microsoft/fluentui/pull/22085) by jukapsia@microsoft.com)
  - Upgrading tabster to latest version. ([PR #22492](https://github.com/microsoft/fluentui/pull/22492) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-text`
  - Add static classnames to Text ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-textarea`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-theme`
  - fix(react-theme): Update yellow shared color ([PR #22450](https://github.com/microsoft/fluentui/pull/22450) by miroslav.stastny@microsoft.com)
  - feat(react-theme): update color tokens ([PR #22238](https://github.com/microsoft/fluentui/pull/22238) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tooltip`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports. ([PR #22156](https://github.com/microsoft/fluentui/pull/22156) by Humberto.Morimoto@microsoft.com)
  - Add mountNode prop ([PR #22134](https://github.com/microsoft/fluentui/pull/22134) by mgodbolt@microsoft.com)
  - Add static classnames to Tooltip ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-utilities`
  - Removing star exports at src/index.ts ([PR #22367](https://github.com/microsoft/fluentui/pull/22367) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-accordion`
  - Add static classnames to Accordion ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - add missing dependencies ([PR #21924](https://github.com/microsoft/fluentui/pull/21924) by martinhochel@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - Add static classnames to Avatar ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - Avatar: Fix style for sizes 20 and 24 to have semibold fontWeight instead of regular. ([PR #22146](https://github.com/microsoft/fluentui/pull/22146) by Humberto.Morimoto@microsoft.com)
  - Removing star exports. ([PR #22113](https://github.com/microsoft/fluentui/pull/22113) by Humberto.Morimoto@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
  - add missing dependencies ([PR #21924](https://github.com/microsoft/fluentui/pull/21924) by martinhochel@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - Removing star exports. ([PR #22114](https://github.com/microsoft/fluentui/pull/22114) by Humberto.Morimoto@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
  - PresenceBadge: Adding unknown status. ([PR #21951](https://github.com/microsoft/fluentui/pull/21951) by Humberto.Morimoto@microsoft.com)
  - Add static classnames to Badge ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
- `@fluentui/react-button`
  - Disabling lint rule for deprecated [component]ClassName exports. ([PR #22131](https://github.com/microsoft/fluentui/pull/22131) by Humberto.Morimoto@microsoft.com)
  - Button: Deprecating block prop. ([PR #22148](https://github.com/microsoft/fluentui/pull/22148) by Humberto.Morimoto@microsoft.com)
  - Button components: Making root a non-nullable slot. ([PR #22147](https://github.com/microsoft/fluentui/pull/22147) by Humberto.Morimoto@microsoft.com)
  - CompoundButton: Fixing bug where component was iconOnly even when secondaryContent was being provided. ([PR #22107](https://github.com/microsoft/fluentui/pull/22107) by Humberto.Morimoto@microsoft.com)
  - Removing star exports. ([PR #22111](https://github.com/microsoft/fluentui/pull/22111) by Humberto.Morimoto@microsoft.com)
  - Add deprecation messages to react-button ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
- `@fluentui/react-card`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Add static classnames to Card ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-checkbox`
  - Add static classnames to Checkbox ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - Remove star exports from react-checkbox ([PR #22108](https://github.com/microsoft/fluentui/pull/22108) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Update Checkbox onChange event parameter to be of type ChangeEvent instead of type FormEvent. ([PR #22057](https://github.com/microsoft/fluentui/pull/22057) by seanmonahan@microsoft.com)
  - update react-icons version to ^2.0.166-rc.3 from ^2.0.159-beta.10 ([PR #22512](https://github.com/microsoft/fluentui/pull/22512) by seanmonahan@microsoft.com)
- `@fluentui/react-components`
  - Adding Textarea to react-components. ([PR #22413](https://github.com/microsoft/fluentui/pull/22413) by email not defined)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Updated exports for react-tabs unstable ([PR #22225](https://github.com/microsoft/fluentui/pull/22225) by gcox@microsoft.com)
  - Added MenuSplitGroup to exports ([PR #21964](https://github.com/microsoft/fluentui/pull/21964) by gcox@microsoft.com)
  - Exports Slider from the main package, removes Slider from unstable ([PR #22224](https://github.com/microsoft/fluentui/pull/22224) by mgodbolt@microsoft.com)
  - Update classNames exports from react-components. ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - Re-exporting everything from @fluentui/react-tabster and @fluentui/react-utilities in @fluentui/react-components. ([PR #22367](https://github.com/microsoft/fluentui/pull/22367) by Humberto.Morimoto@microsoft.com)
  - Adding Switch to @fluentui/react-components/unstable. ([PR #21987](https://github.com/microsoft/fluentui/pull/21987) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - Fix cleanup of overridesWin test ([PR #22009](https://github.com/microsoft/fluentui/pull/22009) by elcraig@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - add react-conformance missing dependency ([PR #21924](https://github.com/microsoft/fluentui/pull/21924) by martinhochel@microsoft.com)
- `@fluentui/react-context-selector`
  - Move `scheduler` to a peer dependency and allow appropriate versions for React 16 or 17 ([PR #21769](https://github.com/microsoft/fluentui/pull/21769) by elcraig@microsoft.com)
- `@fluentui/react-divider`
  - Removing star exports. ([PR #22136](https://github.com/microsoft/fluentui/pull/22136) by Humberto.Morimoto@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Add static classnames to Divider ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-image`
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Add static classnames to Image ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-input`
  - Removing star exports. ([PR #22140](https://github.com/microsoft/fluentui/pull/22140) by Humberto.Morimoto@microsoft.com)
  - Update onChange event type ([PR #22233](https://github.com/microsoft/fluentui/pull/22233) by seanmonahan@microsoft.com)
  - BREAKING CHANGE: Remove `inline` prop and use `display: inline-flex` by default ([PR #21935](https://github.com/microsoft/fluentui/pull/21935) by elcraig@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Add static classnames to Input ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
- `@fluentui/react-label`
  - Add static classnames to Label ([PR #21960](https://github.com/microsoft/fluentui/pull/21960) by seanmonahan@microsoft.com)
  - chore: Update Griffel to latest version ([PR #21976](https://github.com/microsoft/fluentui/pull/21976) by olfedias@microsoft.com)
  - Removing star exports. ([PR #22138](https://github.com/microsoft/fluentui/pull/22138) by Humberto.Morimoto@microsoft.com)

## [9.0.0-rc.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.6)

Fri, 04 Mar 2022 19:49:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.5..@fluentui/react-components_v9.0.0-rc.6)

### Changes

- `@fluentui/react-components`
  - Adding /unstable export to exports map. ([PR #21962](https://github.com/microsoft/fluentui/pull/21962) by dzearing@microsoft.com)

## [9.0.0-rc.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.5)

Fri, 04 Mar 2022 05:17:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.4..@fluentui/react-components_v9.0.0-rc.5)

### Changes

- `@fluentui/react-shared-contexts`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-slider`
  - undefined ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-switch`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Updating class names to use slot class names helper type. ([PR #21933](https://github.com/microsoft/fluentui/pull/21933) by email not defined)
- `@fluentui/react-tabs`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-tabster`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-text`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-theme`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-tooltip`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-utilities`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Adding helper type to define slot class names. ([PR #21933](https://github.com/microsoft/fluentui/pull/21933) by email not defined)
  - fix(shouldPreventDefaultOnKeyDown): return false for events that are default prevented ([PR #21905](https://github.com/microsoft/fluentui/pull/21905) by lingfangao@hotmail.com)
- `@fluentui/keyboard-keys`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - keyboard-keys: Adding missing tslib dependency. ([PR #21947](https://github.com/microsoft/fluentui/pull/21947) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-accordion`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-aria`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-avatar`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-badge`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-button`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Button: Exporting classNames of individual slots. ([PR #20977](https://github.com/microsoft/fluentui/pull/20977) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-checkbox`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-components`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Add Radio and RadioGroup to react-components/unstable ([PR #21883](https://github.com/microsoft/fluentui/pull/21883) by behowell@microsoft.com)
- `@fluentui/react-context-selector`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-divider`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-image`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-input`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-label`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-link`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-menu`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-popover`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - refactor: PopoverSurface should be rendered from the Popover component ([PR #21922](https://github.com/microsoft/fluentui/pull/21922) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-positioning`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - fix: `popperRef.setTarget` should accept virtual element type ([PR #21875](https://github.com/microsoft/fluentui/pull/21875) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- `@fluentui/react-radio`
  - Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
  - Initial release ([PR #21883](https://github.com/microsoft/fluentui/pull/21883) by behowell@microsoft.com)

## [9.0.0-rc.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.4)

Tue, 01 Mar 2022 02:17:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.3..@fluentui/react-components_v9.0.0-rc.4)

### Changes

- `@fluentui/react-button`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-card`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-checkbox`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
  - Refactor Checkbox styles to use CSS pseudo-classes ([PR #21837](https://github.com/microsoft/fluentui/pull/21837) by behowell@microsoft.com)
  - Rename `circular` prop to `shape` ([PR #21834](https://github.com/microsoft/fluentui/pull/21834) by behowell@microsoft.com)
- `@fluentui/react-components`
  - Add Checkbox to react-components/unstable ([PR #21836](https://github.com/microsoft/fluentui/pull/21836) by behowell@microsoft.com)
- `@fluentui/react-divider`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-label`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - feat: add isIntersectingModifier to usePopper ([PR #21855](https://github.com/microsoft/fluentui/pull/21855) by olfedias@microsoft.com)
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-slider`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - Switch: Re-implementing component to make it simpler and making it adhere to latest patterns. ([PR #21849](https://github.com/microsoft/fluentui/pull/21849) by Humberto.Morimoto@microsoft.com)
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-tabs`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-tabster`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - fix: Add react-theme as dependency ([PR #21825](https://github.com/microsoft/fluentui/pull/21825) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - Ignore prefix in useId() when it is falsey. ([PR #21848](https://github.com/microsoft/fluentui/pull/21848) by seanmonahan@microsoft.com)
  - Add fieldset to getNativeElementProps ([PR #21835](https://github.com/microsoft/fluentui/pull/21835) by behowell@microsoft.com)

## [9.0.0-rc.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.3)

Fri, 18 Feb 2022 13:35:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-rc.1..@fluentui/react-components_v9.0.0-rc.3)

### Changes

- `@fluentui/react-avatar`
  - Hide Avatar's image if it fails to load, rather than displaying the broken image icon ([PR #21636](https://github.com/microsoft/fluentui/pull/21636) by behowell@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Update Avatar SPEC.md and MIGRATION.md ([PR #21702](https://github.com/microsoft/fluentui/pull/21702) by behowell@microsoft.com)
- `@fluentui/react-badge`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - SplitButton: Fixing issue where menuIcon prop was not being respected. ([PR #21683](https://github.com/microsoft/fluentui/pull/21683) by Humberto.Morimoto@microsoft.com)
  - Button: Updating stories to fix a11y issues. ([PR #21679](https://github.com/microsoft/fluentui/pull/21679) by Humberto.Morimoto@microsoft.com)
  - SplitButton: Fixing screen reader access issues. ([PR #21703](https://github.com/microsoft/fluentui/pull/21703) by Humberto.Morimoto@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Button: Adding tests and fixing issues in SplitButton and ToggleButton. ([PR #21719](https://github.com/microsoft/fluentui/pull/21719) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Add new appearance property to allow for different card styles ([PR #21264](https://github.com/microsoft/fluentui/pull/21264) by 39736248+andrefcdias@users.noreply.github.com)
  - fix: top padding issues with CardPreview ([PR #21685](https://github.com/microsoft/fluentui/pull/21685) by 39736248+andrefcdias@users.noreply.github.com)
- `@fluentui/react-checkbox`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - Moved react-tabs to unstable ([PR #21763](https://github.com/microsoft/fluentui/pull/21763) by gcox@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-griffel`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - fix: Add react-theme as dependency to react-image ([PR #21787](https://github.com/microsoft/fluentui/pull/21787) by lingfangao@hotmail.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-input`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - fix: MenuItem is a submenu trigger if it is wrapped by a MenuTrigger and in a submenu ([PR #21800](https://github.com/microsoft/fluentui/pull/21800) by lingfangao@hotmail.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - fix visual display of controlled switches ([PR #21704](https://github.com/microsoft/fluentui/pull/21704) by mgodbolt@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-tabs`
  - chore: Force bump all v9 packages to release correct source maps ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - Publish initial version ([PR #21763](https://github.com/microsoft/fluentui/pull/21763) by gcox@microsoft.com)
- `@fluentui/react-tabster`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-theme`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - Update documentation comments ([PR #21736](https://github.com/microsoft/fluentui/pull/21736) by behowell@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - update trigger implementation to be consistent ([PR #21626](https://github.com/microsoft/fluentui/pull/21626) by olfedias@microsoft.com)
- `@fluentui/react-utilities`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/keyboard-keys`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Updates initial open items value to be empty on every case ([PR #21728](https://github.com/microsoft/fluentui/pull/21728) by bsunderhus@microsoft.com)
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Breaking change: navigable becomes navigation ([PR #21729](https://github.com/microsoft/fluentui/pull/21729) by bsunderhus@microsoft.com)
- `@fluentui/react-aria`
  - fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
  - Fixing issue in useAriaButton where passing disabledFocusable=false caused aria-disabled to be set to false and appear in DOM instead of just be undefined for that element. ([PR #21703](https://github.com/microsoft/fluentui/pull/21703) by Humberto.Morimoto@microsoft.com)

## [9.0.0-rc.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-rc.1)

Thu, 10 Feb 2022 08:50:26 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-beta.5..@fluentui/react-components_v9.0.0-rc.1)

### Changes

- `@fluentui/react-tooltip`
  - BREAKING: implement `content` slot ([PR #21470](https://github.com/microsoft/fluentui/pull/21470) by olfedias@microsoft.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21422](https://github.com/microsoft/fluentui/pull/21422) by olfedias@microsoft.com)
  - Replace `triggerAriaAttribute` prop with `relationship` and make it required with no default ([PR #21331](https://github.com/microsoft/fluentui/pull/21331) by behowell@microsoft.com)
  - Update MenuTrigger and Tooltip to work together ([PR #21495](https://github.com/microsoft/fluentui/pull/21495) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Move arrowHeight and tooltipBorderRadius into a shared constants.ts file ([PR #21204](https://github.com/microsoft/fluentui/pull/21204) by behowell@microsoft.com)
  - Prevent Tooltip from overriding any aria-label, etc. props on its child ([PR #21532](https://github.com/microsoft/fluentui/pull/21532) by behowell@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21058](https://github.com/microsoft/fluentui/pull/21058) by Humberto.Morimoto@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20795](https://github.com/microsoft/fluentui/pull/20795) by olfedias@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Update documentation stories ([PR #21298](https://github.com/microsoft/fluentui/pull/21298) by behowell@microsoft.com)
  - update types related to trigger (allow only React.ReactElement & null) ([PR #21609](https://github.com/microsoft/fluentui/pull/21609) by olfedias@microsoft.com)
  - Fix tooltip arrow rendering, and add high contrast border around Tooltip ([PR #21086](https://github.com/microsoft/fluentui/pull/21086) by behowell@microsoft.com)
  - Remove Tooltip's inverted prop in favor of the appearance prop ([PR #21327](https://github.com/microsoft/fluentui/pull/21327) by behowell@microsoft.com)
- `@fluentui/react-utilities`
  - Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - getSlots: remove slotNames param, and infer from state.components instead ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - add useTriggerElement() hook ([PR #21225](https://github.com/microsoft/fluentui/pull/21225) by olfedias@microsoft.com)
  - Removes nullRender from react-utilities ([PR #21576](https://github.com/microsoft/fluentui/pull/21576) by bsunderhus@microsoft.com)
  - update applyTriggerPropsToChildren() to return React.ReactElement or null ([PR #21609](https://github.com/microsoft/fluentui/pull/21609) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Adding ComponentSlotProps to allow ref to be passed in composite components. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Renaming most _Shorthand_ composition types to _SlotProps_ so they better reflect what the types do. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Update trigger utilities to handle nested triggers ([PR #21495](https://github.com/microsoft/fluentui/pull/21495) by behowell@microsoft.com)
  - [breaking] Remove useControllableValue hook (use useControllableState instead) ([PR #20865](https://github.com/microsoft/fluentui/pull/20865) by elcraig@microsoft.com)
- `@fluentui/react-popover`
  - Updating based on removal of functions from makeStyles. ([PR #21239](https://github.com/microsoft/fluentui/pull/21239) by Humberto.Morimoto@microsoft.com)
  - use Griffel packages ([PR #21392](https://github.com/microsoft/fluentui/pull/21392) by olfedias@microsoft.com)
  - standardize trigger implementation & cloning ([PR #21609](https://github.com/microsoft/fluentui/pull/21609) by olfedias@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20796](https://github.com/microsoft/fluentui/pull/20796) by olfedias@microsoft.com)
  - fix: Use role=complementary for Popovers without focus traps ([PR #21416](https://github.com/microsoft/fluentui/pull/21416) by lingfangao@hotmail.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens ([PR #21049](https://github.com/microsoft/fluentui/pull/21049) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Fix Popover arrow border in high contrast ([PR #21086](https://github.com/microsoft/fluentui/pull/21086) by behowell@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - fix: Set `aria-modal` on Popover if focus trap is enabled ([PR #21387](https://github.com/microsoft/fluentui/pull/21387) by lingfangao@hotmail.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - remove unused dependency on Griffel ([PR #21393](https://github.com/microsoft/fluentui/pull/21393) by olfedias@microsoft.com)
- `@fluentui/react-positioning`
  - use new types from makeStyles core ([PR #20786](https://github.com/microsoft/fluentui/pull/20786) by olfedias@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21051](https://github.com/microsoft/fluentui/pull/21051) by Humberto.Morimoto@microsoft.com)
  - Fix tooltip arrow's high contrast border in RTL ([PR #21354](https://github.com/microsoft/fluentui/pull/21354) by behowell@microsoft.com)
  - use Griffel packages ([PR #21421](https://github.com/microsoft/fluentui/pull/21421) by olfedias@microsoft.com)
  - feat: Imperative `setTarget` for `usePopper` and `positioning` ([PR #21632](https://github.com/microsoft/fluentui/pull/21632) by lingfangao@hotmail.com)
  - Adds @noflip annotation to data-popper-placement styles ([PR #20845](https://github.com/microsoft/fluentui/pull/20845) by bsunderhus@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20842](https://github.com/microsoft/fluentui/pull/20842) by olfedias@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Fix popover arrow styling ([PR #21086](https://github.com/microsoft/fluentui/pull/21086) by behowell@microsoft.com)
- `@fluentui/react-provider`
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - use Griffel packages ([PR #21360](https://github.com/microsoft/fluentui/pull/21360) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - make the FluentProvider#theme TS API reflect runtime and add warning if there is a violation ([PR #21286](https://github.com/microsoft/fluentui/pull/21286) by martinhochel@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens ([PR #21052](https://github.com/microsoft/fluentui/pull/21052) by Humberto.Morimoto@microsoft.com)
  - replace mergeThemes functionality from react-theme ([PR #21278](https://github.com/microsoft/fluentui/pull/21278) by martinhochel@microsoft.com)
  - Remove `themeToCSSVariables` function ([PR #20828](https://github.com/microsoft/fluentui/pull/20828) by bsunderhus@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
- `@fluentui/react-shared-contexts`
  - make the ThemeContext TS API reflect runtime and remove redundant ThemeContextValue ([PR #21286](https://github.com/microsoft/fluentui/pull/21286) by martinhochel@microsoft.com)
  - Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - move slider to unstable ([PR #21506](https://github.com/microsoft/fluentui/pull/21506) by mgodbolt@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - Replace make-styles packages with griffel equivalents. ([PR #21424](https://github.com/microsoft/fluentui/pull/21424) by olfedias@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20844](https://github.com/microsoft/fluentui/pull/20844) by olfedias@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21056](https://github.com/microsoft/fluentui/pull/21056) by Humberto.Morimoto@microsoft.com)
  - Updating packages based on changes to focusIndicator functions to remove functions from makeStyles in @fluentui/react-tabster. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - feat: Support `options` for `findNextFocusable` and `findPrevFocusable` focus finders ([PR #21095](https://github.com/microsoft/fluentui/pull/21095) by lingfangao@hotmail.com)
  - chore: Bump tabster and keyborg versions ([PR #20889](https://github.com/microsoft/fluentui/pull/20889) by lingfangao@hotmail.com)
  - use Griffel packages ([PR #21419](https://github.com/microsoft/fluentui/pull/21419) by olfedias@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - use new types from makeStyles core ([PR #20786](https://github.com/microsoft/fluentui/pull/20786) by olfedias@microsoft.com)
  - react-tabster: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
  - chore: bump tabster to 1.1.1 - removes IE11 support ([PR #21319](https://github.com/microsoft/fluentui/pull/21319) by lingfangao@hotmail.com)
  - update styles to not use CSS shorthands ([PR #20842](https://github.com/microsoft/fluentui/pull/20842) by olfedias@microsoft.com)
- `@fluentui/react-text`
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - use makeStyles types from proper package ([PR #20786](https://github.com/microsoft/fluentui/pull/20786) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21057](https://github.com/microsoft/fluentui/pull/21057) by Humberto.Morimoto@microsoft.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - use Griffel packages ([PR #21418](https://github.com/microsoft/fluentui/pull/21418) by olfedias@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20841](https://github.com/microsoft/fluentui/pull/20841) by olfedias@microsoft.com)
- `@fluentui/react-theme`
  - feat(react-theme): Add colorNeutralForeground1Static token ([PR #21385](https://github.com/microsoft/fluentui/pull/21385) by miroslav.stastny@microsoft.com)
  - updating brand colors ([PR #20140](https://github.com/microsoft/fluentui/pull/20140) by andmarti@microsoft.com)
  - feat: Export tokens as mapping to CSS variables ([PR #21026](https://github.com/microsoft/fluentui/pull/21026) by Humberto.Morimoto@microsoft.com)
  - Extend brand ramp from 13 to 16 tokens ([PR #20884](https://github.com/microsoft/fluentui/pull/20884) by miroslav.stastny@microsoft.com)
  - remove mergeThemes API ([PR #21278](https://github.com/microsoft/fluentui/pull/21278) by martinhochel@microsoft.com)
  - Theme: Adding function to programmatically generate tokens object based on a theme. ([PR #21548](https://github.com/microsoft/fluentui/pull/21548) by Humberto.Morimoto@microsoft.com)
  - Remove `themeToCSSVariables` function ([PR #20828](https://github.com/microsoft/fluentui/pull/20828) by bsunderhus@microsoft.com)
  - feat(react-theme) Add border1 color token for shared colors ([PR #20963](https://github.com/microsoft/fluentui/pull/20963) by miroslav.stastny@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Allow React 17 in peerDependencies. ([PR #21544](https://github.com/microsoft/fluentui/pull/21544) by tristan.watanabe@gmail.com)
- `@fluentui/react-divider`
  - set minimum line length based on a11y review ([PR #21362](https://github.com/microsoft/fluentui/pull/21362) by gcox@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20817](https://github.com/microsoft/fluentui/pull/20817) by olfedias@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - react-divider: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21043](https://github.com/microsoft/fluentui/pull/21043) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Added aria-orientation to divider ([PR #21292](https://github.com/microsoft/fluentui/pull/21292) by gcox@microsoft.com)
  - Added missing descriptions to divider stories ([PR #21067](https://github.com/microsoft/fluentui/pull/21067) by gcox@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21433](https://github.com/microsoft/fluentui/pull/21433) by olfedias@microsoft.com)
- `@fluentui/react-image`
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - react-image: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21044](https://github.com/microsoft/fluentui/pull/21044) by Humberto.Morimoto@microsoft.com)
  - use Griffel packages ([PR #21432](https://github.com/microsoft/fluentui/pull/21432) by olfedias@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20818](https://github.com/microsoft/fluentui/pull/20818) by olfedias@microsoft.com)
- `@fluentui/react-input`
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Fix styling issues found in accessibility review ([PR #21205](https://github.com/microsoft/fluentui/pull/21205) by elcraig@microsoft.com)
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21431](https://github.com/microsoft/fluentui/pull/21431) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Initial release ([PR #21142](https://github.com/microsoft/fluentui/pull/21142) by elcraig@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens and removing old version of stories. ([PR #21045](https://github.com/microsoft/fluentui/pull/21045) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-label`
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21430](https://github.com/microsoft/fluentui/pull/21430) by olfedias@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - react-label: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21046](https://github.com/microsoft/fluentui/pull/21046) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-link`
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20819](https://github.com/microsoft/fluentui/pull/20819) by olfedias@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - use Griffel packages ([PR #21429](https://github.com/microsoft/fluentui/pull/21429) by olfedias@microsoft.com)
  - react-link: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21047](https://github.com/microsoft/fluentui/pull/21047) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - fix: set `aria-expanded` and `aria-haspopup` values correctly ([PR #20957](https://github.com/microsoft/fluentui/pull/20957) by lingfangao@hotmail.com)
  - fix: Focus on first menu item on click ([PR #20955](https://github.com/microsoft/fluentui/pull/20955) by lingfangao@hotmail.com)
  - fix: MenuTrigger should work correctly when `aria-disabled="true"` ([PR #21349](https://github.com/microsoft/fluentui/pull/21349) by lingfangao@hotmail.com)
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - Allow `MenuTrigger` to be wrapped by another trigger ([PR #21225](https://github.com/microsoft/fluentui/pull/21225) by lingfangao@hotmail.com)
  - update types related to trigger (allow only React.ReactElement & null) ([PR #21609](https://github.com/microsoft/fluentui/pull/21609) by olfedias@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating packages based on changes to focusIndicator functions to remove functions from makeStyles in @fluentui/react-tabster. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20820](https://github.com/microsoft/fluentui/pull/20820) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - fix: Call `useCheckmarkStyles` in `useMenuItemStyles` ([PR #20956](https://github.com/microsoft/fluentui/pull/20956) by lingfangao@hotmail.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Updating based on removal of functions from makeStyles. ([PR #21239](https://github.com/microsoft/fluentui/pull/21239) by Humberto.Morimoto@microsoft.com)
  - Update MenuTrigger and Tooltip to work together ([PR #21495](https://github.com/microsoft/fluentui/pull/21495) by behowell@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21048](https://github.com/microsoft/fluentui/pull/21048) by Humberto.Morimoto@microsoft.com)
  - use Griffel packages ([PR #21391](https://github.com/microsoft/fluentui/pull/21391) by olfedias@microsoft.com)
  - Apply fontSize styling to icon slot ([PR #21222](https://github.com/microsoft/fluentui/pull/21222) by behowell@microsoft.com)
  - Update react-icons usage to resizable icons ([PR #21074](https://github.com/microsoft/fluentui/pull/21074) by ololubek@microsoft.com)
  - feat: implement `MenuSplitGroup` component for split menu items ([PR #21095](https://github.com/microsoft/fluentui/pull/21095) by lingfangao@hotmail.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - (fix): Update react-icons dependency to latest version ([PR #20943](https://github.com/microsoft/fluentui/pull/20943) by ololubek@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - breaking: MenuTrigger must be the first child of the `Menu` ([PR #21096](https://github.com/microsoft/fluentui/pull/21096) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - (fix): Update react-icons dependency to latest version ([PR #20943](https://github.com/microsoft/fluentui/pull/20943) by ololubek@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Refactor and re-organize Badge styles; no visual changes. ([PR #21271](https://github.com/microsoft/fluentui/pull/21271) by behowell@microsoft.com)
  - Add fontSize styling to icon slot, to automatically size user-provided icons ([PR #21219](https://github.com/microsoft/fluentui/pull/21219) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20802](https://github.com/microsoft/fluentui/pull/20802) by olfedias@microsoft.com)
  - fix: use updated tokens for ghost and outline variants ([PR #20893](https://github.com/microsoft/fluentui/pull/20893) by lingfangao@hotmail.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - Allow React 17 in peerDependencies. ([PR #21544](https://github.com/microsoft/fluentui/pull/21544) by tristan.watanabe@gmail.com)
  - Update react-icons usage to resizable icons ([PR #21074](https://github.com/microsoft/fluentui/pull/21074) by ololubek@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - use Griffel packages ([PR #21437](https://github.com/microsoft/fluentui/pull/21437) by olfedias@microsoft.com)
  - react-badge: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21038](https://github.com/microsoft/fluentui/pull/21038) by Humberto.Morimoto@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - fix: Add uniform padding and modify gaps ([PR #20974](https://github.com/microsoft/fluentui/pull/20974) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Button: Changing border radius of small button to borderRadiusMedium from borderRadiusSmall. ([PR #21494](https://github.com/microsoft/fluentui/pull/21494) by Humberto.Morimoto@microsoft.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21436](https://github.com/microsoft/fluentui/pull/21436) by olfedias@microsoft.com)
  - Update react-icons usage to resizable icons ([PR #21074](https://github.com/microsoft/fluentui/pull/21074) by ololubek@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - (fix): Update react-icons dependency to latest version ([PR #20943](https://github.com/microsoft/fluentui/pull/20943) by ololubek@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21039](https://github.com/microsoft/fluentui/pull/21039) by Humberto.Morimoto@microsoft.com)
  - CompoundButton: Updating styles to match latest design spec. ([PR #21523](https://github.com/microsoft/fluentui/pull/21523) by Humberto.Morimoto@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Remove fontSize from default menuIcon, as it is already set via css ([PR #21221](https://github.com/microsoft/fluentui/pull/21221) by behowell@microsoft.com)
  - ToggleButton: Stopping aria-pressed from changing when ToggleButton is disabledFocusable. ([PR #21492](https://github.com/microsoft/fluentui/pull/21492) by Humberto.Morimoto@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20815](https://github.com/microsoft/fluentui/pull/20815) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - MenuButton: Updating types so it properly supports ref. ([PR #21515](https://github.com/microsoft/fluentui/pull/21515) by Humberto.Morimoto@microsoft.com)
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Updating packages based on changes to focusIndicator functions to remove functions from makeStyles in @fluentui/react-tabster. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - Update react-icons usage to resizable icons ([PR #21074](https://github.com/microsoft/fluentui/pull/21074) by ololubek@microsoft.com)
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - react-card: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21040](https://github.com/microsoft/fluentui/pull/21040) by Humberto.Morimoto@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Remove empty CardCommons type and outdated boilerplate comments ([PR #21150](https://github.com/microsoft/fluentui/pull/21150) by elcraig@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - use Griffel packages ([PR #21417](https://github.com/microsoft/fluentui/pull/21417) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - update styles no not use CSS shorthands ([PR #20794](https://github.com/microsoft/fluentui/pull/20794) by olfedias@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
- `@fluentui/react-checkbox`
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20816](https://github.com/microsoft/fluentui/pull/20816) by olfedias@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21435](https://github.com/microsoft/fluentui/pull/21435) by olfedias@microsoft.com)
  - Updating packages based on changes to focusIndicator functions to remove functions from makeStyles in @fluentui/react-tabster. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
  - Update checkmark icons and color styles to match visual spec ([PR #21011](https://github.com/microsoft/fluentui/pull/21011) by behowell@microsoft.com)
  - fix: update styles to match typings ([PR #20539](https://github.com/microsoft/fluentui/pull/20539) by olfedias@microsoft.com)
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21041](https://github.com/microsoft/fluentui/pull/21041) by Humberto.Morimoto@microsoft.com)
  - Bump Fluent UI dependencies to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Refactor Checkbox to use label as a slot instead of being the root ([PR #20904](https://github.com/microsoft/fluentui/pull/20904) by behowell@microsoft.com)
- `@fluentui/react-components`
  - Replace make-styles packages with griffel equivalents ([PR #21469](https://github.com/microsoft/fluentui/pull/21469) by olfedias@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Re-export shorthand functions for styles ([PR #20628](https://github.com/microsoft/fluentui/pull/20628) by olfedias@microsoft.com)
  - Add slider package to react-components ([PR #21506](https://github.com/microsoft/fluentui/pull/21506) by mgodbolt@microsoft.com)
  - Theme: Adding function to programmatically generate tokens object based on a theme. ([PR #21548](https://github.com/microsoft/fluentui/pull/21548) by Humberto.Morimoto@microsoft.com)
  - Remove `themeToCSSVariables` function ([PR #20828](https://github.com/microsoft/fluentui/pull/20828) by bsunderhus@microsoft.com)
  - Move Label to unstable ([PR #21672](https://github.com/microsoft/fluentui/pull/21672) by elcraig@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Remove exports of Commons types ([PR #21195](https://github.com/microsoft/fluentui/pull/21195) by elcraig@microsoft.com)
  - Remove AccordionHeaderExpandIcon ([PR #21218](https://github.com/microsoft/fluentui/pull/21218) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - breaking: stop exporting useTheme hook ([PR #21257](https://github.com/microsoft/fluentui/pull/21257) by olfedias@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Add Input components (exported as /unstable) ([PR #21142](https://github.com/microsoft/fluentui/pull/21142) by elcraig@microsoft.com)
  - remove mergeThemes from public API ([PR #21278](https://github.com/microsoft/fluentui/pull/21278) by martinhochel@microsoft.com)
  - Remove components' shorthandProps array exports ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
- `@fluentui/react-conformance-griffel`
  - add conformance tests for Griffel ([PR #21359](https://github.com/microsoft/fluentui/pull/21359) by olfedias@microsoft.com)
- `@fluentui/keyboard-keys`
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20800](https://github.com/microsoft/fluentui/pull/20800) by olfedias@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Allow React 17 in peerDependencies. ([PR #21544](https://github.com/microsoft/fluentui/pull/21544) by tristan.watanabe@gmail.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - use Griffel packages ([PR #21394](https://github.com/microsoft/fluentui/pull/21394) by olfedias@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Removes children as a slot from AccordionHeader ([PR #21285](https://github.com/microsoft/fluentui/pull/21285) by bsunderhus@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - update semantic elements and ARIA roles in react-accordion, add heading level story ([PR #21401](https://github.com/microsoft/fluentui/pull/21401) by sarah.higley@microsoft.com)
  - Update react-icons usage to resizable icons ([PR #21074](https://github.com/microsoft/fluentui/pull/21074) by ololubek@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Updating packages based on changes to focusIndicator functions to remove functions from makeStyles in @fluentui/react-tabster. ([PR #21035](https://github.com/microsoft/fluentui/pull/21035) by Humberto.Morimoto@microsoft.com)
  - Replacing use of functions in makeStyles with direct use of tokens. ([PR #21036](https://github.com/microsoft/fluentui/pull/21036) by Humberto.Morimoto@microsoft.com)
  - Remove AccordionHeaderExpandIcon, and use ChevronRightRegular from @fluentui/react-icons instead ([PR #21218](https://github.com/microsoft/fluentui/pull/21218) by behowell@microsoft.com)
- `@fluentui/react-aria`
  - remove Griffel packages ([PR #21440](https://github.com/microsoft/fluentui/pull/21440) by olfedias@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
- `@fluentui/react-avatar`
  - Updating use of tokens.fontWeight now that we don't need to use casting. ([PR #21217](https://github.com/microsoft/fluentui/pull/21217) by Humberto.Morimoto@microsoft.com)
  - Make Avatar's initials be un-selectable text ([PR #21638](https://github.com/microsoft/fluentui/pull/21638) by behowell@microsoft.com)
  - update @fluentui/react-icons package ([PR #21498](https://github.com/microsoft/fluentui/pull/21498) by olfedias@microsoft.com)
  - Replace make-styles packages with griffel equivalents. ([PR #21439](https://github.com/microsoft/fluentui/pull/21439) by olfedias@microsoft.com)
  - Update documentation stories ([PR #21519](https://github.com/microsoft/fluentui/pull/21519) by behowell@microsoft.com)
  - BREAKING: Rename component hooks add the suffix \_unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
  - Export the default getInitials implementation ([PR #21445](https://github.com/microsoft/fluentui/pull/21445) by behowell@microsoft.com)
  - (fix): Update react-icons dependency to latest version ([PR #20943](https://github.com/microsoft/fluentui/pull/20943) by ololubek@microsoft.com)
  - remove export of commons types ([PR #21660](https://github.com/microsoft/fluentui/pull/21660) by mgodbolt@microsoft.com)
  - Rename `label` slot to `initials`, remove `getInitials` prop, and improve accessibility ([PR #21346](https://github.com/microsoft/fluentui/pull/21346) by behowell@microsoft.com)
  - Update Avatar to have role="img" on the root, and other a11y fixes ([PR #21526](https://github.com/microsoft/fluentui/pull/21526) by behowell@microsoft.com)
  - update styles to not use CSS shorthands ([PR #20801](https://github.com/microsoft/fluentui/pull/20801) by olfedias@microsoft.com)
  - Updating based on changes to composition types. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
  - Fix Avatar's high contrast border on Windows ([PR #21637](https://github.com/microsoft/fluentui/pull/21637) by behowell@microsoft.com)
  - react-avatar: Replacing use of functions in makeStyles with direct use of tokens. ([PR #21037](https://github.com/microsoft/fluentui/pull/21037) by Humberto.Morimoto@microsoft.com)
  - Using ComponentSlotProps instead of ObjectShorthandProps. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
  - Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
  - Remove `glow` and `ring-glow` from activeAppearance, as their visuals are not yet finalized. ([PR #21480](https://github.com/microsoft/fluentui/pull/21480) by behowell@microsoft.com)
  - Update Avatar to use resizable icons ([PR #21160](https://github.com/microsoft/fluentui/pull/21160) by behowell@microsoft.com)
  - Remove component's shorthandProps array ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
  - Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)

## [9.0.0-beta.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-beta.5)

Thu, 25 Nov 2021 08:34:09 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-beta.4..@fluentui/react-components_v9.0.0-beta.5)

### Changes

- `@fluentui/react-utilities`
  - Update utility types to support specifying a primary slot other than root ([PR #20617](https://github.com/microsoft/fluentui/pull/20617) by behowell@microsoft.com)
- `@fluentui/make-styles`
  - Add development warning for unresolved style rules ([PR #20541](https://github.com/microsoft/fluentui/pull/20541) by lingfangao@hotmail.com)
  - Bumps rtl-css-js to 1.14.5, fixes[#20572](https://github.com/microsoft/fluentui/issues/20572) ([PR #20610](https://github.com/microsoft/fluentui/pull/20610) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - update react-icons dependency ([PR #20563](https://github.com/microsoft/fluentui/pull/20563) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - various styling fixes for base Badge component ([PR #20693](https://github.com/microsoft/fluentui/pull/20693) by lingfangao@hotmail.com)
  - Reduce colour set and align with base badge colours ([PR #20596](https://github.com/microsoft/fluentui/pull/20596) by lingfangao@hotmail.com)
  - update react-icons dependency ([PR #20563](https://github.com/microsoft/fluentui/pull/20563) by ololubek@microsoft.com)
  - Remove props and return correct presence icons ([PR #20630](https://github.com/microsoft/fluentui/pull/20630) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - MenuButton: Removing tight coupling with Menu by replicating type locally. ([PR #20635](https://github.com/microsoft/fluentui/pull/20635) by Humberto.Morimoto@microsoft.com)
  - update react-icons dependency ([PR #20563](https://github.com/microsoft/fluentui/pull/20563) by ololubek@microsoft.com)
- `@fluentui/react-card`
  - Migrate Card ([PR #20599](https://github.com/microsoft/fluentui/pull/20599) by andredias@microsoft.com)
- `@fluentui/react-checkbox`
  - Implement primary slot: 'input' is now the primary slot and receives native props passed to Checkbox ([PR #20617](https://github.com/microsoft/fluentui/pull/20617) by behowell@microsoft.com)
- `@fluentui/react-components`
  - Removing export stars in favor of named exports. ([PR #20665](https://github.com/microsoft/fluentui/pull/20665) by dzearing@microsoft.com)
- `@fluentui/react-label`
  - Add aria-hidden to Label required field ([PR #20680](https://github.com/microsoft/fluentui/pull/20680) by ololubek@microsoft.com)
- `@fluentui/react-menu`
  - update react-icons dependency ([PR #20563](https://github.com/microsoft/fluentui/pull/20563) by ololubek@microsoft.com)
- `@fluentui/react-popover`
  - Add transparent outline to arrow for HC ([PR #20541](https://github.com/microsoft/fluentui/pull/20541) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - Add utility function to create styles for an arrow element ([PR #20541](https://github.com/microsoft/fluentui/pull/20541) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Migrate Text ([PR #20653](https://github.com/microsoft/fluentui/pull/20653) by andredias@microsoft.com)
- `@fluentui/react-theme`
  - feat(react-theme): update shadow design tokens ([PR #20604](https://github.com/microsoft/fluentui/pull/20604) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tooltip`
  - Add transparent outline to arrow for HC ([PR #20541](https://github.com/microsoft/fluentui/pull/20541) by lingfangao@hotmail.com)

## [9.0.0-beta.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-beta.4)

Fri, 12 Nov 2021 13:25:06 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-beta.3..@fluentui/react-components_v9.0.0-beta.4)

### Changes

- `@fluentui/react-tabster`
  - Add useFocusableGroup hook ([PR #20132](https://github.com/microsoft/fluentui/pull/20132) by andredias@microsoft.com)
  - Use uncontrolled tabbing by default ([PR #20571](https://github.com/microsoft/fluentui/pull/20571) by lingfangao@hotmail.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - Bump tabster and keyborg to 1.0.7 ([PR #20593](https://github.com/microsoft/fluentui/pull/20593) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Updated with codesandbox comments ([PR #20371](https://github.com/microsoft/fluentui/pull/20371) by gcox@microsoft.com)
  - export static classes for components ([PR #20449](https://github.com/microsoft/fluentui/pull/20449) by olfedias@microsoft.com)
- `@fluentui/react-theme`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - feat(react-theme): add/update design tokens ([PR #20569](https://github.com/microsoft/fluentui/pull/20569) by miroslav.stastny@microsoft.com)
- `@fluentui/react-tooltip`
  - Updated stories to support codesandbox ([PR #20373](https://github.com/microsoft/fluentui/pull/20373) by gcox@microsoft.com)
  - export static classes for components ([PR #20455](https://github.com/microsoft/fluentui/pull/20455) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-utilities`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/babel-make-styles`
  - use latest @linaria/shaker version ([PR #20538](https://github.com/microsoft/fluentui/pull/20538) by olfedias@microsoft.com)
- `@fluentui/make-styles-webpack-loader`
  - use latest @linaria/shaker version ([PR #20538](https://github.com/microsoft/fluentui/pull/20538) by olfedias@microsoft.com)
  - Support resolve plugins from webpack config ([PR #20559](https://github.com/microsoft/fluentui/pull/20559) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - export static classes for components ([PR #20451](https://github.com/microsoft/fluentui/pull/20451) by olfedias@microsoft.com)
  - Updating AccordionHeader tests to match changes in useARIAButton. ([PR #20342](https://github.com/microsoft/fluentui/pull/20342) by Humberto.Morimoto@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-aria`
  - Fixing events being fired when button is disabledFocusable ([PR #20342](https://github.com/microsoft/fluentui/pull/20342) by Humberto.Morimoto@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-avatar`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - export static classes for components ([PR #20453](https://github.com/microsoft/fluentui/pull/20453) by olfedias@microsoft.com)
- `@fluentui/react-badge`
  - export static classes for components ([PR #20453](https://github.com/microsoft/fluentui/pull/20453) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-button`
  - export static classes for components ([PR #20454](https://github.com/microsoft/fluentui/pull/20454) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - react-button: Removing use of enzyme in the converged package. ([PR #20342](https://github.com/microsoft/fluentui/pull/20342) by Humberto.Morimoto@microsoft.com)
  - Fixing incomplete comment. ([PR #20273](https://github.com/microsoft/fluentui/pull/20273) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-card`
  - export static classes for components ([PR #20447](https://github.com/microsoft/fluentui/pull/20447) by olfedias@microsoft.com)
  - Migrate to new useFocusableGroup usage ([PR #20131](https://github.com/microsoft/fluentui/pull/20131) by andredias@microsoft.com)
- `@fluentui/react-checkbox`
  - export static classes for components ([PR #20454](https://github.com/microsoft/fluentui/pull/20454) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-components`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-context-selector`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-divider`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - Refactored divider stories for codesandbox ([PR #20393](https://github.com/microsoft/fluentui/pull/20393) by gcox@microsoft.com)
  - export static classes for components ([PR #20454](https://github.com/microsoft/fluentui/pull/20454) by olfedias@microsoft.com)
  - Divider: Updating the component to the latest patterns. ([PR #20273](https://github.com/microsoft/fluentui/pull/20273) by Humberto.Morimoto@microsoft.com)
  - Divider: Updating Spec to reflect changes that have happened since it was first created. ([PR #20441](https://github.com/microsoft/fluentui/pull/20441) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-image`
  - export static classes for components ([PR #20447](https://github.com/microsoft/fluentui/pull/20447) by olfedias@microsoft.com)
  - Updated Image stories with codesandbox export comments ([PR #20369](https://github.com/microsoft/fluentui/pull/20369) by gcox@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-label`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - export static classes for components ([PR #20456](https://github.com/microsoft/fluentui/pull/20456) by olfedias@microsoft.com)
- `@fluentui/react-link`
  - export static classes for components ([PR #20454](https://github.com/microsoft/fluentui/pull/20454) by olfedias@microsoft.com)
  - Updating Link tests. ([PR #20342](https://github.com/microsoft/fluentui/pull/20342) by Humberto.Morimoto@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-make-styles`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-menu`
  - Adds typings for `onCheckedValueChange` method ([PR #20493](https://github.com/microsoft/fluentui/pull/20493) by bsunderhus@microsoft.com)
  - use react-shared-contexts instead of react-provider ([PR #20578](https://github.com/microsoft/fluentui/pull/20578) by olfedias@microsoft.com)
  - export static classes for components ([PR #20450](https://github.com/microsoft/fluentui/pull/20450) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-popover`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - fix(Popover): use `dialog` as value for `aria-haspopup` for focus trap ([PR #20494](https://github.com/microsoft/fluentui/pull/20494) by lingfangao@hotmail.com)
  - export static classes for components ([PR #20450](https://github.com/microsoft/fluentui/pull/20450) by olfedias@microsoft.com)
- `@fluentui/react-portal`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - Broke up stories added codesandbox refs ([PR #20372](https://github.com/microsoft/fluentui/pull/20372) by gcox@microsoft.com)
- `@fluentui/react-positioning`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-provider`
  - export static classes for components ([PR #20451](https://github.com/microsoft/fluentui/pull/20451) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-shared-contexts`
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
- `@fluentui/react-slider`
  - export static classes for components ([PR #20455](https://github.com/microsoft/fluentui/pull/20455) by olfedias@microsoft.com)
  - Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)
  - remove temporary workaround with duplicated classes constants ([PR #20538](https://github.com/microsoft/fluentui/pull/20538) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - export static classes for components ([PR #20456](https://github.com/microsoft/fluentui/pull/20456) by olfedias@microsoft.com)

## [9.0.0-beta.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-beta.3)

Wed, 27 Oct 2021 12:14:12 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-beta.2..@fluentui/react-components_v9.0.0-beta.3)

### Changes

- `@fluentui/babel-make-styles`
  - Handle styles defined in an arrow function without any params ([PR #19894](https://github.com/microsoft/fluentui/pull/19894) by elcraig@microsoft.com)
- `@fluentui/make-styles`
  - fix(makeStyles): handle comma separated selectors ([PR #20348](https://github.com/microsoft/fluentui/pull/20348) by olfedias@microsoft.com)
- `@fluentui/react-menu`
  - Simplify type for MenuOpenChangeData ([PR #20096](https://github.com/microsoft/fluentui/pull/20096) by olfedias@microsoft.com)
- `@fluentui/react-popover`
  - Simplify type for OnOpenChangeData ([PR #20096](https://github.com/microsoft/fluentui/pull/20096) by olfedias@microsoft.com)
- `@fluentui/react-switch`
  - Changing the Switch's onKeyDown event to onKeyUp. ([PR #20217](https://github.com/microsoft/fluentui/pull/20217) by czearing@outlook.com)
- `@fluentui/react-theme`
  - fix(reat-theme): Remove template literal types for color palette ([PR #20251](https://github.com/microsoft/fluentui/pull/20251) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - remove compat utilities and types ([PR #20255](https://github.com/microsoft/fluentui/pull/20255) by olfedias@microsoft.com)
  - fix(getNativeElementPrps): Add support for `onAuxClick` ([PR #20343](https://github.com/microsoft/fluentui/pull/20343) by lingfangao@hotmail.com)

## [9.0.0-beta.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-beta.2)

Tue, 12 Oct 2021 19:45:58 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-beta.1..@fluentui/react-components_v9.0.0-beta.2)

### Changes

- `@fluentui/react-accordion`
  - Fix a11y errors on aria-expanded and disabled state ([PR #20132](https://github.com/microsoft/fluentui/pull/20132) by bsunderhus@microsoft.com)
- `@fluentui/react-card`
  - Migrate Card to new prop merging ([PR #20132](https://github.com/microsoft/fluentui/pull/20132) by andredias@microsoft.com)
  - Add keyboard focus interactions ([PR #20132](https://github.com/microsoft/fluentui/pull/20132) by andredias@microsoft.com)
- `@fluentui/react-tabster`
  - Add useFocusableGroup hook ([PR #20132](https://github.com/microsoft/fluentui/pull/20132) by andredias@microsoft.com)

## [9.0.0-beta.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-beta.1)

Wed, 06 Oct 2021 10:37:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.124..@fluentui/react-components_v9.0.0-beta.1)

### Changes

- `@fluentui/babel-make-styles`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/keyboard-keys`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/make-styles`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-card`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-make-styles`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-make-styles`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-theme`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)

## [9.0.0-alpha.124](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.124)

Tue, 05 Oct 2021 12:47:58 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.123..@fluentui/react-components_v9.0.0-alpha.124)

### Changes

- `@fluentui/babel-make-styles`
  - fix(babel-make-styles): Bump Linaria versions ([PR #20108](https://github.com/microsoft/fluentui/pull/20108) by lingfangao@hotmail.com)
- `@fluentui/make-styles`
  - fix insertion of keyframes ([PR #20108](https://github.com/microsoft/fluentui/pull/20108) by olfedias@microsoft.com)
- `@fluentui/make-styles-webpack-loader`
  - fix(babel-make-styles): Bump Linaria versions ([PR #20108](https://github.com/microsoft/fluentui/pull/20108) by lingfangao@hotmail.com)

## [9.0.0-alpha.123](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.123)

Tue, 05 Oct 2021 09:28:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.122..@fluentui/react-components_v9.0.0-alpha.123)

### Changes

- `@fluentui/react-accordion`
  - Adds ForwardRefComponent to components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-avatar`
  - Adds ForwardRefComponent to components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
  - Fix Avatar stories after #19449 ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-badge`
  - Adds ForwardRefComponent to react-badge components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-button`
  - Adds ForwardRefComponent to react-button components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-card`
  - Adds ForwardRefComponent to react-card components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-checkbox`
  - Adds ForwardRefComponent to react-label components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
  - Adds ForwardRefComponent to react-checkbox components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-divider`
  - Adds ForwardRefComponent to react-divider components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
  - react-divider prop merging follow up ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-image`
  - Adds ForwardRefComponent to react-image components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-label`
  - Adds ForwardRefComponent to react-label components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-link`
  - Add and use ForwardRefComponent helper type ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by elcraig@microsoft.com)
- `@fluentui/react-menu`
  - Adds ForwardRefComponent to react-menu components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-popover`
  - Adds ForwardRefComponent to react-popover components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-slider`
  - Adds ForwardRefComponent to react-slider components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-switch`
  - Adds ForwardRefComponent to react-switch components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-text`
  - Add and use ForwardRefComponent helper type ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by elcraig@microsoft.com)
- `@fluentui/react-tooltip`
  - Adds ForwardRefComponent to react-tooltip components declaration ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by bsunderhus@microsoft.com)
- `@fluentui/react-utilities`
  - Add and use ForwardRefComponent helper type ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by elcraig@microsoft.com)

## [9.0.0-alpha.122](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.122)

Mon, 04 Oct 2021 08:03:04 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.121..@fluentui/react-components_v9.0.0-alpha.122)

### Changes

- `@fluentui/react-card`
  - CardPreview removes own top margin when the first element in a Card ([commit](https://github.com/microsoft/fluentui/commit/97f5974a08246bd0475e8cb6650e7339f457c456) by andredias@microsoft.com)
- `@fluentui/react-avatar`
  - Fix getFilenameFromUrl implementation ([commit](https://github.com/microsoft/fluentui/commit/97f5974a08246bd0475e8cb6650e7339f457c456) by bsunderhus@microsoft.com)

## [9.0.0-alpha.121](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.121)

Fri, 01 Oct 2021 14:13:08 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.119..@fluentui/react-components_v9.0.0-alpha.121)

### Changes

- `@fluentui/babel-make-styles`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/keyboard-keys`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/make-styles`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-card`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-make-styles`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-make-styles`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-theme`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)

## [9.0.0-alpha.119](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.119)

Fri, 01 Oct 2021 12:30:46 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.118..@fluentui/react-components_v9.0.0-alpha.119)

### Changes

- `@fluentui/react-accordion`
  - Updating API to reflect aria button changes. ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-aria`
  - Removes disabled attribute when not required ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by bsunderhus@microsoft.com)
- `@fluentui/react-button`
  - Updates button to simplify prop merging ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by bsunderhus@microsoft.com)
- `@fluentui/react-link`
  - Adding comment for root slot. ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tooltip`
  - Apply tokens from refactored theme ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by miroslav.stastny@microsoft.com)
- `@fluentui/react-menu`
  - Remove focus `color` styling since it should use normal root `color` ([PR #18814](https://github.com/microsoft/fluentui/pull/18814) by lingfangao@hotmail.com)

## [9.0.0-alpha.118](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.118)

Fri, 01 Oct 2021 09:44:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.117..@fluentui/react-components_v9.0.0-alpha.118)

### Changes

- `@fluentui/react-accordion`
  - Use new default pseudo element focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - Use the renamed createCustomFocusIndicatorStyle helper for focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - Use new default pseudo element focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - Use the renamed createCustomFocusIndicatorStyle helper for focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - Use new default pseudo element focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
  - feat(Menu): Update styles from design spec ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Use new default pseudo element focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - Use new default pseudo element focus outline style ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - chore(react-tabster): Update default focus ring styles ([PR #19990](https://github.com/microsoft/fluentui/pull/19990) by lingfangao@hotmail.com)

## [9.0.0-alpha.117](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.117)

Thu, 30 Sep 2021 09:18:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.116..@fluentui/react-components_v9.0.0-alpha.117)

### Changes

- `@fluentui/react-menu`
  - export to codesandbox ([PR #19802](https://github.com/microsoft/fluentui/pull/19802) by peter@draxler.ml)

## [9.0.0-alpha.116](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.116)

Wed, 29 Sep 2021 08:06:11 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.115..@fluentui/react-components_v9.0.0-alpha.116)

### Changes

- `@fluentui/react-badge`
  - Add Storybook Controls to Badge documentation ([PR #19660](https://github.com/microsoft/fluentui/pull/19660) by peter@draxler.ml)
- `@fluentui/react-image`
  - Updated ImageProps for consistency ([PR #19660](https://github.com/microsoft/fluentui/pull/19660) by gcox@microsoft.com)
- `@fluentui/react-theme`
  - Use direct values in alias tokens ([PR #19660](https://github.com/microsoft/fluentui/pull/19660) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.115](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.115)

Mon, 27 Sep 2021 08:06:00 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.114..@fluentui/react-components_v9.0.0-alpha.115)

### Changes

- `@fluentui/make-styles`
  - handle classes from CSS modules in mergeClasses() ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by olfedias@microsoft.com)
- `@fluentui/react-avatar`
  - Refactor Avatar to remove mergeProps ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by behowell@microsoft.com)
- `@fluentui/react-badge`
  - Revert to ObjectShorthandProps for slots to allow correct typing in Avatar ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - Updates Checkbox to use LabelProps on root ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by bsunderhus@microsoft.com)
- `@fluentui/react-divider`
  - Updates divider to use new simplified slots ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by bsunderhus@microsoft.com)
- `@fluentui/react-link`
  - Link: Fixing issues found in a11y review. ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-popover`
  - fix(Popover): Add accessible border for HC ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Adding the RangedSlider component. ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by czearing@outlook.com)
- `@fluentui/react-tooltip`
  - Refactor Tooltip to remove mergeProps ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by behowell@microsoft.com)
- `@fluentui/react-utilities`
  - Updates ComponentState on custom props ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by bsunderhus@microsoft.com)

## [9.0.0-alpha.114](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.114)

Fri, 24 Sep 2021 09:17:17 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.113..@fluentui/react-components_v9.0.0-alpha.114)

### Changes

- `@fluentui/react-avatar`
  - Use updated sizes from BadgeProps ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by gcox@microsoft.com)
- `@fluentui/react-badge`
  - Update BadgeProps for consistency ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by gcox@microsoft.com)
- `@fluentui/react-components`
  - Added Text to react-components ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by tkrasniqi@microsoft.com)
- `@fluentui/react-image`
  - Added shadow prop ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by tkrasniqi@microsoft.com)
- `@fluentui/react-link`
  - Remove workaround for as prop with getNativeElementProps ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by andredias@microsoft.com)
- `@fluentui/react-menu`
  - fix(Menu): export useMenuPopoverStyles ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - fix(Popover): Remove leftover defaultProps and fix trigger props merge ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by lingfangao@hotmail.com)
  - Updated PopoverProps for consistency ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by gcox@microsoft.com)
- `@fluentui/react-text`
  - Remove workaround for as prop with getNativeElementProps ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by andredias@microsoft.com)
- `@fluentui/react-utilities`
  - Add as prop to properties allowed with getNativeElementProps ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by andredias@microsoft.com)

## [9.0.0-alpha.113](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.113)

Thu, 23 Sep 2021 08:21:31 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.112..@fluentui/react-components_v9.0.0-alpha.113)

### Changes

- `@fluentui/react-avatar`
  - Updated props for consistency across beta ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-button`
  - Updated for consistency to have shape and appearance properties ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-card`
  - Fix dependencies ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by andredias@microsoft.com)
  - Updated ButtonProps for consistency ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-components`
  - Fix dependencies ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by andredias@microsoft.com)
  - Updated ButtonProps for consistency ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-divider`
  - Updated DividerProps for consistency ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-link`
  - Updated LinkProps for consistency ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-switch`
  - Adding dragging to the Switch component. ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by czearing@outlook.com)
- `@fluentui/react-tooltip`
  - Updated ToolTipProps for consistency ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by gcox@microsoft.com)
- `@fluentui/react-utilities`
  - Adding clamp and getRTLSafeKey utilities. ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by czearing@outlook.com)

## [9.0.0-alpha.112](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.112)

Wed, 22 Sep 2021 10:10:05 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.111..@fluentui/react-components_v9.0.0-alpha.112)

### Changes

- `@fluentui/react-avatar`
  - update react-icons dependency ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by ololubek@microsoft.com)
- `@fluentui/react-badge`
  - refactor(Badge): Remove `mergeProps` and migrate to simple slots ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - update react-icons dependency ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by ololubek@microsoft.com)
  - SplitButton: Adding missing verticalAlign=middle style. ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - update react-icons dependency ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by ololubek@microsoft.com)
- `@fluentui/react-slider`
  - Cleaning up the Slider utils folder. ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by czearing@outlook.com)
- `@fluentui/react-switch`
  - Adding switch role to the hidden input element. ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by czearing@outlook.com)
- `@fluentui/react-text`
  - Migrate to simplified prop merging ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by andredias@microsoft.com)
- `@fluentui/react-utilities`
  - Moved from interfaces to types per RFC ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by gcox@microsoft.com)

## [9.0.0-alpha.111](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.111)

Tue, 21 Sep 2021 07:42:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.110..@fluentui/react-components_v9.0.0-alpha.111)

### Changes

- `@fluentui/react-accordion`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-avatar`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-badge`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-button`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-divider`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-image`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-label`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-link`
  - fix(Link): use `keyboard-keys` package ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by lingfangao@hotmail.com)
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-menu`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-popover`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-portal`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-slider`
  - Adding custom marks and mark labels. ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by czearing@outlook.com)
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)
- `@fluentui/react-theme`
  - Theme: Updating value of borderRadius global token. ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tooltip`
  - Updating to types over interfaces ([PR #19865](https://github.com/microsoft/fluentui/pull/19865) by gcox@microsoft.com)

## [9.0.0-alpha.110](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.110)

Mon, 20 Sep 2021 07:36:26 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.109..@fluentui/react-components_v9.0.0-alpha.110)

### Changes

- `@fluentui/babel-make-styles`
  - Bump @fluentui/babel-make-styles to v9.0.0-alpha.50 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump @fluentui/jest-serializer-make-styles to v9.0.0-alpha.43 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump @fluentui/make-styles-webpack-loader to v9.0.0-alpha.23 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Bump @fluentui/react-accordion to v9.0.0-alpha.78 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - Bump @fluentui/react-aria to v9.0.0-alpha.34 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - Bump @fluentui/react-avatar to v9.0.0-alpha.82 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - Bump @fluentui/react-badge to v9.0.0-alpha.82 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - SplitButton: Re-introducing SplitButton using the latest version of makeStyles. ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by Humberto.Morimoto@microsoft.com)
  - Bump @fluentui/react-button to v9.0.0-alpha.88 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-card`
  - Bump @fluentui/react-card to v9.0.0-alpha.4 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - Bump @fluentui/react-checkbox to v9.0.0-alpha.37 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - Bump @fluentui/react-components to v9.0.0-alpha.110 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-make-styles`
  - Bump @fluentui/react-conformance-make-styles to v9.0.0-alpha.12 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - Bump @fluentui/react-divider to v9.0.0-alpha.69 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - Removed conditional adding of aria-hidden ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by tkrasniqi@microsoft.com)
  - Bump @fluentui/react-image to v9.0.0-alpha.80 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - Bump @fluentui/react-label to v9.0.0-alpha.41 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - Bump @fluentui/react-link to v9.0.0-alpha.83 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-make-styles`
  - Bump @fluentui/react-make-styles to v9.0.0-alpha.68 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - Bump @fluentui/react-menu to v9.0.0-alpha.79 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - Bump @fluentui/react-popover to v9.0.0-alpha.45 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - Bump @fluentui/react-portal to v9.0.0-alpha.50 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - Bump @fluentui/react-positioning to v9.0.0-alpha.56 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - Bump @fluentui/react-provider to v9.0.0-alpha.79 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - Bump @fluentui/react-slider to v9.0.0-alpha.7 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - Bump @fluentui/react-switch to v9.0.0-alpha.6 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - Bump @fluentui/react-tabster to v9.0.0-alpha.62 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - Bump @fluentui/react-text to v9.0.0-alpha.17 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - Bump @fluentui/react-tooltip to v9.0.0-alpha.84 ([PR #19844](https://github.com/microsoft/fluentui/pull/19844) by lingfangao@hotmail.com)

## [9.0.0-alpha.109](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.109)

Fri, 17 Sep 2021 07:35:25 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.108..@fluentui/react-components_v9.0.0-alpha.109)

### Changes

- `@fluentui/react-button`
  - Modifying MenuButton to adhere to MenuTrigger changes. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Updating API comments to be more descriptive. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Bump @fluentui/react-button to v9.0.0-alpha.87 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-conformance-make-styles`
  - refactor(react-conformance-make-styles): react-conformance as dev deps ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by lingfangao@hotmail.com)
  - Bump @fluentui/react-conformance-make-styles to v9.0.0-alpha.11 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-image`
  - Bump @fluentui/react-image to v9.0.0-alpha.79 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-link`
  - Link: Refactor to use simplified prop merging. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Bump @fluentui/react-link to v9.0.0-alpha.82 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-menu`
  - Menu: Making MenuTrigger accept function components which customize where props go as children. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Bump @fluentui/react-menu to v9.0.0-alpha.78 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-slider`
  - Moving Slider logic into utils folder. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by czearing@outlook.com)
  - Bump @fluentui/react-slider to v9.0.0-alpha.6 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tooltip`
  - Refactoring out functionality that applies trigger props to children as a utility. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Bump @fluentui/react-tooltip to v9.0.0-alpha.83 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-utilities`
  - Refactoring out functionality that applies trigger props to children as a utility. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
  - Removes ExtractRef Typings ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by bsunderhus@microsoft.com)
- `@fluentui/react-card`
  - Bump @fluentui/react-card to v9.0.0-alpha.3 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-components`
  - Bump @fluentui/react-components to v9.0.0-alpha.109 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-accordion`
  - Bump @fluentui/react-accordion to v9.0.0-alpha.77 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-avatar`
  - Bump @fluentui/react-avatar to v9.0.0-alpha.81 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-badge`
  - Bump @fluentui/react-badge to v9.0.0-alpha.81 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-checkbox`
  - Bump @fluentui/react-checkbox to v9.0.0-alpha.36 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-divider`
  - Bump @fluentui/react-divider to v9.0.0-alpha.68 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-label`
  - Bump @fluentui/react-label to v9.0.0-alpha.40 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-popover`
  - Bump @fluentui/react-popover to v9.0.0-alpha.44 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-provider`
  - Bump @fluentui/react-provider to v9.0.0-alpha.78 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-switch`
  - Bump @fluentui/react-switch to v9.0.0-alpha.5 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-text`
  - Bump @fluentui/react-text to v9.0.0-alpha.16 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-aria`
  - Bump @fluentui/react-aria to v9.0.0-alpha.33 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-context-selector`
  - Bump @fluentui/react-context-selector to v9.0.0-alpha.32 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-make-styles`
  - Bump @fluentui/react-make-styles to v9.0.0-alpha.67 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-portal`
  - Bump @fluentui/react-portal to v9.0.0-alpha.49 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-positioning`
  - Bump @fluentui/react-positioning to v9.0.0-alpha.55 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/react-tabster`
  - Bump @fluentui/react-tabster to v9.0.0-alpha.61 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/babel-make-styles`
  - Bump @fluentui/babel-make-styles to v9.0.0-alpha.49 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump @fluentui/jest-serializer-make-styles to v9.0.0-alpha.42 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump @fluentui/make-styles-webpack-loader to v9.0.0-alpha.22 ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.108](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.108)

Thu, 16 Sep 2021 07:38:38 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.107..@fluentui/react-components_v9.0.0-alpha.108)

### Changes

- `@fluentui/react-accordion`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-accordion to v9.0.0-alpha.76 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-image`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-image to v9.0.0-alpha.78 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-menu`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-menu to v9.0.0-alpha.77 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-popover`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-popover to v9.0.0-alpha.43 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-provider`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-provider to v9.0.0-alpha.77 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-slider`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-slider to v9.0.0-alpha.5 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-switch`
  - Fix typings in React.forwardRef ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
  - Bump @fluentui/react-switch to v9.0.0-alpha.4 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-utilities`
  - Fix IntrinsicShorthandProps used in the root slot with multiple possible `as` values ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-components`
  - Bump @fluentui/react-components to v9.0.0-alpha.108 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-button`
  - Bump @fluentui/react-button to v9.0.0-alpha.86 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-card`
  - Bump @fluentui/react-card to v9.0.0-alpha.2 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-aria`
  - Bump @fluentui/react-aria to v9.0.0-alpha.32 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-avatar`
  - Bump @fluentui/react-avatar to v9.0.0-alpha.80 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-badge`
  - Bump @fluentui/react-badge to v9.0.0-alpha.80 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-checkbox`
  - Bump @fluentui/react-checkbox to v9.0.0-alpha.35 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-context-selector`
  - Bump @fluentui/react-context-selector to v9.0.0-alpha.31 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-divider`
  - Bump @fluentui/react-divider to v9.0.0-alpha.67 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-label`
  - Bump @fluentui/react-label to v9.0.0-alpha.39 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-link`
  - Bump @fluentui/react-link to v9.0.0-alpha.81 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-make-styles`
  - Bump @fluentui/react-make-styles to v9.0.0-alpha.66 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-portal`
  - Bump @fluentui/react-portal to v9.0.0-alpha.48 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-positioning`
  - Bump @fluentui/react-positioning to v9.0.0-alpha.54 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-tabster`
  - Bump @fluentui/react-tabster to v9.0.0-alpha.60 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-text`
  - Bump @fluentui/react-text to v9.0.0-alpha.15 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-tooltip`
  - Bump @fluentui/react-tooltip to v9.0.0-alpha.82 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/babel-make-styles`
  - Bump @fluentui/babel-make-styles to v9.0.0-alpha.48 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump @fluentui/jest-serializer-make-styles to v9.0.0-alpha.41 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/react-conformance-make-styles`
  - Bump @fluentui/react-conformance-make-styles to v9.0.0-alpha.10 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump @fluentui/make-styles-webpack-loader to v9.0.0-alpha.21 ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)

## [9.0.0-alpha.107](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.107)

Tue, 14 Sep 2021 20:09:01 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.106..@fluentui/react-components_v9.0.0-alpha.107)

### Changes

- `@fluentui/react-card`
  - Phase 1 release ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by andredias@microsoft.com)
  - Bump @fluentui/react-card to v9.0.0-alpha.1 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-components`
  - Add Card to unstable components ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by andredias@microsoft.com)
  - Bump @fluentui/react-components to v9.0.0-alpha.107 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-image`
  - Migrate to simplified slots ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by tkrasniqi@microsoft.com)
  - Bump @fluentui/react-image to v9.0.0-alpha.77 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-menu`
  - Bump @fluentui/react-menu to v9.0.0-alpha.76 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-utilities`
  - Adds ExtractRef typings to react-utilities to extract reference from props ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-button`
  - Bump @fluentui/react-button to v9.0.0-alpha.85 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-accordion`
  - Bump @fluentui/react-accordion to v9.0.0-alpha.75 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-aria`
  - Bump @fluentui/react-aria to v9.0.0-alpha.31 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-avatar`
  - Bump @fluentui/react-avatar to v9.0.0-alpha.79 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-badge`
  - Bump @fluentui/react-badge to v9.0.0-alpha.79 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-checkbox`
  - Bump @fluentui/react-checkbox to v9.0.0-alpha.34 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-context-selector`
  - Bump @fluentui/react-context-selector to v9.0.0-alpha.30 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-divider`
  - Bump @fluentui/react-divider to v9.0.0-alpha.66 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-label`
  - Bump @fluentui/react-label to v9.0.0-alpha.38 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-link`
  - Bump @fluentui/react-link to v9.0.0-alpha.80 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-make-styles`
  - Bump @fluentui/react-make-styles to v9.0.0-alpha.65 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-popover`
  - Bump @fluentui/react-popover to v9.0.0-alpha.42 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-portal`
  - Bump @fluentui/react-portal to v9.0.0-alpha.47 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-positioning`
  - Bump @fluentui/react-positioning to v9.0.0-alpha.53 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-provider`
  - Bump @fluentui/react-provider to v9.0.0-alpha.76 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-slider`
  - Bump @fluentui/react-slider to v9.0.0-alpha.4 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-switch`
  - Bump @fluentui/react-switch to v9.0.0-alpha.3 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-tabster`
  - Bump @fluentui/react-tabster to v9.0.0-alpha.59 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-text`
  - Bump @fluentui/react-text to v9.0.0-alpha.14 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-tooltip`
  - Bump @fluentui/react-tooltip to v9.0.0-alpha.81 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/babel-make-styles`
  - Bump @fluentui/babel-make-styles to v9.0.0-alpha.47 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/jest-serializer-make-styles`
  - Bump @fluentui/jest-serializer-make-styles to v9.0.0-alpha.40 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/react-conformance-make-styles`
  - Bump @fluentui/react-conformance-make-styles to v9.0.0-alpha.9 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)
- `@fluentui/make-styles-webpack-loader`
  - Bump @fluentui/make-styles-webpack-loader to v9.0.0-alpha.20 ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)

## [9.0.0-alpha.106](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.106)

Tue, 14 Sep 2021 07:38:18 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.105..@fluentui/react-components_v9.0.0-alpha.106)

### Changes

- `@fluentui/react-aria`
  - Generalize mergeARIADisabled ([PR #19605](https://github.com/microsoft/fluentui/pull/19605) by bsunderhus@microsoft.com)
- `@fluentui/react-popover`
  - refactor(Popover): Remove mergeProps and migrate to simple slots ([PR #19605](https://github.com/microsoft/fluentui/pull/19605) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - Bump @fluentui/react-accordion to v9.0.0-alpha.74 ([PR #19605](https://github.com/microsoft/fluentui/pull/19605) by bsunderhus@microsoft.com)
- `@fluentui/react-components`
  - Bump @fluentui/react-components to v9.0.0-alpha.106 ([PR #19605](https://github.com/microsoft/fluentui/pull/19605) by lingfangao@hotmail.com)

## [9.0.0-alpha.105](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.105)

Fri, 10 Sep 2021 16:31:52 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.104..@fluentui/react-components_v9.0.0-alpha.105)

### Changes

- `@fluentui/babel-make-styles`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/babel-make-styles to v9.0.0-alpha.46 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/jest-serializer-make-styles`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/jest-serializer-make-styles to v9.0.0-alpha.39 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/make-styles-webpack-loader`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/make-styles-webpack-loader to v9.0.0-alpha.19 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-accordion`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-accordion to v9.0.0-alpha.73 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-aria`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-aria to v9.0.0-alpha.29 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-avatar`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-avatar to v9.0.0-alpha.78 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-badge`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-badge to v9.0.0-alpha.78 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-button`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-button to v9.0.0-alpha.84 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-checkbox`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-checkbox to v9.0.0-alpha.33 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-components`
  - feat(react-components): Allow deep export of unstable components ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-components to v9.0.0-alpha.105 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-conformance-make-styles`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-conformance-make-styles to v9.0.0-alpha.8 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-context-selector`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-context-selector to v9.0.0-alpha.29 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-divider`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-divider to v9.0.0-alpha.65 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-image`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-image to v9.0.0-alpha.76 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-label`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-label to v9.0.0-alpha.37 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-link`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-link to v9.0.0-alpha.79 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-make-styles`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-make-styles to v9.0.0-alpha.64 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-menu`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-menu to v9.0.0-alpha.75 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-popover`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-popover to v9.0.0-alpha.40 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-portal`
  - use simplified prop merging ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by olfedias@microsoft.com)
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-portal to v9.0.0-alpha.46 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-positioning`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-positioning to v9.0.0-alpha.52 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-provider`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - use simplified prop mergin ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by olfedias@microsoft.com)
  - Bump @fluentui/react-provider to v9.0.0-alpha.75 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-shared-contexts`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-slider`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-slider to v9.0.0-alpha.3 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-switch`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-switch to v9.0.0-alpha.2 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-tabster`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-tabster to v9.0.0-alpha.58 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-text`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-text to v9.0.0-alpha.13 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-tooltip`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
  - Bump @fluentui/react-tooltip to v9.0.0-alpha.80 ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)
- `@fluentui/react-utilities`
  - chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)

## [9.0.0-alpha.104](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.104)

Fri, 10 Sep 2021 07:39:51 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.103..@fluentui/react-components_v9.0.0-alpha.104)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.72 ([PR #19642](https://github.com/microsoft/fluentui/pull/19642) by behowell@microsoft.com)

## [9.0.0-alpha.103](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.103)

Wed, 08 Sep 2021 07:34:11 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.102..@fluentui/react-components_v9.0.0-alpha.103)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.82 ([PR #19661](https://github.com/microsoft/fluentui/pull/19661) by lingfangao@hotmail.com)

## [9.0.0-alpha.102](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.102)

Mon, 06 Sep 2021 07:34:53 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.101..@fluentui/react-components_v9.0.0-alpha.102)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.81 ([PR #19638](https://github.com/microsoft/fluentui/pull/19638) by lingfangao@hotmail.com)

## [9.0.0-alpha.101](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.101)

Thu, 02 Sep 2021 07:36:46 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.100..@fluentui/react-components_v9.0.0-alpha.101)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.70 ([PR #19065](https://github.com/microsoft/fluentui/pull/19065) by olfedias@microsoft.com)

## [9.0.0-alpha.100](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.100)

Wed, 01 Sep 2021 07:39:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.99..@fluentui/react-components_v9.0.0-alpha.100)

### Changes

- Adding FAQ on moving to v9-BETA from v8. ([PR #19505](https://github.com/microsoft/fluentui/pull/19505) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.99](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.99)

Tue, 31 Aug 2021 07:37:47 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.98..@fluentui/react-components_v9.0.0-alpha.99)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.69 ([PR #19544](https://github.com/microsoft/fluentui/pull/19544) by olfedias@microsoft.com)

## [9.0.0-alpha.98](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.98)

Mon, 30 Aug 2021 07:35:05 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.97..@fluentui/react-components_v9.0.0-alpha.98)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.67 ([PR #19485](https://github.com/microsoft/fluentui/pull/19485) by dzearing@hotmail.com)

## [9.0.0-alpha.97](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.97)

Fri, 27 Aug 2021 07:33:32 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.96..@fluentui/react-components_v9.0.0-alpha.97)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.66 ([PR #19462](https://github.com/microsoft/fluentui/pull/19462) by olfedias@microsoft.com)

## [9.0.0-alpha.96](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.96)

Thu, 26 Aug 2021 07:35:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.95..@fluentui/react-components_v9.0.0-alpha.96)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.65 ([PR #19486](https://github.com/microsoft/fluentui/pull/19486) by martinhochel@microsoft.com)

## [9.0.0-alpha.95](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.95)

Fri, 20 Aug 2021 07:37:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.94..@fluentui/react-components_v9.0.0-alpha.95)

### Changes

- Update .npmignore ([PR #19441](https://github.com/microsoft/fluentui/pull/19441) by elcraig@microsoft.com)

## [9.0.0-alpha.94](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.94)

Thu, 19 Aug 2021 07:41:35 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.93..@fluentui/react-components_v9.0.0-alpha.94)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.63 ([PR #19273](https://github.com/microsoft/fluentui/pull/19273) by bsunderhus@microsoft.com)

## [9.0.0-alpha.93](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.93)

Mon, 16 Aug 2021 07:36:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.92..@fluentui/react-components_v9.0.0-alpha.93)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.63 ([PR #19364](https://github.com/microsoft/fluentui/pull/19364) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.92](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.92)

Fri, 13 Aug 2021 07:36:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.91..@fluentui/react-components_v9.0.0-alpha.92)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.62 ([PR #19339](https://github.com/microsoft/fluentui/pull/19339) by olfedias@microsoft.com)

## [9.0.0-alpha.91](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.91)

Wed, 11 Aug 2021 07:34:54 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.90..@fluentui/react-components_v9.0.0-alpha.91)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.61 ([PR #19256](https://github.com/microsoft/fluentui/pull/19256) by olfedias@microsoft.com)

## [9.0.0-alpha.90](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.90)

Tue, 10 Aug 2021 07:33:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.89..@fluentui/react-components_v9.0.0-alpha.90)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.60 ([PR #19322](https://github.com/microsoft/fluentui/pull/19322) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.89](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.89)

Fri, 06 Aug 2021 07:35:14 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.88..@fluentui/react-components_v9.0.0-alpha.89)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.65 ([PR #19281](https://github.com/microsoft/fluentui/pull/19281) by jspurlin@microsoft.com)

## [9.0.0-alpha.88](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.88)

Thu, 05 Aug 2021 07:34:24 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.87..@fluentui/react-components_v9.0.0-alpha.88)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.64 ([PR #18566](https://github.com/microsoft/fluentui/pull/18566) by behowell@microsoft.com)

## [9.0.0-alpha.87](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.87)

Tue, 03 Aug 2021 07:39:30 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.86..@fluentui/react-components_v9.0.0-alpha.87)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.3 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.67 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)

## [9.0.0-alpha.86](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.86)

Mon, 02 Aug 2021 07:36:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.85..@fluentui/react-components_v9.0.0-alpha.86)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.58 ([PR #19204](https://github.com/microsoft/fluentui/pull/19204) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.85](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.85)

Tue, 27 Jul 2021 07:34:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.84..@fluentui/react-components_v9.0.0-alpha.85)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.56 ([PR #19133](https://github.com/microsoft/fluentui/pull/19133) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.84](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.84)

Mon, 26 Jul 2021 07:37:30 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.83..@fluentui/react-components_v9.0.0-alpha.84)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.65 ([PR #18968](https://github.com/microsoft/fluentui/pull/18968) by olfedias@microsoft.com)

## [9.0.0-alpha.83](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.83)

Fri, 23 Jul 2021 07:38:19 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.82..@fluentui/react-components_v9.0.0-alpha.83)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.60 ([PR #19041](https://github.com/microsoft/fluentui/pull/19041) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.82](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.82)

Thu, 22 Jul 2021 07:36:55 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.81..@fluentui/react-components_v9.0.0-alpha.82)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.55 ([PR #19038](https://github.com/microsoft/fluentui/pull/19038) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.81](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.81)

Tue, 20 Jul 2021 22:23:17 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.80..@fluentui/react-components_v9.0.0-alpha.81)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.54 ([PR #18970](https://github.com/microsoft/fluentui/pull/18970) by olfedias@microsoft.com)

## [9.0.0-alpha.80](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.80)

Fri, 16 Jul 2021 22:53:17 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.79..@fluentui/react-components_v9.0.0-alpha.80)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.53 ([PR #18973](https://github.com/microsoft/fluentui/pull/18973) by olfedias@microsoft.com)

## [9.0.0-alpha.79](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.79)

Thu, 15 Jul 2021 07:36:18 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.78..@fluentui/react-components_v9.0.0-alpha.79)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.52 ([PR #18861](https://github.com/microsoft/fluentui/pull/18861) by bsunderhus@microsoft.com)

## [9.0.0-alpha.78](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.78)

Tue, 13 Jul 2021 22:32:58 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.77..@fluentui/react-components_v9.0.0-alpha.78)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.51 ([PR #18925](https://github.com/microsoft/fluentui/pull/18925) by elcraig@microsoft.com)

## [9.0.0-alpha.77](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.77)

Tue, 13 Jul 2021 07:35:36 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.76..@fluentui/react-components_v9.0.0-alpha.77)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.50 ([PR #18560](https://github.com/microsoft/fluentui/pull/18560) by behowell@microsoft.com)

## [9.0.0-alpha.76](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.76)

Mon, 12 Jul 2021 07:33:23 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.75..@fluentui/react-components_v9.0.0-alpha.76)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.49 ([PR #18879](https://github.com/microsoft/fluentui/pull/18879) by bsunderhus@microsoft.com)

## [9.0.0-alpha.75](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.75)

Fri, 09 Jul 2021 07:39:31 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.74..@fluentui/react-components_v9.0.0-alpha.75)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.2 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.56 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)

## [9.0.0-alpha.74](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.74)

Fri, 02 Jul 2021 23:15:55 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.73..@fluentui/react-components_v9.0.0-alpha.74)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.47 ([PR #18816](https://github.com/microsoft/fluentui/pull/18816) by olfedias@microsoft.com)

## [9.0.0-alpha.73](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.73)

Fri, 02 Jul 2021 07:37:06 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.72..@fluentui/react-components_v9.0.0-alpha.73)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.46 ([PR #18796](https://github.com/microsoft/fluentui/pull/18796) by bsunderhus@microsoft.com)

## [9.0.0-alpha.72](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.72)

Thu, 01 Jul 2021 07:35:05 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.71..@fluentui/react-components_v9.0.0-alpha.72)

### Changes

- remove @fluentui/react-theme-provider ([PR #18710](https://github.com/microsoft/fluentui/pull/18710) by olfedias@microsoft.com)

## [9.0.0-alpha.71](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.71)

Wed, 30 Jun 2021 07:38:35 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.70..@fluentui/react-components_v9.0.0-alpha.71)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.44 ([PR #18695](https://github.com/microsoft/fluentui/pull/18695) by tristan.watanabe@gmail.com)

## [9.0.0-alpha.70](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.70)

Tue, 29 Jun 2021 07:33:32 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.69..@fluentui/react-components_v9.0.0-alpha.70)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.43 ([PR #18698](https://github.com/microsoft/fluentui/pull/18698) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.69](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.69)

Thu, 24 Jun 2021 07:31:50 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.68..@fluentui/react-components_v9.0.0-alpha.69)

### Changes

- adding react-label to react-components ([PR #18601](https://github.com/microsoft/fluentui/pull/18601) by esteban.230@hotmail.com)

## [9.0.0-alpha.68](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.68)

Tue, 22 Jun 2021 07:35:11 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.67..@fluentui/react-components_v9.0.0-alpha.68)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.42 ([PR #18397](https://github.com/microsoft/fluentui/pull/18397) by olfedias@microsoft.com)

## [9.0.0-alpha.67](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.67)

Mon, 21 Jun 2021 07:34:33 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.66..@fluentui/react-components_v9.0.0-alpha.67)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.41 ([PR #18589](https://github.com/microsoft/fluentui/pull/18589) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.66](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.66)

Thu, 17 Jun 2021 07:34:11 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.65..@fluentui/react-components_v9.0.0-alpha.66)

### Changes

- Bump @fluentui/react-portal to v9.0.0-alpha.21 ([PR #18482](https://github.com/microsoft/fluentui/pull/18482) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.65](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.65)

Wed, 16 Jun 2021 07:34:24 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.64..@fluentui/react-components_v9.0.0-alpha.65)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.40 ([PR #18567](https://github.com/microsoft/fluentui/pull/18567) by bsunderhus@microsoft.com)

## [9.0.0-alpha.64](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.64)

Tue, 15 Jun 2021 07:40:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.63..@fluentui/react-components_v9.0.0-alpha.64)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.39 ([PR #18553](https://github.com/microsoft/fluentui/pull/18553) by bsunderhus@microsoft.com)

## [9.0.0-alpha.63](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.63)

Fri, 11 Jun 2021 07:34:26 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.62..@fluentui/react-components_v9.0.0-alpha.63)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.47 ([PR #18497](https://github.com/microsoft/fluentui/pull/18497) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.62](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.62)

Thu, 10 Jun 2021 07:32:59 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.61..@fluentui/react-components_v9.0.0-alpha.62)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.46 ([PR #18468](https://github.com/microsoft/fluentui/pull/18468) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.61](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.61)

Wed, 09 Jun 2021 07:33:38 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.60..@fluentui/react-components_v9.0.0-alpha.61)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.38 ([PR #18419](https://github.com/microsoft/fluentui/pull/18419) by bsunderhus@microsoft.com)

## [9.0.0-alpha.60](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.60)

Tue, 08 Jun 2021 07:32:44 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.59..@fluentui/react-components_v9.0.0-alpha.60)

### Changes

- Bump @fluentui/react-popover to v9.0.0-alpha.6 ([PR #18456](https://github.com/microsoft/fluentui/pull/18456) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.59](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.59)

Mon, 07 Jun 2021 07:38:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.58..@fluentui/react-components_v9.0.0-alpha.59)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.1 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.44 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)

## [9.0.0-alpha.58](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.58)

Fri, 04 Jun 2021 07:37:23 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.57..@fluentui/react-components_v9.0.0-alpha.58)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.43 ([PR #18168](https://github.com/microsoft/fluentui/pull/18168) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.57](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.57)

Thu, 03 Jun 2021 07:36:03 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.56..@fluentui/react-components_v9.0.0-alpha.57)

### Changes

- Bump @fluentui/react-portal to v9.0.0-alpha.18 ([PR #18401](https://github.com/microsoft/fluentui/pull/18401) by martinhochel@microsoft.com)

## [9.0.0-alpha.56](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.56)

Wed, 02 Jun 2021 07:37:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.55..@fluentui/react-components_v9.0.0-alpha.56)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.34 ([PR #18404](https://github.com/microsoft/fluentui/pull/18404) by bsunderhus@microsoft.com)

## [9.0.0-alpha.55](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.55)

Tue, 01 Jun 2021 07:31:58 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.54..@fluentui/react-components_v9.0.0-alpha.55)

### Changes

- Export Popover component ([PR #18392](https://github.com/microsoft/fluentui/pull/18392) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.54](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.54)

Mon, 31 May 2021 07:33:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.53..@fluentui/react-components_v9.0.0-alpha.54)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.41 ([PR #18311](https://github.com/microsoft/fluentui/pull/18311) by behowell@microsoft.com)

## [9.0.0-alpha.53](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.53)

Fri, 28 May 2021 07:33:57 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.52..@fluentui/react-components_v9.0.0-alpha.53)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.29 ([PR #18312](https://github.com/microsoft/fluentui/pull/18312) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.52](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.52)

Thu, 27 May 2021 07:33:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.51..@fluentui/react-components_v9.0.0-alpha.52)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.28 ([PR #18335](https://github.com/microsoft/fluentui/pull/18335) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.51](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.51)

Wed, 26 May 2021 07:35:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.50..@fluentui/react-components_v9.0.0-alpha.51)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.33 ([PR #18323](https://github.com/microsoft/fluentui/pull/18323) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.50](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.50)

Tue, 25 May 2021 01:11:03 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.49..@fluentui/react-components_v9.0.0-alpha.50)

### Changes

- Force publish to work around beachball bug ([commit](https://github.com/microsoft/fluentui/commit/083f15a4c1434256223bc06710a69dfb8fd8912d) by elcraig@microsoft.com)

## [9.0.0-alpha.49](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.49)

Mon, 24 May 2021 07:35:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.48..@fluentui/react-components_v9.0.0-alpha.49)

### Changes

- export SSRProvider ([PR #18217](https://github.com/microsoft/fluentui/pull/18217) by olfedias@microsoft.com)

## [9.0.0-alpha.48](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.48)

Fri, 21 May 2021 07:34:54 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.47..@fluentui/react-components_v9.0.0-alpha.48)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.39 ([PR #18238](https://github.com/microsoft/fluentui/pull/18238) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.47](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.47)

Thu, 20 May 2021 07:41:54 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.46..@fluentui/react-components_v9.0.0-alpha.47)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.0 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.38 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)

## [9.0.0-alpha.46](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.46)

Wed, 19 May 2021 07:34:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.45..@fluentui/react-components_v9.0.0-alpha.46)

### Changes

- Bump @fluentui/react-provider to v9.0.0-alpha.38 ([PR #18037](https://github.com/microsoft/fluentui/pull/18037) by olfedias@microsoft.com)

## [9.0.0-alpha.45](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.45)

Tue, 18 May 2021 07:34:38 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.44..@fluentui/react-components_v9.0.0-alpha.45)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.29 ([PR #18171](https://github.com/microsoft/fluentui/pull/18171) by olfedias@microsoft.com)

## [9.0.0-alpha.44](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.44)

Thu, 13 May 2021 07:36:55 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.43..@fluentui/react-components_v9.0.0-alpha.44)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.28 ([PR #18039](https://github.com/microsoft/fluentui/pull/18039) by olfedias@microsoft.com)

## [9.0.0-alpha.43](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.43)

Wed, 12 May 2021 07:36:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.42..@fluentui/react-components_v9.0.0-alpha.43)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.27 ([PR #18097](https://github.com/microsoft/fluentui/pull/18097) by olfedias@microsoft.com)

## [9.0.0-alpha.42](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.42)

Mon, 10 May 2021 07:36:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.41..@fluentui/react-components_v9.0.0-alpha.42)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.26 ([PR #18095](https://github.com/microsoft/fluentui/pull/18095) by olfedias@microsoft.com)

## [9.0.0-alpha.41](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.41)

Wed, 05 May 2021 07:36:50 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.40..@fluentui/react-components_v9.0.0-alpha.41)

### Changes

- Bump @fluentui/react-portal to v9.0.0-alpha.8 ([PR #18038](https://github.com/microsoft/fluentui/pull/18038) by olfedias@microsoft.com)

## [9.0.0-alpha.40](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.40)

Tue, 04 May 2021 07:36:35 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.39..@fluentui/react-components_v9.0.0-alpha.40)

### Changes

- Bump @fluentui/react-tooltip to v9.0.0-alpha.29 ([PR #18015](https://github.com/microsoft/fluentui/pull/18015) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.39](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.39)

Mon, 03 May 2021 07:45:19 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.38..@fluentui/react-components_v9.0.0-alpha.39)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.24 ([PR #18005](https://github.com/microsoft/fluentui/pull/18005) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.38](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.38)

Fri, 30 Apr 2021 07:42:23 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.37..@fluentui/react-components_v9.0.0-alpha.38)

### Patches

- Bump @fluentui/eslint-plugin to v1.2.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)

### Changes

- Upgrade typescript to 4.1.5 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)

## [9.0.0-alpha.37](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.37)

Wed, 28 Apr 2021 07:32:59 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.36..@fluentui/react-components_v9.0.0-alpha.37)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.22 ([PR #17971](https://github.com/microsoft/fluentui/pull/17971) by olfedias@microsoft.com)

## [9.0.0-alpha.36](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.36)

Tue, 27 Apr 2021 07:34:03 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.35..@fluentui/react-components_v9.0.0-alpha.36)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.21 ([PR #17922](https://github.com/microsoft/fluentui/pull/17922) by bsunderhus@microsoft.com)

## [9.0.0-alpha.35](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.35)

Mon, 26 Apr 2021 07:34:31 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.34..@fluentui/react-components_v9.0.0-alpha.35)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.20 ([PR #17936](https://github.com/microsoft/fluentui/pull/17936) by bsunderhus@microsoft.com)

## [9.0.0-alpha.34](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.34)

Fri, 23 Apr 2021 07:37:10 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.33..@fluentui/react-components_v9.0.0-alpha.34)

### Patches

- Bump @fluentui/eslint-plugin to v1.1.1 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.27 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)

## [9.0.0-alpha.33](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.33)

Thu, 22 Apr 2021 07:33:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.32..@fluentui/react-components_v9.0.0-alpha.33)

### Changes

- Export portal from react-components ([PR #17870](https://github.com/microsoft/fluentui/pull/17870) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.32](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.32)

Wed, 21 Apr 2021 07:31:50 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.31..@fluentui/react-components_v9.0.0-alpha.32)

### Changes

- Export Tooltip component ([PR #17842](https://github.com/microsoft/fluentui/pull/17842) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.31](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.31)

Tue, 20 Apr 2021 07:31:35 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.30..@fluentui/react-components_v9.0.0-alpha.31)

### Changes

- Export Badge component ([PR #17858](https://github.com/microsoft/fluentui/pull/17858) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.30](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.30)

Fri, 16 Apr 2021 18:08:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.29..@fluentui/react-components_v9.0.0-alpha.30)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.15 ([PR #17840](https://github.com/microsoft/fluentui/pull/17840) by bsunderhus@microsoft.com)

## [9.0.0-alpha.29](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.29)

Fri, 16 Apr 2021 07:32:08 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.28..@fluentui/react-components_v9.0.0-alpha.29)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.7 ([PR #17812](https://github.com/microsoft/fluentui/pull/17812) by behowell@microsoft.com)

## [9.0.0-alpha.28](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.28)

Wed, 14 Apr 2021 07:34:12 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.27..@fluentui/react-components_v9.0.0-alpha.28)

### Changes

- Bump @fluentui/react-accordion to v9.0.0-alpha.14 ([PR #17707](https://github.com/microsoft/fluentui/pull/17707) by bsunderhus@microsoft.com)

## [9.0.0-alpha.27](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.27)

Tue, 13 Apr 2021 14:55:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.26..@fluentui/react-components_v9.0.0-alpha.27)

### Changes

- Adds react-accordion to react-components ([PR #17781](https://github.com/microsoft/fluentui/pull/17781) by bsunderhus@microsoft.com)

## [9.0.0-alpha.26](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.26)

Fri, 09 Apr 2021 23:42:49 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.25..@fluentui/react-components_v9.0.0-alpha.26)

### Changes

- Re-export react-theme-provider ([PR #17755](https://github.com/microsoft/fluentui/pull/17755) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.25](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.25)

Fri, 09 Apr 2021 07:31:06 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.24..@fluentui/react-components_v9.0.0-alpha.25)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.21 ([PR #17670](https://github.com/microsoft/fluentui/pull/17670) by olfedias@microsoft.com)

## [9.0.0-alpha.24](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.24)

Thu, 08 Apr 2021 07:33:06 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.23..@fluentui/react-components_v9.0.0-alpha.24)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.20 ([PR #17676](https://github.com/microsoft/fluentui/pull/17676) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.23](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.23)

Wed, 07 Apr 2021 08:04:03 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.22..@fluentui/react-components_v9.0.0-alpha.23)

### Changes

- Bump @fluentui/react-menu to v9.0.0-alpha.2 ([PR #17712](https://github.com/microsoft/fluentui/pull/17712) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.22](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.22)

Thu, 01 Apr 2021 20:13:37 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.21..@fluentui/react-components_v9.0.0-alpha.22)

### Changes

- Add react-menu ([PR #17666](https://github.com/microsoft/fluentui/pull/17666) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.21](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.21)

Wed, 31 Mar 2021 07:30:57 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.20..@fluentui/react-components_v9.0.0-alpha.21)

### Changes

- Bump @fluentui/react-link to v9.0.0-alpha.18 ([PR #17621](https://github.com/microsoft/fluentui/pull/17621) by olfedias@microsoft.com)

## [9.0.0-alpha.20](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.20)

Wed, 31 Mar 2021 00:53:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.19..@fluentui/react-components_v9.0.0-alpha.20)

### Patches

- Bump @fluentui/eslint-plugin to v1.1.0 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.18 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)

## [9.0.0-alpha.19](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.19)

Tue, 30 Mar 2021 07:34:45 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.18..@fluentui/react-components_v9.0.0-alpha.19)

### Changes

- chore: restore "sideEffects" to enable treeshaking ([PR #17584](https://github.com/microsoft/fluentui/pull/17584) by olfedias@microsoft.com)

## [9.0.0-alpha.18](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.18)

Fri, 26 Mar 2021 07:32:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.17..@fluentui/react-components_v9.0.0-alpha.18)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.16 ([PR #17566](https://github.com/microsoft/fluentui/pull/17566) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.17](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.17)

Thu, 25 Mar 2021 07:33:24 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.16..@fluentui/react-components_v9.0.0-alpha.17)

### Changes

- Adds react-divider as dependency and re-export it ([PR #17540](https://github.com/microsoft/fluentui/pull/17540) by bsunderhus@microsoft.com)

## [9.0.0-alpha.16](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.16)

Wed, 24 Mar 2021 07:32:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.15..@fluentui/react-components_v9.0.0-alpha.16)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.14 ([PR #17514](https://github.com/microsoft/fluentui/pull/17514) by bsunderhus@microsoft.com)

## [9.0.0-alpha.15](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.15)

Tue, 23 Mar 2021 07:31:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.14..@fluentui/react-components_v9.0.0-alpha.15)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.13 ([PR #17339](https://github.com/microsoft/fluentui/pull/17339) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.14](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.14)

Fri, 19 Mar 2021 07:32:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.13..@fluentui/react-components_v9.0.0-alpha.14)

### Changes

- Bump @fluentui/react-image to v9.0.0-alpha.13 ([PR #17441](https://github.com/microsoft/fluentui/pull/17441) by bsunderhus@microsoft.com)

## [9.0.0-alpha.13](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.13)

Thu, 18 Mar 2021 20:15:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.12..@fluentui/react-components_v9.0.0-alpha.13)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.12 ([PR #17387](https://github.com/microsoft/fluentui/pull/17387) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.12](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.12)

Wed, 17 Mar 2021 07:35:44 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.11..@fluentui/react-components_v9.0.0-alpha.12)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.12 ([PR #17410](https://github.com/microsoft/fluentui/pull/17410) by olfedias@microsoft.com)

## [9.0.0-alpha.11](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.11)

Tue, 16 Mar 2021 07:32:44 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.10..@fluentui/react-components_v9.0.0-alpha.11)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.11 ([PR #17418](https://github.com/microsoft/fluentui/pull/17418) by elcraig@microsoft.com)

## [9.0.0-alpha.10](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.10)

Mon, 15 Mar 2021 07:36:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.9..@fluentui/react-components_v9.0.0-alpha.10)

### Changes

- Remove set-version references ([PR #17381](https://github.com/microsoft/fluentui/pull/17381) by elcraig@microsoft.com)

## [9.0.0-alpha.9](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.9)

Fri, 12 Mar 2021 20:04:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.8..@fluentui/react-components_v9.0.0-alpha.9)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.9 ([PR #17373](https://github.com/microsoft/fluentui/pull/17373) by elcraig@microsoft.com)

## [9.0.0-alpha.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.8)

Wed, 10 Mar 2021 07:34:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.7..@fluentui/react-components_v9.0.0-alpha.8)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.8 ([PR #17341](https://github.com/microsoft/fluentui/pull/17341) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.7)

Fri, 05 Mar 2021 20:30:59 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.6..@fluentui/react-components_v9.0.0-alpha.7)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.7 ([PR #17273](https://github.com/microsoft/fluentui/pull/17273) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.6)

Wed, 03 Mar 2021 00:10:09 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.5..@fluentui/react-components_v9.0.0-alpha.6)

### Changes

- Remove set-version dependency from converged components ([PR #17211](https://github.com/microsoft/fluentui/pull/17211) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.5)

Tue, 02 Mar 2021 07:24:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.4..@fluentui/react-components_v9.0.0-alpha.5)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.5 ([PR #17197](https://github.com/microsoft/fluentui/pull/17197) by olfedias@microsoft.com)

## [9.0.0-alpha.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.4)

Fri, 26 Feb 2021 01:16:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.3..@fluentui/react-components_v9.0.0-alpha.4)

### Patches

- Bump @fluentui/eslint-plugin to v1.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/set-version to v8.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)

### Changes

- Update references to major-bumped packages ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)

## [9.0.0-alpha.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.3)

Thu, 25 Feb 2021 20:16:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.2..@fluentui/react-components_v9.0.0-alpha.3)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.3 ([PR #17060](https://github.com/microsoft/fluentui/pull/17060) by me@levithomason.com)

## [9.0.0-alpha.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.2)

Thu, 25 Feb 2021 01:15:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.1..@fluentui/react-components_v9.0.0-alpha.2)

### Changes

- Bump @fluentui/react-avatar to v9.0.0-alpha.2 ([PR #17118](https://github.com/microsoft/fluentui/pull/17118) by altinokd@microsoft.com)

## [9.0.0-alpha.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.1)

Wed, 24 Feb 2021 00:05:29 GMT

### Changes

- feat(react-components): add suite package ([PR #17100](https://github.com/microsoft/fluentui/pull/17100) by miroslav.stastny@microsoft.com)
