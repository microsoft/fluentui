import * as React from 'react';

import {
  Async,
  EventGroup,
  AutoScroll,
  classNamesFunction,
  findScrollableParent,
  getDistanceBetweenPoints,
  getRTL,
  initializeComponentRef,
} from '../../Utilities';
import type { Point, IRectangle } from '../../Utilities';
import type {
  IMarqueeSelectionProps,
  IMarqueeSelectionStyleProps,
  IMarqueeSelectionStyles,
} from './MarqueeSelection.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx, getWindowEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>();

export interface IMarqueeSelectionState {
  dragOrigin?: Point;
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
export class MarqueeSelectionBase extends React.Component<IMarqueeSelectionProps, IMarqueeSelectionState> {
  public static defaultProps = {
    rootTagName: 'div',
    rootProps: {},
    isEnabled: true,
  };

  public static contextType = WindowContext;

  private _async: Async;
  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();
  private _dragOrigin: Point | undefined;
  private _rootRect: IRectangle;
  private _lastMouseEvent: MouseEvent | undefined;
  private _autoScroll: AutoScroll | undefined;
  private _selectedIndicies: { [key: string]: boolean } | undefined;
  private _preservedIndicies: number[] | undefined;
  private _itemRectCache: { [key: string]: IRectangle } | undefined;
  private _allSelectedIndices: { [key: string]: boolean } | undefined;
  private _scrollableParent?: HTMLElement;
  private _scrollableSurface?: HTMLElement;
  private _scrollTop: number;
  private _scrollLeft: number;
  private _isTouch: boolean;

  constructor(props: IMarqueeSelectionProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);

    this.state = {
      dragRect: undefined,
    };
  }

  public componentDidMount(): void {
    const win = getWindowEx(this.context);
    const doc = getDocumentEx(this.context);

    this._scrollableParent = findScrollableParent(this._root.current) as HTMLElement;
    this._scrollableSurface = this._scrollableParent === (win as any) ? doc?.body : this._scrollableParent;
    // When scroll events come from window, we need to read scrollTop values from the body.

    const hitTarget = this.props.isDraggingConstrainedToRoot ? this._root.current : this._scrollableSurface;

    this._events.on(hitTarget, 'mousedown', this._onMouseDown);
    this._events.on(hitTarget, 'touchstart', this._onTouchStart, true);
    this._events.on(hitTarget, 'pointerdown', this._onPointerDown, true);
  }

  public componentWillUnmount(): void {
    if (this._autoScroll) {
      this._autoScroll.dispose();
    }
    delete this._scrollableParent;
    delete this._scrollableSurface;

    this._events.dispose();
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { rootProps, children, theme, className, styles } = this.props;
    const { dragRect } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return (
      <div {...rootProps} className={classNames.root} ref={this._root}>
        {children}
        {dragRect && <div className={classNames.dragMask} />}
        {dragRect && (
          <div className={classNames.box} style={dragRect}>
            <div className={classNames.boxFill} />
          </div>
        )}
      </div>
    );
  }

  /** Determine if the mouse event occured on a scrollbar of the target element. */
  private _isMouseEventOnScrollbar(ev: MouseEvent): boolean {
    const targetElement = ev.target as HTMLElement;
    const targetScrollbarWidth = targetElement.offsetWidth - targetElement.clientWidth;
    const targetScrollbarHeight = targetElement.offsetHeight - targetElement.clientHeight;

    if (targetScrollbarWidth || targetScrollbarHeight) {
      const targetRect = targetElement.getBoundingClientRect();

      // Check vertical scroll
      if (getRTL(this.props.theme)) {
        if (ev.clientX < targetRect.left + targetScrollbarWidth) {
          return true;
        }
      } else {
        if (ev.clientX > targetRect.left + targetElement.clientWidth) {
          return true;
        }
      }

      // Check horizontal scroll
      if (ev.clientY > targetRect.top + targetElement.clientHeight) {
        return true;
      }
    }

    return false;
  }

  private _onMouseDown = (ev: MouseEvent): void => {
    const { isEnabled, onShouldStartSelection } = this.props;

    // Ensure the mousedown is within the boundaries of the target. If not, it may have been a click on a scrollbar.
    if (this._isMouseEventOnScrollbar(ev)) {
      return;
    }

    if (this._isInSelectionToggle(ev)) {
      return;
    }

    if (
      !this._isTouch &&
      isEnabled &&
      !this._isDragStartInSelection(ev) &&
      (!onShouldStartSelection || onShouldStartSelection(ev))
    ) {
      if (this._scrollableSurface && ev.button === 0 && this._root.current) {
        const win = getWindowEx(this.context);
        this._selectedIndicies = {};
        this._preservedIndicies = undefined;
        this._events.on(win, 'mousemove', this._onAsyncMouseMove, true);
        this._events.on(this._scrollableParent, 'scroll', this._onAsyncMouseMove);
        this._events.on(win, 'click', this._onMouseUp, true);

        this._autoScroll = new AutoScroll(this._root.current, win);
        this._scrollTop = this._scrollableSurface.scrollTop;
        this._scrollLeft = this._scrollableSurface.scrollLeft;
        this._rootRect = this._root.current.getBoundingClientRect();

        this._onMouseMove(ev);
      }
    }
  };

  private _onTouchStart = (ev: TouchEvent): void => {
    this._isTouch = true;

    this._async.setTimeout(() => {
      this._isTouch = false;
    }, 0);
  };

  private _onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'touch') {
      this._isTouch = true;

      this._async.setTimeout(() => {
        this._isTouch = false;
      }, 0);
    }
  };

  private _getRootRect(): IRectangle {
    return {
      left:
        this._rootRect.left +
        (this._scrollableSurface ? this._scrollLeft - this._scrollableSurface.scrollLeft : this._scrollLeft),
      top:
        this._rootRect.top +
        (this._scrollableSurface ? this._scrollTop - this._scrollableSurface.scrollTop : this._scrollTop),
      width: this._rootRect.width,
      height: this._rootRect.height,
    };
  }

  private _onAsyncMouseMove(ev: MouseEvent): void {
    this._async.requestAnimationFrame(() => {
      this._onMouseMove(ev);
    });

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onMouseMove(ev: MouseEvent): boolean | undefined {
    if (!this._autoScroll) {
      return;
    }

    if (ev.clientX !== undefined) {
      this._lastMouseEvent = ev;
    }

    const rootRect = this._getRootRect();
    const currentPoint = { left: ev.clientX - rootRect.left, top: ev.clientY - rootRect.top };

    if (!this._dragOrigin) {
      this._dragOrigin = currentPoint;
    }

    if (ev.buttons !== undefined && ev.buttons === 0) {
      this._onMouseUp(ev);
    } else {
      if (this.state.dragRect || getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
        if (!this.state.dragRect) {
          const { selection } = this.props;

          if (!ev.shiftKey) {
            selection.setAllSelected(false);
          }

          this._preservedIndicies = selection && selection.getSelectedIndices && selection.getSelectedIndices();
        }

        // We need to constrain the current point to the rootRect boundaries.
        const constrainedPoint = this.props.isDraggingConstrainedToRoot
          ? {
              left: Math.max(0, Math.min(rootRect.width, this._lastMouseEvent!.clientX - rootRect.left)),
              top: Math.max(0, Math.min(rootRect.height, this._lastMouseEvent!.clientY - rootRect.top)),
            }
          : {
              left: this._lastMouseEvent!.clientX - rootRect.left,
              top: this._lastMouseEvent!.clientY - rootRect.top,
            };

        const dragRect = {
          left: Math.min(this._dragOrigin.left || 0, constrainedPoint.left),
          top: Math.min(this._dragOrigin.top || 0, constrainedPoint.top),
          width: Math.abs(constrainedPoint.left - (this._dragOrigin.left || 0)),
          height: Math.abs(constrainedPoint.top - (this._dragOrigin.top || 0)),
        };

        this._evaluateSelection(dragRect, rootRect);

        this.setState({ dragRect });
      }
    }

    return false;
  }

  private _onMouseUp(ev: MouseEvent): void {
    const win = getWindowEx(this.context);
    this._events.off(win);
    this._events.off(this._scrollableParent, 'scroll');

    if (this._autoScroll) {
      this._autoScroll.dispose();
    }

    this._autoScroll = this._dragOrigin = this._lastMouseEvent = undefined;
    this._selectedIndicies = this._itemRectCache = undefined;

    if (this.state.dragRect) {
      this.setState({
        dragRect: undefined,
      });

      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _isPointInRectangle(rectangle: IRectangle, point: Point): boolean {
    return (
      !!point.top &&
      rectangle.top < point.top &&
      rectangle.bottom! > point.top &&
      !!point.left &&
      rectangle.left < point.left &&
      rectangle.right! > point.left
    );
  }

  /**
   * We do not want to start the marquee if we're trying to marquee
   * from within an existing marquee selection.
   */
  private _isDragStartInSelection(ev: MouseEvent): boolean {
    const selection = this.props.selection;
    if (!this._root.current || (selection && selection.getSelectedCount() === 0)) {
      return false;
    }

    const allElements = this._root.current.querySelectorAll('[data-selection-index]');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const index = Number(element.getAttribute('data-selection-index'));
      if (selection.isIndexSelected(index)) {
        const itemRect = element.getBoundingClientRect();
        if (this._isPointInRectangle(itemRect, { left: ev.clientX, top: ev.clientY })) {
          return true;
        }
      }
    }

    return false;
  }

  private _isInSelectionToggle(ev: MouseEvent): boolean {
    let element: HTMLElement | null = ev.target as HTMLElement;

    while (element && element !== this._root.current) {
      if (element.getAttribute('data-selection-toggle') === 'true') {
        return true;
      }

      element = element.parentElement;
    }

    return false;
  }

  private _evaluateSelection(dragRect: IRectangle, rootRect: IRectangle): void {
    // Break early if we don't need to evaluate.
    if (!dragRect || !this._root.current) {
      return;
    }

    const { selection } = this.props;
    const allElements = this._root.current.querySelectorAll('[data-selection-index]');

    if (!this._itemRectCache) {
      this._itemRectCache = {};
    }

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const index = element.getAttribute('data-selection-index') as string;

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
          right: itemRect.left - rootRect.left + itemRect.width,
          bottom: itemRect.top - rootRect.top + itemRect.height,
        };

        if (itemRect.width > 0 && itemRect.height > 0) {
          this._itemRectCache[index] = itemRect;
        }
      }

      if (
        itemRect.top < dragRect.top + dragRect.height &&
        itemRect.bottom! > dragRect.top &&
        itemRect.left < dragRect.left + dragRect.width &&
        itemRect.right! > dragRect.left
      ) {
        this._selectedIndicies![index] = true;
      } else {
        delete this._selectedIndicies![index];
      }
    }

    // set previousSelectedIndices to be all of the selected indices from last time
    const previousSelectedIndices = this._allSelectedIndices || {};
    this._allSelectedIndices = {};

    // set all indices that are supposed to be selected in _allSelectedIndices
    for (const index in this._selectedIndicies!) {
      if (this._selectedIndicies!.hasOwnProperty(index)) {
        this._allSelectedIndices![index] = true;
      }
    }

    if (this._preservedIndicies) {
      for (const index of this._preservedIndicies!) {
        this._allSelectedIndices![index] = true;
      }
    }

    // check if needs to update selection, only when current _allSelectedIndices
    // is different than previousSelectedIndices
    let needToUpdate = false;
    for (const index in this._allSelectedIndices!) {
      if (this._allSelectedIndices![index] !== previousSelectedIndices![index]) {
        needToUpdate = true;
        break;
      }
    }

    if (!needToUpdate) {
      for (const index in previousSelectedIndices!) {
        if (this._allSelectedIndices![index] !== previousSelectedIndices![index]) {
          needToUpdate = true;
          break;
        }
      }
    }

    // only update selection when needed
    if (needToUpdate) {
      // Stop change events, clear selection to re-populate.
      selection.setChangeEvents(false);
      selection.setAllSelected(false);

      for (const index of Object.keys(this._allSelectedIndices!)) {
        selection.setIndexSelected(Number(index), true, false);
      }

      selection.setChangeEvents(true);
    }
  }
}
