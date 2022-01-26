import { getWindow, isIE11 } from '@fluentui/react/lib/Utilities';
import { isConfigAvailable } from '@fluentui/monaco-editor/lib/configureEnvironment';
import { isExampleValid } from '../transpiler/exampleParser';
import { getSetting } from './settings';
import type { IBasicPackageGroup } from '../interfaces/packageGroup';

export function isEditorSupported(code: string, supportedPackages: IBasicPackageGroup[], propValue?: boolean): boolean {
  const win = getWindow();

  // The editor won't work at all unless:
  // - Not server-side rendering
  // - Required environment config available
  // - Web worker available
  if (!(win && isConfigAvailable() && typeof Worker !== 'undefined')) {
    return false;
  }

  // The setting to force attempting to load the editor or not overrides preferred conditions
  const useEditor = getSetting('useEditor');
  if (useEditor) {
    return useEditor !== '0';
  }

  // Preferred conditions
  return (
    // Respect prop disabling the editor
    propValue !== false &&
    // Not IE 11 ()
    !isIE11() &&
    // No immediate issues detected in example (or exceptions thrown from parsing)
    isExampleValid(code, supportedPackages)
  );
}
