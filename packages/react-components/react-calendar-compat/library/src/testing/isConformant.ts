import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // The package-wide opt-out of `component-has-group-marker` (DECISIONS.md D16.6) is gone:
    // every component here now stamps its own `group/fui-…` marker and takes the default
    // test, and `hasStaticClassNames` goes with the BEM statics it asserted (D16.1) — the
    // per-component `disabledTests` entries for `component-has-static-classnames-object`
    // predate the migration and are kept where they already were.
    //
    // `griffelTests` stays registered (react-divider's shape): removing it would silently
    // turn each component's `make-styles-overrides-win` entry in `disabledTests` into a
    // no-op name, and the entry is what documents that the contract moved to
    // `classname-overrides-win`.
  };

  baseIsConformant(defaultOptions, testInfo);
}
