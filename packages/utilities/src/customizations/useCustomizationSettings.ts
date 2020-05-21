import * as React from 'react';
import { ISettings, Customizations, ICustomizations } from './Customizations';

/**
 * Hook to get Customizations settings. It will trigger component state update on settings change observed.
 */
export function useCustomizationSettings(
  properties: string[],
  scopeName?: string,
  localSettings?: ICustomizations,
): ISettings {
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
