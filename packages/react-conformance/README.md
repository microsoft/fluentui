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
    componentPath: require.main?.filename.replace('.test', ''),
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

### isConformant with React Portals

By default `isConformant` inspects a component's immediate parent container. Because React Portals are typically rendered outside this container components using Portals will fail conformance. For example the `component-has-static-classnames-object` tests inspect the rendered DOM for certain class names but, with default settings, will fail for anything rendered into a Portal.

Portals can be inspected by providing a `getTargetElement` function to `isConformant`.

```jsx

// Assume that `Foo` is a component that renders a Portal.
// It takes a prop called `idForPortal` that renders the
// provided id in the Portal, allowing it to be looked up
// via `getPortalElement()`.

const getPortalElement = (result, attr) => {
  return result.baseElement.querySelector("#portal-id");
};

describe('Foo', () => {
  isConformant({
    Component: Foo,
    displayName: 'Foo'
    requiredProps: { idForPortal: "portal-id" },
    getTargetElement: getPortalElement
  });
});
```
