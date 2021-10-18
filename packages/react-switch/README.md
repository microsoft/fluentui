# @fluentui/react-switch

**React Switch components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The `Switch` control (formerly `Toggle`) enables users to trigger an option on or off through pressing on the component.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Switch:

```js
import { Switch } from '@fluentui/react-switch';
```

Once the Switch component graduates to a production release, the component will be available at:

```js
import { Switch } from '@fluentui/react-components';
```

### Examples

```jsx
<Switch />
<Switch defaultChecked={true} />
<Switch checked={switchValue} onChange={switchOnChange} />
<Switch disabled />
```
