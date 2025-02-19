import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorArea_unstable } from './useColorArea';
import { renderColorArea_unstable } from './renderColorArea';
import { useColorAreaStyles_unstable } from './useColorAreaStyles.styles';
import type { ColorAreaProps } from './ColorArea.types';

/**
 * ColorArea component
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef((props, ref) => {
  const state = useColorArea_unstable(props, ref);

  useColorAreaStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useColorAreaStyles_unstable')(state);

  return renderColorArea_unstable(state);
});

ColorArea.displayName = 'ColorArea';
