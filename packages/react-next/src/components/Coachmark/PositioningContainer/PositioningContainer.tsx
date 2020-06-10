import * as React from 'react';
import { IPositioningContainerProps } from './PositioningContainer.types';
import { getClassNames } from './PositioningContainer.styles';
import { Layer } from '../../../Layer';

// Utilites/Helpers
import { DirectionalHint } from '../../../common/DirectionalHint';
import {
  Point,
  IRectangle,
  assign,
  css,
  elementContains,
  focusFirstChild,
  getWindow,
  getDocument,
  Async,
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
import { useAsync, useForceUpdate, useMergedRefs } from '@uifabric/react-hooks';

const OFF_SCREEN_STYLE = { opacity: 0 };

// In order for some of the max height logic to work
// properly we need to set the border.
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

function useCachedBounds(props: IPositioningContainerProps, targetWindowRef: React.RefObject<Window>) {
  /**
   * The bounds used when determing if and where the
   * PositioningContainer should be placed.
   */
  const positioningBounds = React.useRef<IRectangle>();

  const getBounds = (): IRectangle => {
    if (!positioningBounds.current) {
      let currentBounds = props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + props.minPagePadding!,
          left: 0 + props.minPagePadding!,
          right: (targetWindowRef.current?.innerWidth ?? 0) - props.minPagePadding!,
          bottom: (targetWindowRef.current?.innerHeight ?? 0) - props.minPagePadding!,
          width: (targetWindowRef.current?.innerWidth ?? 0) - props.minPagePadding! * 2,
          height: (targetWindowRef.current?.innerHeight ?? 0) - props.minPagePadding! * 2,
        };
      }
      positioningBounds.current = currentBounds;
    }
    return positioningBounds.current!;
  };

  return getBounds;
}

function usePositions(
  props: IPositioningContainerProps,
  positioningContainerElement: React.RefObject<HTMLDivElement>,
  positionedHost: React.RefObject<HTMLDivElement>,
  target: React.RefObject<HTMLElement | MouseEvent | Point | null>,
  getBounds: () => IRectangle,
  async: Async,
) {
  /**
   * Current set of calcualted positions for the outermost parent container.
   */
  const [positions, setPositions] = React.useState<IPositionedData | undefined>();
  const postitionAttempts = React.useRef<number>(0);

  const updateAsyncPosition = () => {
    async.requestAnimationFrame((): void => {
      const hostElement = positionedHost.current;

      if (hostElement && positioningContainerElement.current) {
        let currentProps: IPositionProps | undefined;
        currentProps = assign(currentProps, props);
        currentProps!.bounds = getBounds();
        currentProps!.target = target.current ?? undefined;
        if (document.body.contains(currentProps!.target as Node)) {
          currentProps!.gapSpace = props.offsetFromTarget;
          const newPositions: IPositionedData = positionElement(
            currentProps!,
            hostElement,
            positioningContainerElement.current!,
          );
          // Set the new position only when the positions are not exists or one of the new positioningContainer
          // positions are different. The position should not change if the position is within 2 decimal places.
          if (
            (!positions && newPositions) ||
            (positions && newPositions && !arePositionsEqual(positions, newPositions) && postitionAttempts.current < 5)
          ) {
            // We should not reposition the positioningContainer more than a few times, if it is then the content is
            // likely resizing and we should stop trying to reposition to prevent a stack overflow.
            postitionAttempts.current++;
            setPositions(newPositions);
            props.onPositioned?.(newPositions);
          } else {
            postitionAttempts.current = 0;
            props.onPositioned?.(newPositions);
          }
        } else if (positions !== undefined) {
          setPositions(undefined);
        }
      }
    });
  };

  React.useEffect(updateAsyncPosition);

  return [positions, updateAsyncPosition] as const;
}

function useTargets(props: IPositioningContainerProps, positionedHost: React.RefObject<HTMLDivElement>) {
  /**
   * Stores an instance of Window, used to check
   * for server side rendering and if focus was lost.
   */
  const targetWindowRef = React.useRef<Window | null>(null);
  const targetRef = React.useRef<HTMLElement | MouseEvent | Point | null>(null);
  const forceUpdate = useForceUpdate();

  // If the target element changed, find the new one. If we are tracking
  // target with class name, always find element because we do not know if
  // fabric has rendered a new element and disposed the old element.
  React.useEffect((): void => {
    const currentElement = positionedHost.current;
    const { target } = props;

    if (target && typeof target !== 'string') {
      if (!!(target as MouseEvent).stopPropagation) {
        targetWindowRef.current = getWindow((target as MouseEvent).target as HTMLElement)!;
        targetRef.current = target;
        forceUpdate();
      } else if (
        // tslint:disable-next-line:deprecation
        ((target as Point).left !== undefined || (target as Point).x !== undefined) &&
        // tslint:disable-next-line:deprecation
        ((target as Point).top !== undefined || (target as Point).y !== undefined)
      ) {
        targetWindowRef.current = getWindow(currentElement)!;
        targetRef.current = target;
        forceUpdate();
      } else {
        const targetElement: HTMLElement = target as HTMLElement;
        targetWindowRef.current = getWindow(targetElement)!;
        targetRef.current = target;
        forceUpdate();
      }
    } else if (!!target) {
      targetWindowRef.current = getWindow(currentElement)!;
      forceUpdate();
    }
  }, [props.target]);

  React.useEffect((): void => {
    const currentElement = positionedHost.current;
    const { target } = props;

    if (target && typeof target === 'string') {
      const currentDoc: Document = getDocument()!;
      targetRef.current = currentDoc ? (currentDoc.querySelector(target) as HTMLElement) : null;
      targetWindowRef.current = getWindow(currentElement)!;
      forceUpdate();
    }
  }, []);

  return [targetRef, targetWindowRef] as const;
}

function useWindowEvents(
  { preventDismissOnScroll, onDismiss }: IPositioningContainerProps,
  async: Async,
  positions: IPositionedData | undefined,
  targetRef: React.RefObject<HTMLElement | MouseEvent | Point | null>,
  targetWindowRef: React.RefObject<Window | null>,
  positionedHost: React.RefObject<HTMLDivElement | null>,
  updateAsyncPosition: () => void,
) {
  const dismissOnLostFocus = (ev: Event): void => {
    const target = ev.target as HTMLElement;
    const clickedOutsideCallout = positionedHost.current && !elementContains(positionedHost.current, target);

    if (
      (!targetRef.current && clickedOutsideCallout) ||
      (ev.target !== targetWindowRef.current &&
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
      events.on(
        targetWindowRef.current,
        'scroll',
        async.throttle((ev: Event) => {
          if (positions && !preventDismissOnScroll) {
            dismissOnLostFocus(ev);
          }
        }, 10),
        true,
      );
      events.on(targetWindowRef.current, 'resize', async.throttle(onResize, 10), true);
      events.on(targetWindowRef.current?.document?.body, 'focus', dismissOnLostFocus, true);
      events.on(targetWindowRef.current?.document?.body, 'click', dismissOnLostFocus, true);
    }, 0);

    return () => {
      events.dispose();
    };
  }, []);

  const onResize = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    if (onDismiss) {
      onDismiss(ev);
    } else {
      updateAsyncPosition();
    }
  };
}

function useHeightOffset(
  { finalHeight }: IPositioningContainerProps,
  contentHost: React.RefObject<HTMLDivElement | null>,
  async: Async,
) {
  /**
   * Tracks the current height offset and updates during
   * the height animation when props.finalHeight is specified.
   */
  const [heightOffset, setHeightOffset] = React.useState(0);
  const setHeightOffsetTimer = React.useRef<number>(0);

  /**
   * Animates the height if finalHeight was given.
   */
  const setHeightOffsetEveryFrame = () => {
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

        if (positioningContainerMainElem.offsetHeight < finalHeight!) {
          setHeightOffsetEveryFrame();
        } else {
          async.cancelAnimationFrame(setHeightOffsetTimer.current);
        }
      });
    }
  };

  React.useEffect(setHeightOffsetEveryFrame, [finalHeight]);

  return heightOffset;
}

function useInitialFocus(
  contentHost: React.RefObject<HTMLDivElement>,
  props: IPositioningContainerProps,
  positions: IPositionedData | undefined,
) {
  const didSetInitialFocus = React.useRef(false);
  React.useEffect(() => {
    if (!didSetInitialFocus.current && contentHost.current && props.setInitialFocus && positions) {
      didSetInitialFocus.current = true;
      focusFirstChild(contentHost.current);
    }
  });
}

function useMaxHeight(
  { directionalHintFixed, offsetFromTarget, directionalHint }: IPositioningContainerProps,
  targetRef: React.RefObject<HTMLElement | MouseEvent | Point | null>,
  getBounds: () => IRectangle,
) {
  /**
   * The maximum height the PositioningContainer can grow to
   * without going being the window or target bounds
   */
  const maxHeight = React.useRef<number | undefined>();

  React.useEffect(() => {
    maxHeight.current = undefined;
  }, [offsetFromTarget]);

  /**
   * Return the maximum height the container can grow to
   * without going out of the specified bounds
   */
  const getMaxContainerHeight = (): number => {
    if (!maxHeight.current) {
      if (directionalHintFixed && targetRef.current) {
        const gapSpace = offsetFromTarget ? offsetFromTarget : 0;
        maxHeight.current = getMaxHeight(targetRef.current, directionalHint!, gapSpace, getBounds());
      } else {
        maxHeight.current = getBounds().height! - BORDER_WIDTH * 2;
      }
    }
    return maxHeight.current!;
  };

  return getMaxContainerHeight;
}

export const PositioningContainer = React.forwardRef(
  (propsWithoutDefaults: IPositioningContainerProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
    const async = useAsync();

    // @TODO rename to reflect the name of this class
    const contentHost = React.useRef<HTMLDivElement>(null);
    /**
     * The primary positioned div.
     */
    const positionedHost = React.useRef<HTMLDivElement>(null);
    const rootRef = useMergedRefs(positionedHost, forwardedRef);
    const [targetRef, targetWindowRef] = useTargets(props, positionedHost);

    const getBounds = useCachedBounds(props, targetWindowRef);
    const getMaxContainerHeight = useMaxHeight(props, targetRef, getBounds);
    const [positions, updateAsyncPosition] = usePositions(
      props,
      contentHost,
      positionedHost,
      targetRef,
      getBounds,
      async,
    );
    const heightOffset = useHeightOffset(props, contentHost, async);

    useWindowEvents(props, async, positions, targetRef, targetWindowRef, positionedHost, updateAsyncPosition);

    React.useEffect(() => props.onLayerMounted?.(), []);

    useInitialFocus(contentHost, props, positions);

    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!targetWindowRef.current) {
      return null;
    }

    const { className, positioningContainerWidth, positioningContainerMaxHeight, children } = props;

    const styles = getClassNames();

    const directionalClassName =
      positions && positions.targetEdge ? AnimationClassNames[SLIDE_ANIMATIONS[positions.targetEdge]] : '';

    const getContentMaxHeight: number = getMaxContainerHeight() + heightOffset!;
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
          // tslint:disable-next-line:jsx-ban-props
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

function arePositionsEqual(positions: IPositionedData, newPosition: IPositionedData): boolean {
  return comparePositions(positions.elementPosition, newPosition.elementPosition);
}
