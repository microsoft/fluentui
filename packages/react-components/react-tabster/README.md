# @fluentui/react-tabster

**Tabster components for [Fluent UI React](https://react.fluentui.dev)**

Library for focus management that leverages [tabster](https://github.com/microsoft/tabster).

The API currently only supports declarative data-\* attributes that are returned using the exported react hooks:

```tsx
import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

const Item: React.FC = ({ children }) => <div tabIndex={0}>Item</div>;

const ArrowNavigationExample: React.FC = ({ children }) => {
  const attrs = useArrowNavigationGroup({ circular: true });

  return (
    <div {...attrs}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

const App: React.FC = () => {
  return <ArrowNavigationExample />;
};
```
