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

### Opt-in test: `classname-overrides-win`

Asserts that a `className` passed by a consumer reaches the root slot and is the **last**
class in the rendered `class` attribute — every class the component contributed itself
comes before it. This is the DOM-observable form of the "consumer overrides win" contract
for components that compose class names with `clsx`.

It is **not** a default test, and must be enabled per component via `extraTests`:

```jsx
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

describe('Foo', () => {
  isConformant({
    Component: Foo,
    displayName: 'Foo',
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
```

Components that still compose with Griffel's `mergeClasses()` do **not** satisfy it, by
design (`@fluentui/react-conformance-griffel`'s `make-styles-overrides-win` covered that
composition model; that package is retired and gets no further releases):
`mergeClasses()` emits its atomic classes _after_ every non-atomic string,
including the consumer's `className`, so the consumer's class lands in the middle of the
attribute by design. That is also why the test has to be enabled per component rather than
in a package's shared `isConformant` wrapper — a package can be partly converted.

Note this test intentionally asserts only class **order**, never computed styles: jsdom
loads no stylesheet for CSS Modules, so `getComputedStyle` has nothing to resolve.

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
