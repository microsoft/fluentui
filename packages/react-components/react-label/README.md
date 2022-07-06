# @fluentui/react-label

**Label components for [Fluent UI React](https://react.fluentui.dev/)**

Labels provide a name or title to a component or group of components, e.g., text fields, checkboxes, radio buttons, and dropdown menus.

## Usage

To import `Label`:

```js
import { Label } from '@fluentui/react-components';
```

### Examples

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

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-label` from the list.

### Specification

See [Spec.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Label implementation.
