# Portal Spec

## Background

_Description and use cases of this component_

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
    <Portal className={styles.portalContent>
      Can use all theme CSS variables from the parent ThemeProvider
    </Portal>
</ThemeProvider>
```

## Variants

- Mounting the portal on a custom node
- Disable event bubbling

## API

### Portal
> TODO clear whether `onMount` or `onUnmount` need to be called when mount node changes like in v8
>
> TODO clear whether `insertionOrder` should be supported in convergence
>
> TODO clear whether `disableEventBubbling` should be supported in convergence

| Name                 | Description                                                   | Required | Type              | Default value                    |
| -------------------- | ------------------------------------------------------------- | -------- | ----------------- | -------------------------------- |
| mountNode            | Where the portal is mounted to the DOM                        | No       | HTMLElement       | ProviderContext or document.body |
| onMount              | Called when the portal is mounted                             | No       | Function          |                                  |
| onUnmount            | Called when the portal is unmounted                           | No       | Function          |                                  |
| disableEventBubbling | Disables event bubbling to the React tree                     | No       | Boolean           | false                            |


## Structure

```
<FluentProvider
  <Portal id="portal-1" />
  <Portal id="portal-2" />
</FluentProvider
```

DOM output:
```tsx
<body>
  <div>Maintree</div>

  <div id="portal-1" class="theme-provider-0"}>{children}</div>
  <div id="portal-2" class="theme-provider-0"}>{children}</div>
</body>
```

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

### v8 migration

- `enableEventBubbling` will be default, use `disableEventBubbling` instead
- No more concept of `LayerHost` and id/class selectors, raw HTML elements/refs can be stored in context on the consumer app and used in `mountNode` for `Portals` if required

### v0 migration

- No more openable portals - should use future converged `Popup`
- No more focus trapping in `Portals` do that manually (Tabster)

## Behaviors

No noticeable behaviours, the v0 focus trap functionality should be avoided in favour of manually setting any kind of focus management.

## Accessibility

This component is considered a utility to render an out of order DOM element. The component will support DOM attribute spreading and `as` composition, therefore any ARIA requirements should be handled by the consumer using this component.
