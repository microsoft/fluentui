# @fluentui/react-portal

**React Portal components for [Fluent UI React](https://react.fluentui.dev)**

This package contains the `Portal` component, which allow consumers to render [React portals](https://reactjs.org/docs/portals.html) with Fluent styling and RTL awareness.

## Usage

### Portal

`Portal` can be used as standalone with any part of a Fluent app. The component should be under a `FluentProvider` in the tree to make sure that proper theming and RTL handling is available.

By default `Portal` will render content to `document body`

```tsx
<FluentProvider>
  <Portal>Content rendered by default to Fluent's document.body</Portal>
</FluentProvider>
```

The mount location of the portal can be customized

```tsx
const node = document.getElementById('customNode');

<Portal mountNode={node}>Render to a custom node in DOM</Portal>;
```

### Styling

`Portal` renders React children directly to the default/configured DOM node. Therefore styling should be applied to the `children` by users directly.

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

- `setVirtualParent` - sets virtual parent. Portal uses this already internally.
- `elementContains` - similar to `element.contains` but uses the virtual hierarchy as reference

Below shows what a virtual parent is

```tsx
// Setting a virtual parent

const parent = document.getElementById('parent');
const child = document.getElementById('child');

child._virtual.parent = parent;
```

`Portals` will render a hidden span that will be the virtual parent, by nesting portals virtual parens will also be nested so that `elementContains` will work predictably.

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
