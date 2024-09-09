# Link

**GitHub Epic issue** - [Link Convergence #16572](https://github.com/microsoft/fluentui/issues/16572)

## Background

The `Link` component references data that a user can follow by clicking or tapping it.

## Prior Art

### Open UI

The Open UI [Link Research](https://open-ui.org/components/link.research) page (currently in PR: https://github.com/WICG/open-ui/pull/253), shows how the `Link` component is used in UI platforms across the web. The consensus across libraries seems to center around a simple interface with few variants that mostly attempt to support the functionality of the `<a>` HTML tag.

### Comparison of v8 and v0

The existing components are:

- v8 - [Link](https://developer.microsoft.com/en-us/fluentui#/controls/web/link)
- v0 - v0 does not currently export a `Link` component

## Sample Code

Basic examples:

```jsx
<Link>This is a link</Link>
<Link href="https://www.bing.com">This is a link</Link>
<Link href="https://www.bing.com" disabled>This is a link</Link>
<Link href="https://www.bing.com" target="_blank">This is a link</Link>
```

## Variants

### Default vs inline

A `Link` has two decoration variants depending on where it's used.

By `default`, the `Link` should be limited to homogeneous surface areas where everything is clickable in the space and should appear as lacking an underline.

A second `inline` variant is provided for scenarios where body text is going to be used alongside a `Link`. This variant adds an underline to add a separate visual distinction in addition to color for contrast purposes.

### Anchor vs button

A `Link` renders as different HTML tags depending on the whether a value has been passed for the `href` property or not. If a value has been passed to the `href` property, then the `Link` renders as an `<a>` HTML tag. Conversely, if the `href` property is left `undefined` the `Link` renders as a `<button>` HTML tag.

The `Link` can also be custom rendered as something entirely different by replacing the `root` slot with the preferred element to be rendered via the `as` prop.

## API

### Slots

- `root` - The outer container representing the `Link` itself that wraps everything passed via the `children` prop.

### Props

See API at [Link.types.ts](./src/components/Link/Link.types.ts).

## Structure

For `Links` rendering as `<a>`:

```tsx
<a class="root" href={href}>
  {children}
</a>
```

For `Links` rendering as anything other than `<a>` (the example below uses `<button>`):

```tsx
<button class="root" role="link">
  {children}
</button>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

The following section describes the different states in which a `Link` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Link` communicates interaction by having styling that invites the user to click/tap on it to navigate through content.

#### Disabled state

A disabled `Link` is non-interactive, disallowing the user to click/tap on it to navigate through content.

#### Hovered state

A hovered `Link` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `Link` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state plus extra styling on the outline to indicate keyboard focus has been placed on the component.

#### Pressed state

A pressed `Link` changes styling to communicate that the user is currently pressing it.

#### Visited state

A visited `Link` changes styling to communicate that the user has already interacted with it so its referenced content has already been accessed in the past.

### Interaction

#### Keyboard interaction

The following is a set of keys that interact with the `Link` component:

| Key                      | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `Enter`                  | Executes the `Link` and moves focus to its target. |
| `Shift + F10` (Optional) | Opens a context menu for the `Link`.               |

#### Cursor interaction

- `mouseenter`: Should immediately change the styling of the `Link` so that it appears to be hovered.
- `mouseleave`: Should immediately remove the hovered styling of the `Link`.
- `mouseup`: If triggered while cursor is still inside of the `Link's` boundaries, then it should execute the `Link` and move focus to its target.

#### Touch interaction

The same behavior as above translated for touch events. This means that there is no equivalent for `mouseenter` and `mouseleave`, which makes it so that the hovered state cannot be accessed.

## Accessibility

### Relevant documents

- [WAI-ARIA 1.1 Spec](https://www.w3.org/TR/wai-aria-1.1/#link)
- [WAI-ARIA 1.1 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#link)
- [WAI-ARIA 1.2 Spec](https://www.w3.org/TR/wai-aria-1.2/#link)
- [WAI-ARIA 1.2 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#link)

### Expected behavior

- Should default to render a native `a` element unless something else has been specified for the `root` slot, in which case `role="link"` should be added to it.
- Should mix in the native props expected for the `a` native element.
- Should be keyboard tabbable and focusable.
