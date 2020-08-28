import * as React from 'react';
import { IBaseProps, ISize } from 'office-ui-fabric-react/lib/Utilities';
import { ISelection } from 'office-ui-fabric-react/lib/Selection';

export type TileSize = keyof {
  small: 'small';
  large: 'large';
};

export interface ITileForegroundProps {
  foregroundSize?: ISize;
}

export interface ITileBackgroundProps {
  backgroundSize?: ISize;
}

export interface ITileProps extends IBaseProps, React.AllHTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
  /**
   * The intended dimensions for the Tile.
   */
  contentSize?: ISize;
  /**
   * The breakpoint size for the Tile.
   */
  tileSize?: TileSize;
  /**
   * Index of the item in the selection controller.
   */
  selectionIndex?: number;
  /**
   * Whether or not item is selectable;
   */
  isSelectable?: boolean;
  /**
   * A class to apply if the tile can neither be selected nor invoked.
   */
  disabledClassName?: string;
  /**
   * Selection controller for the item rendered in the tile.
   */
  selection?: ISelection;
  /**
   * Whether or not the item should be invoked if clicked.
   */
  invokeSelection?: boolean;
  /**
   * Name to use on the nameplate for the tile.
   */
  itemName?: React.ReactNode;
  /**
   * Activity to use on the nameplate for the tile.
   */
  itemActivity?: React.ReactNode;
  /**
   * Content to render as the full-size background of the tile.
   */
  background?: React.ReactNode | ((backgroundProps: ITileBackgroundProps) => JSX.Element);
  /**
   * Whether or not to frame the background.
   */
  showBackgroundFrame?: boolean;
  /**
   * Whether or not to hide the background, regardless of whether it is present.
   * Use this to control when the background "fades in" if the content needs to be loaded.
   */
  hideBackground?: boolean;
  /**
   * Whether or not to disable interactivity with the background.
   * Set this to ensure smooth operation of drag/drop when dragging from the background.
   */
  disableBackground?: boolean;
  /**
   * Content to render as the foreground of the tile, bounded by padding and the nameplate.
   */
  foreground?: React.ReactNode | ((foregroundProps: ITileForegroundProps) => JSX.Element);
  /**
   * Whether or not to frame the foreground.
   */
  showForegroundFrame?: boolean;
  /**
   * Whether or not to hide the foreground, regardless of whether it is present.
   * Use this to control when the foreground "fades in" if the content needs to be loaded.
   */
  hideForeground?: boolean;
  /**
   * Whether or not to disable interactivity with the foreground.
   * Set this to ensure smooth operation of drag/drop when dragging from the foreground.
   */
  disableForeground?: boolean;
  /**
   * The accessible label representing the tile and its content.
   */
  ariaLabel?: string;
  /**
   * The accessible label providing description or instructions for the tile.
   */
  descriptionAriaLabel?: string;
  /**
   * The accessible label for the selection checkbox.
   */
  toggleSelectionAriaLabel?: string;

  /**
   * Link ref
   */
  linkRef?: (element: HTMLAnchorElement | HTMLButtonElement | null) => void;

  /**
   * Whether the component should render with Fluent styling or not
   */
  isFluentStyling?: boolean;

  /**
   * The accessible label representing tile selected state.
   */
  ariaLabelSelected?: string;

  /*
   * Hide nameplate and activity until the tile is hovered or selected (applies only to media tiles)
   */
  nameplateOnlyOnHover?: boolean;

  /**
   * Whether or not a drag is being initiated from the tile.
   */
  isDragging?: boolean;
  /**
   * Whether or not the tile is currently and active drop target.
   */
  isDropping?: boolean;

  /**
   * A class to apply when the tile is the active drag source.
   */
  draggingClassName?: string;
  /**
   * A class to apply when the tile is the active drop target.
   */
  droppingClassName?: string;
}
