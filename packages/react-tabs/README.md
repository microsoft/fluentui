# @fluentui/react-tabs

**React Tabs components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The `Tabs` control (formerly `Pivot`) is used for navigating frequently accessed, distinct content categories. Tabs allow for navigation between two or more content views and relies on text headers to articulate the different sections of content.

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

To import React Tabs components:

```jsx
import { Tabs, TabItem } from '@fluentui/react-tabs';

const App = () => {
  return (
    <Tabs>
      <TabItem headerText="Hello">Hello</TabItem>
      <TabItem headerText="World">World</TabItem>
    </Tabs>
  );
};
```
