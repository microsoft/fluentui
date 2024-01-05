import * as React from 'react';
import {
  getActiveElement,
  getEventTarget,
  elementContains,
  getNativeProps,
  divProperties,
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  focusAsync,
  getPropsWithDefaults,
  modalize,
  on,
  useHasMergeStylesShadowRootContext,
} from '../../Utilities';
import { useId, useConst, useMergedRefs, useEventCallback, usePrevious, useUnmount } from '@fluentui/react-hooks';
import { useDocument } from '../../WindowProvider';
import type { IRefObject } from '../../Utilities';
import type { IFocusTrapZoneProps, IFocusTrapZone } from './FocusTrapZone.types';
import { useWindowEx } from '../../utilities/dom';

interface IFocusTrapZoneInternalState {
  previouslyFocusedElementInTrapZone?: HTMLElement;
  hasFocus: boolean;
  /** ID tracked in focusStack. Don't respect prop updates in case the ID changes while the FTZ is active. */
  focusStackId: string;
}

const COMPONENT_NAME = 'FocusTrapZone';

const DEFAULT_PROPS = {
  disabled: false,
  disableFirstFocus: false,
  forceFocusInsideTrap: true,
  isClickableOutsideFocusTrap: false,
  // Hardcoding completely uncontrolled flag for proper interop with FluentUI V9.
  'data-tabster': '{"uncontrolled": {"completely": true}}',
};

const useComponentRef = (
  componentRef: IRefObject<IFocusTrapZone> | undefined,
  previouslyFocusedElement: HTMLElement | undefined,
  focusFTZ: () => void,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      get previouslyFocusedElement() {
        return previouslyFocusedElement;
      },
      focus: focusFTZ,
    }),
    [focusFTZ, previouslyFocusedElement],
  );
};

export const FocusTrapZone: React.FunctionComponent<IFocusTrapZoneProps> & {
  /**
   * Stack of active FocusTrapZone identifiers, exposed for testing purposes only.
   * (This is always set, just marked as optional to avoid a cast in the component definition.)
   * @internal
   */
  focusStack?: string[];
} = React.forwardRef<HTMLDivElement, IFocusTrapZoneProps>((propsWithoutDefaults, ref) => {
  const root = React.useRef<HTMLDivElement>(null);
  const firstBumper = React.useRef<HTMLDivElement>(null);
  const lastBumper = React.useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRefs(root, ref) as React.Ref<HTMLDivElement>;
  const doc = useDocument();
  const win = useWindowEx()!;
  const inShadow = useHasMergeStylesShadowRootContext();

  const isFirstRender = usePrevious(false) ?? true;

  const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

  const internalState = useConst<IFocusTrapZoneInternalState>({
    hasFocus: false,
    focusStackId: useId('ftz-', props.id),
  });

  const {
    children,
    componentRef,
    disabled,
    disableFirstFocus,
    forceFocusInsideTrap,
    focusPreviouslyFocusedInnerElement,
    // eslint-disable-next-line deprecation/deprecation
    firstFocusableSelector,
    firstFocusableTarget,
    // eslint-disable-next-line deprecation/deprecation
    disableRestoreFocus = props.ignoreExternalFocusing,
    isClickableOutsideFocusTrap,
    enableAriaHiddenSiblings,
  } = props;

  const bumperProps = {
    'aria-hidden': true,
    style: {
      pointerEvents: 'none',
      position: 'fixed', // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
    },
    tabIndex: disabled ? -1 : 0, // make bumpers tabbable only when enabled
    'data-is-visible': true,
    'data-is-focus-trap-zone-bumper': true,
  } as React.HTMLAttributes<HTMLDivElement>;

  const focusElementAsync = React.useCallback((element: HTMLElement) => {
    if (element !== firstBumper.current && element !== lastBumper.current) {
      focusAsync(element);
    }
  }, []);

  /**
   * Callback to force focus into FTZ (named to avoid overlap with global focus() callback).
   * useEventCallback always returns the same callback reference but updates the implementation
   * every render to avoid stale captured values.
   */
  const focusFTZ = useEventCallback(() => {
    if (!root.current) {
      return; // not done mounting
    }

    const { previouslyFocusedElementInTrapZone } = internalState;
    if (
      focusPreviouslyFocusedInnerElement &&
      previouslyFocusedElementInTrapZone &&
      elementContains(root.current, previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      focusElementAsync(previouslyFocusedElementInTrapZone);
      return;
    }

    let firstFocusableChild: HTMLElement | null = null;

    if (typeof firstFocusableTarget === 'string') {
      firstFocusableChild = root.current.querySelector(firstFocusableTarget);
    } else if (firstFocusableTarget) {
      firstFocusableChild = firstFocusableTarget(root.current);
    } else if (firstFocusableSelector) {
      const focusSelector =
        typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector();
      firstFocusableChild = root.current.querySelector('.' + focusSelector);
    }

    // Fall back to first element if query selector did not match any elements.
    if (!firstFocusableChild) {
      firstFocusableChild = getNextElement(
        root.current,
        root.current.firstChild as HTMLElement,
        false,
        false,
        false,
        true,
        undefined,
        undefined,
        undefined,
        inShadow,
      );
    }

    if (firstFocusableChild) {
      focusElementAsync(firstFocusableChild);
    }
  });

  /** Used in root div focus/blur handlers */
  const focusBumper = (isFirstBumper: boolean) => {
    if (disabled || !root.current) {
      return;
    }

    const nextFocusable =
      isFirstBumper === internalState.hasFocus
        ? getLastTabbable(root.current, lastBumper.current!, true, false, inShadow)
        : getFirstTabbable(root.current, firstBumper.current!, true, false, inShadow);

    if (nextFocusable) {
      if (nextFocusable === firstBumper.current || nextFocusable === lastBumper.current) {
        // This can happen when FTZ contains no tabbable elements.
        // focusFTZ() will take care of finding a focusable element in FTZ.
        focusFTZ();
      } else {
        nextFocusable.focus();
      }
    }
  };

  /** Root div blur handler (doesn't need useCallback since it's for a native element) */
  const onRootBlurCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    props.onBlurCapture?.(ev);
    let relatedTarget = ev.relatedTarget;
    if (ev.relatedTarget === null) {
      // In IE11, due to lack of support, event.relatedTarget is always
      // null making every onBlur call to be "outside" of the root
      // even when it's not. Using document.activeElement is another way
      // for us to be able to get what the relatedTarget without relying
      // on the event
      relatedTarget = getActiveElement(doc!) as Element;
    }
    if (!elementContains(root.current, relatedTarget as HTMLElement)) {
      internalState.hasFocus = false;
    }
  };

  /** Root div focus handler (doesn't need useCallback since it's for a native element) */
  const onRootFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    props.onFocusCapture?.(ev);

    if (ev.target === firstBumper.current) {
      focusBumper(true);
    } else if (ev.target === lastBumper.current) {
      focusBumper(false);
    }

    internalState.hasFocus = true;

    if (ev.target !== ev.currentTarget && !(ev.target === firstBumper.current || ev.target === lastBumper.current)) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      internalState.previouslyFocusedElementInTrapZone = getEventTarget(ev.nativeEvent) as HTMLElement;
    }
  };

  /** Called to restore focus on unmount or props change. (useEventCallback ensures latest prop values are used.) */
  const returnFocusToInitiator = useEventCallback((elementToFocusOnDismiss: HTMLElement | null) => {
    FocusTrapZone.focusStack = FocusTrapZone.focusStack!.filter(value => internalState.focusStackId !== value);

    if (!doc) {
      return;
    }

    // Do not use getActiveElement() here.
    // When the FTZ is in shadow DOM focus returns to the
    // shadow host rather than body so we need to be
    // able to inspect that
    const activeElement = doc.activeElement as HTMLElement;
    if (
      !disableRestoreFocus &&
      typeof elementToFocusOnDismiss?.focus === 'function' &&
      // only restore focus if the current focused element is within the FTZ, or if nothing is focused
      (elementContains(root.current, activeElement) || activeElement === doc.body || activeElement.shadowRoot)
    ) {
      focusElementAsync(elementToFocusOnDismiss);
    }
  });

  /** Called in window event handlers. (useEventCallback ensures latest prop values are used.) */
  const forceFocusOrClickInTrap = useEventCallback((ev: FocusEvent | MouseEvent): void => {
    // be sure to use the latest values here
    if (disabled) {
      return;
    }
    if (internalState.focusStackId === FocusTrapZone.focusStack!.slice(-1)[0]) {
      const targetElement = getEventTarget(ev);
      if (targetElement && !elementContains(root.current, targetElement)) {
        if (doc && getActiveElement(doc) === doc.body) {
          setTimeout(() => {
            if (doc && getActiveElement(doc) === doc.body) {
              focusFTZ();
              internalState.hasFocus = true; // set focus here since we stop event propagation
            }
          }, 0);
        } else {
          focusFTZ();
          internalState.hasFocus = true; // set focus here since we stop event propagation
        }
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  });

  // Update window event handlers when relevant props change
  React.useEffect(() => {
    const disposables: Array<() => void> = [];

    if (forceFocusInsideTrap) {
      disposables.push(on(win, 'focus', forceFocusOrClickInTrap, true));
    }
    if (!isClickableOutsideFocusTrap) {
      disposables.push(on(win, 'click', forceFocusOrClickInTrap, true));
    }

    return () => {
      disposables.forEach(dispose => dispose());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run when these two props change
  }, [forceFocusInsideTrap, isClickableOutsideFocusTrap, win]);

  // On prop change or first render, focus the FTZ and update focusStack if appropriate
  React.useEffect(() => {
    // Do nothing if disabled, or if it's a re-render and forceFocusInsideTrap is false
    // (to match existing behavior, the FTZ handles first focus even if forceFocusInsideTrap
    // is false, though it's debatable whether it should do this)
    if (disabled || (!isFirstRender && !forceFocusInsideTrap) || !root.current) {
      return;
    }

    // Transition from forceFocusInsideTrap / FTZ disabled to enabled (or initial mount)
    FocusTrapZone.focusStack!.push(internalState.focusStackId);

    const elementToFocusOnDismiss = props.elementToFocusOnDismiss || (getActiveElement(doc!) as HTMLElement | null);

    if (!disableFirstFocus && !elementContains(root.current, elementToFocusOnDismiss)) {
      focusFTZ();
    }

    // To match existing behavior, always return focus on cleanup (even if we didn't handle
    // initial focus), but it's debatable whether that's correct
    return () => returnFocusToInitiator(elementToFocusOnDismiss);

    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run when these two props change
  }, [forceFocusInsideTrap, disabled]);

  // Handle modalization separately from first focus
  React.useEffect(() => {
    if (!disabled && enableAriaHiddenSiblings) {
      const unmodalize = modalize(root.current!);
      return unmodalize;
    }
  }, [disabled, enableAriaHiddenSiblings, root]);

  // Cleanup lifecyle method for internalState.
  useUnmount(() => {
    // Dispose of element references so the DOM Nodes can be garbage-collected
    delete internalState.previouslyFocusedElementInTrapZone;
  });

  useComponentRef(componentRef, internalState.previouslyFocusedElementInTrapZone, focusFTZ);

  return (
    <div
      // this is above the native props spread so props['aria-labelledby'] will override it if provided
      aria-labelledby={props.ariaLabelledBy}
      // native props include onFocus, onBlur, className
      {...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties)}
      ref={mergedRootRef}
      onFocusCapture={onRootFocusCapture}
      onBlurCapture={onRootBlurCapture}
    >
      <div {...bumperProps} ref={firstBumper} />
      {children}
      <div {...bumperProps} ref={lastBumper} />
    </div>
  );
});

FocusTrapZone.displayName = COMPONENT_NAME;
FocusTrapZone.focusStack = [];
