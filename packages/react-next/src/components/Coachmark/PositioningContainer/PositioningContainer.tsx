import * as React from 'react';
import { IPositioningContainerProps } from './PositioningContainer.types';
import { getClassNames } from './PositioningContainer.styles';
import { Layer } from '../../../Layer';

// Utilites/Helpers
import { DirectionalHint } from '../../../common/DirectionalHint';
import {
  Point,
  IRectangle,
  css,
  elementContains,
  focusFirstChild,
  EventGroup,
  getPropsWithDefaults,
} from '../../../Utilities';

import {
  getMaxHeight,
  positionElement,
  IPositionedData,
  IPositionProps,
  IPosition,
  RectangleEdge,
} from 'office-ui-fabric-react/lib/utilities/positioning';

import { AnimationClassNames, mergeStyles } from '../../../Styling';
import { useMergedRefs, useAsync, useTarget } from '@uifabric/react-hooks';

const OFF_SCREEN_STYLE = { opacity: 0 };

// In order for some of the max height logic to work properly we need to set the border.
// The value is abitrary.
const BORDER_WIDTH = 1;
const SLIDE_ANIMATIONS = {
  [RectangleEdge.top]: 'slideUpIn20',
  [RectangleEdge.bottom]: 'slideDownIn20',
  [RectangleEdge.left]: 'slideLeftIn20',
  [RectangleEdge.right]: 'slideRightIn20',
} as const;

const DEFAULT_PROPS = {
  preventDismissOnScroll: false,
  offsetFromTarget: 0,
  minPagePadding: 8,
  directionalHint: DirectionalHint.bottomAutoEdge,
};

function useCachedBounds(props: IPositioningContainerProps, targetWindow: Window | undefined) {
  /** The bounds used when determining if and where the PositioningContainer should be placed. */
  const positioningBounds = React.useRef<IRectangle>();

  const getCachedBounds = (): IRectangle => {
    if (!positioningBounds.current) {
      let currentBounds = props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + props.minPagePadding!,
          left: 0 + props.minPagePadding!,
          right: targetWindow!.innerWidth - props.minPagePadding!,
          bottom: targetWindow!.innerHeight - props.minPagePadding!,
          width: targetWindow!.innerWidth - props.minPagePadding! * 2,
          height: targetWindow!.innerHeight - props.minPagePadding! * 2,
        };
      }
      positioningBounds.current = currentBounds;
    }
    return positioningBounds.current;
  };

  return getCachedBounds;
}

function usePositionState(
  props: IPositioningContainerProps,
  positionedHost: React.RefObject<HTMLDivElement | null>,
  contentHost: React.RefObject<HTMLDivElement | null>,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  getCachedBounds: () => IRectangle,
) {
  const async = useAsync();
  /**
   * Current set of calcualted positions for the outermost parent container.
   */
  const [positions, setPositions] = React.useState<IPositionedData>();
  const positionAttempts = React.useRef(0);

  const updateAsyncPosition = (): void => {
    async.requestAnimationFrame(() => updatePosition());
  };

  const updatePosition = (): void => {
    const { offsetFromTarget, onPositioned } = props;
    const hostElement = positionedHost.current;
    const positioningContainerElement = contentHost.current;

    if (hostElement && positioningContainerElement) {
      const currentProps: IPositionProps = { ...props } as IPositionProps;
      currentProps!.bounds = getCachedBounds();
      currentProps!.target = targetRef.current!;
      if (document.body.contains(currentProps!.target as Node)) {
        currentProps!.gapSpace = offsetFromTarget;
        const newPositions: IPositionedData = positionElement(currentProps!, hostElement, positioningContainerElement);
        // Set the new position only when the positions are not exists or one of the new positioningContainer positions
        // are different. The position should not change if the position is within 2 decimal places.
        if (
          (!positions && newPositions) ||
          (positions && newPositions && !arePositionsEqual(positions, newPositions) && positionAttempts.current < 5)
        ) {
          // We should not reposition the positioningContainer more than a few times, if it is then the content is
          // likely resizing and we should stop trying to reposition to prevent a stack overflow.
          positionAttempts.current++;
          setPositions(newPositions);
          onPositioned?.(newPositions);
        } else {
          positionAttempts.current = 0;
          onPositioned?.(newPositions);
        }
      } else if (positions !== undefined) {
        setPositions(undefined);
      }
    }
  };

  React.useEffect(updateAsyncPosition);

  return [positions, updateAsyncPosition] as const;
}

function useSetInitialFocus(
  { setInitialFocus }: IPositioningContainerProps,
  contentHost: React.RefObject<HTMLDivElement | null>,
  positions: IPositionedData | undefined,
) {
  const didSetInitialFocus = React.useRef(false);

  React.useEffect((): void => {
    if (!didSetInitialFocus.current && contentHost.current && setInitialFocus && positions) {
      didSetInitialFocus.current = true;
      focusFirstChild(contentHost.current);
    }
  });
}

function useMaxHeight(
  { directionalHintFixed, offsetFromTarget, directionalHint, target }: IPositioningContainerProps,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  getCachedBounds: () => IRectangle,
) {
  /**
   * The maximum height the PositioningContainer can grow to
   * without going beyond the window or target bounds
   */
  const maxHeight = React.useRef<number | undefined>();

  // If the target element changed, reset the max height. If we are tracking
  // target with class name, always reset because we do not know if
  // fabric has rendered a new element and disposed the old element.
  if (typeof target === 'string') {
    maxHeight.current = undefined;
  }
  React.useEffect(() => {
    maxHeight.current = undefined;
  }, [target, offsetFromTarget]);

  /**
   * Return the maximum height the container can grow to
   * without going out of the specified bounds
   */
  const getCachedMaxHeight = (): number => {
    if (!maxHeight.current) {
      if (directionalHintFixed && targetRef.current) {
        const gapSpace = offsetFromTarget ? offsetFromTarget : 0;
        maxHeight.current = getMaxHeight(targetRef.current, directionalHint!, gapSpace, getCachedBounds());
      } else {
        maxHeight.current = getCachedBounds().height! - BORDER_WIDTH * 2;
      }
    }
    return maxHeight.current!;
  };

  return getCachedMaxHeight;
}

function useAutoDismissEvents(
  { onDismiss, preventDismissOnScroll }: IPositioningContainerProps,
  positionedHost: React.RefObject<HTMLDivElement | null>,
  targetWindow: Window | undefined,
  targetRef: React.RefObject<Element | MouseEvent | Point | null>,
  positions: IPositionedData | undefined,
  updateAsyncPosition: () => void,
) {
  const async = useAsync();

  const onResize = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (onDismiss) {
      onDismiss(ev);
    } else {
      updateAsyncPosition();
    }
  };

  const dismissOnScroll = (ev: Event): void => {
    if (positions && !preventDismissOnScroll) {
      dismissOnLostFocus(ev);
    }
  };

  const dismissOnLostFocus = (ev: Event): void => {
    const target = ev.target as HTMLElement;
    const clickedOutsideCallout = positionedHost.current && !elementContains(positionedHost.current, target);

    if (
      (!targetRef.current && clickedOutsideCallout) ||
      (ev.target !== targetWindow &&
        clickedOutsideCallout &&
        ((targetRef.current as MouseEvent).stopPropagation ||
          !targetRef.current ||
          (target !== targetRef.current && !elementContains(targetRef.current as HTMLElement, target))))
    ) {
      onResize(ev);
    }
  };

  React.useEffect(() => {
    const events = new EventGroup({});
    // This is added so the positioningContainer will dismiss when the window is scrolled
    // but not when something inside the positioningContainer is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the positioningContainer.
    async.setTimeout(() => {
      events.on(targetWindow, 'scroll', async.throttle(dismissOnScroll, 10), true);
      events.on(targetWindow, 'resize', async.throttle(onResize, 10), true);
      events.on(targetWindow?.document?.body, 'focus', dismissOnLostFocus, true);
      events.on(targetWindow?.document?.body, 'click', dismissOnLostFocus, true);
    }, 0);

    return () => events.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount
  }, []);
}

export function useHeightOffset(
  { finalHeight }: IPositioningContainerProps,
  contentHost: React.RefObject<HTMLDivElement | null>,
) {
  /**
   * Tracks the current height offset and updates during
   * the height animation when props.finalHeight is specified.
   */
  const [heightOffset, setHeightOffset] = React.useState<number>(0);
  const async = useAsync();
  const setHeightOffsetTimer = React.useRef<number>(0);

  /** Animates the height if finalHeight was given. */
  const setHeightOffsetEveryFrame = (): void => {
    if (contentHost && finalHeight) {
      setHeightOffsetTimer.current = async.requestAnimationFrame(() => {
        if (!contentHost.current) {
          return;
        }

        const positioningContainerMainElem = contentHost.current.lastChild as HTMLElement;
        const cardScrollHeight: number = positioningContainerMainElem.scrollHeight;
        const cardCurrHeight: number = positioningContainerMainElem.offsetHeight;
        const scrollDiff: number = cardScrollHeight - cardCurrHeight;

        setHeightOffset(heightOffset + scrollDiff);

        if (positioningContainerMainElem.offsetHeight < finalHeight) {
          setHeightOffsetEveryFrame();
        } else {
          async.cancelAnimationFrame(setHeightOffsetTimer.current);
        }
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- should only re-run if finalHeight changes
  React.useEffect(setHeightOffsetEveryFrame, [finalHeight]);

  return heightOffset;
}

export const PositioningContainer = React.forwardRef(
  (propsWithoutDefaults: IPositioningContainerProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    // @TODO rename to reflect the name of this class
    const contentHost = React.useRef<HTMLDivElement>(null);
    /**
     * The primary positioned div.
     */
    const positionedHost = React.useRef<HTMLDivElement>(null);
    const rootRef = useMergedRefs(forwardedRef, positionedHost);

    const [targetRef, targetWindow] = useTarget(props.target, positionedHost);
    const getCachedBounds = useCachedBounds(props, targetWindow);
    const [positions, updateAsyncPosition] = usePositionState(
      props,
      positionedHost,
      contentHost,
      targetRef,
      getCachedBounds,
    );
    const getCachedMaxHeight = useMaxHeight(props, targetRef, getCachedBounds);
    const heightOffset = useHeightOffset(props, contentHost);

    useSetInitialFocus(props, contentHost, positions);
    useAutoDismissEvents(props, positionedHost, targetWindow, targetRef, positions, updateAsyncPosition);

    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on initial render
    React.useEffect(() => props.onLayerMounted?.(), []);

    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!targetWindow) {
      return null;
    }

    const { className, positioningContainerWidth, positioningContainerMaxHeight, children } = props;

    const styles = getClassNames();

    const directionalClassName =
      positions && positions.targetEdge ? AnimationClassNames[SLIDE_ANIMATIONS[positions.targetEdge]] : '';

    const getContentMaxHeight: number = getCachedMaxHeight() + heightOffset!;
    const contentMaxHeight: number =
      positioningContainerMaxHeight! && positioningContainerMaxHeight! > getContentMaxHeight
        ? getContentMaxHeight
        : positioningContainerMaxHeight!;
    const content = (
      <div ref={rootRef} className={css('ms-PositioningContainer', styles.container)}>
        <div
          className={mergeStyles(
            'ms-PositioningContainer-layerHost',
            styles.root,
            className,
            directionalClassName,
            !!positioningContainerWidth && { width: positioningContainerWidth },
          )}
          style={positions ? positions.elementPosition : OFF_SCREEN_STYLE}
          // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          tabIndex={-1}
          ref={contentHost}
        >
          {children}
          {
            // @TODO apply to the content container
            contentMaxHeight
          }
        </div>
      </div>
    );

    return props.doNotLayer ? content : <Layer>{content}</Layer>;
  },
);
PositioningContainer.displayName = 'PositioningContainer';

function arePositionsEqual(positions: IPositionedData, newPosition: IPositionedData): boolean {
  return comparePositions(positions.elementPosition, newPosition.elementPosition);
}

function comparePositions(oldPositions: IPosition, newPositions: IPosition): boolean {
  for (const key in newPositions) {
    if (newPositions.hasOwnProperty(key)) {
      const oldPositionEdge = oldPositions[key];
      const newPositionEdge = newPositions[key];

      if (oldPositionEdge && newPositionEdge) {
        if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
          return false;
        }
      }
    }
  }
  return true;
}
