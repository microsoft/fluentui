import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent, getRect, createRef, getWindow } from '../../Utilities';

export interface IViewport {
  width: number;
  height: number;
}

export interface IWithViewportState {
  viewport?: IViewport;
}

export interface IWithViewportProps {
  skipViewportMeasures?: boolean;
}

const RESIZE_DELAY = 500;
const MAX_RESIZE_ATTEMPTS = 3;

export function withViewport<TProps extends { viewport?: IViewport }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>
): any {
  return class WithViewportComponent extends BaseDecorator<TProps, IWithViewportState> {
    private _root = createRef<HTMLDivElement>();
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
      this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
        leading: false
      });

      const window = getWindow();
      const viewportElement = this._root.current;

      // ResizeObserver seems always fire even window is not resized. This is
      // particularly bad when skipViewportMeasures is set when optimizing fixed layout lists.
      // It will measure and update and re-render the entire list after list is fully rendered.
      // So fallback to listen to resize event when skipViewportMeasures is set.
      if (!skipViewportMeasures && window && (window as any).ResizeObserver) {
        this._viewportResizeObserver = new (window as any).ResizeObserver(this._onAsyncResize);
        this._viewportResizeObserver.observe(viewportElement);
      } else {
        this._events.on(window, 'resize', this._onAsyncResize);
      }

      if (!skipViewportMeasures) {
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
      const { skipViewportMeasures } = this.props as IWithViewportProps;
      const isViewportVisible = skipViewportMeasures || (viewport!.width > 0 && viewport!.height > 0);

      return (
        <div className="ms-Viewport" ref={this._root} style={{ minWidth: 1, minHeight: 1 }}>
          {isViewportVisible && <ComposedComponent ref={this._updateComposedComponentRef} viewport={viewport} {...this.props as any} />}
        </div>
      );
    }

    public forceUpdate(): void {
      this._updateViewport(true);
    }

    private _onAsyncResize(): void {
      this._updateViewport();
    }

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
