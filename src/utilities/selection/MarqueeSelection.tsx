import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { css } from '../../utilities/css';
import { findScrollableParent } from '../scrollUtilities';
import { AutoScroll } from './AutoScroll';
import './MarqueeSelection.scss';
import {
  IRectangle,
  IPoint,
  IMarqueeSelectionProps
} from './MarqueeSelection.Props';

export interface IMarqueeSelectionState {
  dragOrigin?: IPoint;
  dragRect?: IRectangle;
}

const MIN_DRAG_DISTANCE = 10;

export class MarqueeSelection extends BaseComponent<IMarqueeSelectionProps, IMarqueeSelectionState> {
  public static defaultProps = {
    baseElement: 'div'
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
  };

  private _dragOrigin: IPoint;
  private _rootRect: IRectangle;
  private _lastMouseEvent: MouseEvent;
  private _autoScroll;
  private _selectedIndicies: { [key: string]: boolean };

  constructor(props: IMarqueeSelectionProps) {
    super(props);

    this.state = {
      dragRect: null
    };

    this.autoBindCallbacks(MarqueeSelection.prototype);
  }

  public componentDidMount() {
//    this._events.on(this.refs.root, 'mousedown', this._onMouseDown);
  }

  public componentWillUnmount() {
    if (this._autoScroll) {
      this._autoScroll.dispose();
    }
  }

  public render(): JSX.Element {
    let { baseElement, className, children } = this.props;
    let { dragRect } = this.state;
    let selectionBox = null;
    let dragMask = null;

    if (dragRect) {
      dragMask = (
        <div className='ms-MarqueeSelection-dragMask' />
      );
      selectionBox = (
        <div className='ms-MarqueeSelection-box' style={ dragRect }>
          <div className='ms-MarqueeSelection-boxFill' />
        </div>
      );
    }

    return React.createElement(
      baseElement,
      {
        className: css('ms-MarqueeSelection', className),
        ref: 'root',
        onMouseDown: this._onMouseDown
      },
      children,
      dragMask,
      selectionBox
    );
  }

  private _onMouseDown(ev: MouseEvent) {
    let scrollableParent = findScrollableParent(this.refs.root);

    if (scrollableParent) {
      this._selectedIndicies = {};
      this._events.on(window, 'mousemove', this._onMouseMove);
      this._events.on(scrollableParent, 'scroll', this._onMouseMove);
      this._events.on(window, 'mouseup', this._onMouseUp, true);
      this._autoScroll = new AutoScroll(this.refs.root);
      this._onMouseMove(ev);
    }
  }

  private _onMouseMove(ev: MouseEvent) {
    if (ev.clientX !== undefined) {
      this._lastMouseEvent = ev;
    }

    this._rootRect = this.refs.root.getBoundingClientRect();

    let currentPoint = { x: ev.clientX - this._rootRect.left, y: ev.clientY - this._rootRect.top };

    if (!this._dragOrigin) {
      this._dragOrigin = currentPoint;
    }

    if (ev.buttons === 0) {
      this._onMouseUp(ev);
    } else {
      if (this.state.dragRect || _getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
        // We need to constain the current point to the rootRect boundaries.
        let constrainedPoint = {
          x: Math.max(0, Math.min(this._rootRect.width, this._lastMouseEvent.clientX - this._rootRect.left)),
          y: Math.max(0, Math.min(this._rootRect.height, this._lastMouseEvent.clientY - this._rootRect.top))
        };

        this.setState({
          dragRect: {
            left: Math.min(this._dragOrigin.x, constrainedPoint.x),
            top: Math.min(this._dragOrigin.y, constrainedPoint.y),
            width: Math.abs(constrainedPoint.x - this._dragOrigin.x),
            height: Math.abs(constrainedPoint.y - this._dragOrigin.y)
          }
        }, () => this._asyncEvaluateSelection());
      }
    }

    return false;
  }

  private _onMouseUp(ev: MouseEvent) {
    let scrollableParent = findScrollableParent(this.refs.root);

    this._events.off(window);
    this._events.off(scrollableParent, 'scroll');

    this._autoScroll.dispose();
    this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = null;

    if (this.state.dragRect) {
      this.setState({
        dragRect: null
      });

      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _asyncEvaluateSelection() {
    let { selection } = this.props;
    let { dragRect } = this.state;

    // Potentially slow.
    let allElements = this.refs.root.querySelectorAll('[data-selection-index]');

    // Normalize the dragRect to document coordinates.
    dragRect = {
      left: this._rootRect.left + dragRect.left,
      top: this._rootRect.top + dragRect.top,
      width: dragRect.width,
      height: dragRect.height,
      bottom: 0,
      right: 0,
    };

    // Provide right/bottom values for easy compares.
    dragRect.right = dragRect.left + dragRect.width;
    dragRect.bottom = dragRect.top + dragRect.height;

    selection.setChangeEvents(false);

    selection.setAllSelected(false);

    for (let i = 0; i < allElements.length; i++) {
      let element = allElements[i];
      let index = element.getAttribute('data-selection-index');

      // This may be potentially slow.
      let itemRect = element.getBoundingClientRect();

      if (
        itemRect.top < dragRect.bottom &&
        itemRect.bottom > dragRect.top &&
        itemRect.left < dragRect.right &&
        itemRect.right > dragRect.left
      ) {
        this._selectedIndicies[index] = true;
      } else {
        delete this._selectedIndicies[index];
      }
    }

    for (let index in this._selectedIndicies) {
      if (this._selectedIndicies.hasOwnProperty(index)) {
        selection.setIndexSelected(Number(index), true, false);
      }
    }

    selection.setChangeEvents(true);
  }
}

function _getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number {
  let distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

  return distance;
}