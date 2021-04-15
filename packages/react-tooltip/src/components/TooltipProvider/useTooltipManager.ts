import * as React from 'react';
import { ShowTooltipArgs, TooltipManager } from '@fluentui/react-tooltip-trigger';
import { useFluent } from '@fluentui/react-shared-contexts';

const defaultShowDelay = 250;
const defaultHideDelay = 250;

const useTimeout = () => {
  const [state] = React.useState(() => ({
    id: undefined as ReturnType<typeof setTimeout> | undefined,
    set: (fn: () => void, delay: number) => {
      state.clear();
      state.id = setTimeout(fn, delay);
    },
    clear: () => {
      if (state.id !== undefined) {
        clearTimeout(state.id);
        state.id = undefined;
      }
    },
  }));

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => state.clear, [state]);

  return [state.set, state.clear] as const;
};

export const useTooltipManager = () => {
  const [setTooltipTimeout, clearTooltipTimeout] = useTimeout();

  const tooltipManager = React.useMemo<TooltipManager>(() => {
    // Keep track of the trigger element that is either hovered or focused
    let hovered: HTMLElement | undefined = undefined;

    // Keep track of the tooltip that is currently visible
    let visible: ShowTooltipArgs | undefined = undefined;

    const showTooltip = (args: ShowTooltipArgs) => {
      hovered = args.trigger;

      if (visible?.trigger === args.trigger) {
        // The tooltip is already visible; cancel the hide timer if it was running
        clearTooltipTimeout();
      } else {
        // Show the new tooltip immediately if there is already one visible
        const showDelay = visible ? 0 : args.showDelay;

        setTooltipTimeout(() => {
          // Double check that the trigger is still being hovered
          if (hovered === args.trigger) {
            hideAll();
            args.tooltip.show(args.target ?? args.trigger);
            visible = args;
          }
        }, showDelay ?? defaultShowDelay);
      }
    };

    const hideTooltip = (trigger: HTMLElement) => {
      // Ignore if this is coming from an element that's not the trigger
      if (hovered !== trigger) {
        return;
      }

      hovered = undefined;
      if (!visible) {
        // The tooltip is already hidden; cancel the show timer if it was running
        clearTooltipTimeout();
      } else {
        setTooltipTimeout(() => {
          // Double check that the trigger or tooltip didn't get hovered in the meantime
          if (!hovered || hovered !== visible?.trigger) {
            hideAll();
          }
        }, visible.hideDelay ?? defaultHideDelay);
      }
    };

    const hideAll = () => {
      clearTooltipTimeout();
      visible?.tooltip.hide();
      visible = undefined;
    };

    const onPointerEnterTooltip = () => {
      // Treat hovering over the tooltip the same as hovering over the tooltip's trigger element
      if (visible) {
        hovered = visible.trigger;
      }
    };

    const onPointerLeaveTooltip = () => {
      if (visible) {
        hideTooltip(visible.trigger);
      }
    };

    return { showTooltip, hideTooltip, hideAll, onPointerEnterTooltip, onPointerLeaveTooltip };
  }, [setTooltipTimeout, clearTooltipTimeout]);

  // Listen for the escape key on the document
  const { document } = useFluent();
  React.useEffect(() => {
    if (document) {
      const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape' || ev.key === 'Esc') {
          tooltipManager.hideAll();
        }
      };

      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
  }, [document, tooltipManager]);

  return tooltipManager;
};
