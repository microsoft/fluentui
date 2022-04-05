# @fluentui/react-button

**Button components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The Button component enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Button:

```js
import { Button } from '@fluentui/react-button';
```

Once the Button component graduates to a production release, the component will be available at:

```js
import { Button } from '@fluentui/react-components';
```

### Examples

```jsx
<Button>Text</Button>
<Button icon={<SVGIcon />} />
<Button icon={<SVGIcon />}>Text</Button>
<Button icon={<SVGIcon />} iconPosition="after">Text</Button>
<Button primary>Text</Button>
<Button disabled>Text</Button>
<Button size="small">Text</Button>
<Button size="large">Text</Button>
```
