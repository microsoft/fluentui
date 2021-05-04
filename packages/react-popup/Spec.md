# @fluentui/react-popup Spec

## Background

`Popups` contain content that is opened after interacting with visible content. The content does not belong to the flow of visible information and is rendered out of DOM order. The content can display complementary information to existing content, or serves as a lightweight Dialog with interactable content.

## Prior Art

- [Open UI research](https://github.com/openui/open-ui/pull/205)
- [Github epic issue #17920](https://github.com/microsoft/fluentui/issues/17920)

### v0/v8 components

- [v8 Callout](https://developer.microsoft.com/en-us/fluentui#/controls/web/callout)
- [v0 Popup](https://fluentsite.z22.web.core.windows.net/0.54.0/components/popup/definition)

### Callout in v8

The v8 `Callout` component only covers the positioned content functionality. The default usage involves conditional rendering of the `Callout`. The `onDismiss` prop requests the `Callout` to close on evenths such as clicking outside or pressing the escape key.

```tsx
{isCalloutVisible && (
  <Callout
    target={`#${targetId}`}
    onDismiss={toggleIsCalloutVisible}
  >
    {children}
  </Callout>
}
```

Focus traps are supported for this scenario using a different component.

```tsx
{isCalloutVisible && (
  <FocusTrapCallout
    setInitialFocus
    target={`#${targetId}`}
    onDismiss={toggleIsCalloutVisible}
  >
    {children}
  </FocusTrapCallout>
}
```

### Popup in v0

The v0 `Popup` comes in both the controlled an uncontrolled variant that includes a `trigger` element which will open the `Popup`. Four interactions to open the `Popup` are supported:

- Click
- Hover
- Context (i.e. right click)
- Focus

In the controlled variant, an `onOpenChange` callback requests open/close of the popup to the user. This callback handles all the interactions for the trigger (above) and events such as clicking outside and the escape key.

```tsx
// Uncontrolled
<Popup
  trigger={<Button icon={<MoreIcon />} title="Show popup" />}
  content={popupContent}
  on=['click', 'hover', 'context', 'focus']
/>

// Controlled
<Popup
  open={open}
  onOpenChange={(e, { open }) => setOpen(open)}
  trigger={<Button icon={<MoreIcon />} title="Show popup" />}
  content={popupContent}
  on=['click', 'hover', 'context', 'focus']
/>
```

Focus trap is enabled using the `trapFocus` prop.

A `target` prop also exists so that the `Popup` does not have to be anchored to the `trigger` element.

### Position/Alignment hints

Both libraries provide an API that achieves the same end result for positioning and alignment. Below is a table that maps the v8 `DirectionalHint` with the v0 props of `position` and `alignment`

| DirectionalHint (v7) | position (v0) | align (v0) |
| -------------------- | ------------- | ---------- |
| topLeftEdge          | above         | start      |
| topCenter            | above         | center     |
| topRightEdge         | above         | bottom     |
| topAutoEdge          | above         |            |
| bottomLeftEdge       | above         | start      |
| bottomCenter         | below         | center     |
| bottomRightEdge      | below         | bottom     |
| bottomAutoEdge       | below         |            |
| leftTopEdge          | before        | top        |
| leftCenter           | before        | center     |
| leftBottomEdge       | before        | bottom     |
| rightTopEdge         | after         | before     |
| rightCenter          | after         | center     |
| rightBottomEdge      | after         | bottom     |

v8 uses `left` and `right`. v0 uses `before` and `after`. v0 vocabulary tries to be consistent regardless of RTL state. It's also possible to supply an explicit RTL hint to v8 which is a flip by default. v0 will flip by default but requires the consumer to detect RTL scenarios and modify props in these situations

In general the separation of both the position and alignment in v0 results in an API that is easier to use if a consumer only needs to modify one of the two props. However both try to achieve the same result in the end.

It's important to note that if an incorrect pair of `position` and `align` are provided in v0, then `position` takes priority and `align` is set to `center`

### Offset

```typescript
<ContextualMenu
  // single number value
  gap={100}
/>

<Popup
  offset={[-100, 100]}
/>

// offset can also be a function of raw Popper properties
const offsetFunction = ({
  popper: PopperJs.Rect;
  reference: PopperJs.Rect;
  placement: PopperJs.Placement;
}) => ([popper.width, -popper.height])
```

v8 positioning can only apply a numerical value to the first part position attribute of `DirectionalHint`. v0 supports a function to defer calculation at runtime. v0 also supports offset of the `Popup` in both axes.

### Bounds and overflow

```typescript
<Popup
...
  flipBoundary={htmlElement}
  overflowBoundary={htmlElement}
  mountNode={htmlElement}
/>
```

v0 `Popup` provides 3 different properties to handle bounds and overflow:

- flipBoundary - the bounds to calculate when to flip positioning of the popup
- overflowBoundary - the bounds to shift the popup without overflowing
- mountNode - where the popup is actually rendered in the DOM, by default this is a portal to a div in body

```typescript
<ContextualMenu
  // pixel values for bounding rectangle
  // defaults to target window as default bounding rectangle
  bounds={{height: 0, width: 0, top: 0, left:0 , right: 0, bottom: 0}}
  // callback for bounds
  bounds{(target, targetWindow) => ({/*Same object as above*/})}
  target={htmlElement}

  // renders to a portal node on body
  layerProps={/*ILayerProps*/}

  // every single one of the above can all be declared here too
  calloutProps={{bounds, target}}
/>
```

v8 `Callout` has no notion of separate boundaries for flip or overflow, and auto behaviour is used for flip and overflow 'pushing'.

### Events

v8 provides the following positioning event callbacks

- onLayerMounted -> proposed to be removed in converged Portal spec [#17824](https://github.com/microsoft/fluentui/pull/17824)
- onPositioned
- onScroll

### Hidden mount

v8 `Callout` provides two props which will allow mounting a hidden popup and disabling renders when the component is hidden. According to the PRs that introduced the features, it should be a performance optimization.

- `hidden` [#4419](https://github.com/microsoft/fluentui/pull/4419)
- `shouldUpdateWhenHidden` [#10465](https://github.com/microsoft/fluentui/pull/10465)

## Sample Code

```tsx
<Popup>
  <PopupTrigger>
    <button>Opens popup</button>
  </PopupTrigger>

  <PopupContent>
    <h1>Popup</h2>
    <div>Some section</div>
    <div>Some section</div>
  </PopupContent>
</Popup>
```

## Variants

- Anchor content to a different target than the trigger
- Inline popup rendered in DOM order
- Open on:
  - Click
  - Hover
  - Context menu (right click)
  - Focus

## API

The `Popup` component will use React context to manage both a trigger and content component.

### Popup

Outer component that setups context and does not render DOM.

> TODO Discuss: dismiss on scroll ?

> TODO Discuss: v8 `hidden` `shouldUpdateHidden` prop [#4419](https://github.com/microsoft/fluentui/pull/4419) [#10465](https://github.com/microsoft/fluentui/pull/10465)

> TODO Discuss: v8 `onPositioned`

> TODO Discuss: v0/v8 `autoFocus/setInitialFocus` ?

> TODO Discuss: start small with API base for positioning props ?

The `@fluentui/react-positioning` library that exports the `usePopper` hook which will power the `Popup` contains more than the declared props here. These extra positioning props should be exposed as required.

```typescript
export interface PopupProps {
  /**
   * Explicitly render the popup in DOM order
   */
  inline?: boolean;

  /**
   * Controls the popup open state
   */
  open?: boolean;

  /**
   * Call back when the component requests to change value
   */
  onOpenChange?: (e: OpenPopupEvents, data: OpenEventData) => void;

  /**
   * Anchor the popup to an element other than the trigger
   */
  target?: HTMLElement;

  /**
   * Popup position relative to target
   */
  position?: string;

  /**
   * Popup alignment relative to target
   */
  align?: string;

  /**
   * Popup offset value or callback with positioning props
   */
  offset?: OffsetFunction | [number, number];

  /**
   * Renders `PopupContent` to a portal out of DOM order
   *
   * @defaultValue document.body
   */
  mountNode?: string;
}
```

### PopupTrigger

This component does not render DOM. Utility component that clones a single child and applies HTML event callbacks to control the open/dismiss of the popup.

```typescript
export interface PopupTriggerProps {
  /**
   * Should only be a single child
   */
  children?: React.ReactElement;
}
```

### PopupContent

This componet renders the positioned HTML element and renders user provided children. Renders as `<div>` by default.

```typescript
export interface PopupTriggerProps {
  children?: React.ReactNode;
}
```

## Structure

Default popup

```tsx
<div id="container">
  <Popup>
    <PopupTrigger>
      <button>Trigger</button>
    </PopupTrigger>

    <PopupContent>
      {children}
    </PopupContent>
  </Popup>
<div>

// Expected Markup
<div id="container">
  <button aria-haspopup="dialog">Trigger</button>
</div>

// on document.body
<div role="complementary">
  {/** content */}
</div>
```

Popup that traps focus

```tsx
<div id="container">
  <Popup trapFocus>
    <PopupTrigger>
      <button>Trigger</button>
    </PopupTrigger>

    <PopupContent>
      {children}
    </PopupContent>
  </Popup>
<div>

// Expected Markup
<div id="container">
  <button aria-haspopup="dialog">Trigger</button>
</div>

// on document.body
<div role="dialog" aria-modal="true">
  {/** content */}
</div>
```

Inline popup

```tsx
<div id="container">
  <Popup inline>
    <PopupTrigger>
      <button>Trigger</button>
    </PopupTrigger>

    <PopupContent>
      {children}
    </PopupContent>
  </Popup>
<div>

// Expected Markup
<div id="container">
  <button aria-haspopup="dialog">Trigger</button>
  <div>
    {/** content */}
  </div>
</div>


```

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

### v8

- `onDismiss` should listen to `onOpenChange`.
- `preventDismissOnEvent` no longer exists, `onOpenChange` will return the associated event, so this functionality is still possible.
- Removed `onRestoreFocus`. `Popup` will focus the trigger when closed by default. Any other behaviour can be done through an effect by users.
- Removed `onPositioned`.
- Removed `doNotLayer` with `inline`.
- Removed all styling props supported by `Callout`. `makeStyles` should be used instead.
- Removed `coverTarget`, use `offset` callback instead.
- Removed `setInitialFocus`. If `trapFocus` is used, first focusable element is used. Users must handle other specific cases.

### v0

> TODO Discuss: v0 autoFocus -> only used in app-profile-card

- No more `autoFocus` for scenarios without `trapFocus`. Users should handle this scenario manually.
- No more `tabbableTrigger`. Users can do this with their own trigger element.
- No `PopupContent` props, v0 duplicated props from `Popup` to `PopupContent`, all props should be declared on converged `Popup`.

## Behaviors

### Trigger interactions

A popup should support click, hover, context menu and focus interactions for the `PopupTrigger`. These interactions should also be composable

#### Click

Clicking on the trigger when the popup is closed opens the popup.

Clicking the trigger when the popup is open closes the popup.

Click also includes `Spacebar` and `Enter` keys

#### Hover

When the mouse hovers over the trigger the popup opens.

> TODO Discuss: Menus don't have this behaviour, should this be consistent

When the mouse leaves the trigger and popup content, the popup close.

#### Context menu

Right click on the trigger opens the popup. The popup anchors to the mouse position.

Shift + F10 on the trigger opens the popup

#### Focus

> TODO Discuss: This is a v0 behaviour not sure if it is still applicable

When the trigger is focused, the popup opens.

### Additional interactions

#### Escape key

The popup closes with the escape key when the trigger or popup content has focus.

#### Click outside

The popup closes when a click happens outside the popup trigger or content.

### Focus trap

When the popup is configured to be a focus trap, focus the first focusable element inside the popup on open.

### Nesting

Popups should be nested

## Accessibility

### Existing patterns

The [WAI Dialog pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal) and its variants are the inspirations for `Popup` accessibility.

- [Datepicker](https://www.w3.org/TR/wai-aria-practices-1.2/examples/dialog-modal/datepicker-dialog.html)
- [Modal Dialog](https://www.w3.org/TR/wai-aria-practices-1.2/examples/dialog-modal/dialog.html)

### DOM element usage

Only the `PopupContent` component will render DOM markup. By default the components renders an HTML `div` element.

### Accessible markup

Accessible markup is divided into two scenarios:

```tsx
// Popup that does not trap focus
<button aria-haspopup="dialog">Trigger</button>
<div role="complementary">
  No focus trap
</div>

// Popup that does trap focus
<button aria-haspopup="dialog">Trigger</button>
<div role="dialog" aria-modal="true">
  Focus trapped
</div>
```
