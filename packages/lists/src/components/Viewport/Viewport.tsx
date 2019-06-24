import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

export interface IViewportProps {
  height: number;
  width: number;
  children: (viewportState: IViewportState) => JSX.Element[] | JSX.Element;
}

export enum ScrollDirection {
  none,
  backward,
  forward
}

export enum ScrollType {
  none,
  user,
  programmatic
}

export interface IViewportState {
  isScrolling: boolean;
  scrollDistance: number;
  scrollDirection: ScrollDirection;
  scrollType: ScrollType;
}

const SCROLLING_TIMEOUT_IN_MILLISECONDS = 500;
const NO_PENDING_SCROLLING_TIMEOUT = -1;

export const Viewport = (props: IViewportProps) => {
  const { height, width, children } = props;

  const elRef = useRef<HTMLDivElement>(null);
  const doneScrollingTimeoutId = useRef(-1);

  const [viewportState, setViewportState] = useState<IViewportState>({
    isScrolling: false,
    scrollDistance: 0,
    scrollDirection: ScrollDirection.none,
    scrollType: ScrollType.none
  });

  const scheduleDoneScrolling = () => {
    if (doneScrollingTimeoutId.current !== NO_PENDING_SCROLLING_TIMEOUT) {
      window.clearTimeout(doneScrollingTimeoutId.current);
    }

    doneScrollingTimeoutId.current = window.setTimeout(() => {
      setViewportState((prevViewportState: IViewportState) => {
        return {
          isScrolling: false,
          scrollDistance: prevViewportState.scrollDistance,
          scrollDirection: ScrollDirection.none,
          scrollType: ScrollType.none
        };
      });

      doneScrollingTimeoutId.current = NO_PENDING_SCROLLING_TIMEOUT;
    }, SCROLLING_TIMEOUT_IN_MILLISECONDS);
  };

  useEffect(() => {
    if (elRef.current) {
      const onScroll = (event: Event) => {
        const { scrollTop } = ((event as any) as React.UIEvent<HTMLDivElement>).currentTarget; // tslint:disable-line:no-any

        setViewportState({
          isScrolling: true,
          scrollDistance: scrollTop,
          scrollDirection: ScrollDirection.none,
          scrollType: ScrollType.none
        });

        scheduleDoneScrolling();
      };

      elRef.current.addEventListener<'scroll'>('scroll', onScroll);

      return () => {
        if (elRef.current) {
          elRef.current.removeEventListener('scroll', onScroll);
        }
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (doneScrollingTimeoutId.current !== NO_PENDING_SCROLLING_TIMEOUT) {
        window.clearTimeout(doneScrollingTimeoutId.current);
      }
    };
  }, []);

  return (
    <div
      ref={elRef}
      // tslint:disable-next-line:jsx-ban-props
      style={{
        position: 'relative',
        height,
        width
      }}
    >
      <div
        data-is-scrollable={true} // some Fabric components need this to detect their parent scroll container more efficiently
        // tslint:disable-next-line:jsx-ban-props
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          willChange: 'scroll-position', // paints the scroll container on its own layer
          overflow: 'auto'
        }}
      >
        {children(viewportState)}
      </div>
    </div>
  );
};
