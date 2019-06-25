import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDebouncedTimeout } from './useDecouncedTimeout';
import { usePreviousValue } from './usePreviousValue';

export interface IViewportProps {
  height: number;
  width: number;
  children: (viewportState: IViewportState) => JSX.Element[] | JSX.Element;
}

export type CoordinateTuple<T> = [T, T];

export enum ScrollDirection {
  none,
  backward,
  forward
}

export interface IViewportState {
  isScrolling: boolean;
  scrollDistance: CoordinateTuple<number>;
  scrollDirection: CoordinateTuple<ScrollDirection>;
}

export enum Coord {
  X = 0,
  Y = 1
}

const SCROLL_DISTANCE_ORIGIN: CoordinateTuple<Coord> = [0, 0];
const NO_SCROLL_DIRECTION: CoordinateTuple<ScrollDirection> = [ScrollDirection.none, ScrollDirection.none];

const RESET_SCROLLING_TIMEOUT_IN_MILLISECONDS = 500;

function getScrollDirection(scrollDistance: number, prevScrollDistance: number): ScrollDirection {
  let scrollDirection = ScrollDirection.none;
  if (scrollDistance > prevScrollDistance) {
    scrollDirection = ScrollDirection.forward;
  } else if (scrollDistance < prevScrollDistance) {
    scrollDirection = ScrollDirection.backward;
  }

  return scrollDirection;
}

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

    const [scheduleResetScrollingTimeout, clearResetScrollingTimeout] = useDebouncedTimeout(() => {
      setViewportState((currentViewportState: IViewportState) => {
        return {
          isScrolling: false,
          scrollDistance: currentViewportState.scrollDistance,
          scrollDirection: NO_SCROLL_DIRECTION
        };
      });
    }, RESET_SCROLLING_TIMEOUT_IN_MILLISECONDS);

    useEffect(() => {
      if (scrollContainerRef.current) {
        const onScroll = (event: Event) => {
          // tslint:disable-next-line:no-any
          const { scrollLeft: scrollX, scrollTop: scrollY } = ((event as any) as React.UIEvent<HTMLDivElement>).currentTarget;

          const scrollDirectionX = getScrollDirection(scrollX, (prevViewportState && prevViewportState.scrollDistance[Coord.X]) || 0);
          const scrollDirectionY = getScrollDirection(scrollY, (prevViewportState && prevViewportState.scrollDistance[Coord.Y]) || 0);

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

          clearResetScrollingTimeout();
        };
      }
    }, []);

    return (
      <div
        ref={scrollContainerRef}
        data-is-scrollable={true} // some Fabric components need this to detect their parent scroll container more efficiently
        // tslint:disable-next-line:jsx-ban-props
        style={{
          position: 'relative',
          height,
          width,
          willChange: 'scroll-position', // paints the scroll container on its own layer
          overflow: 'auto'
        }}
      >
        {children(viewportState)}
      </div>
    );
  }
);
