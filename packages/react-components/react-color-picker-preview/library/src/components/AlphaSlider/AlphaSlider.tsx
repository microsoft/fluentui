import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAlphaSlider_unstable } from './useAlphaSlider';
import { renderAlphaSlider_unstable } from './renderAlphaSlider';
import { useAlphaSliderStyles_unstable } from './useAlphaSliderStyles.styles';
import type { AlphaSliderProps } from './AlphaSlider.types';

/**
 * AlphaSlider component - TODO: add more docs
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef((props, ref) => {
  const state = useAlphaSlider_unstable(props, ref);

  useAlphaSliderStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useAlphaSliderStyles_unstable')(state);

  return renderAlphaSlider_unstable(state);
});

AlphaSlider.displayName = 'AlphaSlider';
