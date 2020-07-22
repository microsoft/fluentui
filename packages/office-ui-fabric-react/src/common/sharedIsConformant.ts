import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { Ref } from '@fluentui/react-component-ref';
import * as _ from 'lodash';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const defaultOptions = {
    disabledTests: ['has-docblock'],
    helperComponents: [Ref],
  };

  isConformant(defaultOptions, testInfo);
}
