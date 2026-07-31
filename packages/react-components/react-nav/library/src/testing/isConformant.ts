import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    //
    // This package is converted, so the two opt-outs this wrapper used to carry are gone:
    //   • `component-has-group-marker` is no longer disabled — every component here now
    //     stamps `group/fui-<kebab>` on its outermost slot (DECISIONS.md D15.1 / D16.2), and
    //     that test's `classList[0]` half guards a jsdom-only render-time throw that neither
    //     the build nor VR can see.
    //   • `hasStaticClassNames` is no longer opted in — the BEM statics were removed by the
    //     D16 sweep, and that test hard-codes the `fui-<Component>__<slot>` format.
    //
    // `griffelTests` stays: it is where `make-styles-overrides-win` lives, and the per-test
    // files disable that entry individually alongside
    // `component-has-static-classnames-object`, adding `classname-overrides-win` in its
    // place (DECISIONS.md D9 / D16.6).
  };

  baseIsConformant(defaultOptions, testInfo);
}
