import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { mountWithProvider as mount } from 'test/utils';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
// import { FocusZone } from '@fluentui/react-bindings';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const { disabledTests = [], wrapperComponents = [] } = testInfo;

  isConformant({
    ...testInfo,
    customMount: mount,
    disabledTests: [...disabledTests.filter(test => test as string), 'has-docblock', 'has-top-level-file'],
    wrapperComponents: [...wrapperComponents, Ref, RefFindNode], //, FocusZone],
  });
}
