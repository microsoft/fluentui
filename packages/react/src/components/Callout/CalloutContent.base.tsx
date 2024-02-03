import * as React from 'react';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  css,
  divProperties,
  elementContains,
  focusFirstChild,
  getNativeProps,
  on,
  shallowCompare,
  getPropsWithDefaults,
  Async,
} from '../../Utilities';
import { calculateGapSpace, getRectangleFromTarget } from '../../utilities/positioning/positioning';
import { positionCallout, RectangleEdge, positionCard, getBoundsFromTargetWindow } from '../../Positioning';
import { Popup } from '../../Popup';
import { classNamesFunction } from '../../Utilities';
import { AnimationClassNames } from '../../Styling';
import { useMergedRefs, useAsync, useConst, useTarget, useOnEvent } from '@fluentui/react-hooks';
import type { ICalloutProps, ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';
import type { Point, IRectangle } from '../../Utilities';
import type { ICalloutPositionedInfo, IPositionProps, IPosition } from '../../Positioning';
import type { Target } from '@fluentui/react-hooks';
import { useWindowEx } from '../../utilities/dom';

const COMPONENT_NAME = 'CalloutContentBase';

const ANIMATIONS: { [key: number]: string | undefined } = {
  [RectangleEdge.top]: AnimationClassNames.slideUpIn10,
  [RectangleEdge.bottom]: AnimationClassNames.slideDownIn10,
  [RectangleEdge.left]: AnimationClassNames.slideLeftIn10,
  [RectangleEdge.right]: AnimationClassNames.slideRightIn10,
};

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
// Microsoft Edge will overwrite inline styles if there is an animation pertaining to that style.
// To help ensure that edge will respect the offscreen style opacity
// filter needs to be added as an additional way to set opacity.
// Also set pointer-events: none so that the callout will not occlude the element it is
// going to be positioned against
const OFF_SCREEN_STYLE: React.CSSProperties = {
  opacity: 0,
  filter: 'opacity(0)',
  pointerEvents: 'none',
};
// role and role description go hand-in-hand. Both would be included by spreading getNativeProps for a basic element
// This constant array can be used to filter these out of native props spread on callout root and apply them together on
// calloutMain (the Popup component within the callout)
const ARIA_ROLE_ATTRIBUTES = ['role', 'aria-roledescription'];

const DEFAULT_PROPS = {
  preventDismissOnLostFocus: false,
  preventDismissOnScroll: false,
  preventDismissOnResize: false,
  isBeakVisible: true,
  beakWidth: 16,
  gapSpace: 0,
  minPagePadding: 8,
  directionalHint: DirectionalHint.bottomAutoEdge,
} as const;

const getClassNames = classNamesFunction<ICalloutContentStyleProps, ICalloutContentStyles>({
  disableCaching: true, // disabling caching because stylesProp.position mutates often
});

/**
 * (Hook) to return a function to lazily fetch the bounds of the target element for the callout.
 */
function useBounds(
  { bounds, minPagePadding = DEFAULT_PROPS.minPagePadding, target }: ICalloutProps,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  targetWindow: Window | undefined,
) {
  const [targetWindowResized, setTargetWindowResized] = React.useState(false);
  const cachedBounds = React.useRef<IRectangle | undefined>();

  const getBounds = React.useCallback((): IRectangle | undefined => {
    if (!cachedBounds.current || targetWindowResized) {
      let currentBounds =
        typeof bounds === 'function' ? (targetWindow ? bounds(target, targetWindow) : undefined) : bounds;

      if (!currentBounds && targetWindow) {
        currentBounds = getBoundsFromTargetWindow(targetRef.current, targetWindow);
        currentBounds = {
          top: currentBounds.top + minPagePadding,
          left: currentBounds.left + minPagePadding,
          right: currentBounds.right! - minPagePadding,
          bottom: currentBounds.bottom! - minPagePadding,
          width: currentBounds.width - minPagePadding * 2,
          height: currentBounds.height - minPagePadding * 2,
        };
      }
      cachedBounds.current = currentBounds;
      targetWindowResized && setTargetWindowResized(false);
    }

    return cachedBounds.current;
  }, [bounds, minPagePadding, target, targetRef, targetWindow, targetWindowResized]);

  const async: Async = useAsync();
  useOnEvent(
    targetWindow,
    'resize',
    async.debounce(
      () => {
        setTargetWindowResized(true);
      },
      500,
      { leading: true },
    ),
  );

  return getBounds;
}

/**
 * (Hook) to return the maximum available height for the Callout to render into.
 */
function useMaxHeight(
  {
    calloutMaxHeight,
    finalHeight,
    directionalHint,
    directionalHintFixed,
    hidden,
    gapSpace,
    beakWidth,
    isBeakVisible,
    coverTarget,
  }: ICalloutProps,
  getBounds: () => IRectangle | undefined,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  positions?: ICalloutPositionedInfo,
) {
  const [maxHeight, setMaxHeight] = React.useState<number | undefined>();
  const { top, bottom } = positions?.elementPosition ?? {};
  const targetRect = targetRef?.current ? getRectangleFromTarget(targetRef.current) : undefined;

  React.useEffect(() => {
    const bounds = getBounds() ?? ({} as IRectangle);
    const { top: topBounds } = bounds;
    let { bottom: bottomBounds } = bounds;
    let calculatedHeight: number | undefined;

    // If aligned to top edge of target and not covering target, update bottom bounds to the
    // top of the target (accounting for gap space and beak)
    if (positions?.targetEdge === RectangleEdge.top && targetRect?.top && !coverTarget) {
      bottomBounds = targetRect.top - calculateGapSpace(isBeakVisible, beakWidth, gapSpace);
    }

    if (typeof top === 'number' && bottomBounds) {
      calculatedHeight = bottomBounds - top;
    } else if (typeof bottom === 'number' && typeof topBounds === 'number' && bottomBounds) {
      calculatedHeight = bottomBounds - topBounds - bottom;
    }

    if (
      (!calloutMaxHeight && !hidden) ||
      (calloutMaxHeight && calculatedHeight && calloutMaxHeight > calculatedHeight)
    ) {
      setMaxHeight(calculatedHeight);
    } else if (calloutMaxHeight) {
      setMaxHeight(calloutMaxHeight);
    } else {
      setMaxHeight(undefined);
    }
  }, [
    bottom,
    calloutMaxHeight,
    finalHeight,
    directionalHint,
    directionalHintFixed,
    getBounds,
    hidden,
    positions,
    top,
    gapSpace,
    beakWidth,
    isBeakVisible,
    targetRect,
    coverTarget,
  ]);

  return maxHeight;
}

/**
 * (Hook) to find the current position of Callout. If Callout is resized then a new position is calculated.
 */
function usePositions(
  props: ICalloutProps,
  hostElement: React.RefObject<HTMLDivElement>,
  calloutElement: HTMLDivElement | null,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  getBounds: () => IRectangle | undefined,
  popupRef: React.RefObject<HTMLDivElement>,
) {
  const [positions, setPositions] = React.useState<ICalloutPositionedInfo>();
  const positionAttempts = React.useRef(0);
  const previousTarget = React.useRef<Target>();
  const async = useAsync();
  const {
    hidden,
    target,
    finalHeight,
    calloutMaxHeight,
    onPositioned,
    directionalHint,
    hideOverflow,
    preferScrollResizePositioning,
  } = props;

  const win = useWindowEx();
  const localRef = React.useRef<HTMLDivElement | null>();
  let popupStyles: CSSStyleDeclaration | undefined;
  if (localRef.current !== popupRef.current) {
    localRef.current = popupRef.current;
    popupStyles = popupRef.current ? win?.getComputedStyle(popupRef.current) : undefined;
  }
  const popupOverflowY = popupStyles?.overflowY;

  React.useEffect(() => {
    if (!hidden) {
      const timerId = async.requestAnimationFrame(() => {
        if (hostElement.current && calloutElement) {
          const currentProps: IPositionProps = {
            ...props,
            target: targetRef.current!,
            bounds: getBounds(),
          };

          // duplicate calloutElement & remove useMaxHeight's maxHeight for position calc
          const dupeCalloutElement = calloutElement.cloneNode(true) as HTMLElement;
          dupeCalloutElement.style.maxHeight = calloutMaxHeight ? `${calloutMaxHeight}` : '';
          dupeCalloutElement.style.visibility = 'hidden';
          calloutElement.parentElement?.appendChild(dupeCalloutElement);

          const previousPositions = previousTarget.current === target ? positions : undefined;

          // only account for scroll resizing if styles allow callout to scroll
          // (popup styles determine if callout will scroll)
          const isOverflowYHidden = hideOverflow || popupOverflowY === 'clip' || popupOverflowY === 'hidden';
          const shouldScroll = preferScrollResizePositioning && !isOverflowYHidden;

          // If there is a finalHeight given then we assume that the user knows and will handle
          // additional positioning adjustments so we should call positionCard
          const newPositions: ICalloutPositionedInfo = finalHeight
            ? positionCard(currentProps, hostElement.current, dupeCalloutElement, previousPositions, win)
            : positionCallout(
                currentProps,
                hostElement.current,
                dupeCalloutElement,
                previousPositions,
                shouldScroll,
                undefined,
                win,
              );

          // clean up duplicate calloutElement
          calloutElement.parentElement?.removeChild(dupeCalloutElement);

          // Set the new position only when the positions do not exist or one of the new callout positions
          // is different. The position should not change if the position is within 2 decimal places.
          if (
            (!positions && newPositions) ||
            (positions && newPositions && !arePositionsEqual(positions, newPositions) && positionAttempts.current < 5)
          ) {
            // We should not reposition the callout more than a few times, if it is then the content is likely resizing
            // and we should stop trying to reposition to prevent a stack overflow.
            positionAttempts.current++;
            setPositions(newPositions);
          } else if (positionAttempts.current > 0) {
            // Only call the onPositioned callback if the callout has been re-positioned at least once.
            positionAttempts.current = 0;
            onPositioned?.(positions);
          }
        }
      }, calloutElement);

      previousTarget.current = target;

      return () => {
        async.cancelAnimationFrame(timerId);
        previousTarget.current = undefined;
      };
    } else {
      // When the callout is hidden, clear position state so that it is not accidentally used next render.
      setPositions(undefined);
      positionAttempts.current = 0;
    }
  }, [
    hidden,
    directionalHint,
    async,
    calloutElement,
    calloutMaxHeight,
    hostElement,
    targetRef,
    finalHeight,
    getBounds,
    onPositioned,
    positions,
    props,
    target,
    hideOverflow,
    preferScrollResizePositioning,
    popupOverflowY,
    win,
  ]);

  return positions;
}

/**
 * (Hook) to set up behavior to automatically focus the callout when it appears, if indicated by props.
 */
function useAutoFocus(
  { hidden, setInitialFocus }: ICalloutProps,
  positions: ICalloutPositionedInfo | undefined,
  calloutElement: HTMLDivElement | null,
) {
  const async = useAsync();
  const hasPositions = !!positions;
  React.useEffect(() => {
    if (!hidden && setInitialFocus && hasPositions && calloutElement) {
      const timerId = async.requestAnimationFrame(() => focusFirstChild(calloutElement), calloutElement);

      return () => async.cancelAnimationFrame(timerId);
    }
  }, [hidden, hasPositions, async, calloutElement, setInitialFocus]);
}

/**
 * (Hook) to set up various handlers to dismiss the popup when it loses focus or the window scrolls or similar cases.
 */
function useDismissHandlers(
  {
    hidden,
    onDismiss,
    // eslint-disable-next-line deprecation/deprecation
    preventDismissOnScroll,
    // eslint-disable-next-line deprecation/deprecation
    preventDismissOnResize,
    // eslint-disable-next-line deprecation/deprecation
    preventDismissOnLostFocus,
    dismissOnTargetClick,
    shouldDismissOnWindowFocus,
    preventDismissOnEvent,
  }: ICalloutProps,
  positions: ICalloutPositionedInfo | undefined,
  hostElement: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  targetWindow: Window | undefined,
) {
  const isMouseDownOnPopup = React.useRef(false);
  const async = useAsync();

  const mouseDownHandlers = useConst([
    () => {
      isMouseDownOnPopup.current = true;
    },
    () => {
      isMouseDownOnPopup.current = false;
    },
  ] as const);

  const positionsExists = !!positions;

  React.useEffect(() => {
    const dismissOnScroll = (ev: Event) => {
      if (positionsExists && !preventDismissOnScroll) {
        dismissOnClickOrScroll(ev);
      }
    };

    const dismissOnResize = (ev: Event) => {
      if (!preventDismissOnResize && !(preventDismissOnEvent && preventDismissOnEvent(ev))) {
        onDismiss?.(ev);
      }
    };

    const dismissOnLostFocus = (ev: Event) => {
      if (!preventDismissOnLostFocus) {
        dismissOnClickOrScroll(ev);
      }
    };

    const dismissOnClickOrScroll = (ev: Event) => {
      const eventPaths: Array<EventTarget> = ev.composedPath ? ev.composedPath() : [];
      const target = eventPaths.length > 0 ? (eventPaths[0] as HTMLElement) : (ev.target as HTMLElement);
      const isEventTargetOutsideCallout = hostElement.current && !elementContains(hostElement.current, target);

      // If mouse is pressed down on callout but moved outside then released, don't dismiss the callout.
      if (isEventTargetOutsideCallout && isMouseDownOnPopup.current) {
        isMouseDownOnPopup.current = false;
        return;
      }

      if (
        (!targetRef.current && isEventTargetOutsideCallout) ||
        (ev.target !== targetWindow &&
          isEventTargetOutsideCallout &&
          (!targetRef.current ||
            'stopPropagation' in targetRef.current ||
            dismissOnTargetClick ||
            (target !== targetRef.current && !elementContains(targetRef.current as HTMLElement, target))))
      ) {
        if (preventDismissOnEvent && preventDismissOnEvent(ev)) {
          return;
        }
        onDismiss?.(ev);
      }
    };

    const dismissOnTargetWindowBlur = (ev: FocusEvent) => {
      // Do nothing
      if (!shouldDismissOnWindowFocus) {
        return;
      }

      if (
        ((preventDismissOnEvent && !preventDismissOnEvent(ev)) ||
          (!preventDismissOnEvent && !preventDismissOnLostFocus)) &&
        !targetWindow?.document.hasFocus() &&
        ev.relatedTarget === null
      ) {
        onDismiss?.(ev);
      }
    };

    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the callout.
    const disposablesPromise = new Promise<() => void>(resolve => {
      async.setTimeout(() => {
        if (!hidden && targetWindow) {
          const disposables = [
            on(targetWindow, 'scroll', dismissOnScroll, true),
            on(targetWindow, 'resize', dismissOnResize, true),
            on(targetWindow.document.documentElement, 'focus', dismissOnLostFocus, true),
            on(targetWindow.document.documentElement, 'click', dismissOnLostFocus, true),
            on(targetWindow, 'blur', dismissOnTargetWindowBlur, true),
          ];

          resolve(() => {
            disposables.forEach(dispose => dispose());
          });
        }
      }, 0);
    });

    return () => {
      disposablesPromise.then(dispose => dispose());
    };
  }, [
    hidden,
    async,
    hostElement,
    targetRef,
    targetWindow,
    onDismiss,
    shouldDismissOnWindowFocus,
    dismissOnTargetClick,
    preventDismissOnLostFocus,
    preventDismissOnResize,
    preventDismissOnScroll,
    positionsExists,
    preventDismissOnEvent,
  ]);

  return mouseDownHandlers;
}

export const CalloutContentBase: React.FunctionComponent<ICalloutProps> = React.memo(
  React.forwardRef<HTMLDivElement, ICalloutProps>((propsWithoutDefaults, forwardedRef) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const {
      styles,
      style,
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      className,
      isBeakVisible,
      children,
      beakWidth,
      calloutWidth,
      calloutMaxWidth,
      calloutMinWidth,
      doNotLayer,
      finalHeight,
      hideOverflow = !!finalHeight,
      backgroundColor,
      calloutMaxHeight,
      onScroll,
      // eslint-disable-next-line deprecation/deprecation
      shouldRestoreFocus = true,
      target,
      hidden,
      onLayerMounted,
      popupProps,
    } = props;

    const hostElement = React.useRef<HTMLDivElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const mergedPopupRefs = useMergedRefs(popupRef, popupProps?.ref);
    const [calloutElement, setCalloutElement] = React.useState<HTMLDivElement | null>(null);
    const calloutCallback = React.useCallback((calloutEl: any) => {
      setCalloutElement(calloutEl);
    }, []);
    const rootRef = useMergedRefs(hostElement, forwardedRef);

    const [targetRef, targetWindow] = useTarget(props.target, {
      current: calloutElement,
    });
    const getBounds = useBounds(props, targetRef, targetWindow);
    const positions = usePositions(props, hostElement, calloutElement, targetRef, getBounds, mergedPopupRefs);
    const maxHeight = useMaxHeight(props, getBounds, targetRef, positions);
    const [mouseDownOnPopup, mouseUpOnPopup] = useDismissHandlers(
      props,
      positions,
      hostElement,
      targetRef,
      targetWindow,
    );

    // do not set both top and bottom css props from positions
    // instead, use maxHeight
    const isForcedInBounds = positions?.elementPosition.top && positions?.elementPosition.bottom;
    const cssPositions = {
      ...positions?.elementPosition,
      maxHeight,
    };
    if (isForcedInBounds) {
      cssPositions.bottom = undefined;
    }

    useAutoFocus(props, positions, calloutElement);

    React.useEffect(() => {
      if (!hidden) {
        onLayerMounted?.();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run if hidden changes
    }, [hidden]);

    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!targetWindow) {
      return null;
    }

    const overflowYHidden = hideOverflow;

    const beakVisible = isBeakVisible && !!target;
    const classNames = getClassNames(styles!, {
      theme: props.theme!,
      className,
      overflowYHidden,
      calloutWidth,
      positions,
      beakWidth,
      backgroundColor,
      calloutMaxWidth,
      calloutMinWidth,
      doNotLayer,
    });

    const overflowStyle: React.CSSProperties = {
      maxHeight: calloutMaxHeight ? calloutMaxHeight : '100%',
      ...style,
      ...(overflowYHidden && { overflowY: 'hidden' }),
    };

    const visibilityStyle: React.CSSProperties | undefined = props.hidden ? { visibility: 'hidden' } : undefined;
    // React.CSSProperties does not understand IRawStyle, so the inline animations will need to be cast as any for now.
    return (
      <div ref={rootRef} className={classNames.container} style={visibilityStyle}>
        <div
          {...getNativeProps(props, divProperties, ARIA_ROLE_ATTRIBUTES)}
          className={css(classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge!])}
          style={positions ? { ...cssPositions } : OFF_SCREEN_STYLE}
          // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          tabIndex={-1}
          ref={calloutCallback}
        >
          {beakVisible && <div className={classNames.beak} style={getBeakPosition(positions)} />}
          {beakVisible && <div className={classNames.beakCurtain} />}
          <Popup
            // don't use getNativeElementProps for role and roledescription because it will also
            // pass through data-* props (resulting in them being used in two places)
            role={props.role}
            aria-roledescription={props['aria-roledescription']}
            ariaDescribedBy={ariaDescribedBy}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            className={classNames.calloutMain}
            onDismiss={props.onDismiss}
            onMouseDown={mouseDownOnPopup}
            onMouseUp={mouseUpOnPopup}
            onRestoreFocus={props.onRestoreFocus}
            onScroll={onScroll}
            shouldRestoreFocus={shouldRestoreFocus}
            style={overflowStyle}
            {...popupProps}
            ref={mergedPopupRefs}
          >
            {children}
          </Popup>
        </div>
      </div>
    );
  }),
  (previousProps: ICalloutProps, nextProps: ICalloutProps) => {
    if (!nextProps.shouldUpdateWhenHidden && previousProps.hidden && nextProps.hidden) {
      // Do not update when hidden.
      return true;
    }
    return shallowCompare(previousProps, nextProps);
  },
);

/**
 * (Utility) to find and return the current `Callout` Beak position.
 *
 * @param positions
 */
function getBeakPosition(positions?: ICalloutPositionedInfo): React.CSSProperties {
  const beakPositionStyle: React.CSSProperties = {
    ...positions?.beakPosition?.elementPosition,
    display: positions?.beakPosition?.hideBeak ? 'none' : undefined,
  };

  if (!beakPositionStyle.top && !beakPositionStyle.bottom && !beakPositionStyle.left && !beakPositionStyle.right) {
    beakPositionStyle.left = BEAK_ORIGIN_POSITION.left;
    beakPositionStyle.top = BEAK_ORIGIN_POSITION.top;
  }

  return beakPositionStyle;
}

/**
 * (Utility) used to compare two different elementPositions to determine whether they are equal.
 *
 * @param prevElementPositions
 * @param newElementPosition
 */
function arePositionsEqual(
  prevElementPositions: ICalloutPositionedInfo,
  newElementPosition: ICalloutPositionedInfo,
): boolean {
  return (
    comparePositions(prevElementPositions.elementPosition, newElementPosition.elementPosition) &&
    comparePositions(prevElementPositions.beakPosition.elementPosition, newElementPosition.beakPosition.elementPosition)
  );
}

/**
 * (Utility) used in **arePositionsEqual** to compare two different elementPositions.
 *
 * @param prevElementPositions
 * @param newElementPositions
 */
function comparePositions(prevElementPositions: IPosition, newElementPositions: IPosition): boolean {
  for (const key in newElementPositions) {
    if (newElementPositions.hasOwnProperty(key)) {
      const oldPositionEdge = prevElementPositions[key];
      const newPositionEdge = newElementPositions[key];
      if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
        if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}

CalloutContentBase.displayName = COMPONENT_NAME;
