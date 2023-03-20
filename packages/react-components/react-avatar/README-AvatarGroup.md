# @fluentui/react-avatar

**React AvatarGroup component for [Fluent UI](https://react.fluentui.dev)**

The AvatarGroup component represents a group of multiple people or entities by taking care of the arrangement of individual Avatars in a spread, stack, or pie layout.

## Usage

To import AvatarGroup, AvatarGroupItem, AvatarGroupPopover, and partitionAvatarGroupItems:

```js
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
```

### Examples

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
