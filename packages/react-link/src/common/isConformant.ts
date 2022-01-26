import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    asPropHandlesRef: true,
    componentPath: module!.parent!.filename.replace('.test', ''),
    disabledTests: [`has-docblock`],
    extraTests: griffelTests as TestObject<TProps>,
    // TODO: To fix as part of https://github.com/microsoft/fluentui/issues/19522
    skipAsPropTests: true,
  };

  baseIsConformant(defaultOptions, testInfo);
}
