import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRangeSlider_unstable } from './useRangeSlider';
import { renderRangeSlider_unstable } from './renderRangeSlider';
import { useRangeSliderStyles_unstable } from './useRangeSliderStyles.styles';
import type { RangeSliderProps } from './RangeSlider.types';

/**
 * RangeSlider component - TODO: add more docs
 */
export const RangeSlider: ForwardRefComponent<RangeSliderProps> = React.forwardRef((props, ref) => {
  const state = useRangeSlider_unstable(props, ref);

  useRangeSliderStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useRangeSliderStyles_unstable')(state);

  return renderRangeSlider_unstable(state);
});

RangeSlider.displayName = 'RangeSlider';
