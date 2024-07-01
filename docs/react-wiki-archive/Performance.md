This document describes good/bad practices for performance. If you have any concerns/questions regarding performance, feel free to reach out to us by reporting a GitHub issue.

## Styles prop

Fluent V7 components support `styles` prop for you to customize styles. It can impact performance negatively if it's constantly mutating on every render. This is because if `styles` is changed by reference, styles need to be recalculated with a cost.

---

_Styles is an object._

#### Good

```tsx
const checkboxStyles = { root: { background: 'red' } };
const App = () => {
  return <Checkbox styles={checkboxStyles} />;
};
```

#### Bad

```tsx
const App = () => {
   return (
      <Checkbox styles={{ root: { background: 'red' }} />
   );
};
```

---

_Styles is a function._

#### Good

```tsx
const checkboxStyles = ({ checked }) => ({ root: { background: checked ? 'red' : 'blue' } });

const App = () => {
  return <Checkbox styles={checkboxStyles} />;
};
```

#### Bad

```tsx
const App = () => {
  return <Checkbox styles={({ checked }) => ({ root: { background: checked ? 'red' : 'blue' } })} />;
};
```

---

#### Good

_With memoization._

```tsx
import { memoizeFunction } from '@fluentui/react/lib/Utilities';

const getCheckboxStyles = memoizeFunction(background => ({ root: { background } }));

const App = () => {
  const [color, setColor] = React.useState('red');
  const toggleColor = () => setColor(color === 'red' ? 'blue' : 'red');
  return (
    <>
      <button onClick={toggleColor}>Toggle color</button>
      <Checkbox styles={getCheckboxStyles(backgroundColor)} />
    </>
  );
};
```

#### Bad

_New styles object will be passed every time `getCheckboxStyles` is called :(_

```tsx
const getCheckboxStyles = background => ({ root: { background } });

const App = () => {
  const [color, setColor] = React.useState('red');
  const toggleColor = () => setColor(color === 'red' ? 'blue' : 'red');
  return (
    <>
      <button onClick={toggleColor}>Toggle color</button>
      <Checkbox styles={getCheckboxStyles(backgroundColor)} />
    </>
  );
};
```

_Do not use `React.useMemo` for memoizing styles creation, because it resets the cache every time component unmounts. It will help in case of re-renders, but not if the same component gets mounted multiple times._

```tsx
const App = () => {
  const [color, setColor] = React.useState('red');
  const toggleColor = () => setColor(color === 'red' ? 'blue' : 'red');
  const checkboxStyles = React.useMemo(() => ({ root: { background: color } }), [color]);

  return (
    <>
      <button onClick={toggleColor}>Toggle color</button>
      <Checkbox styles={checkboxStyles} />
    </>
  );
};
```

---
