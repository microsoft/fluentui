# @fluentui/react-features-provider

**React FeaturesProvider helpers for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

Some Fluent UI features are experimental and must be turned on through a provider. To enable these features, this
library provides a number of utilities to set and get feature flags.

### Enabling features in your application

You can enable features in one of two ways:

#### Use React context through FeaturesProvider

Example usage:

```tsx
import { FeaturesProvider } from '@fluentui/react-features-provider';

<FeaturesProvider enableFeature1>
  <App />
</FeaturesProvider>;
```

#### Set initial features globally before app start

In some cases there are many React islands on the page and it makes more sense to simply set flags globally. Use `setInitialFeatures` before your app starts up.

Example usage;

```tsx
import { setInitialFeatures } from '@fluentui/react-features-provider';

setInitialFeatures({
  enableFeature1: true,
});
```

### Defining features to be consumed in components

Feature flags should have a limited lifetime and should be reserved for risky features that
need to be validated before becoming the default behavior. Optional logic adds risk, bloat,
and code debt, so please reserve using feature flags only when needed.

Flags are defined in the `types.ts` file in the repo.

Reading the flag values can be done in 2 ways:

#### useFeatures hook

Example usage:

```tsx
import { useFeatures } from '@fluentui/react-features-provider';

const MyFunctionComponent = props => {
  const { enabledFeature1 } = useFeatures();
};
```

#### Accessing initial global features

Global features can also accessed when React context is not available. It is recommended to
avoid this unless you don't have other options, as it will not respect contextually provided
features.

Example usage:

```tsx
import { getInitialFeatures } from '@fluentui/react-features-provider';

const { enabledFeature1 } = getInitialFeatures();
```
