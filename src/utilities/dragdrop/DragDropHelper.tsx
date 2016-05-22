import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import {
  IDragDropHelper,
  IDragDropTarget,
  IDragDropOptions,
  IDragDropEvent
} from './interfaces';
import { ISelection } from '../../utilities/selection/interfaces';

const DISTANCE_FOR_DRAG_SQUARED = 25; // the minimum mouse move distance to treat it as drag event
const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

export interface IDragDropHelperParams {
  selection: ISelection;
}

export class DragDropHelper implements IDragDropHelper {
  private _dragEnterCounts: { [key: string]: number };
  private _isDragging: boolean;
  private _dragData: {
    eventTarget: EventTarget;
    clientX: number;
    clientY: number;
    dataTransfer?: DataTransfer;
    dropTarget?: IDragDropTarget;
    dragTarget?: IDragDropTarget;
  };
  private _selection: ISelection;
  private _activeTargets: { [key: string]: IDragDropTarget };
  private _events: EventGroup;

  constructor(params: IDragDropHelperParams) {
    this._selection = params.selection;
    this._dragEnterCounts = {};
    this._activeTargets = {};

    this._events = new EventGroup(this);
    // clear drag data when mouse up, use capture event to ensure it will be run
    this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
    this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
  }

  public dispose() {
    this._events.dispose();
  }

  public subscribe(root: HTMLElement, events: EventGroup, dragDropOptions: IDragDropOptions) {
    if (dragDropOptions && root) {
      let { key, eventMap, context, updateDropState } = dragDropOptions;
      let dragDropTarget = { root: root, options: dragDropOptions };
      let isDraggable = this._isDraggable(dragDropTarget);
      let isDroppable = this._isDroppable(dragDropTarget);

      if (isDraggable || isDroppable) {
        this._activeTargets[key] = dragDropTarget;

        if (eventMap) {
          for (let event of eventMap) {
            this._events.on(root, event.eventName, event.callback.bind(null, context));
          }
        }
      }

      if (isDroppable) {
        this._dragEnterCounts[key] = 0;
        // dragenter and dragleave will be fired when hover to the child element
        // but we only want to change state when enter or leave the current element
        // use the count to ensure it.
        events.onAll(root, {
          'dragenter': (event: DragEvent) => {
            event.preventDefault(); // needed for IE
            if (!(event as IDragDropEvent).isHandled) {
              (event as IDragDropEvent).isHandled = true;
              this._dragEnterCounts[key]++;
              if (this._dragEnterCounts[key] === 1) {
                updateDropState(true /* isDropping */, event);
              }
            }
          },
          'dragleave': (event: DragEvent) => {
            if (!(event as IDragDropEvent).isHandled) {
              (event as IDragDropEvent).isHandled = true;
              this._dragEnterCounts[key]--;
              if (this._dragEnterCounts[key] === 0) {
                updateDropState(false /* isDropping */, event);
              }
            }
          },
          'dragend': (event: DragEvent) => {
            this._dragEnterCounts[key] = 0;
            updateDropState(false /* isDropping */, event);
          },
          'drop': (event: DragEvent) => {
            this._dragEnterCounts[key] = 0;
            updateDropState(false /* isDropping */, event);
          }
        });
      }

      if (isDraggable) {
        events.on(root, 'mousedown', this._onMouseDown.bind(this, dragDropTarget));
      }
    }
  }

  public unsubscribe(root: HTMLElement, key: string) {
    delete this._activeTargets[key];
    this._events.off(root);
  }

  /**
   * clear drag data when mouse up on body
   */
  private _onMouseUp(event: MouseEvent) {
    this._isDragging = false;
    if (this._dragData) {
      for (let key in this._activeTargets) {
        if (this._activeTargets.hasOwnProperty(key)) {
          let target = this._activeTargets[key];
          if (target && target.root) {
            this._events.off(target.root, 'mousemove');
            this._events.off(target.root, 'mouseleave');
          }
        }
      }

      if (this._dragData.dropTarget) {
        // raise dargleave event to let dropTarget know it need to remove dropping style
        EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
      }
    }
    this._dragData = null;
  }

  /**
   * clear drag data when mouse up outside of the document
   */
  private _onDocumentMouseUp(event: MouseEvent) {
    if (event.target === document.documentElement) {
      this._onMouseUp(event);
    }
  }

  /**
   * when mouse move over a new drop target while dragging some items,
   * fire dragleave on the old target and fire dragenter to the new target
   * The target will handle style change on dragenter and dragleave events.
   */
  private _onMouseMove(target: IDragDropTarget, event: MouseEvent) {
    let {
      // use buttons property here since ev.button in some edge case is not updating well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons = MOUSEMOVE_PRIMARY_BUTTON
    } = event;

    if (this._dragData && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
      // cancel mouse down event and return early when the primary button is not pressed
      this._onMouseUp(event);
      return;
    }

    let { root, options } = target;
    if (this._isDragging) {
      if (this._isDroppable(target)) {
        // we can have nested drop targets in the DOM, like a folder inside a group. In that case, when we drag into
        // the inner target (folder), we first set dropTarget to the inner element. But the same event is bubbled to the
        // outer target too, and we need to prevent the outer one from taking over.
        // So, check if the last dropTarget is not a child of the current.
        if (this._dragData.dropTarget &&
          this._dragData.dropTarget.options.key !== options.key &&
          !this._isChild(root, this._dragData.dropTarget.root)) {
          EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
          this._dragData.dropTarget = null;
        }

        if (!this._dragData.dropTarget) {
          EventGroup.raise(root, 'dragenter');
          this._dragData.dropTarget = target;
        }
      }
    } else if (this._dragData) {
      if (this._isDraggable(target)) {
        let xDiff = this._dragData.clientX - event.clientX;
        let yDiff = this._dragData.clientY - event.clientY;
        if (xDiff * xDiff + yDiff * yDiff >= DISTANCE_FOR_DRAG_SQUARED) {
          if (this._dragData.dragTarget &&
            this._selection.isIndexSelected(options.selectionIndex)) {
            this._isDragging = true;
            if (options.onDragStart) {
              options.onDragStart(options.context.data, options.context.index, this._selection.getSelection(), event);
            }
          }
        }
      }
    }
  }

  /**
   * when mouse leave a target while dragging some items, fire dragleave to the target
   */
  private _onMouseLeave(target: IDragDropTarget, event: MouseEvent) {
    if (this._isDragging) {
      if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.options.key === target.options.key) {
        EventGroup.raise(target.root, 'dragleave');
        this._dragData.dropTarget = null;
      }
    }
  }

  /**
   * when mouse down on a draggable item, we start to track dragdata.
   */
  private _onMouseDown(target: IDragDropTarget, event: MouseEvent) {
    if (event.button !== MOUSEDOWN_PRIMARY_BUTTON) {
      // Ignore anything except the primary button.
      return;
    }

    if (this._isDraggable(target)) {
      this._dragData = {
        clientX: event.clientX,
        clientY: event.clientY,
        eventTarget: event.target,
        dragTarget: target
      };

      for (let key in this._activeTargets) {
        if (this._activeTargets.hasOwnProperty(key)) {
          let activeTarget = this._activeTargets[key];
          if (activeTarget && activeTarget.root) {
            this._events.on(activeTarget.root, 'mousemove', this._onMouseMove.bind(this, activeTarget));
            this._events.on(activeTarget.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget));
          }
        }
      }
    } else {
      this._dragData = null;
    }
  }

  /**
   * determine whether the child target is a descendant of the parent
   */
  private _isChild(parent: React.ReactInstance, child: React.ReactInstance): boolean {
    let parentElement = ReactDOM.findDOMNode(parent);
    let childElement = ReactDOM.findDOMNode(child);
    while (childElement && childElement.parentElement) {
      if (childElement.parentElement === parentElement) {
        return true;
      }
      childElement = childElement.parentElement;
    }
    return false;
  }

  private _isDraggable(target: IDragDropTarget): boolean {
    let { options } = target;
    return options.canDrag && options.canDrag(options.context.data);
  }

  private _isDroppable(target: IDragDropTarget): boolean {
    // TODO: take the drag item into consideration to prevent dragging an item into the same group
    let { options } = target;
    let dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : null;
    return options.canDrop && options.canDrop(options.context, dragContext);
  }
}