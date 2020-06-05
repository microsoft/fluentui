import * as React from 'react';
import { Features } from './types';

export { Features } from './types';

/**
 * Feature flags allow us to ship features off by default, unless the consuming app turns on that feature. This is
 * intended to let a partner test a given feature first before releasing it to the rest of FluentUI consumers.
 * The flags are provided via React Context.
 */

const _features: Record<string, string> = {};

/**
 * React context for accessing feature flags.
 */
export const FeaturesContext = React.createContext<Features>(_features);

/**
 * Hook for accessing feature flags.
 */
export const useFeatures = () => React.useContext(FeaturesContext);

/**
 * Gets initial feature flags. Note that if contextual features are provided through FeaturesProvider, this
 * will not return those.
 */
export const getInitialFeatures = (): Features => _features;

/**
 * This should only be used in a non-React environment. In React, use FeaturesProvider instead.
 * This MUST called BEFORE the flags are consumed, because it does not trigger an update.
 * Ideally it is called only once at the time an app boots.
 */
export const setInitialFeatures = (features: Features) => {
  Object.keys(_features).forEach(key => delete _features[key]);

  // tslint:disable-next-line:no-any
  Object.keys(features).forEach(key => (_features[key] = (features as any)[key]));
};

/**
 * Exposes a FeaturesProvider component, which takes in new feature flags and provides them via context.
 * Usage of this provider wrapper prevents overwriting of other feature flags set in a higher context.
 */
export const FeaturesProvider = (props: React.PropsWithChildren<Features>) => {
  const { children, ...rest } = props;
  const parentFeatures = useFeatures();

  return <FeaturesContext.Provider value={{ ...parentFeatures, ...rest }}>{children}</FeaturesContext.Provider>;
};
