import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package no longer publishes BEM statics and stamps a Tailwind named-group marker
    // on every root, so it now TAKES `component-has-group-marker` (a default test since
    // DECISIONS.md D16.6) instead of opting out, and drops the `hasStaticClassNames` opt-in
    // that stood in for it. `make-styles-overrides-win` is disabled per component, alongside
    // the `classname-overrides-win` replacement that supersedes it (D9).
    extraTests: griffelTests as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
