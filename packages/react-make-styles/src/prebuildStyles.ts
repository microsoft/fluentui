import { prebuildStyles as vanillaPrebuildStyles, ResolvedStylesBySlots } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './useRenderer';

export function prebuildStyles<Slots extends string>(resolvedStyles: ResolvedStylesBySlots<Slots>) {
  const getStyles = vanillaPrebuildStyles(resolvedStyles);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, document } = useFluent();
    const renderer = useRenderer(document);

    return getStyles({ dir, renderer });
  };
}
