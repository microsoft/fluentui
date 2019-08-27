# @uifabric/react-hooks

**UI Fabric React hooks**

Helpful hooks not provided by React itself.

A somewhat contrived example:

```tsx
import React from 'react';
import { useConst, useId } from '@uifabric/react-hooks';

export const MemoList: React.FunctionComponent<{ items: string[] }> = React.memo(({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
});

export const MyComponent = () => {
  const id = useId('MyComponent');
  const text = useConst(() => {
    /* some computation that must only run once */
  });
  const items = useConst(['foo', 'bar', 'baz']);

  return (
    <div id={id}>
      <p>{text}</p>
      <MemoList items={items} />
    </div>
  );
};
```
