import * as React from 'react';
import {
  elementContains,
  getNativeProps,
  divProperties,
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  getDocument,
  focusAsync,
  on,
} from '../../Utilities';
import { IFocusTrapZoneProps } from './FocusTrapZone.types';
import { useId, useConstCallback } from '@uifabric/react-hooks';
import { getWindow } from '../../Utilities';

const useUnmount = (unmountFunction: () => void) => {
  const unmountRef = React.useRef(unmountFunction);
  unmountRef.current = unmountFunction;
  React.useEffect(
    () => () => {
      if (unmountRef.current) {
        unmountRef.current();
      }
    },
    [unmountFunction],
  );
};

const useComponentRef = (
  props: IFocusTrapZoneProps,
  previouslyFocusedElementInTrapZone: HTMLElement | undefined,
  focus: () => void,
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get previouslyFocusedElementInTrapZone() {
        return previouslyFocusedElementInTrapZone;
      },
      focus,
    }),
    [previouslyFocusedElementInTrapZone, focus],
  );
};

interface IFocusTrapZoneState {
  disposeFocusHandler: (() => void) | undefined;
  disposeClickHandler: (() => void) | undefined;
  previouslyFocusedElementOutsideTrapZone: HTMLElement | undefined;
  previouslyFocusedElementInTrapZone: HTMLElement | undefined;
  hasFocus: boolean;
  prevProps: IFocusTrapZoneProps;
  hasPreviouslyRendered: boolean;
}

const COMPONENT_NAME = 'FocusTrapZone';

export const FocusTrapZone: React.FunctionComponent<IFocusTrapZoneProps> & { focusStack: string[] } = (
  props: IFocusTrapZoneProps,
) => {
  const root = React.useRef<HTMLDivElement>(null);
  const firstBumper = React.useRef<HTMLDivElement>(null);
  const lastBumper = React.useRef<HTMLDivElement>(null);
  const id = useId();
  const {
    className,
    ariaLabelledBy,
    elementToFocusOnDismiss,
    focusPreviouslyFocusedInnerElement,
    firstFocusableSelector,
    disabled,
  } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);
  const { current: state } = React.useRef<IFocusTrapZoneState>({
    previouslyFocusedElementOutsideTrapZone: undefined,
    previouslyFocusedElementInTrapZone: undefined,
    disposeFocusHandler: undefined,
    disposeClickHandler: undefined,
    hasFocus: false,
    prevProps: props,
    hasPreviouslyRendered: false,
  });

  const bumperProps = {
    style: {
      pointerEvents: 'none',
      position: 'fixed', // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
    },
    tabIndex: disabled ? -1 : 0, // make bumpers tabbable only when enabled
    'data-is-visible': true,
  } as React.HTMLAttributes<HTMLDivElement>;

  const focus = () => {
    if (
      focusPreviouslyFocusedInnerElement &&
      state.previouslyFocusedElementInTrapZone &&
      elementContains(root.current, state.previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      if (
        !(
          state.previouslyFocusedElementInTrapZone === firstBumper.current ||
          state.previouslyFocusedElementInTrapZone === lastBumper.current
        )
      ) {
        focusAsync(state.previouslyFocusedElementInTrapZone);
      }
      return;
    }
    const focusSelector =
      typeof firstFocusableSelector === 'string'
        ? firstFocusableSelector
        : firstFocusableSelector && firstFocusableSelector();
    let firstFocusableChild: HTMLElement | null = null;

    if (root.current) {
      if (focusSelector) {
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
      if (!(firstFocusableChild === firstBumper.current || firstFocusableChild === lastBumper.current)) {
        focusAsync(firstFocusableChild);
      }
    }
  };

  const onRootFocus = React.useCallback(
    (ev: React.FocusEvent<HTMLDivElement>) => {
      if (props.onFocus) {
        props.onFocus(ev);
      }
      state.hasFocus = true;
    },
    [props.onFocus],
  );

  const onRootBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLDivElement>) => {
      if (props.onBlur) {
        props.onBlur(ev);
      }
      let relatedTarget = ev.relatedTarget;
      if (ev.relatedTarget === null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the ComboBox
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = getDocument(root.current)!.activeElement as Element;
      }
      if (!elementContains(root.current, relatedTarget as HTMLElement)) {
        state.hasFocus = false;
      }
    },
    [props.onBlur, elementContains, root.current],
  );

  const onFirstBumperFocus = useConstCallback(() => {
    onBumperFocus(true);
  });

  const onLastBumperFocus = useConstCallback(() => {
    onBumperFocus(false);
  });

  const onBumperFocus = (isFirstBumper: boolean) => {
    if (props.disabled) {
      return;
    }

    const currentBumper = (isFirstBumper === state.hasFocus ? lastBumper.current : firstBumper.current) as HTMLElement;

    if (root.current) {
      const nextFocusable =
        isFirstBumper === state.hasFocus
          ? getLastTabbable(root.current, currentBumper, true, false)
          : getFirstTabbable(root.current, currentBumper, true, false);

      if (nextFocusable) {
        if (isBumper(nextFocusable)) {
          // This can happen when FTZ contains no tabbable elements.
          // focus will take care of finding a focusable element in FTZ.
          focus();
        } else {
          nextFocusable.focus();
        }
      }
    }
  };

  const bringFocusIntoZone = (): void => {
    const { disableFirstFocus = false, disabled: currentDisabledValue = false } = props;

    if (currentDisabledValue) {
      return;
    }

    state.previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
      ? elementToFocusOnDismiss
      : (getDocument(root.current)!.activeElement as HTMLElement);
    if (!disableFirstFocus && !elementContains(root.current, state.previouslyFocusedElementOutsideTrapZone)) {
      focus();
    }
  };

  const setAsyncFocus = (element: HTMLElement): void => {
    if (!isBumper(element)) {
      focusAsync(element);
    }
  };

  const returnFocusToInitiator = (): void => {
    const { ignoreExternalFocusing } = props;
    const doc = getDocument(root.current);

    if (doc) {
      const activeElement = doc.activeElement as HTMLElement;
      if (
        !ignoreExternalFocusing &&
        state.previouslyFocusedElementOutsideTrapZone &&
        typeof state.previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
        (elementContains(root.current, activeElement) || activeElement === doc.body)
      ) {
        setAsyncFocus(state.previouslyFocusedElementOutsideTrapZone);
      }
    }
  };

  const updateEventHandlers = (): void => {
    const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = props;
    const win = getWindow(root.current)!;

    if (forceFocusInsideTrap && !state.disposeFocusHandler) {
      state.disposeFocusHandler = on(win, 'focus', forceFocusInTrap, true);
    } else if (!forceFocusInsideTrap && state.disposeFocusHandler) {
      state.disposeFocusHandler();
      state.disposeFocusHandler = undefined;
    }

    if (!isClickableOutsideFocusTrap && !state.disposeClickHandler) {
      state.disposeClickHandler = on(win, 'click', forceClickInTrap, true);
    } else if (isClickableOutsideFocusTrap && state.disposeClickHandler) {
      state.disposeClickHandler();
      state.disposeClickHandler = undefined;
    }
  };

  const isBumper = useConstCallback((element: HTMLElement): boolean => {
    return element === firstBumper.current || element === lastBumper.current;
  });

  const onFocusCapture = React.useCallback(
    (ev: React.FocusEvent<HTMLDivElement>) => {
      if (props.onFocusCapture) {
        props.onFocusCapture(ev);
      }
      if (ev.target !== ev.currentTarget && !isBumper(ev.target)) {
        // every time focus changes within the trap zone, remember the focused element so that
        // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
        state.previouslyFocusedElementInTrapZone = ev.target as HTMLElement;
      }
    },
    [props.onFocusCapture, isBumper],
  );

  const forceFocusInTrap = (ev: FocusEvent): void => {
    if (props.disabled) {
      return;
    }
    if (FocusTrapZone.focusStack.length && id === FocusTrapZone.focusStack[FocusTrapZone.focusStack.length - 1]) {
      const focusedElement = ev.target as HTMLElement;
      if (!elementContains(root.current, focusedElement)) {
        focus();
        state.hasFocus = true; // set focus here since we stop event propagation
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  const forceClickInTrap = (ev: MouseEvent): void => {
    if (props.disabled) {
      return;
    }
    if (FocusTrapZone.focusStack.length && id === FocusTrapZone.focusStack[FocusTrapZone.focusStack.length - 1]) {
      const clickedElement = ev.target as HTMLElement;
      if (clickedElement && !elementContains(root.current, clickedElement)) {
        focus();
        state.hasFocus = true; // set focus here since we stop event propagation
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  React.useEffect(() => {
    if (elementToFocusOnDismiss && state.previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
      state.previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
    }
    updateEventHandlers();
  }, [elementToFocusOnDismiss, state.previouslyFocusedElementOutsideTrapZone, elementToFocusOnDismiss]);

  React.useEffect(() => {
    const prevForceFocusInsideTrap =
      state.prevProps.forceFocusInsideTrap !== undefined ? state.prevProps.forceFocusInsideTrap : true;
    const newForceFocusInsideTrap = props.forceFocusInsideTrap !== undefined ? props.forceFocusInsideTrap : true;
    const prevDisabled = state.prevProps.disabled !== undefined ? state.prevProps.disabled : false;
    const newDisabled = props.disabled !== undefined ? props.disabled : false;

    if ((!prevForceFocusInsideTrap && newForceFocusInsideTrap) || (prevDisabled && !newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ disabled to enabled.
      // Emulate what happens when a FocusTrapZone gets mounted.
      state.hasPreviouslyRendered = true;
      bringFocusIntoZone();
    } else if ((prevForceFocusInsideTrap && !newForceFocusInsideTrap) || (!prevDisabled && newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ enabled to disabled.
      // Emulate what happens when a FocusTrapZone gets unmounted.
      returnFocusToInitiator();
    }
    updateEventHandlers();
    state.prevProps = props;
  }, [state.prevProps.forceFocusInsideTrap, props.forceFocusInsideTrap, state.prevProps.disabled, props.disabled]);

  useUnmount(() => {
    const doc = getDocument(root.current);
    if (doc) {
      // don't handle return focus unless forceFocusInsideTrap is true or focus is still within FocusTrapZone
      if (
        !props.disabled ||
        props.forceFocusInsideTrap ||
        !elementContains(root.current, doc.activeElement as HTMLElement)
      ) {
        returnFocusToInitiator();
      }
    }
    // Dispose of event handlers so their closures can be garbage-collected
    if (state.disposeClickHandler) {
      state.disposeClickHandler();
      state.disposeClickHandler = undefined;
    }
    if (state.disposeFocusHandler) {
      state.disposeFocusHandler();
      state.disposeFocusHandler = undefined;
    }
    // Dispose of element references so the DOM Nodes can be garbage-collected
    delete state.previouslyFocusedElementInTrapZone;
    delete state.previouslyFocusedElementOutsideTrapZone;
  });

  // Previously was componentDidMount.
  React.useEffect(() => {
    FocusTrapZone.focusStack.push(id);

    bringFocusIntoZone();
    updateEventHandlers();

    return () => {
      FocusTrapZone.focusStack = FocusTrapZone.focusStack.filter((value: string) => {
        return id !== value;
      });
    };
  }, []);

  useComponentRef(props, state.previouslyFocusedElementInTrapZone, focus);

  return (
    <div
      {...divProps}
      className={className}
      ref={root}
      aria-labelledby={ariaLabelledBy}
      onFocusCapture={onFocusCapture}
      onFocus={onRootFocus}
      onBlur={onRootBlur}
    >
      <div {...bumperProps} ref={firstBumper} onFocus={onFirstBumperFocus} />
      {props.children}
      <div {...bumperProps} ref={lastBumper} onFocus={onLastBumperFocus} />
    </div>
  );
};
FocusTrapZone.focusStack = [];
FocusTrapZone.displayName = COMPONENT_NAME;
