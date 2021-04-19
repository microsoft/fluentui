import { __styles as vanilla__styles, ResolvedStylesBySlots } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './useRenderer';

export function __styles<Slots extends string>(resolvedStyles: ResolvedStylesBySlots<Slots>) {
  const getStyles = vanilla__styles(resolvedStyles);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, document } = useFluent();
    const renderer = useRenderer(document);

    return getStyles({ dir, renderer });
  };
}
