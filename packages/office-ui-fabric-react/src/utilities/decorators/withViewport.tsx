import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import {
  findScrollableParent,
  getRect
} from '../../Utilities';

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

    private _observer;

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

      this._observer = new MutationObserver((mutations)=>{
        mutations.forEach((mutation) => {
        if (mutation.type === 'attributes'){
          if (mutation.attributeName === 'style' ){
            if ((mutation.oldValue.indexOf('display:none') !== -1) || (mutation.oldValue.indexOf('visibility:hidden') !== -1)){
              this._updateViewport(true);
              return;
            }
          }
          if (mutation.attributeName === 'class') {
            if (mutation.oldValue.indexOf('hide') !== -1){
              this._updateViewport(true);
            }
          }
         }
        });
      });

      let observerConfig = {
        attributes : true,
        subtree: false,
        attributeOldValue: true
      };

      this._observer.observe((this.refs as any).root, observerConfig);
      this._updateViewport();
    }

    public componentWillUnmount() {
      this._events.dispose();
      this._observer.disconnect();
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
      this._updateViewport(true);
    }

    private _updateViewport(withForceUpdate?: boolean) {
      let { viewport } = this.state;
      let viewportElement = (this.refs as any).root;
      let isViewportVisible = (viewportElement.style.display !== 'none' && viewportElement.style.visibility !== 'hidden');
      let scrollElement = findScrollableParent(viewportElement);
      let scrollRect = getRect(scrollElement);
      let clientRect = getRect(viewportElement);
      let updateComponent = () => {
        if (withForceUpdate && this._composedComponentInstance && isViewportVisible === true) {
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
