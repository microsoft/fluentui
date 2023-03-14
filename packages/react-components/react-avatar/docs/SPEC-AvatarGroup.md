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
const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const AvatarGroup = () => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      <AvatarGroupPopover>
        {overflowItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
      </AvatarGroupPopover>
    </AvatarGroup>
  );
};
```

## Variants

There are three layout variants in AvatarGroup:

- Spread layout (Default): Avatars are spaced evenly.
- Stack layout: Avatars are overlapped evenly.
- Pie layout: Avatars are "cut" in a pie design. When there are two Avatars inline, the Avatars will be cut in half and placed side by side. When there are three Avatars inline, the first Avatar will be cut in half and other two will be downscaled by 50%.
  - The pie layout must have 3 or less Avatars inline and all Avatars must repeat in the `AvatarGroupPopover`. This is handled by `partitionAvatarGroupItems`.
- If `partitionAvatarGroupItems` is used, the `spread` and `stack` layouts will have a maximum of 5 avatars before overflowing by default. This can be overridden via the `maxAvatars` option in `partitionAvatarGroupItems`.

## API

See [AvatarGroup.types.ts](./src/components/AvatarGroup/AvatarGroup.types.ts), [AvatarGroupPopover.types.ts](./src/components/AvatarGroupPopover/AvatarGroupPopover.types.ts) and [AvatarGroupItem.types.ts](./src/components/AvatarGroupItem/AvatarGroupItem.types.ts) for more details.

- `size`: Group size will override the children's current size. This is to ensure that the `AvatarGroup`'s spacing is correct because it changes depending on the group size.
- `AvatarGroupPopover`: All Avatars in `AvatarGroupPopover` will have a size of 24 and have a wrapper to apply stylings.
- AvatarGroupItem `color`: Can be overridden by providing a specific color on a given avatar.

#### Color override example:

In this example, the first AvatarGroupItem will have a `darkRed` color, while all the other Avatars have their color assigned by Avatar.

```jsx
<AvatarGroup>
  <AvatarGroupItem color="darkRed" name="Katri Athokas" />
  <AvatarGroupItem name="Elvia Atkins" />
  <AvatarGroupItem name="Cameron Evans" />
  <AvatarGroupItem name="Wanda Howard" />
  <AvatarGroupItem name="Mona Kane" />
</AvatarGroup>
```

## Structure

- _**Public**_

```jsx
<AvatarGroup layout="spread" size={32}>
  <AvatarGroupItem name="Katri Athokas" />
  <AvatarGroupItem name="Elvia Atkins" />
  <AvatarGroupItem name="Cameron Evans" />
  <AvatarGroupItem name="Wanda Howard" />
  <AvatarGroupPopover>
    <AvatarGroupItem name="Mona Kane" />
    <AvatarGroupItem name="Kristin Patterson" />
    <AvatarGroupItem name="Elliot Woodward" />
    <AvatarGroupItem name="Charlotte Waltson" />
  </AvatarGroupPopover>
</AvatarGroup>
```

- _**Internal**_

```jsx
// AvatarGroup
<AvatarGroupProvider value={contextValues.avatarGroup}>
  <slots.root {...slotProps.root} />
</AvatarGroupProvider>

// AvatarGroupPopover
<slots.root {...(slotProps.root as PopoverProps)}>
  <PopoverTrigger>
    <slots.tooltip {...(slotProps.tooltip as TooltipProps)}>
      <slots.triggerButton {...slotProps.triggerButton} />
    </slots.tooltip>
  </PopoverTrigger>
  <slots.popoverSurface {...slotProps.popoverSurface}>
    <AvatarGroupProvider value={contextValues.avatarGroup}>
      <slots.content {...slotProps.content} />
    </AvatarGroupProvider>
  </slots.popoverSurface>
</slots.root>

// AvatarGroupItem
<slots.root {...slotProps.root}>
  <slots.avatar {...slotProps.avatar} />
  {state.isOverflowItem && <slots.overflowLabel {...slotProps.overflowLabel} />}
</slots.root>
```

- _**DOM** - how the component will be rendered as HTML elements_

```html
<div className="fui-AvatarGroup" role="group">
  <div class="fui-AvatarGroupItem">
    <Avatar />
  </div>
  <div class="fui-AvatarGroupItem">
    <Avatar />
  </div>
  <button>+1</button>
</div>

// on document.body
<div class="fui-AvatarGroupPopover" role="dialog" aria-label="Overflow">
  <ul>
    <li class="fui-AvatarGroupItem">
      <Avatar />
      <label />
    </li>
    <li class="fui-AvatarGroupItem">
      <Avatar />
      <label />
    </li>
  </ul>
</div>
```

## Migration

See [v8 to v9 migration guide](https://react.fluentui.dev/?path=/docs/concepts-upgrading-from-v8-components-avatargroup-upgrade--page) for details.

## Behaviors

_Explain how the component will behave in use, including:_

- _AvatarGroupPopover Component States_

  - _Keyboard_: `triggerButton` can be interacted with the keyboard and when enter is pressed a popover that traps focus on the PopoverSurface will be rendered.
  - _Cursor_ and _Touch_: When overflow indicator is clicked, the popover is displayed with the avatars that overflow. When the overflow indicator is hovered, a tooltip will read `View more people.`.
  - _Screen readers_:
    - When the `triggerButton` is focused, its content will be read.

- _AvatarGroupItem Component States_
  - _Screen readers_:
    - When AvatarGroupItem is rendered inline, logic is handled by `Avatar` component.
    - When AvatarGroupItem is rendered inside AvatarGroupPopover, the label is disabled via `aria-label` and `Avatar` will handle the screen reader.

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and reviewed, outcomes from it need to be communicated to design and incorporated in the design document.

- There's no native element for this component.

- `AvatarGroup` will have a role of `group`.
- Only the `popoverTrigger` will be focusable by the keyboard.
- There are no live-regions in `AvatarGroup`.
- A Tooltip will appear when the `popoverTrigger` is hovered or focused.
- Focus will only be trapped when the `popoverTrigger` is triggered.
- The label rendered along with the Avatar inside AvatarGroupPopover is disabled via `aria-label`.
- A `<ul>` with role list is rendered inside the PopoverSurface.
