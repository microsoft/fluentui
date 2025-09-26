import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTooltipV2_unstable } from './useTooltipV2';
import { renderTooltipV2_unstable } from './renderTooltipV2';
import { useTooltipV2Styles_unstable } from './useTooltipV2Styles.styles';
import type { TooltipV2Props } from './TooltipV2.types';

/**
 * TooltipV2 component - TODO: add more docs
 */
export const TooltipV2: ForwardRefComponent<TooltipV2Props> = React.forwardRef((props, ref) => {
  const state = useTooltipV2_unstable(props, ref);

  useTooltipV2Styles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useTooltipV2Styles_unstable')(state);

  return renderTooltipV2_unstable(state);
});

TooltipV2.displayName = 'TooltipV2';
