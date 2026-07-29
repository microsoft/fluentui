import {
  COMPONENT_HAS_GROUP_MARKER_TEST_NAME,
  HAS_STATIC_CLASSNAMES_TEST_NAME,
  hasStaticClassNames,
  isConformant as baseIsConformant,
} from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // This package still publishes BEM statics and stamps no Tailwind named-group marker,
    // so it opts out of `component-has-group-marker` (a default test since DECISIONS.md
    // D16.6) and takes `hasStaticClassNames` — the test that moved out of the default set
    // to make room for it — explicitly, so its coverage is preserved.
    disabledTests: [COMPONENT_HAS_GROUP_MARKER_TEST_NAME],
    extraTests: {
      ...griffelTests,
      [HAS_STATIC_CLASSNAMES_TEST_NAME]: hasStaticClassNames,
    } as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
