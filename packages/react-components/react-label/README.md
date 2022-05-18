# @fluentui/react-label

**React Label components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

Labels provide a name or title to a component or group of components, e.g., text fields, checkboxes, radio buttons, and dropdown menus.

## Usage

To use the `Label` component import it from `@fluentui/react-components` and use it as shown below.

```tsx
import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { useId } from '@fluentui/react-utilities';

export const labelExample = () => {
  const inputId = useId('firstNameLabel-');

  return (
    <>
      <Label htmlfor={inputId} required strong>
        First Name
      </Label>
      <input id={inputId} />
    </>
  );
};
```

See [Fluent UI Storybook](https://aka.ms/fluentui-storybook) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-label` from the list.

### Specification

See [Spec.md](./Spec.md).
