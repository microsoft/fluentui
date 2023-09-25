# @fluentui/react-skeleton Spec

## Background

The `Skeleton` component is a temporary placeholder for UI that is in a loading state.

## Prior Art

| Library     | Component Name | Spec Link                                                                       | Notes                                                                                                                                                                  |
| ----------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ant Design  | Skeleton       | [Skeleton](https://ant.design/components/skeleton/)                             | Has an `avatar`, `button`, `list`, and `togglebutton`. Has animated and non-animated versions, and shape variants for the component skeletons(rounded or rectangular). |
| Fast        | Skeleton       | [Skeleton](https://explore.fast.design/components/fast-skeleton)                | Has three components: `Avatar`, `List`, and `Button`. No shape variants.                                                                                               |
| Semantic UI | Placeholder    | [Placeholder](https://react.semantic-ui.com/elements/placeholder/)              | Has `Header` and `Paragraph` subcomponents. The `Header` can take in an image as a prop                                                                                |
| UI Fabric   | Shimmer        | [Shimmer](https://developer.microsoft.com/en-us/fluentui#/controls/web/shimmer) | Shimmer has a way to pass in custom elements as well as the defaults. There is also a prop to change the colors of the Skeleton components.                            |

### Comparison of v8 and v0

The existing components are:

- v8
  - `Shimmer`
- v0
  - Does not have an existing `Skeleton` component.

## Sample Code

Basic example:

```jsx
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';

function App() {
  return (
    <Skeleton>
      <SkeletonItem shape="circle" size={24} />
      <SkeletonItem shape="rectangle" size={16} />
    </Skeleton>
  );
}
```

## Variants

- There are three basic `Skeleton` shapes
  - `Rectangle`
  - `Circle`
  - `Square`

### Shape

The `Skeleton` is a combination of any of the two shapes in order to represent the content that will be loaded onto the screen. That is, it is a combination of rectangles and circles that is a visual representation of the wireframe of a page.

## API

### Slots

- `root` - The root slot of the `Skeleton` is the container that will contain the items that make up a `Skeleton` in representation of the data that is loading. The default html element is a `svg`.

### Props

See API at:

- [Skeleton.types.ts](./src/components/Skeleton/Skeleton.types.ts).
- [SkeletonItem.types.ts](./src/components/SkeletonItem/SkeletonItem.types.ts).

## Structure

```html
<!-- Container for Skeleton -->

<div class="fui-Skeleton">
  <!-- Container for SkeletonElement -->

  <div class="fui-SkeletonItem" />
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - The `Skeleton` will use the following priority:

  - The `appearance` prop will allow the use of a `translucent` appearance.
  - Specifying `wave` or `pulse` will change the animation style of the `Skeleton`
  - The component also has `rtl` support and will animate the `Skeleton` from right to left if set.
  - Setting the `shape` prop in `<SkeletonItem />` will render a `rectangle`, `square`, or a `circle` (default is `rectangle`).
  - Setting the `size` prop in `<SkeletonItem />` will allow the user to specify the size of the element (default is 16).

### Interaction

The Skeleton is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse** - Nothing

- **Touch** - Nothing

## Accessibility

- An `aria-label` is added to the `Skeleton` container to let users know that content is loading
