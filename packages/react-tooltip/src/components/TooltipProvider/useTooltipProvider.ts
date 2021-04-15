import * as React from 'react';
import { makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipProviderProps, TooltipProviderState } from './TooltipProvider.types';
import { useTooltipManager } from './useTooltipManager';
import { useFluent } from '@fluentui/react-shared-contexts';

const mergeProps = makeMergeProps<TooltipProviderState>();

/**
 * Create the state required to render TooltipProvider.
 *
 * The returned state can be modified with hooks such as useTooltipProviderStyles,
 * before being passed to renderTooltipProvider.
 *
 * @param props - props from this instance of TooltipProvider
 * @param ref - reference to root HTMLElement of TooltipProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory TooltipProvider}
 */
export const useTooltipProvider = (
  props: TooltipProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipProviderProps,
): TooltipProviderState => {
  const { document } = useFluent();

  // createElement is not deprecated, but eslint seems to think it is
  // eslint-disable-next-line deprecation/deprecation
  const [tooltipContainer, setTooltipContainer] = React.useState(document?.createElement('div'));

  // If the document ever changes, need to re-create the tooltip container element
  if (tooltipContainer?.ownerDocument !== document) {
    // eslint-disable-next-line deprecation/deprecation
    setTooltipContainer(document?.createElement('div'));
  }

  const state = mergeProps(
    {
      ref: useMergedRefs(ref),
      tooltipContainer,
      tooltipManager: useTooltipManager(),
    },
    defaultProps,
    props,
  );

  React.useLayoutEffect(() => {
    const root = state.ref.current;
    if (root && tooltipContainer) {
      root.appendChild(tooltipContainer);
      return () => {
        root.removeChild(tooltipContainer);
      };
    }
  }, [state.ref, tooltipContainer]);

  return state;
};
