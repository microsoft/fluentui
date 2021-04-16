# Portal Spec

## Background

_Description and use cases of this component_

## Prior Art

Open UI research was not done for this component. `Portal` does not actually represent a UI control, but a utility component specific to React makes rendering of our of order DOM elements easy from within the React tree.

### v0/8 Comparison

This section compares the noteworthy differences/similarities between the `Layer` and `Portal` components of v8 and v0 respectively that share functionality with this proposed converged component.

#### Portal Trigger

The v0 Portal component includes a `trigger` prop that allows consumers to open a React portal. The adoption is not widely used across v0's main consumer , Teams.

The v8 `Layer` component fills a similar role to `PortalInner` which is the component that actually renders a React portal.

#### Event propagation

v8 `Layer` users must explicitly use the `enableEventBubbling` behaviour, which is default in React portals. This is mainly due to historical reasons. Meanwhile v0 does not allow any kind of way to disable native React event bubbling through portals, to achieve a similar effect, the user must manage this themselves.

#### DOM insertion

Both `Layer` and `Portal` allow insertion of portals to the same part of the DOM element.

v7 Layer does this through a `LayerHost` which can be rendered at any part of the React tree. The result is a HTMLDiv element with a specific CSS class an unique Id. `Layer` will attempt to find a `LayerHost` to mount either by CSS class or user provided `hostId`. The default fallback is `document.body`. Each `Layer` will render its own `Fabric` provider.

The v0 `PortalBoxContext` stores a single HTMLDiv that is usually a child of `document.body` where all `Portal` components are rendered by default. The v0 `Provider` is rendered for the default portal element, where style and RTL overrides could be applied for all portals within.

#### Lifecycle methods

v0 `Portal` only supports the following lifecycle methods:

- onMount
- onUnmount

`Layer` supports the following:

- onLayerMounted
- onLayerWillUnmount

The lifecycle events are very similar, with the only difference that `onLayerWillUnmount` being called with `hostId` changes. v0 does not consider the mountNode changing as an unMount of the component itself.

#### Focus Management

v0 `Portal` can be configured to focus trap its contents while v7 `Layer` does not offer this and users would need to use `FocusTrapZone` for this purpose.

## Sample Code

`Portal` by default run in a designated area set by a `PortalProvider` or a consumer designated node.

```tsx
const element = usePortalElement({ targetDocument, className, dir });
const customElement = document.createElement('div');

<PortalContextProvider value={element}>
  <Portal />
  <Portal element={customElement} />
</PortalContextProvider>;
```

`Portal` should have a fallback of document.body if `PortalProvider` is not used. This fallback should still be able to access theme and fluent context if available

```
<App> // using FluentProvider of ThemeProvider but not PortalProvider
  <Portal /> // attached to document.body
  <Portal /> // attached to document.body
</App>
```

`Portal` should be used as a component at any part of the React tree

```tsx
<ContextProvider>
  <Portal>
    <ContextConsumer /> // should be able to access context
  </Portal>
</ContextProvider>
```

`Portal` should be able to access theme values as css variables

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

| Name                 | Description                                                   | Required | Type              | Default value                    |
| -------------------- | ------------------------------------------------------------- | -------- | ----------------- | -------------------------------- |
| mountNode            | Where the portal is mounted to the DOM                        | No       | HTMLElement       | ProviderContext or document.body |
| onMount              | Called when the portal is mounted                             | No       | Function          |                                  |
| onUnmount            | Called when the portal is unmounted                           | No       | Function          |                                  |
| disableEventBubbling | Disables event bubbling to the React tree                     | No       | Boolean           |                                  |
| insertionOrder       | Position of the portal content in the mountNode               | No       | 'first' \| 'last' | 'last'                           |

### PortalContext

Context that store a mount node passed to portals below the provider in the React tree, can be easily accessed with `React.useContext`;

| Name  | Description                       | Required | Type        |
| ----- | --------------------------------- | -------- | ----------- |
| value | The DOM element to insert portals | Yes      | HTMLElement |

## Structure

Public usage same as documented in [Sample Code](#samplecode)

DOM output:
```tsx
<div>{children}</div>
```

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

### v8 migration

- `enableEventBubbling` will be default, rather use `disabledEventBubbling`
- No more concept of `LayerHost` and id/class selectors, `PortalContext` should be used to use a raw HTML element
- `insertionOrder` prop will replace `insertFirst`

### v0 migration

- No more openable portals - should use future converged `Popup`
- No more focus trapping in `Portals` do that manually (Tabster)

## Behaviors

No noticeable behaviours, the v0 focus trap functionality should be avoided in favour of manually setting any kind of focus management.

## Accessibility

This component is considered a utility to render an out of order DOM element. The component will support DOM attribute spreading and `as` composition, therefore any Aria requirements should be handled by the consumer using this component.
