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
import { Skeleton } from '@fluentui/react-skeleton';

function App() {
  return <Skeleton />;
}
```

## Variants

- There are three basic `Skeleton` shapes
  - Line
    - This typically represents content such as paragraphs on the page
  - Circle
    - This typically represents content such as an `Avatar` on the page
  - Gap
    - This represents a space between two pieces of content being rendered on a page

### Shape

The `Skeleton` is a combination of any of the three shapes in order to represent the content that will be loaded onto the screen. That is, it is a combination of lines, circles, and gaps that is a visual representation of the wireframe of a page.

## API

### Slots

- `root` - The root alot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton` and any data that the `Skeleton` will load. The default html element is a `div`.
- `wrapper` - The wrapper slot of the `Skeleton` will contain the `SkeletonElementsGroup` and the `SkeletonGradient`. The default html element is a `div`.
- `gradient` - The slot that will show the `Skeleton` gradient on the page. The default html element is a `div`.
- `data` - The data slot will contain the data that will be rendered on the screen once it is loaded onto the page. The default html element is `div`.

### Props

See API at [Skeleton.types.tsx]().

## Structure

```html
<div class="fui-Skeleton">
  <!-- Container for Skeleton -->
  <div class="fui-Skeleton__wrapper">
    <!-- Gradient for Skeleton -->
    <div class="fui-Skeleton__gradient" />
    <!-- Container to hold the Skeleton Elements -->
    <div class="fui-SkeletonElementsGroup">
      <!-- Skeleton Line element -->
      <div class="fui-SkeletonLine" />
    </div>
  </div>
</div>
```

## Migration

See [MIGRATION.md]().

## Behaviors

### States

- **Display** - The `Skeleton` will use the following priority:

  - Specifying the `customElementsGroup` prop will allow the use of custom shapes based on the default shapes.
  - The component also has `rtl` support and will animate the `Skeleton` from right to left if set.

### Interaction

The Progress is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**

  - Click: No action

- **Touch** - Nothing

## Accessibility

- An `aria-label` is added to the `Skeleton` container to let users know that content is loading
