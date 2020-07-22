import { isConformant, IsConformantOptions } from '@fluentui/react-conformance';
import { mountWithProvider } from 'test/utils';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
import { FocusZone } from '@fluentui/react-bindings';

export function sharedIsConformant(testInfo: IsConformantOptions, testFilePath: string) {
  const defaultConfig = {
    customMount: mountWithProvider,
    componentPath: testFilePath.replace(/test[/\\]specs/, 'src').replace('-test.tsx', '.tsx'),
    disabledTests: ['has-docblock', 'has-top-level-file'],
    helperComponents: [Ref, RefFindNode, FocusZone],
  };

  isConformant(defaultConfig, testInfo);
}
