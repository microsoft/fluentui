import * as React from 'react';
import { makeMergeProps, useConst } from '@fluentui/react-utilities';
import { TooltipProviderProps, TooltipProviderState } from './TooltipProvider.types';
import { TooltipManager } from '../../TooltipManager';
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
  defaultProps?: TooltipProviderProps,
): TooltipProviderState => {
  const tooltipManagerRef = useConst(() => {
    let manager: TooltipManager | undefined = undefined;
    return {
      get current() {
        return manager;
      },
      set current(value) {
        if (manager !== value) {
          // Hide all tooltips from the previous manager when it is unloaded
          manager?.hideAll();
          manager = value;
        }
      },
    };
  });

  // Unload the tooltip manager when this component is unloaded
  React.useEffect(() => {
    return () => (tooltipManagerRef.current = undefined);
  }, [tooltipManagerRef]);

  // Hide all tooltips when the escape key is pressed
  const { targetDocument } = useFluent();
  React.useEffect(() => {
    if (targetDocument) {
      const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape' || ev.key === 'Esc') {
          tooltipManagerRef.current?.hideAll();
        }
      };

      targetDocument.addEventListener('keydown', onKeyDown);
      return () => targetDocument.removeEventListener('keydown', onKeyDown);
    }
  }, [targetDocument, tooltipManagerRef]);

  const state = mergeProps({ tooltipManagerRef }, defaultProps, props);

  return state;
};
