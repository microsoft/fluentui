# @fluentui/react-experiments

**Experimental components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

These are not production-ready components and **should never be used in product** unless you are the [CODEOWNER](https://github.com/microsoft/fluentui/blob/master/.github/CODEOWNERS) of the component and are responsible for reviewing all PRs involving this component. This experimental space is useful for testing new components whose APIs might change before final release.

To import experimental components:

```js
import { ComponentName } from '@fluentui/react-experiments/lib/ComponentName';
```

### Testing locally

To run the local demo app for this project, first follow the [setup instructions](https://github.com/microsoft/fluentui/wiki/Setup) for the Fluent UI React repo. Then when running `yarn start` from the root of the repo, choose the `@fluentui/react-experiments` option.
