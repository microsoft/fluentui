import * as React from 'react';
import { AutoScroll } from '../../utilities/AutoScroll/AutoScroll';
import { BaseComponent } from '../../common/BaseComponent';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import { findScrollableParent } from '../../utilities/scrollUtilities';
import {
  IMarqueeSelectionProps
} from './MarqueeSelection.Props';
import './MarqueeSelection.scss';

export interface IPoint {
  x: number;
  y: number;
}

export interface IRectangle {
  left: number;
  top: number;
  width: number;
  height: number;

  right?: number;
  bottom?: number;
}

export interface IMarqueeSelectionState {
  dragOrigin?: IPoint;
  dragRect?: IRectangle;
}

// We want to make the marquee selection start when the user drags a minimum distance. Otherwise we'd start
// the drag even if they just click an item without moving.
const MIN_DRAG_DISTANCE = 5;

/**
 * MarqueeSelection component abstracts managing a draggable rectangle which sets items selected/not selected.
 * Elements which have data-selectable-index attributes are queried and measured once to determine if they
 * fall within the bounds of the rectangle. The measure is memoized during the drag as a performance optimization
 * so if the items change sizes while dragging, that could cause incorrect results.
 */
export class MarqueeSelection extends BaseComponent<IMarqueeSelectionProps, IMarqueeSelectionState> {
  public static defaultProps = {
    rootTagName: 'div',
    rootProps: {}
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
  private _itemRectCache: { [key: string]: IRectangle };

  constructor(props: IMarqueeSelectionProps) {
    super(props);

    this.state = {
      dragRect: null
    };

    this._asyncEvaluateSelection = this._async.throttle(
      this._asyncEvaluateSelection,
      70,
      { leading: false });

      this._onMouseDown = this._onMouseDown.bind(this);
  }

  public componentWillUnmount() {
    if (this._autoScroll) {
      this._autoScroll.dispose();
    }
  }

  public render(): JSX.Element {
    let { rootTagName, rootProps, children } = this.props;
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
      rootTagName,
      assign({}, rootProps, {
        className: css('ms-MarqueeSelection', rootProps.className),
        ref: 'root',
        onMouseDown: this._onMouseDown
      }),
      children,
      dragMask,
      selectionBox
    );
  }

  private _onMouseDown(ev: React.MouseEvent) {
    let { onShouldStartSelection } = this.props;

    if (!onShouldStartSelection || onShouldStartSelection(ev)) {
      let scrollableParent = findScrollableParent(this.refs.root);

      if (scrollableParent && ev.buttons === 1) {
        this._selectedIndicies = {};
        this._events.on(window, 'mousemove', this._onMouseMove);
        this._events.on(scrollableParent, 'scroll', this._onMouseMove);
        this._events.on(window, 'mouseup', this._onMouseUp, true);
        this._autoScroll = new AutoScroll(this.refs.root);
        this._onMouseMove(ev.nativeEvent as MouseEvent);
      }
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
    this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = this._itemRectCache = null;

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
    let { _rootRect: rootRect } = this;

    // Break early if we don't need to evaluate.
    if (!dragRect) {
      return;
    }

    if (!this._itemRectCache) {
      this._itemRectCache = {};
    }

    // Potentially slow.
    let allElements = this.refs.root.querySelectorAll('[data-selection-index]');

    // Stop change events, clear selection to re-populate.
    selection.setChangeEvents(false);
    selection.setAllSelected(false);

    for (let i = 0; i < allElements.length; i++) {
      let element = allElements[i];
      let index = element.getAttribute('data-selection-index');

      // Pull the memoized rectangle for the item, or the get the rect and memoize.
      let itemRect = this._itemRectCache[index];

      if (!itemRect) {
        itemRect = element.getBoundingClientRect();

        // Normalize the item rect to the dragRect coordinates.
        itemRect = this._itemRectCache[index] = {
          left: itemRect.left - rootRect.left,
          top: itemRect.top - rootRect.top,
          width: itemRect.width,
          height: itemRect.height,
          right: (itemRect.left - rootRect.left) + itemRect.width,
          bottom: (itemRect.top - rootRect.top) + itemRect.height
        };
      }

      if (
        itemRect.top < (dragRect.top + dragRect.height) &&
        itemRect.bottom > dragRect.top &&
        itemRect.left < (dragRect.left + dragRect.width) &&
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