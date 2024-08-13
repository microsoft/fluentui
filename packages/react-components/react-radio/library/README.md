# @fluentui/react-radio

**React Radio components for [Fluent UI React](https://react.fluentui.dev)**

A Radio allows a user to select a single value from two or more options. All Radios with the same `name` are considered to be part of the same group. However, a `RadioGroup` is recommended to add a group label, formatting, and other functionality.

### Usage

Import `Radio` and `RadioGroup`:

```js
// From @fluentui/react-components
import { Radio, RadioGroup } from '@fluentui/react-components';

// Directly from @fluentui/react-radio
import { Radio, RadioGroup } from '@fluentui/react-radio';
```

#### Examples

```jsx
<RadioGroup defaultValue="B">
  <Radio value="A" label="Option A" />
  <Radio value="B" label="Option B" />
  <Radio value="C" label="Option C" />
  <Radio value="D" label="Option D" />
</RadioGroup>

<RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
  <Radio value="A" label="Option A" />
  <Radio value="B" label="Option B" />
  <Radio value="C" label="Option C" />
  <Radio value="D" label="Option D" />
</RadioGroup>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-radio` from the list.

### Specification

See [Spec.md](./Spec.md).
