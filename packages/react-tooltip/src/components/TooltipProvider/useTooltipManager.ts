import * as React from 'react';
import { ShowTooltipArgs, TooltipManager, TooltipTriggerReason } from '@fluentui/react-tooltip-trigger';
import { useConst } from '@fluentui/react-utilities';

const defaultShowDelay = 250;
const defaultHideDelay = 250;

const useTimeout = () => {
  const state = useConst(() => ({
    id: undefined as number | undefined,
    setTimeout: (fn: () => void, delay: number) => {
      state.clearTimeout();
      state.id = window.setTimeout(fn, delay);
    },
    clearTimeout: () => {
      if (state.id !== undefined) {
        window.clearTimeout(state.id);
        state.id = undefined;
      }
    },
  }));

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => {
    return () => state.clearTimeout();
  }, [state]);

  return [state.setTimeout, state.clearTimeout] as const;
};

export const useTooltipManager = () => {
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  return React.useMemo<TooltipManager>(() => {
    // Keep track of the trigger or tooltip that is either hovered or focused
    let hovered: { trigger: HTMLElement; reason: TooltipTriggerReason } | undefined = undefined;

    // Keep track of the tooltip that is currently shown
    let visible: ShowTooltipArgs | undefined = undefined;

    const showWithDelay = (args: ShowTooltipArgs) => {
      if (visible?.trigger !== args.trigger) {
        // Show the new tooltip immediately if there is already one visible
        const showDelay = visible ? 0 : args.showDelay;

        setDelayTimeout(() => {
          if (hovered?.trigger === args.trigger) {
            hideAll();
            args.tooltip.show(args.target ?? args.trigger);
            visible = args;
          }
        }, showDelay ?? defaultShowDelay);
      } else {
        // The tooltip is already visible, cancel the hide timer if it was running
        clearDelayTimeout();
      }
    };

    const hideWithDelay = (reason: TooltipTriggerReason) => {
      if (visible) {
        // Hide the tooltip immediately if it was hidden by losing focus
        const hideDelay = reason === 'focus' ? 0 : visible.hideDelay;

        setDelayTimeout(() => {
          // Double check that the trigger or tooltip didn't get hovered in the meantime
          if (!hovered || hovered.trigger !== visible?.trigger) {
            hideAll();
          }
        }, hideDelay ?? defaultHideDelay);
      } else {
        // Cancel the show timer if it was running
        clearDelayTimeout();
      }
    };

    const hideAll = () => {
      clearDelayTimeout();
      visible?.tooltip.hide();
      visible = undefined;
    };

    return {
      showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => {
        hovered = { trigger: args.trigger, reason };
        showWithDelay(args);
      },

      hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => {
        if (hovered?.trigger === trigger && hovered.reason === reason) {
          hovered = undefined;
          hideWithDelay(reason);
        }
      },

      hideAll,

      onPointerEnterTooltip: () => {
        if (visible) {
          hovered = { trigger: visible.trigger, reason: 'pointer' };
        }
      },

      onPointerLeaveTooltip: () => {
        if (hovered?.trigger === visible?.trigger && hovered?.reason === 'pointer') {
          hovered = undefined;
          hideWithDelay('pointer');
        }
      },
    };
  }, [setDelayTimeout, clearDelayTimeout]);
};
