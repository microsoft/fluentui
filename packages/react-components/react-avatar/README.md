# @fluentui/react-avatar

**React Avatar components for [Fluent UI](https://dev.microsoft.com/fluentui)**

The Avatar component represents a person or entity. It displays the person's image, initials, or an icon, and can be either circular or square.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Avatar:

```js
import { Avatar } from '@fluentui/react-avatar';
```

Once the Avatar component graduates to a production release, the component will be available at:

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
