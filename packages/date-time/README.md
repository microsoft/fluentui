# [Office UI Fabric React DateTime](http://dev.microsoft.com/fabric)

##### DateTime components for Office UI Fabric React

These are not production ready components and __should never be used in product__. This DateTime space is useful for testing new components whose APIs might change before final release.

To import DateTime components:

```js
import { ComponentName } from '@uifabric/date-time';
```

Once the DateTime component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react';
```

#### Development Notes

Initial refactor in progress, still TODO:
- Move the DatePicker control in to the date-time package
- Refactoring the Calendar control:
  - Unit tests all need to be copied over and updated to work with the refactor
  - Styling pass needs to be done to make sure we didn't drop styles
  - Integrate the latest missing changes from OUFR version
    - Year picker
    - Accessibility updates