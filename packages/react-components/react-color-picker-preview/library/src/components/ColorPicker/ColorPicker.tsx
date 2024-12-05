import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorPicker_unstable } from './useColorPicker';
import { renderColorPicker_unstable } from './renderColorPicker';
import { useColorPickerStyles_unstable } from './useColorPickerStyles.styles';
import type { ColorPickerProps } from './ColorPicker.types';
import { useColorPickerContextValues } from '../../contexts/colorPicker';

/**
 * ColorPicker component
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  const state = useColorPicker_unstable(props, ref);
  const contextValues = useColorPickerContextValues(state);

  useColorPickerStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useColorPickerStyles_unstable')(state);

  return renderColorPicker_unstable(state, contextValues);
});

ColorPicker.displayName = 'ColorPicker';
