# @fluentui/react-rating Spec

## Background

A `Rating` component allows users to provide a rating for a particular item.

This component displays a set of stars or other symbols that represent the rating value. Users can interact with the component to select a rating by clicking on the stars or using touch gestures.

## Prior Art

### Open UI

### Comparison of v8 and v0

The existing components are:

- v8
  - `Rating`
- v0

## API

### Components

| Component       | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| `Rating`        | Displays interactive `RatingItem`s.                         |
| `RatingDisplay` | Displays read only `RatingItem`s and value and count labels |
| `RatingItem`    | Represents a single rating item.                            |

### Rating

#### Slots

- `root` - The root element of the `Rating`. The default HTML element is a `div`.

#### Props

[Link to Rating types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-rating-preview/src/components/Rating/Rating.types.ts)

### RatingDisplay

#### Slots

- `root` - The root element of the `RatingDisplay`. The default HTML element is a `div`.
- `valueText` - The slot that renders the value of the `RatingDisplay`. The default HTML element is a `span`.
- `countText` - The slot that renders a figure representing the total number of ratings. The default HTML element is a `span`.

#### Props

[Link to RatingDisplay types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-rating-preview/src/components/RatingDisplay/RatingDisplay.types.ts)

### RatingItem

#### Slots

- `root` - The root element of the `RatingItem`. The default element is a `span`.
- `selectedIcon` - The icon displayed when the rating value is greater than or equal to the item's value. The default element is a `div`.
- `unselectedIcon` - The icon displayed when the rating value is less than the item's value. The default element is a `div`.
- `halfValueInput` - The Radio input slot used for half star precision. The default element is an `input`.
- `fullValueInput` - The Radio input slot used for full star precision. The default element is an `input`.

#### Props

[Link to RatingItem types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-rating-preview/src/components/RatingItem/RatingItem.types.ts)

## Sample Code

Basic `Rating` example. This will render an interactive `Rating` with 5 stars:

```jsx
import { Rating } from '@fluentui/react-components';

function App() {
  return <Rating />;
}
```

Basic `RatingDisplay` example. This will render a read only `RatingDisplay` with 5 stars:

```jsx
import { RatingDisplay } from '@fluentui/react-components';

function App() {
  return <RatingDisplay />;
}
```

Basic `RatingItem` example. This will render a standalone `RatingItem`. It is recommended to be used inside a `Rating` or `RatingDisplay`:

```jsx
import { RatingItem } from '@fluentui/react-components';

function App() {
  return <RatingItem />;
}
```

## Structure

Basic `Rating` structure.

```html
<!-- Container for Rating -->
<div class="fui-Rating">
  <!-- Container for RatingItem -->
  <span class="fui-RatingItem">
    <!-- Input slot -->
    <input />
    <!-- Icon slot -->
    <div class="fui-RatingItem">
      <svg>...</svg>
    </div>
  </span>
</div>
```

Basic `RatingDisplay` structure.

```html
<!-- Container for RatingDisplay -->
<div class="fui-RatingDisplay">
  <!-- Container for RatingItem -->
  <span class="fui-RatingItem">
    <!-- Icon slot -->
    <div class="fui-RatingItem">
      <svg>...</svg>
    </div>
  </span>
  <!--Value label slot-->
  <span>...</span>
  <!-- Count label slot -->
  <span>...</span>
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - `Rating` will be used to render 5 or more interactive `RatingItem`s, while `RatingDisplay` will be used to render non-interactive `RatingItem`s.

  - The `color` prop controls the color of a `Rating` or `RatingDisplay`
  - The `max` prop sets how many `RatingItem`s there are in the `Rating` or `RatingDisplay`
  - Setting the `size` prop will allow the user to specify the size of the element.
  - You can pass in filled and regular versions of icons to `iconFilled` and `iconOutline` slots to render custom `RatingItem`s.
  - For `RatingDisplay`, you can pass in filled icons to the `icon` prop to render custom `RatingItem`s.

### Interaction

The Rating can be interactive or non-iteractive depending on the use case

- **Keyboard** - Can use arrow keys.
- **Mouse**

  - Click: Selects a `RatingItem`
  - Hover: Fills up to the hovered `RatingItem`

- **Touch**
  - Press: Selects a `RatingItem`
  - Drag: No behavior

## Accessibility

#### Rating

- The `root` slot role is `radiogroup` and the `RatingItem`s input slots' roles are `radio`.
- There is a `name` prop to associate all `RatingItem`s with a specific `Rating`. If a name is not provided, one is generated for that `Rating`.

#### RatingDisplay

- The `root` slot role is set to `img` and all `RatingItem`s have `aria-hidden` set to true.
- The `RatingDisplay` has an `arialabelledby` prop pointing to the id of the `countText` slot or `valueText` slot.
