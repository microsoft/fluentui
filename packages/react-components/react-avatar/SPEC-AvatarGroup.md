# AvatarGroup Spec

## Background

AvatarGroup represents a group of multiple people or entities by taking care of the arrangement of individual Avatars in a spread, stack, or pie layout.

## Prior Art

### OpenUI

There's no current research in OpenUI's website.

| Library                                                                               | Name         | Notes                                                                                         |
| ------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| [Fluent UI v8](https://developer.microsoft.com/en-us/fluentui#/controls/web/facepile) | Facepile     | Receives list of `IFacepilePersona` to represent each avatar.                                 |
| [Attlassian](https://atlassian.design/components/avatar-group/examples)               | Avatar group | Component uses data prop, which is a list of "entries" to represent each avatar in the group. |
| [Ant Design](https://ant.design/components/avatar/)                                   | Avatar.Group | Uses subcomponent `<Avatar.Group>` to group the avatars given as children.                    |
| [Primer React](https://primer.style/react/AvatarStack)                                | AvatarStack  | Acts similar to a FlexBox, avatars are given as children and grouped.                         |

### Comparison v8 and v0

There's only one existent component similar to AvatarGroup in v8 `Facepile`. v0 doesn't have an equivalent of this component.

- v8 [Facepile](https://developer.microsoft.com/en-us/fluentui#/controls/web/facepile): Only offers spread layout and offers three overflow indicator styles.

## Epic issue: [#22240](https://github.com/microsoft/fluentui/issues/22240)

## Sample Code

```jsx
import { AvatarGroup, Avatar } from '@fluentui/react-avatar';

const App = () => {
  return (
    <AvatarGroup layout="spread" size={32}>
      <Avatar color="colorful" name="Katri Athokas" />
      <Avatar color="colorful" name="Elvia Atkins" />
      <Avatar color="colorful" name="Cameron Evans" />
      <Avatar color="colorful" name="Wanda Howard" />
      <Avatar color="colorful" name="Mona Kane" />
    </AvatarGroup>
  );
};
```

## Variants

There are three layout variants in AvatarGroup:

- Spread layout (Default): Avatars are spaced evenly.
- Stack layout: Avatars are overlapped evenly.
- Pie layout: For the pie layout there can be a minimum of two Avatars and a maximum of three. This layout does not overflow and provides a popover for more details.

  - If the size of the avatar group is `36` or smaller then only the first letter of the initials will be displayed.
  - `maxAvatars` will be ignored when using this layout.

- The `spread` and `stack` layouts have a maximum of 5 avatars before overflowing by default, which can be overridden via the `maxAvatars` prop.

## API

See [AvatarGroup.types.ts](./src/components/AvatarGroup/AvatarGroup.types.ts) for more details.

- `size`: Group size will override the children's current size. This is to ensure that the `AvatarGroup`'s spacing is correct because it changes depending on the group size.
- `popoverSurface`: All Avatars in `popoverSurface` will have a size of 24 and will be encased in a div to apply stylings.
- Avatar `color`: AvatarGroup's colors will follow the order below, but they can be overriden by providing a color specific color on a given avatar.

#### Color override example:

In this example, the first Avatar will have a `darkRed` color, while all the other avatars will follow the default color order.

```jsx
<AvatarGroup>
  <Avatar color="darkRed" name="Katri Athokas" />
  <Avatar name="Elvia Atkins" />
  <Avatar name="Cameron Evans" />
  <Avatar name="Wanda Howard" />
  <Avatar name="Mona Kane" />
</AvatarGroup>
```

#### Color order:

|                       |                    |                       |
| --------------------- | ------------------ | --------------------- |
| Avatar 1: Red         | Avatar 2: Blue     | Avatar 3: Purple      |
| Avatar 4: Forest      | Avatar 5: Pink     | Avatar 6: Lavender    |
| Avatar 7: Teal        | Avatar 8: Gold     | Avatar 9: Cranberry   |
| Avatar 10: Cornflower | Avatar 11: Lilac   | Avatar 12: Anchor     |
| Avatar 13: Dark Green | Avatar 14: Pumpkin | Avatar 15: Dark Red   |
| Avatar 16: Mink       | Avatar 17: Grape   | Avatar 18: Platinum   |
| Avatar 19: Royal Blue | Avatar 20: Brown   | Avatar 21: Peach      |
| Avatar 22: Steel      | Avatar 23: Navy    | Avatar 24: Seafoam    |
| Avatar 25: Magenta    | Avatar 26: Beige   | Avatar 27: Light Teal |
| Avatar 28: Gold       | Avatar 29: Plum    | Avatar 30: Marigold   |

## Structure

- _**Public**_

```jsx
<AvatarGroup layout="spread" size={32}>
  <Avatar name="Katri Athokas" />
  <Avatar name="Elvia Atkins" />
  <Avatar name="Cameron Evans" />
  <Avatar name="Wanda Howard" />
  <Avatar name="Mona Kane" />
</AvatarGroup>
```

- _**Internal**_

```jsx
<slots.root {...slotProps.root}>
  {state.root.children}
  {slots.popoverSurface && slots.popoverTrigger && slotProps.popoverSurface.children && (
    <Popover trapFocus size="small">
      <PopoverTrigger>
        <Tooltip content={state.tooltipContent} relationship="description" appearance="inverted">
          <slots.popoverTrigger {...slotProps.popoverTrigger} />
        </Tooltip>
      </PopoverTrigger>
      <slots.popoverSurface {...slotProps.popoverSurface} />
    </Popover>
  )}
</slots.root>
```

- _**DOM** - how the component will be rendered as HTML elements_

```html
<div className="fui-AvatarGroup" role="group">
  <Avatar />
  <Avatar />
  <Avatar />
  <Avatar />
  <button>+1</button>
</div>

// on document.body
<div class="fui-AvatarGroup__popoverSurface" role="complementary">
  <div class="fui-AvatarGroup__popoverSurfaceItem">
    <Avatar />
    <label />
  </div>
  <!-- ... -->
  <div class="fui-AvatarGroup__popoverSurfaceItem">
    <Avatar />
    <label />
  </div>
</div>
```

## Migration

See [MIGRATION-AvatarGroup.md](MIGRATION-AvatarGroup.md) for details.

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
  - Overflowed state: When there are more Avatars than the `maxAvatars`, an overflow indicator will be rendered that can be clicked to look at the rest of the avatars.
    - `Pie` layout: since `maxAvatars` is ignored, the overflow indicator will be rendered strictly when there's more than three avatars.
- _Interaction_
  - _Keyboard_: Overflow indicator can be interacted with the keyboard and when enter is pressed a popover that traps focus will be rendered.
  - _Cursor_ and _Touch_: When overflow indicator is clicked, the popover is displayed with the avatars that overflow. When the overflow indicator is hovered, a tooltip will read the number of people overflowed (`{numOverflowAvatars} more people` by default).
  - _Screen readers_:
    - `Avatar`: logic is handled by `Avatar` component.
    - `AvatarGroup`:
      - When a label is used alongside `AvatarGroup` and focused, all Avatars are read. If the overflow indicator is rendered, the popover localized text is read.
      - Avatars can be focused and the name will be read. To get to the Avatars in the overflow menu, the Popover must be triggered, which will in turn set focus on it and let the user traverse through the set of overflowed Avatars.

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and reviewed, outcomes from it need to be communicated to design and incorporated in the design document.

- There's no native element for this component.

- `AvatarGroup` will have a role of `group` and slots will be handled by their respective slot type.
- Only the overflow indicator will be focusable by the keyboard. After the overflow indicator is pressed, the popover will handle focus using the `trapFocus` prop.
- There are no live-regions in `AvatarGroup`.
- A Tooltip will appear when the overflow indicator is hovered or focused.
  - Screen reader: when overflow indicator is rendered and focused, screen reader will read the content of the tooltip.
  - Tooltip cannot be focused itself.
- Focus will only be trapped when the overflow indicator is triggered.
