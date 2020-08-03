import * as React from 'react';
import { ISettings, Customizations } from './Customizations';
import { CustomizerContext } from './CustomizerContext';

/**
 * Hook to get Customizations settings. It will trigger component state update on settings change observed.
 */
export function useCustomizationSettings(properties: string[], scopeName?: string): ISettings {
  const customizerContext = React.useContext(CustomizerContext);
  const localSettings = customizerContext.customizations;
  const [settings, setSettings] = React.useState(Customizations.getSettings(properties, scopeName, localSettings));

  const onCustomizationChange = React.useCallback(() => {
    const globalSettings = Customizations.getSettings(properties, scopeName, localSettings);
    setSettings(globalSettings);
  }, [properties, scopeName, localSettings]);

  React.useEffect(() => {
    Customizations.observe(onCustomizationChange);

    return () => Customizations.unobserve(onCustomizationChange);
  }, [onCustomizationChange]);

  return settings;
}
