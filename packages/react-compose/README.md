# @fluentui/react-compose

**Composition functionality for [Fluent UI](https://aka.ms/fluent-ui/)**

This functionality is in the experimental stage and **should never be used in production** as APIs might change before final release.

### Usage

To import `compose` and use:

```js
import { Button } from '@fluentui/react-northstar';
import { compose } from '@fluentui/react-compose';

const PrimaryButton = compose(Button, {
  className: 'ui-primary-button',
  displayName: 'PrimaryButton',

  mapPropsToStylesProps: props => ({ compact: props.compact }),

  handledProps: ['compact'],
  overrideStyles: true,
});
```

- `className` overrides a `className` that we will be assigned to the `root` slot of a component
- `displayName` modifies a React's `displayName` for component, it will be also used as a selector for styles overrides in your theme
- `mapPropsToStylesProps` passes additional design terms to styles functions
- `handledProps` is an array of props that will not be bypassed to the component's root slot
- `overrideStyles` indicates should the component will use only its own styles or will merge those with parent's
