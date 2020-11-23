import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant(testInfo: Omit<IsConformantOptions, 'componentPath'> & { componentPath?: string }) {
  const defaultOptions = {
    disabledTests: ['has-docblock', 'kebab-aria-attributes'],
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
