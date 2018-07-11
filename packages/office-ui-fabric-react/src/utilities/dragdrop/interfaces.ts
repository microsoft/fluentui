import * as React from 'react';
import { EventGroup } from '../../Utilities';

export interface IDragDropHelper {
  subscribe: (
    root: HTMLElement,
    events: EventGroup,
    options: IDragDropOptions
  ) => {
    key: string;
    dispose: () => void;
  };
  unsubscribe: (root: HTMLElement, key: string) => void;
  dispose: () => void;
}

export interface IDragDropEvents {
  canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
  canDrag?: (item?: any) => boolean;
  onDragEnter?: (item?: any, event?: DragEvent) => string; // return string is the css classes that will be added to the enterring element.
  onDragLeave?: (item?: any, event?: DragEvent) => void;
  onDrop?: (item?: any, event?: DragEvent) => void;
  onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
  onDragEnd?: (item?: any, event?: DragEvent) => void;
}

export interface IDragDropContext {
  data: any;
  index: number;
  isGroup?: boolean;
}

export interface IDragDropTarget {
  root: React.ReactInstance;
  options: IDragDropOptions;
  key: string;
}

export interface IDragDropOptions {
  key?: string;
  eventMap?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];
  selectionIndex: number;
  context: IDragDropContext;
  updateDropState: (isDropping: boolean, event: DragEvent) => void;
  canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
  canDrag?: (item?: any) => boolean;
  onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
  onDrop?: (item?: any, event?: DragEvent) => void;
  onDragEnd?: (item?: any, event?: DragEvent) => void;
  onDragOver?: (item?: any, event?: DragEvent) => void;
}

export interface IDragDropEvent {
  isHandled?: boolean;
}
