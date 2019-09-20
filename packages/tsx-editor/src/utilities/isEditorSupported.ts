import { getWindow, isIE11 } from 'office-ui-fabric-react/lib/Utilities';
import { getMonacoConfig } from '@uifabric/monaco-editor/lib/configureEnvironment';
import { isExampleValid } from '../transpiler/exampleParser';
import { getSetting } from './settings';
import { IBasicPackageGroup } from '../interfaces/packageGroup';

export function isEditorSupported(code: string, supportedPackages: IBasicPackageGroup[]): boolean {
  const win = getWindow();
  return (
    // Not server-side rendering
    !!win &&
    // Required environment config available
    !!getMonacoConfig() &&
    // Opt-in query param or session storage is set
    getSetting('useEditor') === '1' &&
    // Not IE 11
    !isIE11() &&
    // Web worker available
    typeof Worker !== 'undefined' &&
    // No immediate issues detected in example (or exceptions thrown from parsing)
    isExampleValid(code, supportedPackages)
  );
}
