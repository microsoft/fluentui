import * as React from 'react';
import { getClassNames } from './DraggableZone.styles';
import { on } from '../../Utilities';
import type { IDraggableZoneProps, ICoordinates, IDragData } from './DraggableZone.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../dom';

export interface IDraggableZoneState {
  isDragging: boolean;
  position: ICoordinates;
  lastPosition?: ICoordinates;
}

const eventMapping = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend',
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup',
  },
};

// These are needed so that we can generalize the events
// and so we have access to clientX and clientY in the touch events
type MouseTouchEvent<T> = React.MouseEvent<T> & React.TouchEvent<T> & Event;

export class DraggableZone extends React.Component<IDraggableZoneProps, IDraggableZoneState> {
  public static contextType = WindowContext;

  private _touchId?: number;
  private _currentEventType = eventMapping.mouse;
  private _events: (() => void)[] = [];

  constructor(props: IDraggableZoneProps) {
    super(props);

    this.state = {
      isDragging: false,
      position: this.props.position || { x: 0, y: 0 },
      lastPosition: undefined,
    };
  }

  public componentDidUpdate(prevProps: IDraggableZoneProps) {
    if (this.props.position && (!prevProps.position || this.props.position !== prevProps.position)) {
      this.setState({ position: this.props.position });
    }
  }

  public componentWillUnmount() {
    this._events.forEach(dispose => dispose());
  }

  public render() {
    const child: any = React.Children.only(this.props.children);
    const { props } = child;
    const { position } = this.props;
    const { position: statePosition, isDragging } = this.state;
    let x = statePosition.x;
    let y = statePosition.y;

    if (position && !isDragging) {
      x = position.x;
      y = position.y;
    }

    return React.cloneElement(child, {
      style: {
        ...props.style,
        transform: `translate(${x}px, ${y}px)`,
      },
      className: getClassNames(props.className, this.state.isDragging).root,
      onMouseDown: this._onMouseDown,
      onMouseUp: this._onMouseUp,
      onTouchStart: this._onTouchStart,
      onTouchEnd: this._onTouchEnd,
    });
  }

  private _onMouseDown = (event: MouseTouchEvent<HTMLElement>) => {
    const onMouseDown = (React.Children.only(this.props.children) as any).props.onMouseDown;
    if (onMouseDown) {
      onMouseDown(event);
    }

    this._currentEventType = eventMapping.mouse;
    return this._onDragStart(event);
  };

  private _onMouseUp = (event: MouseTouchEvent<HTMLElement>) => {
    const onMouseUp = (React.Children.only(this.props.children) as any).props.onMouseUp;
    if (onMouseUp) {
      onMouseUp(event);
    }

    this._currentEventType = eventMapping.mouse;
    return this._onDragStop(event);
  };

  private _onTouchStart = (event: MouseTouchEvent<HTMLElement>) => {
    const onTouchStart = (React.Children.only(this.props.children) as any).props.onTouchStart;
    if (onTouchStart) {
      onTouchStart(event);
    }

    this._currentEventType = eventMapping.touch;
    return this._onDragStart(event);
  };

  private _onTouchEnd = (event: MouseTouchEvent<HTMLElement>) => {
    const onTouchEnd = (React.Children.only(this.props.children) as any).props.onTouchEnd;
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    this._currentEventType = eventMapping.touch;
    this._onDragStop(event);
  };

  private _onDragStart = (event: MouseTouchEvent<HTMLElement>) => {
    // Only handle left click for dragging
    if (typeof event.button === 'number' && event.button !== 0) {
      return false;
    }

    // If the target doesn't match the handleSelector OR
    // if the target does match the preventDragSelector, bail out
    if (
      (this.props.handleSelector && !this._matchesSelector(event.target as HTMLElement, this.props.handleSelector)) ||
      (this.props.preventDragSelector &&
        this._matchesSelector(event.target as HTMLElement, this.props.preventDragSelector))
    ) {
      return;
    }

    // Remember the touch identifier if this is a touch event so we can
    // distinguish between individual touches in multitouch scenarios
    // by remembering which touch point we were given
    this._touchId = this._getTouchId(event);

    const position = this._getControlPosition(event);
    if (position === undefined) {
      return;
    }

    const dragData = this._createDragDataFromPosition(position);
    this.props.onStart && this.props.onStart(event, dragData);

    this.setState({
      isDragging: true,
      lastPosition: position,
    });

    // hook up the appropriate mouse/touch events to the body to ensure
    // smooth dragging
    const doc = getDocumentEx(this.context)!;
    this._events = [
      on(doc.body, this._currentEventType.move, this._onDrag, true /* use capture phase */),
      on(doc.body, this._currentEventType.stop, this._onDragStop, true /* use capture phase */),
    ];
  };

  private _onDrag = (event: MouseTouchEvent<HTMLElement>) => {
    // Prevent scrolling on mobile devices
    if (event.type === 'touchmove') {
      event.preventDefault();
    }

    const position = this._getControlPosition(event);
    if (!position) {
      return;
    }

    // create the updated drag data from the position data
    const updatedData = this._createUpdatedDragData(this._createDragDataFromPosition(position));
    const updatedPosition = updatedData.position;

    this.props.onDragChange && this.props.onDragChange(event, updatedData);

    this.setState({
      position: updatedPosition,
      lastPosition: position,
    });
  };

  private _onDragStop = (event: MouseTouchEvent<HTMLElement>) => {
    if (!this.state.isDragging) {
      return;
    }

    const position = this._getControlPosition(event);
    if (!position) {
      return;
    }

    const baseDragData = this._createDragDataFromPosition(position);

    // Set dragging to false and reset the lastPosition
    this.setState({
      isDragging: false,
      lastPosition: undefined,
    });

    this.props.onStop && this.props.onStop(event, baseDragData);

    if (this.props.position) {
      this.setState({
        position: this.props.position,
      });
    }

    // Remove event handlers
    this._events.forEach(dispose => dispose());
  };

  /**
   * Get the control position based off the event that fired
   * @param event - The event to get offsets from
   */
  private _getControlPosition(event: MouseTouchEvent<HTMLElement>): ICoordinates | undefined {
    const touchObj = this._getActiveTouch(event);

    // did we get the right touch?
    if (this._touchId !== undefined && !touchObj) {
      return undefined;
    }

    const eventToGetOffset = touchObj || event;
    return {
      x: eventToGetOffset.clientX,
      y: eventToGetOffset.clientY,
    };
  }

  /**
   * Get the active touch point that we have saved from the event's TouchList
   * @param event - The event used to get the TouchList for the active touch point
   */
  private _getActiveTouch(event: MouseTouchEvent<HTMLElement>): React.Touch | undefined {
    return (
      (event.targetTouches && this._findTouchInTouchList(event.targetTouches)) ||
      (event.changedTouches && this._findTouchInTouchList(event.changedTouches))
    );
  }

  /**
   * Get the initial touch identifier associated with the given event
   * @param event - The event that contains the TouchList
   */
  private _getTouchId(event: MouseTouchEvent<HTMLElement>): number | undefined {
    const touch: React.Touch | undefined =
      (event.targetTouches && event.targetTouches[0]) || (event.changedTouches && event.changedTouches[0]);

    if (touch) {
      return touch.identifier;
    }
  }

  /**
   * Returns if an element (or any of the element's parents) match the given selector
   */
  private _matchesSelector(element: HTMLElement | null, selector: string): boolean {
    if (!element || element === getDocumentEx(this.context)?.body) {
      return false;
    }

    const matchesSelectorFn: Function =
      // eslint-disable-next-line deprecation/deprecation
      element.matches || element.webkitMatchesSelector || (element as any).msMatchesSelector; /* for IE */

    if (!matchesSelectorFn) {
      return false;
    }

    return matchesSelectorFn.call(element, selector) || this._matchesSelector(element.parentElement, selector);
  }

  /**
   * Attempts to find the Touch that matches the identifier  we stored in dragStart
   * @param touchList The TouchList to look for the stored identifier from dragStart
   */
  private _findTouchInTouchList(touchList: React.TouchList): React.Touch | undefined {
    if (this._touchId === undefined) {
      return;
    }

    for (let i = 0; i < touchList.length; i++) {
      if (touchList[i].identifier === this._touchId) {
        return touchList[i];
      }
    }

    return undefined;
  }

  /**
   * Create DragData based off of the last known position and the new position passed in
   * @param position The new position as part of the drag
   */
  private _createDragDataFromPosition(position: ICoordinates): IDragData {
    const { lastPosition } = this.state;

    // If we have no lastPosition, use the given position
    // for last position
    if (lastPosition === undefined) {
      return {
        delta: { x: 0, y: 0 },
        lastPosition: position,
        position,
      };
    }

    return {
      delta: {
        x: position.x - lastPosition.x,
        y: position.y - lastPosition.y,
      },
      lastPosition,
      position,
    };
  }

  /**
   * Creates an updated DragData based off the current position and given baseDragData
   * @param baseDragData The base DragData (from _createDragDataFromPosition) used to calculate the updated positions
   */
  private _createUpdatedDragData(baseDragData: IDragData): IDragData {
    const { position } = this.state;
    return {
      position: {
        x: position.x + baseDragData.delta.x,
        y: position.y + baseDragData.delta.y,
      },
      delta: baseDragData.delta,
      lastPosition: position,
    };
  }
}
