import { __styles as vanillaStyles, ResolvedStylesBySlots } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './useRenderer';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function __styles<Slots extends string>(resolvedStyles: ResolvedStylesBySlots<Slots>) {
  const getStyles = vanillaStyles(resolvedStyles);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, document } = useFluent();
    const renderer = useRenderer(document);

    return getStyles({ dir, renderer });
  };
}
