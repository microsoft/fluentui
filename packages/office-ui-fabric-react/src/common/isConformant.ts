// eslint-disable-next-line import/no-extraneous-dependencies -- this file is for testing
import { isConformant as isConformantBase, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant(testInfo: IsConformantOptions) {
  const defaultOptions = {
    disabledTests: ['has-docblock'],
  };

  isConformantBase(defaultOptions, testInfo);
}
