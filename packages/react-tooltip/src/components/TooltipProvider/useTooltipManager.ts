import * as React from 'react';
import { ShowTooltipArgs, TooltipManager, TooltipTriggerReason } from '@fluentui/react-tooltip-trigger';

const defaultShowDelay = 250;
const defaultHideDelay = 250;

const useTimeout = () => {
  type TimeoutState = {
    id: number | undefined;
    readonly set: (fn: () => void, delay: number) => void;
    readonly clear: () => void;
  };

  const state = React.useMemo<TimeoutState>(
    () => ({
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
    }),
    [],
  );

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => state.clear, [state.clear]);

  return [state.set, state.clear] as const;
};

export const useTooltipManager = () => {
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  return React.useMemo<TooltipManager>(() => {
    // Keep track of the trigger or tooltip that is either hovered or focused
    let hovered: { ele: HTMLElement; reason: TooltipTriggerReason } | undefined = undefined;

    // Keep track of the tooltip that is currently shown
    let visible: ShowTooltipArgs | undefined = undefined;
    const setVisibleTooltip = (args: ShowTooltipArgs | undefined) => {
      if (visible?.tooltip !== args?.tooltip) {
        visible?.tooltip.hide();
        visible = args;
        visible?.tooltip.show(visible.target ?? visible.trigger);
      }
    };

    const instance: TooltipManager = {
      showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => {
        if (hovered?.ele !== args.trigger) {
          hovered = { ele: args.trigger, reason };
        }

        const delay = visible ? 0 : args.showDelay ?? defaultShowDelay;

        setDelayTimeout(() => {
          if (hovered?.ele === args.trigger) {
            setVisibleTooltip(args);
          }
        }, delay);
      },

      hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => {
        if (hovered?.ele === trigger && hovered.reason === reason) {
          hovered = undefined;
        }

        if (visible) {
          setDelayTimeout(() => {
            if (hovered?.ele !== visible?.trigger && hovered?.ele !== visible?.tooltip.getRoot()) {
              setVisibleTooltip(undefined);
            }
          }, visible.hideDelay ?? defaultHideDelay);
        } else {
          clearDelayTimeout();
        }
      },

      hideAll: () => {
        clearDelayTimeout();
        setVisibleTooltip(undefined);
      },

      onPointerEnterTooltip: (tooltipRoot: HTMLElement) => {
        if (hovered?.reason !== 'focus') {
          hovered = { ele: tooltipRoot, reason: 'pointer' };
        }
      },

      onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => {
        instance.hideTooltip(tooltipRoot, 'pointer');
      },
    };

    return instance;
  }, [setDelayTimeout, clearDelayTimeout]);
};
