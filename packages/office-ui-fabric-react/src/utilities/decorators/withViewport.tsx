import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent, getRect, getWindow, Async, EventGroup } from '../../Utilities';

/**
 * Viewport rectangle dimensions.
 *
 * {@docCategory DetailsList}
 */
export interface IViewport {
  /**
   * Width in pixels.
   */
  width: number;
  /**
   * Height in pixels.
   */
  height: number;
}

export interface IWithViewportState {
  viewport?: IViewport;
}

/**
 * Props interface for the withViewport component.
 *
 * {@docCategory DetailsList}
 */
export interface IWithViewportProps {
  /**
   * Whether or not to use ResizeObserver (if available) to detect
   * and measure viewport on 'resize' events.
   *
   * Falls back to window 'resize' event.
   *
   * @defaultValue false
   */
  skipViewportMeasures?: boolean;
}

const RESIZE_DELAY = 500;

/**
 * A decorator to update decorated component on viewport or window resize events.
 *
 * @param ComposedComponent decorated React component reference.
 */
export function withViewport<TProps extends { viewport?: IViewport }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>,
): any {
  /**
   * Hook-based wrapper component which measures the size of a 'viewport' div within its scrollable
   * region and passes the measured size to its wrapped content.
   */
  // tslint:disable-next-line:function-name max-line-length
  function WithViewportBase(props: TProps, forwardedRef: React.Ref<React.Component<TProps, TState>>): JSX.Element {
    const { skipViewportMeasures } = props as IWithViewportProps;

    const [viewport, setViewport] = React.useState<IViewport | undefined>();

    const setViewportRef = React.useRef<typeof setViewport>();
    setViewportRef.current = setViewport;

    React.useEffect(() => {
      return () => {
        setViewportRef.current = undefined;
      };
    }, []);

    const rootRef = React.useRef<HTMLDivElement | null>(null);

    function updateViewport(): void {
      const viewportElement = rootRef.current;
      const scrollElement = viewportElement && findScrollableParent(viewportElement);
      const scrollRect = scrollElement && getRect(scrollElement);
      const clientRect = viewportElement && getRect(viewportElement);

      const width = clientRect && clientRect.width;
      const height = scrollRect && scrollRect.height;

      if (setViewportRef.current) {
        setViewportRef.current((previousViewport: IViewport | undefined) => {
          if (!previousViewport ||
            (width && width !== previousViewport.width) ||
            (height && height !== previousViewport.height)) {
            if (width && height) {
              return {
                width,
                height
              };
            }
          }

          return previousViewport;
        });
      }
    }

    React.useLayoutEffect(() => {
      // Use a layout effect for compatibility with existing unit tests.
      if (!skipViewportMeasures) {
        updateViewport();
      }
    }, [skipViewportMeasures]);

    React.useLayoutEffect(() => {
      // Use a layout effect for compatibility with existing unit tests.
      const viewportElement = rootRef.current;
      const currentWindow = viewportElement && getWindow(viewportElement);

      const isResizeObserverAvailable = !!currentWindow && !!(currentWindow as any).ResizeObserver;

      if (!skipViewportMeasures && isResizeObserverAvailable) {
        if (currentWindow && viewportElement) {
          const async = new Async();

          const onAsyncResize = async.debounce(updateViewport, RESIZE_DELAY, { leading: false });

          const resizeObserver = new (currentWindow as any).ResizeObserver(onAsyncResize);
          resizeObserver.observe(viewportElement);

          return () => {
            async.dispose();
            resizeObserver.disconnect();
          };
        }
      } else {
        if (currentWindow) {
          const events = new EventGroup(null);
          const async = new Async();

          const onAsyncResize = async.debounce(updateViewport, RESIZE_DELAY, { leading: false });

          events.on(currentWindow, 'resize', onAsyncResize);

          return () => {
            events.dispose();
            async.dispose();
          };
        }
      }
    }, [skipViewportMeasures]);

    const componentElement = React.useMemo(() => {
      return <ComposedComponent ref={forwardedRef} viewport={viewport} {...props} />;
    }, [viewport, props, forwardedRef]);

    return (
      <div className="ms-Viewport" ref={rootRef} style={{ minWidth: 1, minHeight: 1 }}>
        {componentElement}
      </div>
    );
  }

  const WithViewport = React.forwardRef(WithViewportBase);

  /**
   * Old-style React component used to wrap hook-based logic to avoid
   * changing the contract for callers.
   */
  class WithViewportComponent extends BaseDecorator<TProps, IWithViewportState> {
    public render(): JSX.Element {
      return <WithViewport {...(this.props as any)} ref={this._updateComposedComponentRef} />;
    }
  }

  return WithViewportComponent;
}
