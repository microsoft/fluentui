# [@uifabric/lists](http://dev.microsoft.com/fabric)

## Overview

The intent of the `@uifabric/lists` package is to prototype approaches to lists both virtualized and non-virtualized.

Eventually, this will be a home for _all_ Fabric List controls, migrated in a backwards-compatible way. Until then, we recommend using `office-ui-fabric-react`'s more _stable_ List components:

- [List](https://developer.microsoft.com/en-us/fabric#/controls/web/list)
- [DetailsList](https://developer.microsoft.com/en-us/fabric#/controls/web/detailslist)
- [GroupedList](https://developer.microsoft.com/en-us/fabric#/controls/web/groupedlist)

##### Lists components for Office UI Fabric React

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

To import Lists components:

```js
import { ComponentName } from '@uifabric/lists';
```

Once the Lists component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react';
```
