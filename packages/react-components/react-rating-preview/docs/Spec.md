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

## Sample Code

Basic example:

```jsx
import { Rating } from '@fluentui/react-rating';

function App() {
  return <Rating />;
}
```

## API

### Slots

#### Rating slots

- `root` - The root slot of the `Rating` is the container that will contain the slots that make up a `Rating`. The default html element is a `div`.
- `ratingLabel` - This slot will render the value of the `Rating`. The default html element is a `label`.
- `ratingCountLabel`- This slot will render the total number of ratings. The default html element is a `label`.

#### RatingItem slots

- `root` - The root slot of the `RatingItem`. The default element is `span`.
- `selectedIcon` - Icon displayed when `Rating` value is greater than or equal to the `RatingItem` value.
- `selectedFilledIcon` - Icon displayed when `Rating` value is less than the `RatingItem` value. Outline style gray
- `selectedUnfilledIcon` - Icon displayed when `Rating` value is less than the `RatingItem` value. Outline style white.
- `halfValueInput` - Input slot for when `precision` prop is active and need to render half values of `RatingItem`.
- `fullValueInput` - Default input slot to render selected `RatingItem`

### Props

See API at [Rating.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-rating-preview/src/components/Rating/Rating.types.ts).

## Structure

```html
<!-- Container for Rating -->
<div class="fui-Rating">
  <input />
  <!-- Container for RatingItem -->
  <span class="fui-RatingItem">
    <div class="fui-RatingItem">
      <input />
      <svg />
    </div>
  </span>
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - The `Rating` will use the following priority:

  - The `appearance` prop will dictate whether an unfilled `RatingItem` has a neutral white background or a gray background. Typically used for readOnly
  - The `mode` prop will be used to set the type of `Rating`.
  - The `max` prop sets how many `RatingItems` there are in the `Rating`
  - Setting the `size` prop will allow the user to specify the size of the element.
  - You can pass in filled and regular versions of icons to `iconFilled` and `iconOutline` slots to render custom `RatingItems`.

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

- Tbd. Needs some sort of labelling for the `RatingItem` when interactive and for the whole `Rating` component when readOnly
