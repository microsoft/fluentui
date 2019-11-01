# @uifabric/experiments

**Experimental components for [Office UI Fabric React](https://dev.microsoft.com/fabric)**

These are not production-ready components and **should never be used in product** unless you are the [CODEOWNER](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/.github/CODEOWNERS) of the component and are responsible for reviewing all PRs involving this component. This experimental space is useful for testing new components whose APIs might change before final release.

To import experimental components:

```js
import { ComponentName } from '@uifabric/experiments/lib/ComponentName';
```

Once the experimental component graduates to a production release, the component will be available at:

```js
import { ComponentName } from 'office-ui-fabric-react/lib/ComponentName';
```

### Testing locally

To run the local demo app for this project, first follow the [setup instructions](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Setup) for the `office-ui-fabric-react` repo. Then run the following starting from the root folder (**not** the `experiments` folder):

```
yarn
yarn buildto experiments --min
cd packages
cd experiments
yarn start
```
