import { getWindow, isIE11 } from 'office-ui-fabric-react/lib/Utilities';
import { getMonacoConfig } from '@uifabric/monaco-editor/lib/configureEnvironment';
import { tryParseExample } from '../transpiler/exampleParser';
import { getSetting } from '../utilities/settings';
import { IPackageGroup } from '../interfaces/packageGroup';

export function isEditorSupported(code: string, supportedPackages: IPackageGroup[]): boolean {
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
    // Service worker available (for some reason win.navigator.serviceWorker is always undefined,
    // at least in Chrome...?)
    !!navigator.serviceWorker &&
    // No immediate issues detected in example (or exceptions thrown from parsing)
    typeof tryParseExample(code!, supportedPackages) !== 'string'
  );
}
