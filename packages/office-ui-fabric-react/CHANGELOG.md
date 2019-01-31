# Change Log - office-ui-fabric-react

This log was last generated on Thu, 31 Jan 2019 13:36:14 GMT and should not be manually modified.

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

- Coachmark: updates how the the theme is passed to `getStyles` function. Adds 2 new props: `theme` and `className`. Minor cleanup.

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

