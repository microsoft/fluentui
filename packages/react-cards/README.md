# [@uifabric/react-cards](http://dev.microsoft.com/fabric)

##### What are Card components?

A `Card` is a surface to display content and actions about a single topic. It acts as a container for actionable information like text, images and icons.

`Card` components abstract styling properties and utilize them in tandem with theme variables. Some of the properties they abstract are:

- Paddings
- Widths
- Heights
- Shadowing
- Borders
- Colors

##### Card components for Office UI Fabric React

This package is intended to contain different variants of `Card` components to be leveraged when building applications using UI Fabric.

Please take note that, at the moment, these are not production ready components and **should never be used in product**. This ReactCards space is useful for testing new components whose APIs might change before final release.

To import ReactCards components:

```js
import { ComponentName } from '@uifabric/react-cards';
```

Once the ReactCards component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react';
```
