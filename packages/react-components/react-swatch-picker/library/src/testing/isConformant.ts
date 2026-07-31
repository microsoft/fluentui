import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package is converted and every root stamps its Tailwind named-group marker, so it
    // TAKES `component-has-group-marker` from the default set (DECISIONS.md D16.6) rather
    // than opting out of it, and it no longer needs the `hasStaticClassNames` opt-in — the
    // BEM statics it used to publish are gone (D16.1 / D16.5).
  };

  baseIsConformant(defaultOptions, testInfo);
}
