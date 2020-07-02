import { isConformant as newIsConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { mountWithProvider as mount } from 'test/utils';

export function isConformant(testInfo: IsConformantOptions) {
  const { disabledTests = [] } = testInfo;

  newIsConformant({
    ...testInfo,
    customMount: mount,
    disabledTests: [...disabledTests.filter(test => test as string), 'has-docblock', 'has-top-level-file'],
  });
}
