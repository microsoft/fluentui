import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant(testInfo: Omit<IsConformantOptions, 'componentPath'>) {
  const defaultOptions = {
    disabledTests: ['has-docblock', 'kebab-aria-attributes', 'consistent-callback-names'],
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
