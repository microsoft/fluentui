# Change Log - office-ui-fabric-react

This log was last generated on Fri, 14 Aug 2020 12:43:53 GMT and should not be manually modified.

<!-- Start content -->

## [7.128.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.128.1)

Fri, 14 Aug 2020 12:43:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.128.0..office-ui-fabric-react_v7.128.1)

### Patches

- Pickers: Update to be concurrent compatible ([PR #14491](https://github.com/microsoft/fluentui/pull/14491) by joschect@microsoft.com)
- Link: Fixing High Contrast styling of links rendered as buttons. ([PR #14497](https://github.com/microsoft/fluentui/pull/14497) by humbertomakotomorimoto@gmail.com)

## [7.128.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.128.0)

Thu, 13 Aug 2020 12:41:58 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.127.1..office-ui-fabric-react_v7.128.0)

### Minor changes

- BasePicker's onDismiss can now return a boolean to decide if an item is selected ([PR #14302](https://github.com/microsoft/fluentui/pull/14302) by t-jamle@microsoft.com)

## [7.127.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.127.1)

Wed, 12 Aug 2020 18:34:18 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.127.0..office-ui-fabric-react_v7.127.1)

### Patches

- CommandBar: Show tooltipHost.content when iconMode = true even when text/name is provided in commandBarItemProps ([PR #14323](https://github.com/microsoft/fluentui/pull/14323) by prandala@microsoft.com)
- Dropdown: Correctly updating set-size when number of options updates after first render. ([PR #14415](https://github.com/microsoft/fluentui/pull/14415) by humbertomakotomorimoto@gmail.com)
- Tooltip: Stopping propagation when clicking Esc on tooltip host. ([PR #14476](https://github.com/microsoft/fluentui/pull/14476) by humbertomakotomorimoto@gmail.com)

## [7.127.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.127.0)

Tue, 11 Aug 2020 05:47:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.126.3..office-ui-fabric-react_v7.127.0)

### Minor changes

- ContextualMenu: Add another prop to allow users to override default focus restoring behavior. This fixes an issue where it would not restore focus correctly when contextualmenu is hidden. ([PR #14351](https://github.com/microsoft/fluentui/pull/14351) by joschect@microsoft.com)

### Patches

- Updating Announced, GroupedList, Coachmark, and ExtendedPeoplePicker examples to use function components ([PR #13912](https://github.com/microsoft/fluentui/pull/13912) by czearing@outlook.com)
- Prettier fix. ([PR #14018](https://github.com/microsoft/fluentui/pull/14018) by humbertomakotomorimoto@gmail.com)

## [7.126.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.126.3)

Mon, 10 Aug 2020 06:19:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.126.1..office-ui-fabric-react_v7.126.3)

### Patches

- Accessibility fix for links in dark mode ([PR #14270](https://github.com/microsoft/fluentui/pull/14270) by marygans@microsoft.com)
- FocusTrapZone: Adding aria-hidden to bumper elements so that they are not read by screen readers. ([PR #14376](https://github.com/microsoft/fluentui/pull/14376) by humbertomakotomorimoto@gmail.com)
- ContextualMenu: Modifying examples so that screen readers read the different ways to open a submenu. ([PR #14401](https://github.com/microsoft/fluentui/pull/14401) by humbertomakotomorimoto@gmail.com)
- Fix input and label IDs not respected by choice group option. ([PR #14387](https://github.com/microsoft/fluentui/pull/14387) by supsing@microsoft.com)
- Add HC styling to fix ProgressIndicator progress bar ([PR #14410](https://github.com/microsoft/fluentui/pull/14410) by ololubek@microsoft.com)
- Add HC styling to make clickable and nonclickable items differentiable ([PR #14411](https://github.com/microsoft/fluentui/pull/14411) by ololubek@microsoft.com)

## [7.126.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.126.1)

Thu, 06 Aug 2020 12:40:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.126.0..office-ui-fabric-react_v7.126.1)

### Patches

- Updating Shimmer and Stack to function components. ([PR #13849](https://github.com/microsoft/fluentui/pull/13849) by czearing@outlook.com)
- Updating Picker, TagPicker, and Selection examples to use function components. ([PR #14156](https://github.com/microsoft/fluentui/pull/14156) by czearing@outlook.com)
- Spinner: Fix HC styling of spinner componet to show highlight color ([PR #14372](https://github.com/microsoft/fluentui/pull/14372) by ololubek@microsoft.com)

## [7.126.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.126.0)

Thu, 06 Aug 2020 00:30:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.125.0..office-ui-fabric-react_v7.126.0)

### Minor changes

- Adding useResponsiveMode hook within office-ui-fabric-react utilities. ([PR #14229](https://github.com/microsoft/fluentui/pull/14229) by czearing@outlook.com)

### Patches

- Add deprecation notices ([PR #13626](https://github.com/microsoft/fluentui/pull/13626) by miclo@microsoft.com)
- Removing unused default props from TeachingBubbleContent. ([PR #14239](https://github.com/microsoft/fluentui/pull/14239) by czearing@outlook.com)
- Toggle: fix thumb border width style ([PR #14361](https://github.com/microsoft/fluentui/pull/14361) by ololubek@microsoft.com)
- Dropdown: Fixing multiselect scenarios not reading out aria-setsize and aria-posinset due to incorrect placement of role=option in Checkbox. ([PR #14367](https://github.com/microsoft/fluentui/pull/14367) by humbertomakotomorimoto@gmail.com)
- Dropdown: Removing aria-required from multiselect scenarios since it's not allowed for role='button'. ([PR #14369](https://github.com/microsoft/fluentui/pull/14369) by humbertomakotomorimoto@gmail.com)

## [7.125.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.125.0)

Wed, 05 Aug 2020 12:39:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.124.3..office-ui-fabric-react_v7.125.0)

### Minor changes

- Remove all usage of string refs in OUFR ([PR #14342](https://github.com/microsoft/fluentui/pull/14342) by miclo@microsoft.com)

### Patches

- Add focuszone props to GroupedList and change details list to only use a single focus zone ([PR #14283](https://github.com/microsoft/fluentui/pull/14283) by mgodbolt@microsoft.com)
- Toggle: fix pill HC style when selected ([PR #14316](https://github.com/microsoft/fluentui/pull/14316) by ololubek@microsoft.com)
- Fix hc hover styling for checked checkbox to make checked state more visible on hover ([PR #14341](https://github.com/microsoft/fluentui/pull/14341) by ololubek@microsoft.com)
- Remove findDOMNode usage from DragDropHelper ([PR #14348](https://github.com/microsoft/fluentui/pull/14348) by miclo@microsoft.com)

## [7.124.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.124.3)

Tue, 04 Aug 2020 12:42:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.124.2..office-ui-fabric-react_v7.124.3)

### Patches

- update hc styling for Dropdown and ComboBox items to remove noisy borders ([PR #14273](https://github.com/microsoft/fluentui/pull/14273) by ololubek@microsoft.com)

## [7.124.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.124.2)

Mon, 03 Aug 2020 12:45:42 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.124.0..office-ui-fabric-react_v7.124.2)

### Patches

- Add high contrast styling for command bar ([PR #14215](https://github.com/microsoft/fluentui/pull/14215) by ololubek@microsoft.com)

## [7.124.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.124.0)

Thu, 30 Jul 2020 12:38:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.10..office-ui-fabric-react_v7.124.0)

### Minor changes

- updated grouped list to be a11y compliant ([PR #11494](https://github.com/microsoft/fluentui/pull/11494) by mgodbolt@microsoft.com)

### Patches

- Add noop transform to force gpu on mobile ([PR #13875](https://github.com/microsoft/fluentui/pull/13875) by miles@substantial.com)

## [7.123.9](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.9)

Fri, 24 Jul 2020 12:45:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.7..office-ui-fabric-react_v7.123.9)

### Patches

- ScrollablePane: fix pointer events on sticky'd elements ([PR #13744](https://github.com/microsoft/fluentui/pull/13744) by edwl@microsoft.com)
- Add high contrast adjust selector to dropdown styles ([PR #14176](https://github.com/microsoft/fluentui/pull/14176) by ololubek@microsoft.com)

## [7.123.7](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.7)

Wed, 22 Jul 2020 12:40:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.6..office-ui-fabric-react_v7.123.7)

### Patches

- Updated doc content ([PR #13887](https://github.com/microsoft/fluentui/pull/13887) by mgodbolt@microsoft.com)
- Add :after styles to fix ratio of suggested items in PeoplePicker on keyboard focus ([PR #14124](https://github.com/microsoft/fluentui/pull/14124) by ololubek@microsoft.com)

## [7.123.6](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.6)

Tue, 21 Jul 2020 12:43:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.4..office-ui-fabric-react_v7.123.6)

### Patches

- DetailsList: fix exception in DetailsRow when selection is undefined. ([PR #14088](https://github.com/microsoft/fluentui/pull/14088) by xgao@microsoft.com)
- add document role to child of modal to fix VoiceOver issue ([PR #14096](https://github.com/microsoft/fluentui/pull/14096) by sarah.higley@microsoft.com)
- Fix "rules of hooks" lint rule violations ([PR #14097](https://github.com/microsoft/fluentui/pull/14097) by elcraig@microsoft.com)

## [7.123.4](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.4)

Sat, 18 Jul 2020 00:04:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.2..office-ui-fabric-react_v7.123.4)

### Patches

- Panel: pass missing event to onDismiss. ([PR #14075](https://github.com/microsoft/fluentui/pull/14075) by xgao@microsoft.com)

## [7.123.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.2)

Thu, 16 Jul 2020 21:33:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.123.0..office-ui-fabric-react_v7.123.2)

### Patches

- Fix onBlur event firing on every calendar day component bug ([PR #13992](https://github.com/microsoft/fluentui/pull/13992) by ololubek@microsoft.com)
- removing unnecessary !important, fixing two linting errors, fixing high contrast bug in oufr calendar ([PR #14032](https://github.com/microsoft/fluentui/pull/14032) by lorejoh12@gmail.com)

## [7.123.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.123.0)

Wed, 15 Jul 2020 12:41:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.122.0..office-ui-fabric-react_v7.123.0)

### Minor changes

- Allow consumer of ContextualMenu control to override the role of internal list. ([PR #13908](https://github.com/microsoft/fluentui/pull/13908) by kinhln@microsoft.com)

### Patches

- Fix screen reader behavior on picker action buttons (#13291) ([PR #13627](https://github.com/microsoft/fluentui/pull/13627) by sarah.higley@microsoft.com)

## [7.122.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.122.0)

Mon, 13 Jul 2020 23:14:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.12..office-ui-fabric-react_v7.122.0)

### Minor changes

- Replace tslint with eslint; fix some violations ([PR #13944](https://github.com/microsoft/fluentui/pull/13944) by elcraig@microsoft.com)
- Add mutliSelectDelimiter property to ComboBox ([PR #13979](https://github.com/microsoft/fluentui/pull/13979) by cocahill@microsoft.com)

### Patches

- Keytip: add useKeytipRef hook. ([PR #13742](https://github.com/microsoft/fluentui/pull/13742) by xgao@microsoft.com)
- ContextualMenu: Fix high contrast style for submenu icon ([PR #13843](https://github.com/microsoft/fluentui/pull/13843) by erabelle@microsoft.com)

## [7.121.12](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.12)

Thu, 09 Jul 2020 21:59:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.11..office-ui-fabric-react_v7.121.12)

### Patches

- Apply focusZone props to ContextualMenu. ([PR #13924](https://github.com/microsoft/fluentui/pull/13924) by kinhln@microsoft.com)
- Prettier update. ([PR #13812](https://github.com/microsoft/fluentui/pull/13812) by humbertomakotomorimoto@gmail.com)
- Slider: Fixing High Contrast styles. ([PR #13952](https://github.com/microsoft/fluentui/pull/13952) by ololubek@microsoft.com)
- Applying cosmetic code updates from Prettier. ([PR #13953](https://github.com/microsoft/fluentui/pull/13953) by KevinTCoughlin@users.noreply.github.com)

## [7.121.11](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.11)

Wed, 08 Jul 2020 12:34:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.10..office-ui-fabric-react_v7.121.11)

### Patches

- Removing console.log from MarqueeSelection Example. ([PR #13941](https://github.com/microsoft/fluentui/pull/13941) by czearing@outlook.com)

## [7.121.10](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.10)

Tue, 07 Jul 2020 12:34:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.9..office-ui-fabric-react_v7.121.10)

### Patches

- Combine labelId and StateTextId in labelledById and update tests ([PR #13886](https://github.com/microsoft/fluentui/pull/13886) by t-dama@microsoft.com)

## [7.121.7](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.7)

Wed, 01 Jul 2020 12:35:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.5..office-ui-fabric-react_v7.121.7)

### Patches

- Ensure ResizeGroup uses correct window for animation frame ([PR #13864](https://github.com/microsoft/fluentui/pull/13864) by tmichon@microsoft.com)
- High contrast in Edge Chromium: fix Label and TextField. ([PR #13844](https://github.com/microsoft/fluentui/pull/13844) by xgao@microsoft.com)
- High Contrast in Edge Chromium: fix ChoiceGroup. ([PR #13846](https://github.com/microsoft/fluentui/pull/13846) by xgao@microsoft.com)
- High Contrast in Edge Chromium: fix Nav. ([PR #13850](https://github.com/microsoft/fluentui/pull/13850) by xgao@microsoft.com)
- High Contrast in Edge Chromium: Fix ContextualMenu. ([PR #13870](https://github.com/microsoft/fluentui/pull/13870) by xgao@microsoft.com)

## [7.121.5](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.5)

Mon, 29 Jun 2020 12:36:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.4..office-ui-fabric-react_v7.121.5)

### Patches

- SpinButton: pass through event information if the user spins up or down ([PR #13811](https://github.com/microsoft/fluentui/pull/13811) by makopch@microsoft.com)
- ContextualMenu: Fixing issue where focus would not return to previously focused element and issue where error might occur if said previously focused element didn't have a focus method. ([PR #13813](https://github.com/microsoft/fluentui/pull/13813) by joschect@microsoft.com)
- Convert KeytipTransitionModifier to type ([PR #13825](https://github.com/microsoft/fluentui/pull/13825) by KevinTCoughlin@users.noreply.github.com)

## [7.121.4](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.4)

Fri, 26 Jun 2020 12:36:28 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.2..office-ui-fabric-react_v7.121.4)

### Patches

- PeoplePicker: Fix examples to properly remove duplicates ([PR #13366](https://github.com/microsoft/fluentui/pull/13366) by suprememilanfan@gmail.com)

## [7.121.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.2)

Mon, 22 Jun 2020 12:42:16 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.1..office-ui-fabric-react_v7.121.2)

### Patches

- KeytipData: convert to function component ([PR #13688](https://github.com/microsoft/fluentui/pull/13688) by xgao@microsoft.com)

## [7.121.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.1)

Fri, 19 Jun 2020 12:38:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.121.0..office-ui-fabric-react_v7.121.1)

### Patches

- Keytip: add KeytipLayer storybook decorator and fix missing handled prop for link ([PR #13687](https://github.com/microsoft/fluentui/pull/13687) by xgao@microsoft.com)

## [7.121.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.121.0)

Wed, 17 Jun 2020 16:07:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.120.3..office-ui-fabric-react_v7.121.0)

### Minor changes

- Icon: Rendering children if passed down as props and adding snapshot tests for these scenarios. ([PR #13621](https://github.com/microsoft/fluentui/pull/13621) by ololubek@microsoft.com)
- Add new rounded corners to theme ([PR #13635](https://github.com/microsoft/fluentui/pull/13635) by phkuo@microsoft.com)

## [7.120.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.120.3)

Wed, 17 Jun 2020 12:37:16 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.120.2..office-ui-fabric-react_v7.120.3)

### Patches

- Add Datetime utilities package ([PR #13605](https://github.com/microsoft/fluentui/pull/13605) by pompomon@gmail.com)

## [7.120.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.120.2)

Tue, 16 Jun 2020 12:40:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.120.1..office-ui-fabric-react_v7.120.2)

### Patches

- Prevent ContextualMenu from destroying existing menu items on every repaint ([PR #13357](https://github.com/microsoft/fluentui/pull/13357) by tmichon@microsoft.com)
- fix height and width check in the image component ([PR #13544](https://github.com/microsoft/fluentui/pull/13544) by nif_tony@outlook.com)

## [7.120.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.120.1)

Mon, 15 Jun 2020 12:45:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.120.0..office-ui-fabric-react_v7.120.1)

### Patches

- modalization for FocusTrapZone ([PR #13281](https://github.com/microsoft/fluentui/pull/13281) by phkuo@microsoft.com)

## [7.120.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.120.0)

Fri, 12 Jun 2020 18:29:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.119.0..office-ui-fabric-react_v7.120.0)

### Minor changes

- PivotItem: Fixing typing error in headerButtonProps. ([PR #13550](https://github.com/microsoft/fluentui/pull/13550) by humbertomakotomorimoto@gmail.com)

### Patches

- Update Details and Grouped list chevron to rotate in the correct direction for RTL. ([PR #13514](https://github.com/microsoft/fluentui/pull/13514) by bcoard@microsoft.com)
- Combobox: Fix openOnKeyboard prop to work as expected ([PR #13520](https://github.com/microsoft/fluentui/pull/13520) by joschect@microsoft.com)
- Fix some unnecessary DetailsList styles ([PR #13540](https://github.com/microsoft/fluentui/pull/13540) by phkuo@microsoft.com)

## [7.119.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.119.0)

Wed, 10 Jun 2020 12:37:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.118.1..office-ui-fabric-react_v7.119.0)

### Minor changes

- DocumentCard: add prop to open link in a new tab. ([PR #13076](https://github.com/microsoft/fluentui/pull/13076) by mahesh8488@gmail.com)
- Add onGrowData to Breadcrumb ([PR #13447](https://github.com/microsoft/fluentui/pull/13447) by tmichon@microsoft.com)

## [7.118.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.118.1)

Tue, 09 Jun 2020 12:35:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.118.0..office-ui-fabric-react_v7.118.1)

### Patches

- Link: fix broken href in examples ([PR #13511](https://github.com/microsoft/fluentui/pull/13511) by ololubek@microsoft.com)

## [7.118.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.118.0)

Mon, 08 Jun 2020 12:34:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.117.4..office-ui-fabric-react_v7.118.0)

### Minor changes

- Dialog: min height for title to ensure subtext doesn't overlap 'close' button. ([PR #13492](https://github.com/microsoft/fluentui/pull/13492) by jdh@microsoft.com)

### Patches

- Dropdown and ContextualMenu doc comment clarifications ([PR #13471](https://github.com/microsoft/fluentui/pull/13471) by elcraig@microsoft.com)
- Picker/PeoplePicker: Fix issue where default value wouldn't trigger suggestions ([PR #13480](https://github.com/microsoft/fluentui/pull/13480) by joschect@microsoft.com)
- Deprecating defaultSelectedIndex props in Pivot.types.ts. ([PR #13479](https://github.com/microsoft/fluentui/pull/13479) by czearing@outlook.com)

## [7.117.4](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.117.4)

Fri, 05 Jun 2020 05:09:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.117.3..office-ui-fabric-react_v7.117.4)

### Patches

- Fixing GroupedList custom example aria error. ([PR #13457](https://github.com/microsoft/fluentui/pull/13457) by humbertomakotomorimoto@gmail.com)
- Stack: Clarifying deprecated message of props replaced by tokens. ([PR #13476](https://github.com/microsoft/fluentui/pull/13476) by humbertomakotomorimoto@gmail.com)

## [7.117.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.117.3)

Thu, 04 Jun 2020 12:35:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.117.1..office-ui-fabric-react_v7.117.3)

### Patches

- CommandBar: Fixed caching to greatly improve performance for all users ([PR #13428](https://github.com/microsoft/fluentui/pull/13428) by mgodbolt@microsoft.com)
- Pivot: replace onKeyPress with onKeyDown and ariaLabel with aria-label ([PR #13442](https://github.com/microsoft/fluentui/pull/13442) by behowell@microsoft.com)

## [7.117.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.117.1)

Tue, 02 Jun 2020 12:36:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.117.0..office-ui-fabric-react_v7.117.1)

### Patches

- Dialog: Fixing broken deprecated props and adding snapshot tests for them. ([PR #13425](https://github.com/microsoft/fluentui/pull/13425) by humbertomakotomorimoto@gmail.com)
- Remove explicit blocking of Alt key ([PR #13389](https://github.com/microsoft/fluentui/pull/13389) by keyou@microsoft.com)
- add aria-checked if the role is menuitemradio ([PR #13434](https://github.com/microsoft/fluentui/pull/13434) by makopch@microsoft.com)

## [7.117.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.117.0)

Fri, 29 May 2020 12:35:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.116.1..office-ui-fabric-react_v7.117.0)

### Minor changes

- Add dedicated touch invoke functionality to SelectionZone ([PR #13241](https://github.com/microsoft/fluentui/pull/13241) by sebastian.oettl@microsoft.com)

### Patches

- SpinButton: Reintroduce incorrect behavior of allowing updates when value is provided to prevent breaking partners. ([PR #13367](https://github.com/microsoft/fluentui/pull/13367) by elcraig@microsoft.com)
- Changing storybook add-on panel position to default to be at the bottom of the page. ([PR #12906](https://github.com/microsoft/fluentui/pull/12906) by czearing@outlook.com)

## [7.116.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.116.1)

Thu, 28 May 2020 12:42:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.116.0..office-ui-fabric-react_v7.116.1)

### Patches

- SplitButton: Making imperative focus call on touch events. ([PR #13361](https://github.com/microsoft/fluentui/pull/13361) by humbertomakotomorimoto@gmail.com)

## [7.116.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.116.0)

Wed, 27 May 2020 12:40:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.115.2..office-ui-fabric-react_v7.116.0)

### Minor changes

- Pivot: Adding `alwaysRender` prop to `PivotItem` to allow for persistent `PivotItems` to control the amount of re-renders that happen. ([PR #12779](https://github.com/microsoft/fluentui/pull/12779) by herincon@microsoft.com)

## [7.115.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.115.2)

Thu, 21 May 2020 12:34:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.115.1..office-ui-fabric-react_v7.115.2)

### Patches

- MessageBar: Restore style overrides for Link inside MessageBar in high contrast; use dismissButtonAriaLabel as title too ([PR #13034](https://github.com/microsoft/fluentui/pull/13034) by elcraig@microsoft.com)
- Prettier fix in Callout test. ([PR #12478](https://github.com/microsoft/fluentui/pull/12478) by humbertomakotomorimoto@gmail.com)

## [7.115.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.115.1)

Wed, 20 May 2020 12:31:10 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.115.0..office-ui-fabric-react_v7.115.1)

### Patches

- update MessageBarButtonBorder color ([PR #12932](https://github.com/microsoft/fluentui/pull/12932) by chrismo@microsoft.com)

## [7.115.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.115.0)

Mon, 18 May 2020 12:54:52 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.114.1..office-ui-fabric-react_v7.115.0)

### Minor changes

- Pass all relevant state to Nav group render override ([PR #12854](https://github.com/microsoft/fluentui/pull/12854) by tmichon@microsoft.com)

### Patches

- SpinButton: allow empty string as value, clean up docs and tests ([PR #13174](https://github.com/microsoft/fluentui/pull/13174) by elcraig@microsoft.com)
- DetailsList: clarify IColumn.ariaLabel docs; other doc cleanup ([PR #13183](https://github.com/microsoft/fluentui/pull/13183) by elcraig@microsoft.com)

## [7.114.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.114.1)

Fri, 15 May 2020 12:42:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.114.0..office-ui-fabric-react_v7.114.1)

### Patches

- Updating List, Keytips, and Facepile examples to use function components ([PR #12829](https://github.com/microsoft/fluentui/pull/12829) by czearing@outlook.com)
- updating Shimmer, Slider, SelectedPeopleList, MarqueeSelection, and SwatchColorPicker examples to FC ([PR #12849](https://github.com/microsoft/fluentui/pull/12849) by czearing@outlook.com)

## [7.114.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.114.0)

Fri, 15 May 2020 05:52:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.113.3..office-ui-fabric-react_v7.114.0)

### Minor changes

- PivotItem: Expanding types of headerButtonProps to include IButtonProps. ([PR #13128](https://github.com/microsoft/fluentui/pull/13128) by humbertomakotomorimoto@gmail.com)

## [7.113.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.113.3)

Fri, 15 May 2020 00:07:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.113.2..office-ui-fabric-react_v7.113.3)

### Patches

- Support custom checkbox for <GroupHeader>: added onRenderGroupHeaderCheckbox property ([PR #12105](https://github.com/microsoft/fluentui/pull/12105) by sebastian.mattar@gmail.com)
- Updating examples for ProgressIndicator, FloatingPeoplePicker and ResizeGroupOverflowSetExample to use FC ([PR #12890](https://github.com/microsoft/fluentui/pull/12890) by czearing@outlook.com)

## [7.113.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.113.2)

Thu, 14 May 2020 12:34:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.112.0..office-ui-fabric-react_v7.113.2)

### Patches

- fix accessibility issue ([PR #12952](https://github.com/microsoft/fluentui/pull/12952) by xiameng@microsoft.com)
- updating DocumentCard and GroupedList to FC ([PR #12851](https://github.com/microsoft/fluentui/pull/12851) by czearing@outlook.com)
- Update Picker.CustomResult.Example.tsx ([PR #12795](https://github.com/microsoft/fluentui/pull/12795) by patrick@nubo.eu)
- Updating examples to use `useId` instead of `getId` and converting `Dialog` examples to function components. ([PR #13054](https://github.com/microsoft/fluentui/pull/13054) by czearing@outlook.com)

## [7.112.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.112.0)

Tue, 12 May 2020 12:41:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.111.1..office-ui-fabric-react_v7.112.0)

### Minor changes

- Adding onDragOver method to IDragDropEvents ([PR #12859](https://github.com/microsoft/fluentui/pull/12859) by pawsing@microsoft.com)

## [7.111.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.111.1)

Mon, 11 May 2020 12:36:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.111.0..office-ui-fabric-react_v7.111.1)

### Patches

- Checkbox: remove unneeded text-align css on label ([PR #13014](https://github.com/microsoft/fluentui/pull/13014) by xgao@microsoft.com)
- Shimmer: fix high contrast in new edge ([PR #13073](https://github.com/microsoft/fluentui/pull/13073) by xgao@microsoft.com)

## [7.111.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.111.0)

Fri, 08 May 2020 12:35:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.5..office-ui-fabric-react_v7.111.0)

### Minor changes

- Add custom expand icon support to Group Header ([PR #13011](https://github.com/microsoft/fluentui/pull/13011) by bcoard@microsoft.com)

### Patches

- update snapshots for merge-styles change to not generate class with no styles ([PR #13029](https://github.com/microsoft/fluentui/pull/13029) by pingj@microsoft.com)
- Prettier fix on Callout test. ([PR #12339](https://github.com/microsoft/fluentui/pull/12339) by humbertomakotomorimoto@gmail.com)
- Checkbox: fix high contrast styles in Edge Chromium ([PR #13035](https://github.com/microsoft/fluentui/pull/13035) by xgao@microsoft.com)
- Cleaning up callout, announced, and calendar examples ([PR #13053](https://github.com/microsoft/fluentui/pull/13053) by czearing@outlook.com)

## [7.110.5](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.5)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.4..office-ui-fabric-react_v7.110.5)

### Patches

- CommonJS paths were pointing to esm paths, now should correctly point to the right path. ([PR #13026](https://github.com/microsoft/fluentui/pull/13026) by dzearing@hotmail.com)

## [7.110.4](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.4)

Wed, 06 May 2020 12:32:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.3..office-ui-fabric-react_v7.110.4)

### Patches

- Dropdown: improve multi-select selected keys warnings ([PR #12989](https://github.com/microsoft/fluentui/pull/12989) by elcraig@microsoft.com)
- ColorPicker: removing unneeded array spread. ([PR #12994](https://github.com/microsoft/fluentui/pull/12994) by dzearing@microsoft.com)

## [7.110.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.3)

Tue, 05 May 2020 12:34:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.2..office-ui-fabric-react_v7.110.3)

### Patches

- Adding missing changes due to move from IPoint to Point. ([PR #12993](https://github.com/microsoft/fluentui/pull/12993) by humbertomakotomorimoto@gmail.com)
- Add logic to cap the number we show in the facepile descrtiptive overflow at 99 to prevent text overflow ([PR #12902](https://github.com/microsoft/fluentui/pull/12902) by tabrumle@microsoft.com)
- Prettier fix in Callout test. ([PR #12448](https://github.com/microsoft/fluentui/pull/12448) by humbertomakotomorimoto@gmail.com)
- MarqueeSelection: Fixing drag and drop functionality. ([PR #12991](https://github.com/microsoft/fluentui/pull/12991) by humbertomakotomorimoto@gmail.com)

## [7.110.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.2)

Mon, 04 May 2020 12:33:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.1..office-ui-fabric-react_v7.110.2)

### Patches

- Prettier Fix in Callout test. ([PR #12615](https://github.com/microsoft/fluentui/pull/12615) by humbertomakotomorimoto@gmail.com)

## [7.110.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.1)

Fri, 01 May 2020 12:28:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.110.0..office-ui-fabric-react_v7.110.1)

### Patches

- Theming: fix SASS slot autogenerator and run it ([PR #12949](https://github.com/microsoft/fluentui/pull/12949) by phkuo@microsoft.com)

## [7.110.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.110.0)

Fri, 01 May 2020 00:19:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.109.1..office-ui-fabric-react_v7.110.0)

### Minor changes

- Updating usage of FocusZone to use non-deprecated prop names. ([PR #12484](https://github.com/microsoft/fluentui/pull/12484) by humbertomakotomorimoto@gmail.com)

## [7.109.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.109.1)

Thu, 30 Apr 2020 12:31:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.109.0..office-ui-fabric-react_v7.109.1)

### Patches

- Example: update Callout example to use Text component ([PR #12423](https://github.com/microsoft/fluentui/pull/12423) by marygans@microsoft.com)

## [7.109.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.109.0)

Wed, 29 Apr 2020 12:34:58 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.108.0..office-ui-fabric-react_v7.109.0)

### Minor changes

- update MessageBar colors ([PR #12821](https://github.com/microsoft/fluentui/pull/12821) by chrismo@microsoft.com)

### Patches

- Updating FocusTrapZone, Overlay, and TextField to use function components ([PR #12774](https://github.com/microsoft/fluentui/pull/12774) by czearing@outlook.com)

## [7.108.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.108.0)

Tue, 28 Apr 2020 12:34:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.107.5..office-ui-fabric-react_v7.108.0)

### Minor changes

- Updating IPoint, x and y references to Point, left and top respectively. ([PR #12722](https://github.com/microsoft/fluentui/pull/12722) by humbertomakotomorimoto@gmail.com)
- Popup: add onRestoreFocus method to replace shouldRestoreFocus ([PR #12806](https://github.com/microsoft/fluentui/pull/12806) by joschect@microsoft.com)

### Patches

- Change contextual menu renderMenuItem function to prevent prop mutation and unneeded rerenders ([PR #12750](https://github.com/microsoft/fluentui/pull/12750) by tabrumle@microsoft.com)
- Updating examples for ScrollablePane and HoverCard to use FC ([PR #12871](https://github.com/microsoft/fluentui/pull/12871) by czearing@outlook.com)

## [7.107.5](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.107.5)

Fri, 24 Apr 2020 12:39:25 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.107.3..office-ui-fabric-react_v7.107.5)

### Patches

- Callout: Updating positioning logic to account for dual screen scenarios. ([PR #12785](https://github.com/microsoft/fluentui/pull/12785) by Humberto.Morimoto@microsoft.com)

## [7.107.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.107.3)

Wed, 22 Apr 2020 12:33:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.107.2..office-ui-fabric-react_v7.107.3)

### Patches

- Updating Announced, Callout, and Calendar examples to function components ([PR #12670](https://github.com/microsoft/fluentui/pull/12670) by czearing@outlook.com)
- Fix SASS default values for theme.effects ([PR #12802](https://github.com/microsoft/fluentui/pull/12802) by phkuo@microsoft.com)

## [7.107.2](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.107.2)

Tue, 21 Apr 2020 12:34:50 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.107.1..office-ui-fabric-react_v7.107.2)

### Patches

- ContextualMenu: Improve perf by doing less merge styles ([PR #12752](https://github.com/microsoft/fluentui/pull/12752) by xgao@microsoft.com)
- Update ColorRectangle and ColorSlider to handle native events when using the 'on' utility ([PR #12753](https://github.com/microsoft/fluentui/pull/12753) by behowell@microsoft.com)

## [7.107.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.107.1)

Sun, 19 Apr 2020 02:02:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.107.0..office-ui-fabric-react_v7.107.1)

### Patches

- Enable classnames caching for label and icon ([PR #12712](https://github.com/microsoft/fluentui/pull/12712) by xgao@microsoft.com)

## [7.107.0](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.107.0)

Fri, 17 Apr 2020 12:34:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.106.3..office-ui-fabric-react_v7.107.0)

### Minor changes

- Allow forwarding of FocusTrapZone props in TeachingBubble ([PR #12693](https://github.com/microsoft/fluentui/pull/12693) by mhensler@microsoft.com)
- Pivot: componentRef now resolves correctly, unnecessary DOM element removed. ([PR #12748](https://github.com/microsoft/fluentui/pull/12748) by dzearing@microsoft.com)
- added set of svg icons ([PR #12641](https://github.com/microsoft/fluentui/pull/12641) by mnajdova@gmail.com)

## [7.106.3](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.106.3)

Thu, 16 Apr 2020 12:37:31 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.106.1..office-ui-fabric-react_v7.106.3)

### Patches

- Replace uses of EventGroup with the 'on' function and _disposables pattern in ColorRectangle, ColorSlider, and Slider ([PR #12717](https://github.com/microsoft/fluentui/pull/12717) by behowell@microsoft.com)
- changed svg factory example and added icon components tests ([PR #12675](https://github.com/microsoft/fluentui/pull/12675) by mnajdova@gmail.com)

## [7.106.1](https://github.com/microsoft/fluentui/tree/office-ui-fabric-react_v7.106.1)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/office-ui-fabric-react_v7.106.0..office-ui-fabric-react_v7.106.1)

### Patches

- Adding Stack snapshot test for RTL scenarios. ([PR #12649](https://github.com/microsoft/fluentui/pull/12649) by Humberto.Morimoto@microsoft.com)
- Readme: Add migration info ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)
- removing more references to wrong icon-ppt.png icon in wrong folder ([PR #12422](https://github.com/microsoft/fluentui/pull/12422) by caperez@microsoft.com)
- Fixed a bug in the DatePicker causing an existing validation error to be cleared when tabbing through the component. ([PR #12602](https://github.com/microsoft/fluentui/pull/12602) by michaelmajgaard@outlook.com)
- Panel: passing close button styles down using subComponentStyles ([PR #12630](https://github.com/microsoft/fluentui/pull/12630) by xgao@microsoft.com)
- Examples: fix bad practice styles prop ([PR #12631](https://github.com/microsoft/fluentui/pull/12631) by xgao@microsoft.com)
- Updated DatePicker and ComboBox examples to use function components ([PR #12637](https://github.com/microsoft/fluentui/pull/12637) by czearing@outlook.com)
- Updating Rating, Text, OverflowSet, and Dropdown examples to use function components ([PR #12638](https://github.com/microsoft/fluentui/pull/12638) by czearing@outlook.com)
- always return explicit Fabric dir ([PR #12647](https://github.com/microsoft/fluentui/pull/12647) by mgodbolt@microsoft.com)
- Adding SVG icon examples ([PR #12608](https://github.com/microsoft/fluentui/pull/12608) by dzearing@microsoft.com)
- Keyframes are calculated on access. This helps with SSR generation, as namespace will be respected. ([PR #12668](https://github.com/microsoft/fluentui/pull/12668) by dzearing@microsoft.com)
- DetailsRow.base bug fix for cellStyleProps ([PR #12691](https://github.com/microsoft/fluentui/pull/12691) by SGonzalezBustos@Gmail.com)

## 7.106.0
Thu, 09 Apr 2020 12:24:31 GMT

### Minor changes

- Support List overrides for rendering root and surface elements (tmichon@microsoft.com)
- ColorPicker: Add support for selecting transparency instead of alpha (elcraig@microsoft.com)
### Patches

- Combobox: Fix getActiveDescendantValue would sometimes return -listundefined. (joschect@microsoft.com)
- DetailsList: add missing aria-label to example (joschect@microsoft.com)
## 7.105.12
Wed, 08 Apr 2020 12:28:27 GMT

### Patches

- Fabric: cleanup dir logic, don't add 'dir' unless different from context (mgodbolt@microsoft.com)
- CommandBar: prevent command button style mutation if possible (xgao@microsoft.com)
- fix: fix typings for asAsync & internal usages of React.Children.map (olfedias@microsoft.com)
## 7.105.11
Tue, 07 Apr 2020 12:35:07 GMT

### Patches

- GroupedList: Only invoke range selection on header click when in multiple selection mode (KevinTCoughlin@users.noreply.github.com)
- Updated search box and divider examples to functional components (czearing@outlook.com)
## 7.105.10
Mon, 06 Apr 2020 12:27:21 GMT

### Patches

- Updated search box and divider examples to functional components (czearing@outlook.com)
- Updating Image and Persona examples to use function components. (czearing@outlook.com)
## 7.105.9
Fri, 03 Apr 2020 12:27:13 GMT

### Patches

- ChoiceGroup: fix bad cache key for getClassNames (xgao@microsoft.com)
- Update Layer and Modal examples to use functional components (elcraig@microsoft.com)
## 7.105.8
Thu, 02 Apr 2020 12:30:40 GMT

### Patches

- ComboBox: borderColor should be applied properly in the case of error (aneeshak@microsoft.com)
- Button: Add an example of an IconButton that has a Tooltip. (aneeshak@microsoft.com)
- Pivot: fixing comment typo. (czearing@outlook.com)
## 7.105.7
Wed, 01 Apr 2020 12:29:21 GMT

### Patches

- Panel: closeButton should stick to the right even if header is removed (aneeshak@microsoft.com)
- Combobox: Update docs to make onPendingValueChanged more clear (joschect@microsoft.com)
- ComboBox: onResolveOptions and onPointerDown callbacks should not hit when disabled. (aneeshak@microsoft.com)
## 7.105.6
Tue, 31 Mar 2020 12:27:26 GMT

### Patches

- DetailsList: Fixes following issues with Groups: 1) Add draggable attribute if required 2) Call onDragEnter and onDragLeave with right parameters 3) Use the css class returned by onDragEnter (sachinma@microsoft.com)
- update website banner and remove reference to fabric in context menu docs (mgodbolt@microsoft.com)
## 7.105.5
Mon, 30 Mar 2020 19:10:08 GMT

### Patches

- Dialog/Panel: Change heading from 2 to 1 (joschect@microsoft.com)
## 7.105.3
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
- Adding Text example for weights. (dzearing@microsoft.com)
## 7.105.2
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 7.105.1
Thu, 19 Mar 2020 12:29:37 GMT

### Patches

- Run prettier: 120 line length, trailing commas. And minor documentation updates prompted by line length changes. (elcraig@microsoft.com)
## 7.105.0
Tue, 17 Mar 2020 20:48:59 GMT

### Minor changes

- Pass default ContextualMenuItem renderer to onRenderMenuList (owcampbe@microsoft.com)
- Added support for overriding persona presence colors (andreas.hage@microsoft.com)
### Patches

- Remove duplicated export (nakanaki@microsoft.com)
## 7.104.1
Tue, 17 Mar 2020 12:28:58 GMT

### Patches

- Ensure ContextualMenu section header generates valid element ID (ermercer@microsoft.com)
- Adding onClick callback to divider in SplitButtons that stops propagation so that clicking on the divider does not trigger action. (humbertomakotomorimoto@gmail.com)
## 7.104.0
Mon, 16 Mar 2020 12:28:27 GMT

### Minor changes

- BaseComponent: remove using BaseComponent from oufr package (xgao@microsoft.com)
## 7.103.0
Fri, 13 Mar 2020 12:30:22 GMT

### Minor changes

- KeytipManager: Add new options for adjusting how keytip data is sent to the manager to optimize rendering times for components which use keytips (chiechan@microsoft.com)
## 7.102.0
Thu, 12 Mar 2020 12:35:00 GMT

### Minor changes

- convert initializeFocusRects to hook (xgao@microsoft.com)
- withResponsiveMode: Add initializeResponsiveMode render performance optimization (KevinTCoughlin@users.noreply.github.com)
## 7.101.0
Tue, 10 Mar 2020 12:25:14 GMT

### Minor changes

- ITag: key can be number, in addition to string. (aneeshak@microsoft.com)
### Patches

- Fix the legacy items wrapper styles. (lijunle@gmail.com)
- restore onRenderIcon prop for ContextualMenuSplitButton (kinhln@microsoft.com)
## 7.100.0
Sat, 07 Mar 2020 01:39:37 GMT

### Minor changes

- Adding isReversed prop to overflowSet so we can visually reverse the components and maintain consistent keyboarding navigation. (matejera@microsoft.com)
- Export GroupedListSection (owcampbe@microsoft.com)
### Patches

- Cleanup: Removing 'use strict' directive in ts files since modules are emitted with a 'use strict' prologue. (humbertomakotomorimoto@gmail.com)
- withViewport: cleaning up resize observer. (dzearing@microsoft.com)
## 7.99.0
Thu, 05 Mar 2020 12:27:53 GMT

### Minor changes

- Suggestions: Deprecating unused searchErrorText prop. (Humberto.Morimoto@microsoft.com)
## 7.98.4
Wed, 04 Mar 2020 12:27:02 GMT

### Patches

- Remove vertical-align flagged as unused (KevinTCoughlin@users.noreply.github.com)
- MarqueeSelection: deleting html element references on unmount. (dzearing@microsoft.com)
## 7.98.3
Tue, 03 Mar 2020 12:27:24 GMT

### Patches

- Using tslint:disable-next-line instead of tslint:disable without a corresponding tslint:enable afterwards for all non-tests and non-data files. (Humberto.Morimoto@microsoft.com)
- Link: Make focus work even when Link has block children. (humbertomakotomorimoto@gmail.com)
- ScrollablePane example: fix strict function type errors (xgao@microsoft.com)
## 7.98.2
Mon, 02 Mar 2020 12:25:44 GMT

### Patches

- SpinButton: fix SpinButton content overlapping with border under certain resolutions (xgao@microsoft.com)
- DetailsList Example: change drag drop behavior to be more intuitive, allow dragging to the last row (xgao@microsoft.com)
## 7.98.1
Fri, 28 Feb 2020 12:25:15 GMT

### Patches

- Updates the Nav component's links to use aria-current (sarah.higley@microsoft.com)
- Panel: use align-items for vertical alignment (aneeshak@microsoft.com)
- Dialog: fix isOpen deprecated prop no longer being honored (xgao@microsoft.com)
## 7.98.0
Thu, 27 Feb 2020 12:23:46 GMT

### Minor changes

- Toggle: allow menuitemcheckbox role (xgao@microsoft.com)
### Patches

- Slider: allow setting id on slider (xgao@microsoft.com)
## 7.97.1
Wed, 26 Feb 2020 12:28:12 GMT

### Patches

- Turning on 'deprecation' tslint rule. (Humberto.Morimoto@microsoft.com)
## 7.97.0
Tue, 25 Feb 2020 12:25:39 GMT

### Minor changes

- FocusZone: Re-exporting FocusZone from react-focus package and removing duplication in OUFR package. (humbertomakotomorimoto@gmail.com)
### Patches

- Delete PositioningContainer docs (elcraig@microsoft.com)
## 7.96.0
Mon, 24 Feb 2020 12:21:19 GMT

### Minor changes

- DetailsList: fix memory leak caused by incorrect component memoization (xgao@microsoft.com)
### Patches

- Adding pointer down support for dismissing the fabric base layer. (boalbe@microsoft.com)
## 7.95.0
Fri, 21 Feb 2020 12:20:14 GMT

### Minor changes

- Adds ignoreScrollingState to List, to avoid updates to scrolling state when it's not being used (chce@netcompany.com)
### Patches

- Link: text decoration should not show up even for buttons. (dzearing@microsoft.com)
## 7.94.1
Thu, 20 Feb 2020 12:20:16 GMT

### Patches

- SearchBox: Use native input onBlur to fix blur getting called twice (mgodbolt@microsoft.com)
- DatePicker: Fixing onSelectDate event being called twice when allowTextInput is set to true. (Humberto.Morimoto@microsoft.com)
- GroupedList: Adding checks for group and selection being undefined. (Humberto.Morimoto@microsoft.com)
- FocusZone: fix memory leak caused by closure (xgao@microsoft.com)
## 7.94.0
Wed, 19 Feb 2020 12:21:05 GMT

### Minor changes

- Removing use of deprecated props across the office-ui-fabric-react package so we can eventually enable the tslint deprecation rule. (Humberto.Morimoto@microsoft.com)
### Patches

- Add syncpack and synchronize dependencies. Refresh fluent import. (jagore@microsoft.com)
- Set touchmove and touchend event handlers to get caught in the capture phase (catalina@microsoft.com)
## 7.93.1
Mon, 17 Feb 2020 17:06:50 GMT

### Patches

- List: clearing scrollElement on unmount to avoid retaining an edge to a dom element and leaking. (dzearing@microsoft.com)
- Fix: Uncaught SyntaxError: Failed to execute 'querySelector' on 'Document'. (email not defined)
- ShimmeredDetailsList: add aria-busy=true when shimmer is enabled (xgao@microsoft.com)
## 7.93.0
Wed, 12 Feb 2020 12:24:27 GMT

### Minor changes

- Re-export react-focus's FocusZone from OUFR (elcraig@microsoft.com)
- Replacing deprecated StatelessComponent references with FunctionComponent. (Humberto.Morimoto@microsoft.com)
- ContextualMenu: change role of category options to menuitemcheckbox (aneeshak@microsoft.com)
### Patches

- TextField example: fix onChange typing error when strictFunctionType is true (xgao@microsoft.com)
## 7.92.0
Tue, 11 Feb 2020 18:37:59 GMT

### Minor changes

- TagItem accepts title and defaults either children or item name (#11845) (yann.normand@gmail.com)
### Patches

- Tooltip: allow scrolling tooltip content (xgao@microsoft.com)
- Dropdown: fix SubComponentStyles interfaces (xgao@microsoft.com)
## 7.90.1
Mon, 10 Feb 2020 12:39:35 GMT

### Patches

- Dropdown: fix item hover style (xgao@microsoft.com)
- SpinButton: remove unneeded validation on tab key (xgao@microsoft.com)
## 7.90.0
Fri, 07 Feb 2020 12:41:31 GMT

### Minor changes

- GroupedList: Announcing position in set. (Humberto.Morimoto@microsoft.com)
## 7.89.1
Thu, 06 Feb 2020 12:37:34 GMT

### Patches

- ev.defaultPrevented is not a function, remove errant () (mahelles@microsoft.com)
- DocumentCard: Updating DocumentCardLocations styles to latest Fluent specs. (Humberto.Morimoto@microsoft.com)
- MaskedTextField: fix MaskedTextField captures focus on re-render on Edge (xgao@microsoft.com)
- Dropdown: remove unnecessary focus calls (xgao@microsoft.com)
## 7.89.0
Wed, 05 Feb 2020 12:43:32 GMT

### Minor changes

- TeachingBubble: Fixing styling when TeachingBubble has close button but no headline. (Humberto.Morimoto@microsoft.com)
### Patches

- TeachingBubble: Applying Callout style-related props like calloutWidth and calloutMaxWidth. (Humberto.Morimoto@microsoft.com)
- ChoiceGroup: fix option label text being cutoff (xgao@microsoft.com)
- Pickers: remove input X button in Edge (xgao@microsoft.com)
## 7.88.1
Mon, 03 Feb 2020 20:04:10 GMT

### Patches

- Text: Updating docs and style logic to remove 'inherit' by default behavior. (Humberto.Morimoto@microsoft.com)
- Dialog: Fix DialogContent titleProps (xgao@microsoft.com)
## 7.88.0
Fri, 31 Jan 2020 19:00:10 GMT

### Minor changes

- Providing drag drop support for GroupedListSection. Previously, GroupedListSection was non-draggable. (vishgup@microsoft.com)
- Add ability to customize DetailsHeader tooltip based on column data (tmichon@microsoft.com)
### Patches

- Add styles file and type files for EditItem component (sanredd@microsoft.com)
- FacePile: Use default semantic html instead of aria attributes and roles (mark@thedutchies.com)
- ContextualMenu: Transforming examples to FunctionComponents and cleaning them up. (Humberto.Morimoto@microsoft.com)
- Nav: Fixing regular expression used to determine if URL is protocol relative or not. (Humberto.Morimoto@microsoft.com)
- Dropdown: Fixing various High Contrast issues. (Humberto.Morimoto@microsoft.com)
- ContextualMenu: fix role for checkable split button menu item (xgao@microsoft.com)
- GroupedList: Adding aria-expanded state to the focus target of groups so that the collapsed/expanded state of the group is announced. (Humberto.Morimoto@microsoft.com)
- GroupedList: Adding aria-level to indicate nested level of groups. (Humberto.Morimoto@microsoft.com)
## 7.86.1
Wed, 29 Jan 2020 12:37:18 GMT

### Patches

- MessageBar: Fix High Contrast Mode issues. (Humberto.Morimoto@microsoft.com)
- Panel: Calling onOpen on non-imperative scenarios like its description states. (Humberto.Morimoto@microsoft.com)
- Dropdown: Fix issue where pressing key up can cause scrolling of the whole page. (jehawley@microsoft.com)
## 7.86.0
Tue, 28 Jan 2020 12:43:24 GMT

### Minor changes

- BaseFloatingPicker: pass custom props to inner Callout (rezha@microsoft.com)
- Dialog/Panel: allow to set aria-level on header title (xgao@microsoft.com)
### Patches

- Semantic slot conversions for a few components: Persona, ContexualMenu, SplitButton, SpinButton, Tooltip, Dropdown, ComboBox, CommandBar, Suggestions (marygans@microsoft.com)
- Fix a bug where a user pressing the down key without opening the dropdown causes the window to scroll. The dropdown should cycle through the options. This fix changes the index from being the last item in the options to being the starting index, which is 0. (jehawley@microsoft.com)
- Support for dynamically updating keytips (keyou@microsoft.com)
- Button: Adding support for onPointerDown and onPointerUp. (Humberto.Morimoto@microsoft.com)
## 7.85.0
Mon, 27 Jan 2020 03:59:43 GMT

### Minor changes

- GroupedList: Add role prop to groupProps (erabelle@microsoft.com)
### Patches

- add icon support to combobox (makopch@microsoft.com)
- SpinButton: Making disabled SpinButtons non-focusable. (Humberto.Morimoto@microsoft.com)
- SearchBox: Dispose of EventGroup on unmount (KevinTCoughlin@users.noreply.github.com)
- PersonaCoin and related components: elliminating BaseComponent usage to reduce bundle size. (dzearing@hotmail.com)
## 7.84.1
Fri, 24 Jan 2020 12:30:27 GMT

### Patches

- Updating text field validation in date-time package to check new value rather than old one. (chce@netcompany.com)
- DatePicker: Fixing issue with formatted dates. (Humberto.Morimoto@microsoft.com)
## 7.84.0
Wed, 22 Jan 2020 12:36:43 GMT

### Minor changes

- Panel: Restyled Panel's header and navigation sections (v-mare@microsoft.com)
### Patches

- TextField: fix focused bottom border mis-alignment when errorMessage is set (v-jajach@microsoft.com)
## 7.83.2
Mon, 20 Jan 2020 12:28:43 GMT

### Patches

- ContextualMenu: Hide checkmark in ContextualMenuItems if canCheck is false (huaxi@microsoft.com)
- PeoplePicker: Splitting one example into multiple examples and converting to Function Components. (Humberto.Morimoto@microsoft.com)
## 7.83.1
Fri, 17 Jan 2020 02:32:17 GMT

### Patches

- Update tslib minver to first version containing __spreadArrays helper due to changes in how TS emits spreads. (jagore@microsoft.com)
## 7.83.0
Fri, 17 Jan 2020 01:24:12 GMT

### Minor changes

- OverflowSet: Don't assume role or orientation. Update CommandBar, examples and docs (mgodbolt@microsoft.com)
### Patches

- Theme Designer: adding secondary text to a11y panel, adding neutralSecondaryAlt to Fabric Palette slots table, fixing ThemeRulesStandards & ThemeGenerator producing color inaccuracies (aneeshak@microsoft.com)
- DatePicker accessibility: day in calendar is announced with blank role (xgao@microsoft.com)
- DatePicker: error message for required field is not cleared when date is selected from calendar (xgao@microsoft.com)
- Basepicker/Suggestions: Fix an issue where hasSuggestedAction would return true incorrectly (joschect@microsoft.com)
## 7.82.2
Thu, 16 Jan 2020 12:28:58 GMT

### Patches

- Upgrade repo to TS3.7. (jagore@microsoft.com)
- Add aria role to multi-select dropdown  (xgao@microsoft.com)
- CommandBar: Do not render empty div if farItems prop is empty array (xgao@microsoft.com)
- ContextualMenu: Fix disabled item being focusable (xgao@microsoft.com)
- Dropdown: fix exception when options change due to DropdownSizePosCache (xgao@microsoft.com)
- Fixing click handling for colorrectangle for bug #11680 (anuku@microsoft.com)
- Revert "ContextualMenu: Fix disabled item being focusable (#11693)" (xgao@microsoft.com)
## 7.82.1
Wed, 15 Jan 2020 00:21:25 GMT

### Patches

- ComboBox: Move autoComplete with no freeform key handling to onKeyUp to get access to key value vs key code to support non latin characters (mgodbolt@microsoft.com)
- Text: Fixing children check so it can render {0} value. (Humberto.Morimoto@microsoft.com)
- Reverting moving tablist to be a parent of tabpanel (chiechan@microsoft.com)
## 7.82.0
Tue, 14 Jan 2020 12:27:16 GMT

### Minor changes

- Fabric: Properly handle dir being passed into control (mgodbolt@microsoft.com)
### Patches

- FocusZone: remove keydown listener correctly to avoid a leak with inner zones. (dzearing@microsoft.com)
## 7.81.0
Mon, 13 Jan 2020 12:28:56 GMT

### Minor changes

- Change focus class behavior: Alternate between 'hidden' and 'visible' classes (paflakst@microsoft.com)
### Patches

- Consume compose functions where appropriate (tmichon@microsoft.com)
- Popup: fix an issue where onBlur would not correctly update focus state (joschect@microsoft.com)
- Dropdown: fix missing asterisk on focused dropdown (xgao@microsoft.com)
## 7.80.0
Fri, 10 Jan 2020 12:31:47 GMT

### Minor changes

- FocusZone:add page down/up feature (nasabek@microsoft.com)
### Patches

- Update snapshot test after fixing combobox styling (xgao@microsoft.com)
- Remove onBlur from being excluded in grid (chiechan@microsoft.com)
## 7.79.1
Thu, 09 Jan 2020 12:34:52 GMT

### Patches

- Icon: update null/undefinedcached icons till the time non-null/undefined icons are available for the first time. Then cache the non-null/undefined icons. (vishgup@microsoft.com)
- Popup: Fix disposables and element ref memory leaks (KevinTCoughlin@users.noreply.github.com)
## 7.79.0
Wed, 08 Jan 2020 17:02:57 GMT

### Minor changes

- Button: Use aria-checked for checkbox and menuitemcheckbox roles (mgodbolt@microsoft.com)
### Patches

- Update focus border styles for SearchBox, BasePicker (xgao@microsoft.com)
- bumping load-themed-styles to take advantage of es6 version of it (kchau@microsoft.com)
- For API reference pages, show all property tables on page load (elcraig@microsoft.com)
- Calendar: Fixing text color of 'today's day cell' when in High Contrast Mode. (Humberto.Morimoto@microsoft.com)
## 7.78.3
Tue, 07 Jan 2020 12:31:36 GMT

### Patches

- Pickers: fix multiple enter presses selecting same option many times (joschect@microsoft.com)
- FocusTrapZone: Release event handlers and element references for garbage-collection (KevinTCoughlin@users.noreply.github.com)
## 7.78.2
Mon, 06 Jan 2020 12:29:10 GMT

### Patches

- Modal ignoreExternalFocusing prop should also affect Popup (elcraig@microsoft.com)
- Combobox: Clicks to headers and scrollbars no longer cause onBlur (mgodbolt@microsoft.com)
- FocusZone: Delete function references on unmount (KevinTCoughlin@users.noreply.github.com)
## 7.78.1
Fri, 03 Jan 2020 12:27:16 GMT

### Patches

- ChoiceGroup: update docs and examples (elcraig@microsoft.com)
- Remove duplicate ChoiceGroupOption export (elcraig@microsoft.com)
- TagPicker: Define `title` for TagItem in case text overflows. (jdh@microsoft.com)
- update callout docs comment (joschect@microsoft.com)
## 7.78.0
Wed, 01 Jan 2020 12:30:43 GMT

### Minor changes

- Pass the original renderer to onRenderLabel in ChoiceGroupOption (#11575) (dagoltz@microsoft.com)
## 7.77.0
Tue, 31 Dec 2019 12:31:45 GMT

### Minor changes

- SwatchColorPicker: properly apply ID; doc updates (elcraig@microsoft.com)
### Patches

- Fabric control: listen for rtl in theme (mgodbolt@microsoft.com)
- DetailsList: Update examples to work in strictFunctionTypes (mgodbolt@microsoft.com)
- Combobox: Focus returns to input after item click (mgodbolt@microsoft.com)
- Layer: add touch events to filtering to stop those that are bubbling up (aneeshak@microsoft.com)
## 7.76.3
Mon, 30 Dec 2019 12:25:00 GMT

### Patches

- add firstFocusableSelector to example FocusTrapZone to resolve Edge issue (mgodbolt@microsoft.com)
## 7.76.2
Tue, 24 Dec 2019 12:33:51 GMT

### Patches

- Ensure icon font family isn't overridden by Fabric Core (elcraig@microsoft.com)
## 7.76.1
Mon, 23 Dec 2019 12:34:01 GMT

### Patches

- Align color system in Tooltip (nif_tony@outlook.com)
## 7.76.0
Fri, 20 Dec 2019 12:32:45 GMT

### Minor changes

- Modal, Panel, Overlay: added optional prop allowTouchBodyScroll that allows body scroll on touch devices (dmitriy.ravdin@siemens.com)
### Patches

- ScrollablePane: Fixing tabbing navigation with Sticky headers. (Humberto.Morimoto@microsoft.com)
## 7.75.0
Thu, 19 Dec 2019 12:33:02 GMT

### Minor changes

- Update color picker to include aria labels for hue and alpha sliders (mgodbolt@microsoft.com)
- Combobox: Fix multiselect options not being read by screen readers. (joschect@microsoft.com)
- Sticky: Always render narrator readable content in place (mgodbolt@microsoft.com)
- DocumentCard: Fixing focus styling on Links in DocumentCardPreview. (Humberto.Morimoto@microsoft.com)
### Patches

- Combobox: Removed redundant htmlFor attribute as input already use aria-labelledby (mgodbolt@microsoft.com)
- SearchBox: Don't duplicate placeholder text in aria-label (mgodbolt@microsoft.com)
- DetailsList: Adding Announced section for # of filtered items in examples. (Humberto.Morimoto@microsoft.com)
- DetailsList: Adding Announced section for examples that have '# of items selected' message in display. (Humberto.Morimoto@microsoft.com)
## 7.74.2
Wed, 18 Dec 2019 12:30:18 GMT

### Patches

- FocusZone: Adding tab handle for DomOrder direction. (Humberto.Morimoto@microsoft.com)
## 7.74.1
Tue, 17 Dec 2019 12:29:42 GMT

### Patches

- ProgressIndicator: improve high contrast colors for progress bar (micahgodbolt@gmail.com)
- PersonaCoin: make divs role presentation (micahgodbolt@gmail.com)
## 7.74.0
Sun, 15 Dec 2019 23:45:36 GMT

### Minor changes

- Persona: adding alt text to examples (aneeshak@microsoft.com)
### Patches

- DetailsList: Adding aria-readonly attribute so screen readers don't announce the cells as editable. (Humberto.Morimoto@microsoft.com)
- getRTL uses RTL flag on theme if present. (jdh@microsoft.com)
- Fix iteration of Sticky items in ScrollablePane (tmichon@microsoft.com)
- Fix minor doc issues for TextField and pickers (elcraig@microsoft.com)
- Move ARIA role to outer div where native props are assigned to allow for ARIA attributes such as aria-label. (jagore@microsoft.com)
- ContextualMenu: Associate group with header to improve narrator (micahgodbolt@gmail.com)
## 7.73.0
Fri, 13 Dec 2019 12:30:51 GMT

### Minor changes

- Toggle: Change div inside button to be a span (mgodbolt@microsoft.com)
### Patches

- Tooltip: clarify examples and docs (elcraig@microsoft.com)
- FocusZone: Escape readOnly input on arrow clicks (mgodbolt@microsoft.com)
- Nav: Allow falsy values of title to be passed into items (mgodbolt@microsoft.com)
- Panel: onLightDismissClick now properly prevents light dismiss (mgodbolt@microsoft.com)
- ContextualMenu: Fix accessibility issue in example (mgodbolt@microsoft.com)
## 7.72.0
Thu, 12 Dec 2019 12:29:56 GMT

### Minor changes

- Callout: Add Non Focusable Callout example (mgodbolt@microsoft.com)
### Patches

- Ensure that navigating between selected items doesn't clear modal state (tmichon@microsoft.com)
- Stack: Adding documentation about Stack Items in the Stack overview. (Humberto.Morimoto@microsoft.com)
## 7.71.0
Wed, 11 Dec 2019 12:30:26 GMT

### Minor changes

- Only update ExtendedPicker state on input events that are not mid-composition  (mahuangh@microsoft.com)
- Dropdown: Render options with header in group so that narrator associates group with header (mgodbolt@microsoft.com)
- Autocomplete: Allow value to be overriden (mgodbolt@microsoft.com)
### Patches

- Combobox: multi-select does not clear index on selection. Selected and checked properly supported (mgodbolt@microsoft.com)
- fix contextual menu split button cannot be read by screen reader bug (xgao@microsoft.com)
## 7.70.0
Tue, 10 Dec 2019 12:34:47 GMT

### Minor changes

- DetailsList: Pass column styles to DetailsColumn (mgodbolt@microsoft.com)
### Patches

- Dialog: Use closeButtonAriaLabel for close button tooltip (v-ragor@microsoft.com)
- Theme Designer: use createTheme and Customizations.applySettings instead of loadTheme (aneeshak@microsoft.com)
- Screen Reader is reading wrong column header with associated cell value for single-select detail list (xgao@microsoft.com)
- Button: fix size mismatch between primary and default buttons (xgao@microsoft.com)
## 7.69.3
Mon, 09 Dec 2019 12:29:23 GMT

### Patches

- OverflowSet: Vertical layout now uses menu instead of menubar (mgodbolt@microsoft.com)
## 7.69.2
Fri, 06 Dec 2019 12:33:21 GMT

### Patches

- Fixed after element misalignment (betrue@microsoft.com)
- Dropdown: fix misalignment (betrue@microsoft.com)
- DocumentCard: Adding explicit focus styles (mgodbolt@microsoft.com)
- Slider: getAriaValueText should return value if ariaValueText isn't supplied (mgodbolt@microsoft.com)
- updated snapshots (betrue@microsoft.com)
- Correct SpinButton default max value in documentation (xgao@microsoft.com)
## 7.69.1
Thu, 05 Dec 2019 12:34:16 GMT

### Patches

- ComboBox: empty errorMessage shouldn't create white space (aneeshak@microsoft.com)
- VirtualizedComboBox: Implement focus(shouldOpenOnFocus, asyncFocus) (aneeshak@microsoft.com)
## 7.69.0
Wed, 04 Dec 2019 12:32:13 GMT

### Minor changes

- Add calloutProps to HoverCard (anihan@microsoft.com)
### Patches

- Added a a field to Nav Group Props" (num@microsoft.com)
## 7.68.0
Tue, 03 Dec 2019 12:36:28 GMT

### Minor changes

- Pickers: Allow force resolve when no match found (joschect@microsoft.com)
- DatePicker: Making styles accept functions and objects and not only functions. (Humberto.Morimoto@microsoft.com)
### Patches

- ComboBox: Fixing icon position when disabled. (humbertomakotomorimoto@gmail.com)
- Removed persona cursor style as it was making non buttons look like clickable buttons (mgodbolt@microsoft.com)
## 7.67.0
Fri, 29 Nov 2019 12:34:49 GMT

### Minor changes

- TeachingBubble: add hasCloseButton and deprecate hasCloseIcon; prevent header text from overlapping with close button. (dzearing@microsoft.com)
## 7.66.0
Thu, 28 Nov 2019 12:32:23 GMT

### Minor changes

- Updated office-ui-fabric-core dependency (v-mare@microsoft.com)
- Coachmark: Add prop to make beak persistent after opening (mgodbolt@microsoft.com)
### Patches

- Update Modal onKeyUp to also register in componentDidMount (sareiff@microsoft.com)
- Update spinbutton check (sareiff@microsoft.com)
## 7.65.1
Wed, 27 Nov 2019 12:32:07 GMT

### Patches

- Combobox: Noop if selected item is disabled (mgodbolt@microsoft.com)
- PeoplePicker: Fix selected + hover Persona text styling. (Humberto.Morimoto@microsoft.com)
- ComboBox: Fixing options' custom styling not applying to multiselect ComboBoxes. (Humberto.Morimoto@microsoft.com)
## 7.65.0
Tue, 26 Nov 2019 12:32:11 GMT

### Minor changes

- Fabric component: adding `dir=rtl` support to affect both the `dir` attribute as well as affecting the styling generated within scope (by creating an rtl-versioned theme and exposing it via `Customizer`.) (dzearing@hotmail.com)
## 7.64.2
Mon, 25 Nov 2019 12:31:13 GMT

### Patches

- CommandBar: Removed unnecessary role={'presentation'} from OverflowSet (mgodbolt@microsoft.com)
- fixing double selection in Calendar month picker (jolore@microsoft.com)
- CommandBarButton: Fixed hidden CommandBarButton splitbuttonDivider (v-mare@microsoft.com)
- test (cliff.koh@microsoft.com)
- Revert label change (rezha@microsoft.com)
## 7.64.1
Fri, 22 Nov 2019 16:57:54 GMT

### Patches

- Modal: Updated styles to match toolkit. (v-mare@microsoft.com)
- Removed SCSS from ResizeGroup. Added ResizeGroup.OverflowSet.Example.Style file. Added Codepen export support (pandasa123@gmail.com)
- TeachingBubble: adding focus outline to close button for color contrast accessibility. Color contrast ratio should be more then 3:1. (marygans@microsoft.com)
- Callout: Fixed bottom padding and button alignment to flex-end (v-mare@microsoft.com)
## 7.64.0
Thu, 21 Nov 2019 12:30:32 GMT

### Minor changes

- Fabric Component: add applyTheme and applyThemeToBody props. (aneeshak@microsoft.com)
### Patches

- Updated searchbox and textfield disabled borders in high contrast (mgodbolt@microsoft.com)
## 7.63.0
Wed, 20 Nov 2019 12:29:50 GMT

### Minor changes

- Add link to Nav props (srperias@microsoft.com)
### Patches

- Dropdown: do not count hidden items (kchau@microsoft.com)
## 7.62.0
Mon, 18 Nov 2019 12:33:30 GMT

### Minor changes

- MarqueeSelection: Add horizontal scrolling (v-mare@microsoft.com)
### Patches

- Nav: remove incorrect and unnecessary hover styles (phkuo@microsoft.com)
- Coachmark: A11y fixes - Added focus indicator to coachmark when activated (marygans@microsoft.com)
- CalendarDay: Fixed issue with onDayKeyDown re-opening callout (v-mare@microsoft.com)
- Fix dropdown option style on keyboard navigation in high contrast mode (xgao@microsoft.com)
- Combobox high contrast mode fixes for input box, caret down button, option hover styles (xgao@microsoft.com)
## 7.61.1
Fri, 15 Nov 2019 12:31:09 GMT

### Patches

- applied accessibility changes to main package (betrue@microsoft.com)
- Picker: Updating disabled border color from transparent in order to match disabled background color. (marygans@microsoft.com)
- DropDown: make dropdown option title prop to be assigned consistently for the multiselect case (kchau@microsoft.com)
## 7.61.0
Thu, 14 Nov 2019 12:30:52 GMT

### Minor changes

- ComboBox: adding an onRenderUpperContent() flexpoint for combobox (kchau@microsoft.com)
### Patches

- FocusZone: reset alignment when receiving focus. (dzearing@hotmail.com)
- lint-imports.js: Added errors for package absolute imports (v-mare@microsoft.com)
## 7.60.1
Wed, 13 Nov 2019 12:33:43 GMT

### Patches

- SearchBox: Remove autocomplete documentation as feature is not supported. (jagore@microsoft.com)
## 7.60.0
Tue, 12 Nov 2019 12:32:39 GMT

### Minor changes

- Doc typing updates to support API doc refactor (should not impact consumers) (elcraig@microsoft.com)
### Patches

- Fix dropdown title and event (achal.jain@microsoft.com)
- Combobox: Augmented checkbox to handle clicks from blank space to the right of the label  (v-mare@microsoft.com)
- ContextualMenu: Add example using ContextualMenu directly. (jagore@microsoft.com)
- HoverCard: Clarify hotKey in documentation. (jagore@microsoft.com)
## 7.59.3
Sat, 09 Nov 2019 14:26:36 GMT

### Patches

- FloatingPicker: Addressing bad import, causing jest to fail when referenced. (dzearing@hotmail.com)
## 7.59.2
Sat, 09 Nov 2019 06:41:37 GMT

### Patches

- Removed SCSS (pandasa123@gmail.com)
- Removed SCSS (pandasa123@gmail.com)
- Removed SCSS dependency. Since we're doing this in JS, I don't think we'd need the :after selector but I'd love to be corrected just in case I'm wrong (pandasa123@gmail.com)
- Dropdown: fixed checks on preventDefault which should be defaultPrevented (micahgodbolt@gmail.com)
## 7.59.1
Fri, 08 Nov 2019 12:30:07 GMT

### Patches

- copied over fixes from a previous PR # 10439 (betrue@microsoft.com)
- Add px units to flexBasis styling by default. Remove existing styling usage where it had no effect before this PR. (jagore@microsoft.com)
- Removed SCSS file (pandasa123@gmail.com)
- Removed SCSS file (pandasa123@gmail.com)
- TooltipHost: Fix dismiss race condition. (jdh@microsoft.com)
- Removed SCSS for List Scrolling Example in favour of mergeStyleSets pattern (pandasa123@gmail.com)
- Removed SCSS from Facepile Examples (pandasa123@gmail.com)
## 7.59.0
Thu, 07 Nov 2019 12:26:32 GMT

### Minor changes

- TeachingBubble: Wrap contents in a FocusTrapZone to better support keyboard navigation. (jdh@microsoft.com)
### Patches

- Fix modal keyboarding issue with respect to moving the modal (sareiff@microsoft.com)
- Pass through div props to the rendered root of CommandBar. (xinychen@microsoft.com)
- Address BasePicker calls onResolveSuggestions callback when click. (nif_tony@outlook.com)
## 7.58.0
Wed, 06 Nov 2019 12:34:07 GMT

### Minor changes

- Update API doc generation to handle deprecated messages (elcraig@microsoft.com)
### Patches

- ContextualMenu: fix escape not dismissing menu (joschect@microsoft.com)
- Removed SCSS file (pandasa123@gmail.com)
## 7.57.2
Tue, 05 Nov 2019 23:43:46 GMT

### Patches

- CommandBar: Update examples (jdh@microsoft.com)
## 7.57.1
Tue, 05 Nov 2019 12:25:16 GMT

### Patches

- Propagate version through List and GroupedList (tmichon@microsoft.com)
## 7.57.0
Mon, 04 Nov 2019 12:23:43 GMT

### Minor changes

- ColorPicker: add keyboard support and aria labels (elcraig@microsoft.com)
- ComboBox: onPendingValueChanged callback before onChange (jdh@microsoft.com)
### Patches

- All Components: Added new files and markdown content (v-mare@microsoft.com)
- Dropdown: error message should have role=alert (jdh@microsoft.com)
- Checkbox: Added title attribute to checkbox containing div (v-mare@microsoft.com)
- Updating the default foreground values in theming algorithm to match new fluent values (email not defined)
- Toggle: Force wrapping when width-constrained. (jdh@microsoft.com)
- Combobox: Fixed issue where hidden options are shown when arrowing through combobox option list (v-mare@microsoft.com)
## 7.56.3
Fri, 01 Nov 2019 12:25:57 GMT

### Patches

- CommandBar: update examples and docs (elcraig@microsoft.com)
## 7.56.2
Fri, 01 Nov 2019 01:02:38 GMT

### Patches

- Panel: improve examples (elcraig@microsoft.com)
## 7.56.1
Wed, 30 Oct 2019 19:36:52 GMT

### Patches

- ComboBox: Allow Space KeyUp event to propagate (xgao@microsoft.com)
- SpinButton: fix vertical alignment relative to other fields (elcraig@microsoft.com)
- Option to use checkbox role in Toggle component (satimals@microsoft.com)
- Refactor Stack import to be relative not OUFR root (KevinTCoughlin@users.noreply.github.com)
## 7.56.0
Tue, 29 Oct 2019 12:36:28 GMT

### Minor changes

- Remove re-export of @uifabric/example-data from office-ui-fabric-react (KevinTCoughlin@users.noreply.github.com)
### Patches

- CommandBarButton: Fix height issue when commandbar buttons iconOnly props set to true (v-mare@microsoft.com)
## 7.55.3
Mon, 28 Oct 2019 22:25:45 GMT

### Patches

-  Added role to the selection list for BasePickerListBelow control so screen readers will read off "n" of "m" when arrowing through the list. (malind@microsoft.com)
## 7.55.2
Mon, 28 Oct 2019 12:31:48 GMT

### Patches

- Panel: Use semantic colors (elcraig@microsoft.com)
- removing circular IPoint import (mehanig@gmail.com)
## 7.55.1
Fri, 25 Oct 2019 12:31:49 GMT

### Patches

- Facepile: added ARIA label so ARIA input fields should have an accessible name addressing issue #10877 (marygans@microsoft.com)
- Dropdown: Moving announcement of selected options from aria-describedby to aria-labelledby. (Humberto.Morimoto@microsoft.com)
- Fix button _onDismissMenu to accept undefined event params (mgodbolt@microsoft.com)
## 7.55.0
Thu, 24 Oct 2019 12:31:42 GMT

### Minor changes

- Do not expand date picker on TextField click when disableAutoFocus is true and allowTextInput is true. (phtucker@microsoft.com)
### Patches

- FocusZone: unhooking capture keydown handler at the right time to avoid a race condition. (dzearing@hotmail.com)
- Make DetailsRow data-is-focusable configurable (KevinTCoughlin@users.noreply.github.com)
- Adds aria label to basebutton on the outer div (kchau@microsoft.com)
## 7.54.1
Wed, 23 Oct 2019 12:32:05 GMT

### Patches

- Dropdown: Added note to documentation page calling out Dropdown's behavior of rendering in a panel in very small viewports. (mgodbolt@microsoft.com)
- TagPicker: make tag item and input text to respect theme color and have correct font (xgao@microsoft.com)
- Suggestions: Fix problem where search for more button wouldn't highlight correctly (joschect@microsoft.com)
- TagPicker: Update snapshots (jdh@microsoft.com)
## 7.54.0
Tue, 22 Oct 2019 12:32:05 GMT

### Minor changes

- ContextualMenu: Tightening types of onDismiss callback. (Humberto.Morimoto@microsoft.com)
### Patches

- consume suggestionsAvailableAlertText prop to floating picker, so that the screen readers can announce the apperance of suggestions when the prop is set. (email not defined)
- Fix getDerivedStateFromProps signatures (elcraig@microsoft.com)
- TagPicker: prevent long items from overflowing narrow container (elcraig@microsoft.com)
- TagPicker: Close button high contrast color fix (joschect@microsoft.com)
## 7.53.1
Mon, 21 Oct 2019 12:33:23 GMT

### Patches

- Facepile: Added presence example (v-mare@microsoft.com)
- Pickers: Bring pickers in line with W3 ARIA 1.1 specs. (joschect@microsoft.com)
- Fix typo (norton.wong@genedata.com)
## 7.53.0
Fri, 18 Oct 2019 12:31:12 GMT

### Minor changes

- Fix virtualization state tracking in List and DetailsList (tmichon@microsoft.com)
### Patches

- Allow data attribute passing for SpinButton (xgao@microsoft.com)
- Dropdown: fix a few of the aria regressions (joschect@microsoft.com)
- Get rid of DetailsList example snapshot churn (elcraig@microsoft.com)
## 7.52.0
Thu, 17 Oct 2019 12:33:02 GMT

### Minor changes

- Dropdown: Bringing accessibility up to standards. (Humberto.Morimoto@microsoft.com)
### Patches

- Button: Fixed logic where onDismiss was replacing internal dismiss function. (mgodbolt@microsoft.com)
## 7.51.0
Wed, 16 Oct 2019 12:33:21 GMT

### Minor changes

- Announced: add `as` prop and root styles (elcraig@microsoft.com)
- Allowing role to be overridden on SplitButton (pagaur@microsoft.com)
- ComboBox and Dropdown: Passing correct onDismiss prop in onRenderContainer. (Humberto.Morimoto@microsoft.com)
### Patches

- Checkbox: improve checked state handling (elcraig@microsoft.com)
- TeachingBubble udpates: added separate multi-step example to reflect current design toolkit and updated basic teachingbubble example (marygans@microsoft.com)
- Pivot and Stack: relax child item type checks (elcraig@microsoft.com)
- CommandBar: Replacing inline styles with definition in styles file. (Humberto.Morimoto@microsoft.com)
## 7.50.0
Tue, 15 Oct 2019 12:32:28 GMT

### Minor changes

- Breadcrumb: fix accessibility and styling issues (elcraig@microsoft.com)
### Patches

- Textfield: Fix disabled text color (joschect@microsoft.com)
## 7.49.0
Mon, 14 Oct 2019 12:30:37 GMT

### Minor changes

- Tooltip: Creating aria placeholder for accessibility scenarios with Tooltips with a render delay. (Humberto.Morimoto@microsoft.com)
### Patches

- SpinButton: Fixing minWidth and having it come from const to be consistent. (Humberto.Morimoto@microsoft.com)
## 7.48.1
Fri, 11 Oct 2019 12:31:31 GMT

### Patches

- TeachingBubble: body content should resize better when container is wide. Added wide example with just text to demonstrate this. (aneeshak@microsoft.com)
- Apply className on DetailsHeaderBase. (email not defined)
## 7.48.0
Thu, 10 Oct 2019 12:32:08 GMT

### Minor changes

- Export DetailsRowFields (KevinTCoughlin@users.noreply.github.com)
### Patches

- Fixed dropdown to not select first option automatically unless it's selected using keyboard navigation per aria (xgao@microsoft.com)
- Announced: explicitly show aria-live property in Announced types (naethell@microsoft.com)
## 7.47.0
Wed, 09 Oct 2019 22:25:09 GMT

### Minor changes

- ResponsiveMode: defaulting to large to avoid breaking changes for scenarios assuming it would be available on first render. (dzearing@microsoft.com)
### Patches

- Dropdown: when `openOnKeyboardFocus` prop is set to true, the Dropdown now does not close the options callout immediately. (xgao@microsoft.com)
## 7.46.0
Wed, 09 Oct 2019 12:34:23 GMT

### Minor changes

- Breadcrumb: Allow setting a custom overflow icon. (madomi@microsoft.com)
- Announced: default aria live to polite (naethell@microsoft.com)
### Patches

- DetailsList: ariaLabel for select all checkbox should be dependent on selection mode (aneeshak@microsoft.com)
- Changing order of arguments passed to getClassNames. Until now it was inconsistent with type defined in Button.types.ts (kushaly@microsoft.com)
## 7.45.1
Tue, 08 Oct 2019 12:31:37 GMT

### Patches

- ComboBox: Making error messages accessible to screen readers. (Humberto.Morimoto@microsoft.com)
## 7.45.0
Mon, 07 Oct 2019 23:42:31 GMT

### Minor changes

- Adding a new prop renderPersistedMenuHiddenOnMount (kushaly@microsoft.com)
- Callout and Card: Fix anchors for both (joschect@microsoft.com)
### Patches

- Callout & Tooltip: Making background color themable. (Humberto.Morimoto@microsoft.com)
## 7.44.0
Mon, 07 Oct 2019 12:33:45 GMT

### Minor changes

- Reverting dependency on ReactDOM findDOMNode in utilities to avoid bundle problems in partners. (dzearing@microsoft.com)
### Patches

- fixed minor a11y bugs, revamped example page (mgodbolt@microsoft.com)
## 7.43.2
Fri, 04 Oct 2019 22:19:48 GMT

### Patches

- ContextualMenu: Removing deprecated check for getMenuClassNames that was stopping callout subComponentStyles from being applied. (Humberto.Morimoto@microsoft.com)
## 7.43.1
Thu, 03 Oct 2019 23:14:46 GMT

### Patches

- Fixes broken publish (odbuild@microsoft.com)
## 7.43.0
Thu, 03 Oct 2019 01:14:35 GMT

### Minor changes

- Callout: Addressing regression when target is an event. (dzearing@microsoft.com)
### Patches

- Dropdown: adjust option styling for IE11 (naethell@microsoft.com)
- Dropdown: Making multiselect options clickable outside of the options label while still within Dropdown's boundaries. (Humberto.Morimoto@microsoft.com)
## 7.42.0
Wed, 02 Oct 2019 12:31:15 GMT

### Minor changes

- Nav: improve ARIA labels for group headings. (jdh@microsoft.com)
### Patches

- Prevent suggestion autocomplete without selection (anhw@microsoft.com)
- DocumentCard: Adding aria-label descriptions to all examples. (Humberto.Morimoto@microsoft.com)
- Teachingbubble Example: Fix illustration example (joschect@microsoft.com)
- Fixing the rendering of boolean values in Lists (nicul@microsoft.com)
## 7.41.0
Tue, 01 Oct 2019 12:33:48 GMT

### Minor changes

- Layer: now works better when rendering from a child window. (dzearing@microsoft.com)
### Patches

- Refactoring BaseButton with respect to how it processes menuProps (kushaly@microsoft.com)
- Rating: Align read-only functionality with ARIA standards. (jagore@microsoft.com)
## 7.40.0
Mon, 30 Sep 2019 12:35:16 GMT

### Minor changes

- dateMath change to include extra parameter when calculating date range (jolore@microsoft.com)
### Patches

- Dropdown: There is now a visible focus border on Dropdowns in the error state. (cliff.koh@microsoft.com)
## 7.39.2
Fri, 27 Sep 2019 12:33:04 GMT

### Patches

- SwatchColorPicker: Updates web fluent styles per toolkit (v-mare@microsoft.com)
- revert icon button back to fixed width (mgodbolt@microsoft.com)
- Dropdown: Narrator should announce options before, during, and after expanding/collapsing. (aneeshak@microsoft.com)
- DetailsList: Narrator should announce SelectAll Checkbox as a toggle selection for all items (aneeshak@microsoft.com)
- TextField: Multiline textfields are now correctly associated with their labels with `aria-labelledby`. (aneeshak@microsoft.com)
## 7.39.1
Thu, 26 Sep 2019 12:32:32 GMT

### Patches

- simplified examples and fix a11y issues (mgodbolt@microsoft.com)
- Dropdown: Error messages in Dropdown are now linked to the Dropdown (from a programmatic accessibility POV). (cliff.koh@microsoft.com)
## 7.39.0
Wed, 25 Sep 2019 12:34:56 GMT

### Minor changes

- Adding a prop shouldUpdateWhenHidden to decide whether to udpate hidden callouts and contextual menus (kushaly@microsoft.com)
- Fix return type of onGrowData() in CommandBar. (1721514+gordianschuda@users.noreply.github.com)
### Patches

- DetailsList: initialize selection object mode with selectionMode prop if it is defined (naethell@microsoft.com)
- fixing focus outline in IE11. The outline in IE11 does not show if it overflows the div it's in unless we explicitly set overflow: visible on the div (other browsers have this as the default). (jolore@microsoft.com)
- Coachmark Accessibility: adding HighContrastSelector to coachmark (marygans@microsoft.com)
- updated callout example with better, accessible example (mgodbolt@microsoft.com)
- Pivot: Fix accessibility of example. (jdh@microsoft.com)
- Use correct type in docs for 'collapseAllVisibility' in 'GroupedList' (thomas.gassmann@hotmail.com)
- Pivot: Improve accessibility of examples. (jdh@microsoft.com)
## 7.38.0
Tue, 24 Sep 2019 12:35:43 GMT

### Minor changes

- Changing ColorPicker to use a selectedId instead of selectedIndex in its state. (kushaly@microsoft.com)
### Patches

- Dialog: Updated styles to match toolkit. (v-mare@microsoft.com)
- Added a title in the custom SplitButton example (kchau@microsoft.com)
- TeachingBubble: alt tags for example images. (jdh@microsoft.com)
- Remove codepen-loader usage (elcraig@microsoft.com)
## 7.37.1
Mon, 23 Sep 2019 12:33:15 GMT

### Patches

- Icon Accessibility: update aria-hidden to pull aria-labelledBy from root and imageProps and removed role presentation - should not apply when a label is provided.  (marygans@microsoft.com)
- Update icons to v3.50. May change subset font files for some components. (pejahn@microsoft.com)
- FocusTrapZone example: Remove Randomize function. (jagore@microsoft.com)
- Positioning: Fix issue where anchor edge would flip even if previous positions calculated (joschect@microsoft.com)
- fix typo in ComboBox and Button docs (thomas.gassmann@hotmail.com)
- Stack doesn't need to set overflow=hidden when grow=true to restrict size of flexbox children. Users are having to override this with overflow=visible to prevent clipping inner children (email not defined)
## 7.37.0
Fri, 20 Sep 2019 12:34:28 GMT

### Minor changes

- Breadcrumb: Added ability to make current item a heading. (v-mare@microsoft.com)
### Patches

- Update Panel examples to improve accessibility. (jdh@microsoft.com)
- Fixes various a11y issues in docs and controls (mgodbolt@microsoft.com)
- TeachingBubble: Specify heading role for header. (jdh@microsoft.com)
- ContextualMenu: Update the bounds prop to allow for the same functionality that the Callout has (jspurlin@microsoft.com)
- Listen to composition events only for IE11 (amyngu@microsoft.com)
## 7.36.0
Thu, 19 Sep 2019 13:05:24 GMT

### Minor changes

- TagPicker: Updated styles to match toolkit. Added more screener tests. Added read only state. (v-mare@microsoft.com)
- Apply CheckboxVisiblity to header as well in DetailsList (thomas.gassmann@hotmail.com)
### Patches

- ComboBox: fix for issue resetting suggestedDisplayValue after clearing the content of a comboBox (marygans@microsoft.com)
- keep aria-label in sync with FloatingPicker open state in BaseExtendedPicker (mhuan13@gmail.com)
- SplitButton: Updated high contrast styling (v-mare@microsoft.com)
- Rating: Fixed duplicates ID on stars with fractional values. (v-mare@microsoft.com)
- Coachmark: Fixed pulse beacon RTL animation direction issue. (v-mare@microsoft.com)
- add landmark and widget role to searchbox (mgodbolt@microsoft.com)
## 7.35.0
Wed, 18 Sep 2019 12:32:55 GMT

### Minor changes

- Listen to onCompositionUpdate instead of onInput for IME composition (amyngu@microsoft.com)
- BasePicker: deprecate onFocus (naethell@microsoft.com)
### Patches

- Contextual Menu calls onMenuOpened when hidden is changed from undefined to false. (kushaly@microsoft.com)
## 7.34.0
Mon, 16 Sep 2019 12:34:47 GMT

### Minor changes

- update to use icon prop instead of string (chiechan@microsoft.com)
### Patches

- Use new hooks in some examples (elcraig@microsoft.com)
- DatePicker: call custom text field onChange handler if it exists in default onChange handler (naethell@microsoft.com)
## 7.33.0
Fri, 13 Sep 2019 12:34:39 GMT

### Minor changes

- CalendarMonth: Prefer createRef over string ref (KevinTCoughlin@users.noreply.github.com)
- Callout: add the ability for bounds to take a callback (jspurlin@microsoft.com)
### Patches

- give tooltip hoverable area an index lower than the content (mgodbolt@microsoft.com)
- Add .is-disabled to ChoiceGroupOption when disabled (KevinTCoughlin@users.noreply.github.com)
- TextField: remove invalid aria-labelledby (naethell@microsoft.com)
- DetailsList: add Announced to examples with sortable columns (naethell@microsoft.com)
- Tooltip: Changed examples from aria-labelledby to aria-describedby to follow a11y spec. (v-mare@microsoft.com)
## 7.32.0
Thu, 12 Sep 2019 12:34:15 GMT

### Minor changes

- Persona: Adding size120 to the PersonaSize enum, updating API. (eddrost@microsoft.com)
### Patches

- Only render SpinButton label container if label or icon is present (KevinTCoughlin@users.noreply.github.com)
- Fix examples to only export a single component (elcraig@microsoft.com)
- Combobox: Fix issue where it would mutate props (joschect@microsoft.com)
- Pickers: make background color of input transparent so it doesn't clip border (joschect@microsoft.com)
- GroupedList: Fixed selected prop value not being set.  (v-mare@microsoft.com)
## 7.31.3
Wed, 11 Sep 2019 12:35:47 GMT

### Patches

- Combobox: ensure that state doesn't mutate in controlled scenario (joschect@microsoft.com)
## 7.31.2
Mon, 09 Sep 2019 21:43:18 GMT

### Patches

- Update Nav.base.tsx (michael.david.lauria@gmail.com)
## 7.31.1
Fri, 06 Sep 2019 12:34:51 GMT

### Patches

- Nav: Added aria-labels to Nav examples per issue request (v-mare@microsoft.com)
## 7.31.0
Thu, 05 Sep 2019 12:34:51 GMT

### Minor changes

- Adding Preview pan to the color picker component, increasing the width and height of the color rectangle and css changes (navkuma@microsoft.com)
### Patches

- give tooltip hoverable area an index lower than the content (mgodbolt@microsoft.com)
## 7.30.0
Wed, 04 Sep 2019 12:32:15 GMT

### Minor changes

- Update snapshots (pejahn@microsoft.com)
### Patches

- Dropdown: Fix bug where it was not programatically possible to focus on Dropdown with `tabIndex=-1`.  (cliff.koh@microsoft.com)
- Checkbox: Added initializeFocusRects to fix focus issue. (v-mare@microsoft.com)
## 7.29.2
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- DetailsList: Fix function mutations with onClick and onContextMenuClick in DetailsColumn (KevinTCoughlin@users.noreply.github.com)
- fix version file (kchau@microsoft.com)
## 7.29.1
Wed, 04 Sep 2019 00:37:31 GMT

### Patches

- Button: Fixing SplitButton outline when focused. (humbertomakotomorimoto@gmail.com)
## 7.29.0
Mon, 02 Sep 2019 12:33:56 GMT

### Minor changes

- Add FocusZone direction domOrder (sohuts@microsoft.com)
### Patches

- Nav Component isOnTop property set can set focus to the Nav focusZone (inateeg@microsoft.com)
## 7.28.3
Fri, 30 Aug 2019 12:30:57 GMT

### Patches

- Fix imports in examples and deprecate old example data (elcraig@microsoft.com)
- Dialog: Changed demo copy to match real OWA text (v-mare@microsoft.com)
## 7.28.2
Thu, 29 Aug 2019 12:30:00 GMT

### Patches

- ColorRectangle styling fixes (elcraig@microsoft.com)
- Fix override handling for CommandBarButton (tmichon@microsoft.com)
## 7.28.1
Tue, 27 Aug 2019 12:33:51 GMT

### Patches

- Link, Stack, and Toggle example updates (elcraig@microsoft.com)
- Remove some relative imports from examples (elcraig@microsoft.com)
## 7.28.0
Mon, 26 Aug 2019 12:30:49 GMT

### Minor changes

- Button: change divs to be spans so its w3 compliant (joschect@microsoft.com)
### Patches

- Memoizing styling in createComponent for components that have their default styling determined entirely by tokens. (Humberto.Morimoto@microsoft.com)
- Refactor Checkbox styles to reduce size. (v-mare@microsoft.com)
- Update positioning logic to nudge item when none of the positions fit (53619942+srishtis27@users.noreply.github.com)
- New drop hint icon for drag-drop and corresponding padding space on top (svaibhav@microsoft.com)
- Updating snapshots due to merge-styles selector split changes. (dzearing@hotmail.com)
## 7.27.1
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- MessageBar: Fix high contrast mode issue where you cannot tell which buttons you have focus on. (cliff.koh@microsoft.com)
- fixing the icons to have minWidth instead of hard coded width (kchau@microsoft.com)
- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- make sure to skip aria-describedby for onRenderDescription is nullRender (kchau@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.27.0
Thu, 22 Aug 2019 12:34:59 GMT

### Minor changes

- Button: Using FontIcon and ImageIcon instead of Icon in both oufr and experiments Button. (Humberto.Morimoto@microsoft.com)
- right align the action buttons per new design (kchau@microsoft.com)

### Patches

- Autofill: fix issue where autofill wouldn't handle delete correctly (joschect@microsoft.com)
- making sure we get rid of javascript: urls in nav (kchau@microsoft.com)
- Panel Example: Fix function typing (joschect@microsoft.com)

## 7.26.0
Wed, 21 Aug 2019 12:34:09 GMT

### Minor changes

- Add presenceTitle prop (gogoe@microsoft.com)

### Patches

- Combobox: Updates styles to latest design specs. (v-mare@microsoft.com)
- Simplify Button examples (elcraig@microsoft.com)
- Use getDocument instead document in FocusZone and FocusTrapZone (sohuts@microsoft.com)
- Fix TextField onChange bug (elcraig@microsoft.com)
- Fix empty text box when a color component being zero (reli@microsoft.com)
- add space functionality to split button with tests (chiechan@microsoft.com)

## 7.25.1
Tue, 20 Aug 2019 12:31:26 GMT

### Patches

- Nav: update to latest redlines (phkuo@microsoft.com)
- Tooltip: Fix examples to pass correct root display styling. (email not defined)

## 7.25.0
Thu, 15 Aug 2019 12:30:43 GMT

### Minor changes

- Adding prop on BaseButton to allow user to specify custom props on SplitButton's primary action button. (pagaur@microsoft.com)
- Rename deprecated React lifecycle functions to prevent development mode warnings in React 16.9. (jagore@microsoft.com)
- Add fast Icon variants and useFastIcons option in DetailsList (elcraig@microsoft.com)

### Patches

- FocusZone: Remove role=presentation (elcraig@microsoft.com)
- Moving the drag-drop caret icon on top of column divider to make if compatible with Sticky header (svaibhav@microsoft.com)
- Slider: update active pressed state color for slider border and thumb to match design toolkit spec. Updated palette references to sematic colors. (marygans@microsoft.com)
- TextField: fix onChange issue and async tests (elcraig@microsoft.com)
- Dropdown: allow setting empty string as item title (elcraig@microsoft.com)
- ActivityItem, Nav, and Pivot example updates (elcraig@microsoft.com)
- MessageBarButton: Remove the fixed width added in #8779. (jagore@microsoft.com)

## 7.24.0
Wed, 14 Aug 2019 12:30:13 GMT

### Minor changes

- ChoiceGroup: fix focusing on options and general cleanup (elcraig@microsoft.com)

### Patches

- Searchbox: Updates styles to latest design specs and added semantic slots usage. (v-mare@microsoft.com)

## 7.23.0
Tue, 13 Aug 2019 12:31:12 GMT

### Minor changes

- Checkbox: added indeterminate state (v-mare@microsoft.com)

### Patches

- Updating snpashots and styles which use $ syntax. (dzearing@microsoft.com)
- Changing breadcrumb items to links (camontei@microsoft.com)
- Pivot: pivot content (icon, text, count) should be consistently aligned via styling. (dzearing@microsoft.com)

## 7.22.2
Mon, 12 Aug 2019 12:30:25 GMT

### Patches

- Allow callout to reposition after position prop is passed in (joschect@microsoft.com)

## 7.22.1
Fri, 09 Aug 2019 12:31:50 GMT

### Patches

- Spinbutton: removed additional top and bottom margin styling overriding Label's styling and causes alignment inconsistencies with textbox, combobox, etc. (marygans@microsoft.com)

## 7.22.0
Thu, 08 Aug 2019 12:32:41 GMT

### Minor changes

- DetailsList: Assign button role to group toggle element if aria-label provided. (t-mashia@microsoft.com)
- Update SASS variables using script (phkuo@microsoft.com)

### Patches

- Moved role, aria-label, and aria-expanded to the same element as per aria requirements (susunda@microsoft.com)
- DetailsRow should only re-render if a prop is detected to have changed. (megreid115@gmail.com)

## 7.21.0
Wed, 07 Aug 2019 12:32:28 GMT

### Minor changes

- Updating styles to not use $ syntax. (dzearing@microsoft.com)
- Initial implementation of clickable legends (atgupta@microsoft.com)

### Patches

- Add customization section to Themes page (naethell@microsoft.com)
- Checkbox: Fix for an accessibility bug where checkbox labels were read at two different locations in Narrator's scan mode (kisiebel@microsoft.com)
- moving the async clearTimeout call inside the if check to prevent accidentally clearing the timeout unless we're going to be making a new one (jolore@microsoft.com)

## 7.20.1
Tue, 06 Aug 2019 12:32:07 GMT

### Patches

- Replace the usage of `FontSizes` variable with font styles pulled from the theme object and minor cleanup. (vibraga@microsoft.com)

## 7.20.0
Mon, 05 Aug 2019 12:33:41 GMT

### Minor changes

- Slider: Add new prop to snap while moving. (t-snroy@microsoft.com)

## 7.19.1
Fri, 02 Aug 2019 12:33:29 GMT

### Patches

- Persona: Fix styles issue caused by unnecessary nesting (cliff.koh@microsoft.com)
- Remove extra export of SelectionMode (jdh@microsoft.com)

## 7.19.0
Wed, 31 Jul 2019 12:26:17 GMT

### Minor changes

- Commandbar: Expose dataDidRender method (joschect@microsoft.com)

### Patches

- [BaseExtendedPicker] Only add aria-owns tag when the picker is expanded (andrescb@microsoft.com)
- Tooltip: Fixing hidden hover area overlapping with Tooltip targets. (Humberto.Morimoto@microsoft.com)
- Perf Test: Integrate Flamegrill (jagore@microsoft.com)

## 7.18.1
Tue, 30 Jul 2019 12:28:32 GMT

### Patches

- TeachingBubble: Fix primary button high contrast styling issues. (Humberto.Morimoto@microsoft.com)
- Dropdown: Panel now dismisses in small widths (bhdev@outlook.com)
- Separate the anchor for the card from card's hover target ('xingwa@microsoft.com')

## 7.18.0
Mon, 29 Jul 2019 12:26:00 GMT

### Minor changes

- Shimmer: refactor out the BaseComponent and deprecated React lifecycle methods. (vibraga@microsoft.com)

### Patches

- Fix cell animations so they only trigger on cell key changes (tmichon@microsoft.com)
- Panel: fix shrinking of the footer and make header not shrink. (vibraga@microsoft.com)
- Pivot: align pivot link text in relation to the whole pivot tab. (vibraga@microsoft.com)

## 7.17.0
Fri, 26 Jul 2019 12:28:52 GMT

### Minor changes

- ShimmeredDetailsList: enables additional logic to be executed before rendering the default shimmer row. (vibraga@microsoft.com)
- removing BaseComponent from SpinButton (aneeshak@microsoft.com)

### Patches

- Added aria label to demo page for custom picker (susunda@microsoft.com)

## 7.16.0
Thu, 25 Jul 2019 12:27:19 GMT

### Minor changes

- ChoiceGroup: updating IChoiceOption to accept input attributes (dzearing@microsoft.com)

## 7.15.0
Wed, 24 Jul 2019 12:27:56 GMT

### Minor changes

- split calendarMonth into three rows (Qianqian.Li@microsoft.com)

### Patches

- Facepile: Fix narrator not announcing coauthor position (tabrumle@microsoft.com)

## 7.14.1
Tue, 23 Jul 2019 16:33:51 GMT

### Patches

- Tooltip: Updates box-shadow to match fluent web toolkit (v-mare@microsoft.com)
- Rating: fix aria-label in `readOnly` mode and when use half stars. (vibraga@microsoft.com)
- Spinner: Updating label font size and position in respect to spinner to match fluent toolkit (v-mare@microsoft.com)
- ColorPicker: Updates margin bottom of the color rectangle to match web fluent toolkit. (v-mare@microsoft.com)
- Multiselect ComboBox options should respect disabled setting (elcraig@microsoft.com)
- making mousemove event bind to capture phase to work inside Layers and Callouts (jolore@microsoft.com)

## 7.14.0
Mon, 22 Jul 2019 21:37:45 GMT

### Minor changes

- support to add custom attributes on SpinButton and ComboBox components (pagaur@microsoft.com)
- Details____ general cleanup (elcraig@microsoft.com)

## 7.13.0
Mon, 22 Jul 2019 12:28:42 GMT

### Minor changes

- Refactor out BaseComponent from List components (706967+KevinTCoughlin@users.noreply.github.com)
- Nav: Add ability for screen reader to read selected state. (Humberto.Morimoto@microsoft.com)
- DetailsList: Remove unnecessary BaseComponent and class component usage (elcraig@microsoft.com)

### Patches

- Panel: remove window.innerHeight from styles (kakje@microsoft.com)
- fix the layer example so the panel dismisses properly (joschect@microsoft.com)
- DetailsList and Check styling optimizations (elcraig@microsoft.com)

## 7.12.0
Fri, 19 Jul 2019 12:25:58 GMT

### Minor changes

- Tooltip: render tooltip only after the delay and make sure if provided `closeDelay` is bigger than `delay` not to flash the Tooltip. (vibraga@microsoft.com)

## 7.11.1
Thu, 18 Jul 2019 12:27:48 GMT

### Patches

- Panel: Making padding not change with screen width to match toolkit. (Humberto.Morimoto@microsoft.com)

## 7.11.0
Wed, 17 Jul 2019 18:58:57 GMT

### Minor changes

- Add new ways for callers to control the behavior of the combo box. (reedpa@microsoft.com)
- ChoiceGroupOption: move the inline styles into getStyles function to allow override. (vibraga@microsoft.com)

### Patches

- prevent header and footer in panel from shrinking (nidurak@microsoft.com)
- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)
- Rating: ensure rating gets updated even when it has value of 0. (vibraga@microsoft.com)
- GroupedList: Using level to determine nestingDepth when it is given. (Humberto.Morimoto@microsoft.com)
- DropDown: Adding null check in onPositioned call. (Humberto.Morimoto@microsoft.com)

## 7.10.0
Sat, 13 Jul 2019 22:20:41 GMT

### Minor changes

- Dialog: Deprecating componentRef prop. (Humberto.Morimoto@microsoft.com)
- Tooltip: Rendering hidden hoverable area to allow for interaction with Tooltips. (Humberto.Morimoto@microsoft.com)

### Patches

- Panel: remove window.innerHeight from styles (kakje@microsoft.com)

## 7.9.0
Fri, 12 Jul 2019 12:29:52 GMT

### Minor changes

- GroupedList: Refactor out BaseComponent in favor of React.Component and React.FunctionComponent (706967+KevinTCoughlin@users.noreply.github.com)
- Dropdown: adds an `onRenderLabel` custom renderer prop. (vibraga@microsoft.com)

### Patches

- Update to progressBar indicator description label font size to match design toolkti spec. (marygans@microsoft.com)

## 7.8.2
Thu, 11 Jul 2019 12:29:51 GMT

### Patches

- Pivot: updating white hover background color(#9595) (marygans@microsoft.com)
- Pass disabled state to labels in ChoiceGroup, Dropdown, Slider and SpinButton. (vibraga@microsoft.com)
- Tooltip: Fixing 'persist on scroll' issues. (humbertomakotomorimoto@gmail.com)
- DetailsRow: pass aria-label attribute to each row's checkbox. (vibraga@microsoft.com)
- Only clear selection in MarqueeSelection when starting a new marquee (tmichon@microsoft.com)
- Utilities: reuse an exisiting clamp function. (vibraga@microsoft.com)

## 7.8.1
Wed, 10 Jul 2019 12:28:00 GMT

### Patches

- Dropdown: set aria-hidden to true on the ChevronDown icon so that it is not picked up by the screen reader (natalie.ethell@microsoft.com)
- Button: Fixing CompoundButton and SplitButton high contrast mode styling. (humbertomakotomorimoto@gmail.com)
- FocusTrapZone: Updating overview description to indicate restriction of website interaction. (Humberto.Morimoto@microsoft.com)
- Nav: fixes focus border in High Contrast mode. (vibraga@microsoft.com)
- Pickers: replace empty string with undefined. (vibraga@microsoft.com)

## 7.8.0
Tue, 09 Jul 2019 17:34:38 GMT

### Minor changes

- Panel: Adding Overlay props. (Humberto.Morimoto@microsoft.com)
- Modal: Adding overlayProps as a prop. (Humberto.Morimoto@microsoft.com)
- Adding tooltipHostProps as a prop to the Breadcrumb component. (Heather.HoaglundBiron@microsoft.com)
- "FocusZone: Add setFocusAlignment public method to Force horizontal alignment in the context of vertical arrowing to use specific point as the reference, rather than a center based on the last horizontal motion." (nasabek@microsoft.com)
- User should use onRenderPersonaCoin for custom rendering. When this is set, this custom rendering will be used. (22574161+gingeroun@users.noreply.github.com)

## 7.7.2
Mon, 08 Jul 2019 12:27:04 GMT

### Patches

- Fix mock Date class (rezha@microsoft.com)

## 7.7.1
Thu, 04 Jul 2019 12:29:39 GMT

### Patches

- SearchBox: allow passing in id for input (elcraig@microsoft.com)
- Breadcrumb: Adding overflowAriaLabel to examples. (Humberto.Morimoto@microsoft.com)
- Button: Updating example to make it less confusing to screen readers. (Humberto.Morimoto@microsoft.com)

## 7.7.0
Wed, 03 Jul 2019 12:30:55 GMT

### Minor changes

- SplitButton: add in props to control splitbutton menu button (joschect@microsoft.com)
- Callout: add support for RefObject as target (joschect@microsoft.com)

### Patches

- Revert "BaseFloatingItem: fix tests + remove redundant state  (#9500)" (miclo@microsoft.com)
- Announced: fix QuickActions example to reset Announced message (naethell@microsoft.com)
- update snapshots and update extended picker tests (joschect@microsoft.com)

## 7.6.3
Mon, 01 Jul 2019 18:51:43 GMT

### Patches

- Prettier change
- adds react-app-polyfill
- Fix tests for BasePicker + remove redundant state

## 7.6.2
Fri, 28 Jun 2019 12:27:34 GMT

### Patches

- Replaced SCSS in favour of CSS in JS in List Basic Example
- Added interfaces for List Ghosting Example
- GroupedList: Fix "Show All" not rendering all items in a group
- Removed scss usage from List example.
- GroupedList: Updated header text color on hover and updated snapshots.
- Layer: remove the usage of viewport width and height to fix layout issues on mobile browsers
- Removed used Rating SCSS file

## 7.6.1
Thu, 27 Jun 2019 18:25:04 GMT

### Patches

- Prettier changes.
- Avoid marking DetailsRow as non-draggable unless backed by DragDropEvents
- Addressing a variety of problems related to style recalculations.
- Panel: Overflowing header text should word break and wrap by default
- Add placeholder as TextArea property, allows placeholder in multiline TextField

## 7.6.0
Wed, 26 Jun 2019 21:48:30 GMT

### Minor changes

- BasePicker would only reveal suggestions on type or click, shifting focus. Now shows for click, not shifting focus as well.

## 7.5.3
Wed, 26 Jun 2019 12:23:41 GMT

### Patches

- Panel: move windowHeight from classNames into inline styles to prevent unnecessary className recalculations, respect isFooterAtBottom prop
- TextField: Add condition for Edge browser to detect placeholder styles

## 7.5.2
Tue, 25 Jun 2019 12:26:09 GMT

### Patches

- Updates to tileslist, list and marquee selection

## 7.5.1
Mon, 24 Jun 2019 23:11:20 GMT

### Patches

- FocusZone: fixed keyboard navigation when checkForNoWrap prop enabled.
- Dropdown:Bring back breakpoint for small screen sizes
- Coachmark: fixes beacon color props not being passed to styles.

## 7.5.0
Fri, 21 Jun 2019 12:27:05 GMT

### Minor changes

- Adds dual presence to PersonaPresence
- Slider: onChanged is fired after a delay following keydown events.

### Patches

- Tooltip: add onKeyDown handler to dismiss on escape
- Combobox: Fix styles so that RootChecked works
- Don't expand ComboBox flyout on touch when disabled.
- TooltipHost: fix the closeDelay Tooltip bug where a user could not interact with the Tooltip because it would close.

## 7.4.3
Thu, 20 Jun 2019 12:27:38 GMT

### Patches

- DetailsList: add aria-hidden to checkbox labels

## 7.4.2
Wed, 19 Jun 2019 12:27:03 GMT

### Patches

- Make more examples exportable to codepen

## 7.4.1
Tue, 18 Jun 2019 19:00:04 GMT

### Patches

- Facepile: Introducing OnRenderPersona and OnRenderPersonaCoin to override default implementation of Persona and PersonaCoin.
- Tooltip: reverts commit 210fbabee

## 7.4.0
Tue, 18 Jun 2019 12:26:19 GMT

### Minor changes

- DetailsList accessibility now reports 0 rows while placeholder data is being displayed. Also added a prop to ShimmeredDetailsList to specify aria label (such as a "loading data" message) while shimmer is being displayed.

### Patches

- Prevent the callout from being dismissed when the mouse is pressed inside, but then moved outside (while keeping pressed) and released.
- Only run KeytipManager update when relevant keytip props have changed in KeytipData.

## 7.3.0
Mon, 17 Jun 2019 12:26:51 GMT

### Minor changes

- exposing datemath function to calculate beginning of week
- ShimmeredDetailsList: fixes issue where fading overlay was not removed when real item passed.

### Patches

- Removing getClassNames method from SwatchColorPicker.base.tsx which improves perf. by about 10% because of memoization
- Stack: Improving examples so that they have better performance and removing anti-patterns from them.
- Tooltip: Improving performance by wrapping Callout inside with a DelayedRender so that nothing renders until after the delay's done and only if the mouse's still over the tooltip area."
- Updates some documentation links.

## 7.2.0
Fri, 14 Jun 2019 15:54:00 GMT

### Minor changes

- Major bumping the foundation package.

## 7.1.1
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Set context menu width when using a split button to calculation of total width minus the width of the split menu button
- Coachmark: Bottom position coachmarks shouldn't be hidden/cut off by other elements on the page.
- Updated DetailsList example code to provide getKey prop, needed to make seelction work correctly when sorting and filtering are enabled.
- Fix missing assets in production build.

## 7.1.0
Thu, 13 Jun 2019 12:20:34 GMT

### Minor changes

- HoverCard: Handle target being null in the case of unset ref

### Patches

- withViewport: Render composed component regardless of viewport height and width

## 7.0.2
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 7.0.0
Wed, 12 Jun 2019 00:42:26 GMT

### Breaking changes

- Move Calendar and DatePicker to legacy package
- ColorPicker: remove deprecated props, better error handling, fix TextField usage
- ComboBox: *Breaking Change* deprecated props `value` and `onChanged` removed
- Dropdown className should be applied to the root
- Remove deprecated doc page props
- SearchBox: pass event to onChange
- Rating: *Breaking change* is `rating` prop is passed, control will reflect value always.
- Remove use of deprecated @autobind decorator
- DetailsList, DetailsRow, DetailsRowFields: remove deprecated props, logic and styles related to `Shimmer`.
- Move Router to example-app-base
- ShimmerDetailsList: remove deprecated props and style props.
- TextField: remove deprecated props, fix controlled/uncontrolled behavior

### Minor changes

- Stack: Adding relevant Stack and StackItem tokens.
- Do not export Foundation package.
- Support slots API changes.
- Changes to support slots API refactoring.
- Persona: remap existing persona initial colors to new fluent values and add some new ones.

### Patches

- Fixing the order of switching sides in RTL context, so the order has to start with the right then left. Issue sample #9029
- Button: Conditionally rendering KeytipData.
- ColorPicker: remove decimals from alpha value
- Update CommandBar/CommandBarButton styles
- Update Layer examples to use modern context API
- Improved CSS in Stack sample code for performance.
- Update and dedupe React deps.
- Support changes to createComponent API.
- Remove unused and not exported ListPage prototype component
- SelectionZone: Document exported interfaces, remove any type usage, consolidate ev.target access
- Rating: Added getNativeProps to component for event usage
- Update instances of `getFocusStyle` to use named parameters.
- Nav, Calendar, and DatePicker move into office-ui-fabric-react
- Stack: Adding documentation to tokens.
- Suggestions: add itemProps type of onRenderSuggestedItem

## 6.189.4
Tue, 11 Jun 2019 12:21:35 GMT

### Patches

- Updating snapshots to conform with `getNativeAttributes` changes which should filter out unexpected attributes from primatives more accurately.
- Improve performance of documentcardtitle
- upgrade to api-extractor 7.1.6

## 6.189.3
Mon, 10 Jun 2019 12:24:00 GMT

### Patches

- Icon: Set aria-hidden if imageProps.alt or imageProps.aria-labelledby is undefined
- DatePicker: Check out of bounds on initial render
- Fixes issue when the menu icon in the second button of the `SplitButton` gets disabled styles when only the primary action is disabled.

## 6.189.2
Fri, 07 Jun 2019 12:21:48 GMT

### Patches

- Panel: use windowHeight for all devices rather than only for iOS
- Improved Calendar A11Y

## 6.189.1
Thu, 06 Jun 2019 12:22:24 GMT

### Patches

- Update documentation to add target _blank to external links
- Fixing some bugs for the persisted ContextualMenu

## 6.189.0
Wed, 05 Jun 2019 12:22:30 GMT

### Minor changes

- adding missing filetype mappings to support LPC and other partners
- Fix TS 3.5 typing issues.
- Consume Selection from Utilities

### Patches

- BaseButton: Render placeholder icon if iconName is empty string
- ContextualMenu: When menus are rendered with the `persistMenu` flag, the scrollbar now renders correctly in Edge.
- add tooltips to Calendar buttons without text
- TextField: Adds aria-labelledby to input

## 6.188.2
Tue, 04 Jun 2019 12:22:18 GMT

### Patches

- Coachmark: fix default colors assignment to pull from the theme object.

## 6.188.1
Mon, 03 Jun 2019 23:04:02 GMT

### Patches

- Dropdown: fix issue where onchange wasnt called
- Remove circular imports in ContextualMenu.tsx
- Searchbox: Stop preventing default if we don't handle the keypress"

## 6.188.0
Mon, 03 Jun 2019 12:23:18 GMT

### Minor changes

- Updating DatePicker and Calendar accessibility
- Fixed SplitButton styling for menu icon and dividers in disabled state

## 6.187.2
Fri, 31 May 2019 12:21:27 GMT

### Patches

- TeachingBubble: Updated entrance animation for teaching bubble in TeachingBubble.styles.ts. Removed jelly animation and replaced with new motion spec entrance animation.

## 6.187.1
Thu, 30 May 2019 12:22:06 GMT

### Patches

- Autofill: makes sure the fresh input is retrieved at the time of composition end
- Refactor common logic out of _dismissOnLostFocus to a generalized function in order to decouple handling of _dismissOnScroll from _dismissOnLostFocus
- Remove extra role attribute from callout root element, support aria-roledescription on callout main where role already resides
- DetailList: only select the first item on keydown from header if there isn't already something selected
- Dropdown: fix issue where dropdown did not respect selectedKey(s) prop

## 6.187.0
Wed, 29 May 2019 12:21:24 GMT

### Minor changes

- Persona: rename and export function to get color
- Adds an example to TextField with customized masks

### Patches

- Fix aria-label in Dropdown options list
- Revert styled perf fixes temporarily.
- Nav: Prepend link name to aria label for expand button and set it as default if no label is provided
- TextField: remove unecessary font override for ::placeholder

## 6.186.1
Fri, 24 May 2019 14:51:14 GMT

### Patches

- remove usage of bare process

## 6.186.0
Thu, 23 May 2019 22:14:40 GMT

### Minor changes

- TeachingBubble: Add footerContent prop to render custom footer text

### Patches

- Dropdown: Replace some palette slot usage with semantic slots.
- Examples: Remove relative imports.

## 6.185.0
Wed, 22 May 2019 12:21:34 GMT

### Minor changes

- Addressing a variety of problems related to style recalculations.

### Patches

- SelectableDroppableText: fixes `defaultvalue` tag usage that was causing some errors in using the api.json with @microsoft/api-documenter package.
- Preserve Selection modal state during single-select
- Ensure non-selectable items may still be invoked

## 6.184.0
Tue, 21 May 2019 12:20:44 GMT

### Minor changes

- <Fabric> element does not affect global button styling.
- Dropdown: Add required visual hint when label is not provided.
- Updated Toggle component to accept JSX Elements. Added screener and snapshot tests for new changes

### Patches

- Fixed: ComboBox onResolveOptions should have array not object as argument
- DatePicker: keep validation errors after noop

## 6.183.0
Mon, 20 May 2019 12:22:33 GMT

### Minor changes

- Add selectedOptions to ComboBox and Dropdown
- Add a new prop to enable Slider origin from zero

### Patches

- Fix ColorPicker Hex input
- MessageBar: Add `aria-hidden` property for message bar icon

## 6.182.1
Thu, 16 May 2019 05:28:50 GMT

### Patches

- [Checkbox] Fix outline on focus.

## 6.182.0
Wed, 15 May 2019 12:31:44 GMT

### Minor changes

- Nav respects changes to collapsedByDefault
- Allow custom aria label generation in suggestionStore
- ShimmeredDetailsList: export to the surface missing API items.

### Patches

- added the title attribute for the cancel icon in the panel which is same as aira-label
- Add TextField multiple-line errorMessage support
- This latest PR is to ensure Nav link without icon should not be rendered with <i> place-holder

## 6.181.1
Tue, 14 May 2019 07:50:31 GMT

### Patches

- The FocusZone photos example now correctly renders focus rectangles.
- Update Fabric assets link

## 6.181.0
Tue, 14 May 2019 01:56:43 GMT

### Minor changes

- Dropdown/Combobox: Add prop to allow open on focus
- DetailsList: Export missing public API symbols

### Patches

- added element id to the ChoiceGroup component
- In Edge, prevent pickers from showing "ms-clear" icon when typing.
- Removed a few more `typeof window` references to avoid memory leaks with IE11.
- Picker/DocPage: fix IBasePickerProps doc comment and add type alias to DocPage.
- withViewport: Respect value change of skipViewportMeasures by reassigning appropriate resize listener

## 6.180.0
Fri, 10 May 2019 12:36:11 GMT

### Minor changes

- Export ResponsiveMode from controls that expect it as a prop.

### Patches

- Fix focus state on ComboBox
- Fix ARIA issue in Surfaces

## 6.179.0
Thu, 09 May 2019 12:35:50 GMT

### Minor changes

- Added support for hidden options in dropdown and combo box

### Patches

- Include md files in nested docs folders

## 6.178.0
Wed, 08 May 2019 12:37:40 GMT

### Minor changes

- Fix return type of onReduceDate in CommandBar

## 6.177.0
Tue, 07 May 2019 12:34:52 GMT

### Minor changes

- Color card + samples cards of Theming Designer, set up the layout of the whole app, got started implementing the creation of the theme"
- Theme Designer app: Colors left nav, Samples card, A11y Checker card, Fabric Palette card, Export Panel
- New feature: Semantic Slots card as well as clean up of layout & css.

### Patches

- Router should error if getComponent doesn't return anything
- Truncate suggestions in IE11
- Icon documentation update

## 6.176.3
Sun, 05 May 2019 19:59:10 GMT

### Patches

- Router: ignore trailing slashes, don't update if hash didn't change

## 6.176.2
Sat, 04 May 2019 00:01:54 GMT

### Patches

- Properly propagate Esc in DatePicker
- Add min panel width for small screen sizes
- Documentation: adds more `docCategory` tags to API items.
- Doc updates for new website

## 6.176.0
Thu, 02 May 2019 12:36:35 GMT

### Minor changes

- Add IBreadcrumbData, deprecate IBreadCrumbData
- Modal/Dialog: Add ability to move via mouse and/or keyboard
- Tooltip/TooltipHost: content now can take JSX content.

### Patches

- Remove out-of-date IE focus handling work-around. Pass forceFocusInsideTrap={false} to DatePicker FocusTrapZone. Adjust FocusTrapZone return focus handling.

## 6.175.0
Wed, 01 May 2019 12:34:25 GMT

### Minor changes

- BasePicker: re-add removed property to fix api break
- Fix type in BasePicker onRemoveSuggestion api
- DetailsHeader: mark cellIsActionable, cellIsEmpty, and cellWrapperPadded as deprecated
- Introduces ImageFit.centerContain
- Color card + samples cards of Theming Designer, set up the layout of the whole app, got started implementing the creation of the theme"
- Theme Designer app: Colors left nav, Samples card, A11y Checker card, Fabric Palette card, Export Panel

## 6.174.0
Tue, 30 Apr 2019 12:31:36 GMT

### Minor changes

- DocPage: add types
- Always reset pending info on option click.

### Patches

- FocusZone: remove outline on focus
- Bugfix to set the correct width of the Pivot item's :after element, so Pivot items don't move on (un)selection
- Use new getFocusStyle signature
- DetailsColumn: Cleanup className vars, use lambdas for this binding, add type-safety to root ref

## 6.173.0
Mon, 29 Apr 2019 12:34:34 GMT

### Minor changes

- DetailsList: export DetailsHeader

### Patches

- Fixed typo in position utility

## 6.172.0
Sat, 27 Apr 2019 00:04:47 GMT

### Minor changes

- Updating Icon, Checkbox, and Image to be pure components (correctly.)

## 6.171.0
Fri, 26 Apr 2019 12:35:24 GMT

### Minor changes

- Breadcrumb: Add in focuszone props to give more control
- Teachingbubble: Improve target that's passed to callout
- Add new prop 'detailsListStyles' to allow passing 'styles' prop to DetailsList. Deprecate all shimmer related props in DetailsList and DetailsListRow. Adds documentation

### Patches

- Deprecate implementation examples
- Fix the picker suggestion items flashing issue.
- Setting initial scrollbar height and width equal to 0 to prevent rendering when it's width/height changes from undefined to 0. Cascading updates caused due to notifySubscribers for sticky componentDidMount lifecycle hook. Reducing computations for sticky component by combining updates for change in sticky state (top/bottom/non-sticky) & distanceFromTop. Setting placeHolder width equal to scrollWidth of nonStickyContent.firstElementChild

## 6.170.0
Thu, 25 Apr 2019 12:33:20 GMT

### Minor changes

- Concentrate onhover style ui changes to label element for Checkbox

### Patches

- Remove componentRef property for Image component at Image.types.ts.
- DetailsRowFields: Refactor styles to remove unnecessary re-render
- fixing header keyboarding in CalendarMonth in OUFR

## 6.169.0
Wed, 24 Apr 2019 12:35:55 GMT

### Minor changes

- Delete outdated component status info
- FocusTrapZone: Add disabled prop.
- VerticalDivider: Make into a styled component

## 6.168.0
Tue, 23 Apr 2019 12:32:00 GMT

### Minor changes

- Adding a way to make to make the state of the SwatchColorPicker be fully controllable
- Introduce vertical option for ResizeGroup

### Patches

- FocusZone should not set elements inside a portal (outside its DOM) as an active element
- Lists: Remove unnecessary usages of css concat helper

## 6.167.3
Mon, 22 Apr 2019 12:32:06 GMT

### Patches

- CommandBar: Add split/disabled buttons example to documentation page
- ScrollablePane: Remove Z Index since it's no longer necesssary
- Selection: initialize count
- TextField documentation updates

## 6.167.2
Fri, 19 Apr 2019 12:33:03 GMT

### Patches

- Button: Fix issue where button would eat keydown events
- Remove usage of assign helper in favor of Object.spread across Lists
- Dropdown: Add unit test;
- Split button displays an expanded state always with persistMenu:true - fixing that
- Pickers: Fix issue where they would have invalid described by

## 6.167.1
Wed, 17 Apr 2019 12:33:35 GMT

### Patches

- Modal: Ensure that the "ms-Dialog" class name is only applied once.
- Run prettier on all files

## 6.167.0
Tue, 16 Apr 2019 12:32:59 GMT

### Minor changes

- DatePicker: Fix props not matching their description. Add new prop to provide old functionality
- DetailsList: Expose optional onRenderCheckbox callback option

### Patches

- Update Announced examples
- Panel: Fix double dismiss

## 6.166.1
Mon, 15 Apr 2019 12:33:42 GMT

### Patches

- DetailsList: Fix high contrast focus color
- MessageBar: fixes the transparency of the background issue when rendered on top of themed backgrounds.
- Adding data parameter to the ComboBoxOptionWrapper. This will allow ShallowCompare to compare against this extra parameter

## 6.166.0
Fri, 12 Apr 2019 12:34:16 GMT

### Minor changes

- These changes allow for a controlled Pivot to have no selected PivotItem by specifying null as the selectedKey prop.

### Patches

- ThemeGeneratorPage: fix it so it looks right
- Updating CalloutContentBase's shouldComponentUpdate to do shallow comparision

## 6.165.1
Thu, 11 Apr 2019 12:37:10 GMT

### Patches

- Documentation: add @docCategory inline tags
- css-in-js conversions for DocumentCard, ExtendedPeoplePicker, FloatingPeoplePicker, SelectedPeopleList

## 6.165.0
Wed, 10 Apr 2019 12:33:17 GMT

### Minor changes

- Panel: add onOpen and onOpened properties

### Patches

- ComboBox: call onPendingValuedChanged with an empty value string when the user clears the input

## 6.164.8
Tue, 09 Apr 2019 12:35:21 GMT

### Patches

- Panel: set forceFocusInsideTrap to false for non-blocking Panels
- Spinner: only render an aria-live polite message when ariaLabel is provided.

## 6.164.7
Mon, 08 Apr 2019 12:37:15 GMT

### Patches

- A number of components have been updated to reduce the dependencies, lowering bundle size impact for a variety of scenarios.
- TextField: clarify onBeforeChange documentation

## 6.164.6
Fri, 05 Apr 2019 22:09:49 GMT

### Patches

- Persona: now sets dir=auto for text fields rendered in persona.
- Fix layer and modal codepen links
- Fixing submenu dismissal when parent menu has a hidden prop
- Panel: add border to main div in high contrast

## 6.164.5
Fri, 05 Apr 2019 12:36:12 GMT

### Patches

- SelectionZone: Disallow selection when selection mode is SelectionMode.none
- Dialog, Layer, and Modal partial css-in-js conversions
- Modal: constrain scrollableContent height to 100vh and window.innerHeight for mobile Safari to support DetailsList virtualization
- Convert OverflowSet examples and one Panel example to css-in-js
- Fix for  scrolling functionality in Suggestions component.
- Toggle: make on/off text clickable
- Tooltip: fixing the color and font size of subText not to be overriden by external UHF css.

## 6.164.4
Thu, 04 Apr 2019 12:34:57 GMT

### Patches

- List and other example updates
- Nav and MessageBar example updates
- Colors: reduce size of utility file by changing implementation
- SelectionZone: Defer dom inspection until interaction

## 6.164.3
Wed, 03 Apr 2019 12:38:51 GMT

### Patches

- Button: Adding missing parenthesis in ev.stopPropagation function call.
- CommandBar: Meeting color contrast accessibility standards in examples.
- Button: Allowing menu navigation with keyboard when shouldFocusOnMount is set to false.
- PeoplePicker: Fix persona overflowing container
- Small bug fixes for keytips
- BaseFloatingPicker: do not update unmounted component on promise resolution

## 6.164.2
Tue, 02 Apr 2019 12:36:20 GMT

### Patches

- FocusZone: fixing logic to track outer FZ components correctly.
- Image: fixes a visual bug where during fade in animation the image was shifted slightly.

## 6.164.1
Tue, 02 Apr 2019 00:38:15 GMT

### Patches

- Dropdown: The `onChange` callback's event target should always be the dropdown element, which contains the id attribute passed in through props.
- Fixed a problem with Pivot showing the wrong PivotItems when using JSX expressions. Extended the test case
- FocusZone and FocusTrapZone example improvements
- GroupedList: Respect groupProps isAllGroupsCollapsed on initial render
- List and other example updates
- Use ^ ranges instead of >=

## 6.164.0
Mon, 01 Apr 2019 12:37:03 GMT

### Minor changes

- Stack: Adding margin as a token of StackItem and childrenGap as a token of Stack and updating examples accordingly.
- Separator: promote to OUFR

### Patches

- ContextualMenu: Remove extra role=menu
- MaskedTextField: fixes the state update when the value it's controlled by the host app.
- More TextField example updates

## 6.163.0
Fri, 29 Mar 2019 12:36:45 GMT

### Minor changes

- Dropdown: add correctly cased onRenderPlaceholder prop and deprecate onRenderPlaceHolder, plus example updates
- Added order property to StackItem
- HoverCard: adds a public `dismiss` method to allow instant dismiss of the card.

### Patches

- Persisted callout fixes
- DocPage: add separate prop for overriding native props component name
- Pickers: condionally render the list of the selected items only if there are any items to display. Fixes the aria role="list" bug where a list must contain one or more list items.
- Spinner and Slider example updates
- TextField example updates

## 6.162.1
Thu, 28 Mar 2019 12:36:39 GMT

### Patches

- ComboBox: Add aria-required field to assist screen readers to read out required field

## 6.162.0
Wed, 27 Mar 2019 12:34:02 GMT

### Minor changes

- List: Parameterize generic T for item type with default type any

### Patches

- Calendar: Making calendar days aria-readonly: true so that Narrator doesn't read them as editable.
- DocumentCard: Removing blank 1px line below preview images in compact layout.
- Remove custom high contrast selectors and example utility CSS classes
- Split up color utility functions into separate files for perf
- GroupHeader: tighten componentWillReceiveProps parameter typing
- update API file
- update api file generated by api-extractor 7

## 6.161.0
Tue, 26 Mar 2019 12:32:51 GMT

### Minor changes

- Remove IE 11-incompatible constructs

### Patches

- FloatingPicker: Change width to min-width for Suggestions
- ContextualMenu: Improve typings and remove unnecessary casts

## 6.160.0
Mon, 25 Mar 2019 12:33:48 GMT

### Minor changes

- GroupSpacer: Reduce render calls by refactoring styled HOC to React.SFC

### Patches

- FocusZone: focus alignment is now reset when first receiving focus (programatically or via `defaultActiveElement`.

## 6.159.1
Fri, 22 Mar 2019 12:34:41 GMT

### Patches

- ColorPicker: Showing picked color in high contrast mode.
- List: Avoid setting role to list in case of empty list

## 6.159.0
Fri, 22 Mar 2019 02:41:51 GMT

### Minor changes

- Dialog: changing type of `title` prop to allow JSX to be injected.

### Patches

- Calendar: Fixing typo is scss.
- Add shouldComponentUpdate to ContextualMenuItems to ensure items are only updated when needed.
- Pivot did not support PivotItems used in JSX-expressions (e.g. {this.state.something && <PivotItem ...>}. I fixed this functionality and added a simple test case.
- Fix focus zone virtual parent focus restoration
- FocusZone: minor performance tweak to have a single capture keydown handler, rather than one per outer zone instance.
- Fixing componentURL to point to correct url.
- Popup: Revert change to find active element within iframe

## 6.158.0
Thu, 21 Mar 2019 12:36:30 GMT

### Minor changes

- SelectedPeopleList: Key wrapped selectedItem children when they are keyed

### Patches

- Breadcrumb: Update custom divider example to have aria-hidden on divider
- GroupHeader & GroupFooter: Extend React.Component instead of BaseComponent
- Improve TextField example accessibility
- TextField: Fixed flex bug in IE11
- move replaceItem from SelectedPeopleList to BaseSelectedItemsList

## 6.157.3
Wed, 20 Mar 2019 16:14:56 GMT

### Patches

- FocusTrapZone: Make sure to call passed in focus and blur handlers

## 6.157.2
Wed, 20 Mar 2019 03:15:21 GMT

### Patches

- Callout: Fix beak position for dynamically sized callouts.
- ComboBox: if `options` are null, make sure the code doesn't crash.
- Icon: remove BaseComponent dependency.

## 6.157.1
Tue, 19 Mar 2019 18:05:11 GMT

### Patches

- Fix typing on BaseSelectedItemList.removeItem

## 6.157.0
Fri, 15 Mar 2019 12:34:07 GMT

### Minor changes

- DetailsHeader: Add ariaLabelForToggleAllGroupsButton to IDetailsHeaderProps
- Add new icons to OUIFR API
- Export Foundation package.
- SpinButton: label prop should be marked as optional
- Rating: unchecked stars should be unfilled.

### Patches

- Popup: If framed, set focus to frame's activeElement on dismiss
- Use codepen loader in examples
- For multiSelectComboBox, if allowFreeForm is true, currentPendingValue should get added to option and be selected onBlur
- Nav: Fix selection state to only check URL if state.selectedKey is undefined
- Fix combobox behaviour: multiple selections are now correctly shown in dropdown
- TeachingBubble examples: separate onDismiss into onDismiss and onShow
- List: Remove duplicate page rows iteration and add tests for SparseArray scenarios
- Fix color contrast ratio of unchecked Rating stars
- Use typeof check on process before checking process.env.NODE_ENV
- Turn IBasePickerSuggestionsProps into a Pick<> type
- Drop space from DetailsList header aria-labeledby
- HoverCard: fixes the native event listeners assignment when the target prop is updated.

## 6.156.0
Wed, 13 Mar 2019 00:42:29 GMT

### Minor changes

- Text: default to fonts.medium
- Dropdown: Type onRenderTitle as Array<IDropdownOption> only

### Patches

- BaseButton: Correctly clone props instead of mutating them

## 6.155.0
Tue, 12 Mar 2019 12:31:43 GMT

### Minor changes

- Provide a way to pass cell contents directly to DetailsRow
- FocusTrapZone: Refactor trapping behavior to fix multiple outstanding issues.

### Patches

- Fix overflow calculation for non-collapsible columns
- FocusTrapZone: Fix for zones that have zero tabbable elements.
- updating calendaryear to work when react version upgrades
- DetailsHeader: remove duplicate IDetailsHeaderState
- Panel: fixes regression when no custom navigation renderer provided and `hasCloseButton` prop is set to false there should not be an empty div rendered occupying the space.

## 6.154.0
Mon, 11 Mar 2019 12:31:10 GMT

### Minor changes

- Shimmer: adds new props `shimmerColors` to Shimmer and `backgroundColor` to ShimmerElementsGroup to allow easy customization of Shimmer colors when placed on elements with background colors other than white.

## 6.153.0
Fri, 08 Mar 2019 13:32:10 GMT

### Minor changes

- Expose persistMenu in combobox similar to baseButton
- SpinButton: Stateful example should restrict input value to range.

### Patches

- List: Revert remove usage of string refs for List pages #7704

## 6.152.1
Thu, 07 Mar 2019 13:32:47 GMT

### Patches

- Remove console log in Tooltip absolute position example
- Pivot - remove deprecated lifecycle method, and deterministically render selected PivotItem. Will change behavior of Pivot instances that specified `selectedKey` but use in an uncontrolled fashion.
- Suggestions: set className on Suggestion header/footer
- SwatchColorPicker: updates the styles so that they align to the toolkit specs.

## 6.152.0
Wed, 06 Mar 2019 13:27:18 GMT

### Minor changes

- BaseButton does not call onAfterMenuDismiss when persistMenu is true
- Change FocusZone to use the as pattern

### Patches

- Tooltip: Add absolute position example to documentation
- FocusZone: removing dependency on BaseComponent, slicing about 3k gzipped off the payload.

## 6.151.0
Tue, 05 Mar 2019 17:33:41 GMT

### Minor changes

- Update version of 'styled', add type annotations to usages of 'styled'.

## 6.150.1
Tue, 05 Mar 2019 13:30:24 GMT

### Patches

- DetailsRowFields: Inherit from React.Component instead of BaseComponent"

## 6.150.0
Tue, 05 Mar 2019 04:25:07 GMT

### Minor changes

- add Announced component
- Breadcrumb: Add native props support
- Export all theme variables in one file, and emit basic font token mixins

### Patches

- CommandBar: Adding aria-label to Grid View and Information Buttons in examples.
- ChoiceGroup: Fix disabled selected styles

## 6.149.0
Mon, 04 Mar 2019 13:29:58 GMT

### Minor changes

- Improved Accessibility with the Pickers and PeoplePicker Components by adjusting styles for High Contrast Mode.

## 6.148.1
Fri, 01 Mar 2019 19:40:22 GMT

### Patches

- DetailsList & List: Improve typings currently typed as any

## 6.148.0
Fri, 01 Mar 2019 13:33:08 GMT

### Minor changes

- Nav: Add disable state for navigation links

### Patches

- ChoiceGroup: Make dropdown on example disabled until the option with the dropdown is selected so that tab focus goes to the default selected option.
- ChoiceGroup: Visually present 'required' prop in 'ChoiceGroup with a custom label' example and remove 'required' prop from non-selected radio buttons.
- ChoiceGroup: Fixing Narrator focus on ChoiceGroupOptions.
- ChoiceGroup: Adding defaultSelectedKey to 'ChoiceGroup with Icons' example so that aria-selected property is set.
- CommandBar: Fixing aria-label in examples so that it doesn't repeat information.
- GroupedList: Provide default getGroupHeight implementation to avoid infinite scroll handlers
- Updated dependencies.

## 6.147.0
Thu, 28 Feb 2019 17:04:01 GMT

### Minor changes

- Dropdown and ComboBox: `selectedKey` can now take null to clear the selection.

## 6.146.2
Thu, 28 Feb 2019 13:29:07 GMT

### Patches

- TagItemSuggestion: adds `white-space: nowrap` CSS declaration which is required for `text-overflow: ellipsis` to work.
- TextField: adds font styles passed from theme to the root element.

## 6.146.1
Wed, 27 Feb 2019 06:49:08 GMT

### Patches

- Modal: Fix missed naming updated from Modeless PR

## 6.146.0
Wed, 27 Feb 2019 01:28:58 GMT

### Minor changes

- Updating the API file resulted in the updates to the @uifabric/styling package which is exported form OUFR.

### Patches

- Announce column header for Day in Calendar
- Calendar: Change role of CalendarDay button from 'button' to 'gridcell'
- DetailsList: dragDropEvents props updates not respected

## 6.145.0
Tue, 26 Feb 2019 22:45:29 GMT

### Minor changes

- Dialog: Add the ability for dialogs to be sticky (can interact with content behind dialog while dialog is open)

### Patches

- Make the list items of personas used in rendering Facepile have role="option" which is required because the <ul> encompassing these has a role="listbox". Caught in a Keros FastPass.
- ARIA: Update calls to mergeAriaAttributeValues to no longer explicitly supply output element id padding.

## 6.144.0
Tue, 26 Feb 2019 13:31:28 GMT

### Minor changes

- Text: add Text component

### Patches

- DetailsList: Remove redundant casts and local declaration
- Sticky: maintain focus on Sticky header when scrolled
- Force Suggestion items to be shrinkable

## 6.143.1
Mon, 25 Feb 2019 13:31:08 GMT

### Patches

- Persona: Augment documentation for `optionalText` and `tertiaryText` to be more useful.
- Pivot: Removed mention of pivot overflow which is not implemented

## 6.143.0
Fri, 22 Feb 2019 13:31:09 GMT

### Minor changes

- DetailsRow & DetailsRowFields: onRenderItemColumn return type as React.ReactNode
- Pivot: Add new stylable area for Pivot item container div.
- Add aria-describedby prop to Combo Box and Spin Button

### Patches

- Fix usage of 'ms-text-align'

## 6.142.1
Thu, 21 Feb 2019 13:32:08 GMT

### Patches

- GroupedList: Reduce usage of any type in GroupedList and GroupedListSection

## 6.142.0
Wed, 20 Feb 2019 21:57:24 GMT

### Minor changes

- ChoiceGroup: now works again in FocusZone, but this also reverts a bug fix which allowed FocusTrapZones to behave better with ChoiceGroups in them. We will fix this issue separately. Popup: no longer has `tabindex="-1"` specified, which is causing all sorts of regressions wrt FocusTrapZone usage.

### Patches

- ChoiceGroup: fixing issue when nested in FocusZones.

## 6.141.1
Tue, 19 Feb 2019 13:37:02 GMT

### Patches

- Set colors for unknown persona coin to fixed values

## 6.141.0
Mon, 18 Feb 2019 13:38:30 GMT

### Minor changes

- ColorPicker: take color object in props, add standard onChange
- Deprecate IconNames due to const enum usage.
- Stack: Fix 'as' prop circular reference.
- Panel: Enabling the addition of new buttons (or other components) to the Navigation region
- Panel: fixes several screen breakpoint issues and brings more clarity to docs and logic of applying the breakpoints.

### Patches

- Coding conventions
- Added custom width, left anchored panel support

## 6.140.0
Fri, 15 Feb 2019 17:41:16 GMT

### Minor changes

- Stack: Promoting component to oufr package.

## 6.139.1
Fri, 15 Feb 2019 13:33:06 GMT

### Patches

- Include component markdown files in npm package.

## 6.139.0
Thu, 14 Feb 2019 13:34:55 GMT

### Minor changes

- Fix type IBaseFloatingPickerSuggestionProps in ExtendedPeoplePicker, expose showRemoveButtons

### Patches

- TeachingBubble: revert PR #7837
- fluent folder cover; updated metadata font color; added yellowDark color variable
- Fix DetailsList compiler warnings in test by casting document.activeElement to HTMLElement
- Pivot cleanup

## 6.138.1
Wed, 13 Feb 2019 13:36:46 GMT

### Patches

- MessageBar: exclude className from nativeProps
- Fix id usage in examples
- Normalized disabled style for input components (DatePicker, TextField).
- Remove maximum width from Breadcrumb items
- Fixing SpinButton A11y Pass Bug 2 where Up/Down buttons aren't discernable.
- TextField: updates some semantic colors usage.

## 6.138.0
Tue, 12 Feb 2019 13:36:43 GMT

### Minor changes

- ComboBox: adds an autofillProps
- Make ChoiceGroupOptions stylable

### Patches

- Calendar: adding type="button" in Calendar buttons so they don't submit by default inside forms
- FocusZone: fixing issue where onActiveItemChanged was no longer firing.
- Fix ID usage in examples
- Toggle: pass in native hidden prop to root element
- Tooltip: Updates examples to demonstrate how to tag aria attributes correctly
- Pickers: fix bug in ExtendedPicker demo and remove unneeded cast in EditingItem

## 6.137.0
Mon, 11 Feb 2019 13:40:44 GMT

### Minor changes

- PivotItem: updating itemCount type to include strings
- Pickers: Re-type onItemRemove in Suggestions to support the suggestions Generic type

### Patches

- In HoverCard, do not dismiss the card when the  prop is true and the event prompting the dismissal is the 'mouseleave' event from the card itself. Clicking outside, escape, etc will still dismiss the card.
- Removed Href on Links that are disabled. This prevents inadvertent access to disabled links. Also prevents link focus rect bug
- SpinButton: Only update value in state if newProps.value is defined

## 6.136.0
Fri, 08 Feb 2019 13:37:21 GMT

### Minor changes

- Add textField to IDatePickerProps

## 6.135.1
Thu, 07 Feb 2019 13:32:39 GMT

### Patches

- DetailsList: Fixes the column header shifting upwards by 1px after drag and drop action.

## 6.135.0
Wed, 06 Feb 2019 13:38:07 GMT

### Minor changes

- Nav: add semantic colors styling to link

### Patches

- FocusTrapZone: Fixed FocusTrapZone to use the relatedTarget instead of document.activeElement to find what is losing focus
- Fixing wrapping links' focus rect clipping problem with boxshadow styling.

## 6.134.0
Tue, 05 Feb 2019 13:35:00 GMT

### Minor changes

- MessageBar: mix in native props
- Use React.ComponentType in ExtendedPeoplePicker for render props

### Patches

- DetailsList: render a simple column header for checkboxes in single selection mode
- Fixing the implementation of the hidden prop wrt to focus, bounds and unnecessary mounts
- Nav: Fixed an issue where nav link text overflow was not properly left aligned.
- Remove popup outline

## 6.133.0
Mon, 04 Feb 2019 13:36:12 GMT

### Minor changes

- GroupHeader: exposes props of selection check button.

### Patches

- Clarify extended picker dont documentation
- Update ThemesOverview.md documentation
- Remove some unneeded casts + 'any's in ExtendedPeoplePicker

## 6.132.0
Thu, 31 Jan 2019 20:10:48 GMT

### Minor changes

- FocusZone: focus can now be recovered if focus was resting within the zone but the element was removed.

## 6.131.1
Thu, 31 Jan 2019 13:36:13 GMT

### Patches

- scrollTop value may be in decimal. Taking floor of scrollTop to calculate isStickyBottom for a sticky component
- TeachingBubble: do not pass in onDismiss to TeachingBubbleContent
- Support ESC after clicking in Popup

## 6.131.0
Tue, 29 Jan 2019 13:35:55 GMT

### Minor changes

- GroupedList: changes types of the renderers to allow customizing the `subComponents` through the `Customizer`. Export the missing interfaces to the top level index file of the GroupedList.

### Patches

- width is not required for sticky placeholder as it won't affect horizontal scrolling. For a detailsGroupedList, if horizontal scrollbar is present when detailsHeader is in non-sticky state, it should be there even when detailsHeader becomes sticky.
- Panel: add flex-grow: 1 to contentInner

## 6.130.0
Mon, 28 Jan 2019 13:35:27 GMT

### Minor changes

- Coachmark: updates how the theme is passed to `getStyles` function. Adds 2 new props: `theme` and `className`. Minor cleanup.

### Patches

- DetailsList: Set aria-expanded attribute only if necessary
- DocumentCard: Renames 'previewFileTypeIcon' to 'icon' to fix a regression
- Fix callouts appearing partially off screen

## 6.129.4
Fri, 25 Jan 2019 13:38:07 GMT

### Patches

- Specify prop "type" to be "button" for links which are of type button
- Fix ColorPicker when alpha slider is hidden
- Add documentation and tests for color utilities
- Combobox: Pass taxIndex to Autofill component
- Panel: Add aria-hidden attribute to prevent narrator from reading when transitioning to a closed state
- Added screener tests to Breadcrumb component to prevent regression
- position anchor currently by default uses either the given alignment edge or uses the positive flanking edge, without regard to whether the positive or negative edge has more room. This change uses the bounds to determine which side has more room and flips the anchor around, to solve issues with dynamically resizing callouts not having enough room to grow if they default to a top-anchor
- Fix the regression in DocumentCard role by commit 5b8befe. It should always use props.role if it is defined.

## 6.129.3
Thu, 24 Jan 2019 13:36:17 GMT

### Patches

- Add lang tag to the section header by getting the native props
- Prevent the Tooltip's content from scrolling

## 6.129.2
Wed, 23 Jan 2019 22:53:13 GMT

### Patches

- Update DetailsList examples to have codepens
- DatePicker: adds missing className attribute to the `TextField` of the control.
- Dispose DragDropHelper in DetailsHeader to prevent memory leaks
- Coachmark: Fix component to open contents on mouseover
- Update GroupedList and HoverCard examples to have codepens
- Added a simpler DocumentCardImage component for use in the DocumentCard component
- ContextualMenu: Fixes a layout bug with split menu items in IE11
- ContextualMenu: Add menu role for accessibility
- Use CSS object-fit in the Image component in capable browsers

## 6.129.1
Tue, 22 Jan 2019 13:34:38 GMT

### Patches

- DocumentCard: added native properties to the root element

## 6.129.0
Mon, 21 Jan 2019 13:36:01 GMT

### Minor changes

- Theming: add scss files generated from defaults
- Pickers: adjusts disabled styles for TagPicker and PeoplePicker to align them to the toolkit specs. Disable remove button on PeoplePicker selected items when picker disabled.

### Patches

- DetailsHeader: Refactor deprecated componentWillReceiveProps to getDerivedStateFromProps
- List: Remove usage of string refs used for List pages
- Breadcrumb: issue #7701 - fixes the  double focus rectangle caused by both Link and Breadcrumb.
- moving functuion _isHeightOrWidthDifferent to file scope

## 6.128.0
Fri, 18 Jan 2019 13:38:06 GMT

### Minor changes

- Exposes a preventDismissOnResize prop in the Callout component
- Dropdown: refactor styles of Panel to `subComponentStyles` pattern.

### Patches

- ContextualMenu: fixes issue #7686 when items of type `section` are given the same key and later are rendered as list items causing a React warning. Change the example having this issue.
- CommandBar: Add ARIA labels to the overflow buttons in examples
- Facepile: Add ARIA role to the list of people
- PeoplePicker: Reduce height to match other inputs
- Update two examples to use CommandBarButton

## 6.127.0
Thu, 17 Jan 2019 13:34:42 GMT

### Minor changes

- DetailsList: add isMenuOpen property on IColumn interface and add aria-expanded to the DetailsList column header.

### Patches

- Pickers: Fix it so that pickers now correctly lose focus
- When clicking on existing oufr calendar component, there's a 1px space between days in the day picker where the click has no effect. Fixing
- ChoiceGroup: Sets the first enabled option to focusable, even with an invalid defaultSelectedKey
- TextField: fixes High Contrast mode styles when focusing.

## 6.126.0
Wed, 16 Jan 2019 13:38:45 GMT

### Minor changes

- Toggle: adds ability to render with the label inline (left side and right in RTL).

### Patches

- Panel: setting the aria-modal to true to prevent loosing focus when using Narrator in scan mode.
- Icons: Remove aria-hidden to fix narrator focus bug
- DetailsList: Remove redundant columns iteration, array allocation, and setState call in DetailsRowFields

## 6.125.0
Tue, 15 Jan 2019 13:36:46 GMT

### Minor changes

- theming: add loadFonts function and register font variables
- Icon: Pass theme to styles functions.
- ChoiceGroup: adds a getter method to IChoiceGroup to allow grabbing the current checked option through the componentRef.

### Patches

- Add type for example list items
- Convert DocumentCard to MergeStyles
- DocumentCard: changed href in basic example to bing.com
- Copy over hasDynamicChildren and hasMenu for persisted keytips
- Removing some of the deprecated components flagged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.
- PeoplePicker: adjust height of the picker suggestion item to follow the toolkit redline.
- Fix issue with Facepile not using maxDisplayablePersonas prop if its value is 0

## 6.124.2
Mon, 14 Jan 2019 13:39:22 GMT

### Patches

- DatePicker: only set aria-owns when callout is rendered [#6931]
- Fix DatePicker firing two onSelectDate events when allowTextInput is true
- Date is no longer selected when click on 'Today'. That behavior is still allowed passing a boolean argument
- Relaxed type restrictions on possible values for 'autoComplete' attribute on TextField component.
- ActionButton: Fix focus outline getting clipped when the action button sits within a container with `overflow:'hidden'`.
- DatePicker: Temporarily disable failing DatePicker test which uses document.querySelector
- Horizontal scrollbar not available for a grouped details list (all groups collapsed) when header is sticky

## 6.124.1
Fri, 11 Jan 2019 05:00:46 GMT

### Patches

- Ensure coachmark layers under header
- Changed colors to make message bar more visible.
- DetailsList: Ensure the headerClassName prop is processed properly when mergeStyles is used
- CombBox: revert change to aria label
- ContextualMenu: fix hovering on items in IE
- Modal, Dialog: Update styling to work with changes to allowScrollOnElement (change overflowY from auto to hidden)
- DetailsList: Add test for existence of headerClassName if provided

## 6.124.0
Thu, 10 Jan 2019 13:34:59 GMT

### Minor changes

- Pickers: converting to CSS-in-JS suggestions part of the pickers. Move some interfaces and create styled versions of each subcomponent base. Fix imports and more cleanup.

## 6.123.0
Thu, 10 Jan 2019 04:58:48 GMT

### Minor changes

- ITheme: add defaultFontStyles property

### Patches

- Fix issues of marquee selection for IE
- Pickers: Fix so controlled pickers will only focus when it has focus

## 6.122.0
Wed, 09 Jan 2019 13:35:35 GMT

### Minor changes

- Checkbox: Refactored to use an <input type="checkbox"> instead of "button", fixing several longstanding bugs along the way.
- ChoiceGroup: Removed role='application' from root-div

### Patches

- Fixed: the commandbar will no longer flicker when resized
- CommandBar: minor perf improvement in computing cache key
- Fix the typing of ExpandingCard/PlainCard component props.
- FocusTrapZone - Make forceFocusInsideTrap prop changes modify focus

## 6.121.0
Tue, 08 Jan 2019 13:34:49 GMT

### Minor changes

- Allow disabling specific dates on the calendar in addition to the max and min dates.

### Patches

- CalendarYear: convert from componentWillReceiveProps to getDerivedStateFromProps

## 6.120.0
Mon, 07 Jan 2019 13:34:37 GMT

### Minor changes

- Add FocusTrapCallout component
- Exposes the tabIndex of the TextField in the DatePicker
- Slider: Allows a custom value format function to be passed which formats the value label
- DocumentCard: add optional aria role property to allow override the default aria role.

### Patches

- ChoiceGroup: exposing focus() method in IChoiceGroup and makes sure it is implemented.
- Fix outline for Modals and Dialogs in High Contrast mode
- SearchBox: fix handling of null value

## 6.119.0
Thu, 03 Jan 2019 13:33:55 GMT

### Minor changes

- TooltipHost: add show method

### Patches

- Fix calendar accessibility edge bug preventing row and column info from being populated correctly

## 6.118.2
Tue, 01 Jan 2019 13:36:37 GMT

### Patches

- update pivot component to use semantic slots from design redlines

## 6.118.1
Mon, 31 Dec 2018 13:37:56 GMT

### Patches

- Pickers: Fix issue where suggestions wouldn't dismiss for controlled pickers
- Fix Nav selected item's pseudo element

## 6.118.0
Fri, 28 Dec 2018 13:35:08 GMT

### Minor changes

- ComboBox will prioritize ariaLabel property over label for accessibility. Aria labels for Dropdown and ComboBox options do not default to item text.

### Patches

- FocusZone: Respect the onKeydown handler even it is inside inner focus zone.
- checking if sticky content offsetHeight is in sync with nonStickyContent offsetHeight

## 6.117.2
Mon, 24 Dec 2018 13:33:49 GMT

### Patches

- Adding option to prevent focus on Coachmark mount

## 6.117.1
Fri, 21 Dec 2018 13:34:57 GMT

### Patches

- ContextualMenu: fix opening submenus with hrefs

## 6.117.0
Thu, 20 Dec 2018 13:39:35 GMT

### Minor changes

- GroupedList: add compact mode and styles cleanup across GroupedList and DetailsList. Change expand button icon. Consolidate style values in between mentioned components.
- Pickers: convert PeoplePicker items to CSS-in-JS. Expose some components to the surface API and rename them to solve ambiguity issues. Fix some imports in ExtendedPicker and FloatingPicker caused by my API changes.

## 6.116.2
Wed, 19 Dec 2018 13:39:07 GMT

### Patches

- DetailsList: fix conditional rendering of aria-describedby
- Dropdown: only select aria-activedescendant when open to fix screen reader output for required dropdown
- DetailsList: Fix custom footer example's footer row not full width.

## 6.116.1
Tue, 18 Dec 2018 22:17:52 GMT

### Patches

- MessageBar: add aria-expanded and aria-controls to See More button

## 6.116.0
Tue, 18 Dec 2018 13:36:49 GMT

### Minor changes

- ComboBox: add placeholder prop

## 6.115.0
Mon, 17 Dec 2018 13:36:58 GMT

### Minor changes

- Persona: fixing how coinProps are passed through from Persona to PersonaCoin.
- Pickers: convert `TagItem` to use CSS-in-JS. Add `TagItemSuggestion` functional component. Move `TagPicker` related interfaces to a `TagPicker.types.ts` file. Cleanup some TSDocs in `BasePicker.types.ts`.

### Patches

- BaseComponent: Remove componentWillReceiveProps usage

## 6.114.0
Fri, 14 Dec 2018 13:35:30 GMT

### Minor changes

- DetailsList: add isCollapsible and deprecate isCollapsable
- Persona: change type of the 'coinProps' type to IPersonaCoinProps.

### Patches

- Correct hover and highlight states for Calendar (DateRangeType.Week)

## 6.113.0
Thu, 13 Dec 2018 13:37:01 GMT

### Minor changes

- theming: remove ITypography
- Pickers: Convert TagPicker and PeoplePicker to use CSS-in-JS. Support SASS styling for custom pickers extended from BasePicker. Fix tests not using componentRef to access component methods. Cleanup TagPicker example page.

### Patches

- DetailsHeader: Fix "Select All" state not persisted across component mounts when optional selection prop provided.

## 6.112.0
Tue, 11 Dec 2018 13:36:20 GMT

### Minor changes

- Coachmark: Move style interfaces to Coachmark.types.ts file and add styled wrapper around to enable use of Customizer to theme the component.

### Patches

- DetailsList: changed drop hint display to none to not occupy any space
- Dropdown: wrap items list in FocusZone to prevent auto-scrolling to first list item
- Fix merge conflict resulting in build error.
- Adds a just:build script to OUFR to begin integration with Just
- Removing some of the deprecated components flagged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.

## 6.111.2
Mon, 10 Dec 2018 13:35:53 GMT

### Patches

- Dropdown: remove aria-labelledby from items wrapper div if no label property is provided
- Dropdown: `defaultSelectedKey`/`defaultSelectedKeys` is no longer ignored if the Dropdown options changes.
- Rating: respect the icon property

## 6.111.1
Fri, 07 Dec 2018 13:35:16 GMT

### Patches

- Searchbox: Reverts the focus fix for IE since it broke focus for other browsers
- Check: fixing alignment of the check inside the circle when in RTL.

## 6.111.0
Thu, 06 Dec 2018 13:34:21 GMT

### Minor changes

- The Dropdown component will now only include an aria-labelled-by attribute when there is no provided ariaLabel prop. This means that the component will honor provided ariaLabels and create markup such that screen readers will read the aria label and not the regular label.

### Patches

- DetailsList: Prevent override of column cell border while dragging
- spellCheck defaults to false in BasePicker

## 6.110.2
Wed, 05 Dec 2018 13:35:35 GMT

### Patches

- TeachingBubble: add customizer scope to TeachingBubbleContent to allow using it individually.

## 6.110.1
Tue, 04 Dec 2018 13:36:40 GMT

### Patches

- Picker: The shift key is now required (in addition to the del key) in order to delete a suggestion.
- DetailsList: Adding support for column drag-drop in RTL

## 6.110.0
Mon, 03 Dec 2018 13:37:07 GMT

### Minor changes

- Removing some deprecated components flagged when turning tslint deprecation flag to true in oufr package.

### Patches

- DetailsList: Re-adding border fade animation as transition on column reorder
- TeachingBubble: Expand usage documentation to distinguish it from similar components.
- Facepile: Fix overflow title not rendered in Firefox.

## 6.109.0
Fri, 30 Nov 2018 13:37:17 GMT

### Minor changes

- Extend theming to incorporate shadows and rounded corners

### Patches

- DevExp: packages will no longer include the api.json from api extractor to reduce package size
- SwatchColorPicker: Fixing state method componentWillReceiveProps of SwatchColorPicker in order to resolve how it sets focus and color on its cells in its uncontrolled form.

## 6.108.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- HoverCard: A new callback called onCardExpand has been added that occurs after the expanded hover card is rendered
- DatePicker: Added calendarAs to support custom calendars
- DatePicker: Support custom callout props, and therefore layer props
- TeachingBubble: Convert Callout styles to use subComponentStyles.
- Tooltip: do not allow more than one tooltip at once
- add SASS var for accent theme slot
- semantic slot value updates
- Spinner: adds new prop 'labelPosition' to allow customizing the render position of the label. Add new screener stories plus snapshot-test.

### Patches

- Ensures nav links are announced once
- BasePicker: Will now respect `className` property of `inputProps`, if one was provided.
- Dropdown: Add documentation (where there were none previously) about the responsiveMode prop.
- Slider: Fixed IE 11 compatibility issue by changing `Number.parseFloat()` method call to `parseFloat()` method instead.
- Correct hover and highlight states for Calendar (DateRangeType.Week)
- Sticky: Sync ScrollablePane scroll on Sticky forceUpdate to fix scrollbar positioning.
- Facepile: Fix custom title on overflow button not being used in facepile
- DetailsList: fixing focus rectangle color from themePrimary to neutralSecondary.
- ContextualMenu: Fixes alignment of the chevron button of a regular submenu and the split button chevron. Changes positioning of the divider of the split button to fix a hover state background visual bug.

## 6.106.3
Thu, 22 Nov 2018 13:36:17 GMT

### Patches

- Fixing background color of overlay so that screen behind panel isn't hidden in high contrast mode when panel's open

## 6.106.2
Wed, 21 Nov 2018 13:34:56 GMT

### Patches

- adding more specificity by adding selectors
- Link: inherit font size and font weight.
- Check: Fix component not using styles prop when generating classNames.
- ContextualMenu: Remove ContextualMenuItemWrapper onItemClick binds which drop DOM event from args list.

## 6.106.1
Tue, 20 Nov 2018 20:12:42 GMT

### Patches

- Removing some of the deprecated components flagged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.
- A bug fix to avoid crash in ScrollablePane when the componenent is unmounted in an environment where MutationObserver is not supported (for example in jsdom)

## 6.106.0
Tue, 20 Nov 2018 13:32:17 GMT

### Minor changes

- API: Update API with several new icon definitions.

### Patches

- changed _root.value to _root.current in componentDidMount
- DetailsList: Prefer BaseComponent async when using setTimeout to avoid memory leak when toggling drag & drop class.

## 6.105.1
Mon, 19 Nov 2018 13:36:25 GMT

### Patches

- ProgressIndicator: Fixes bug when transparent color used in a gradient in Safari browser treats it not as intended.

## 6.105.0
Fri, 16 Nov 2018 13:35:41 GMT

### Minor changes

- Dropdown: add placeholder prop, deprecate placeHolder

### Patches

- Update lorem generator to not use randomly generated text
- GroupedList: rendered with aria-role grid instead of list
- DetailsList: Remove drag and drop border animation causing style mutations on re-render.
- "Fix scrollable pane sticky alignment issue"
- HoverCard: Fixes a style selector to properly remove the border from the Callout holding card's content and add a different shadow to it.

## 6.104.0
Thu, 15 Nov 2018 13:36:22 GMT

### Minor changes

- DevExp: get rid of const enum so the library is compatible with Typescript's isolatedModule compilation mode
- ScrollablePane and Sticky: Fix placeholder height, Sticky sorting, and stickyClassName
- Slider: replace button with div so vertical Sliders render on Safari

### Patches

- Updating snapshots from `styled` helper changes.

## 6.103.1
Wed, 14 Nov 2018 13:34:01 GMT

### Patches

- Choicegroup: Fix an issue where the child label component was incorrectly getting the className prop.
- ContextualMenu, ComboBox, Dropdown: on Mac, don't close on alt or command
- TextField: fix multiline bug, update docs

## 6.103.0
Tue, 13 Nov 2018 13:30:53 GMT

### Minor changes

- ColorPicker: Export sub-components

### Patches

- Fix bug in ColorPicker opacity slider and improve demo page
- DatePicker: onSelectedDate now propagates empty values even when input is required.

## 6.102.0
Mon, 12 Nov 2018 13:31:40 GMT

### Minor changes

- Modal: Allow defining layer props

### Patches

- SearchBox: IE now will consistently focus when click between icon and placeholder text
- DetailsHeader: Support optional tooltip rendering for column headers.

## 6.101.0
Fri, 09 Nov 2018 13:32:57 GMT

### Minor changes

- Removing more deprecated components flagged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.
- DocumentCard: Adding `focus` method to `IDocumentCard`, which can be accessed via `componentRef`.
- Removing some of the deprecated components flaged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.
- Add keytips to Facepile personas
- Remove the FocusZone wrapping the FacepileMembers

### Patches

- ChoiceGroupOption: component mergeStyled class names no longer gets overridden by choicegroupoption item className prop
- Button: example updated with proper styling for a custom split button
- Passing the prop alignTargetEdge to contextualMenu's callout
- Link: Fix bug where componentRef property was passed through to the dom element
- Improve conditions of re-initialize state
- BasePicker: give selected items element role "list"

## 6.100.2
Thu, 08 Nov 2018 04:17:34 GMT

### Patches

- Label examples: updated to illustrate good accessibility patterns.
- DatePicker: pressing enter now changes the selection.
- Panel documentation: updated docs to recommend having a minimum 340px width on the container.
- Modal: Set aria-modal=true for a better screen reader experience.
- Modal examples: Adding aria labels title & description.

## 6.100.0
Wed, 07 Nov 2018 13:31:01 GMT

### Minor changes

- Nav: Added linkAs to support custom buttons and React Router
- ContextualMenu: Add menuItem subComponentStyles to enable each item styling from the ContextualMenu styles.

### Patches

- update to fix bug when footer covered horizontal scroll bar
- Button: Update example to use PrimaryButton component
- Add unit tests for ComboBox multiSelect onItemClicked callback and on select via mouse click.
- Remove defaultPrevented check in ComboBox item click due to multiSelect regression.
- Set GroupedList List page key to IGroup key instead of name for uniqueness.

## 6.99.1
Tue, 06 Nov 2018 13:31:09 GMT

### Patches

- Dropdown: change aria attributes on listbox when disabled
- Increase height on Persona card primary text to make room for descenders

## 6.99.0
Sun, 04 Nov 2018 02:27:52 GMT

### Minor changes

- add ariaLabel prop for ChoiceGroupOption

### Patches

- Fix typo with DatePicker Callout aria-label.

## 6.98.1
Fri, 02 Nov 2018 18:11:37 GMT

### Patches

- Panel: fix box-shadow value

## 6.98.0
Fri, 02 Nov 2018 12:28:55 GMT

### Minor changes

- Add optional onItemClick callback to ComboBox.
- Callout Positioning fixes - OnPositioned should not be called on every frame and adding a new prop called alignPerfectlyWithTarget to disallow nudging of callout
- TextField: set overflow to hidden when autoAdjustHeight is set to avoid flashing scrollbar
- ContextualMenu: Add fix for subComponentStyles. It is now optional in the `IContextualMenuClassNames` interface.

### Patches

- Pickers: Fix IE 11 focus and a few css issues
- Slider: fix value calculations

## 6.97.1
Wed, 31 Oct 2018 22:35:10 GMT

### Patches

- Adding warning and updating documentation on Pivot children needing to be of type PivotItem to be rendered.

## 6.97.0
Wed, 31 Oct 2018 12:32:41 GMT

### Minor changes

- Expose existing mergeSettings utility function.

## 6.96.0
Tue, 30 Oct 2018 18:45:48 GMT

### Minor changes

- ComboBox/Autofill: prevent text from being selected when focus is not on the input box

### Patches

- Removing some of the deprecated components flaged when turning the tslint deprecation flag to true in the office-ui-fabric-react package.

## 6.95.0
Tue, 30 Oct 2018 12:27:52 GMT

### Minor changes

- Addition of year picker to Calendar
- ContextualMenu: adding a subComponentStyles hook to enable styling of the components used within ContextualMenu. Removing an unused style function.

## 6.94.0
Mon, 29 Oct 2018 18:04:30 GMT

### Minor changes

- Add blur to ITextField and implement to support programmatic blur."

## 6.93.1
Mon, 29 Oct 2018 12:31:29 GMT

### Patches

- DetailsList/List: updating documentation.
- DatePicker: Pass id prop to TextField component.
- ContextualMenu: Fix separator announcement in Narrator scan mode.

## 6.93.0
Fri, 26 Oct 2018 12:32:36 GMT

### Minor changes

- Enable api-extractor build task
- Callout: Added layerProps to interface
- GroupedList: add aria-expanded and aria-controls
- Add optional onColumnResize callback to IColumn which reports resized column's current width

### Patches

- Fix the issue of DetailLists and DetailHeadder property about isAllGroupsCollapsed changed after initial constructor , they are not reflected in the state.
- Breadcrumb: add overflowAriaLabel to examples
- Fix typo in role attribute in DocumentCardActivity
- Updated Fabric API file
- Rating: Updating padding on each star to fix clipping focus outline and adjust height to follow redlines.

## 6.92.1
Thu, 25 Oct 2018 12:30:06 GMT

### Patches

- CommandBar: Remove duplicate className prop application.
- Add unit tests for DetailsList onRenderMissingItem prop.
- Dropdown: Add support for onFocus callback

## 6.92.0
Wed, 24 Oct 2018 12:28:58 GMT

### Minor changes

- Add an optional parameter to allow Dropdown to call onChanged when an item is clicked, even if that item was already selected
- Tooltip: change display property of TooltipHost to inline-block to properly behave when wrapping inline or inline-block children.

### Patches

- ResizeGroup: Moved relative style to inner wrapper div

## 6.91.0
Tue, 23 Oct 2018 12:32:16 GMT

### Minor changes

- TooltipHost: convert to CSS-in-JS

## 6.90.0
Mon, 22 Oct 2018 12:29:57 GMT

### Minor changes

- Add in missing exports in index.ts

### Patches

- Fixed the column total vertical sync issue while resizing the column header by dragging them to the right until it gets overflowed and also make the vertical overflow as auto to make sure that the scroll bar  appears  only when there is a vertical overflow.

## 6.89.0
Fri, 19 Oct 2018 12:29:20 GMT

### Minor changes

- HoverCard: Add BasicCard as an option when need to render a non-expanding HoverCard. Refactor mergeStyle API plus refactor file organization.

### Patches

- Revert getItemClassNames API change to fix memoization bug due to Object usage rather than primitive arguments list."
- Added 'break' statement in PeoplePicker component example. Without it, changing picker type to 'Process Selection' was rendering 'Controlled Picker' instead.

## 6.88.0
Thu, 18 Oct 2018 20:22:36 GMT

### Minor changes

- adding groups prop to pass parent group's children info
- Add onPagesUpdated optional prop to List component

### Patches

- Remove api-extractor.disabled.json
- Fix accessibility issue when user arrow down suggestion, screen reader is not announcing the selected result

## 6.87.0
Wed, 17 Oct 2018 12:29:40 GMT

### Minor changes

- Breadcrumb: move style interfaces to the types file to be included in the export and documentation.
- DetailsList: update the styles with 2 new regions headerWrapper and contentWrapper providing easy className hooks to pass custom styling.

### Patches

- Spinner: No longer appears to vibrate in Microsoft Edge (Oct 2018 Update).

## 6.86.0
Wed, 17 Oct 2018 01:29:55 GMT

### Minor changes

- Update theme generator to generate valid code output. Fix Pivot API to accurately reflect div interface.

### Patches

- FocusTrapZone: Add/remove focus and click handlers when props change

## 6.85.0
Tue, 16 Oct 2018 12:28:48 GMT

### Minor changes

- Dropdown: Adds a state property to be set when the Callout has been positioned identifying on what edge of the target it has rendered.

### Patches

- ScrollablePane: now uses React createRef, added test.

## 6.84.1
Mon, 15 Oct 2018 12:29:12 GMT

### Patches

- DetailsList: do not set select all button aria-describedby unless id it references exists
- Added default font theme for Slider control to remove Fabric component dependency.
- Fix ContextualMenuItem secondary text not read by screen reader due to aria-label containing only primary text."
- Slider bug fix for min equals max
- Panel: Fixed second scroll bar when content taller than panel
- ShimmeredDetailsList: Added export to top level index file

## 6.84.0
Thu, 11 Oct 2018 23:13:31 GMT

### Minor changes

- Implement ImageFit.centerCover

### Patches

- Calendar: accessibility fixes for month option grid
- Dropdown: Fix issue where correct option wasn't selected
- Fix ContextualMenu example broken charm icons and specify hover delay input as type="number".
- Remove 'Button Swap with Focus State' example
- ScrollablePane: Update DetailsList example to fix bug where footer overlapped scroll bar
- IconButton: Specifiy the color of the icon in IconButton so that it can be themed and change the hover color for the same reasons.

## 6.83.0
Wed, 10 Oct 2018 12:29:05 GMT

### Minor changes

- DatePicker and Calendar: allowing native div props to be forwarded to container div.
- Keytip: Fix TS 3.1 error by extending IBaseProps.

### Patches

- Facepile: fix precedence order for style and className props
- Added default font theme for Slider control to remove Fabric component dependency.
- Make ChoiceGroup's role configurable with default "application" for JAWS support.
- KeyTip: Adds space around examples to improve readability
- Nav: add aria-label and aria-expanded to groups
- Panel: make scrollableContent the only scrollable div
- TagPicker textbox is in the wrong position - middle instead of bottom. Added an align style to fix this.

## 6.82.0
Tue, 09 Oct 2018 12:26:48 GMT

### Minor changes

- Nav: Add custom group header renderer property

### Patches

- DocumentCard, Pivot, GroupHeader - replace instances of neutralSecondaryAlt with neutralSecondary
- DocumentCardTitle: Fixes an infinite loop condition caused by componentDidUpdate calling _srinkTitle() over and over again due to setState being triggered every time without a stop condition.

## 6.81.0
Mon, 08 Oct 2018 19:25:44 GMT

### Minor changes

- Links that wrap aren't getting the proper focus rect. Added a conditional selector that changes the  outline and removed the getFocusStyles call  to fix this. This is for Links that are anchors. Links that are buttons do not wrap at the moment. Once Links that are buttons wrap we can address their focus rect issues if there are any.

### Patches

- TextField can no longer be resized to below its minimum height

## 6.80.0
Mon, 08 Oct 2018 12:24:16 GMT

### Minor changes

- Typescript 3.1 type fixes.

### Patches

- Moving tslint/prettier dependencies to published packages.
- Fix a11y violations in ContextualMenu examples
- Fix Sliders' support for zero values.

## 6.79.0
Fri, 05 Oct 2018 23:29:26 GMT

### Minor changes

- Moving data property from IDropDownOption to ISelectableOption so anyone that uses ISelectableOption can use this property

### Patches

- Fixed initials not reappearing bug when image is removed from a PersonaCoin

## 6.78.1
Fri, 05 Oct 2018 12:27:02 GMT

### Patches

- DetailsList: header now reflects the theme defined in the font.
- Facepile: allow FacepileButton to render custom styles
- Fixed null ref error when autoFocus prop is used in SearchBox
- Fixes DetailsHeader disabled columns invoking onColumnClick callbacks

## 6.78.0
Thu, 04 Oct 2018 12:26:48 GMT

### Minor changes

- Coachmark: Add delayBeforeCoachmarkAnimation prop

### Patches

- Add explicit min-width of 0px to SearchBox input element, to prevent overflow when SearchBox has a fixed width.
- Modal: small topOffsetFixed changes and added example to Dialog
- Dropdown: only apply an aria-labelledby attribute if a non-empty label property is given
- Correct hover and highlight states for Calendar (DateRangeType.Week)

## 6.77.0
Wed, 03 Oct 2018 12:28:46 GMT

### Minor changes

- Modal: add optional prop topOffsetFixed
- SwatchColorPicker: let height and width be customizable

### Patches

- FocusZone: check for RTL before making top bottom comparisons

## 6.76.0
Tue, 02 Oct 2018 12:28:04 GMT

### Minor changes

- Pivot: update the wrapper holding the tab buttons from ul tags to div for HTML validation and keep the narrator working correctly.

### Patches

- Layer: Don't block capture events, allowing onFocus and onBlur events to work as expected.
- TextField: prettier fixes

## 6.75.0
Mon, 01 Oct 2018 12:27:24 GMT

### Minor changes

- semantic slot value updates per design direction

### Patches

- Improve _isWhiteCell logic to handle rgb(a) and hex shorthand  notation.
- Add native props support for input properties to  SearchBox's inner input element.

## 6.74.2
Fri, 28 Sep 2018 12:27:38 GMT

### Patches

- DetailsList: replace the use of neutralSecondaryAlt color which was deprecated.
- ComboBox: add logic to stop onBlur handler to be invoked when clicking on Callout's scrollbar.
- now all the top level components will include version info for package

## 6.74.1
Thu, 27 Sep 2018 12:27:48 GMT

### Patches

- Layer: Do not render content until virtual parent is set.

## 6.74.0
Wed, 26 Sep 2018 12:27:23 GMT

### Minor changes

- Add currentRenderedQueryString to avoid discrepancy

### Patches

- Sticky: second null check for currElem
- Dropdown: prevent dropdown to open on keyboard events when in disabled mode.

## 6.73.0
Tue, 25 Sep 2018 12:28:12 GMT

### Minor changes

- Allows callout props to be passed through the base picker

### Patches

- ResizeGroup: Remove classNamesFunction from ResizeGroup
- make oufr also set sideeffects for version.js

## 6.72.2
Mon, 24 Sep 2018 12:27:31 GMT

### Patches

- CommandBar: Surface buttons now have role of menuitem
- Fix off by one error with DetailsHeader DnD when checkbox is hidden.
- Fix Panel Custom className not output if PanelType is Custom

## 6.72.1
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file
- fixed Korean characters typing issue in IE11.
- Revert max-line-length change in favor of tslint disable next line for ColorSlider background  values to fix Screener regression.
- Add example of using CommandBarButtonAs with coachmarks and add IComponentAsProps

## 6.72.0
Thu, 20 Sep 2018 12:25:33 GMT

### Minor changes

- DocumentCardPreview: Change component to use Link and add linkProps
- ColorPicker: The ColorPicker component now passes the complete color object as second parameter to the `onColorChanged` props along with the existing string representation of the same as first parameter.
- add support for commandBarButtonAs to ICommandBarItemProps along with passing the defaultRender to the commandBarButtonAs

## 6.71.1
Wed, 19 Sep 2018 12:27:48 GMT

### Patches

- Panel: pass click events to onDismiss handler
- Refactor PivotItem & DialogFooter type comparison to use React.Element.type to address hot module replacement break.

## 6.71.0
Tue, 18 Sep 2018 12:26:03 GMT

### Minor changes

- Panel: Extend props to HTMLAttributes

## 6.70.0
Mon, 17 Sep 2018 12:27:05 GMT

### Minor changes

- Add conformance tests to verify that components take a className property

### Patches

- SpinButton: SpinButton: Preventing and Stopping Propagation when enter is pressed
- Coachmark: Fix tabbing when Coachmark is mounted
- Fix DetailsList columnReorderProps change not causing render
- Example updated with the implementation of onRenderDivider for DetailsList

## 6.69.0
Fri, 14 Sep 2018 01:55:02 GMT

### Minor changes

- Adds an optional prop to the DatePicker that allows disabled elements to be focused (although not pressed)

### Patches

- added functional unit tests for drag-drop feature

## 6.68.0
Thu, 13 Sep 2018 17:38:04 GMT

### Minor changes

- Adds new semantic slots per design direction

### Patches

- Teaching Bubble: Fix outline on content that produces undesirable visuals
- Fixes SwatchColorPicker swatches shifting when isWhite swatch not at end of row due to 1px different in border-width
- Hide duplicate keytips and give console warning if found
- Fix Selection count not updating when items are removed

## 6.67.3
Wed, 12 Sep 2018 12:26:41 GMT

### Patches

- SpinButton: Added SpinButton snapshot and simplified ariaValueNow logic
- Button: Fix splitButton focus issue with Portals
- Check whether meta key is pressed during selection

## 6.67.2
Tue, 11 Sep 2018 07:28:02 GMT

### Patches

- removed the check for event to be an instanceof DragEvent in the onDrop method
- Make button respect no global class names flag
- update datepicker to allow IE to work with input field while retaining the accessibility
- Revert removal of should render DatePicker guard given focus changes with Layer changes.
- Fixed_groupheader_checkbox_aria_label_accessibility_issue

## 6.67.1
Tue, 11 Sep 2018 02:54:40 GMT

### Patches

- IconButton: now with less IE11 shifting pixels.
- add safeguard in contextualmenu against doing setstate while unmounted

## 6.67.0
Mon, 10 Sep 2018 10:24:57 GMT

### Minor changes

- adding min and maxwidth to dialog

### Patches

- Fixed key not found issue with contextmenu with custom onRender per item

## 6.66.1
Fri, 07 Sep 2018 22:04:50 GMT

### Patches

- Check: adjusting shouldComponentUpdate to not ignore theme changes.

## 6.66.0
Fri, 07 Sep 2018 16:29:48 GMT

### Minor changes

- Updates button slots with correct pre-fluent palette values and scss fallbacks
- Layer: Add optional event blocking. Tooltip: Detect targets in portals.
- Layer: Now use React Portals.

### Patches

- Add white-space: nowrap to CommandBar Button labels
- ChoiceGroup to add a customizable ariaLabelledBy prop
- ChoiceGroup: have focus method take into account selectedKey
- adjust dropdownprops onchange to be more in line with the div element onchange attrib
- ComboBox: Fix pressing ENTER after just hovering over item when freeform (and there's no pending value)
- ComboBox: Allow 0 as a valid selectedKey/defaultSelectedKey
- Updates the example for Nav to use a more updated click handler pattern
- Fix issue where deleting all selected items wouldn't update selection
- allow custom classnames to be passed thru to spinbutton

## 6.65.0
Thu, 06 Sep 2018 10:28:35 GMT

### Minor changes

- add buttonBackgroundDisabled semantic slot

### Patches

- SpinButton: Add check for a 0 value
- CommandBar: get rid of invalid aria attributes
- ComboBox: reduce the calls to onChange to be more accruate (e.g. remove from the wrapping div and make sure we do not double process changes)
- ContextualMenuItem declare font-color as semanticColors.bodyText instead of inherit
- adding a scope for groupedlist footer link styles

## 6.64.0
Wed, 05 Sep 2018 10:29:25 GMT

### Minor changes

- Change bodyDivider value from neutralTertiaryAlt back to neutralLight
- Mark unused "toggled" prop of IButtonProps as deprecated.
- Deprecate classNames for ContextualMenu & ContextualMenuItem in favor of mergeStyles API via styles props.

### Patches

- onRenderDivider props added to DetailsList to wrap the existing behaviour of column divider of lists
- Modal, Panel: make scrollable content styles customizable via className or styles props
- use div and instead of p if teachingbubble content isn't a string
- Fix 'npm run generate' issue

## 6.63.0
Tue, 04 Sep 2018 10:27:15 GMT

### Minor changes

- add onBlur on Slider

### Patches

- DetailsList: only use role button when onColumnClick prop is defined

## 6.62.0
Mon, 03 Sep 2018 10:25:31 GMT

### Minor changes

- Added optional 'iconProps' property to SearchBox component.

### Patches

- Sticky placeholders should ignore pointer events when state is non-sticky

## 6.61.2
Fri, 31 Aug 2018 20:48:42 GMT

### Patches

- Coachmark - only show beak if it is collapsed
- fix re-render caused by view port resize observer

## 6.61.1
Fri, 31 Aug 2018 17:27:00 GMT

### Patches

- ComboBox: Fix clearing the comboBox on escape

## 6.61.0
Fri, 31 Aug 2018 10:27:35 GMT

### Minor changes

- SpinButton: Add aria-valuenow and aria-valuetext for controller spin buttons
- DatePicker: add optional underlined prop for TextField

### Patches

- ComboBox: update isOptionSelected logic to take into acount updated values for currentPendingValue
- added ability for personacoin to be arbitrarily sized for initials

## 6.60.0
Thu, 30 Aug 2018 19:26:04 GMT

### Minor changes

- Addresses #6041. Added onRenderMenuList to ContextualMenu. Added default _onRenderMenuList with IContextualMenuProps. Updated docs with an example of a ContextualMenu with custom MenuList with searchbox.

### Patches

- add overflow hidden to hide scroll from calendar holder
- ComboBox: Update ComboBox to allow for empty string to be submitted
- onRenderCoin to be called irrespective of imageUrl being present or not

## 6.59.0
Thu, 30 Aug 2018 10:32:49 GMT

### Minor changes

- Add the ability to disable the built-in SelectionMode in DetailsList
- Menu/ComboBox/Dropdown: Make the mouse being under a menu item not move focus until after a mouseMove is seen

### Patches

- Checkbox: use id passed in if provided
- ChoiceGroup: have ChoiceGroupOption style use new ms-Fabric--isFocusVisible class
- Dropdown: color changed to HighlightText
- Remove unnecessary margin on dropdown
- Allow MaskedTextField to backspace to the beginning when the mask is all numbers
- Corrected some Checkbox implementations - should use 'aria-labelledby' instead of 'aria-describedby'
- make escape key do prevent default first before calling ondismiss callback
- BaseButton: iconProps className takes precedence if it exists in icon render

## 6.58.0
Wed, 29 Aug 2018 10:28:42 GMT

### Minor changes

- Expose the event that triggers the commit of a manually entered value to OnValidate callback so consumers can handle focus transitions in an accessible way

### Patches

- Make ComboBox input color themeable
- Fix status indicators on icon-only column headers
- Coachmark: Fix inability to focus on inputs when Coachmark is active
- Buttons: remove borders on buttons without borders
- Textfield: fixed ie only styles regarding clear button

## 6.57.0
Tue, 28 Aug 2018 10:23:58 GMT

### Minor changes

- Callout: Pass divProperties into root

### Patches

- Adding a missing passthrough of the menuicon style from base button to split menu icon
- updates to view count icon spacing to spec in documentcard
- Panel: set the content height to window.innerHeight on iOS
- Sticky: null check for currElem

## 6.56.0
Mon, 27 Aug 2018 10:27:43 GMT

### Minor changes

- Adds an optional close button to the DatePicker
- Convert all SCSS styles in panel to JS Styles

## 6.55.0
Fri, 24 Aug 2018 17:02:14 GMT

### Minor changes

- Reverting Customizer React 16 context change, while we dig into the Layer portal conversion first. As it is moving to React 16 breaks layer theming, which we believe can only be fixed if we move to portals (which has other issues to investigate.)

## 6.54.1
Fri, 24 Aug 2018 14:45:24 GMT

### Patches

- Prevent breaking change in DetailsItemProps

## 6.54.0
Fri, 24 Aug 2018 10:26:08 GMT

### Minor changes

- ColorSlider, ComboBox, Dropdown, Rating, Toggle: add onChange and deprecate onChanged

### Patches

- ChoiceGroup: remove aria-labelledby to prevent accessibility bugs with custom onRenderLabel
- ContextualMenu: remove line-height 0 styling for lists
- Fix @types/prop-types being inconsistently restrictive.

## 6.53.0
Thu, 23 Aug 2018 10:28:17 GMT

### Minor changes

- Pickers: A variety of accessibility and bug fixes
- Fix Scrollable scroll syncing and header/footer alignment

### Patches

- Check: adjusting shouldComponentUpdate to not ignore theme changes.
- Modal, Panel: allow scrolling within Modal and Panel while disabling scrolling on the body (ios)
- DetailsList: Account for grouping depth of more than one in width calculation.

## 6.52.0
Wed, 22 Aug 2018 05:10:19 GMT

### Minor changes

- Button: Added labelHovered and fixed menuIconCheckedHovered ButtonStyles

### Patches

- CommandBar: Update documentation page
- Adding role="Grid" so that VoiceOver within Safari works for Calendar and DatePicker

## 6.51.1
Tue, 21 Aug 2018 20:36:27 GMT

### Patches

- Sticky: Fix logic when Sticky on first render is at most top position to get it sorted properly.

## 6.51.0
Tue, 21 Aug 2018 10:28:16 GMT

### Minor changes

- adds variantBorderHovered and emptyStateBackground semantic slots to theme and variants logic

### Patches

- BaseButton: Add onFocusCapture to the split button container to focus the container instead of doing it in the menu onClick
- ChoiceGroup: change styles so that label styles do not apply to Label components in onRenderField
- DetailsList: select first row on down arrow key event
- MaskedTextField: onChange now returns the displayed value vs the entered value
- Sticky: Fix an edge case causing Sticky footer to wrongly re-calculate it's height.

## 6.50.2
Mon, 20 Aug 2018 10:26:10 GMT

### Patches

- Don't left-pad DetailsColumn header icons
- DetailsList: add aria-hidden to select all checkbox in single selectionmode
- TextField: Fix application of inputClassName lost when component was converted to JS styling.
- Use role="alert" instead of aria-live="assertive" on error message container for TextField.
- remove unnecessary export in detailslist
- Panel: remove selected media queries to ensure that custom panels are always right-aligned
- Autofill: prevent onInputChange from being called on IE11 inputs with a placeholder

## 6.50.1
Fri, 17 Aug 2018 15:00:40 GMT

### Patches

- Decouple ShimmeredDetailsList from DetailsList

## 6.50.0
Fri, 17 Aug 2018 10:26:39 GMT

### Minor changes

- Date is no longer selected when click on 'Today'. That behavior is still allowed passing a boolean argument

### Patches

- ChoiceGroup: Fix bug that errors on Array.find as it does not exist in IE11.
- Replaced black with violet in the personacoin pallette to avoid potential offensive personacoin combinations
- Panel: add max-width to fixed Panel width styles

## 6.49.4
Thu, 16 Aug 2018 10:26:16 GMT

### Patches

- Button: fix aria properties so that unit tests pass
- DetailsList: selectionMode for groups is none if checkboxvisibility is hidden
- DetailsList: remove related section from demo page
- FocusZone: Fix Tabbing behavior when in RTL
- Panel: change click listener to mousedown listener so that Panels aren't dismissed on mouseup
- Ensure SelectionZone selects item before opening context menu

## 6.49.3
Wed, 15 Aug 2018 10:26:31 GMT

### Patches

- adding a npm run codepen command to allow for local codepen webpack-dev-server

## 6.49.2
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- autogenerate codepenable examples for fabric examples tagged with @codepen
- DetailsList: in single select mode maintain role and index, and remove onclick

## 6.49.1
Tue, 14 Aug 2018 00:01:11 GMT

### Patches

- Fixes checkbox visibility flag in detailslist
- KeytipLayer Styles: Changed 1px to 0px to hide span
- TextField: For uncontrolled scenarios, update value when defaultValue changes.
- Coachmark: Export from index file for use in CodePens.
- onRender callbacks of PersonaDetail can also be used to wrap the default behaviour

## 6.49.0
Mon, 13 Aug 2018 03:43:25 GMT

### Minor changes

- new button semantic slots
- adds opacity function to variants
- Uniformly export component "Base" implementations.

### Patches

- Improves high contrast mode styles for calendar
- Adding updateDragInfo for DragEnd event
- Updating the documentation pages for components to enable the feedback section.

## 6.48.0
Fri, 10 Aug 2018 10:26:09 GMT

### Minor changes

- Coachmark: Add onDismiss
- CommandBar: OnClick now properly passes item as well as event

### Patches

- ColorPicker: Update color rectangle when hue value changes
- autogenerate codepenable examples for fabric examples tagged with @codepen
- ComboBox cannot clear value when allowFreeForm enabled. Should trigger onChanged when value is cleared
- Update components using customizer (including Button variations) to concatenate customizer and component style sets
- Added optional feedback section for component pages
- Link: Fix focus border text clipping.
- TextField: Respect validateOnFocus props when props change.
- ColorPicker: Limit decimal points shown for alpha.
- ' Added 2 callback functions for dragstart and drag end events to get the telemetry logs in ODSP-Next'
- Changing the drophint ICON
- default render behaviour can be used along with onRenderCoin in Persona component
- Prettier cleanup.
- Removed unnecessary heading roles, and added aria-level to those requiring them
- HoverCard: Adds more documentation and adds a focus stop on root to eliminate an edge case when target is not provided the focus listener was not firing at all.
- ShimmeredDetailsList: replace a hard coded multiplier with a ratio constant and modify some math logic.

## 6.47.2
Thu, 09 Aug 2018 10:31:30 GMT

### Patches

- Checkbox: Now aligns to spec when text wraps to multiple lines (#5816).
- ChoiceGroup: Set data-is-focusable attribute so that FocusTrapZone can detect correct focusable elements
- DetailsList: Fix all examples by disabling row renderer optimization.

## 6.47.1
Wed, 08 Aug 2018 10:25:08 GMT

### Patches

- Layer: Fix layer customizability regression introduced in #5569 - which also broke the official Layer example.
- Fix a class of bad imports that breaks AMD.
- Fixes a bug in drag and drop detaillist column not showing a gripper
- Dropdown: use item text for title if title is not provided
- Button should not have any html tag as children. In IE the inner html, would not render.
- Panel: Don't force focus in trap if isHiddenOnDismiss is set and panel is closed

## 6.47.0
Tue, 07 Aug 2018 10:22:32 GMT

### Minor changes

- Minor documentation and type name fixes
- Add new toggle prop to correclty use aria-pressed attribute as needed.

### Patches

- Fix line height scrollbar issue in ActivityItem
- Dropdown: You can no longer use the arrow keys to change the selected items in a  disabled Dropdown. (#5738)
- CommandBar: Disabled buttons are now focusable by default due to menubar role
- Fix bug in ChoiceGroup that errors on Array.find as it does not exist in IE11
- Add Modal component to index entry file.
- Fixing Shimmer implementation in DetailsList.

## 6.46.0
Mon, 06 Aug 2018 10:27:53 GMT

### Minor changes

- TextField: Add onChange prop and deprecate onChanged

## 6.45.0
Fri, 03 Aug 2018 10:25:59 GMT

### Minor changes

- Align cell and column padding in DetailsList
- 'adds 4 new semantic slots, based on designs from SP-Client events webpart, and with approval from Philip Kuo; actionLink, actionLinkHovered, cardBackground, variantBorder'

### Patches

- ComboBox: Only allow focus to be put back on input if focus is still inside the ComboBox
- Dropdown: changed default directionalHintFixed to false. Can be changed to true via calloutProps.directionalHintFixed
- SearchBox: fix field backgroundColor.
- Updated the example to use imageUrl as props instead of hard coding directly into the img tag
- MessageBar: add aria-expanded

## 6.44.0
Thu, 02 Aug 2018 10:23:19 GMT

### Minor changes

- Make Toggle component follow accessibility standards, propose deprecation of onAriaLabel, offAriaLabel

### Patches

- Fixing an issue where ColorPicker would report invalid color values when tabbing between its Hex and RGBA text inputs."

## 6.43.0
Wed, 01 Aug 2018 10:25:51 GMT

### Minor changes

- Remove ShimmeredDetailsList from the DetailsList 'bundle'

### Patches

- Check: shouldComponentUpdate now resepects theme and classname changes.
- FocusTrapZone: Fix focus/click-trapping bugs when FocusTrapZones are nested.
- Restore accessible labels for DetailsList columns and states
- dragStart callback will be in sync with browser, instaed of calling it in mousemove
- PersonaCion will render the user's avatar image only if there is a valid image and the user do not wish to hide it, unlike previously where an empty img tag(src='') was being rendered over the initials always
- Deprecating 'borderStyle' prop of Shimmer subcomponents Line, Circle, Gap in favor of leveraging mergeStyles API.

## 6.42.0
Tue, 31 Jul 2018 10:25:18 GMT

### Minor changes

- Fix SelectionZone selectToIndex with Shift+Tab, expose FocusZoneProps on ExtendedBasePicker
- Dropdown: Converted to support JS styling.
- Adding footer component for details list

### Patches

- Fixing issue with render coin on persona component
- Tooltip: narrator now announces aria-describedby when using onRenderContent

## 6.41.1
Mon, 30 Jul 2018 10:27:11 GMT

### Patches

- Layer: Fixed bugs in examples that were affecting their functionality (#5680).
- Ratings: Minor typings bug fix.
- Adding interfaces IDetailsGroupRenderProps, IDetailsGroupDividerProps, which extends existing interfaces  IGroupRenderProps, IGroupDividerProps respectively, allowing group header/footer for DetailsList to be displayed as a DetailsRow.

## 6.41.0
Fri, 27 Jul 2018 10:25:40 GMT

### Minor changes

- Enabled Customizer to affect TextField

### Patches

- ScrollablePane: Fix mutationObserver
- Fixing the Detailscolumn render return type to return a single JSX element, instead of an array
- Added experiments dependency to fabric website package file and added exports for collapsible section and foundation

## 6.40.0
Thu, 26 Jul 2018 10:28:51 GMT

### Minor changes

- CommandBar: Support passing tooltipHostProps to items in iconOnly mode
- TextField: Convert to JS styling.

### Patches

- Changes resizing viewport detection

## 6.39.2
Wed, 25 Jul 2018 03:20:34 GMT

### Patches

- Removed global css selectors in example code, which was causing sporadic spacing problems with other unrelated examples.

## 6.39.1
Tue, 24 Jul 2018 10:24:36 GMT

### Patches

- Added an optional "export to codepen" button to code examples. Implemented the button for the Label Component. When clicked, the button redirects to a codepen containing the relevant code example, ready for user editing.
- ScrollablePane: Fix overflow css and remove unncessary stickyClassName in render

## 6.39.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- add shouldComponentUpdate to detailsrow to improve performance
- Addressing bad imports.
- Modal: Convert to JS styling.
- Added hideOverflow prop to Callout to control it's overflowYHidden style prop on calloutMain element. Used this prop to hide flickering scrollbar on TeachingBubble due to height variance during load animation.

### Patches

- fix aria-expanded for ExtendedPicker
- Combobox: Dropdown will now "drop up" if there isn't enough space below
- ContextualMenu: Deprecated inactive prop as it was no longer being used
- Coachmark: Add missing key prop to array in render
- ScrollablePane: allow initialScrollPosition === 0
- MarqueeSelection: fix snapshot test verbosity
- Popup: Skip scroll computation if style.overflowY is provided.
- Textfield: onSearch now works when no text has been entered. It will return an empty string.
- Changes to fix auto-scroll to top issue when state changed, adding an if st
- ComboBox: Fix bug in `onPendingValueChanged` caused by incorrect check for undefined, which also ignores 0, which is a valid value for both `newPendingIndex` and `newPendingValue`.

## 6.38.2
Fri, 20 Jul 2018 10:25:21 GMT

### Patches

- ComboBox: Fix IE11 null event.relatedTarget

## 6.38.1
Thu, 19 Jul 2018 19:04:38 GMT

### Patches

- Add automation identifier to the visible content of ResizeGroup
- Added optional feedback section for component pages

## 6.38.0
Thu, 19 Jul 2018 10:23:34 GMT

### Minor changes

- Adds showInitialsUntilImageLoads property to Persona/PersonaCoin to show initials while the image is loading

### Patches

- ResizeGroup: Optimize performance for initial render when onGrowData is provided

## 6.37.1
Wed, 18 Jul 2018 10:25:50 GMT

### Patches

- Fix issue where last suggestion item was selected on first query change. Fix picker showing on zero query
- Fix various typings/code bugs.
- Adding a try/catch when we call setActive in Dropdown/ContextualMenu in IE11.
- DatePicker: Fixes a bug where the DatePicker would only open every other time it gained focus.

## 6.37.0
Tue, 17 Jul 2018 10:28:40 GMT

### Minor changes

- ExtendedBasePicker: Expose selectedItems, Remove persona suggestion padding in FloatingPicker
- Removing most `@customizable` decorator usage. This change should reduce extra React dom elements from being created. Also updating `componentRef` resolution to support `React.createRef()` usage.

### Patches

- ResizeGroup: Optimize performance of initial render
- BasePicker: Fix a bug where the selection state would mutate inappropriately
- ScrollablePane: Add notifySubscribers in mutationObserver
- Use spread operator in PositioningContainer.styles.ts
- Fix check for Panel light-dismiss
- CalloutDismiss: Revert change that caused callout to dismiss when window focused

## 6.36.0
Mon, 16 Jul 2018 10:27:18 GMT

### Minor changes

- Convert GroupedList to CSS-in-JS

### Patches

- Refactors variants of DetailsList into individual component sub-pages

## 6.35.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to unbreak DetailsList d.ts changes.
- Button: Added menuAs to better support custom contextual menus
- DetailsList: Complete CSS-in-JS conversion.
- Edit to styled function call allowing customization with CalloutContent, DialogContent, and DialogFooter

### Patches

- Fix TextField clearing on render when value prop is undefined.
- Deprecate unused linkIsSelected Pivot style prop.

## 6.33.1
Thu, 12 Jul 2018 10:29:30 GMT

### Patches

- In focusable disabled state, no button should be able to execute key/mouse events. Added check for menuProps to existing handlers.

## 6.33.0
Thu, 12 Jul 2018 00:12:00 GMT

### Minor changes

- TextField: `id` prop now respected.

### Patches

- Respect the getMenuClassNames property on ContextualMenu
- CommandBar: Fixed iconOnly feature where empty text div was still rendered

## 6.32.0
Wed, 11 Jul 2018 05:16:03 GMT

### Minor changes

- DetailsHeader css-in-js conversion

### Patches

- Fixing detailsheader screen regression

## 6.31.0
Tue, 10 Jul 2018 21:54:07 GMT

### Minor changes

- Allow FloatingPicker to be a controlled component
- CommandBar: Mix in menuProps to overflowButtonProps

### Patches

- Implement new getFocusStyle option in ComboBox.

## 6.30.0
Tue, 10 Jul 2018 05:05:15 GMT

### Minor changes

- Converting ContextualMenu to MergeStyles step 2 - Style Conversion
- Coachmark: Add accessibility features to component, ARIA props, narrator support, and keyboarding controls

### Patches

- SearchBox: Move background color styling from searchbox input to searchbox root. Fixes #5477.

## 6.29.0
Mon, 09 Jul 2018 18:08:32 GMT

### Minor changes

- DetailsList - css-in-js styling
- Dismiss panel when clicking outside of the Panel component.

### Patches

- Don't select date by default when clicking on a month
- FacePile now uses semantic list tags.

## 6.27.0
Fri, 06 Jul 2018 19:07:51 GMT

### Minor changes

- Builds a new umd bundle suitable for manifest service
- HoverCard: Adds new prop 'openHotKey' to allow user to change the default key used to open the hover card when tabbing to it.

### Patches

- fixing webpack.config.js to only build production for the UMD / manifest

## 6.26.0
Fri, 06 Jul 2018 10:23:46 GMT

### Minor changes

- Converting ContextualMenu to MergeStyles step 1 - file structure
- Change the styling for ContextualMenu secondaryText from neutralTertiary to neutralSecondary for accessibility

### Patches

- MessageBar: class name calculations were not being done in the correct location, and were only valid on initial render. Now ensuring they're evaluated prior to render.

## 6.25.4
Thu, 05 Jul 2018 17:54:06 GMT

### Patches

- Hide persona image when showing UnknownPersonaCoin
- TeachingBubble: Fixed unscoped focus style

## 6.25.3
Thu, 05 Jul 2018 10:26:07 GMT

### Patches

- Fixed target index issue, when the dragged column is before the drophint
- Fix the text is cropped unexpectedly

## 6.25.2
Wed, 04 Jul 2018 10:28:27 GMT

### Patches

- Dialog: Fixing layout issue for IE11

## 6.25.1
Tue, 03 Jul 2018 17:41:15 GMT

### Patches

- Pivot: Ctrl+number doesn't work in Firefox to switch tabs if Pivot is focused.
- Dropdown: Substantially improve accessibility - in particular in single-select mode.

## 6.25.0
Mon, 02 Jul 2018 20:41:48 GMT

### Minor changes

- Convert TeachingBubble to use JS styling.

### Patches

- Checkbox: Updated hc hover states.
- Link: HC color for link rendered as a button.

## 6.24.0
Mon, 02 Jul 2018 10:21:36 GMT

### Minor changes

- DatePicker MergeStyles step 2 - Converts scss to js styles
- Convert Slider to merge-styles

## 6.23.0
Fri, 29 Jun 2018 10:24:05 GMT

### Minor changes

- Pivot: Convert to JS styling.
- ShimmeredDetailsList: adds a new wrapper for DetailsList when needed to be used with Shimmer animation.

## 6.22.0
Thu, 28 Jun 2018 10:23:21 GMT

### Minor changes

- Added arguments to styled function to allow the Customizer component to affect Nav

## 6.21.1
Wed, 27 Jun 2018 23:59:19 GMT

### Patches

- TextField: render undefined as empty string in renderInput

## 6.21.0
Wed, 27 Jun 2018 17:22:20 GMT

### Minor changes

- datepicker mergestyles conversion step 1
- Added as={Component} as a prop to Link
- Prettier fixes

### Patches

- Checkbox: Fix layout bug that causes `overflow`/`text-overflow` in Checkbox label to not take effect (#5224)
- Fix minor accessibility bugs in DetailsList
- Fix import paths to use relative paths for office-ui-fabric-react
- CSS changes for draggable columns, to show the gripper ICON only on hover

## 6.20.0
Tue, 26 Jun 2018 10:27:47 GMT

### Minor changes

- mergestyles conversion

### Patches

- Callout: add blur listener that only dismisses Callout if window loses focus
- ComboBox: Set Callout MaxWidth to be the width of the menu when useComboBoxAsMenuWidth when enabled
- Default shouldFocusOnMount value in BaseButton _onToggleMenu
- MessageBar: remove role property from multiline root div

## 6.19.0
Mon, 25 Jun 2018 10:28:13 GMT

### Minor changes

- Add a getGroupHeight prop to GroupedList + DetailsList
- GroupedList: add expandCollapseButtonProps to GroupHeader so an aria-label can be included"

### Patches

- Only apply padding to label if it's not an image/icon type

## 6.18.2
Fri, 22 Jun 2018 16:21:15 GMT

### Patches

- Buttons: Focusable disabled buttons no longer execute on ENTER/SPACE
- MessageBar: add class names for backwards compatibility
- Pivot: fixing a typing issue when used with proxies.
- Remove space from personaInitialsColorToHexCode magenta case
- Accessibility: using the down arrow key to navigate the command bar currently skips over the search box - added aria-hidden to the div containing the search icon
- TextField: placeholder text should be neutralSeconary.

## 6.18.1
Thu, 21 Jun 2018 19:27:25 GMT

### Patches

- Added column reorder with DragAndDrop support in Details List. As part of this feature, a new component DetailsColumn has been added inside the header, for each  column.  An optional new prop(ColumnReorderOptions) has been added to DetailsList to handle the column reorder. Have added column level drag subscriptions to be able to drag the columns, and added one header level subscription, to handle the drops. All the drag drop events are being handled at header level.
- Add high contrast styles to disabled contextual menu items

## 6.18.0
Wed, 20 Jun 2018 23:33:29 GMT

### Minor changes

- Make it possible to disable firstfocus in hover card
- Updated Checkbox and ChoiceGroup to accept custom styles
- label fluentstyles

### Patches

- fix clear input for BaseExtendedPicker
- Callout: revert blur change
- Adding a Teams customization example.

## 6.17.0
Wed, 20 Jun 2018 10:25:55 GMT

### Minor changes

- MessageBar: convert to use JS styling

### Patches

- Callout: add blur listener and dismiss on blur functionality to Callout
- GroupedList: render group headers if showEmptyGroups is true

## 6.16.0
Tue, 19 Jun 2018 10:26:26 GMT

### Minor changes

- Updated Link, Breadcrumb, and Dialog to accept custom styles

## 6.15.0
Mon, 18 Jun 2018 16:57:14 GMT

### Minor changes

- ComboBox: Change Style to allow options to overflow
- Textfield: Adding new optional `readOnly` prop.
- Add params to BaseButton openMenu to override focus props temporarily
- SearchBox: add optional aria label prop for clear text button and default to 'clear text'

### Patches

- ColorPicker: add aria-labels to textfields
- ContextualMenu/ComboBox/Dropdown: Fix up expand/collapse behavior so that collapsing menus is consistent
- ContextualMenu: Fixed the fact that uncheckable contextual menu items incorrectly possessed the `aria-checked` attribute.

## 6.13.2
Fri, 15 Jun 2018 14:44:02 GMT

### Patches

- Fix splitButton styling to not break existing usages and fix spinButton to make the contents focusable when disabled

## 6.13.1
Fri, 15 Jun 2018 10:18:10 GMT

### Patches

- Popup: overflowY set to undefined when not scroll

## 6.13.0
Thu, 14 Jun 2018 20:52:57 GMT

### Minor changes

- DetailsList/List: added method to get the index of the item in view
- Enable SelectedItemsList and ExtendedPicker to be controlled components
- WAC wants ability for Button and SplitButton to have focus while disabled so created a new flag allowDisabledFocus & implemented it on these two controls.
- OverflowSet: Convert from SASS to JS styles.
- ScrollablePane: Fix DetailsList example's DetailHeader not syncing scroll position.
- Updating Toggle to use `styled` for customizations.

### Patches

- Moved demo out of the codebase
- DetailsList: 'select all' checkbox is non-focusable in single selectionmode
- Fix broken documentation links
- Theme Generator: add additional accessiblity pair
- Temporarily disable component example snapshot tests.

## 6.9.0
Mon, 11 Jun 2018 10:18:35 GMT

### Minor changes

- Adding focus async to focus autofill when calling componentDidUpdate

### Patches

- Add styling output to component example snapshot tests.
- Add automatic snapshot tests for all component examples.
- Theme Generator: have json output contain only IPalette members

## 6.8.0
Fri, 08 Jun 2018 18:34:17 GMT

### Minor changes

- ColorPicker: use getStyles
- add style arg to customize
- Shimmer: Adds new Shimmer component to office-ui-fabric-react

### Patches

- TeachingBubble: Fix content from wrapping to next line unncessarily
- Dropdown: Add aria-label to option and option to aria-activedescendant
- Package: Fix sideEffects array to target scss files using global.
- ContextualMenu: Remove the ability for click to close a submenu. This aligns with windows behavior

## 6.6.1
Thu, 07 Jun 2018 17:40:07 GMT

### Patches

- SplitButton: apply button props to the focusable element for split buttons

## 6.6.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Add canRemoveItem callback
- FocusTrapZone: Added new capability. When `FTZ.focus()` is called, it will pass focus to a descendant element.  The new prop `focusPreviouslyFocusedInnerElement` controls the descendant-choosing behavior.
- Minor changes to improve server side rendering.

### Patches

- "Add selection zone for BaseExtendedPicker, and add screen reader support for suggestions"
- Update Coachmark basic example and fix TeachingBubble SCSS selectors
- Fix Detials column header hit targets
- Add global name to scss files using global selector to tag in sideEffects.
- Fixed FocusTrapZone bug: If first child in the FTZ is a FocusZone and that FZ's last focused child is not the first focusable child, shift-tab would break out of the FTZ.
- adding css fix to remove unnecessary scroll bars on calendar and datepicker components
- Theme Generator Page: update accessibility section to account for new logic for variants
- Theme Generator: untheme correctly when leaving theme generator
- Code format changes
- HoverCard: Removing unnecessary animation class causing a visual bug in IE browser.

## 6.5.0
Tue, 05 Jun 2018 10:23:03 GMT

### Minor changes

- Callout: Add `preventDismissOnLostFocus` prop.

## 6.4.1
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier
- CommandBarPage: Remove fabric js reference.
- _onValidate should only skip validation on text entry if state.value is undefined (it was skipping when text entry was empty string)

## 6.4.0
Mon, 04 Jun 2018 18:50:06 GMT

### Minor changes

- Revert PR 4897

## 6.3.0
Mon, 04 Jun 2018 10:16:13 GMT

### Minor changes

- Coachmark: Fix positioning bugs and add in support for different Coachmark directions.
- DetailsList: adjusting aria labels and exporting more ariaLabels in `IColumn` to allow for better narrator reading and table scanning.
- Dropdown: Allow `title` to be provided as an item property.
- Icons top level import was exporting a file path, should be exporting a package path.
- GroupedList: Added multiple customization entry-points including custom indent spacing and header customization.
- Allow for more control over event handling for keytips

### Patches

- Callout: fix dismissing events to attach to the documentElement, not body.
- SplitButton: Hook up aria-roledescription to splitButtons so that they can leverage that markup if it gets passed in to the component.
- SpinButton: addressing onValidate, onIncrement, and onDecrement callbacks to be called correctly.
- MessageBar: New color for dismiss / expand button in hc mode for better visibility.
- Updating react typings.
- Updated test snapshots

## 6.2.0
Fri, 01 Jun 2018 10:18:43 GMT

### Minor changes

- Added FocusTrapZone capability: When the FTZ is focused, it will pass focus to a descendant element.  The new prop 'focusPreviouslyFocusedInnerElement' controls the descendant-choosing behavior.

### Patches

- Fix ComboBox ARIA attributes.
- Prevent invalid empty ARIA values from being output.
- ComboBox: Fix the value that is checked when submitting a pending value to take into account if the aria-label is used as text. This line was missed in the initial change
- Add support for pointerup to dismiss keytips

## 6.1.2
Thu, 31 May 2018 10:18:58 GMT

### Patches

- MessageBar: fix color for X close button so that it is accessible
- Theming: generate a more accessible themeLighter and more accessibility pairs
- HoverCard: example fix for keyboard navigation to HoverCard target.

## 6.1.1
Wed, 30 May 2018 22:05:03 GMT

*Version update only*

## 6.1.0
Wed, 30 May 2018 20:28:34 GMT

### Breaking changes

- Selection utility: getSelectedIndices is now a mandatory member of the `ISelection` interface.
- CommandBar component has been replaced with the one from the experiments package.
- Checkbox: replaced optional properties of the `ICheckboxStyles` interface, removed `styles` and `getClassNames` from the `ICheckboxProps` interface, made the checkmark visible on hover, added high contrast styles.
- CommandBarButton: Supports custom styling and button aliasing. Interface improvements.
- ContextualMenu: Remove deprecated since v0.69 `icon` prop of ContextualMenu component.
- Positioning/Callout/ContextualMenu: Remove all deprecated props
- Minimum React version is now 16.3.2.
- Label and Toggle now support javascript styling. Improvements to Label and Toggle interfaces. Added Toggle and Label root aliasing.

### Minor changes

- ChoiceGroup: now supports customizable theming. Various bug fixes, cleanup within. Tests updated to use enzyme.
- Deprecate ContextualMenu's name prop in favor of new text prop.
- DetailsList: fieldName is now an optional field of IColumn.
- All `getStyles` properties accept either a function to return a style object, or a static style object

### Patches

- BaseButton: Make adjustment so that customclass names has precedence.
- CommandBarButton: High contrast hover state.
- CommandBar: Removed unnecessary endAligned styleprops and styles
- Port CommandBar accessibility fixes (PR #4686) to 6.0
- Positioning: correctly positon callout without beak
- Suggestions: Fix a bug where arrow keys would not scroll correctly

## 5.112.0
Wed, 30 May 2018 00:35:36 GMT

### Minor changes

- FocusZone: Added onFocusNotification API to notify creators of focus

### Patches

- Update local properties in BaseExtenededPicker on receiving new props
- CommandBar Example: More specific selector for text color to override the link styles we get from msgraph on the website.
- ComboBox: Update styling so that the "selected" item does not get the "selected" look when navigating through the potential options.
- Fix passing onclick from props for contextual anchor item

## 5.111.2
Fri, 25 May 2018 21:30:43 GMT

### Patches

- MaskedTextField: Added event callpack passthrough
- fix old error color SASS variables so they work when themed

## 5.111.1
Fri, 25 May 2018 16:53:47 GMT

### Patches

- Revisited the Multi-select Combo box initial state selection fix
- BaseButton sometimes has aria-labelledBy pointing to element that isn't in the DOM
- StickyPane: Replaced Array.From since it is not supported in IE

## 5.111.0
Thu, 24 May 2018 17:06:02 GMT

### Minor changes

- Pass SelectionZone props through DetailsList and add alternate data-selection-auto-selection attribute name
- add new semantic slot

## 5.110.0
Wed, 23 May 2018 16:14:26 GMT

### Minor changes

- ChoiceGroup: Reverting the updates to ChoiceGroup styling. We found some breaking changes in it, so we'd like to minimize partner impact by moving this to the 6.0 (next) release. Sorry for the trouble.

## 5.109.0
Wed, 23 May 2018 10:28:50 GMT

### Minor changes

- ChoiceGroup: now supports customizable theming. Various bug fixes, cleanup within. Tests updated to use enzyme.
- Converting Facepile SCSS to MergeStyles step 1 - file structure
- Common sass files are now exported in the `dist/sass` folder.

### Patches

- Fixing circular dependency and non-AMD references in ContextualMenu
- cleanup semantic slots

## 5.108.0
Tue, 22 May 2018 10:29:13 GMT

### Minor changes

- Implementation of experimental chiclet component

### Patches

- Revert IconButton hover/pressed background color change.
- Set 'margin 0' reset style for buttons in Safari in Fabric component
- CommandBarButton: Fixed split styles

## 5.107.0
Mon, 21 May 2018 10:29:16 GMT

### Minor changes

- Callout/Positioning: Fix a bug where max-height would be incorrectly calculated if covertarget was set

### Patches

- Added an addtional prop in IPickerItemProps for allowing focus on tagItem when picker is disabled
- Moved best design practices write up in SearchBoxes Overview to Best Practices for clarity that these are not included features

## 5.106.1
Fri, 18 May 2018 01:46:34 GMT

### Patches

- ContextualMenu: Make the whole menu always programatically focusable

## 5.106.0
Thu, 17 May 2018 22:02:40 GMT

### Minor changes

- Add data-selection-select behavior to make elements select rows before taking action

### Patches

- Fix Slider import, make specific to Styling

## 5.105.0
Thu, 17 May 2018 20:12:39 GMT

### Minor changes

- Part 1 of converting Slider to mergeStyles
- Add enter/exit keytip mode to KeytipManager
- Added support in textfield for aria-describedby native prop

### Patches

- Suggestions: Fix a bug where arrow keys would not scroll correctly

## 5.104.0
Thu, 17 May 2018 10:28:07 GMT

### Minor changes

- ContextualMenuSplitButton: Adding the correct attributes for screen readers to read the button correctly

### Patches

- TextField: Invoke custom description render function if provided even if no description text provided.

## 5.103.0
Wed, 16 May 2018 00:05:17 GMT

### Minor changes

- Buttons: Deprecate `description` prop in favor of more consistent `secondaryText` prop.

### Patches

- Fix markdown file paths on SwatchColorPicker docs page.
- Finishing the rest of the Calendar style updates
- Fix detailslist custom group header example by invoking correct onClick for select and collapse toggles.
- Fix misuse of aria props on ProgressIndicator

## 5.102.0
Tue, 15 May 2018 07:09:49 GMT

### Minor changes

- Deprecate ComboBox's value prop in favor of new text prop.

### Patches

- Fix bug where primaryDisabled is not respected on contextual menu items
- Dropdown: Remove aria-autocomplete and aria-readonly
- Pivot: Slight tweak to the `PivotItem` compare to ensure it works in minified scenarios.
- shouldVirtualize takes incoming properties

## 5.101.2
Mon, 14 May 2018 20:46:25 GMT

### Patches

- fixes type comparing in Pivot

## 5.101.1
Mon, 14 May 2018 19:35:51 GMT

### Patches

- Ensure subMenuHoverDelay is respected by the ContextualMenu for expanding and dismissing submenus
- Fixes issue where expanding sub menu via arrow keys was broken, and adds aria label of "menu" to item when keyboarded

## 5.101.0
Mon, 14 May 2018 10:14:42 GMT

### Minor changes

- Pivot: include className in props to override styles
- Add more customization hooks to ProgressIndicator

### Patches

- Breaking BaseButton Types dependency from ContextualMenu class

## 5.100.0
Fri, 11 May 2018 04:21:29 GMT

### Minor changes

- Deprecate Persona's primaryText prop and add replacement text prop.
- Puts additional alert on selected suggestions behind a prop

### Patches

- Revert change to use React.createPortal, until event leaking issues can be resolved

## 5.99.0
Thu, 10 May 2018 10:27:25 GMT

### Minor changes

- Add secondaryText to ContextualMenuItem to render on the right of item.name (text)
- MarqueeSelection: Added `getStyles` function.
- Added overflowMenuProps property to CommandBar

### Patches

- Even if a ComboBoxOptionWrapper component doesn't update (shouldComponentUpdate returns false), children functions are still being executed unnecessarily, which can cause performance issues. This can be avoided by passing in a reference to a function that returns the children elements, instead of returning the elements themselves.
- Fix index import

## 5.98.0
Wed, 09 May 2018 15:42:02 GMT

### Minor changes

- FocusZone: Add a prop to allow a FocusZone to not let focus events propagate outside of the FocusZone
- Added support for special casing UnknownPersona coin

## 5.97.1
Tue, 08 May 2018 18:18:47 GMT

### Patches

- BaseButton: Allow Alt + Down on menu buttons to open the menu

## 5.97.0
Tue, 08 May 2018 10:17:01 GMT

### Minor changes

- Remove redundant defaultSelectedItem prop for BaseExtendedPicker
- Icon: undoing breaking change with regards to making `IIconStyles.root` required, adding tests to ensure backwards compatibility.
- Mark Slider's ValuePosition enum as deprecated as it is unused.
- Add ContextualMenuItem functions to open and close menus
- Fixes issue where focus isn't displayed correctly on the contextual mneu
- SearchBox: New prop for turning off icon animation.
- Layer: Use React Portals if available

### Patches

- Popup: Added check for onBlur to prevent focus setting focus to be disabled in chrome
- Fix breadcrumb rendering issue when overflow index is at last

## 5.96.1
Mon, 07 May 2018 10:28:20 GMT

### Patches

- High contrast hover states: Breadcrumb, Button, ComboBox, Link, Nav, Pivot, SearchBox, SpinButton, Toggle.
- Keytips: Minor update to improve behavior
- Remove keytip positioning workaround since Callout positioning was fixed
- In the TextField component, The code setting the 'errorMessage' state to an empty string in the _onInputChange member function was removed do to causing the message to flicker.

## 5.96.0
Fri, 04 May 2018 15:58:39 GMT

### Minor changes

- ScrollablePane: Optimizations on how component functions.  Change positioning from inheriting height/maxHeight of parent element to use position: absolute
- Icon: code has been cleaned up, memoizeFunction usage has been removed.
- Rating: Hover states in regular and high contrast mode.

### Patches

- Fix ensureSuggestionModel null ref, get rid of unneeded FocusZone in BaseExtendedPicker, remove requirement in BaseExtendedPicker that suggestions are shown when input is focused (only clicked)
- Positioning: Fix cover positioning so it returns the correct edge to handle menu shrinkage
- Fix TooltipHost mutation of calloutProps.
- SpinButton: Remove browser autocomplete
- Using the proper preview text to set the aria label on combobox options. I previously had this change, but I accidentally reverted it during a merge.

## 5.95.0
Wed, 02 May 2018 23:55:40 GMT

### Minor changes

- SplitButton/ComboBox: added onTouch support for menu expansion.
- Add Keytip, KeytipLayer, and KeytipData component

### Patches

- If firstFocus on HoverCard is set then propagate it to setInitialFocus in ExpandingCard. This enables focusing the card on render.
- TextField can now render the numeric value 0

## 5.94.0
Tue, 01 May 2018 19:26:35 GMT

### Minor changes

- Theme Generator: use HSV for generating shades/tints

## 5.93.0
Tue, 01 May 2018 10:23:32 GMT

### Minor changes

- DatePicker: Add a reset function to the public `IDatePicker` interface.
- move extendedPicker, floatingPicker, and selectedItemsList to OUFR
- Tooltip: updated to use customizable styling via `getStyles`.
- List: Added list scrolling modes

### Patches

- Breadcrumb: Updating breadcrumb to user js styling.
- Added onClick handler to rating star in the Rating component that calls _onFocus redundently for support with Firefox & Safari on OSX.
- details link contrast issue

## 5.92.1
Mon, 30 Apr 2018 21:22:55 GMT

### Patches

- Revert isEqual check in List.

## 5.92.0
Mon, 30 Apr 2018 10:16:44 GMT

### Minor changes

- Contextual Menu: moved out the split button to be its own component, ContextualMenuSplitButton
- Use theme flag to control global classes

## 5.91.0
Fri, 27 Apr 2018 10:15:52 GMT

### Minor changes

- Added optional className property to Calendar

### Patches

- Fix #3607
- Add a option for custom dividerAs to get item information while rendering

## 5.90.0
Thu, 26 Apr 2018 10:12:34 GMT

### Minor changes

- Complete ProgressIndicator conversion to mergeStyles. Add `barHeight` to enable changing height of progress bar.
- Pickers: Several fixes regarding certain props

### Patches

- Fix props validation for Breadcrumb
- Gate calendar month, year, and today keydowns for only ENTER as onClick handles space with button nodes to fix double date change regression.

## 5.89.0
Wed, 25 Apr 2018 05:32:09 GMT

### Minor changes

- Fabric: the isFocusVisible class is no added to the Fabric component again, to preserve backwards compatibility. Also fixing index file to export the types.
- Fix theme slots for DetailsList header colors
- Enabled native props (aria-* and data-*) on OverflowSet even when the doNotContainWithinFocusZone prop is false

## 5.88.0
Tue, 24 Apr 2018 10:12:58 GMT

### Minor changes

- fixing selection bugs in Calendar component, updating styling for new designs
- Begin converting Pivot to mergeStyles

### Patches

- Use `data-is-scrollable` attribute on correct ScrollablePane div

## 5.87.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- Updating the focus styling to use the generalized `ms-Fabric--isFocusVisible` classname. This is one step closer towards removing the `Fabric` component wrapper requirement.
- Plumb ARIA label for picker suggestion remove button

### Patches

- ContextualMenu: in item root styling, replaced `font: inherit` with the appropriate font style from the theme.
- Updating a snapshot test.
- Adding check to focusTrapZone to only restore focus on close if focus was still inside the focusTrapZone
- Deprecates INavLink.iconClassName in favor of IIconProps.className.

## 5.86.0
Fri, 20 Apr 2018 23:06:06 GMT

### Minor changes

- Added support for zero star situations in the Rating component.  Before it would write out a star for  the number zero showing 6 stars when there should be 5.
- Add onRenderIcon prop to IContextualMenuItem to allow override icon render for contextualMenuItem.

### Patches

- Callout.Basic.Example: Fix example so callout positions properly
- Propagate onRenderInitials correctly from Persona to PersonaCoin

## 5.85.0
Fri, 20 Apr 2018 10:12:34 GMT

### Minor changes

- TextField: Implemented input masking.
- add onRenderDescription to TextField
- Added support for native props on Panel for the root div with class ms-Panel
- Added headerButtonProps prop to PivotItem to allow passing native props (data-* & aria-*) to the header/link/CommandButton element. Also depricated linkText and added headerText for semantic purposes.

### Patches

- DetailsRow: applying `flex-shrink:0` to the check cell to prevent it from squishing in the flex layout.
- Revert unintended changes to Dropdown styles from #4512

## 5.84.0
Thu, 19 Apr 2018 18:25:59 GMT

### Minor changes

- Add the option of collapsing breadcrumb overflow items into a position other than the first one
- ComboBox: Add Event as additional paramater to onChanged callback for saving pending changes

### Patches

- Remove usage of Number.isNaN from SpinButton.tsx since it doesn't exist in IE11
- Update createRef to match React.createRef api
- Remove unused variables and re-enable no-unused-variable for office-ui-fabric-react

## 5.83.0
Thu, 19 Apr 2018 00:17:37 GMT

### Minor changes

- ActivityItem: Added the pulsing beacon animation for the compact size.
- SearchBox: Clicks on element before input field set cursor to start of input text.

### Patches

- ChoiceGroup: Style polish for focus, high contrast focus, and high contrast hover.
- Fix PersonaCoin index import
- Updates aria-owns on BasePicker (and snapshot tests) so its only set when suggestions are rendered

## 5.82.4
Wed, 18 Apr 2018 17:02:26 GMT

### Patches

- ContextualMenu: Update mousemove to only do anything if there is not another pending mouse enter/move/leave to improve the snappiness of the updates

## 5.82.3
Wed, 18 Apr 2018 10:15:04 GMT

### Patches

- Convert documentation to markdown for HIG.
- Revamp Themes documentation
- Passes item when href set onClick for CommandBar control

## 5.82.2
Tue, 17 Apr 2018 18:47:11 GMT

### Patches

- Fix improper imports from index files
- Mark Panel content as scrollable

## 5.82.1
Mon, 16 Apr 2018 21:49:29 GMT

### Patches

- Do not call the onMenuClick on every keyDown event

## 5.82.0
Mon, 16 Apr 2018 10:23:26 GMT

### Minor changes

- Contextual Split Button: Change styling to only have one split button container instead of two
- Changed Dropdown components role from combobox to dropdown
- Bring back isResultsFooterVisible that is props but never used.
- ContextualMenu/Button: Improve perf and add hiddenvariable to buttons
- Add ability to use Customer to provide a default layer host
- Fabric component: all logic that was in the component has moved to a helper which is initialized within BaseComponent. This ensures that focus rectangles show up even if you don't use the Fabric wrapper.
- Set Panel's FocusTrapZone prop isClickableOutsideFocusTrap to true by default to allow click interactions while panel is open
- Upgrade to TypeScript 2.8.1

### Patches

- Add focus method to Breadcrumb
- Fix scroll bar shows when it should not.
- Fix style and alignment issues with DetailsList headers
- Add new component page prop for editing on GitHub.
- SpinButton: Make sure up/down Arrow do not leave the spinButton
- Handling the scenario where embedded text is passed in as the option's text. In This case, the ariaLabel prop will be displayed in the input and used for autocomplete matching. The value rendered in the menu will not change.
- Wrapping combobox options in an internal component which only performs an update if the props have changed. We are currently updating every option on every mouse or keyboard event. This gives awful performance in comboboxes with many elements.
- Adds tests for DocumentCardTitle title truncation
- Add focus method to Pivot.
- FocusZone: redoing the "reset alignment on mouse down" change in a less intrusive manner, with test coverage.
- Removing module entry until we change `lib` to output es6 modules in 6.0. If you would like tree shaking to work, please use webpack aliasing to alias `{packageName}/lib` to `{packageName}/lib-es2015`. In 6.0, we will change `lib` to be es6, so that current partners will just get tree shaking out of the box without aliasing.
- Prevent SelectionZone from interfering with links and buttons
- Added missing role to TagPicker's TagItem.
- FocusZone: undoing the "click" change, which was causing non-focusable targets to be tracked as the "active" element. This created side-effects such as elements becoming focusable upon clicking them more than once, leaving behind unexpected focus outlines.
- Updating build to React 16.3.1.
- DetailsList: Starting aria-rowIndex from 1 instead of 0 as mentioned in https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex
- ColorPicker: text fields now update when `alphaSliderHidden` is `true`.

## 5.81.1
Thu, 12 Apr 2018 15:59:01 GMT

### Patches

- Coachmark: The pulsing beacon animation moved to the Styling package.

## 5.81.0
Thu, 12 Apr 2018 10:15:54 GMT

### Minor changes

- Link: fix the style interface

### Patches

- FocusZone: updating to update alignment on click.
- SplitButton: Allow the primary portion of a splitButton (when it a menu) to collapse a submenu
- DatePicker: Remove extra asterisks, includes using TextField's label.
- Updating various `componentRef` values to refer to the component public interfaces, rather than to the components themselves.
- SearchBox: Fix padding left and add padding top and bottom to fix the field overlapping the border.

## 5.80.0
Tue, 10 Apr 2018 17:37:28 GMT

### Minor changes

- FocusTrapZone: Add KeyDown callback (in line with FocusZone)
- OverflowSet: Add Foucs(firstChild) and focusElement() functions
- Convert Persona and PersonaCoin and PersonaPresence to  mergeStyles. Create IPersonaSharedProps for props that apply to Persona and PersonaCoin and PersonaPresence. Other refactors.

### Patches

- Re-focus DatePicker input after calendar is closed
- Contexual Menu: Move SplitButtonContainer to be defined in the constructor instead of ComponentDidMount
- Dropdown: color of caretDown changed to highlighttext on focus
- Fix IconButton state styles
- ComboBox: Make focus wrap in in the menu (to align with dropdwn and customer feedback)_
- Split PersonaCoin and PersonaPresence files for more consistency.
- Move sub-components to sub-folders
- Fix for tooltip host css changes

## 5.79.1
Fri, 06 Apr 2018 10:25:55 GMT

### Patches

- Stops event propagation of Esc keypress on DatePicker

## 5.79.0
Thu, 05 Apr 2018 10:15:39 GMT

### Minor changes

- Added dividerAs prop to Breadcrumb component allowing the user to pass a custom icon to be used as the trail divider icon.
- Add the ability to use custom props for the panel used to render options on small devices.
- Panel: pass ID for header text element to custom renderer
- Callout/Positioning: Improve callout perf with hidden flag and improve repositioning logic

### Patches

- ComboBox: Adding support for Alt or Meta + Up to close menus
- Fix SearchBox background color.
- Fixes bug with undefined reference
- Fixing bug dialog content does not grow fully to take up all the space provided by parent
- Make the link button selectable.

## 5.78.0
Tue, 03 Apr 2018 10:16:05 GMT

### Minor changes

- Brings changes to DetailsList, DetailsRow and DetailsRowFields to enable use of a basic Shimmer.

### Patches

- Fix phantom scrollbar in Panel popups in Firefox
- Adding a longer delay as an option to the tooltip comonent. Before there was only a medium (300ms) or zero (0ms) delay.

## 5.77.0
Mon, 02 Apr 2018 22:15:06 GMT

### Minor changes

- Make tooltip interactable if given a delay before closing.

### Patches

- Add overflow control to ms-Document-details

## 5.76.0
Sat, 31 Mar 2018 17:40:00 GMT

### Minor changes

- OverflowSet: Allow the OverflowSet to not be contained within a FocusZone

### Patches

- DetailsList: link color too close to selected background in high-contrast-white
- We need to temporarily remove `sideEffects: false` flag from package.json which will disable webpack 4 tree shaking until we can identify a good fix for it to not shake out the scss files.
- Dropdown: aria role is `listbox` instead of `textbox`
- Pickers: fix bug where suggestions wouldn't have correct value selected
- Updating the split button to close the menu when the primary button is executed.
- Pickers: Fix focus problems and scroll issues

## 5.74.0
Wed, 28 Mar 2018 19:26:19 GMT

### Minor changes

- Use markdown-to-jsx for ActivityItem documentation

## 5.73.0
Wed, 28 Mar 2018 10:16:39 GMT

### Minor changes

- Persona: adding `allowPhoneInitials` prop to allow for calculating initials from phone numbers.

### Patches

- ContextualMenu: SplitButtons in ContextualMenus are incorrectly using the menuLauncher portion of the splitButton for the tagrate when the  menuLauncher portion is  activated. This can lead to weird overhangs of the parent menu even if  directionalHintFixed is not true (e.g. it will overlap the primary portion of the  splitButton and potentially other items in the parent menu)

## 5.72.0
Tue, 27 Mar 2018 20:22:53 GMT

### Minor changes

- add isSelectedOverride to suggestionItemProps
- ContextualMenu / Split Button: Fixed styling problems For centered button content.
- Use markdown-to-jsx for ActivityItem documentation

### Patches

- Checkbox: label text should be selectable, but not the checkmark icons.

## 5.71.0
Tue, 27 Mar 2018 10:14:03 GMT

### Minor changes

- Deprecate SearchBox defaultValue prop.

### Patches

- Dropdown: do not select disabled items on keydown
- FocusZone: Align props to HTMLElement to be consistent
- TextField, Panel: Deprecated componentId prop.
- BasePicker: suggestions should not be shown in BasePicker when input does not exist.
- In Panel component, isClickableOutsideFocusTrap should not be overriden back to false if it's already set to true in focusTrapZoneProps.
- MessageBar: For single line, put dismiss button after action buttons.
- ComboBox: Removed a redundant property from the basic example.

## 5.70.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` flags on all applicable packages.

### Patches

- DetailsHeader: reverting how maxWidth is handled to previous behavior.
- Fix bug in combo box where _selectedElement ref wasn't being set conditionally
- Update componentRef types
- ComboBox: Add some code comments. Minor bug fixes to the example page.

## 5.69.0
Fri, 23 Mar 2018 01:29:21 GMT

### Minor changes

- Introduced focusAsync for cheaper element focusing, and made FocusTrapZone utilize it
- Add multiSelect capability for ComboBox

### Patches

- DetailsList: reset focusedItemIndex after setKey changes to fix scrolling after folder navigation
- Dropdown: onKeydown should check for defaultPrevented, not preventDefault.
- Removed focusability on buttons for split buttons and spin buttons
- Remove the redundant tooltip in a Dropdown command button

## 5.68.0
Thu, 22 Mar 2018 10:14:03 GMT

### Minor changes

- ,

### Patches

- Provide compact timestamp style for ActivityItem
- Removes @autobind from examples
- Removing empty callout when tooltip content is empty

## 5.67.0
Wed, 21 Mar 2018 10:18:30 GMT

### Minor changes

- Reordered the logic in CommandBar that decides to render an anchor or button tag so that the anchor tag can have both an href and onclick attribute.
- Add `hasFocus` api in `SearchBox` that returns a flag indicating whether `SearchBox` has focus or not.

### Patches

- DetailsList: headers now resize correctly and respect maxWidth.
- Toggle: Updating to use flexbox positioning
- TextField: Fixing issue with promise based error message not being announced by firefox + NVDA

## 5.66.0
Tue, 20 Mar 2018 10:27:37 GMT

### Minor changes

- Button: Added public openMenu method and cleaned up open/close functions
- Updates refs to use createRef object references
- Javascript styling for Spinner
- CommandBar changed the title attribute to render as tooltip and added readonly state (visitable by keyboard, functionally disabled)

### Patches

- Add shouldInputLoseFocusOnArrowKey callback for scenario to determine if input should loose focus when arrow key is present when Tabbing is enabled on All elements or Input elements
- FocusZone: adding `shouldInputLoseFocusOnArrowKey` optional callback for scenarios where user press an arrow key on an input element and want it to loose focus when FocusZone disables moving focus away in case when FocusZoneTabbableElements is set to All or none
- Fixed bug with HC colors in icons in menus.

## 5.65.0
Mon, 19 Mar 2018 10:27:55 GMT

### Minor changes

- ThemePrimary: Updating this color along with an Office branding update.

### Patches

- DetailsList: scrollbars show up unnecessarily on IE11
- Button: High contrast mode focus bug fixes.
- Use arrow function properties instead of @autobind

## 5.64.4
Fri, 16 Mar 2018 10:28:03 GMT

### Patches

- Button: fixed bug causes by onRenderDescription pulling from this.props instead of passed in props
- BaseButton: removing autobind usage.
- Added _isSelectionDisabled check in SelectionZone's onMouseDown event handler
- Pickers: Allow onItemSelected to return null
- Nav component sets aria-label on nested element with role=navigation
- ContextualMenu: Allow anchor menu items to have sub menus. Added prop for sub menu hover delay.
- Export LinkBase from OfficeFabric/Link/index.ts

## 5.64.3
Thu, 15 Mar 2018 10:37:10 GMT

### Patches

- TextField: Enabled scrolling and resize when disabled

## 5.64.2
Thu, 15 Mar 2018 02:42:27 GMT

### Patches

- Targeted the aria-labelledby on ChoiceGroup's input field to the span tag inside the span tag inside label ( option.labelId ) instead of thelabel itself ( option.id ).

## 5.64.1
Wed, 14 Mar 2018 10:28:26 GMT

### Patches

- Theme generator: exposing to the website.

## 5.64.0
Tue, 13 Mar 2018 10:17:37 GMT

### Minor changes

- Added an is-open class to the DatePicker root element to indicate when the datepicker is being shown based on the IDatePickerState.isDatePickerShown state property.
- Added documentation for components that allow native props

### Patches

- Pickers: Fix aria bug where activedescendant would be sug--1

## 5.63.0
Mon, 12 Mar 2018 06:29:20 GMT

### Minor changes

- Add rel option for Contextual Menu Items
- ComoboBox and SpinButton: Removing excess margins and padding to make them consistent with TextField.
- Facepile: Added `overflowPersonas` option to better control what personas go into the overflow personas vs show up as a persona coin. Also adjusted Facepile back to showing a Persona control if there is only one persona to be shown with no overflow.
- importing hoistStatics from Utilities for withResponsiveMode decorator
- Add ability to get and set scroll position on ScrollablePane
- DetailsList: IColumn `onColumnClick` callback args marked non-optional.

### Patches

- Updating a test to ensure that focus is trapped in a FocusTrapZone when it has a FocusZone as the last element
- [TextField] onChange fix for IE when using multiline with placeholder
- Run onCellFocused before unmount and before select color

## 5.62.1
Fri, 09 Mar 2018 15:07:28 GMT

### Patches

- Add unit test to catch focus regression being fixed by this PR

## 5.62.0
Fri, 09 Mar 2018 11:13:58 GMT

### Minor changes

- Allow DetailsRow to have a custom renderer
- Dialog: convert to mergeStyles part 2.

### Patches

- Fixes #3985 by removing HC style override on ms-Link buttons.

## 5.61.0
Thu, 08 Mar 2018 11:27:24 GMT

### Minor changes

- Added the @customizable decorator to Image and Layer to enable theme functionality
- MessageBar: Aria label for truncated text overflow button and added aria labels for buttons in examples.

### Patches

- ComboBox adding onPendingValueChanged callback prop to run when pending value is changed
- Seperated the SCSS for Persona and Persona Coin components due to bloat when imported twice.

## 5.60.1
Wed, 07 Mar 2018 11:16:50 GMT

### Patches

- Fix ContextualMenu customization sample
- TeachingBubble: New animation for bounce with fade in.

## 5.60.0
Tue, 06 Mar 2018 11:13:36 GMT

### Minor changes

- Add async debounce option to BasePicker

### Patches

- Facepile: Conditionally apply `aria-describedby` only when `ariaDescription` is provided

## 5.59.1
Tue, 06 Mar 2018 02:06:59 GMT

### Patches

- Temporarily commented out @customizable decorator in Image component to restore usage of static functions and variables.

## 5.59.0
Mon, 05 Mar 2018 11:16:58 GMT

### Minor changes

- Converting Image SCSS to MergeStyles step 2 - style conversion

### Patches

- Fix issue 3608: DetailsList horizontal scroll due to cellSizer
- Nav: Wire nav link to expand/collapse behavior if it has no URL but has children.
- Fixed aria-describedby bug causing it not to render properly
- Removes unused variables
- GroupedListSection: Changed the list ref name from `list` to `_list`

## 5.58.0
Fri, 02 Mar 2018 11:25:35 GMT

### Minor changes

- ChoiceGroup: Flex layout for icon and image fields.  Fixed some image field bugs.
- Upgrade to TypeScript 2.7.2
- Allowing Nav Links to specify iconProps
- added More items aria label

### Patches

- DetailsList: only adding `aria-selected` when `selectionMode` is set to `none`.
- Dropdown: Fixed custom render option in multi select.
- Callout: move animation inline to greatly improve perf
- make sure disabled links are non-navigable
- DocumentCard: Change it to use set theme
- ProgressIndicator: adjusting css so that the gleam doesn't go outside the indicator boundary.
- Allowing use of Elements as target prop for Callouts and ContextualMenus
- CommandBar: Fixed case where commandItemWidths would be null
- SpinButton: Updated styling to be consistent with Button and TextField
- SearchBox: Deprecated `labelText` for `placeholder`.
- Fix infinite recursion in scrollable pane
- Added is-selected and is-expanded semantic classes to compositelink style sets
- Searchbox: Removed non-localized default placeholder string.
- BasePicker: check for null reference before checking value of `this.suggestionElement`.
- only mount spinner component when necessary

## 5.57.0
Thu, 01 Mar 2018 11:12:54 GMT

### Minor changes

- Added index import for base files in Layer, Nav, Image, ScrollablePane, ResizeGroup, and Rating components so unstyled component can be used.
- Converting ResizeGroup SCSS to MergeStyles step 2 - style converstion

## 5.56.1
Thu, 01 Mar 2018 00:05:10 GMT

### Patches

- Fix an issue on IE11 where Autofill would swallow some keystrokes if typing quickly enough
- CoachMarkStyles: Use ... instead of assign for IE compatibility
- FocusZone: isDefaultPrevented is now respected.
- GroupedList: Chevron css no longer uses ms-icon

## 5.56.0
Wed, 28 Feb 2018 11:15:45 GMT

### Minor changes

- Convert Dialog to mergeStyles, part 1 - file structure
- Dialog: Converting to mergeStyles part 1.2 - sub component file structure.
- Prepare Persona for conversion to merge-styles

### Patches

- ContextualMenu: Update Hover/Focus Behavior around expanding/collapsing Submenus
- SplitButton: ENTER/SPACE should execute the primary button when focus is on the whole splitButton

## 5.55.3
Tue, 27 Feb 2018 22:56:59 GMT

### Patches

- ComboBox: Shortened and centered the input field to account for overlap that appears at some resolutions.
- Toggle color fixes
- Fixing direct references to @uifabric which breaks AMD
- Fixing reference of 'utilities/contextualMenu' to point an actual file.
- Allow ScrollablePane to accept native properties.
- Make ScrollablePane._sortStickies change elements only when needed.
- Fix this.root undefined issue in Sticky component.

## 5.55.2
Tue, 27 Feb 2018 06:33:39 GMT

### Patches

- DatePicker calls onDateSelected then AfterMenuDismissed to follow the same pattern as BaseButton
- ColorPicker: internal ref issue was fixed, which lets colors be picked a little better.

## 5.55.1
Sat, 24 Feb 2018 05:10:13 GMT

### Patches

- Fix SplitButton rendering issue in ContextualMenu
- ComboBox: Added property to set ComboBox's button's data-is-focusable attribute.
- ContextualMenu: Import ContextualMenuUtility/index directly instead of folder.
- [Focus] Enable focus forceIntoFirstElement parameter
- [DetailsList] Fixed test by mocking visiblity
- [ContextualMenu] Disabled buttons are focusable
- Convert Check to mergeStyles
- Button: reverting previous tweak to fix ComboBox dropdown selection styling.

## 5.55.0
Fri, 23 Feb 2018 03:05:53 GMT

### Minor changes

- add optional custom rendering of items for ContextualMenu
- Focus Zone: Add support for tab to skip selection elements
- SelectionZone: deprecating `layout` as it is no longer in use. Removing `SelectionLayout` as it is not required.

### Patches

- Nav: fix multiple invocations of onClick
- minor fixes to theming

## 5.54.0
Thu, 22 Feb 2018 11:15:23 GMT

### Minor changes

- Fix Scrollable-Pane getComputedStyle error - changing timeouts to use this._async.setTimeout to ensure this.refs isn't used after componentWillUnmount
- FocusZone: Add the ability turn off directional wrapping on sections of a FocusZone
- Convert Layer component to mergeStyles
- Converting SCSS to MergeStyles step 2 - style conversion
- Add imageErrorAs to IIconProps

### Patches

- Enable variable-name and jsx-boolean-value tslint rules
- Calendar: changing refs to componentRef.
- DatePicker-onAfterMenuDismiss callback created
- DatePicker - Adding public focus method
- [TextField] Set input size to 1
- [TooltipHost] Inline display for when overflow mode is on"
- Updated contextual menu to pass the correct number
- Contextual Menu - Added aria-posinset and aria-setsize to split buttons

## 5.53.0
Wed, 21 Feb 2018 11:12:11 GMT

### Minor changes

- added support for aria-posinset and aria-setsize
- Converting Image SCSS to MergeStyles step 1 - file structure
- SwatchColorPicker: Improve keyboard/mouse behavior
- Convert Dialog to mergeStyles, part 1 - file structure
- Converting Nav SCSS to MergeStyles step 1 - file structure
- Converting ResizeGroup SCSS to MergeStyles step 1 - file structure
- Converting SCSS to MergeStyles step 2 - style conversion
- make onShouldVirtualize work for grouped list

### Patches

- Enable jsx-key tslint rule
- Only apply 'pointer-events: none' to disabled Link components if there is an href
- Dialog: default modal props now respective (Modal rendered with light background.)
- Buttons: moving className lower in the merge list so that it has more precedence than default rules.
- Rating: Adding `type=button` to Rating buttons.

## 5.52.0
Sat, 17 Feb 2018 21:29:00 GMT

### Minor changes

- Converting SCSS to MergeStyles step 1 - file structure

### Patches

- Add notifyPageChange function to List
- Cleaning up a console.log in CommandBar.test.tsx that I noticed while updating snapshots
- Fixes useTargetWidth prop for ContextualMenu
- Convert overlay and examples to mergeStyles
- DetailsList: Groups are now considered for aria-rowcount.

## 5.51.0
Fri, 16 Feb 2018 11:23:29 GMT

### Minor changes

- Added enum for triggering menu with arrow keys and bool to allow it or not
- Migrating Coachmark to main office-ui-fabrc-react package and adding a beak compoentn as well as updating  the experimental component PositioningContainer to reflect some of the latest bits in  Callout
- FocusZone.Focus now respects forceIntoFirstChild parameter and  IFocusZone.ts has been updated to reflect this
- Link: Update to use merge-styles

### Patches

- Fix bug: '#3942 Fixed controlled TextField with multiline and autoAdjustHeight does not adjust when setting value via state'
- SearchBox: adding unit test and tweaking how the value is read from ev rather than the element itself.

## 5.50.0
Wed, 14 Feb 2018 22:10:50 GMT

### Minor changes

- Add "use current input command" and remove need to explicity call focus when moving between suggestions and commands
- Add clearButtonProps prop to SearchBox.types.ts with the IButtonPropsType. This is passed to the icon button in SearchBox.base.tsx
- SearchBox: Fixed getStyles interface to be using ISearchBoxStyleProps instead of ISearchBoxProps

### Patches

- Fix bug: '#3940 Validate function works incorrect with attribute validateOnFocusOut'
- Converted ButtonBasicExample to use mergeStyles instead of SCSS.
- Fix ComboBox, ContextualMenu, Teachingbubble overwriting calloutProps.className
- Fire onKeyDown for Button with menuProps
- Fabric: Adds button overflow visible global style so that ie11 renders like edge/chrome/firefox
- DatePicker: Fixing pointer when datepicker doesn't have a label
- ComboBox: Add getClassNAmes prop to allow complete customization of the component
- CalloutContent: Remove calloutWidth from calloutMain
- SpinButton: Add getClassNAmes prop to allow complete customization of the component
- Fix aria-owns in contextual menu items, and add appropriate aria properties to CommandBar items.

## 5.49.3
Tue, 13 Feb 2018 11:24:05 GMT

### Patches

- Contextual Menu - adding support for aria-setsize and aria-posinset for rendering menu items that relies on the menu item's own rendering
- Moves DatePicker label outside of hit target
- Add name attribute to button

## 5.49.2
Mon, 12 Feb 2018 17:33:11 GMT

### Patches

- presence indicator does not influence layout of Persona

## 5.49.1
Mon, 12 Feb 2018 11:14:02 GMT

### Patches

- Fix issue where CommandBar chevron doesn't change color with rest of control when disabled
- DetailsList: fix disappearing line when hovering on column header

## 5.49.0
Fri, 09 Feb 2018 18:11:52 GMT

### Minor changes

- ChoiceGroup: More flexible image field sizing, default image size, large image class.

### Patches

- Allowing for contextual and menus to be closed on Alt keys
- Rating: Renamed RatingBase.tsx to Rating.base.tsx to match convention

## 5.48.2
Thu, 08 Feb 2018 11:13:51 GMT

### Patches

- Return empty initials for phone numbers

## 5.48.1
Thu, 08 Feb 2018 02:29:26 GMT

### Patches

- Callout/Positioning: Fixed a bug where callout would lose alignment for some hints in rtl
- Callout: Move positioning to inline styling

## 5.48.0
Wed, 07 Feb 2018 11:23:59 GMT

### Minor changes

- SearchBox: Export base component as well as styled

### Patches

- Remove duplicate export of command button from the button index
- [Spinner] Use rotateZ to stop the spinner from wiggling in IE
- Fixing direct reference to @uifabric/utilities/lib from ResizeGroup
- SearchBox: minor correction in hover styles.

## 5.47.0
Tue, 06 Feb 2018 11:14:36 GMT

### Minor changes

- BaseAutofill: Move to it's own component

### Patches

- fix deselect all in suggestionsController
- DetailsList: Adding optional callback aria-describedby for each item in DetailsList

## 5.46.0
Mon, 05 Feb 2018 11:24:23 GMT

### Minor changes

- [SpinButton] Implemented precision

### Patches

- ComboBox, Dropdown, TextField: Improved high contrast in focus state. Layout changes for ComboBox to allow for border-box sizing.

## 5.45.3
Fri, 02 Feb 2018 11:24:16 GMT

### Patches

- Converted ActivityItemExample to use mergeStyles instead of SCSS

## 5.45.2
Thu, 01 Feb 2018 11:23:17 GMT

### Patches

- Adds the _isControlled flag to the TextField component that disabled onChange if the value prop is set, which follows developer expectations with React inputs.
- Theme Generator: fix autogenerated neutral colors
- Fix bug in modal selection handling
- added return default when reaching the html tag in while loop inside _getBackground() inside Sticky component.

## 5.45.1
Wed, 31 Jan 2018 11:11:59 GMT

### Patches

- swatch color picker - add ability to add aria-label
- ChoiceGroup: Wrap long text for image and icon types.
- updating willReceiveProps of date picker to not run validation unless the props actually changed
- ComboBox: ComboBoxes were changed to always expand which is incorrect behavior, fixing to align with the correct design
- ContextualMenu: Remove the list in the menu and move the aria-label/labelledby to the correct element
- TextField: fixed whitespace wrapping with prefix/suffix.
- Fixing the up and down arrows position and behavior according to RTL expected behavior
- Removed unused scss file in Sticky component

## 5.45.0
Tue, 30 Jan 2018 11:22:56 GMT

### Minor changes

- Added prop to ComboBox to control its button's aria-hidden attribute

### Patches

-  Fix TeachingBubble dismiss on scroll by passing onDismiss to callout.

## 5.44.0
Mon, 29 Jan 2018 11:23:40 GMT

### Minor changes

- Add work week date range type and update calendar and calendarDay components to consume it
- Added onRenderCoin prop that controls the persona coin image

### Patches

- Combox box: added accessibility changes added a title and changed activedescendant to use focused element
- Callout/Popup: Fix a bug where callout doesn't have the correct overflow style"
- setting people picker default size back to 28 from 24
- Add private _defaultCalloutProps instead of public defaultProps to set calloutProps.

## 5.43.1
Fri, 26 Jan 2018 11:25:22 GMT

### Patches

- SplitButton - added aria support for button in split buttons and the whole container
- Dropdown, Checkbox: Fix disabled Dropdown options and update Checkbox disabled styles
- Persona: Changed text and root heights for size24 when secondary text is shown.
- TextField, Pickers, PeoplePicker: Homogenizing input heights and colors

## 5.43.0
Thu, 25 Jan 2018 11:23:07 GMT

### Minor changes

- Callout: Convert component to JS Styling
- Added onFocus state Boolean to BasePicker

### Patches

- spin button - add aria label for decrement and increment buttons
- Pickers: Fixing errors occuring onBlur of limited pickers
- Fixed broken links on documentation pages
- Pickers: Aligning suggestions callout to the correct RTL position

## 5.42.0
Wed, 24 Jan 2018 11:23:26 GMT

### Minor changes

- ResizeGroup: Add the ability for ResizeGroup to get divProps
- Enhance Panel component props to allow all of FocusTrapZone props overrides.

### Patches

- BaseAutoFill: Fixed a bug where baseautofill would not work with composed languages like Japanese
- Dropdown: Align error message styling to TextField. TextField & ComboBox: Updated invalid input border color to be red in all states.
- TextField and SearchBox: Specified placeholder text color to be more consistent across browsers.
- Prevent default to avoid setting focus on SplitButton menu button
- Fix CalendarDay RTL view

## 5.41.2
Tue, 23 Jan 2018 11:22:12 GMT

### Patches

- Fixed SuggestionsController method convertSuggestionsToSuggestionItems to handle BasePicker createGenericItem correctly

## 5.41.1
Mon, 22 Jan 2018 18:39:02 GMT

### Patches

- [FocusTrapZone] Text selection inside FocusTrapZone was broken. This brings it back
- fix hover card dismiss issue

## 5.41.0
Mon, 22 Jan 2018 11:14:27 GMT

### Minor changes

- Add a context value under ResizeGroup to allow child components to detect whether they are being used only for measurement.
- MessageBar: New prop to allow singleline text with no action buttons to be truncated.

### Patches

- Address issue #1535 - Calendar: Change clickable spans to buttons.
- updated divider color to be more visible
- Hovercard: Changed content keydown listener to element event binding
- MessageBar: scss refactor and component polish.

## 5.40.2
Fri, 19 Jan 2018 11:14:03 GMT

### Patches

- added smallInputBorder semantic slots and updated checkbox, choicegroup, and toggle to use it.
- Add classNames and style the hidden input inside the ChoiceGroup image and icon variants so the Narrator highlights it correctly.
- Datepicker: Fix so calendar doesn't open when clicking icon when DatePicker is disabled
- Persona: Fix a bug where space would be taken even though there was no secondary text
- Changes in Week Number Computation logic for FirstFourDayWeek setting to fix issue 3119

## 5.40.1
Thu, 18 Jan 2018 11:21:56 GMT

### Patches

- BasePicker: Fix accessibility bug where it always has aria-expanded=true
- Calculate overflow manually to determine if Callout needs a scrollbar
- Update .npmignore to publish all examples

## 5.40.0
Wed, 17 Jan 2018 11:11:25 GMT

### Minor changes

- DatePicker: Default selectedDate should be undefined, not new Date()
- DatePicker: Add an initialPickerDate property
- Icon: the `ms-Icon` class name, despite being unused, is causing conflicts with fabric-core usage inadvertently. There isn't a great way to deal with this other than to avoid re-using the `ms-Icon` class name.
- ProgressIndicator: Adding indeterminate progress variant.

### Patches

- Pickers: Fixed border clipping of tag item in high-contrast mode
- Escape key shouldn't propagate in combo box if it isn't open

## 5.39.1
Fri, 12 Jan 2018 20:03:22 GMT

### Patches

- Checkbox and ChoiceGroup: New resting state border color.

## 5.39.0
Wed, 10 Jan 2018 11:23:36 GMT

### Minor changes

- Rating: Convert to getstyles

### Patches

- Add auto expand on focus for Combobox
- Callout/Positioning: Fix a bug where callouts would position incorrectly if the target was  an HTMLImg element

## 5.38.1
Mon, 08 Jan 2018 11:13:51 GMT

### Patches

- Contextual Menu submenus that have no items will have chevron icon and call onMenuOpened
- CommandBar: Allow disabled anchor and text items
- Rating: Set default active element and fixed focusability

## 5.38.0
Fri, 05 Jan 2018 11:14:58 GMT

### Minor changes

- Added a customizable onDismiss to the BasePicker

### Patches

- ToolTop: Changed ToolTipHost to inline-block
- ContextualMenu: Added styling for disabled icon"

## 5.37.0
Wed, 03 Jan 2018 11:23:12 GMT

### Minor changes

- TextField: Allows user to provide the `autocomplete` prop.
- Added optional callback for getting image load state change events from personacoin through Persona component

### Patches

- add unmount check in suggestion promise

## 5.36.0
Thu, 28 Dec 2017 11:23:50 GMT

### Minor changes

- SearchBox: Converted component to getStyles

### Patches

- SearchBox: moved className into styles file and added it to styles interface

## 5.35.2
Mon, 25 Dec 2017 11:13:32 GMT

### Patches

- SpinButton: Fix falsey check for value so custom handlers work even if value is 0

## 5.35.1
Fri, 22 Dec 2017 11:10:56 GMT

### Patches

- Callout: Fix opacity when class name has animation that involves opacity
- Calendar: Fix scrollbar when today button is added to overlayed calendars

## 5.35.0
Thu, 21 Dec 2017 11:23:03 GMT

### Minor changes

- Grid: Enable styling customization to grid through getStyles

### Patches

- Fixed persona import paths

## 5.34.3
Wed, 20 Dec 2017 11:21:48 GMT

### Patches

- HoverCard: fixing detection of if expanded scrolling is needed

## 5.34.2
Tue, 19 Dec 2017 11:22:47 GMT

### Patches

- Persona: Set initials color for high contrast mode.
- Broaden the range of allowed prop-type versions

## 5.34.1
Mon, 18 Dec 2017 11:22:54 GMT

### Patches

- respect className for PersonaCoin

## 5.34.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme happy.

## 5.33.1
Fri, 15 Dec 2017 11:22:38 GMT

### Patches

- Only perform list measurements if we absolutely need to
- Link: Improved selectors to fix pressed state.
- Fixes bug with GroupedList losing focus sometimes when item gets removed from list

## 5.33.0
Thu, 14 Dec 2017 11:23:17 GMT

### Minor changes

- Add remeasure public method to ResizeGroup

### Patches

- ComboBox: Fix some issues with submitting values when freeform and autocomplete
- Reversing the order of :focus and :active selectors for comboBox options.
- Panel: Don't render Overlay unless Panel prop isOpen is true

## 5.32.0
Wed, 13 Dec 2017 04:06:51 GMT

### Minor changes

- BaseButton:onAfterMenuDismiss

### Patches

- ContextualMenu: Undo change to manually set the scrollbar
- Link: Fixed state styling for the component and its documented examples.
- Fix dropdown focus issue for IE

## 5.31.2
Tue, 12 Dec 2017 11:25:08 GMT

### Patches

- Fix DetailsList onRenderMissingItem not rendering the missing item

## 5.31.1
Tue, 12 Dec 2017 03:55:03 GMT

### Patches

- BaseButton: Explicitly dismiss the menu when the contextual menu is dismissed rather than calling toggleMEnu

## 5.31.0
Tue, 12 Dec 2017 02:08:36 GMT

### Minor changes

- List: Support ghosting

### Patches

- remove customized dismiss function in HoverCard
- ComboBox: Add onMenuDismiss prop
- ActivityItem: Snapshot and Screener tests added

## 5.30.2
Fri, 08 Dec 2017 21:30:54 GMT

### Patches

- ComboBox:Make sure currentOtions has values before attempt to get values out of it

## 5.30.1
Fri, 08 Dec 2017 18:09:44 GMT

### Patches

- ComboBox: change when focus is set back to the input to make sure it doesn't  steal focus from somewhere else
- Added checks to BasePicker if input is null.
- ContextualMenu: properly observe deprecated `isDisabled` property (until we remove the property)

## 5.30.0
Thu, 07 Dec 2017 03:44:42 GMT

### Minor changes

- BaseButton: Expose getSplitButtonClassNames func as a prop to be able to override it.

### Patches

- ComboBox: Update onBlur to do nothing if the event came from an element inside of the  comboBox

## 5.29.5
Wed, 06 Dec 2017 23:00:38 GMT

### Patches

- Persona: Allow for consumers to provide custom colors
- ComboBox: Update scrolling behavior to behave as expected

## 5.29.4
Wed, 06 Dec 2017 17:38:45 GMT

### Patches

- Contextual Menu: made it so we can tab through items

## 5.29.3
Wed, 06 Dec 2017 11:24:52 GMT

### Patches

- Button: Move contextual menu outside of button tag if doNotLayer

## 5.29.2
Tue, 05 Dec 2017 02:04:27 GMT

### Patches

- Update Default Button colors to match design spec
- Contextual Tab and Focus Zone - reverted tabbing functionality to avoid tab being captured

## 5.29.1
Mon, 04 Dec 2017 17:27:54 GMT

### Patches

- ContextualMenu: Make sure vertical scrollbar does not take space away from contents

## 5.29.0
Fri, 01 Dec 2017 11:11:16 GMT

### Minor changes

- DatePicker: Calendar Props.  Adding access to ICalendarProps
- ContextualMenu: Expose callback hook when menu is being removed from DOM
- Panel: When panel is dismissed, hide the panel instead of destroying it

### Patches

- GroupHeader: Style fix to add nowrap on group header
- Changed combobox option height to match other menu option heights
- FocusZone: Fix focus-in behavior when children are added asynchronously.
- ComboBox: Update to allow the dropdown to fit its content
- DatePicker: Reset invalid input (typed by used).
- PersonaPresence: Scale the presence and presence icon proportionally to the specified coinSize up to a max size.

## 5.28.0
Thu, 30 Nov 2017 01:16:12 GMT

### Minor changes

- Positioning/Callout: made significant changes to help prepare for when positioning and calloutpositioning separate.
- ComboBox/Dropdown/ContextualMenu: Update how the focus gets updated for hover so that 1) we aren't blasting mouseMoves and 2) so we get rid of weirdness around  hover and scroll

### Patches

- SwatchColorPicker: Expose getStyles of colorCell subcomponent

## 5.27.0
Wed, 29 Nov 2017 11:24:06 GMT

### Minor changes

- SelectableOption: New disabled prop for options. ComboBox: Updated styling per design spec, including new rootPressed prop, color updates, and className updates.
- SwatchColorPicker: Change scss to js styling
- Updating TypeScript to 2.6.2.

## 5.26.1
Tue, 28 Nov 2017 02:24:21 GMT

### Patches

- Contextual Menu: made it so we can tab through items

## 5.26.0
Mon, 27 Nov 2017 22:13:20 GMT

### Minor changes

- DetailsList: Resizing columns in justified mode doesn't affect columns on the left.

### Patches

- ContextualMenu: Add ability to open splitButton chevron menu, when they are inside menus

## 5.25.0
Thu, 23 Nov 2017 11:10:13 GMT

### Minor changes

- Button: new prop splitButtonAriaLabel.

### Patches

- Combo box only updates the pending values in arrow keypresses, whether  its menu is open or  closed
- ContextualMenu: Updated expanded menu item style to match toolkit.
- ContextualMenu: Add a prop for setting the min width to be equal to the width of the target
- Apply props.className in ResizeGroup. Add snapshot for ResizeGroup. Pass className from experiments CommandBarTests. Update experiments CommandBar snapshot
- Toggle: Split out a new example for on and offAriaLabels to clarify the experince.
- Change the combobox alignment to be the same as the design of dropdown

## 5.24.2
Wed, 22 Nov 2017 11:12:40 GMT

### Patches

- Add small headline with margin and wide callout with image on the left side

## 5.24.1
Tue, 21 Nov 2017 11:21:39 GMT

### Patches

- ColorCells: Adding gray border to white color cells
- Prevent default while handling up/down arrow keys on a contextual menu
- TextField example: match the max width for TextFields.

## 5.24.0
Mon, 20 Nov 2017 11:12:47 GMT

### Minor changes

- calendar component ux changes plus exposing sixweeksbydefault

### Patches

- Persona: Changed size40 primaryText font size back 14px.
- DetailsList: preserve focus only if active element leaves the list
- Edit HoverCardPage, OverflowSetPage, ScrollablePanePage, TeachingBubblePage to use IComponentDemoPageProps

## 5.23.0
Fri, 17 Nov 2017 17:36:36 GMT

### Minor changes

- add suffix to TextField
- Nav: Added `onLinkExpandClick` callback for getting a callback when an item expanded state is toggled
- PersonaCoin: For non-latin characters, if initials return an empty string, use the Contact icon instead of the empty string.
- Rating control implementation using button, Half star support and ReadOnly rating control support

### Patches

- DetailsList: mouse click gives preference to inner links.
- DetailsHeader: Accessibility fix, move aria-haspopup to correct element
- SplitButton: Add splitFullActiveState to make the whole splitButton look active if true
- ScrollablePane: Fix sortStickies function to sort elements by their true offsetTop in respect to scrollablePane's root
- Fixing high contrast bugs

## 5.22.0
Thu, 16 Nov 2017 11:20:34 GMT

### Minor changes

- Dropdown: Update dropdown interface to allow open dropdown after focus and remove extra focus border for dropdown option.

### Patches

- Checkbox: Add getClassNames prop to allow complete customization of the component
- SplitButton: Avoid applying selector rest changes when in toggle state
- Toggle: Add label as fall back ariaLabel.

## 5.21.2
Wed, 15 Nov 2017 11:11:59 GMT

### Patches

- SplitButton: Disable visual changes in splitButtonContainer when control is disabled

## 5.21.1
Tue, 14 Nov 2017 11:21:27 GMT

### Patches

- ChoiceGroup: Fixed RTL support.

## 5.21.0
Fri, 10 Nov 2017 17:09:36 GMT

### Minor changes

- Allow optional minimum and maximum date boundaries on DatePicker component
- Added className to IDetailsRowProps for the root element.
- Have VirtualizedCombobox implement IComboBox interface
- Add focusInput method in BasePicker to allow set focus to input element directly.

### Patches

- Expose prop to apply rootExpanded on Primary Button if isSplit is true
- TextField: Moved required asterisk to be outside of fieldGroup when no label is present. No longer a need for special styles when icons are present.
- TextField: Updated field width for all examples to be more legible. Replaced ms- with docs- prefix for example scss.

## 5.20.3
Wed, 08 Nov 2017 06:05:34 GMT

### Patches

- Selection: calling `setItems` with new items will now invalidate the internal selection array.
- Persona: DirectionalHint for Tooltip location, polished example spacing and documentation on PersonaPage.
- Preserve focus in DetailsList when items change

## 5.20.2
Tue, 07 Nov 2017 11:22:30 GMT

### Patches

- Checkbox: Expose icon props for the check mark
- added aira0expanded property to contextMenu item so that narrator will announce expand/collapse state of a menu item if it has submenu items.

## 5.20.1
Mon, 06 Nov 2017 18:44:43 GMT

### Patches

- Fixing Icon amd import.

## 5.20.0
Sun, 05 Nov 2017 23:27:32 GMT

### Minor changes

- Allow optional minimum and maximum date boundaries on Calendar component.

### Patches

- Persona: respecting the deprecated PersonaSize enum values to avoid breaking changes.
- Persona: Renamed Persona size12 to Persona size10. Polished style to reflect the toolkit.

## 5.19.1
Fri, 03 Nov 2017 15:06:54 GMT

### Patches

- HoverCard: fixing an import to be AMD compliant.

## 5.19.0
Fri, 03 Nov 2017 14:09:56 GMT

### Minor changes

- OverflowSet: Support vertical orientation

### Patches

- SpinButton: Allow for styling of the icon when the component is disabled

## 5.18.0
Thu, 02 Nov 2017 18:20:18 GMT

### Minor changes

- Adding ES2015 Module Support
- BaseButton: onMenuClick to support other actions for menu and split buttons
- add accessibility behavior of hover card
- CommandBar: iconOnly items prop
- Add 'today' to DatePicker properties and forward it to the Calendar.
- Grid: Add prop to for FocusZone presence
- Slider: added `ariaValueText` property for better screen-reader support.

### Patches

- Changed es2015 module output to target es5 so that TypeScript downcompiles the code.
- Dropdown: Updated caret dropdown colors.
- Button: Added flexShrink: 0 to icons in button so long text won't make them shrink
- Fixed contextual menu state colors.
- Facepile style debugging, includes new FacepileButton
- Menus: Update so they have one notion of focus (from both hover and keyboard)
- Split Button in Menu: add vertical divider component and hook to customize splitbutton in menu div classname
- Persona: Changed PersonaSize names from descriptive to numerical.
- TextField/DatePicker: The required astrisk is now more correctly positioned.

## 5.17.1
Tue, 31 Oct 2017 10:22:25 GMT

### Patches

- Button: Pass specified onDismiss callback to contextual menu
- ContextualMenu: Support suppressing dismiss on ItemClick via preventDefault

## 5.17.0
Mon, 30 Oct 2017 10:23:09 GMT

### Minor changes

- Make red a reserved color for the PersonaCoin so it can only be used if you override the personacoin color

### Patches

- Fixed an issue where ComboBox would throw an exception under shallow rendering tests
- Adjustments made to the disabled text color for Toggle and Checkbox.

## 5.16.0
Fri, 27 Oct 2017 10:25:09 GMT

### Minor changes

- Add ariaHidden prop to buttons

### Patches

- Restore forceAnchor prop for INavLink elements
- SearchBox onKeyDown: prevent default events only when specified by the user
- Panel: changed navigation layout to use flexbox, and pass overrides directly into button to avoid load order issues
- Theme Generator: improve perf

## 5.15.0
Thu, 26 Oct 2017 10:21:37 GMT

### Minor changes

- Removing the `initializeIcons` call from the top level import. The bundle in the dist folder used in codepens will still continue to have it, so that codepens don't stop rendering icons.

### Patches

- Callout: Add check for undefined when comparing old and new position
- SplitButtonInMenu: render icon in primary action button
- ContextualMenu: Make the behavior of getIsChecked consistent for isChecked and checked props

## 5.14.0
Wed, 25 Oct 2017 02:03:33 GMT

### Minor changes

- Panel: Added possibility of using a custom function to handle clicks outside the panel when using isLightDismiss=true
- ComboBox: Adding prop that keeps calout closed when using test input

### Patches

- Button: Pass specified onDismiss callback to contextual menu
- Buttons: split button has `borderRadius` set to 0 to override defaults on Mac chrome/safari.
- CalloutContent: Fix calculation of max size if calloutMaxHeight is not provided
- Fix Dropdown's falsey check in selection to strict check for undefined in case key is 0

## 5.13.0
Tue, 24 Oct 2017 10:21:08 GMT

### Minor changes

- Adds "onInputChanged" prop to BasePicker
- Layer: exposing `setDefaultTarget(selector)` static method to set a default target element where layered content should render by default.

### Patches

- ComboBox: Add support for custom styling of the label in the disabled state
- Dialog: Don't add empty spans to footer for falsy children of DialogFooter
- Nav: Add onRenderLink back to JSX to allow custom rendering of links
- remove outdated semantic slots
- Ensure that Select All checkbox can still be focused

## 5.12.0
Mon, 23 Oct 2017 10:24:13 GMT

### Minor changes

- ComboBox: Adding onMenuOpen callback

### Patches

- Added a new divider component
- ContextualMenu/Callout: Fix (and deprecate) broken 'targetPoint' API
- DatePicker will not try to parse a string if the formatted string of the selected date is the same as the string to be parsed.

## 5.11.0
Fri, 20 Oct 2017 18:42:08 GMT

### Minor changes

- Adding an Icons export in lib folder, as well as adding Check to the root index exports.
- Add a way to force a layout update for ScrollablePane
- ColorPicker: Adding hex/red/green/blue/alpha label props so applications can provide localized strings. Also turns off spell check for corresponding text fields.
- Add opt-in modal selection behavior on touch

### Patches

- Fix minor state update bug with Sticky
- ComboBox: Fix custom styling on menu options
- Updated example to render some custom icons.
- SpinButton: Disable last pass autofill
- Menu Split Button: Launch split button menu with right arrow key
- PersonaCoin - display initials only if no imageUrl is provided or if error loading image

## 5.10.0
Wed, 18 Oct 2017 10:21:25 GMT

### Minor changes

- ComboBox: the label now appears disabled when the ComboBox is disabled.
- "ContextualMenu: SplitButtons can now appear inside menus"
- Theming: add SASS variables for semantic theming to support legacy scenarios"

### Patches

- Added implementation examples section to Button Page. Rearranged TextField borderless example.
- Updated the Fabric Core package version
- Fix Image css so it doesn't fade in if shouldStartVisible is true
- Fix refs in Dropdown and Datepicker

## 5.9.3
Tue, 17 Oct 2017 17:17:41 GMT

### Patches

- SearchBox: expose onKeyDown event by invoking external prop
- ContextualMenu: Pass in a menu dismiss function into onRender to allow custom rendered menu items to dismiss the menu

## 5.9.2
Mon, 16 Oct 2017 22:49:01 GMT

### Patches

- Nav: fixing amd-incompatible import.

## 5.9.1
Mon, 16 Oct 2017 20:00:51 GMT

### Patches

- Dropdown: Fixing nullref when nothing is selected in multi select rendering.
- Updating shrinkwrap for Fabric Core package update

## 5.9.0
Mon, 16 Oct 2017 10:20:41 GMT

### Minor changes

- DatePicker getWeekNumbers function accepts firstWeekOfYear settings

### Patches

- Fix Slider css so label does not break lines if value is long
- Fix rounding issue in Slider when step is less than 1
- Fix CommandButton styles for Nav entries

## 5.8.2
Fri, 13 Oct 2017 04:00:17 GMT

### Patches

- Colors Utility: add error checking if an invalid string is given

## 5.8.1
Fri, 13 Oct 2017 01:36:02 GMT

### Patches

- Callout: Update the typings on the target prop to make it compatible with React refs
- Tooltip: pass calloutProps.className to Callout
- Theme Generator: insure color update when bg inverts

## 5.8.0
Thu, 12 Oct 2017 10:20:49 GMT

### Minor changes

- Dropdown: add onDismiss callback. Example multi select dropdown with filters, we want to apply filters after user has dismissed the dropdown.
- OverflowSet: Add FocusZoneProps and the ability to set the role
- Callout: Added optional button at the bottom of the callout container
- ComboBox: added selectedIndex prop and inputFieldText prop for more control over comboBox behavior
- "Update spinButton styling to have the right font size and disabled visuals"

### Patches

- ComboBox: Updated typing and documentation for `autoComplete` to only allow 'on' or 'off' (following html standards) rather than a boolean.
- ContextualMenu: Update the typings on getMenuItemClassNames
- Adding Implementation Examples section to ComponentPage. Implemented in TextField.

## 5.7.0
Wed, 11 Oct 2017 10:11:04 GMT

### Minor changes

- ComboBox: Adding props to control height and width of Callout
- "Move getItemClassnNames forontextualMenuProps to IContextualMenuItem"
- Make Modal's FocusTrapZone controllable

### Patches

- ContextualMenu: Update the typing for getMenuClassNames
- SpinButton: Fix the code reference for the stateful spinButton Example (#3023)
- MessageBar: replaced DefaultButton with MessageBarButton.

## 5.6.0
Tue, 10 Oct 2017 10:24:47 GMT

### Minor changes

- " Move ContextualMenu component to Glamor"
- ComboBox: Add virtualization to the combobox control

### Patches

- ComboBox: Pass default render functions to ComboBox custom render functions
- New MessageBarButton component to allow for the unique state styles need in MessageBar.

## 5.5.1
Mon, 09 Oct 2017 10:08:09 GMT

### Patches

- Added sizing prop for Breadcrumb per design toolkit.
- Vertically center checkbox in DetailsList header
- Label: Convert sass to mergeStyles
- Positioning: Fix an issue where beak would appear misaligned if an event was passed in

## 5.5.0
Fri, 06 Oct 2017 10:18:41 GMT

### Minor changes

- Style ms-Button-menuIcon according to root styles for the following states - hovered, pressed, expanded  ande expandedHovered.

### Patches

- Dropdown: fix broken implementation of controlled multi-select dropdowns
- TSConfig: update to use preserveConstEnums so that certain builds systems don't break when importing const enums
- Router: regex to be able to render the correct page when it encounters queries.

## 5.4.0
Thu, 05 Oct 2017 17:03:43 GMT

### Minor changes

- Fixing version dependencies.

## 6.0.1
Thu, 05 Oct 2017 10:17:42 GMT

### Patches

- Added min-width for button icons so that its easy to create buttons with space for an icon

## 6.0.0
Wed, 04 Oct 2017 22:40:22 GMT

### Breaking changes

- Positioning: Refactored positioning and removed deprecated properties

### Minor changes

- ComboBox: when options are scrollable, added prop to scroll selected item to top when callout is opened.
- "Buttons: adding `primaryDisabled` flag for disabling only the primary action of the split button, leaving the menu enabled."

### Patches

- TooltipHost: Specifying a className will no longer prevent innate Tooltip classes from being properly applied
- DatePicker - make onSelectDate callback execute as part of SetState instead of after it. This ensures that selected date changes occur in the expected order
- Dropdown: fixed logic in getSelectedIndex to support controlled uses
- General bug fixes: Updated ResourcePage text, Reordered TextField page to give priority to design guidance examples, improved padding and spacing for TextField and ComboBox examples, and various website pages. Synced ComboBox error message spacing to be like TextField and per design specs.
- Removed duplicate header in ResizeGroup.
- Added new inline prop for SearchBox and corresonding new example. Adjested the SearchBoxPage to better reflect the current toolkit documentation.
- Fixed duplicate header on Tooltip page.
- List: Fix Grid example to read right to left in RTL mode
- High contrast fixes for breadcrumb, contextualMenu, overlay, pivot, calendar, and searchbox
- BaseButton: Added borderRadius:0 to fix new default styles in webkit

## 5.3.0
Mon, 02 Oct 2017 10:19:43 GMT

### Minor changes

- PersonaCoin: added `coinSize` prop to allow for customized sizes.

## 5.2.1
Sat, 30 Sep 2017 01:26:37 GMT

### Patches

- ComboBox: Fix broken styles as part of the move to MergeStyles

## 5.2.0
Fri, 29 Sep 2017 10:20:24 GMT

### Minor changes

- Adding custom render to TextField label

### Patches

- Simplified checkbox examples and fixed spacing issue.
- DetailsList: Allow resizing columns wider than maxWidth in justified layout
- ContextualMenu: Make sure to check items within a menu section for the 'canCheck' property
- Updating mergeStyleSets usage in various components to adhere to correct typing.
- Split out and cleaned up TextField examples to better reflect the toolkit.
- DatePicker: call correct callback when previous year button is clicked

## 5.1.0
Thu, 28 Sep 2017 10:19:12 GMT

### Minor changes

- DetailsList: Added ability to add css class to checkbox cell

### Patches

- List: Fix documentation examples. Adds autobind to onRenderCell of List Grid Example

## 5.0.1
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- Updated for Fabric 5.0.

## 4.51.0
Tue, 26 Sep 2017 20:42:17 GMT

### Minor changes

- Reverting Customizer changes, as they are breaking. Will include in 5.0.

### Patches

- Use aria-label for slider, even when label is not set
- PeoplePicker: adjusting aria/role attributes to improve the Narrator experience when reading out suggestions.
- TextField: Moved aria live attribute onto the actual text of an error message for text field component so that it is read aloud by narrator.
- Removed old visual testing system to make way for new Screener based system

## 4.50.2
Tue, 26 Sep 2017 10:09:04 GMT

### Patches

- Updating components to support scoped customizations.
- Dropdown: add titleIsPlaceHolder class to dropdown title so styles can be overridden
- Persona: Fixed regression in secondary text not showing

## 4.50.1
Mon, 25 Sep 2017 10:19:18 GMT

### Patches

- Reordered Buttons on ButtonPage and made some small style changes to match toolkit for website.
- Updated ContextualMenu examples and page to better reflect the XD Toolkit.
- Dropdown: Adds a positioning wrapper around the caretDown icon
- Theme Generator: have the bg change with the theme
- make headings on theme generator page theme

## 4.50.0
Fri, 22 Sep 2017 19:08:51 GMT

### Minor changes

- Icon: Removed a recently added prop `onClicked` as it is redundant with `onClick`. Updated DatePicker to use `onClick`.
- Create Theme Generator page
- ActivityItem: Adding ReactNodes in the interface in addition to the IRenderFunction props.

### Patches

- Adds ARIA label prop for Suggestions component
- SplitButton: Fix menu rendering when splitbutton is disabled
- ComboBox: Changing high-contrast styles to use msHighContrastAdjust

## 4.49.1
Thu, 21 Sep 2017 06:23:58 GMT

### Patches

- Brand icons page clean up.
- Implement hover and focus trigger behavior for Check component
- Add the ability for compoundButtons to have icons
- [ComboBox] Fix slight rendering bug in browser zoom (around sub-pixel rounding)
- Stop delete from happening using delete or backspace when component is in disabled  mode
- fix comments and example code for onRenderCaretDown prop of Dropdown component

## 4.49.0
Wed, 20 Sep 2017 10:19:01 GMT

### Minor changes

- allow 'chevron down' icon on Dropdown to be customized
- ContextualMenu: Update the type of the title property on a menu section to be of type string
- SearchBox: Added onEscape prop

### Patches

- Button: Add the ability to dismiss any open menus from the button interface
- Modal: Updated padding in example to fix RTL support
- Changing high-contrast colors to system colors

## 4.48.1
Tue, 19 Sep 2017 10:08:55 GMT

### Patches

- Added label to Persona example components.
- Added an optional alt text prop for the Image component and example on the website.
- Revised alt text best practices for Image Component in website, removed alt prop.
- Updated dropdown state styles to match the XD specs.
- Cleaned up Default Dialogue to more cleanly represent the default state. Reformated exampleStyles imports to work towards more modularity. Typo and language fixes.
- Dropdown: Fixed logic to support selected options in single select scenario
- Added shared styling to accommodate shared spacing between common elements in example components on the website. Also began to add consistency in the language.
- SplitButton: Properly cascade container styles to the disabled state
- Visual bug fixes for UHF adoption for website

## 4.48.0
Mon, 18 Sep 2017 10:18:23 GMT

### Minor changes

- DatePicker-Adding new props from Calendar component

### Patches

- DatePicker-fixing vertical scrollbar bug
- Force Check to use the page background color
- Allow onItemContextMenu a way to cancel preventDefault() call.
- ActivityItem: Descreasing icon font size.

## 4.47.0
Fri, 15 Sep 2017 10:19:50 GMT

### Minor changes

- Calendar:  Adding week numbers to calendar
- DatePicker: Hovering over calendar icon in text input does not change cursor to pointer.

### Patches

- SplitButton: Fixed primary theme, updated documentation
- Prevent touch events from triggering marquee selection

## 4.46.1
Thu, 14 Sep 2017 10:17:39 GMT

### Patches

- Callout: Made updatePosition async. Contextualmenu: Fixed a bug where sometimes a submenu would have a beak.
- Refactor `Persona` to extract `PersonaCoin` and `PersonaPresence` so image/status can be rendered alone without Tooltip. Added `PersonaCoin` to top level exports

## 4.46.0
Thu, 14 Sep 2017 00:34:57 GMT

### Minor changes

- Calendar:  Updating accessibility, fixing headers aria box, fixing selected/unselected state in day and month picker, updating aria-label for next/previous buttons, fixing arial label for months in month picker.
- Adding `MoreVertical` icon.

### Patches

- Check: better alignment of the check mark.
- [SwatchColorPicker] Fix uncaught exception when colorCells is empty
- Calendar: Month-picker-only selection bug fixed
- DetailsList: Update DetailsRow Check target size to be larger

## 4.45.1
Tue, 12 Sep 2017 17:41:25 GMT

### Patches

- DetailsList: Fixed collapsing logic to look at all items including first 2
- Fixing circular dependency issue in PrimaryButton.

## 4.45.0
Tue, 12 Sep 2017 10:10:21 GMT

### Minor changes

- Add sections to contextual menus
- Calendar: Arrows (when month picker only) do not navigate correctly.  Fixed this and fixed position.

### Patches

- MessageBar: Added word-break to fix long words in message bar
- Pickers: Fixed a bug where suggestionsHeaderText would not display, also fixed backspace event propagating even when it was handled.
- Mix native props to Nav items.
- Button: Add support for dividers in split buttons
- SplitButton: Update the menu launcher target for a split button to be the entire control instead of just the menu launching portion
- DetailsList: Update activeRows management to use item keys

## 4.44.0
Mon, 11 Sep 2017 10:08:07 GMT

### Minor changes

- Icon: tweaked `iconName` to take in a string, rather than IconCode. The type safety can't be enforced in Fabric 5 which will support whatever subsets the customer registers.

### Patches

- CommandBar: Fixing wrong positioning for overflow menu, when overflow menu open and CommandBar is updated

## 4.43.1
Sat, 09 Sep 2017 01:39:37 GMT

### Patches

- Check: Updating css to look great on IE11.
- Add tool tip to text of Persona.

## 4.43.0
Fri, 08 Sep 2017 10:16:28 GMT

### Minor changes

- Add scrollToIndex to GroupedList, DetailsList

### Patches

- DetailsList: Fixing alignment issues due to recent changes in Check.

## 4.42.0
Thu, 07 Sep 2017 10:09:51 GMT

### Minor changes

- Added rootExpandedHovered and iconExpandedHovered to IButtonStyles interface.  These entries are for specifying on hover style for expanded state.
- ContextualMenu: `onRenderSubMenu` prop added to allow the overriding of submenu rendering.

## 4.41.0
Wed, 06 Sep 2017 10:16:32 GMT

### Minor changes

- Allow rendering empty GroupedList headers

## 4.40.1
Tue, 05 Sep 2017 20:36:48 GMT

### Patches

- HoverCard: Support change in expanded card height. Add callbacks upon card visible/hide
- ScrollablePane: Fix component to remove stickyContainer element on component unmount.
- List: fixing minor issue around using the `shouldVirtualize` prop.

## 4.40.0
Mon, 04 Sep 2017 10:16:56 GMT

### Minor changes

- Updating Calendar component styles to match new OWA calendar styles for the Calendar team.

### Patches

- Check: Fixed Chrome-specific alignment for the checkmark within the circle.
- Slider: adding `vertical` property to render as a vertical slider.
- DetailsHeader: Adjust sortIcon position

## 4.39.0
Fri, 01 Sep 2017 16:51:57 GMT

### Minor changes

- Calendar: Adding option to add date formatting to calendar

### Patches

- Respect ths isHeader property on the ResizeGroup demo page
- BaseButton: Put the right classname on the menu icon
- Add FullWidth icon.
- SwatchColorPicker: Fixed so it will deselect the current items if there is a selected id passed in that does not exist in the color list

## 4.38.0
Thu, 31 Aug 2017 15:41:56 GMT

### Minor changes

- Updating goToToday to include onSelectDate function if defined so that this button behaves like a date has been picked
- Tooltip: Added support for custom maxWidth values

### Patches

- HoverCard: Improved performance of expanding animation.
- Check: Increased size of check to 18px
- Fix data-command-key to key instead of index.
- ComboBox: Loosen the re-rendering requirement

## 4.37.7
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 4.37.6
Tue, 29 Aug 2017 10:20:56 GMT

### Patches

- FocusZone: disable tabIndex of previous element on mouse focus.
- Selection: Adding better handling around a case where getKey returns null or undefined.
- Dialog: Show close button when dialog type is DialogType.close

## 4.37.5
Sat, 26 Aug 2017 00:52:38 GMT

### Patches

- Add LikeSolid icon
- Updating sass build to pre-process theming again for better registration performance.
- Fix issues when a SelectionZone is outside a FocusZone

## 4.37.4
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 4.37.3
Fri, 25 Aug 2017 19:27:18 GMT

### Patches

- ComboBox- Make sure the option always get updated if they change (#2301)
- Pickers: Have IInput props correctly extend inputhtmlattributes

## 4.37.2
Fri, 25 Aug 2017 10:09:40 GMT

### Patches

- HoverCard: Dismiss on key/mouse down, Add directionalHint, Fix target prop
- Breadcrumb: Fixed extra dropdown icon
- ComboBox - Fix so the component doesn't cause it's children to rebuild and fix up the  the updating of the value  accordingly

## 4.37.1
Thu, 24 Aug 2017 10:20:20 GMT

### Patches

- Darkened the placeholder text for dropdowns to meet MAS color contrast standards

## 4.37.0
Thu, 24 Aug 2017 05:38:14 GMT

### Minor changes

- Checkbox: support for aria attributes
- BasePicker: added itemLimit property, which will allow preventing adding more items than set limit.
- Selection: now takes in a selectionMode, which DetailsList and others can read from. This does not break any existing SelectionMode passed into DetailsList currently but allows you to move the setting to the Selection object.
- TextField: Added selectionStart and selectionEnd getters to ITextField.
- withViewport: adding the ability to disable measures to improve performance of rendering the DetailsList in fixed mode.

### Patches

- Fix aria-labeling for DetailsList column headers
- DetailsRow: Removed margin from check buttons.

## 4.36.0
Wed, 23 Aug 2017 19:04:55 GMT

### Minor changes

- DocumentCardPreview: Allow show Icon in the preview area instead of image.

### Patches

- ContextualMenu: Add ability to override role on menu items
- ComboBox: Content should not be selected when comboBox isn't focused
- Adding react import to SpinButton.Props for classic module resolution.
- High contrast, accesibility, and other bugfixes
- Dropdown: adds a for property to dropdown labels.

## 4.35.2
Tue, 22 Aug 2017 10:09:55 GMT

### Patches

- Dropdown: Fixed bug where selectedKey selects dropdown option with a different key

## 4.35.1
Mon, 21 Aug 2017 10:19:29 GMT

### Patches

- Updating project dependencies.
- DetailsList: Move background color from .cell to .root for DetailsHeader
- PeoplePicker: Fixing A11yMAS accessibility issue in selected items.

## 4.35.0
Fri, 18 Aug 2017 16:32:33 GMT

### Minor changes

- Added ActionButton and CommandBarButton
- DetailsList: Resizing columns preserves justified mode.
- TooltipHost: new onTooltipToggle callback

### Patches

- Minor cleanup in merging of css class names.
- Dropdown: Fixed bug where selected state was not being removed from dropdown options
- FocusZone: presssing home/end inside of an input/textarea element should respect cursor location.
- Fix some unused code and typings in List
- Pickers: Fixed an issue where a loop would sometimes occur if values were resolved when input had an empty value.
- Toggle: fixed issue where disabled Toggles are clickable. Also cleaned up some of the styling.
- CommandBar: adding `aria-expanded` attribute to overflow menu.
- DetailsList: Making expand/collapse chevron in grouped list headers keyboard accessible.

## 4.34.0
Wed, 16 Aug 2017 10:11:43 GMT

### Minor changes

- Enhancing the calendar component.  Created option to have month picker overlayed on top of calendar so that the calendar remains in one column and switches between the two.  Added accessibility in new overlay to mimi OWA calendar.  Fixed issue: When the month picker is the only calendar, and screen is small, calendar would disappear when it should be visible.
- Calendar had extra 30px margin at the bottom of the component.  It interfered with the layout below the component.  The 30px margin is only necessary when the 'go to today' button is visible.
- Add ability to override page render behavior in List

## 4.33.0
Tue, 15 Aug 2017 10:19:22 GMT

### Minor changes

- Dropdown: no longer scrolls body when arrowing up down at the start/end of the menu. Also added `multSelectDelimiter` for tweaking how the title is rendered in a multi-select scenario.
- Pickers: fixing accessiblity and styling issues

### Patches

- ComboBox: Fix role typo to read heading instead of header
- Added menu indexes to the accessibility readouts for ContextMenus
- Added the ability to change the root element of a FocusZone

## 4.32.0
Fri, 11 Aug 2017 19:38:35 GMT

### Minor changes

- Mixing choice group fields with html input attributes
- Callout/Dropdown: Both components now support custom widths
- Nav: Add more options for nav link groups
- ComboBox: Fix some functionality for when the comboBox is controlled
- Calendar: added ability to customize navigation icons.
- Add onFocus and onBlur for Pickers, SpinButton, SearchBox, and Rating. Add IBasePicker with focus().

### Patches

- add StreamLogo and PowerBILogo icons
- Add target to hover card
- Nav: fix bug with sublink padding
- FocusZone: adjusting initialization logic to remove a potential memory leak in server rendered scenarios.
- ComboBox: Update example to work correctly now that StrictNullChecks have been put in place
- Nav: update isGroupCollapsed for new groups
- Change dropdown's role from "combobox" to "menu"
- Changed DatePicker role to be more accurate for screen readers
- Selection: Fix broken selection state in example.

## 4.31.0
Tue, 08 Aug 2017 15:28:32 GMT

### Minor changes

- ComboBox: Putting the child component styles in the main props and a few other fixes
- Moving SpinButton to Glamor based styling
- GridCell: Add a component to handle the shared logic managing selection and navigation of cells within all consumers of the Grid class. This change also updates the SwatchColorPicker to  use the GridCell component and removes  most of the logic now contained in the GridCell component.
- Checkbox: add custom render function for checkbox label.

### Patches

- BaseButton: Added screenReaderText styles to base button
- BaseButton: Remove the IconButton dependency that was introduced with SplitButton.
- Added role alert to "no results" view

## 4.30.1
Mon, 07 Aug 2017 10:22:46 GMT

### Patches

- Callout: Fix positioning comparision so it correctly repositions if the beak left/right position has changed"
- Dialog: fixing accessibility regression
- Prevent auto-selection on focus in DetailsList
- ResizeGroup: Prevent rendering to the hidden div on prop updates that has an initial data that is in the cache
- Textfield: removed background from textfield internal field

## 4.30.0
Fri, 04 Aug 2017 10:11:48 GMT

### Minor changes

- Dropdown: added `multiSelect` attribute, which controls multi-item selection. Added `selectedKeys` to `IDropdown` which provides access to all selected keys, in addition to `defaultSelectedKeys` and `selectedKeys` props.
- Add ScrollablePane and Sticky components

### Patches

- Button: Merge the ISplitButtonStyles into IButtonStyles
- Datepicker: updated icon size
- Expand hit target of DetailsRow checkbox
- ResizeGroup: Add another example use case to demo site
- PeoplePicker: Improved keyboard support and font size updates.

## 4.29.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- ConextualMenuItem: Support target value
- TypeScript 2.4.1 bump

### Patches

- add Spacer and Divider toolbox icon
- Searchbox: fixed bug when repeatedly entering a single character
- Callout: Reverting the callout border to it's previous state with a light border.

## 4.28.0
Wed, 02 Aug 2017 10:22:40 GMT

### Minor changes

- Enable strictNullChecks

### Patches

- Checkbox: Fix Edge bug where 2nd click event was being fired
- ChoiceGroup: allow developers to pass additional 'aria-labelledBy' ids
- ContextualMenu: Fixing issue where icons are not displayed.

## 4.27.0
Tue, 01 Aug 2017 10:13:55 GMT

### Minor changes

- SwatchColorPicker: Simplify component to remove the menu button and header/divider aspects that were built in to the component. Now the SwatchColorPicker only renders the grid portion and is more streamlined
- OverflowSet: Add focus method, class name and abstract item interface
- Panel: added prop to force footer to bottom of the page

### Patches

- Allow the X in a persona to receive focus and update focus when it is clicked

## 4.26.0
Mon, 31 Jul 2017 10:12:08 GMT

### Minor changes

- BasePicker: Add in the ability for it to be used as a controlled component with the property selectedItems

### Patches

- MessageBar: Fix system problems that display when component is on website
- Searchbox: Fixed broken disabled state and aligned styles with current XD styles

## 4.25.1
Fri, 28 Jul 2017 18:36:00 GMT

### Patches

- Checkbox: Adjusting the default text color to not use default button color, removing click behavior for disabled checkboxes, fixing an rtl margin issue.
- Fix Callout to get a valid element

## 4.25.0
Fri, 28 Jul 2017 10:23:10 GMT

### Minor changes

- Moving ComboBox component to use the styling library

### Patches

- Fix hover card scroll
- Checkbox: Added left textAlign style
- Update accessibility for checkable menu items

## 4.24.0
Thu, 27 Jul 2017 10:23:33 GMT

### Minor changes

- More type casting to get us on the path to enabling strictNullChecks

### Patches

- Dropdown: added onBlur support.
- Fix focus issues for Safari and Firefox on Mac OS
- Icons: Added new icons from 2.38
- Adds prop to process selection in BasePicker
- CommandBar: Accessibility fix for expand behavior

## 4.23.0
Tue, 25 Jul 2017 10:22:35 GMT

### Minor changes

- Button: Support expanded style state triggered by opened menu

### Patches

- Checkbox: Fixed label font size
- TextField: multiline variant font now correct, assuming the Fabric component wraps the application. A new selector was added which will force TEXTAREA elements to inherit the font.
- ResizeGroup: Prevent flashing when passing in new props
- ResizeGroup: Don't show a scrollbar while measuring the hidden div
- Textfield: Fixed high contrast border and textarea font family
- Textfield: Removed icon pointer events so that any click is click in textfield

## 4.22.0
Mon, 24 Jul 2017 10:24:30 GMT

### Minor changes

- Callout/ContextualMenu/Tooltip: we now mirror DirectionalHints in RTL layouts by default. To override this behavior, specify `directionalHintForRtl`

### Patches

- Fix application of aria properties on BaseButton.
- ResizeGroup: Add support for onGrowData
- Accessibility fixes for PeoplePicker
- Dropdown: Updated keydown handler to respond correctly to normal dropdown items

## 4.21.4
Fri, 21 Jul 2017 10:21:45 GMT

### Patches

- Do not redundantly set aria-label on command bar items.
- More strict null check fixes in office-ui-fabric-react
- Textfield: Fixed regression in disabled styles
- ResizeGroup: Use scrollWidth instead of clientWidth for measuring hidden div
- Fixed deletion of tag item when tag picker is disabled

## 4.21.3
Thu, 20 Jul 2017 10:11:23 GMT

### Patches

- SwatchColorPicker: Fix a recent regression in box-sizing seen on the external site for the swatchColorPicker
- Checkbox: remove unnecessary styles and element

## 4.21.2
Wed, 19 Jul 2017 21:40:34 GMT

### Patches

- Breadcrumb: Uses tooltip when breadcrumb text is truncated
- Fix CommandBar rendering commandText span when no item name is given: #2233.
- Start fixing some strictNullCheck errors
- DefaultButton: Make styles match design
- DetailsList: Adjust checkmark icon to use StatusCircleCheckmark icon
- Dropdown: List native props at top of div element

## 4.21.1
Mon, 17 Jul 2017 18:38:01 GMT

### Patches

- BasePicker: Removes onBlur to fix onSuggestionClick prevention and adds onBlur functionality to dismissSuggestions.

## 4.21.0
Mon, 17 Jul 2017 10:22:38 GMT

### Minor changes

- ComboBox: props have been adjusted to inherit from HTMLAttributes to allow fo props like onBlur to be mixed in. Note that this has forced the `autoComplete` prop to be changed to a string.

### Patches

- ComboBox: Fix a keyboard scrolling issue where the pending option would not be scrolled into view
- Allow deeply nested links to render in Nav
- Last pull request added the option to display the month picker by itself without the day picker, but selecting the month picker was not calling selectDate. This should fix that.

## 4.20.0
Fri, 14 Jul 2017 17:34:53 GMT

### Minor changes

- PeoplePicker: adding a custom validator prop
- DetailsList: Add compact mode to component, add column padding, fix styling and Check component sizing

### Patches

- ResizeGroup: Do measurements inside requestAnimationFrame

## 4.19.0
Thu, 13 Jul 2017 02:58:02 GMT

### Minor changes

- Addressing remaining TS 2.4.1 errors.
- DetailsList: Allow passing props to underlying List

### Patches

- TooltipHost: Fixed check which kept onRenderContent from working
- Fixing null reference exception caused if user does not specify imageSize along with imageSrc in choiceGroup
- List: Only draw a single window when receiving new items

## 4.18.0
Wed, 12 Jul 2017 01:49:50 GMT

### Minor changes

- Expose APIs of selectableOptions since they're required APIs for ComboBox component
- Adding ActivityItem component.

### Patches

- Fix styling issues with SplitButton. Add new split boolean property to Button.
- Fixing typings for TypeScript 2.4.1 compatibility.
- DocumentCard: Deprecate accentColor prop, reduce thickness of divider line
- Enable noImplicitAny
- MessageBar: Fixed collapsing text in multiline

## 4.17.1
Mon, 10 Jul 2017 19:18:55 GMT

### Patches

- Checkbox: reverting global class names to use ms-Checkbox-* prefixed values.
- Remove unnecessary line height
- Removed ARIA disabled from button, as already handled by button HTML attribute

## 4.17.0
Mon, 10 Jul 2017 10:22:21 GMT

### Minor changes

- ChoiceGroup: Allow image/icon labels to truncate when larger than parent. Provided onRenderLabel to add Tooltip or other decorations

## 4.16.2
Sat, 08 Jul 2017 05:59:27 GMT

### Patches

- AMD fix for GroupedList.

## 4.16.1
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Fixing an import breaking AMD modules related to GroupedList.

## 4.16.0
Fri, 07 Jul 2017 10:11:38 GMT

### Minor changes

- GroupedList: Add a new prop to ignore the collapse button on the column name bar when there's custom group header

### Patches

- Buttons: disabled buttons with hrefs now render as BUTTON elements instead of A tags, since BUTTON can support the disabled flag.

## 4.15.0
Thu, 06 Jul 2017 10:11:47 GMT

### Minor changes

- Add new component: HoverCard
- ResizeGroup: Add support for caching

### Patches

- Make details row cells use flex box and stretch to total row height.
- Toggle: Fixed aria-label that was missing from button
- CommandBar: Remove margin from command bar items

## 4.14.1
Tue, 04 Jul 2017 10:21:53 GMT

### Patches

- Breadcrumb: Fixed maxItems logic to put correct items into overflow

## 4.14.0
Mon, 03 Jul 2017 10:11:52 GMT

### Minor changes

- Changed the CSS for the checkbox so that it's easier to customize and center

### Patches

- GroupedList: Fixes a bug causing Toggle and other button elements within a GroupedList to not render correctly.

## 4.13.2
Fri, 30 Jun 2017 19:44:26 GMT

### Patches

- Breadcrumb: Use flexbox for layout to better support multiple font sizes
- MessageBar: Fixed padding regressions with multiline and no actions

## 4.13.1
Fri, 30 Jun 2017 10:23:15 GMT

### Patches

- Fixed spacing and vertical position of expand arrow, Added space between title and count, Changed to use flex box, Updated interactive state colors to use proper semantic slots
- Dialog: allow values in dialogContentProps to override all default values
- GroupedList: Role of groupedList changed from "grid" to "group"

## 4.13.0
Thu, 29 Jun 2017 20:48:31 GMT

### Minor changes

- Adding a new component: SwatchColorPicker

### Patches

- Button: Revert setting label font-weight to bold
- Add 'event' as first param for onColumnClick handler to match the param order.
- ComboBox: Fix a scrolling issue (#2090)
- Dropdown/ContextualMenu: Adjust height of items to 32px

## 4.12.1
Thu, 29 Jun 2017 10:13:16 GMT

### Patches

- Remove beak from CommandBar's and BaseButton's contextual menu
- -SpinButton: Fix crash when not providing value nor defaultValue. - SpinButton: Add initial delay of 400ms when holding the up or down arrow before spinning
- Force resolve picker on blue or delayed response.
- Fix: Combobox: text move its position in Edge during up/down arrow #2020: https://github.com/OfficeDev/office-ui-fabric-react/issues/2020
- Persona: Fix orange initials rendered as green

## 4.12.0
Wed, 28 Jun 2017 10:12:04 GMT

### Minor changes

- Persona: Adding image alt, defaulting to empty string

### Patches

- Fixed focusing first item in DetailsList
- MarqueeSelection: now with better performance in Edge.
- Textfield: Fixed layout of underlined textfield with error

## 4.11.0
Tue, 27 Jun 2017 01:26:31 GMT

### Minor changes

- Commandbar: fix synchronous reflow
- Enhancing the calendar component to allow for turning off the day picker and highlighting the "today" month in the month picker. This will match the behavior of the Timestrip component in today's JSMVVM OWA Calendar.

### Patches

- OverflowSet: Fix type definition to be compatible with latest @types/react
- Persona: Fixing image sizing to cover correctly.
- Enable forceConsistentCasingInFileNames tsconfig option

## 4.10.2
Fri, 23 Jun 2017 20:02:00 GMT

### Patches

- Icon: Adding `data-icon-name` attribute for debugging identification purposes.

## 4.10.1
Fri, 23 Jun 2017 04:12:23 GMT

### Patches

- Fix FocusZone stop eating spacebar presses in textarea fields
- DetailsList: Fixing regression in DetailsRow, and adding check in Image which was causing nullrefs.
- Route: Make implicit any explicit

## 4.10.0
Thu, 22 Jun 2017 21:45:08 GMT

### Minor changes

- Expose focus() on ISearchBox

### Patches

- ResizeGroup: Add dataDidRender prop that can be used to know what is actually rendered by a resizeGroup
- Fix some focus issues in DetailsList

## 4.9.2
Thu, 22 Jun 2017 10:13:03 GMT

### Patches

- Check: reduced size of selection check background by 2px
- Breadcrumb: Fixed overflow logic and extra icon
- Dropdown: fixed bug that didn't allow operating Dropdown as a controlled component
- Fix Persona control DOM reflow by passing ImageCoverStyle to Image control
- Dialog: Reworked deprecation logic to fix warnings
- Toggle: No longer triggers form submission

## 4.9.1
Wed, 21 Jun 2017 00:45:41 GMT

### Patches

- Icons: now with less redundant evaluation of styling, which improves render performance.
- Panel: Fixed header ID value

## 4.9.0
Tue, 20 Jun 2017 10:22:47 GMT

### Minor changes

- Breadcrumb: Switch resizing logic to resizeGroup

## 4.8.3
Sat, 17 Jun 2017 17:39:43 GMT

### Patches

- Icon: image icons now have less random "l" characters. Sorry about that!

## 4.8.1
Sat, 17 Jun 2017 06:27:45 GMT

### Patches

- Icon: iconName should pass through to the classname without casing alterations.

## 4.8.0
Fri, 16 Jun 2017 23:02:08 GMT

### Minor changes

- DetailsList: Remove Tooltip by defaul, allowing optional override.

### Patches

- Icon: patch to className change to add ms-Icon--* in cases where iconType is not provided.

## 4.7.2
Fri, 16 Jun 2017 19:39:47 GMT

### Patches

- Icon: adding back ms-Icon--iconName className to avoid breaking backwards compatibility.
- OverflowSet: Don't use the index as the key

## 4.7.1
Thu, 15 Jun 2017 23:55:18 GMT

### Patches

- CheckButton: Firefox high contrast fix

## 4.7.0
Thu, 15 Jun 2017 10:09:15 GMT

### Minor changes

- Dialog: Deprecated old duplicative props and moved them into modalProps and contentProps

### Patches

- Toggle: High contrast fix for Firefox

## 4.6.0
Wed, 14 Jun 2017 06:02:15 GMT

### Minor changes

- Dropdown: Fixed onRenderPlaceholder and update docs
- Adding Aria label props for Dialog

### Patches

- Buttons: Added `aria-haspopup` to buttons with menuProps.
- FocusZone: bidirectional movement now wraps on lines.
- Bumping fabric-core dependency to have Segoe UI be part of the font fallback.
- FocusZone should reset active element if it is not tabbable.
- Dropdown: adding aria attribute `aria-readonly=true` and adjusting `aria-owns` to only show in cases where it is opened.
- Enable strictNullChecks in utilities package
- PeoplePicker: fixing styling, focus, and extra rerendering issues.
- Dropdown: Fix keyboard focus on Header/Separator items

## 4.5.1
Tue, 13 Jun 2017 10:13:21 GMT

### Patches

- High contrast fixes for Pivot, Choicegroup and Checkbox
- withResponsiveMode: Adding error handling around the case where window.innerWidth throws an exception.

## 4.5.0
Mon, 12 Jun 2017 01:47:18 GMT

### Minor changes

- Component properties now extend React.HTMLAttributes, rather than React.HTMLProps

### Patches

- Updating minified bundle to exclude debug warnings.
- Enable no implicit any in utilities package
- Toggle: add 'cursor: pointer'

## 4.4.2
Thu, 08 Jun 2017 10:20:07 GMT

### Patches

- TextField: improves layout for IE.

## 4.4.1
Thu, 08 Jun 2017 00:18:05 GMT

### Patches

- ITheme: Make palette a required prop

## 4.4.0
Tue, 06 Jun 2017 07:41:47 GMT

### Minor changes

- Toggle: theme now injectable through Customizer.

## 4.3.2
Tue, 06 Jun 2017 06:06:46 GMT

### Patches

- Adding tslib dependency to reduce redundant code.

## 4.3.1
Tue, 06 Jun 2017 00:50:06 GMT

### Patches

- DragDropHelper: Fix to show ghost element when dragging on Firefox
- Buttons: allowing theme to be provided via Customizer.
- DragDropHelper: Fix TSLint warnings
- TextField: Show red border when invalid

## 4.3.0
Fri, 02 Jun 2017 01:19:35 GMT

### Minor changes

- Dropdown: Expose aria label prop for the dropdown options.
- Fixing an issue where restoring focus was not working due to a regression

## 4.2.0
Thu, 01 Jun 2017 16:34:03 GMT

### Minor changes

- Update DetailsList to support screen readers with cleaner keyboarding flow
- Styling: Add support for overriding the styles on the checked hovered, checked pressed, and checked disabled states
- Update elementToFocusOnDismiss on unmount in focus trap zone

### Patches

- DetailsList: Last column measured correctly when `checkboxVisibility` set to `hidden`.
- Fix css for MessageBar, and support single line message bar styling
- Panel: fix regression in large Panel size
- ResizeGroup: Make sure that it renders contents when there are no more scaling steps and it doesn't fit

## 4.1.1
Wed, 31 May 2017 01:58:23 GMT

### Patches

- BasePicker: Removing extraneous unnecessary required non-typesafe prop that isn't being used.
- ResizeGroup: Reduce render time when reducing the width of the container.

## 4.1.0
Tue, 30 May 2017 20:23:45 GMT

### Minor changes

- PeoplePicker: Updated to match OWA people picker and Fabric toolkit spec

## 4.0.0
Tue, 30 May 2017 03:27:20 GMT

### Breaking changes

- Updated dependency to Fabric Core 7
- The styling package is now a dependency of fabric-react, which brings in the initial steps towards offering consumers a much better way to customize components to meet their requirements. The Button components and Toggle components have so far been converted to use the styling utilities. We will be ellaborating more on this as we refine our patterns towards customization and refine the documentation.

### Minor changes

- Exposes setSelectionRange function to TextField component.

### Patches

- DetailsList: initialFocusedIndex is considered on already mounted rows
- SelectionZone: Update behavior to fix using up/down arrows to navigate between groups in a GroupedList.
- Introduce prop-types instead of React.PropTypes
- List: improved measure logic and fix nested list scroll problem
- ResizeGroup: Reduce the number of render calls when reducing the width.

## 2.34.2
Sat, 27 May 2017 01:47:19 GMT

### Patches

- ContextualMenu: prevent Narrator to announce items twice.

## 2.34.1
Fri, 26 May 2017 10:21:03 GMT

### Patches

- Persona: Updated test to match new logic for calculating initials.
- ResizeGroup: Debounce window resize events to improve performance

## 2.34.0
Thu, 25 May 2017 10:22:10 GMT

### Minor changes

- DatePicker: Fix for accessibility issues

## 2.33.0
Wed, 24 May 2017 23:52:09 GMT

### Minor changes

- ChoiceGroup: Support custom option labels
- ContextMenu: added `useTargetWidth` property to match the width of the anchor element when true the context menu will apply target element's width to it
- Spinner: support for status announcement

### Patches

- Fixes bug where ResizeGroup gets stuck in an infinite render loop when subsequent calls to onReduceData does nothing.
- Add unit tests to ResizeGroup
- Dropdown: Added title attribute for individual options.
- SearchBox: Fixed onBlur not removing focus

## 2.32.0
Tue, 23 May 2017 10:16:04 GMT

### Minor changes

- Dialog: created a new component (DialogContent) that contains the content of the Modal inside the Dialog

### Patches

- FocusZone: fixing edge case with IE when activeElement is set to an unfocus-able element.
- Adding a constant for all the test images and replacing the hard coded  example paths

## 2.31.0
Fri, 19 May 2017 10:20:22 GMT

### Minor changes

- Adding the ability for buttons to be toggled

### Patches

- Searchbox: Updated border styles to better support high contrast mode
- Breadcrumb component now follows aria guidelines for roles and structure and added example for accessible breadcrumb"

## 2.30.2
Thu, 18 May 2017 10:09:58 GMT

### Patches

- Adds outlines to SearchBox in HC modes
- BaseButton: now respects the isBeakVisible property on the menu props
- Stop setting a height on the menu items inside of a ContextualMenu to better support onRender overrides on MenuItems

## 2.30.1
Tue, 16 May 2017 22:39:55 GMT

### Patches

- Change pickeritemprops to correctly extend htmlattributes
- List: Add scrollToIndex to public interface

## 2.30.0
Tue, 16 May 2017 21:47:38 GMT

### Minor changes

- DatePicker: adding a disabled property support.

### Patches

- Pickers: Adds ability to disable pickers
- Adjust styling on menu drop shadows.
- Button: Added aria-expanded if props.menuProps. Changes from false to true when opened
- Button: default type to 'button'

## 2.29.0
Mon, 15 May 2017 10:19:13 GMT

### Minor changes

- Dropdown: Add ability to set custom props on the Dropdown's Callout

### Patches

- Make name prop optional on ContextualMenu
- Date picker: Reduce min-width for the holder component

## 2.28.0
Fri, 12 May 2017 10:19:14 GMT

### Minor changes

- OverflowSet: Fixed issue that prevented it from working when there are no overflow items.

## 2.27.3
Thu, 11 May 2017 17:07:55 GMT

### Patches

- TextField: font size of textfield reverted to 14px.

## 2.27.2
Thu, 11 May 2017 10:20:16 GMT

### Patches

- Button: Add button example
- ContextualMenu: Fixed an issue where submenu items wouldn't update properly when new props were passed own
- Lay some groundwork for converting to semantic slots, starting with input text fields.

## 2.27.1
Tue, 09 May 2017 10:09:56 GMT

### Patches

- Day picker: Ensure we use values from nextProps when props are updated when generating weeks
- DatePicker: Use todaysDate instead of today in _getWeeks

## 2.27.0
Mon, 08 May 2017 21:31:57 GMT

### Minor changes

- TextField: `borderless` flag added for suppressing the border style.
- Tooltip: Added custom content render function and exposed tooltip props to

### Patches

- ChoiceGroup: Fixed broken focus border

## 2.26.0
Mon, 08 May 2017 10:19:18 GMT

### Minor changes

- Callout: Add minPagePadding. Dropdown: Expose calloutProps
- SearchBox: added the ariaLabel optional property
- Calendar: make today value configurable to support different timezone

### Patches

- Dropdown: Add aria readonly attribute

## 2.25.1
Fri, 05 May 2017 10:18:19 GMT

### Patches

- CommandBar: Support customized onRender for command bar item
- High contrast fixes for dropdown and slider
- Toggle: removing an unnecessary React warning when passing in defaultChecked value.
- Persona: Fixed clipping issue when using size28
- Pivot: increased specificty to fix button styles overriding pivo

## 2.25.0
Thu, 04 May 2017 10:08:59 GMT

### Minor changes

- Dropdown: New placeHolder text feature allows dropdown to act more like a traditional input field
- Facepile: Added `className` prop.

### Patches

- Dropdown: Tab should close dropdown and tab to next item in tab order
- OverflowSet: New Overflow Set componet to create sets of elements with overflow showing in callout
- ContextMenu: fix a potential bug. All foreground colors need to be slots in the same category because the category has its own background color, in order to insure accessibility.
- DetailsList: Added aria properties `aria-colindex`, `aria-rowindex`, `aria-colcount` and `aria-rowcount` to appropriate sub elements.
- Moved aria label from ul to menu div

## 2.24.2
Wed, 03 May 2017 10:17:38 GMT

### Patches

- DetailsList: convert colors over to use semantic slots
- TextField: Fixed bugs in textfield font family and focus borders

## 2.24.1
Tue, 02 May 2017 18:32:23 GMT

### Patches

- TooltipHost: Add host className
- Modal: Fixed bug where props and state were passed in reversed order
- Calendar: Fix ariaLabel for previous month button

## 2.24.0
Tue, 02 May 2017 10:09:08 GMT

### Minor changes

- Callout: support for aria role, label and description
- Pivot: Allow rendering PivotItem headers without content.

### Patches

- Panel: Updating the close button's height, container, margin, and size slightly.
- List: correctly measure pages when using display: none.
- Calendar: Support auto-navigation to next/previous month when selected date changes via props
- Shifting the ContextMenu over to semantic slots for colors.

## 2.23.3
Mon, 01 May 2017 10:18:36 GMT

### Patches

- Toggle: Make toggle control more universally accessible across screen readers.

## 2.23.2
Fri, 28 Apr 2017 18:00:56 GMT

### Patches

- TooltipHost: Fixing AMD import to pull getId from the Utilities AMD-friendly top-level import.

## 2.23.1
Fri, 28 Apr 2017 10:09:16 GMT

### Patches

- Dropdown: Fix an issue with screenreaders not reading menu items.
- Add aria-describedby to tooltiphost component

## 2.23.0
Thu, 27 Apr 2017 10:18:03 GMT

### Minor changes

- TooltipHost: Allow showing tooltip only if there's overflow
- TextField: Convert to flexbox, support addons

### Patches

- Don't break intra-word in tooltips UNLESS required for overflow by using CSS overflow-wrap property. Fixes #1627.
- PeoplePicker: Adding vertical-align to the member list version of the people picker.

## 2.22.1
Wed, 26 Apr 2017 10:19:05 GMT

### Patches

- Dropdown: now correctly shows ellipsis when text overflows

## 2.22.0
Tue, 25 Apr 2017 10:19:34 GMT

### Minor changes

- Callout: Allow Callout to specify background color.

### Patches

- Drop Down: Adds required -- class/style + error message state
- MessageBar: Fixed links not working in message bars
- Modal: Updated animation to use local transition and removed Fabric Core dependency
- Panel: Fixed drop shadow for left side panel
- Searchbox: IE11 keystroke miss, overflow fix
- DetailsList: when initial focus needs to be set to a row, we do so asynchronously, after page layout is completed, which reduces observed cost of the focus call from 30ms to 3ms. This should improve glass rendering performance.

## 2.21.0
Fri, 21 Apr 2017 06:23:54 GMT

### Minor changes

- Toggle: Improve screen-reader accessibility.

### Patches

- Calendar: Add ARIA labels to day and month buttons
- Callout/Tooltip: Updated default gapSpace from 16 to 0
- DocumentCard: Change persona size from extraExtraSmall to extraSmall and update compact layout title font size to m-plus according to new design.

## 2.20.2
Wed, 19 Apr 2017 16:54:26 GMT

*Version update only*

## 2.20.1
Wed, 19 Apr 2017 15:36:48 GMT

### Patches

- References to @uifabric/utilities have been updated to refer to the root Utilities.ts export, which is more AMD friendly than the package import.

## 2.20.0
Wed, 19 Apr 2017 03:17:40 GMT

### Minor changes

- Added new Modal control, for hosting content in a Dialog-style modal popup without any inner chrome

### Patches

- DatePicker: Improve screen-reader accessibility.
- Regression Test: Contextual Menu
- fix nit for Suggestion.tsx

## 2.19.0
Tue, 18 Apr 2017 15:17:13 GMT

### Minor changes

- DatePicker: Add option to not automatically open on focus.

## 2.18.0
Tue, 18 Apr 2017 03:09:12 GMT

### Minor changes

- Button: `icon` deprecated in favor of `iconProps`. `menuIconName` deprecated in favor of `menuIconProps`. All Buttons now modeled as HOCs around BaseButton, as apposed to subclassing which is a less ideal way of modeling buttons.
- DetailsList: added `minimumPixelsForDrag` setting to allow the user to override the minimum drag distance before starting a drag operation.
- Dropdown: Add dividers and headers to component

### Patches

- DetailsList: header now stretches correctly, group headers stretch correctly, column width calculations respect newProps rather than current props.
- SearchBox: Updated layout to use flexbox, follow spec more closely in padding and height
- SelectionZone: Spacebar and Enter key presses within selectionzone button/a/input will work properly

## 2.17.0
Fri, 14 Apr 2017 03:06:28 GMT

### Minor changes

- ColorPicker: Update the entire control whenever any part is updated

### Patches

- DatePicker: Restore focus when exiting picker.
- Regression Tests: Button and checkbox
- CommandBar: Render items with submenus as interactive buttons, even if they don't have an onClick handler
- DatePicker: Fix for long lables and Calendar icon
- PeoplePicker: Textfield cursor fix in edge
- Fix alignment issues for unselectable items in DetailsList
- DatePicker: Persist selected date across re-renders
- FocusZone: filtered out keypresses in input fields from triggering actions
-  Tag picker: Fix for margin in overflow

## 2.16.0
Wed, 12 Apr 2017 16:04:37 GMT

### Minor changes

- Improved keyboard and screen reader support for the Facepile control.  Added aria-describedby to FocusZone control.
- Dropdown: Add ability to open and close via space bar.

### Patches

- Details List: Fixes clipped buttons inside of list cells
- Dropdown: Prevent the chevron icon from being read by screen readers.
- CommandBar: Support hrefs in command bar item
- DetailsList: no longer renders a horizontal scrollbar if a vertical scrollbar appears.
- Facepile: Fixed firefox bug where explicit sizes were needed on persona buttons
- MessageBar: Adds borders in HighContrast mode
- Fix CSS issue in ChoiceGroup in IE11
- People Picker: Fix issue in IE11 where long names were not properly truncated
- PeoplePicker: Have the suggestions list follow the cursor instead of always being aligned left to input box
- TextField: Fix positioning of icon
- Toggle: Adding min width to inner container.
- Dialog: Add close button to non-blocking variants
- Pivot: Fix ariaLabel prop for PivotItem
- Pivot: Add div native props to PivotItem
- CommandBar: Remove aria-disabled="true" for disabled menu items

## 2.15.0
Sat, 08 Apr 2017 03:18:28 GMT

### Minor changes

- ContextualMenu: adding in onMenuOpened callback

## 2.14.1
Fri, 07 Apr 2017 03:14:49 GMT

### Patches

- VisualTesting: Fixed npm start by moving visual test page from index.html to visualtestindex.html

## 2.14.0
Thu, 06 Apr 2017 03:12:13 GMT

### Minor changes

- Adding in visual regression testing

### Patches

- MessageBar: Multiple message bars will have proper margins to seperate them
- Panel: Fixed selector bug that broke extraLarge panel
- TagPicker: Fix for long tags.

## 2.13.0
Wed, 05 Apr 2017 03:50:41 GMT

### Minor changes

- ProgressIndicator: support for aria-valuetext

### Patches

- BasePicker: `componentWillReceiveProps` method was incorrectly assuming the wrong parameters. Changed method to `componentWillUpdate` as intended. Also addressing some focus issues by moving the `FocusZone` to be hosted outside of the `SelectionZone`.
- GroupedList: Allow header/footer customization of nested groups

## 2.12.0
Tue, 04 Apr 2017 20:08:53 GMT

### Minor changes

- Panel: adding `customWidth` property and PanelType.custom value to support custom panel widths.

### Patches

- Updating fabric dependencies to use ranges.

## 2.11.0
Tue, 04 Apr 2017 15:18:51 GMT

### Minor changes

- In components which expose a public API such as `Dropdown` which implements `IDropdown`, to access the exact interface we've exposed a `componentRef` property on all components. This property replaces typical `ref={ c => this._component = c }` usage, as componentRef is guaranteed to access the public contract of the component regardless of the higher-order component or decorator wrapping it. If you are accessing the public API of a component, replace your `ref` usage with `componentRef`.

## 2.10.6
Tue, 04 Apr 2017 03:12:41 GMT

### Patches

- Removing TypeScript files from being binplaced within the lib folder.
- ToolTip: fix for long tips

## 2.10.5
Sat, 01 Apr 2017 03:12:59 GMT

### Patches

- Dialog: Removed IE9 lineheight hacks so that lineheight wouldn't affect internal components

## 2.10.4
Thu, 30 Mar 2017 21:04:29 GMT

### Patches

- Overlay: disabling body scroll on show to prevent scrolling under the overlay.
- DocumentCard: Personas rendered within look correct.

## 2.10.3
Wed, 29 Mar 2017 19:43:19 GMT

### Patches

- DocumentCard: Persona import was not AMD friendly.

## 2.10.2
Wed, 29 Mar 2017 18:15:29 GMT

### Patches

- FocusZone: Adding support for default browser behavior when pressing alt + a key.
- Chaning scss imports to use typescript `import` instead of `require` so that lib-amd build actually imports via AMD require and not commonjs require.
- PeoplePicker: Adding changes for multiple selection onChange

## 2.10.1
Wed, 29 Mar 2017 15:10:15 GMT

### Patches

- ChoiceGroup: Update styles

## 2.10.0
Wed, 29 Mar 2017 03:18:50 GMT

### Minor changes

- ChoiceGroup: adding `selectedKey` and `defaultSelectedKey` to provide a way to control selection, other than to micromanage the `checked` boolean in individual options.
- Persona: Added a 28px size

### Patches

- DocumentCardActivity: Changes made to fix the default color to Persona

## 2.9.0
Tue, 28 Mar 2017 16:11:18 GMT

### Minor changes

- DetailsList & List: Use getKey as items render key

## 2.8.0
Tue, 28 Mar 2017 03:05:36 GMT

### Minor changes

- DetailsList: Implement Drag Drop support

### Patches

- Router: tweaked some of the logic to render component as a fallback if getComponent doesn't immediately return a value.
- TextField: Fix examples and comments

## 2.7.1
Fri, 24 Mar 2017 20:25:07 GMT

### Patches

- Recreated npm publish. It seems that the current published bits are not reflecting the focus mixin, which is busting some focus css styling. Trying to pinpoint why some machines seems to produce `border: 1px solid color` vs others that leave off the `px` in the unit.

## 2.7.0
Fri, 24 Mar 2017 04:26:48 GMT

### Minor changes

- ContextualMenu: onItemClick prop added

### Patches

- CommandBar: Fixes ugly focus border when clicked (Chrome/Mac)
- Callout: preventDismissOnScroll prop added and set to default false
- Contextual Menu: Made change to allow arrow keys to loop over item
- Panel: Title text updated with correct lineheight and removed overflow styles

## 2.6.0
Thu, 23 Mar 2017 03:13:02 GMT

### Minor changes

- Button: Updated props to include contextualProps so that contextual menu could be passed to button
- Calendar: Adding support for date ranges: day, week, month so when a user selects a date, the corresponding range is auto-selected. Adding a new prop to hide the today link. Adding a new prop to auto navigate to to the next/previous month if the user selects a date that falls outside the current month. Also fixing some minor styling issues around focused date so it plays nicely with range selection.

### Patches

- TextField: Accessibility fixes for error message
- TooltipHost: CalloutProps type fixed, and mixed properly in Tooltip
- Popup: It now passes triggering KeyboardEvent to onDismiss handler

## 2.5.4
Wed, 22 Mar 2017 03:18:05 GMT

### Patches

- ContextualMenu: Fix an issue where anchor item would not display ellipses properly on overflow.
- Dropdown: Added class to dropdown label and dropdown container so that they can be targeted with css
- ContextualMenu: Remove role='menuitem' for child element for LI in ContextualMenu

## 2.5.3
Tue, 21 Mar 2017 03:20:12 GMT

### Patches

- Nav: Fixing an issue where the default expand state for a group was not initialized correctly, resulting in having to click multiple times to collapse a group.
- Facepile has an excess margin of 4px below it which needs to be removed. It also uses float's which is pretty retro!

## 2.5.2
Fri, 17 Mar 2017 18:01:45 GMT

### Patches

- DetailsList: header sizing fixed (was a css selector tweak that caused the issue.) Also added `iconName` to IColumn to specify an iconName like "Mail". The `iconClassName` property is still preserved, but is piped into the className of the Icon component.

## 2.5.1
Fri, 17 Mar 2017 03:05:52 GMT

### Patches

- ChoiceGroup component: Distinguishes HC border from focus border, removes double stroke, refactors to use common mixin
- List: Add aria list role

## 2.5.0
Thu, 16 Mar 2017 03:05:54 GMT

### Minor changes

- DocumentCard: Add aria role and keyboard handling
- Panel: Added sticky footer section and broke each panel region into seperate onRender fucntion.

### Patches

- FocusZone: Spacebar no longer scrolls page when in focuszone or selectionzone, and acts as selecting action
- DetailsList: headers now have the correct font applied and use a transparent background to fix the IE11 styling, which doesn't like "inherit".
- TextField: Fix for multiple onChanged calls

## 2.4.0
Wed, 15 Mar 2017 03:06:37 GMT

### Minor changes

- DetailsList: adding `onColumnResize` callback which wil execute when a column is being resized.

## 2.3.0
Tue, 14 Mar 2017 03:15:10 GMT

### Minor changes

- PeoplePicker: Add rendering overrides

### Patches

- TextField component: hiding -ms-clear pseudo-element for bug #1216

## 2.2.1
Sat, 11 Mar 2017 04:11:58 GMT

### Patches

- Pivot: selected underline is now visible in high contrast mode.

## 2.2.0
Fri, 10 Mar 2017 20:41:04 GMT

### Minor changes

- Dropdown: Adding a required property which will be passed into the Label.
- Adjusting React peer dependency to include v16.0.0-0 in the acceptable range for testing with v16.

## 2.1.1
Fri, 10 Mar 2017 16:16:07 GMT

### Patches

- Dropdown: Updates the `aria-disabled` attribute based on disabled state.

## 2.1.0
Thu, 09 Mar 2017 22:06:44 GMT

### Minor changes

- Breadcrumb: Implement onRenderItem

## 2.0.2
Thu, 09 Mar 2017 16:17:07 GMT

### Patches

- CommandBar: Set aria-disabled="true" for disabled menu items
- Dropdown - Remove aria-activedescendant when not dropped
- MessageBar - Fix timeout issue

## 2.0.1
Thu, 09 Mar 2017 06:33:00 GMT

### Patches

- No changes, required republish.

## 2.0.0
Thu, 09 Mar 2017 06:11:07 GMT

### Breaking changes

- IMPORTANT:

This pull request converts ALL components over to use module css. What does this mean?

* All classnames, such as ms-Button, will now be obfuscated to be unique.
* Pages that host multiple versions of the same component will not stomp on each other and will be safe.
* All existing class names are left intact, so current customizations should not break.

Going forward, we will adhere to using local scoped module rules specifically to avoid breaking ourselves when multiple versions. Additionally we are evaluating a much more robust and contractual way of defining our styles.

Problems that still exist:

1. You must rely on class names to customize, and if those class names change, your customizations are broken.
2. Specificity of our rules is an implicit contract that is easy to break. It is often unclear and partners usually give up early fighting the specificity war and use `!important` to stomp on it, which is not ideal. If a partner does use "more specific" rules today, tomorrow they many not be specific enough.
3. RTL rules in particular are very specific. When something that was once not RTL specific is changed to RTL, it becomes implicitly more specific, and thus breaks specificity contract.
4. The bundles themselves have a lot of duplicate css. Because we generate rtl rules and theme tokens at build time rather than at runtime, we must download extra code, which bulks up the download size.
5. Fabric core rules, which we implicitly rely on, are a hard thing to chase. If your page depends on core 6, and you're also using react components, you will find bugs. We'd like to eliminate this dependency so that it is reliable and contractual to use components. If you use a `ContextualMenu`, it should animate without depending on fabric-core css to be loaded.

We are planning to address these and evaluating library options. Issue being tracked here: #983


### Minor changes

- Button: the `label` property used to be meant to render text within the button, but it overlaps with the html `label` attribute. While `label` will still exist, it will now push content into the button label attribute, and we've added a `text` property  to allow for a formal way of defining the textual content displayed within the button. Passing in a child string to the button will still work, but `text` wil
- IContextualMenuItemProps: the `styles` property can now be passed through to apply styling to menu items.

## 1.14.3
Thu, 09 Mar 2017 00:16:39 GMT

### Patches

- BaseButton: `rootProps` is now correctly mixed in with `props`. Please note that `rootProps` is deprecated and should not be used, but this fix simply ensures that the deprecated backwards compatibility works.
- fix base picker shift + tab resolving the people, should move focus instead.

## 1.14.2
Wed, 08 Mar 2017 04:07:13 GMT

### Patches

- Updated facepile button to use BaseButton so it inherits all the base button styles

## 1.14.1
Fri, 03 Mar 2017 16:09:20 GMT

### Patches

- TextField: fix onchanged trigger issue
- Assume images are portraits until proven otherwise

## 1.14.0
Thu, 02 Mar 2017 04:10:04 GMT

### Minor changes

- Pivot: support custom rendering for pivot links
- Persona: adding a flag to avoid the fade in of images persona thumbnails.

### Patches

- Persona: Make it possible to have pink backgrounds.
- FocusTrapZone: Fixed a scenario where multiple instances would fight over focus.
- Dialog: empty aria attributes if no subtext is provided

## 1.13.1
Wed, 01 Mar 2017 20:31:22 GMT

### Patches

- Persona: previous published version was referring to an old utilities library without the getInitials utility function. Updating to this build will pull the correct utilities version which should fix the build error.
- Toggle - support for aria attributes, fix button type

## 1.13.0
Tue, 28 Feb 2017 16:10:27 GMT

### Minor changes

- TextField - Option to supress validation on load

## 1.12.2
Tue, 28 Feb 2017 04:07:31 GMT

### Patches

- Panel: minor css fix for the close button to ensure it receives clicks correctly.
- TextField: Fixed IE10 documentation input change behavior
- Updating Link props so that we can use Object spread syntax

## 1.12.1
Sat, 25 Feb 2017 04:11:32 GMT

### Patches

- move aria-sort attr of detailsList headerColum to the right place
- Persona: Improve default manner of abbreviating non-Latin names.

## 1.12.0
Thu, 23 Feb 2017 04:11:45 GMT

### Minor changes

- Dropdown: Updated dropdown component to be composed of several onRender functions, and  for render container to use panel under medium breakpoint

### Patches

- TextField - Allow aria attributes override

## 1.11.0
Tue, 21 Feb 2017 16:15:42 GMT

### Minor changes

- Deprecation of SpinnerType in favor of more semantic SpinnerSize. Extra small, small and medium variants added.

### Patches

- Dialog: Accessibility fix for confirmation dialogs
- Return suggested items to original padding values, add display block to fix following space due to inline-block
- Support to pass id to TextField and Toggle
- Fix keyboard focus order in MessageBar

## 1.10.0
Tue, 21 Feb 2017 04:15:21 GMT

### Minor changes

- Fixed issues with drag/drop after item refresh.

## 1.9.2
Mon, 20 Feb 2017 16:07:02 GMT

### Patches

- Aligning Breadcrumb to design guidance and fix for chevron position at smaller breakpoints

## 1.9.1
Thu, 16 Feb 2017 16:06:51 GMT

### Patches

- DatePicker: Makes props optional, sets default props for strings
- MessageBar: now allows dismiss action for single line messages.

## 1.9.0
Thu, 16 Feb 2017 04:04:41 GMT

### Minor changes

- GroupedList: Added `hasMoreData` flag to `IGroup` for rendering a plus character for groups that have indeterminate counts.

## 1.8.0
Wed, 15 Feb 2017 18:10:58 GMT

### Minor changes

- In order to protect customers that bundle 2 different versions of the same component on the page, we are moving the rules defined by fabric components to CSS modules. This first change only affects the `Toggle` and `Label` components, which have been updated to scope their rules inside of hash-safe class names. No existing class names (`ms-Toggle` for example) have been removed, so any customer customizations should continue to work as expected. This means if you render an old v1 Toggle with a new v2 Toggle compoennt, their class definitions will not conflict.

## 1.7.2
Tue, 14 Feb 2017 20:57:58 GMT

### Patches

- Dropdown: uncontrolled dropdowns now correctly set the selected item as expected. Test coverage added.

## 1.7.1
Tue, 14 Feb 2017 04:12:27 GMT

### Patches

- Checkbox: reducing border width to 1px.

## 1.7.0
Mon, 13 Feb 2017 08:15:53 GMT

### Minor changes

- Changes to Checkbox Props and ChoiceGroup Props to support StrictNullChecks

### Patches

- Updating package.json dependencies to exclude typings packages.

## 1.6.0
Sat, 11 Feb 2017 04:10:39 GMT

### Minor changes

- ColorPicker: adding `alphaSliderHidden` property to hide the alpha slider.

### Patches

- Breadcrumb: Fixed keyboard activation of items
- Dropdown: update selectedIndex when options change
- ChoiceGroup: Adding ability to use Icons
- Button: Fix various bugs in button styling particularly to do with disabled states.
- FacePile, Persona: Reverted changes to title attribute from #875
- Panel: animation no longer styled fixed, which was causing issues downstream with opening it.

## 1.5.5
Wed, 08 Feb 2017 05:10:53 GMT

### Patches

- Moved all examples from this package into a separate app, so that we can fix imports in the code examples to be the correct imports.

## 1.5.4
Tue, 07 Feb 2017 20:34:17 GMT

### Patches

- Panel: onDismiss correctly called now before animation starts.

## 1.5.3
Tue, 07 Feb 2017 01:57:25 GMT

### Patches

- Button: removing vertical-align top which was causing alignment problems.

## 1.5.2
Sat, 04 Feb 2017 04:05:32 GMT

### Patches

- Image: Now correctly loads SVG images in Edge.
- Pickers and Popup: Fixed a bug where having a picker in a dialog could cause the dialog to be dismissed on escape press

## 1.5.1
Sat, 04 Feb 2017 00:27:49 GMT

### Patches

- BaseButton: Resolving an issue where Buttons would not render children.

## 1.5.0
Fri, 03 Feb 2017 19:02:12 GMT

### Minor changes

- Updated all enums to use explicit numbers

### Patches

- Fixing Facepile imports to be AMD friendly

## 1.4.0
Fri, 03 Feb 2017 04:10:11 GMT

### Minor changes

- Button: major css cleanup, refactoring out BaseButton so that variants are cheap to build from bytes perspective.
- Dropdown: changes to include id and ariaLabel
- List: allow scrolling invidual items into view
- Router: adding support for asynchronously loading components via the `getComponent` prop in the `<Route>` component.
- Dialog: new `onDismissed` callback added to be called when the dismiss animation is complete.
- Panel: new `onDismissed` callback added to be called when the dismiss animation is complete.
- Persona: Added new xxs Persona size.  Fixed broken presence icons in high contrast mode.
- Facepile: Updated to be able to use new xxs size for Persona.

### Patches

- BasePickerBelow: add support for focuszone innerkeystroke"
- ContextualMenu: `shouldFocusOnMount` is now properly handled as expected.
- Breadcrumb: Change item to render as span if it doesn't have onClick
- PeoplePicker: Improve demo page and the way menuitembelow works
- TextField: minor code cleanup, added ITextField interface and documentation.

## 1.3.7
Wed, 01 Feb 2017 04:04:05 GMT

### Patches

- Breadcrumb: Fix hover style to match OneDrive
- CommandBar: Add hover state to ms-CommandBarItem

## 1.3.6
Tue, 31 Jan 2017 17:04:31 GMT

### Patches

- CommandBar: no longer throws nullref in dismiss handling.

## 1.3.5
Tue, 31 Jan 2017 01:16:17 GMT

### Patches

- Fixing utility import to be AMD friendly.
- Documentation: Update component pages "Also available in" link to point to new JS site

## 1.3.4
Sat, 28 Jan 2017 04:09:51 GMT

### Patches

- Command Bar: context menus stay open after update if the open menu is still in the new props. Also, propagates most properties from subMenuProps to opened ContextualMenus

## 1.3.3
Fri, 27 Jan 2017 04:09:14 GMT

### Patches

- Callout: Add back in animations
- Dropdown: now supports a custom option renderer.

## 1.3.2
Thu, 26 Jan 2017 16:10:53 GMT

### Patches

- ColorPicker: now is AMD friendly and uses local typesafe utilities that will be built with the rest of the code.
- ContextualMenu: keydown events now call preventDefault to prevent the browser from doing unnecessary things.
- SelectionZone: clicking in a non-interactive area clears selection only within the scrollable parent area. This refines the clear behavior slightly.
- Dropdown: screen reader now will read out the current selected option on first focus of dropdown with an option selected.
- Pivot: state updates may be asynchronous, and it should not rely on this.state for calculating the next state.

## 1.3.1
Thu, 26 Jan 2017 04:03:12 GMT

### Patches

- Button: Restored Hero variant and added normal button as an alias of default. Fixes issues introduced in #811

## 1.3.0
Wed, 25 Jan 2017 04:11:36 GMT

### Minor changes

- DetailsList: onItemContextMenu now works as expected.
- List: add 'scrollToIndex' method
- Update Button Component to use individual varient components rather than buttonType property

### Patches

- Breadcrumb: Fix focus rect by removing outline from .ms-Breadcrumb-itemLink on focus state.

## 1.2.4
Tue, 24 Jan 2017 16:20:54 GMT

### Patches

- Image: Load state is erroneously set as loaded when changing the src prop
- MessageBar: fix first time message annoucement

## 1.2.3
Tue, 24 Jan 2017 04:11:19 GMT

### Patches

- ToolTip: Dismiss tooltip on scroll

## 1.2.2
Sat, 21 Jan 2017 04:06:35 GMT

### Patches

- PeoplePicker: personas now correctly truncate when the input field is too small.
- Pickers: Fixed a bug where you could not delete multiple selected items"
- Suggestions: Fixed an error which would occur if noResultsFound string was not passed to suggestions"

## 1.2.1
Fri, 20 Jan 2017 04:03:22 GMT

### Patches

- ContextualMenu: fix bug where an icon would have ms-icon--undefined in it's classname'

## 1.2.0
Thu, 19 Jan 2017 04:08:35 GMT

### Minor changes

- DetailsList: adding `selectionPreservedOnEmptyClick` attribute for overriding the default behavior of clearing selection when clicks occur on non-focusable targets (body, spans, etc).

## 1.1.0
Thu, 19 Jan 2017 00:12:21 GMT

### Minor changes

- ChoiceGroup: onChanged deprecated and replaced with onChange
- Persona: Hide the initials if the provided photo successfully loads

## 1.0.0
Mon, 16 Jan 2017 21:57:33 GMT

### Breaking changes

- Icon: -BREAKING CHANGE- Change IconName from an enum to type to greatly reduce file size. Any component that is currently consuming the icon enum will break.
- Most utilities have moved to `@uifabric/utilities`. If you refer directly to things like `/lib/utilities/autobind` you will now need to pull them directly from that package, or from the `office-ui-fabric-react/lib/Utilities` top-level import which should continue to work as expected. We are planning to split up more chunks of Fabric into smaller packages that can imported separately, but will also continue to maintain the `office-ui-fabric-react` package and its top-level imports.

### Minor changes

- Dropdown: Add className prop to component

### Patches

- DetailsRow: Change width to 100% to fix GroupedList component not extending to parent container's width

## 0.88.0
Sat, 14 Jan 2017 04:10:15 GMT

### Minor changes

- ChoiceGroup and CheckBox: Added props to set a custom 'name' attribute on rendered elements.

### Patches

- Button: Set the icon button's width correctly in Safari.
- Added defined width to ms-Persona-imageArea so that the DOM width of the control reflects the true width of the content

## 0.87.1
Fri, 13 Jan 2017 04:05:19 GMT

### Patches

- DetailsList: Only prevent text selection in multiple selection mode
- Dropdown: Avoid calling stopPropagation on pressing escape if the dropdown is not expanded

## 0.87.0
Thu, 12 Jan 2017 04:06:30 GMT

### Minor changes

- ContextualMenu: added in submenuIconProps to specify how the submenuIcon looks
- Pivot: Add icon to PivotItem
- New component: Rating
- Positioning/Callout: Can now set a fixed edge so the callout does not flip.

### Patches

- Image: Changes to src are now respected.
- DetailsList: when adding new items in a grouped DetailsList scenario, the group is no longer recreated.
- Dialog: Removing deprecated rootProps usage for the close button.
- Persona: Set an explicit height for the image area and image.
- Persona now has a default way of generating initials and colors
- Pivot: Fix a11y - duplicate tabIds, aria-controls linking
- TextField: aria-describedby is only set when a description is available.

## 0.86.2
Wed, 11 Jan 2017 04:04:04 GMT

### Patches

- Fixed blur event inside Popups

## 0.86.1
Tue, 10 Jan 2017 16:17:33 GMT

### Patches

- TextField: Misses keystroke in IE11 when validation is in progress

## 0.86.0
Tue, 10 Jan 2017 04:09:41 GMT

### Minor changes

- Persona: Truncates long lines of text
- Image: Add a prop to fit the image's frame to the parent element. Recompute the cover style when image changes, even if no width or height is provided.

## 0.85.0
Sat, 07 Jan 2017 04:06:13 GMT

### Minor changes

- ContextualMenu: Added header item so that the ContextualMenu can now have headers
- Nav: add className to allow styling
- TextField: Validate only on focus or Blur

### Patches

- SearchBox: Remove line-height to show correct cursor size in iOS
- ContextualMenu: Now returns null if no items are provided rather than rendering an empty callout
- FocusZone: Changed focus and focus zone to respect when data-is-focusable attribute is false
- Fix the prescribed use of submenuProps.items for CommandBar items
- Link: focus border is now positioned correctly when the link spans multiple lines.

## 0.84.0
Thu, 05 Jan 2017 04:07:37 GMT

### Minor changes

- Add 'focus' method to SearchBox component
- Add optional selectedKey to Pivot

### Patches

- Altered css so that ContextualMenu does not have scrollbar in IE
- Contextualmenu now correctly passes bounds to callout
- TextField: Multiline now respects rows attribute.

## 0.83.0
Wed, 04 Jan 2017 19:05:07 GMT

### Minor changes

- Made lots of improvements to autofill
- Icon: Add support for Image Sheet using Icon
- adding 'enter' key to select pivot item.
- TextField enhancement - auto adjust height
- adding screenreader for dropdown when not expanded
- Pivot: state updates may be asynchronous

### Patches

- Fixed location of deprecated props
- Fix for color picker not responding to prop changes
- Fixed a bug where if no width was passed into a column there would be a nan error thrown.
- Bug fix for interface parser where all fields are marked deprecated
- [ChoiceGroup][A11y]:Use aria-label instead of aria-description for choice group choice.
- Fixed TextField clip issue
- When computing a cover style for the Image component, if the width and height props aren't provided it will now measure the element. The Image component now extends from BaseComponent to more safely handle refs.
- Fixed typo in change log
- [DropDown][A11y] Remove aria-controls label for drop down.

## 0.82.4
Fri, 23 Dec 2016 04:04:09 GMT

### Patches

- fixed an issue where the beak would not reposition
- Fixed an issue where the tooltip would quickly remove itself if the tooltip target was entered from the direction of the tooltip's position

## 0.82.3
Wed, 21 Dec 2016 16:04:44 GMT

### Patches

- Pass defaultRender parameter to DetailsList onRenderRow prop.
- Adding css so that contextualmenu properly sizes for long text
- Including the "target" property in the Link component.
- Layer used node/element.remove() which is not present in ie. This change has it use parentnode.removeChild(childnode) instead

## 0.82.2
Sat, 17 Dec 2016 04:05:00 GMT

### Patches

- Calendar: handle invalid starting dates
- fixes panel jump in chrome and safari

## 0.82.1
Sat, 10 Dec 2016 04:05:34 GMT

### Patches

- Fix text color of primary button on focus
- Focus: IE will now return false for elements that are not tabbable.

## 0.82.0
Fri, 09 Dec 2016 04:06:51 GMT

### Minor changes

- Layer/LayerHost: Now supports React context passing through. Also all Layers not nested within a LayerHost will be positioned fixed as currently, but will not be if nested within a LayerHost.

### Patches

- Adding icon enum
- Dropdown: The `data-is-focusable` attribute now gets set correctly on the .ms-Dropdown div container.
- Slider: adding up/down/home/end support.

## 0.81.3
Wed, 07 Dec 2016 04:07:11 GMT

### Patches

- Pivot: Add space between text and count (if used) for PivotItem. Also fixes rtl display of text and count.
- Persona: remove unneeded width property from .ms-Persona-detail

## 0.81.2
Mon, 05 Dec 2016 20:20:56 GMT

### Patches

- DetailsList/SelectionZone: selection is no longer cleared when clicking on DIVs that have `tabIndex >= 0` or `role=button`.

## 0.81.1
Mon, 05 Dec 2016 04:02:30 GMT

### Patches

- Callout: Updating dismiss logic to be less sensitive to focus change on render.
- CommandBar: added `max-width: 100%` to prevent horizontal scroll scenarios.
- Updating project dependencies.

## 0.81.0

### Minor changes

- DatePicker: now renders correctly when scrolled down in Safari.

## 0.80.1

### Patches

- ContextualMenu: submenus now expand correctly again.
- SelectionZone: removing infinite loop.

## 0.80.0

### Minor changes

- ContextualMenu: Allow users to specify FocusZone direction on ContextualMenus.
- ContextualMenu: the `items` property has been deprecated in favor of providing `subMenuProps`.
- SelectionZone: now supports data-selection-disabled flag to disable selection event handling at a particular place in the DOM.

### Patches

- Button: Hover styles now render correctly.

## 0.79.0

### Minor changes

- Dropdown: Fixing an issue causing Safari to avoid opening the items in scroll cases.
- Updates the link to the asset license and clarifies that it covers both fonts and icons

## 0.78.2

### Patches

- Dropdown: removing horizontal overflow.

## 0.78.1

### Patches

- CommandBar: now uses `Icon` component.
- Nav: now accepts `selectedKey` from props (if provided) as truth to derive selected link.

## 0.78.0

### Minor changes

- Dropdown: disabled now respects changes passed in.
- Dropdown: removing horizontal overflow.

### Patches

- Button: Reduce specificity of selectors for Button modifier classes.

## 0.77.1

### Patches

- Callout: dismiss now correctly passes event args to onDismiss.
- Dropdown: now only updates state when props are actually changed.
- TextField: defaultValue no longer provides a warning.

## 0.77.0

### Patches

- LayerHost: Changing default LayerHost to render on a fixed position high zindex surface. Fixing a bug in the logic of determining if focus moves should cause Callout to dismiss (it shouldn't if the focused element is the callout target.) Removing max height from Dropdown ul/li.LayerHost: default host now renders on fixed high z-index surface.

## 0.76.0

### Minor changes

- DatePicker: factored out a Calendar component and moved the picker portion to render in a Callout.

### Patches

- DetailsList: clicking on an empty area of the page should clear the selection.
- Persona: now shows correct presence status if presence is not provided.

## 0.75.0

### Minor changes

- Toggle: `label` property is now optional, and the labels within the toggle will not render if no text is provided.

## 0.74.0

### Minor changes

- Callout: Deprecate `targetElement` in favor of `target`, which takes an Element, a MouseEvent, or a string selector. This makes it a lot easier to use Callout for pointing to a target without setting up refs and potentially having timing issues.

### Patches

- Choicegroup: Now turns all choices disabled when `disabled` flag is set.
- Image: now adjusts correctly with width/height changes.

## 0.73.0

### Minor changes

- Icon: Adding `None` value to `IconName` to support custom icons.
- Slider: `type='button'` now added by the default to thumb button. Also added thumbButtonProps for mixing in settings on the thumb button.

### Patches

- Updates the CDN references to point to the new CDN location.

## 0.72.0

### Minor changes

- Nav: adding support for `selectedKey`.

### Patches

- Nav: adjusting selection band to be themePrimary.

## 0.71.0

### Minor changes

- Facepile: updating default behavior.
