# Change Log - office-ui-fabric-react

This log was last generated on Thu, 09 Mar 2017 00:16:39 GMT and should not be manually modified.

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

