import * as React from 'react';

type FeatureFlags = {
  ModalAriaHidden?: boolean;
  TestFeature?: boolean; // used for testing only, replace with a real feature in .test when a second feature is added
};

const _featureFlags: FeatureFlags = {};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(_featureFlags);
export const getFeatureFlags = () => React.useContext(FeatureFlagsContext);

/**
 * This should only be used in a non-React environment. In React, use <FeatureFlagsContext.Provider> instead.
 * This MUST called BEFORE the flags are consumed, because it does not trigger an update.
 * Ideally it is called only once at the time an app boots.
 */
export function atBootSetFeatureFlags(featureFlags: FeatureFlags) {
  // copy over flags into existing object
  Object.keys(featureFlags).forEach(flag => {
    // @ts-ignore for 7053
    _featureFlags[flag] = featureFlags[flag];
  });
}
