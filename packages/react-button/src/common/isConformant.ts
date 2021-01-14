import * as path from 'path';
import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant(testInfo: Omit<IsConformantOptions, 'componentPath'>) {
  const componentPath = module!.parent!.filename.replace(/.test.tsx$/, '.tsx');
  const packagePath = path.resolve(path.parse(componentPath).dir, '../../..');

  const defaultOptions: Partial<IsConformantOptions> = {
    disabledTests: ['has-docblock', 'kebab-aria-attributes'],
    componentPath,
    packagePath,
  };

  baseIsConformant(defaultOptions, testInfo);
}
