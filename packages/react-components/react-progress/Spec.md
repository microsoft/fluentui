# @fluentui/react-progress Spec

## Background

The `Progress` component is used to display the current progress of an operation flow.

## Prior Art

### Open UI

| Library    | Component Name | Spec Link                                                          | Notes                                                                   |
| ---------- | -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Ant Design | Progress       | [Progress](https://ant.design/components/progress/)                | Specifies the type, a combined progress component                       |
| Bootstrap  | Progress       | [Progress](https://getbootstrap.com/docs/4.3/components/progress/) | Allows for multiple different animation styles on the same Progress bar |

### Comparison of v8 and v0

The existing components are:

- v8
  - `ProgressIndicator`
- v0

## Sample Code

Basic example:

```jsx
import { Progress } from "@fluentui/react-progress";

function App() {
    return (
        <Progress barHeight="medium" label="Loading" />
    )
}
```

## Variants

- Indeterminate Progress
  - The default Progress that animates indefinitely
- Determinate Progress
  - The determinate form of the Progress component that incrementally loads from 0 to 100

### Shape

The Progress is represented as a rectangular area with an inner animated bar that either travels across the area indefinitely or animates up till a specified point

## API

### Slots

- `root` - The root element of the Progress. The html element is a `div`
- `indicator` - The div element that gets animated into a Progress. The html element is `span`
- `label` - The text shown above the Progress. This uses the `Label` control
- `description` - The text shown below the Progress. This uses the `Label` control

### Props

See API at [Progress.types.tsx](./src/components/Progress/Progress.types.ts).

## Structure

```html
<div class="fui-Progress">
  <!-- Label for Progress -->
  <label className="fui-Progress__label">Loading...</label>
  <span className="fui-Progress__indicator" role="progressbar">
    <!-- div that receives the animation. Classnames are used for animation -->
    <div className="fui-Progress__Container">
      <div className="fui-Progress__Track" />
      <div className="fui-Progress__Tail" />
    </div>
  </span>
  <!-- Label for Progress description -->
  <label className="fui-Progress__description">Loading Text</label>
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - The Progress will use the following priority:

  - Adding `appearance={inverted}` will alter the way that the Progress is displayed.
  - Adding `determinate` and specifying the `percentComplete` from `0` to `1` will alter the Progress from indeterminate to determinate.
  - The component also has `rtl` support and will animate the progress bar from right to left if set.

### Interaction

The Progress is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**

  - Click: No action

- **Touch** - Nothing

## Accessibility
