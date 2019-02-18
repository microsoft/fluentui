import { mergeSettings, mergeScopedSettings } from './mergeSettings';
import { ICustomizerProps } from './Customizer.types';
import { ICustomizerContext } from './CustomizerContext';

/**
 * Merge props and customizations giving priority to props over context.
 * NOTE: This function will always perform multiple merge operations. Use with caution.
 * @param props - New settings to merge in.
 * @param parentContext - Context containing current settings.
 * @returns Merged customizations.
 */
export function mergeCustomizations(props: ICustomizerProps, parentContext: ICustomizerContext): ICustomizerContext {
  const { customizations = { settings: {}, scopedSettings: {} } } = parentContext || {};

  return {
    customizations: {
      settings: mergeSettings(customizations.settings, props.settings),
      scopedSettings: mergeScopedSettings(customizations.scopedSettings, props.scopedSettings),
      inCustomizerContext: true
    }
  };
}
