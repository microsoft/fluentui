import { TooltipManager, TriggerTooltipArgs } from '@fluentui/react-shared-contexts';

/**
 * Create an instance of TooltipManager
 */
export const createTooltipManager: () => TooltipManager = () => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  const setTooltipTimeout = (fn: () => void, delay: number) => {
    clearTooltipTimeout();
    timeoutId = setTimeout(fn, delay);
  };

  const clearTooltipTimeout = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  // The trigger element that is either hovered or focused
  let activeTrigger: HTMLElement | undefined = undefined;

  // The args for the tooltip that is currently visible
  let visible: TriggerTooltipArgs | undefined = undefined;

  const notifyEnterTrigger = (args: TriggerTooltipArgs) => {
    activeTrigger = args.trigger;

    if (visible?.trigger === args.trigger) {
      // The tooltip is already visible; cancel the hide timer if it was running
      clearTooltipTimeout();
    } else {
      // Show the new tooltip immediately if there is already one visible
      const showDelay = visible ? 0 : args.showDelay;

      setTooltipTimeout(() => {
        // Double check that the trigger is still being hovered
        if (activeTrigger === args.trigger) {
          hideAll();
          args.setVisible(true);
          visible = args;
        }
      }, showDelay);
    }
  };

  const notifyLeaveTrigger = (trigger: HTMLElement) => {
    // Ignore if this is coming from an element that's not the trigger
    if (activeTrigger !== trigger) {
      return;
    }

    activeTrigger = undefined;
    if (!visible) {
      // The tooltip is already hidden; cancel the show timer if it was running
      clearTooltipTimeout();
    } else {
      setTooltipTimeout(() => {
        // Double check that the trigger or tooltip didn't get hovered in the meantime
        if (!activeTrigger || activeTrigger !== visible?.trigger) {
          hideAll();
        }
      }, visible.hideDelay);
    }
  };

  const notifyEnterTooltip = () => {
    // Treat hovering over the tooltip the same as hovering over the tooltip's trigger element
    if (visible) {
      activeTrigger = visible.trigger;
    }
  };

  const notifyLeaveTooltip = () => {
    if (visible) {
      notifyLeaveTrigger(visible.trigger);
    }
  };

  const hideAll = () => {
    clearTooltipTimeout();
    visible?.setVisible(false);
    visible = undefined;
  };

  return {
    notifyEnterTrigger,
    notifyLeaveTrigger,
    notifyEnterTooltip,
    notifyLeaveTooltip,
    hideAll,
  };
};
