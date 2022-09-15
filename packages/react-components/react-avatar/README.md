# @fluentui/react-avatar

**React Avatar components for [Fluent UI](https://react.fluentui.dev/)**

The Avatar component represents a person or entity. It displays the person's image, initials, or an icon, and can be either circular or square.

## Usage

To import Avatar:

```js
import { Avatar } from '@fluentui/react-components';
```

### Examples

```jsx
<Avatar name="Miguel Garcia" />
<Avatar size={72} name="Mona Kane" image="./MonaKane.jpg" />
<Avatar shape="square" icon={<IDBadgeIcon />} />
```

Displaying a badge:

```jsx
<Avatar name="Allan Munger" badge={<PresenceBadge status="busy">} />
```

With active state indication:

```jsx
<Avatar name="Daisy Phillips" active={true} activeAppearance="ring-shadow" />
<Avatar name="Robin Counts" active={false} activeAppearance="ring-shadow" />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-avatar` from the list.

### Specification

See [SPEC.md](./SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Avatar implementation.
