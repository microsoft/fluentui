import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const { disabledTests = [], wrapperComponents = [] } = testInfo;

  isConformant({
    ...testInfo,
    disabledTests: [...disabledTests.filter(test => test as string), 'has-docblock', 'kebab-aria-attributes'],
    wrapperComponents: [...wrapperComponents, Ref, RefFindNode],
  });
}
