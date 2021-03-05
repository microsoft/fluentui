# @fluentui/react-conformance

**React Conformance testing API for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

####Note: this API is currently unstable, it is a work in progress.

This API checks if the given component complies with the current testsas well as allowing you to add your own tests.

## isConformant

```
    function isConformant(
        Component: React.ComponentType,
        options: IsConformantOptions,
        extraTests?: ConformanceTest[] | undefined
    ): void
```

Function to test if the component is compliant with the given set of tests. If needed, use the `extraTests` argument to add any needed tests.

###Example

```jsx
import { isConformant } from '@react-conformance/isConformant';

describe('Foo', () => {
  it('is conformant', () => {
    isConformant(
      Foo,
      {
        /* options */
      },
      [
        /* extra tests */
      ],
    );
  });
});
```

##Tests running by default

| Test | Description |
| ---- | ----------- |
| ...  | ...         |
| ...  | ...         |
| ...  | ...         |
