import { GlobalSettings, isIE11 } from '@fluentui/utilities';
import { UseVariantClassesOverride, UseVariantClassesOverrideKey } from './makeVariantClasses';
import { useVariantClassesIE11Override } from './useVariantClassesIE11Override';

// Initialize the global settings override.
if (isIE11()) {
  GlobalSettings.setValue<UseVariantClassesOverride>(UseVariantClassesOverrideKey, useVariantClassesIE11Override);
}
