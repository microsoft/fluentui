import * as React from 'react';
import { Customizations } from './Customizations';
import { CustomizerContext } from './CustomizerContext';
import type { ISettings } from './Customizations';

/**
 * Hook to get Customizations settings from Customizations singleton or CustomizerContext.
 * It will trigger component state update on settings change observed.
 */
export function useCustomizationSettings(properties: string[], scopeName?: string): ISettings {
  const forceUpdate = useForceUpdate();
  const { customizations } = React.useContext(CustomizerContext);
  const { inCustomizerContext } = customizations;
  React.useEffect(() => {
    if (!inCustomizerContext) {
      Customizations.observe(forceUpdate);
    }
    return () => {
      if (!inCustomizerContext) {
        Customizations.unobserve(forceUpdate);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- exclude forceUpdate
  }, [inCustomizerContext]);

  return Customizations.getSettings(properties, scopeName, customizations);
}

function useForceUpdate() {
  const [, setValue] = React.useState(0);
  return () => setValue(value => ++value);
}
