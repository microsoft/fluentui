import * as React from 'react';
import { ShowTooltipArgs, TooltipManager, TooltipTriggerReason } from '@fluentui/react-tooltip-trigger';

const useTimeout = () => {
  type TimeoutState = {
    id: number | undefined;
    set: (fn: () => void, delay: number) => void;
    clear: () => void;
  };

  const state = React.useRef<TimeoutState>({
    id: undefined,
    set: (fn: () => void, delay: number) => {
      state.clear();
      state.id = window.setTimeout(fn, delay);
    },
    clear: () => {
      if (state.id !== undefined) {
        window.clearTimeout(state.id);
        state.id = undefined;
      }
    },
  }).current;

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => state.clear, [state.clear]);

  return [state.set, state.clear] as const;
};

export const useTooltipManager = () => {
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  const instance: TooltipManager = React.useMemo<TooltipManager>(() => {
    let hovered: { ele: HTMLElement; reason: TooltipTriggerReason } | undefined = undefined;

    let shownTooltip: ShowTooltipArgs | undefined = undefined;
    const setShownTooltip = (visibleTooltip: ShowTooltipArgs | undefined) => {
      if (shownTooltip?.tooltip !== visibleTooltip?.tooltip) {
        shownTooltip?.tooltip.hide();
        shownTooltip = visibleTooltip;
        shownTooltip?.tooltip.show(shownTooltip.target);
      }
    };

    const manager: TooltipManager = {
      showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => {
        if (hovered?.ele !== args.trigger) {
          hovered = { ele: args.trigger, reason };
        }

        const delay = shownTooltip ? 0 : args.showDelay;

        setDelayTimeout(() => {
          if (hovered?.ele === args.trigger) {
            setShownTooltip(args);
          }
        }, delay);
      },

      hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => {
        if (hovered?.ele === trigger && hovered.reason === reason) {
          hovered = undefined;
        }

        if (shownTooltip) {
          setDelayTimeout(() => {
            if (hovered?.ele !== shownTooltip?.trigger && hovered?.ele !== shownTooltip?.tooltip.getRoot()) {
              setShownTooltip(undefined);
            }
          }, shownTooltip.hideDelay);
        } else {
          clearDelayTimeout();
        }
      },

      hideAll: () => {
        clearDelayTimeout();
        setShownTooltip(undefined);
      },

      onPointerEnterTooltip: (tooltipRoot: HTMLElement) => {
        if (hovered?.reason !== 'focus') {
          hovered = { ele: tooltipRoot, reason: 'pointer' };
        }
      },

      onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => {
        manager.hideTooltip(tooltipRoot, 'pointer');
      },
    };

    return manager;
  }, [setDelayTimeout, clearDelayTimeout]);

  return instance;
};
