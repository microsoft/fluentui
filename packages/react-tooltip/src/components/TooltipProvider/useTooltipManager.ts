import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import { TooltipImperativeHandle } from '../Tooltip/Tooltip.types';

/**
 * The tooltip manager is responsible for managing the visibiltiy of the tooltips,
 * including ensuring that only one tooltip is visible at once, and handling the
 * delay to show or hide a tooltip.
 *
 * This imperative interface is used by TooltipTrigger to show and hide its tooltip
 * based on events on the trigger element.
 *
 * {@docCategory TooltipProvider}
 */
export interface TooltipManager {
  /**
   * Show the given tooltip.
   * Call this in response to a PointerEnter or Focus event on the trigger.
   *
   * @param args - {@see ShowTooltipArgs}
   */
  showTooltip: (args: ShowTooltipArgs) => void;

  /**
   * Hide the tooltip triggered by the given element.
   * Call this in response to a PointerLeave or Blur event on the trigger.
   *
   * @param trigger - The element that lost focus
   */
  hideTooltip: (trigger: HTMLElement) => void;

  /**
   * Unconditionally hide any tooltip that's currently visible, without a delay.
   */
  hideAll: () => void;

  /**
   * Notify the manager that the pointer is inside the tooltip.
   */
  onPointerEnterTooltip: () => void;

  /**
   * Notify the manager that the pointer left the tooltip.
   */
  onPointerLeaveTooltip: () => void;
}

/**
 * The arguments to TooltipManager.showTooltip
 *
 * {@docCategory TooltipProvider}
 */
export type ShowTooltipArgs = {
  /**
   * The tooltip to show.
   */
  tooltip: TooltipImperativeHandle;

  /**
   * The element that triggered the tooltip.
   */
  trigger: HTMLElement;

  /**
   * The element for the tooltip to point to. If not defined, the trigger element will be used as the target.
   */
  target?: HTMLElement | null;

  /**
   * Delay before the tooltip is shown, in milliseconds
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds
   *
   * @defaultvalue 250
   */
  hideDelay?: number;
};

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
  const { targetDocument } = useFluent();
  React.useEffect(() => {
    if (targetDocument) {
      const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape' || ev.key === 'Esc') {
          tooltipManager.hideAll();
        }
      };

      targetDocument.addEventListener('keydown', onKeyDown);
      return () => targetDocument.removeEventListener('keydown', onKeyDown);
    }
  }, [targetDocument, tooltipManager]);

  return tooltipManager;
};
