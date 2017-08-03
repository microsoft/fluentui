# Change Log - office-ui-fabric-react

This log was last generated on Thu, 03 Aug 2017 10:13:03 GMT and should not be manually modified.

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

*Changes not tracked*

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

