import { COMPONENT_HAS_GROUP_MARKER_TEST_NAME, isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    // v8 components stamp no Tailwind named-group marker, so they opt out of
    // `component-has-group-marker` (a default test since DECISIONS.md D16.6).
    disabledTests: [
      COMPONENT_HAS_GROUP_MARKER_TEST_NAME,
      'kebab-aria-attributes',
      'component-has-static-classname-exported',
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
