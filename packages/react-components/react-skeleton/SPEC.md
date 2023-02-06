# @fluentui/react-skeleton Spec

## Background

The `Skeleton` component is a temporary animation placeholder for when a service call takes time to return data and we don't want to block rendering the rest of the UI.

## Prior Art

### Open UI

| Library    | Component Name | Spec Link                                                                       | Notes                                                                                                                                                                  |
| ---------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ant Design | Skeleton       | [Skeleton](https://ant.design/components/skeleton/)                             | Has an `avatar`, `button`, `list`, and `togglebutton`. Has animated and non-animated versions, and shape variants for the component skeletons(rounded or rectangular). |
| Fast       | Skeleton       | [Skeleton](https://explore.fast.design/components/fast-progress)                | Has three components: `Avatar`, `List`, and `Button`. No shape variants.                                                                                               |
| UI Fabric  | Shimmer        | [Shimmer](https://developer.microsoft.com/en-us/fluentui#/controls/web/shimmer) | Shimmer has a way to pass in custom elements as well as the defaults. There is also a prop to change the colors of the Skeleton components.                            |

### Comparison of v8 and v0

The existing components are:

- v8
  - `Shimmer`
- v0

## Sample Code

Basic example:

```jsx
import { Skeleton, SkeletonLine } from '@fluentui/react-skeleton';

function App() {
  return (
    <Skeleton>
      <SkeletonLine />
    </Skeleton>
  );
}
```

## Variants

- There are two basic `Skeleton` shapes
  - `Line`
  - `Circle`

### Shape

The `Skeleton` is a combination of any of the two shapes in order to represent the content that will be loaded onto the screen. That is, it is a combination of rectangles and circles that is a visual representation of the wireframe of a page.

## API

### Slots

- `root` - The root slot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton` and any data that the `Skeleton` will load. The default html element is a `div`.

### Props

See API at [Skeleton.types.tsx]().

## Structure

```html
<!-- Container for Skeleton -->
<div class="fui-Skeleton">
  <!-- Container for SkeletonElement -->
  <div class="fui-Skeleton-Line" />
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - The `Skeleton` will use the following priority:

  - Specifying the `appearance` prop will allow the use of a `materialos` based appearance.
  - Specifying `wave` or `pulse` will change the animation style of the `Skeleton`
  - The component also has `rtl` support and will animate the `Skeleton` from right to left if set.

### Interaction

The Progress is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**

  - Click: No action

- **Touch** - Nothing

## Accessibility

- An `aria-label` is added to the `Skeleton` container to let users know that content is loading
