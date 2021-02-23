# @fluentui/react-focus-management

**React FocusManagement components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

The provider needs to be wrapped around your application:

```tsx
<FocusManagementProvider>{children}</FocusManagementProvider>
```

The API currently only supports declarative data-\* attributes that are returned using the exported react hooks:

```tsx
const Item: React.FC = ({ children }) => <div tabIndex={0}>Item</div>;

const ArrowNavigationExample: React.FC = ({ children }) => {
  const attr = useArrowNavigationGroup({ circular: true });

  return (
    <div {...attr}>
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
    <FocusManagementProvider>
      <ArrowNavigationExample />
    </FocusManagementProvider>
  );
};
```
