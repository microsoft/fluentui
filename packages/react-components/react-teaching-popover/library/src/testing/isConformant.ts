import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // The package-wide opt-out of `component-has-group-marker` (DECISIONS.md D16.6) is gone,
    // and `hasStaticClassNames` goes with the BEM statics it asserted (D16.1): every component
    // in this package that renders a DOM element now stamps its own `group/fui-*` marker and
    // takes the default test. TeachingPopover and TeachingPopoverTrigger render no element of
    // their own, so they opt out individually alongside the other DOM-dependent defaults they
    // already disable; TeachingPopoverSurface and TeachingPopoverCarouselFooterButton render
    // ANOTHER component's root and therefore declare a marker SET via
    // `testOptions['has-group-marker'].markers` (D16.3).
    //
    // `griffelTests` stays registered (react-divider's shape): removing it would silently turn
    // each component's `make-styles-overrides-win` entry in `disabledTests` into a no-op name,
    // and the entry is what documents that the contract moved to `classname-overrides-win`.
  };

  baseIsConformant(defaultOptions, testInfo);
}
