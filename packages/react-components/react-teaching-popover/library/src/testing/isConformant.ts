import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // TeachingPopover and TeachingPopoverTrigger render no DOM element of their own, so they
    // opt out of `component-has-group-marker` individually alongside the other DOM-dependent
    // defaults they already disable; TeachingPopoverSurface and
    // TeachingPopoverCarouselFooterButton render ANOTHER component's root and therefore
    // declare a marker SET via `testOptions['has-group-marker'].markers` (DECISIONS.md D16.3).
  };

  baseIsConformant(defaultOptions, testInfo);
}
