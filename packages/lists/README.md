# @uifabric/lists

**List components for [Office UI Fabric React](https://dev.microsoft.com/fabric)**

## Overview

The intent of the `@uifabric/lists` package is to prototype approaches to lists both virtualized and non-virtualized:

- **StaticList** (in development): Provides a simple way to display an arbitrary collection of items in a list, without view virtualization.
- **DynamicList** (in planning): Represents a component to display an arbitrary collection of items in a list, with view virtualization.
- **FixedList** (in development): Inspired by Brian Vaughn's [react-window](https://github.com/bvaughn/react-window) (MIT license), this component is a special case of DynamicList which is specifically optimized for the case where all row heights are the same and known in advance.

Eventually, this package will be a home for _all_ Fabric List controls, migrated in a backwards-compatible way. Until then, we recommend using `office-ui-fabric-react`'s more _stable_ List components:

- [List](https://developer.microsoft.com/en-us/fabric#/controls/web/list)
- [DetailsList](https://developer.microsoft.com/en-us/fabric#/controls/web/detailslist)
- [GroupedList](https://developer.microsoft.com/en-us/fabric#/controls/web/groupedlist)

## Usage

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

To import Lists components:

```js
import { ComponentName } from '@uifabric/lists';
```

Once the Lists component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react';
```

## Profiling

Below are resources on using the React profiler and `<Profiler/>` component:

- https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
- https://gist.github.com/bvaughn/60a883af01716a03a1b3285a1029be0c
