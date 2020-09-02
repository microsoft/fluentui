import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDebouncedTimeout } from './useDebouncedTimeout';
import { usePreviousValue } from './usePreviousValue';

import { Vector2D, ScrollDirection, Axis, IViewportProps, IViewportState } from './Viewport.types';

const SCROLL_DISTANCE_ORIGIN: Vector2D<number> = [0, 0];
const NO_SCROLL_DIRECTION: Vector2D<ScrollDirection> = [ScrollDirection.none, ScrollDirection.none];

const STOPPED_SCROLLING_TIMEOUT_IN_MILLISECONDS = 200;

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
 *
 * Note: The caller may wish to wrap this component with React.memo, in case they make sure that the 'children' function
 * doesn't mutate on every render.
 */
export const Viewport = (props: IViewportProps): JSX.Element => {
  const { height, width, children } = props;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [viewportState, setViewportState] = useState<IViewportState>({
    isScrolling: false,
    scrollDistance: SCROLL_DISTANCE_ORIGIN,
    scrollDirection: NO_SCROLL_DIRECTION,
  });
  const prevViewportState = usePreviousValue(viewportState);

  const [scheduleStoppedScrollingTimeout, clearStoppedScrollingTimeout] = useDebouncedTimeout(() => {
    setViewportState((currentViewportState: IViewportState) => {
      return {
        isScrolling: false,
        scrollDistance: currentViewportState.scrollDistance,
        scrollDirection: NO_SCROLL_DIRECTION,
      };
    });
  }, STOPPED_SCROLLING_TIMEOUT_IN_MILLISECONDS);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const onScroll = (event: Event) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { scrollLeft: scrollX, scrollTop: scrollY } = ((event as any) as React.UIEvent<
          HTMLDivElement
        >).currentTarget;

        const scrollDirectionX = getScrollDirection(
          scrollX,
          (prevViewportState && prevViewportState.scrollDistance[Axis.X]) || SCROLL_DISTANCE_ORIGIN[Axis.X],
        );
        const scrollDirectionY = getScrollDirection(
          scrollY,
          (prevViewportState && prevViewportState.scrollDistance[Axis.Y]) || SCROLL_DISTANCE_ORIGIN[Axis.Y],
        );

        setViewportState({
          isScrolling: true,
          scrollDistance: [scrollX, scrollY],
          scrollDirection: [scrollDirectionX, scrollDirectionY],
        });

        scheduleStoppedScrollingTimeout();
      };

      scrollContainerRef.current.addEventListener<'scroll'>('scroll', onScroll, {
        passive: true, // https://developers.google.com/web/updates/2016/06/passive-event-listeners
      });

      return () => {
        if (scrollContainerRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          scrollContainerRef.current.removeEventListener('scroll', onScroll);
        }

        clearStoppedScrollingTimeout();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: React.CSSProperties = {
    position: 'relative',
    height,
    width,
    overflow: 'auto',

    // Enable momentum-based scrolling for iOS browsers
    WebkitOverflowScrolling: 'touch',
  };

  return (
    <div
      ref={scrollContainerRef}
      // some Fabric components need this to detect their parent scroll container more efficiently
      data-is-scrollable={true}
      style={style}
    >
      {children(viewportState)}
    </div>
  );
};
