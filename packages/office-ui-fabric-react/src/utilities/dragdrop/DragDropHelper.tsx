import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventGroup } from '../../Utilities';
import {
  IDragDropHelper,
  IDragDropTarget,
  IDragDropOptions,
  IDragDropEvent,
  IDragDropContext
} from './interfaces';
import { ISelection } from '../../utilities/selection/interfaces';

const DISTANCE_FOR_DRAG_SQUARED = 25; // the minimum mouse move distance to treat it as drag event
const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

export interface IDragDropHelperParams {
  selection: ISelection;
  minimumPixelsForDrag?: number;
}

export class DragDropHelper implements IDragDropHelper {
  private _dragEnterCounts: { [key: string]: number };
  private readonly _distanceSquaredForDrag: number;
  private _isDragging: boolean;
  private _dragData: {
    eventTarget: EventTarget;
    clientX: number;
    clientY: number;
    dataTransfer?: DataTransfer;
    dropTarget?: IDragDropTarget;
    dragTarget?: IDragDropTarget;
  } | null;
  private _selection: ISelection;
  private _activeTargets: {
    [key: string]: {
      target: IDragDropTarget;
      dispose: () => void;
    };
  };
  private _events: EventGroup;
  private _lastId: number;

  constructor(params: IDragDropHelperParams) {
    this._selection = params.selection;
    this._dragEnterCounts = {};
    this._activeTargets = {};
    this._lastId = 0;
    this._distanceSquaredForDrag = typeof params.minimumPixelsForDrag === 'number' ?
      params.minimumPixelsForDrag * params.minimumPixelsForDrag : DISTANCE_FOR_DRAG_SQUARED;

    this._events = new EventGroup(this);
    // clear drag data when mouse up, use capture event to ensure it will be run
    this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
    this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
  }

  public dispose() {
    this._events.dispose();
  }

  public subscribe(root: HTMLElement, events: EventGroup, dragDropOptions: IDragDropOptions): {
    key: string;
    dispose(): void;
  } {
    const {
      key = `${++this._lastId}`
    } = dragDropOptions;

    const handlers: {
      callback: (context: IDragDropContext, event?: any) => void;
      eventName: string;
    }[] = [];

    let onDragStart: (event: DragEvent) => void;
    let onDragLeave: (event: DragEvent) => void;
    let onDragEnter: (event: DragEvent) => void;
    let onDragEnd: (event: DragEvent) => void;
    let onDrop: (event: DragEvent) => void;
    let onDragOver: (event: DragEvent) => void;
    let onMouseDown: (event: MouseEvent) => void;

    let isDraggable: boolean;
    let isDroppable: boolean;

    let activeTarget: {
      target: IDragDropTarget;
      dispose: () => void;
    };

    if (dragDropOptions && root) {
      const {
        eventMap,
        context,
        updateDropState
      } = dragDropOptions;

      const dragDropTarget: IDragDropTarget = {
        root: root,
        options: dragDropOptions,
        key: key
      };

      isDraggable = this._isDraggable(dragDropTarget);
      isDroppable = this._isDroppable(dragDropTarget);

      if (isDraggable || isDroppable) {
        if (eventMap) {
          for (const event of eventMap) {
            const handler = {
              callback: event.callback.bind(null, context),
              eventName: event.eventName
            };

            handlers.push(handler);

            this._events.on(root, handler.eventName, handler.callback);
          }
        }
      }

      if (isDroppable) {
        // If the target is droppable, wire up global event listeners to track drop-related events.
        onDragLeave = (event: DragEvent) => {
          if (!(event as IDragDropEvent).isHandled) {
            (event as IDragDropEvent).isHandled = true;
            this._dragEnterCounts[key]--;
            if (this._dragEnterCounts[key] === 0) {
              updateDropState(false /* isDropping */, event);
            }
          }
        };

        onDragEnter = (event: DragEvent) => {
          event.preventDefault(); // needed for IE
          if (!(event as IDragDropEvent).isHandled) {
            (event as IDragDropEvent).isHandled = true;
            this._dragEnterCounts[key]++;
            if (this._dragEnterCounts[key] === 1) {
              updateDropState(true /* isDropping */, event);
            }
          }
        };

        onDragEnd = (event: DragEvent) => {
          this._dragEnterCounts[key] = 0;
          updateDropState(false /* isDropping */, event);
        };

        onDrop = (event: DragEvent) => {
          this._dragEnterCounts[key] = 0;
          updateDropState(false /* isDropping */, event);

          if (dragDropOptions.onDrop) {
            dragDropOptions.onDrop(dragDropOptions.context.data, event);
          }
        };

        onDragOver = (event: DragEvent) => {
          event.preventDefault();
        };

        this._dragEnterCounts[key] = 0;

        // dragenter and dragleave will be fired when hover to the child element
        // but we only want to change state when enter or leave the current element
        // use the count to ensure it.
        events.on(root, 'dragenter', onDragEnter);
        events.on(root, 'dragleave', onDragLeave);
        events.on(root, 'dragend', onDragEnd);
        events.on(root, 'drop', onDrop);
        events.on(root, 'dragover', onDragOver);
      }

      if (isDraggable) {
        // If the target is draggable, wire up local event listeners for mouse events.
        onMouseDown = this._onMouseDown.bind(this, dragDropTarget);
        onDragEnd = this._onDragEnd.bind(this, dragDropTarget);

        // We need to add in data so that on Firefox we show the ghost element when dragging
        onDragStart = (event: DragEvent) => {
          event.dataTransfer.setData('id', root.id);
        };

        events.on(root, 'dragstart', onDragStart);
        events.on(root, 'mousedown', onMouseDown);
        events.on(root, 'dragend', onDragEnd);
      }

      activeTarget = {
        target: dragDropTarget,
        dispose: () => {
          if (this._activeTargets[key] === activeTarget) {
            delete this._activeTargets[key];
          }

          if (root) {
            for (const handler of handlers) {
              this._events.off(root, handler.eventName, handler.callback);
            }

            if (isDroppable) {
              events.off(root, 'dragenter', onDragEnter);
              events.off(root, 'dragleave', onDragLeave);
              events.off(root, 'dragend', onDragEnd);
              events.off(root, 'dragover', onDragOver);
              events.off(root, 'drop', onDrop);
            }

            if (isDraggable) {
              events.off(root, 'dragstart', onDragStart);
              events.off(root, 'mousedown', onMouseDown);
              events.off(root, 'dragend', onDragEnd);
            }
          }
        }
      };

      this._activeTargets[key] = activeTarget;
    }

    return {
      key: key,
      dispose: () => {
        if (activeTarget) {
          activeTarget.dispose();
        }
      }
    };
  }

  public unsubscribe(root: HTMLElement, key: string): void {
    const activeTarget = this._activeTargets[key];

    if (activeTarget) {
      activeTarget.dispose();
    }
  }

  private _onDragEnd(target: IDragDropTarget, event: DragEvent) {
    let { options } = target;
    if (options.onDragEnd) {
      options.onDragEnd(options.context.data, event);
    }
  }

  /**
   * clear drag data when mouse up on body
   */
  private _onMouseUp(event: MouseEvent) {
    this._isDragging = false;
    if (this._dragData) {
      for (const key of Object.keys(this._activeTargets)) {
        const activeTarget = this._activeTargets[key];

        if (activeTarget.target.root) {
          this._events.off(activeTarget.target.root, 'mousemove');
          this._events.off(activeTarget.target.root, 'mouseleave');
        }
      }

      if (this._dragData.dropTarget) {
        // raise dragleave event to let dropTarget know it need to remove dropping style
        EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
        EventGroup.raise(this._dragData.dropTarget.root, 'drop');
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

    let { root, options, key } = target;
    if (this._isDragging) {
      if (this._isDroppable(target)) {
        // we can have nested drop targets in the DOM, like a folder inside a group. In that case, when we drag into
        // the inner target (folder), we first set dropTarget to the inner element. But the same event is bubbled to the
        // outer target too, and we need to prevent the outer one from taking over.
        // So, check if the last dropTarget is not a child of the current.

        if (this._dragData) {
          if (this._dragData.dropTarget &&
            this._dragData.dropTarget.key !== key &&
            !this._isChild(root, this._dragData.dropTarget.root)) {
            EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
            this._dragData.dropTarget = undefined;
          }

          if (!this._dragData.dropTarget) {
            EventGroup.raise(root, 'dragenter');
            this._dragData.dropTarget = target;
          }
        }
      }
    } else if (this._dragData) {
      if (this._isDraggable(target)) {
        let xDiff = this._dragData.clientX - event.clientX;
        let yDiff = this._dragData.clientY - event.clientY;
        if (xDiff * xDiff + yDiff * yDiff >= this._distanceSquaredForDrag) {
          if (this._dragData.dragTarget) {
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
      if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.key === target.key) {
        EventGroup.raise(target.root, 'dragleave');
        this._dragData.dropTarget = undefined;
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

      for (const key of Object.keys(this._activeTargets)) {
        const activeTarget = this._activeTargets[key];
        if (activeTarget.target.root) {
          this._events.on(activeTarget.target.root, 'mousemove', this._onMouseMove.bind(this, activeTarget.target));
          this._events.on(activeTarget.target.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget.target));
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
    return !!(options.canDrag && options.canDrag(options.context.data));
  }

  private _isDroppable(target: IDragDropTarget): boolean {
    // TODO: take the drag item into consideration to prevent dragging an item into the same group
    let { options } = target;
    let dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : undefined;
    return !!(options.canDrop && options.canDrop(options.context, dragContext));
  }
}
