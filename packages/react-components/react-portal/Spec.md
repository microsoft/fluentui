# Portal Spec

## Background

Components that require positioning out of the normal DOM order such as Menu and Tooltip are generally rendered through React portals. This is very useful when the components need to break out of the bounds of a parent component so that the content is not overflowed or covered by another element with zIndex. Portals also support event bubbling in the React tree.

Since our styling system uses css variables that are written onto DOM, we need to ensure that all portals are rendered onto a part of the DOM where the css variables are available.

Portals also need need to include the same dir attribute as the parent react tree, so that RTL/LTR is displayed correctly in the portal and the parent content.

## Prior Art

Open UI research was not done for this component. `Portal` does not actually represent a UI control, but a utility component specific to React that makes the rendering of out of order DOM elements easy from within the React tree.

### v0/v8 Comparison

This section compares the noteworthy differences/similarities between the `Layer` and `Portal` components of v8 and v0 respectively that share functionality with this proposed converged component.

#### Portal Trigger

The v0 Portal component includes a `trigger` prop that allows consumers to open a React portal. The adoption is not widely used across v0's main consumer, Teams.

The v8 `Layer` component fills a similar role to `PortalInner` which is the component that actually renders a React portal.

#### Event propagation

v8 `Layer` users must explicitly use the `enableEventBubbling` behaviour, which is default in React portals. This is mainly because `Layer` is older than `React.Portal`. Since synthetic event propagation was only introduced with React portals, it had to be enabled to preserve backwards compat.

Meanwhile v0 does not allow any kind of way to disable native React event bubbling through portals, to achieve a similar effect, the user must manage this themselves.

#### DOM insertion

Both `Layer` and `Portal` allow insertion of portals to the same part of the DOM element.

v8 Layer does this through a `LayerHost` which can be rendered at any part of the React tree. The result is a HTMLDiv element with a specific CSS class and unique Id. `Layer` will attempt to find a `LayerHost` to mount either by CSS class or user provided `hostId`. The default fallback is `document.body`. Each `Layer` will render its own `Fabric` provider. The `insertFirst` property supported by `Layer` was introduced in #8065 for modeless Dialogs which was achieved through `position: static` and DOM insertion order. The same effect can be achieved through `pointer-events: none`.

The v0 `PortalBoxContext` stores a single HTMLDiv that is usually a child of `document.body` where all `Portal` components are rendered by default. The v0 `Provider` is rendered for the default portal element, where style and RTL overrides could be applied for all portals within.

#### Lifecycle methods

v0 `Portal` only supports the following lifecycle methods:

- onMount
- onUnmount

`Layer` supports the following:

- onLayerMounted
- onLayerWillUnmount

The lifecycle events are very similar, with the only difference being that `onLayerWillUnmount` is called with `hostId` changes. v0 does not consider the mountNode changing as an unmount of the component itself.

#### Focus Management

v0 `Portal` can be configured to focus trap its contents while v8 `Layer` does not offer this and users would need to use `FocusTrapZone` for this purpose.

## Sample Code

`Portal` by default mounts the content to `document.body`. In the event a consumer needs to target a specific mount node for Portal content this should be configurable via prop. Both variants should still be able to access theme and fluent context if available.

```
const customElement = document.createElement('div');

<App> // using FluentProvider of ThemeProvider but not PortalProvider
  <Portal /> // attached to document.body
  <Portal mountNode={customElement} /> // mounted on custom element
</App>
```

`Portal` should be used as a component at any part of the React tree:

```tsx
<ContextProvider>
  <Portal>
    <ContextConsumer /> // should be able to access context
  </Portal>
</ContextProvider>
```

`Portal` should be able to access theme values as css variables:

```tsx
const useStyles = makeStyles({
    portalContent: theme => {...}
})


const styles = useStyles();

<ThemeProvider>
    <Portal>
      <div className={styles.portalContent}>
        Can use all theme CSS variables from the parent ThemeProvider
      </div>
    </Portal>
</ThemeProvider>
```

## Variants

- Mounting the portal on a custom node

## API

### Portal

| Name      | Description                            | Required | Type        | Default value                    |
| --------- | -------------------------------------- | -------- | ----------- | -------------------------------- |
| mountNode | Where the portal is mounted to the DOM | No       | HTMLElement | ProviderContext or document.body |

### Virtual parents

Out of order DOM elements can be problematic when using 'click outside' event listeners since you cannot rely on `element.contains(event.target)` because the `Portal` elements are out of DOM order.

```tsx

const outerButtonRef = React.useRef();
const innerButtonRef = React.useRef();


<Portal>
  <div>
    <button ref={outerButtonRef}> Outer button </button>
    <Portal>
      <div>
        <button ref={innerButtonRef}> Inner button </button>
      </div>
    </Portal>
  </div>
</Portal>

// DOM output
<div>
  <button>Outer button</button>
</div>

<div>
  <button>Inner button</button>
</div>

// Let's add an event listener to 'dismss' the outer portal when clicked outside
// ⚠⚠⚠ This will always be called when clicking on the inner button
document.addEventListener((event) => {
  if (outerButtonRef.current.contains(event.target)) {
    dismissOuterPortal();
  }
})
```

When the above case is not required, using `element.contains` is perfectly fine. But nested cases should still be handled appropriately. We do this using the concept of `virtual parents`

`Portal` will make public 2 utilities that will only be used in cases where the user needs to know if an out of order DOM element will need to be used or not.

- `setVirtualParent` - sets virtual parent
- `elementContains` - similar to `element.contains` but uses the virtual hierarchy as reference

Below shows what a virtual parent is

```tsx
// Setting a virtual parent

const parent document.getElementById('parent')
const child document.getElement.ById('child');

child._virtual.parent = parent;
```

## Structure

```tsx
<FluentProvider>
  <Portal id="portal-1" />
  <Portal id="portal-2" />
</FluentProvider>
```

DOM output:

```tsx
<body>
  <div>
    {/* Virtual parent for portal*/}
    <span aria-hidden />
    {/* Virtual parent for portal*/}
    <span aria-hidden />
  </div>

  <div id="portal-1" class="theme-provider-0">
    {children}
  </div>
  <div id="portal-2" class="theme-provider-0">
    {children}
  </div>
</body>
```

```tsx
<FluentProvider>
  <Portal id="portal-1">
    <Portal id="portal-2" />
  </Portal>
</FluentProvider>
```

DOM output:

```tsx
<body>
  <div>
    {/* Virtual parent for outer portal*/}
    <span aria-hidden></span>
  </div>

  <div id="portal-1" class="theme-provider-0">
    {/* Virtual parent for inner portal*/}
    <span aria-hidden />
    {children}
  </div>
  <div id="portal-2" class="theme-provider-0">
    {children}
  </div>
</body>
```

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

### v8 migration

- There will be no way to disable event bubbling, it will be up to consumers to call `stopPropagation` themselves or create extra utilities that do so
- No more concept of `LayerHost` and id/class selectors, raw HTML elements/refs can be stored in context on the consumer app and used in `mountNode` for `Portals` if required
- No more mount lifecycle methods, users can remedy this easily with `useEffect` or `useLayoutEffect` hooks
- `insertFirst` will no longer be supported, and can be handled by a custom `mountNode` if necessary, sticky Dialog can be implmented with `pointer-events: none`

### v0 migration

- No more openable portals - should use future converged `Popup`
- No more focus trapping in `Portals` do that manually (Tabster)
- No more mount lifecycle methods, users can remedy this easily with `useEffect` or `useLayoutEffect` hooks

## Behaviors

### Server Side Rendering (SSR)

The ReactDOM `createPortal` requires a valid DOM node to render. This is problematic when `document` does not actually exist during the server render. Instead during the server render `null` will be used. This is not a big problem for most components that use portals such as popups or dialogs since they must be opened from some kind of trigger element (i.e. button)

However, there are some cases where a `Portal` content will always need to be rendered on the page. Tooltips should always be rendered so that `aria` attributes will refer to actual elements. This is problematic since the Tooltip (or higher order component) needs to be aware of the server render where `null`is rendered and render the actual content on the first client render.

The `Portal` component should handle this SSR case, and should be aware of the server and client renders when calling `ReactDOM.createPortal`.

## Accessibility

This component is considered a utility to render its children to an out of order DOM element. Since the component itself does not render DOM it is up to the consumer to handle the A11y requirements of their portal content.
