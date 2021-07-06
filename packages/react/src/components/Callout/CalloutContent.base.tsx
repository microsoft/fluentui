import * as React from 'react';
import { ICalloutProps, ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  Point,
  IRectangle,
  css,
  divProperties,
  elementContains,
  focusFirstChild,
  getNativeProps,
  on,
  shallowCompare,
  getPropsWithDefaults,
} from '../../Utilities';
import {
  positionCallout,
  ICalloutPositionedInfo,
  IPositionProps,
  getMaxHeight,
  IPosition,
  RectangleEdge,
  positionCard,
  getBoundsFromTargetWindow,
} from '../../Positioning';
import { Popup } from '../../Popup';
import { classNamesFunction } from '../../Utilities';
import { AnimationClassNames } from '../../Styling';
import { useMergedRefs, useAsync, useConst, useTarget } from '@fluentui/react-hooks';

const ANIMATIONS: { [key: number]: string | undefined } = {
  [RectangleEdge.top]: AnimationClassNames.slideUpIn10,
  [RectangleEdge.bottom]: AnimationClassNames.slideDownIn10,
  [RectangleEdge.left]: AnimationClassNames.slideLeftIn10,
  [RectangleEdge.right]: AnimationClassNames.slideRightIn10,
};

const getClassNames = classNamesFunction<ICalloutContentStyleProps, ICalloutContentStyles>({
  disableCaching: true, // disabling caching because stylesProp.position mutates often
});

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
// Microsoft Edge will overwrite inline styles if there is an animation pertaining to that style.
// To help ensure that edge will respect the offscreen style opacity
// filter needs to be added as an additional way to set opacity.
// Also set pointer-events: none so that the callout will not occlude the element it is
// going to be positioned against
const OFF_SCREEN_STYLE: React.CSSProperties = { opacity: 0, filter: 'opacity(0)', pointerEvents: 'none' };
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

/**
 * Returns a function to lazily fetch the bounds of the target element for the callout
 */
function useBounds(
  { bounds, minPagePadding = DEFAULT_PROPS.minPagePadding, target }: ICalloutProps,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  targetWindow: Window | undefined,
) {
  const cachedBounds = React.useRef<IRectangle | undefined>();

  const getBounds = React.useCallback((): IRectangle | undefined => {
    if (!cachedBounds.current) {
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
    }
    return cachedBounds.current;
  }, [bounds, minPagePadding, target, targetRef, targetWindow]);

  return getBounds;
}

/**
 * Returns the maximum available height for the Callout to render into
 */
function useMaxHeight(
  { beakWidth, coverTarget, directionalHint, directionalHintFixed, gapSpace, isBeakVisible, hidden }: ICalloutProps,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  getBounds: () => IRectangle | undefined,
) {
  const [maxHeight, setMaxHeight] = React.useState<number | undefined>();
  const async = useAsync();

  // Updating targetRef won't re-render the component, but it's recalculated (if needed) with every render
  // If it mutates, we want to re-run the effect
  const currentTarget = targetRef.current;

  React.useEffect(() => {
    if (!maxHeight && !hidden) {
      if (directionalHintFixed && currentTarget) {
        // Since the callout cannot measure it's border size it must be taken into account here. Otherwise it will
        // overlap with the target.
        const totalGap: number = (gapSpace ?? 0) + (isBeakVisible && beakWidth ? beakWidth : 0);
        async.requestAnimationFrame(() => {
          if (targetRef.current) {
            setMaxHeight(getMaxHeight(targetRef.current, directionalHint!, totalGap, getBounds(), coverTarget));
          }
        });
      } else {
        setMaxHeight(getBounds()?.height);
      }
    } else if (hidden) {
      setMaxHeight(undefined);
    }
  }, [
    targetRef,
    currentTarget,
    gapSpace,
    beakWidth,
    getBounds,
    hidden,
    async,
    coverTarget,
    directionalHint,
    directionalHintFixed,
    isBeakVisible,
    maxHeight,
  ]);

  return maxHeight;
}

/**
 * Returns the height offset of the callout element and updates it each frame to approach the configured finalHeight
 */
function useHeightOffset({ finalHeight, hidden }: ICalloutProps, calloutElement: React.RefObject<HTMLDivElement>) {
  const [heightOffset, setHeightOffset] = React.useState<number>(0);
  const async = useAsync();
  const setHeightOffsetTimer = React.useRef<number | undefined>();

  const setHeightOffsetEveryFrame = React.useCallback((): void => {
    if (calloutElement.current && finalHeight) {
      setHeightOffsetTimer.current = async.requestAnimationFrame(() => {
        const calloutMainElem = calloutElement.current?.lastChild as HTMLElement;

        if (!calloutMainElem) {
          return;
        }

        const cardScrollHeight: number = calloutMainElem.scrollHeight;
        const cardCurrHeight: number = calloutMainElem.offsetHeight;
        const scrollDiff: number = cardScrollHeight - cardCurrHeight;

        setHeightOffset(currentHeightOffset => currentHeightOffset + scrollDiff);

        if (calloutMainElem.offsetHeight < finalHeight) {
          setHeightOffsetEveryFrame();
        } else {
          async.cancelAnimationFrame(setHeightOffsetTimer.current!, calloutElement.current);
        }
      }, calloutElement.current);
    }
  }, [async, calloutElement, finalHeight]);

  React.useEffect(() => {
    if (!hidden) {
      setHeightOffsetEveryFrame();
    }
  }, [finalHeight, hidden, setHeightOffsetEveryFrame]);

  return heightOffset;
}

/**
 * Get the position information for the callout. If the callout does not fit in the given orientation,
 * a new position is calculated for the next frame, up to 5 attempts
 */
function usePositions(
  props: ICalloutProps,
  hostElement: React.RefObject<HTMLDivElement>,
  calloutElement: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  getBounds: () => IRectangle | undefined,
) {
  const [positions, setPositions] = React.useState<ICalloutPositionedInfo>();
  const positionAttempts = React.useRef(0);
  const async = useAsync();
  const { hidden, target, finalHeight, onPositioned, directionalHint } = props;

  React.useEffect(() => {
    if (!hidden) {
      const timerId = async.requestAnimationFrame(() => {
        // If we expect a target element to position against, we need to wait until `targetRef.current`
        // is resolved. Otherwise we can try to position.
        const expectsTarget = !!target;

        if (hostElement.current && calloutElement.current && (!expectsTarget || targetRef.current)) {
          const currentProps: IPositionProps = {
            ...props,
            target: targetRef.current!,
            bounds: getBounds(),
          };
          // If there is a finalHeight given then we assume that the user knows and will handle
          // additional positioning adjustments so we should call positionCard
          const newPositions: ICalloutPositionedInfo = finalHeight
            ? positionCard(currentProps, hostElement.current, calloutElement.current, positions)
            : positionCallout(currentProps, hostElement.current, calloutElement.current, positions);

          // Set the new position only when the positions are not exists or one of the new callout positions
          // are different. The position should not change if the position is within 2 decimal places.
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
      }, calloutElement.current);

      return () => async.cancelAnimationFrame(timerId);
    }
  }, [
    hidden,
    directionalHint,
    async,
    calloutElement,
    hostElement,
    targetRef,
    finalHeight,
    getBounds,
    onPositioned,
    positions,
    props,
    target,
  ]);

  return positions;
}

/**
 * Hook to set up behavior to automatically focus the callout when it appears, if indicated by props.
 */
function useAutoFocus(
  { hidden, setInitialFocus }: ICalloutProps,
  positions: ICalloutPositionedInfo | undefined,
  calloutElement: React.RefObject<HTMLDivElement>,
) {
  const async = useAsync();
  const hasPositions = !!positions;
  React.useEffect(() => {
    if (!hidden && setInitialFocus && hasPositions && calloutElement.current) {
      const timerId = async.requestAnimationFrame(
        () => focusFirstChild(calloutElement.current!),
        calloutElement.current,
      );

      return () => async.cancelAnimationFrame(timerId);
    }
  }, [hidden, hasPositions, async, calloutElement, setInitialFocus]);
}

/**
 * Hook to set up various handlers to dismiss the popup when it loses focus or the window scrolls or similar cases.
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
      if (!preventDismissOnResize) {
        onDismiss?.(ev);
      }
    };

    const dismissOnLostFocus = (ev: Event) => {
      if (!preventDismissOnLostFocus) {
        dismissOnClickOrScroll(ev);
      }
    };

    const dismissOnClickOrScroll = (ev: Event) => {
      const target = ev.target as HTMLElement;
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

const COMPONENT_NAME = 'CalloutContentBase';

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
    } = props;

    const hostElement = React.useRef<HTMLDivElement>(null);
    const calloutElement = React.useRef<HTMLDivElement>(null);
    const rootRef = useMergedRefs(hostElement, forwardedRef);

    const [targetRef, targetWindow] = useTarget(props.target, calloutElement);
    const getBounds = useBounds(props, targetRef, targetWindow);
    const maxHeight = useMaxHeight(props, targetRef, getBounds);
    const heightOffset = useHeightOffset(props, calloutElement);
    const positions = usePositions(props, hostElement, calloutElement, targetRef, getBounds);
    const [mouseDownOnPopup, mouseUpOnPopup] = useDismissHandlers(
      props,
      positions,
      hostElement,
      targetRef,
      targetWindow,
    );

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

    const getContentMaxHeight: number | undefined = maxHeight ? maxHeight + heightOffset : undefined;
    const contentMaxHeight: number | undefined =
      calloutMaxHeight! && getContentMaxHeight && calloutMaxHeight! < getContentMaxHeight
        ? calloutMaxHeight!
        : getContentMaxHeight!;
    const overflowYHidden = hideOverflow;

    const beakVisible = isBeakVisible && !!target;
    const classNames = getClassNames(styles!, {
      theme: props.theme!,
      className,
      overflowYHidden: overflowYHidden,
      calloutWidth,
      positions,
      beakWidth,
      backgroundColor,
      calloutMaxWidth,
      calloutMinWidth,
      doNotLayer,
    });

    const overflowStyle: React.CSSProperties = {
      ...style,
      maxHeight: contentMaxHeight,
      ...(overflowYHidden && { overflowY: 'hidden' }),
    };

    const visibilityStyle: React.CSSProperties | undefined = props.hidden ? { visibility: 'hidden' } : undefined;
    // React.CSSProperties does not understand IRawStyle, so the inline animations will need to be cast as any for now.
    const content = (
      <div ref={rootRef} className={classNames.container} style={visibilityStyle}>
        <div
          {...getNativeProps(props, divProperties, ARIA_ROLE_ATTRIBUTES)}
          className={css(classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge!])}
          style={positions ? positions.elementPosition : OFF_SCREEN_STYLE}
          // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          tabIndex={-1}
          ref={calloutElement}
        >
          {beakVisible && <div className={classNames.beak} style={getBeakPosition(positions)} />}
          {beakVisible && <div className={classNames.beakCurtain} />}
          <Popup
            {...getNativeProps(props, ARIA_ROLE_ATTRIBUTES)}
            ariaLabel={ariaLabel}
            onRestoreFocus={props.onRestoreFocus}
            ariaDescribedBy={ariaDescribedBy}
            ariaLabelledBy={ariaLabelledBy}
            className={classNames.calloutMain}
            onDismiss={props.onDismiss}
            onScroll={onScroll}
            shouldRestoreFocus={shouldRestoreFocus}
            style={overflowStyle}
            onMouseDown={mouseDownOnPopup}
            onMouseUp={mouseUpOnPopup}
          >
            {children}
          </Popup>
        </div>
      </div>
    );

    return content;
  }),
  (previousProps: ICalloutProps, nextProps: ICalloutProps) => {
    if (!nextProps.shouldUpdateWhenHidden && previousProps.hidden && nextProps.hidden) {
      // Do not update when hidden.
      return true;
    }

    return shallowCompare(previousProps, nextProps);
  },
);
CalloutContentBase.displayName = COMPONENT_NAME;

function getBeakPosition(positions?: ICalloutPositionedInfo): React.CSSProperties {
  const beakPositionStyle: React.CSSProperties = {
    ...positions?.beakPosition?.elementPosition,
  };

  if (!beakPositionStyle.top && !beakPositionStyle.bottom && !beakPositionStyle.left && !beakPositionStyle.right) {
    beakPositionStyle.left = BEAK_ORIGIN_POSITION.left;
    beakPositionStyle.top = BEAK_ORIGIN_POSITION.top;
  }

  return beakPositionStyle;
}

function arePositionsEqual(positions: ICalloutPositionedInfo, newPosition: ICalloutPositionedInfo): boolean {
  return (
    comparePositions(positions.elementPosition, newPosition.elementPosition) &&
    comparePositions(positions.beakPosition.elementPosition, newPosition.beakPosition.elementPosition)
  );
}

function comparePositions(oldPositions: IPosition, newPositions: IPosition): boolean {
  for (const key in newPositions) {
    if (newPositions.hasOwnProperty(key)) {
      const oldPositionEdge = oldPositions[key];
      const newPositionEdge = newPositions[key];

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
