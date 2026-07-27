import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

const CUSTOM_STYLE_HOOK_CALLED_TEST_NAME = 'component-calls-custom-style-hook';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    disabledTests: [
      'kebab-aria-attributes',
      'component-has-static-classname-exported',
      CUSTOM_STYLE_HOOK_CALLED_TEST_NAME,
    ],
    testOptions: {
      'component-has-static-classname': {
        prefix: 'ms-',
      },
    },
    componentPath: require.main?.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
