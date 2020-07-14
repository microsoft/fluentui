import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
import * as _ from 'lodash';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const defaultOptions = {
    disabledTests: ['has-docblock', 'kebab-aria-attributes'],
    wrapperComponents: [Ref, RefFindNode],
  };

  isConformant(defaultOptions, testInfo);
}
