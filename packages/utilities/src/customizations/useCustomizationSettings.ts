import * as React from 'react';
import { ISettings, Customizations } from './Customizations';
import { CustomizerContext } from './CustomizerContext';

/**
 * Hook to get Customizations settings from Customizations singleton or CustomizerContext.
 * It will trigger component state update on settings change observed.
 */
export function useCustomizationSettings(properties: string[], scopeName?: string): ISettings {
  const forceUpdate = useForceUpdate();
  const customizerContext = React.useContext(CustomizerContext);
  const localSettings = customizerContext.customizations;

  React.useEffect(() => {
    if (!localSettings.inCustomizerContext) {
      Customizations.observe(forceUpdate);
      return () => Customizations.unobserve(forceUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- exclude forceUpdate
  }, [localSettings.inCustomizerContext]);

  return Customizations.getSettings(properties, scopeName, localSettings);
}

function useForceUpdate() {
  const [, reducer] = React.useReducer((state: number) => state + 1, 0);
  return () => reducer(null);
}
