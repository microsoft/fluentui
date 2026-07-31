import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // `classname-overrides-win` (DECISIONS.md D9) is added per component, and the seven
    // DataGrid* components declare their marker SET (D16.3), because both are per-component
    // facts. See any *.test.tsx in this package.
  };

  baseIsConformant(defaultOptions, testInfo);
}
