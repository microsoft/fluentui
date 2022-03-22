import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    disabledTests: [
      'kebab-aria-attributes',
      // Disabled as v8 has different prefix
      'component-has-static-classname',
      // Will enable with appropriate overrides separately
      'consistent-callback-names',
      'consistent-callback-args',
      'component-has-static-classnames-object',
    ],
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
