# @fluentui/react-breadcrumb

**React Breadcrumb components for [Fluent UI React](https://react.fluentui.dev/)**

Breadcrumbs should be used as a navigational aid in your app or site. They indicate the current page's location within a hierarchy and help the user understand where they are in relation to the rest of that hierarchy.

## Usage

To import React Breadcrumb components:

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps
} from "@fluentui/react-components';
```

Simple example of Breadcrumb Usage:

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';

export const App = () => (
  <Breadcrumb aria-label="breadcrumb">
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem current={true}>Item 3</BreadcrumbItem>
  </Breadcrumb>
);
```

## Specification

See the [Spec.md](./docs/Spec.md) file for background information on the design/engineering decisions of the component.

## API

For information about the components, please refer to the [API documentation](https://react.fluentui.dev/?path=/docs/components-breadcrumb--default).
