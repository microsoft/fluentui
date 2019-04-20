import * as React from 'react';
import { IRefObject } from '../../Utilities';
import { IIconProps } from '../../Icon';
import { IContextualMenuProps } from '../../ContextualMenu';

export interface IDragData {
  position: ICoordinates;
  lastPosition?: ICoordinates;
  delta: ICoordinates;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IDragOptions {
  /**
   * Optional selector for the element where the drag can be initiated. If not supplied when
   * isDraggable is true dragging can be initated by the whole contents of the modal
   */
  dragHandleSelector?: string;

  /**
   * IconProps for the icon used to indicate that the dialog is in keyboard move mode
   */
  keyboardMoveIconProps?: IIconProps;

  /**
   * The text to use for the modal move menu item
   */
  moveMenuItemText: string;

  /**
   * The text to use for the modal close menu item
   */
  closeMenuItemText: string;

  /**
   * The Draggable Control Menu so that the draggable zone can be moved via the keyboard
   */
  menu: React.StatelessComponent<IContextualMenuProps>;
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
