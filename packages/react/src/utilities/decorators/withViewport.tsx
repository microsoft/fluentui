import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent, getRect, getWindow, Async, EventGroup } from '../../Utilities';

import type { JSXElement } from '@fluentui/utilities';

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
   * Whether or not `withViewport` should disable its viewport measurements, effectively making this decorator
   * pass-through with no impact on the rendered component.
   *
   * Since `withViewport` measures the `viewport` on mount, after each React update, and in response to events,
   * it may cause a component which does not currently need this information due to its configuration to re-render
   * too often. `skipViewportMeasures` may be toggled on and off based on current state, and will suspend and resume
   * measurement as-needed.
   *
   * For example, when this wraps `DetailsList`, set `skipViewportMeasures` to `true` when the `layoutMode` is
   * `fixedColumns`, since the `DetailsList` does not use the viewport size in any calculations.
   *
   * In addition, consider setting `skipViewportMeasures` to `true` when running within a React test renderer, to avoid
   * direct DOM dependencies.
   */

  skipViewportMeasures?: boolean;
  /**
   * Whether or not to explicitly disable usage of the `ResizeObserver` in favor of a `'resize'` event on `window`,
   * even if the browser supports `ResizeObserver`. This may be necessary if use of `ResizeObserver` results in too
   * many re-renders of the wrapped component due to the frequency at which events are fired.
   *
   * This has no impact if `skipViewportMeasures` is `true`, as no viewport measurement strategy is used.
   */
  disableResizeObserver?: boolean;

  /**
   * Whether or not `withViewport` will delay before first measuring the viewport size.
   * Setting this will delay measurement by the same amount as the debounce for resizing the window.
   * This is useful for giving the child of the viewport time to render before measuring.
   *
   * This is an opt-in setting as existing systems have a dependency on immediate measurement for performance.
   * @default false
   */
  delayFirstMeasure?: boolean;
}

const RESIZE_DELAY = 500;
const MAX_RESIZE_ATTEMPTS = 3;

/**
 * A decorator to update decorated component on viewport or window resize events.
 *
 * @param ComposedComponent - decorated React component reference.
 */
export function withViewport<TProps extends { viewport?: IViewport }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>,
): any {
  return class WithViewportComponent extends BaseDecorator<TProps, IWithViewportState> {
    private _root = React.createRef<HTMLDivElement>();
    private _resizeAttempts: number;
    private _viewportResizeObserver: any;
    private _resizeWindow?: Window;
    private _async: Async;
    private _events: EventGroup;

    constructor(props: TProps) {
      super(props);

      this._async = new Async(this);
      this._events = new EventGroup(this);
      this._resizeAttempts = 0;

      this.state = {
        viewport: {
          width: 0,
          height: 0,
        },
      };
    }

    public componentDidMount(): void {
      const { delayFirstMeasure, skipViewportMeasures } = this.props as IWithViewportProps;
      const win = getWindow(this._root.current);

      this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
        leading: false,
      });

      if (!skipViewportMeasures) {
        this._registerResizeHandler(win);

        if (delayFirstMeasure) {
          this._async.setTimeout(() => {
            this._updateViewport();
          }, RESIZE_DELAY);
        } else {
          this._updateViewport();
        }
      }
    }

    public componentDidUpdate(previousProps: TProps) {
      const { skipViewportMeasures: previousSkipViewportMeasures } = previousProps as IWithViewportProps;
      const { skipViewportMeasures } = this.props as IWithViewportProps;
      const win = getWindow(this._root.current);
      const hasWindowChanged = win !== this._resizeWindow;

      if (!skipViewportMeasures && (previousSkipViewportMeasures || hasWindowChanged)) {
        this._unregisterResizeHandler();
        this._registerResizeHandler(win);
        this._updateViewport();
      } else if (skipViewportMeasures && !previousSkipViewportMeasures) {
        this._unregisterResizeHandler();
      }
    }

    public componentWillUnmount(): void {
      this._unregisterResizeHandler();
      this._events.dispose();
      this._async.dispose();
    }

    public render(): JSXElement {
      const { viewport } = this.state;
      const newViewport = viewport!.width > 0 && viewport!.height > 0 ? viewport : undefined;

      return (
        <div className="ms-Viewport" ref={this._root} style={{ minWidth: 1, minHeight: 1 }}>
          <ComposedComponent ref={this._updateComposedComponentRef} viewport={newViewport} {...(this.props as any)} />
        </div>
      );
    }

    public forceUpdate(): void {
      this._updateViewport(true);
    }

    private _onAsyncResize(): void {
      this._updateViewport();
    }

    private _registerResizeHandler = (win: Window | undefined): void => {
      if (!win) {
        return;
      }

      const { disableResizeObserver } = this.props as IWithViewportProps;
      this._resizeWindow = win;

      if (!disableResizeObserver && this._isResizeObserverAvailable(win)) {
        this._registerResizeObserver(win);
      } else {
        this._events.on(win, 'resize', this._onAsyncResize);
      }
    };

    private _unregisterResizeHandler = (): void => {
      this._unregisterResizeObserver();

      if (this._resizeWindow) {
        this._events.off(this._resizeWindow, 'resize', this._onAsyncResize);
        this._resizeWindow = undefined;
      }
    };

    private _isResizeObserverAvailable(win: Window | undefined): boolean {
      return !!win && !!(win as any).ResizeObserver;
    }

    private _registerResizeObserver = (win: Window): void => {
      this._viewportResizeObserver = new (win as any).ResizeObserver(this._onAsyncResize);
      this._viewportResizeObserver.observe(this._root.current);
    };

    private _unregisterResizeObserver = () => {
      if (this._viewportResizeObserver) {
        this._viewportResizeObserver.disconnect();
        delete this._viewportResizeObserver;
      }
    };

    /* Note: using lambda here because decorators don't seem to work in decorators. */
    private _updateViewport = (withForceUpdate?: boolean) => {
      const { viewport } = this.state;
      const viewportElement = this._root.current;
      const win = getWindow(viewportElement);
      const scrollElement = findScrollableParent(viewportElement) as HTMLElement;
      const scrollRect = getRect(scrollElement, win);
      const clientRect = getRect(viewportElement, win);
      const updateComponent = () => {
        if (withForceUpdate && this._composedComponentInstance) {
          this._composedComponentInstance.forceUpdate();
        }
      };

      const isSizeChanged =
        (clientRect && clientRect.width) !== viewport!.width || (scrollRect && scrollRect.height) !== viewport!.height;

      if (isSizeChanged && this._resizeAttempts < MAX_RESIZE_ATTEMPTS && clientRect && scrollRect) {
        this._resizeAttempts++;
        this.setState(
          {
            viewport: {
              width: clientRect.width,
              height: scrollRect.height,
            },
          },
          () => {
            this._updateViewport(withForceUpdate);
          },
        );
      } else {
        this._resizeAttempts = 0;
        updateComponent();
      }
    };
  };
}
