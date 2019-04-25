import * as React from 'react';

export interface IDragData {
  position: ICoordinates;
  lastPosition?: ICoordinates;
  delta: ICoordinates;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IDraggableZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specifies a selector to be used as the handle that initiates drag
   */
  handleSelector?: string;

  /**
   * Specifies a selector to be used to prevent drag initialization.
   * For example, if you do not want buttons inside of your handleSelector
   * to have the cursor change to move or to allow users to select from buttons,
   * you could pass button here (the close button in the header of a dialog is a concrete example)
   */
  preventDragSelector?: string;

  /**
   * the X and Y coordinates to use as an offest to position the draggable content
   */
  position?: ICoordinates;

  /**
   * Callback for when dragging starts
   */
  onStart?: (event: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, dragData: IDragData) => void;

  /**
   * Callback for when the drag changes, while dragging
   */
  onDragChange?: (event: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, dragData: IDragData) => void;

  /**
   * Callback for when dragging stops
   */
  onStop?: (event: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, dragData: IDragData) => void;
}
