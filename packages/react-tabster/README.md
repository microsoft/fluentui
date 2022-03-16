# @fluentui/react-tabster

**Tabster components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

Library for focus management that leverages [tabster](https://github.com/microsoft/tabster).

The provider needs to be wrapped around your application:

```tsx
<TabsterProvider>{children}</TabsterProvider>
```

The API currently only supports declarative data-\* attributes that are returned using the exported react hooks:

```tsx
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
  return (
    <TabsterProvider>
      <ArrowNavigationExample />
    </TabsterProvider>
  );
};
```
