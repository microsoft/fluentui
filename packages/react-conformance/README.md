# @fluentui/react-conformance

A tool used to run standardized tests which follow [Fluent UI React's](https://developer.microsoft.com/en-us/fluentui) component guidelines. It also can be extended and allows for adding your own conformance tests.

## Configuration

### isConformant ( base configuration )

Add isConformant within your package and configure any globally applied test options.

```
my-proj/
├─ common/
│  ├─ isConformant.ts 👈
├─ src/
├─ node_modules/
├─ package.json
```

```jsx
import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    componentPath: module!.parent!.filename.replace('.test', ''),
    // 👆 Put any required test options here ( ex: componentPath, asPropHandlesRef, ... )
  };

  baseIsConformant(defaultOptions, testInfo);
}
```

### isConformant ( running tests )

Within your component's test file:

```
my-proj/
├─ common/
├─ src/
│  ├─ components
│  │  ├─ Foo
│  │  │  ├─ ...
│  │  │  ├─ Foo.test 👈
├─ node_modules/
├─ package.json
```

Import the isConformant file that you just created:

```jsx
import { isConformant } from '../../common/isConformant';

describe('Foo', () => {
  isConformant({
    Component: Foo,
    displayName: 'Foo',
    disabledTests: [],
    // 👆 For tests that don't fit the guidelines of your component you can disable them.
  });
});
```
