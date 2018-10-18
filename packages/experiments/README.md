# [Office UI Fabric React Experiments](http://dev.microsoft.com/fabric)

##### Experimental components for Office UI Fabric React

These are not production ready components and __should never be used in product__ unless you are the [CODEOWNER](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/.github/CODEOWNERS) of the component and are responsibility for reviewing all PRs involving this component. This experimental space is useful for testing new components whose APIs might change before final release.

To import experimental components:

```js
import { ComponentName } from '@uifabric/experiments/lib/ComponentName';
```

Once the experimental component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react/lib/ComponentName';
```
