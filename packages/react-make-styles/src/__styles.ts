import { __styles as vanillaStyles } from '@griffel/core';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './RendererContext';
import type { CSSClassesMapBySlot, CSSRulesByBucket } from '@griffel/core';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function __styles<Slots extends string>(
  classesMapBySlot: CSSClassesMapBySlot<Slots>,
  cssRules: CSSRulesByBucket,
) {
  const getStyles = vanillaStyles(classesMapBySlot, cssRules);

  return function useClasses(): Record<Slots, string> {
    const { dir } = useFluent();
    const renderer = useRenderer();

    return getStyles({ dir, renderer });
  };
}
