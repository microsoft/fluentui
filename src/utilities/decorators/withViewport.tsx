import * as React from 'react';
import EventGroup from '../eventGroup/EventGroup';

export interface IViewport {
  width: number;
  height: number
}

export interface IWithViewportState {
  viewport?: IViewport
}

export function withViewport<P, S>(ComposedComponent: any): any {

  return class WithViewportComponent extends React.Component<P, IWithViewportState> {
    private _events: EventGroup;

    constructor() {
      super();

      this._events = new EventGroup(this);

      this.state = {
        viewport: {
          width: 0,
          height: 0
        }
      };
    }

    public render() {
      let { viewport } = this.state;

      return (
        <div className="Viewport" ref="root" >
          <ComposedComponent viewport={ viewport } { ...this.props } />
        </div>
      );
    }

    public componentDidMount() {
      this._events.on(window, 'resize', this._updateViewport);
      this._updateViewport();
    }

    public componentWillUnmount() {
      this._events.dispose();
    }

    private _updateViewport() {
      let viewportElement = (this.refs as any).root;
      let scrollElement = this._findScrollableElement(viewportElement);

      let clientRect = viewportElement.getBoundingClientRect();
      let scrollRect = scrollElement.getBoundingClientRect();

      this.setState({
        viewport: {
          width: clientRect.width,
          height: scrollRect.height
        }
      });
    }

    private _findScrollableElement(rootElement: HTMLElement) {
      let computedOverflow = getComputedStyle(rootElement)['overflow-y'];

      while (
        (rootElement !== document.body) &&
        (computedOverflow !== 'auto') &&
        (computedOverflow !== 'scroll')
      ) {
        rootElement = rootElement.parentElement;
        computedOverflow = getComputedStyle(rootElement)['overflow-y'];
      }

      return rootElement;
    }
  }

}
