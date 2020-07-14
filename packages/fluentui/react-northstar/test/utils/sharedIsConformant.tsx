import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { mountWithProvider } from 'test/utils';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
import { FocusZone } from '@fluentui/react-bindings';
import * as _ from 'lodash';

export function sharedIsConformant(testInfo: IsConformantOptions) {
  const { componentPath } = testInfo;
  const defaultConfig = {
    customMount: mountWithProvider,
    componentPath: componentPath.replace(/test[/\\]specs/, 'src').replace('-test.tsx', '.tsx'),
    disabledTests: ['has-docblock', 'has-top-level-file'],
    wrapperComponents: [Ref, RefFindNode, FocusZone],
  };

  isConformant(defaultConfig, testInfo);
}
