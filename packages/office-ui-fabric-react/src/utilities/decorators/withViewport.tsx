import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent, getRect, getWindow } from '../../Utilities';

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
const MAX_RESIZE_ATTEMPTS = 3;

/**
 * A decorator to update decorated component on viewport or window resize events.
 *
 * @param ComposedComponent decorated React component reference.
 */
export function withViewport<TProps extends { viewport?: IViewport }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>
): any {
  return class WithViewportComponent extends BaseDecorator<TProps, IWithViewportState> {
    private _root = React.createRef<HTMLDivElement>();
    private _resizeAttempts: number;
    private _viewportResizeObserver: any;

    constructor(props: TProps) {
      super(props);
      this._resizeAttempts = 0;

      this.state = {
        viewport: {
          width: 0,
          height: 0
        }
      };
    }

    public componentDidMount(): void {
      const { skipViewportMeasures } = this.props as IWithViewportProps;
      const win = getWindow(this._root.current);

      this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
        leading: false
      });

      // ResizeObserver seems always fire even window is not resized. This is
      // particularly bad when skipViewportMeasures is set when optimizing fixed layout lists.
      // It will measure and update and re-render the entire list after list is fully rendered.
      // So fallback to listen to resize event when skipViewportMeasures is set.
      if (!skipViewportMeasures && this._isResizeObserverAvailable()) {
        this._registerResizeObserver();
      } else {
        this._events.on(win, 'resize', this._onAsyncResize);
      }

      if (!skipViewportMeasures) {
        this._updateViewport();
      }
    }

    public componentDidUpdate(newProps: TProps) {
      const { skipViewportMeasures: oldSkipViewportMeasures } = this.props as IWithViewportProps;
      const { skipViewportMeasures: newSkipViewportMeasures } = newProps as IWithViewportProps;
      const win = getWindow(this._root.current);

      if (oldSkipViewportMeasures !== newSkipViewportMeasures) {
        if (newSkipViewportMeasures) {
          this._unregisterResizeObserver();
          this._events.on(win, 'resize', this._onAsyncResize);
        } else if (!newSkipViewportMeasures && this._isResizeObserverAvailable()) {
          this._events.off(win, 'resize', this._onAsyncResize);
          this._registerResizeObserver();
        }
      }

      if (!!newSkipViewportMeasures) {
        this._updateViewport();
      }
    }

    public componentWillUnmount(): void {
      this._events.dispose();

      if (this._viewportResizeObserver) {
        this._viewportResizeObserver.disconnect();
      }
    }

    public render(): JSX.Element {
      const { viewport } = this.state;
      const newViewport = viewport!.width > 0 && viewport!.height > 0 ? viewport : undefined;

      return (
        <div className="ms-Viewport" ref={this._root} style={{ minWidth: 1, minHeight: 1 }}>
          <ComposedComponent ref={this._updateComposedComponentRef} viewport={newViewport} {...this.props as any} />
        </div>
      );
    }

    public forceUpdate(): void {
      this._updateViewport(true);
    }

    private _onAsyncResize(): void {
      this._updateViewport();
    }

    private _isResizeObserverAvailable(): boolean {
      const win = getWindow(this._root.current);

      return win && (win as any).ResizeObserver;
    }

    private _registerResizeObserver = () => {
      const win = getWindow(this._root.current);

      this._viewportResizeObserver = new (win as any).ResizeObserver(this._onAsyncResize);
      this._viewportResizeObserver.observe(this._root.current);
    };

    private _unregisterResizeObserver = () => {
      if (this._viewportResizeObserver) {
        this._viewportResizeObserver.disconnect();
        this._viewportResizeObserver = null;
      }
    };

    /* Note: using lambda here because decorators don't seem to work in decorators. */
    private _updateViewport = (withForceUpdate?: boolean) => {
      const { viewport } = this.state;
      const viewportElement = this._root.current;
      const scrollElement = findScrollableParent(viewportElement);
      const scrollRect = getRect(scrollElement);
      const clientRect = getRect(viewportElement);
      const updateComponent = () => {
        if (withForceUpdate && this._composedComponentInstance) {
          this._composedComponentInstance.forceUpdate();
        }
      };

      const isSizeChanged = (clientRect && clientRect.width) !== viewport!.width || (scrollRect && scrollRect.height) !== viewport!.height;

      if (isSizeChanged && this._resizeAttempts < MAX_RESIZE_ATTEMPTS && clientRect && scrollRect) {
        this._resizeAttempts++;
        this.setState(
          {
            viewport: {
              width: clientRect.width,
              height: scrollRect.height
            }
          },
          () => {
            this._updateViewport(withForceUpdate);
          }
        );
      } else {
        this._resizeAttempts = 0;
        updateComponent();
      }
    };
  };
}
