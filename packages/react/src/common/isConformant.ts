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
      // v8 has a different prefix, and there's a setting for that now,
      // but a lot of components don't set a consistent/expected classname
      'component-has-static-classname',
      // v8 doesn't export classnames
      'component-has-static-classname-exported',
      // Will enable with appropriate overrides separately
      'consistent-callback-names',
      'consistent-callback-args',
      'component-has-static-classnames-object',
    ],
    componentPath: require.main?.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
