import * as React from 'react';
import type { PositioningConfigurationFn } from './types';

// ---

const DEFAULT_CONFIGURATION: PositioningConfigurationFn = ({ options }) => {
  return options;
};

// ---

const PositioningConfigurationContext = React.createContext<PositioningConfigurationFn | undefined>(undefined);

/**
 * A context provider for the positioning configuration.
 *
 * Accepts a function that takes the positioning options and returns them modified.
 */
export const PositioningConfigurationProvider = PositioningConfigurationContext.Provider;

export const usePositioningConfiguration = (): PositioningConfigurationFn => {
  return React.useContext(PositioningConfigurationContext) ?? DEFAULT_CONFIGURATION;
};
