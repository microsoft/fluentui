import * as React from 'react';
import {
  elementContains,
  getNativeProps,
  divProperties,
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  focusAsync,
  modalize,
  on,
} from '../../Utilities';
import { useId, useConst, useMergedRefs, useUnmount } from '@fluentui/react-hooks';
import { useDocument } from '../../WindowProvider';
import type { IRefObject } from '../../Utilities';
import type { IFocusTrapZoneProps, IFocusTrapZone } from './FocusTrapZone.types';

interface IFocusTrapZoneInternalState {
  disposeFocusHandler: (() => void) | undefined;
  disposeClickHandler: (() => void) | undefined;
  previouslyFocusedElementOutsideTrapZone: HTMLElement | undefined;
  previouslyFocusedElementInTrapZone: HTMLElement | undefined;
  hasFocus: boolean;
  unmodalize: (() => void) | undefined;
}

const COMPONENT_NAME = 'FocusTrapZone';

const useComponentRef = (
  componentRef: IRefObject<IFocusTrapZone> | undefined,
  previouslyFocusedElement: HTMLElement | undefined,
  focus: () => void,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      get previouslyFocusedElement() {
        return previouslyFocusedElement;
      },
      focus,
    }),
    [previouslyFocusedElement, focus],
  );
};

export const FocusTrapZone: React.FunctionComponent<IFocusTrapZoneProps> & {
  focusStack: string[];
} = React.forwardRef<HTMLElement, IFocusTrapZoneProps>((props, ref) => {
  const root = React.useRef<HTMLDivElement>(null);
  const firstBumper = React.useRef<HTMLDivElement>(null);
  const lastBumper = React.useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRefs(root, ref) as React.Ref<HTMLDivElement>;
  const id = useId(undefined, props.id);
  const doc = useDocument();
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

  const internalState = useConst<IFocusTrapZoneInternalState>(() => ({
    previouslyFocusedElementOutsideTrapZone: undefined,
    previouslyFocusedElementInTrapZone: undefined,
    disposeFocusHandler: undefined,
    disposeClickHandler: undefined,
    hasFocus: false,
    unmodalize: undefined,
  }));

  const {
    ariaLabelledBy,
    className,
    children,
    componentRef,
    disabled,
    disableFirstFocus = false,
    disabled: currentDisabledValue = false,
    elementToFocusOnDismiss,
    forceFocusInsideTrap = true,
    focusPreviouslyFocusedInnerElement,
    // eslint-disable-next-line deprecation/deprecation
    firstFocusableSelector,
    firstFocusableTarget,
    ignoreExternalFocusing,
    isClickableOutsideFocusTrap = false,
    onFocus,
    onBlur,
    onFocusCapture,
    onBlurCapture,
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

  const focus = React.useCallback(() => {
    if (
      focusPreviouslyFocusedInnerElement &&
      internalState.previouslyFocusedElementInTrapZone &&
      elementContains(root.current, internalState.previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      focusAsync(internalState.previouslyFocusedElementInTrapZone);
      return;
    }

    const focusSelector =
      typeof firstFocusableSelector === 'string'
        ? firstFocusableSelector
        : firstFocusableSelector && firstFocusableSelector();

    let firstFocusableChild: HTMLElement | null = null;

    if (root.current) {
      if (typeof firstFocusableTarget === 'string') {
        firstFocusableChild = root.current.querySelector(firstFocusableTarget);
      } else if (firstFocusableTarget) {
        firstFocusableChild = firstFocusableTarget(root.current);
      } else if (focusSelector) {
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
        );
      }
    }
    if (firstFocusableChild) {
      focusAsync(firstFocusableChild);
    }
  }, [firstFocusableSelector, firstFocusableTarget, focusPreviouslyFocusedInnerElement, internalState]);

  const onBumperFocus = React.useCallback(
    (isFirstBumper: boolean) => {
      if (disabled) {
        return;
      }

      const currentBumper = (isFirstBumper === internalState.hasFocus
        ? lastBumper.current
        : firstBumper.current) as HTMLElement;

      if (root.current) {
        const nextFocusable =
          isFirstBumper === internalState.hasFocus
            ? getLastTabbable(root.current, currentBumper, true, false)
            : getFirstTabbable(root.current, currentBumper, true, false);

        if (nextFocusable) {
          if (nextFocusable === firstBumper.current || nextFocusable === lastBumper.current) {
            // This can happen when FTZ contains no tabbable elements.
            // focus will take care of finding a focusable element in FTZ.
            focus();
          } else {
            nextFocusable.focus();
          }
        }
      }
    },
    [disabled, focus, internalState],
  );

  const onRootBlurCapture = React.useCallback(
    (ev: React.FocusEvent<HTMLDivElement>) => {
      onBlurCapture?.(ev);
      let relatedTarget = ev.relatedTarget;
      if (ev.relatedTarget === null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the root
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = doc!.activeElement as Element;
      }
      if (!elementContains(root.current, relatedTarget as HTMLElement)) {
        internalState.hasFocus = false;
      }
    },
    [doc, internalState, onBlurCapture],
  );

  const onRootFocusCapture = React.useCallback(
    (ev: React.FocusEvent<HTMLDivElement>) => {
      onFocusCapture?.(ev);

      if (ev.target === firstBumper.current) {
        onBumperFocus(true);
      } else if (ev.target === lastBumper.current) {
        onBumperFocus(false);
      }

      internalState.hasFocus = true;

      if (ev.target !== ev.currentTarget && !(ev.target === firstBumper.current || ev.target === lastBumper.current)) {
        // every time focus changes within the trap zone, remember the focused element so that
        // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
        internalState.previouslyFocusedElementInTrapZone = ev.target as HTMLElement;
      }
    },
    [onFocusCapture, internalState, onBumperFocus],
  );

  const returnFocusToInitiator = React.useCallback((): void => {
    FocusTrapZone.focusStack = FocusTrapZone.focusStack.filter((value: any) => {
      return id !== value;
    });

    if (doc) {
      const activeElement = doc.activeElement as HTMLElement;
      if (
        !ignoreExternalFocusing &&
        internalState.previouslyFocusedElementOutsideTrapZone &&
        typeof internalState.previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
        (elementContains(root.current, activeElement) || activeElement === doc.body)
      ) {
        if (
          !(
            internalState.previouslyFocusedElementOutsideTrapZone === firstBumper.current ||
            internalState.previouslyFocusedElementOutsideTrapZone === lastBumper.current
          )
        ) {
          focusAsync(internalState.previouslyFocusedElementOutsideTrapZone);
        }
      }
    }
  }, [doc, id, ignoreExternalFocusing, internalState]);

  const forceFocusInTrap = React.useCallback(
    (ev: FocusEvent): void => {
      if (disabled) {
        return;
      }
      if (FocusTrapZone.focusStack.length && id === FocusTrapZone.focusStack[FocusTrapZone.focusStack.length - 1]) {
        const focusedElement = ev.target as HTMLElement;
        if (!elementContains(root.current, focusedElement)) {
          focus();
          internalState.hasFocus = true; // set focus here since we stop event propagation
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    },
    [disabled, id, focus, internalState],
  );

  const forceClickInTrap = React.useCallback(
    (ev: MouseEvent): void => {
      if (disabled) {
        return;
      }
      if (FocusTrapZone.focusStack.length && id === FocusTrapZone.focusStack[FocusTrapZone.focusStack.length - 1]) {
        const clickedElement = ev.target as HTMLElement;
        if (clickedElement && !elementContains(root.current, clickedElement)) {
          focus();
          internalState.hasFocus = true; // set focus here since we stop event propagation
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    },
    [disabled, id, focus, internalState],
  );

  const updateEventHandlers = React.useCallback((): void => {
    if (forceFocusInsideTrap && !internalState.disposeFocusHandler) {
      internalState.disposeFocusHandler = on(window, 'focus', forceFocusInTrap, true);
    } else if (!forceFocusInsideTrap && internalState.disposeFocusHandler) {
      internalState.disposeFocusHandler();
      internalState.disposeFocusHandler = undefined;
    }

    if (!isClickableOutsideFocusTrap && !internalState.disposeClickHandler) {
      internalState.disposeClickHandler = on(window, 'click', forceClickInTrap, true);
    } else if (isClickableOutsideFocusTrap && internalState.disposeClickHandler) {
      internalState.disposeClickHandler();
      internalState.disposeClickHandler = undefined;
    }
  }, [forceClickInTrap, forceFocusInTrap, forceFocusInsideTrap, isClickableOutsideFocusTrap, internalState]);

  // Updates eventHandlers and cleans up focusStack when the component unmounts.
  React.useEffect(() => {
    const parentRoot = root.current;
    updateEventHandlers();
    return () => {
      // don't handle return focus unless forceFocusInsideTrap is true or focus is still within FocusTrapZone
      if (!disabled || forceFocusInsideTrap || !elementContains(parentRoot, doc?.activeElement as HTMLElement)) {
        returnFocusToInitiator();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Should only run on mount.
  }, [updateEventHandlers]);

  // Updates focusStack and the previouslyFocusedElementOutsideTrapZone on prop change.
  React.useEffect(() => {
    const newForceFocusInsideTrap = forceFocusInsideTrap !== undefined ? forceFocusInsideTrap : true;
    const newDisabled = disabled !== undefined ? disabled : false;

    // Transition from forceFocusInsideTrap / FTZ disabled to enabled.
    if (!newDisabled || newForceFocusInsideTrap) {
      if (currentDisabledValue) {
        return;
      }

      FocusTrapZone.focusStack.push(id);

      internalState.previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
        ? elementToFocusOnDismiss
        : (doc!.activeElement as HTMLElement);
      if (!disableFirstFocus && !elementContains(root.current, internalState.previouslyFocusedElementOutsideTrapZone)) {
        focus();
      }
      if (!internalState.unmodalize && root.current && enableAriaHiddenSiblings) {
        internalState.unmodalize = modalize(root.current);
      }
    } else if (!newForceFocusInsideTrap || newDisabled) {
      // Transition from forceFocusInsideTrap / FTZ enabled to disabled.
      returnFocusToInitiator();
      if (internalState.unmodalize) {
        internalState.unmodalize();
      }
    }

    if (elementToFocusOnDismiss && internalState.previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
      internalState.previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementToFocusOnDismiss, forceFocusInsideTrap, disabled]);

  // Cleanup lifecyle method for internalState.
  useUnmount(() => {
    // Dispose of event handlers so their closures can be garbage-collected
    if (internalState.disposeClickHandler) {
      internalState.disposeClickHandler();
      internalState.disposeClickHandler = undefined;
    }
    if (internalState.disposeFocusHandler) {
      internalState.disposeFocusHandler();
      internalState.disposeFocusHandler = undefined;
    }
    if (internalState.unmodalize) {
      internalState.unmodalize();
    }
    // Dispose of element references so the DOM Nodes can be garbage-collected
    delete internalState.previouslyFocusedElementInTrapZone;
    delete internalState.previouslyFocusedElementOutsideTrapZone;
  });

  useComponentRef(componentRef, internalState.previouslyFocusedElementInTrapZone, focus);

  return (
    <div
      {...divProps}
      className={className}
      ref={mergedRootRef}
      aria-labelledby={ariaLabelledBy}
      onFocusCapture={onRootFocusCapture}
      onFocus={onFocus}
      onBlur={onBlur}
      onBlurCapture={onRootBlurCapture}
    >
      <div {...bumperProps} ref={firstBumper} />
      {children}
      <div {...bumperProps} ref={lastBumper} />
    </div>
  );
}) as any;

FocusTrapZone.displayName = COMPONENT_NAME;
FocusTrapZone.focusStack = [];
