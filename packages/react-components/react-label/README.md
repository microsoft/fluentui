# @fluentui/react-label

**React Label components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To use the `Label` component import it from `@fluentui/react-label` and use it as shown below.

```tsx
import * as React from 'react';
import { Label } from '@fluentui/react-label';
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
