import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

export interface IViewportProps {
  height: number;
  width: number;
  children: (viewportState: IViewportState) => JSX.Element[] | JSX.Element;
}

export interface IViewportState {
  isScrolling: boolean;
  scrollOffset: number;
}

const DONE_SCROLLING_TIMEOUT_IN_MILLISECONDS = 500;
const NO_PENDING_DONE_SCROLLING_TIMEOUT = -1;

export const Viewport = (props: IViewportProps) => {
  const { height, width, children } = props;

  const elRef = useRef<HTMLDivElement>(null);
  const [elStyle] = useState({
    height,
    width,
    willChange: 'scroll-position', // paints the scroll container on its own layer
    overflow: 'auto'
  });

  const [viewportState, setViewportState] = useState({
    isScrolling: false,
    scrollOffset: 0
  });

  useEffect(() => {
    if (elRef.current) {
      const onScroll = (event: Event) => {
        const { scrollTop } = ((event as any) as React.UIEvent<HTMLDivElement>).currentTarget; // tslint:disable-line:no-any

        setViewportState({
          isScrolling: true,
          scrollOffset: scrollTop
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

  const doneScrollingTimeoutId = useRef(-1);
  const scheduleDoneScrolling = () => {
    if (doneScrollingTimeoutId.current !== NO_PENDING_DONE_SCROLLING_TIMEOUT) {
      window.clearTimeout(doneScrollingTimeoutId.current);
    }

    doneScrollingTimeoutId.current = window.setTimeout(() => {
      setViewportState((prevViewportState: IViewportState) => {
        return {
          isScrolling: false,
          scrollOffset: prevViewportState.scrollOffset
        };
      });

      doneScrollingTimeoutId.current = NO_PENDING_DONE_SCROLLING_TIMEOUT;
    }, DONE_SCROLLING_TIMEOUT_IN_MILLISECONDS);
  };
  useEffect(() => {
    return () => {
      if (doneScrollingTimeoutId.current !== NO_PENDING_DONE_SCROLLING_TIMEOUT) {
        window.clearTimeout(doneScrollingTimeoutId.current);
      }
    };
  }, []);

  return (
    <div
      ref={elRef}
      data-is-scrollable={true} // some Fabric components need this to detect their parent scroll container more efficiently
      style={elStyle} // tslint:disable-line:jsx-ban-props
    >
      {children(viewportState)}
    </div>
  );
};
