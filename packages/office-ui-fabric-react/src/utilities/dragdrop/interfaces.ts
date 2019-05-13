import * as React from 'react';
import { EventGroup } from '../../Utilities';

/**
 * Helper for subscribing and unsubscribing to
 * drag and drop events on an {@link HTMLElement}.
 */
export interface IDragDropHelper {
  /**
   * Subscribe to events on a DOM node with drag and drop configuration.
   */
  subscribe: (
    root: HTMLElement,
    events: EventGroup,
    options: IDragDropOptions
  ) => {
    key: string;
    dispose: () => void;
  };
  /**
   * Unsubscribe to events registered on a DOM node with key.
   */
  unsubscribe: (root: HTMLElement, key: string) => void;
  /**
   * Dispose of listeners bound to instance of helper.
   */
  dispose: () => void;
}

/**
 * Drag & drop event callback interface.
 */
export interface IDragDropEvents {
  /**
   * Whether or not drop action is allowed.
   */
  canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
  /**
   * Whether or not drag action is allowed.
   */
  canDrag?: (item?: any) => boolean;
  /**
   * On drag enter region event callback.
   */
  onDragEnter?: (item?: any, event?: DragEvent) => string; // return string is the css classes that will be added to the entering element.
  /**
   * On drag leave region event callback.
   */
  onDragLeave?: (item?: any, event?: DragEvent) => void;
  /**
   * On drop event callback.
   */
  onDrop?: (item?: any, event?: DragEvent) => void;
  /**
   * On drag start event callback.
   */
  onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
  /**
   * On drag end event callback.
   */
  onDragEnd?: (item?: any, event?: DragEvent) => void;
}

/**
 * Drag & drop event contextual information.
 */
export interface IDragDropContext {
  /**
   * Data associated with drag & drop action.
   */
  data: any;
  /**
   * Index of drag & drop action.
   */
  index: number;
  /**
   * Whether or not drag & drop region is indivual or group of content.
   */
  isGroup?: boolean;
}

export interface IDragDropTarget {
  root: React.ReactInstance;
  options: IDragDropOptions;
  key: string;
}

/**
 * The drag and drop event listener configuration.
 */
export interface IDragDropOptions {
  /**
   * Unique key to associate with instance.
   */
  key?: string;
  /**
   * Map of event name to callback function to subscribe to.
   */
  eventMap?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];
  /**
   * Selection index on drag and drop event.
   */
  selectionIndex: number;
  /**
   * Context associated with drag and drop event.
   */
  context: IDragDropContext;
  /**
   * Callback on drop state update.
   */
  updateDropState: (isDropping: boolean, event: DragEvent) => void;
  /**
   * Whether or not drop action is allowed.
   */
  canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
  /**
   * Whether or not drag action is allowed.
   */
  canDrag?: (item?: any) => boolean;
  /**
   * On drag start event callback.
   */
  onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
  /**
   * On drop event callback.
   */
  onDrop?: (item?: any, event?: DragEvent) => void;
  /**
   * On drag end event callback.
   */
  onDragEnd?: (item?: any, event?: DragEvent) => void;
  /**
   * On drag over element(s) event callback.
   */
  onDragOver?: (item?: any, event?: DragEvent) => void;
}

export interface IDragDropEvent {
  isHandled?: boolean;
}
