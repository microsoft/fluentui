import * as React from 'react';
import { makeShadowConfig } from '@fluentui/merge-styles';
import type { ShadowConfig } from '@fluentui/merge-styles';

export type ShadowConfigHook = (stylesheetKey: string, inShadow: boolean, win?: Window) => ShadowConfig;

/**
 * Get a shadow config.
 * @param stylesheetKey - Globally unique key
 * @param win - Reference to the `window` global.
 * @returns ShadowConfig
 */
export const useShadowConfig: ShadowConfigHook = (stylesheetKey, inShadow = false, win?) => {
  return React.useMemo(() => {
    return makeShadowConfig(stylesheetKey, inShadow, win);
  }, [stylesheetKey, inShadow, win]);
};
