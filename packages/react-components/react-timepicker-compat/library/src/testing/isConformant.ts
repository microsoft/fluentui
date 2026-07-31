import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package no longer publishes BEM statics and stamps a Tailwind named-group marker
    // on its root, so it now TAKES `component-has-group-marker` (a default test since
    // DECISIONS.md D16.6) instead of opting out, and drops the `hasStaticClassNames` opt-in
    // that stood in for it.
    //
    // `griffelTests` stays: it is where `make-styles-overrides-win` lives, and TimePicker.test.tsx
    // disables that entry individually alongside `component-has-static-classnames-object`, adding
    // `classname-overrides-win` in its place (DECISIONS.md D9 / D16.6).
  };

  baseIsConformant(defaultOptions, testInfo);
}
