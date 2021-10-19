import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import makeStylesTests from '@fluentui/react-conformance-make-styles';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    asPropHandlesRef: true,
    componentPath: module!.parent!.filename.replace('.test', ''),
    extraTests: makeStylesTests as TestObject<TProps>,
    testOptions: {
      'make-styles-overrides-win': {
        callCount: 2,
      },
      // TODO: https://github.com/microsoft/fluentui/issues/19618
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  };

  baseIsConformant(defaultOptions, testInfo);
}
