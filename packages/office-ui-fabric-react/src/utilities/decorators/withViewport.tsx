import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent } from '../../utilities/scroll';
import { getRect } from '../../utilities/dom';

export interface IViewport {
  width: number;
  height: number;
}

export interface IWithViewportState {
  viewport?: IViewport;
}

const RESIZE_DELAY = 500;

export function withViewport<P extends { viewport?: IViewport }, S>(ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)): any {

  return class WithViewportComponent extends BaseDecorator<P, IWithViewportState> {

    public refs: {
      [key: string]: React.ReactInstance;
    };

    constructor() {
      super();

      this.state = {
        viewport: {
          width: 0,
          height: 0
        }
      };
    }

    public componentDidMount() {
      this._onAsyncResize = this._async.debounce(
        this._onAsyncResize,
        RESIZE_DELAY,
        {
          leading: false
        });

      this._events.on(window, 'resize', this._onAsyncResize);
      this._updateViewport();
    }

    public componentWillUnmount() {
      this._events.dispose();
    }

    public render() {
      let { viewport } = this.state;
      let isViewportVisible = viewport.width > 0 && viewport.height > 0;

      return (
        <div className='ms-Viewport' ref='root' style={ { minWidth: 1, minHeight: 1 } }>
          { isViewportVisible && (
            <ComposedComponent ref={ this._updateComposedComponentRef } viewport={ viewport } { ...this.props } />
          ) }
        </div>
      );
    }

    public forceUpdate() {
      this._updateViewport(true);
    }

    private _onAsyncResize() {
      this._updateViewport();
    }

    private _updateViewport(withForceUpdate?: boolean) {
      let { viewport } = this.state;
      let viewportElement = (this.refs as any).root;
      let scrollElement = findScrollableParent(viewportElement);
      let scrollRect = getRect(scrollElement);
      let clientRect = getRect(viewportElement);
      let updateComponent = () => {
        if (withForceUpdate && this._composedComponentInstance) {
          this._composedComponentInstance.forceUpdate();
        }
      };

      let isSizeChanged = (
        clientRect.width !== viewport.width ||
        scrollRect.height !== viewport.height);

      if (isSizeChanged) {
        this.setState({
          viewport: {
            width: clientRect.width,
            height: scrollRect.height
          }
        }, updateComponent);
      } else {
        updateComponent();
      }
    }
  };
}
