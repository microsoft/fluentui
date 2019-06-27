import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDebouncedTimeout } from './useDebouncedTimeout';
import { usePreviousValue } from './usePreviousValue';

export interface IViewportProps {
  /**
   * The height of the scroll container (in pixels).
   */
  height: number;

  /**
   * The width of the scroll container (in pixels).
   */
  width: number;

  /**
   * The child component is a function component which receives the scroll container's current scroll state as its only argument.
   */
  children: (viewportState: IViewportState) => JSX.Element[] | JSX.Element;
}

export type Vector2D<T> = [T, T];

export enum Axis {
  X = 0,
  Y = 1
}

export enum ScrollDirection {
  none,
  backward,
  forward
}

export interface IViewportState {
  /**
   * Whether the user is currently scrolling.
   */
  isScrolling: boolean;

  /**
   * Vector representing the distance scrolled from the top left corner, i.e. the point [0, 0], in the form
   * [x, y] where x denotes the horizontal and y denotes the vertical scroll distance.
   */
  scrollDistance: Vector2D<number>;

  /**
   * Vector representing the current scroll direction in the form [x, y] where x denotes the horizontal and y
   * denotes the vertical scroll direction.
   */
  scrollDirection: Vector2D<ScrollDirection>;
}

const SCROLL_DISTANCE_ORIGIN: Vector2D<Axis> = [0, 0];
const NO_SCROLL_DIRECTION: Vector2D<ScrollDirection> = [ScrollDirection.none, ScrollDirection.none];

const SCROLLING_RESET_TIMEOUT_IN_MILLISECONDS = 200;

/**
 * Determines the scroll direction based on the given current and previous scroll distance.
 * @param scrollDistance The new scroll distance
 * @param prevScrollDistance The previous scroll distance
 */
function getScrollDirection(scrollDistance: number, prevScrollDistance: number): ScrollDirection {
  let scrollDirection = ScrollDirection.none;
  if (scrollDistance > prevScrollDistance) {
    scrollDirection = ScrollDirection.forward;
  } else if (scrollDistance < prevScrollDistance) {
    scrollDirection = ScrollDirection.backward;
  }

  return scrollDirection;
}

/**
 * Viewport represents a scrollable container that maintains information about its current scroll state.
 * The component takes a function component as its child component, using the current scroll state as its only argument.
 */
export const Viewport = React.memo(
  (props: IViewportProps): JSX.Element => {
    const { height, width, children } = props;

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [viewportState, setViewportState] = useState<IViewportState>({
      isScrolling: false,
      scrollDistance: SCROLL_DISTANCE_ORIGIN,
      scrollDirection: NO_SCROLL_DIRECTION
    });
    const prevViewportState = usePreviousValue(viewportState);

    const [scheduleResetScrollingTimeout, clearScrollingResetTimeout] = useDebouncedTimeout(() => {
      setViewportState((currentViewportState: IViewportState) => {
        return {
          isScrolling: false,
          scrollDistance: currentViewportState.scrollDistance,
          scrollDirection: NO_SCROLL_DIRECTION
        };
      });
    }, SCROLLING_RESET_TIMEOUT_IN_MILLISECONDS);

    useEffect(() => {
      if (scrollContainerRef.current) {
        const onScroll = (event: Event) => {
          // tslint:disable-next-line:no-any
          const { scrollLeft: scrollX, scrollTop: scrollY } = ((event as any) as React.UIEvent<HTMLDivElement>).currentTarget;

          const scrollDirectionX = getScrollDirection(
            scrollX,
            (prevViewportState && prevViewportState.scrollDistance[Axis.X]) || SCROLL_DISTANCE_ORIGIN[Axis.X]
          );
          const scrollDirectionY = getScrollDirection(
            scrollY,
            (prevViewportState && prevViewportState.scrollDistance[Axis.Y]) || SCROLL_DISTANCE_ORIGIN[Axis.Y]
          );

          setViewportState({
            isScrolling: true,
            scrollDistance: [scrollX, scrollY],
            scrollDirection: [scrollDirectionX, scrollDirectionY]
          });

          scheduleResetScrollingTimeout();
        };

        scrollContainerRef.current.addEventListener<'scroll'>('scroll', onScroll);

        return () => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.removeEventListener('scroll', onScroll);
          }

          clearScrollingResetTimeout();
        };
      }
    }, []);

    const style: React.CSSProperties = {
      position: 'relative',
      height,
      width,
      willChange: 'scroll-position', // paints the scroll container on its own layer
      overflow: 'auto'
    };

    return (
      <div
        ref={scrollContainerRef}
        data-is-scrollable={true} // some Fabric components need this to detect their parent scroll container more efficiently
        style={style} // tslint:disable-line:jsx-ban-props
      >
        {children(viewportState)}
      </div>
    );
  }
);
