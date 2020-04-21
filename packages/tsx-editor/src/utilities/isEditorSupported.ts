import { getWindow, isIE11 } from 'office-ui-fabric-react/lib/Utilities';
import { isConfigAvailable } from '@uifabric/monaco-editor/lib/configureEnvironment';
import { isExampleValid } from '../transpiler/exampleParser';
import { getSetting } from './settings';
import { IBasicPackageGroup } from '../interfaces/packageGroup';

export function isEditorSupported(code: string, supportedPackages: IBasicPackageGroup[]): boolean {
  const win = getWindow();

  const useEditor = getSetting('useEditor');
  if (useEditor === '1') {
    // force attempting to load the editor
    return true;
  }

  return (
    // Not server-side rendering
    !!win &&
    // Required environment config available
    !!isConfigAvailable() &&
    // Opt-out query param or session storage is not set
    useEditor !== '0' &&
    // Not IE 11
    !isIE11() &&
    // Web worker available
    typeof Worker !== 'undefined' &&
    // No immediate issues detected in example (or exceptions thrown from parsing)
    isExampleValid(code, supportedPackages)
  );
}
