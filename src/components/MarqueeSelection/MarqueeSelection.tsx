import * as React from 'react';
import { AutoScroll } from '../../utilities/AutoScroll/AutoScroll';
import { BaseComponent } from '../../common/BaseComponent';
import { IMarqueeSelectionProps } from './MarqueeSelection.Props';
import { IPoint } from '../../common/IPoint';
import { IRectangle } from '../../common/IRectangle';
import { css } from '../../utilities/css';
import { findScrollableParent } from '../../utilities/scrollUtilities';
import { getDistanceBetweenPoints } from '../../utilities/math';

import './MarqueeSelection.scss';

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
    rootProps: {},
    isEnabled: true
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
  };

  private _dragOrigin: IPoint;
  private _rootRect: IRectangle;
  private _lastMouseEvent: MouseEvent;
  private _autoScroll: AutoScroll;
  private _selectedIndicies: { [key: string]: boolean };
  private _itemRectCache: { [key: string]: IRectangle };
  private _scrollableParent: HTMLElement;
  private _scrollTop: number;

  constructor(props: IMarqueeSelectionProps) {
    super(props);

    this.state = {
      dragRect: undefined
    };

    this._onMouseDown = this._onMouseDown.bind(this);
  }

  public componentDidMount() {
    this._scrollableParent = findScrollableParent(this.refs.root);

    if (this._scrollableParent) {
      this._events.on(
        this.props.isDraggingConstrainedToRoot ? this.refs.root : this._scrollableParent,
        'mousedown',
        this._onMouseDown);
    }
  }

  public componentWillUnmount() {
    if (this._autoScroll) {
      this._autoScroll.dispose();
    }
  }

  public render(): JSX.Element {
    let { rootProps, children } = this.props;
    let { dragRect } = this.state;

    return (
      <div
        { ...rootProps }
        className={ css('ms-MarqueeSelection', rootProps.className) }
        ref='root'
        >
        { children }
        { dragRect && (<div className='ms-MarqueeSelection-dragMask' />) }
        { dragRect && (
          <div className='ms-MarqueeSelection-box' style={ dragRect }>
            <div className='ms-MarqueeSelection-boxFill' />
          </div>
        ) }
      </div>
    );
  }

  private _onMouseDown(ev: MouseEvent) {
    let { isEnabled, onShouldStartSelection } = this.props;

    if (isEnabled && (!onShouldStartSelection || onShouldStartSelection(ev))) {
      let scrollableParent = findScrollableParent(this.refs.root);

      if (scrollableParent && ev.button === 0) {
        this._selectedIndicies = {};
        this._events.on(window, 'mousemove', this._onMouseMove);
        this._events.on(scrollableParent, 'scroll', this._onMouseMove);
        this._events.on(window, 'mouseup', this._onMouseUp, true);
        this._autoScroll = new AutoScroll(this.refs.root);
        this._scrollableParent = scrollableParent;
        this._scrollTop = scrollableParent.scrollTop;
        this._rootRect = this.refs.root.getBoundingClientRect();
      }
    }
  }

  private _getRootRect(): IRectangle {
    return {
      left: this._rootRect.left,
      top: this._rootRect.top + (this._scrollTop - this._scrollableParent.scrollTop),
      width: this._rootRect.width,
      height: this._rootRect.height
    };
  }

  private _onMouseMove(ev: MouseEvent) {
    if (ev.clientX !== undefined) {
      this._lastMouseEvent = ev;
    }

    let rootRect = this._getRootRect();
    let currentPoint = { x: ev.clientX - rootRect.left, y: ev.clientY - rootRect.top };

    if (!this._dragOrigin) {
      this._dragOrigin = currentPoint;
    }

    if (ev.buttons !== undefined && ev.buttons === 0) {
      this._onMouseUp(ev);
    } else {
      if (this.state.dragRect || getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
        // We need to constrain the current point to the rootRect boundaries.
        let constrainedPoint = this.props.isDraggingConstrainedToRoot ? {
          x: Math.max(0, Math.min(rootRect.width, this._lastMouseEvent.clientX - rootRect.left)),
          y: Math.max(0, Math.min(rootRect.height, this._lastMouseEvent.clientY - rootRect.top))
        } : {
          x: this._lastMouseEvent.clientX - rootRect.left,
          y: this._lastMouseEvent.clientY - rootRect.top
        };

        let dragRect = {
          left: Math.min(this._dragOrigin.x, constrainedPoint.x),
          top: Math.min(this._dragOrigin.y, constrainedPoint.y),
          width: Math.abs(constrainedPoint.x - this._dragOrigin.x),
          height: Math.abs(constrainedPoint.y - this._dragOrigin.y)
        };

        this.setState({ dragRect });
        this._evaluateSelection(dragRect);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();

    return false;
  }

  private _onMouseUp(ev: MouseEvent) {
    let scrollableParent = findScrollableParent(this.refs.root);

    this._events.off(window);
    this._events.off(scrollableParent, 'scroll');

    this._autoScroll.dispose();
    this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = this._itemRectCache = undefined;

    if (this.state.dragRect) {
      this.setState({
        dragRect: undefined
      });

      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _evaluateSelection(dragRect: IRectangle) {
    // Break early if we don't need to evaluate.
    if (!dragRect) {
      return;
    }

    let { selection } = this.props;
    let rootRect = this._getRootRect();
    let allElements = this.refs.root.querySelectorAll('[data-selection-index]');

    if (!this._itemRectCache) {
      this._itemRectCache = {};
    }

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
        itemRect = {
          left: itemRect.left - rootRect.left,
          top: itemRect.top - rootRect.top,
          width: itemRect.width,
          height: itemRect.height,
          right: (itemRect.left - rootRect.left) + itemRect.width,
          bottom: (itemRect.top - rootRect.top) + itemRect.height
        };

        if (itemRect.width > 0 && itemRect.height > 0) {
          this._itemRectCache[index] = itemRect;
        }
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

