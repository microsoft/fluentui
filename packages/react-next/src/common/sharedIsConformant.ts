import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const defaultOptions = {
    disabledTests: ['has-docblock', 'kebab-aria-attributes'],
  };

  isConformant(defaultOptions, testInfo);
}
