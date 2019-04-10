import * as React from 'react';
import { IRefObject } from '../../Utilities';

export interface IDragData {
  position: ICoordinates;
  lastPosition?: ICoordinates;
  delta: ICoordinates;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IDraggableZone {}

export interface IDraggableZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IDraggableZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDraggableZone>;

  /**
   * Specifies a selector to be used as the handle that initiates drag
   */
  handleSelector?: string;

  /**
   * Specifies a selector to be used to prevent drag initialization
   */
  preventDragSelector?: string;

  /**
   * children. Needed so we can get at the already defined props on the children passed in
   */
  children: React.ReactElement<any>;

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
