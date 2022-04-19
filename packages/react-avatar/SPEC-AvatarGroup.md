# AvatarGroup Spec

## Background

The AvatarGroup component represents multiple people or entities. Avatar groups can be represented in a stacked layout, pie layout, and grid layout.

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

- v8 [Facepile](https://developer.microsoft.com/en-us/fluentui#/controls/web/facepile): Only offers grid layout and offers three overflow indicators.

## Epic issue: [#22240](https://github.com/microsoft/fluentui/issues/22240)

## Sample Code

```jsx
import { AvatarGroup, Avatar } from '@fluentui/react-avatar';

const App = () => {
  return (
    <AvatarGroup layout="grid" size={32}>
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

- Grid layout (Default): Avatars are spaced evenly.
- Stacked layout: Avatars are overlaped evenly.
- Pie layout: by default, there can be a minimum of two Avatars and a maximum of three. This layout does not overflow and provides a popover for more details.

- > For Grid and Stacked layouts, by default there is a maximum of 5 avatars before overflowing.

## API

See [AvatarGroup.types.ts](./src/components/AvatarGroup/AvatarGroup.types.ts) for more details.

- `size`: Group size will override the children's current size. This is to ensure that the `AvatarGroup`'s spacing is correct because it changes depending on the group size.

## Structure

- _**Public**_

```jsx
<AvatarGroup layout="grid" size={32}>
  <Avatar color="colorful" name="Katri Athokas" />
  <Avatar color="colorful" name="Elvia Atkins" />
  <Avatar color="colorful" name="Cameron Evans" />
  <Avatar color="colorful" name="Wanda Howard" />
  <Avatar color="colorful" name="Mona Kane" />
</AvatarGroup>
```

- _**Internal**_

```jsx
<slots.root {...slotProps.root}>
  {state.root.children}
  {slots.popoverSurface && slots.popoverTrigger && (
    <Popover>
      <PopoverTrigger>
        <slots.popoverTrigger {...slotProps.popoverTrigger} />
      </PopoverTrigger>
      <slots.popoverSurface {...slotProps.popoverSurface} />
    </Popover>
  )}
</slots.root>
```

- _**DOM** - how the component will be rendered as HTML elements_

```html
<div className="fui-AvatarGroup">
  <Avatar />
  <Avatar />
  <Avatar />
  <Avatar />
  <span className="fui-AvatarGroup__popoverTrigger">
    <button>+1</button>
  </span>
</div>

// on document.body
<div class="fui-AvatarGroup__popoverSurface" role="complementary">
  <!-- List of overflowed avatars with name -->
</div>
```

## Migration

See [MIGRATION-AvatarGroup.md](MIGRATION-AvatarGroup.md) for details.

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
  - Overflowed state: When there are more Avatars than the `maxAvatars`, an overflow indicator will be rendered that can be clicked to look at the rest of the avatars.
    - `Pie` layout: There's no overflowed state and no overflow indicator. By default if the AvatarGroup is clicked, a popover with the avats is rendered.
- _Interaction_
  - _Keyboard_: Overflow indicator is the only focusable element.
  - _Cursor_ and _Touch_: When overflow indicator is clicked, the popover is displayed with the avatars that overflow.
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and reviewed, outcomes from it need to be communicated to design and incorporated in the design document.

- There's no native element for this component.

- `AvatarGroup` will have a role of `group` and slots will be handled by their respective slot type.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
