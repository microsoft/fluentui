import { __styles as vanillaStyles, ResolvedClasses, ResolvedCSSRules } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './RendererContext';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function __styles<Slots extends string>(classnamesMapping: ResolvedClasses<Slots>, cssRules: ResolvedCSSRules) {
  const getStyles = vanillaStyles(classnamesMapping, cssRules);

  return function useClasses(): Record<Slots, string> {
    const { dir } = useFluent();
    const renderer = useRenderer();

    return getStyles({ dir, renderer });
  };
}
