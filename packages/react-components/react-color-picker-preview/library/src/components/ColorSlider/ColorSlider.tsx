import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorSlider_unstable } from './useColorSlider';
import { renderColorSlider_unstable } from './renderColorSlider';
import { useColorSliderStyles_unstable } from './useColorSliderStyles.styles';
import type { ColorSliderProps } from './ColorSlider.types';

/**
 * ColorSlider component - TODO: add more docs
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef((props, ref) => {
  const state = useColorSlider_unstable(props, ref);

  useColorSliderStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useColorSliderStyles_unstable')(state);

  return renderColorSlider_unstable(state);
});

ColorSlider.displayName = 'ColorSlider';
