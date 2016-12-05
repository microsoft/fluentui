# Change Log - office-ui-fabric-react

This log was last generated on Mon, 05 Dec 2016 04:02:30 GMT and should not be manually modified.

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

