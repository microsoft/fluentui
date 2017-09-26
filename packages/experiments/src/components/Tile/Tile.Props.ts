
import * as React from 'react';
import { IBaseProps, ISize } from 'office-ui-fabric-react/lib/Utilities';
import { ISelection } from 'office-ui-fabric-react/lib/Selection';

export type TileSize = keyof {
  small: 'small',
  large: 'large'
};

export interface ITileProps extends IBaseProps, React.AllHTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
  /**
   * The intended dimensions for the Tile.
   *
   * @type {ISize}
   * @memberof ITileProps
   */
  contentSize?: ISize;
  /**
   * The breakpoint size for the Tile.
   *
   * @type {TileSize}
   * @memberof ITileProps
   */
  tileSize?: TileSize;
  /**
   * Index of the item in the selection controller.
   *
   * @type {number}
   * @memberof ITileProps
   */
  selectionIndex?: number;
  /**
   * Selection controller for the item rendered in the tile.
   *
   * @type {ISelection}
   * @memberof ITileProps
   */
  selection?: ISelection;
  /**
   * Name to use on the nameplate for the tile.
   *
   * @type {(React.ReactNode | React.ReactNode[])}
   * @memberof ITileProps
   */
  itemName?: React.ReactNode | React.ReactNode[];
  /**
   * Activity to use on the nameplate for the tile.
   *
   * @type {(React.ReactNode | React.ReactNode[])}
   * @memberof ITileProps
   */
  itemActivity?: React.ReactNode | React.ReactNode[];
  /**
   * Content to render as the full-size background of the tile.
   *
   * @type {(React.ReactNode | React.ReactNode[])}
   * @memberof ITileProps
   */
  background?: React.ReactNode | React.ReactNode[];
  /**
   * Whether or not to frame the background.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  showBackgroundFrame?: boolean;
  /**
   * Whether or not to hide the background, regardless of whether it is present.
   * Use this to control when the background "fades in" if the content needs to be loaded.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  hideBackground?: boolean;
  /**
   * Content to render as the foreground of the tile, bounded by padding and the nameplate.
   *
   * @type {(React.ReactNode | React.ReactNode[])}
   * @memberof ITileProps
   */
  foreground?: React.ReactNode | React.ReactNode[];
  /**
   * Whether or not to frame the foreground.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  showForegroundFrame?: boolean;
  /**
   * Whether or not to hide the foreground, regardless of whether it is present.
   * Use this to control when the foreground "fades in" if the content needs to be loaded.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  hideForeground?: boolean;
  /**
   * The accessible label representing the tile and its content.
   *
   * @type {string}
   * @memberof ITileProps
   */
  ariaLabel?: string;
  /**
   * The accessible label providing description or instructions for the tile.
   *
   * @type {string}
   * @memberof ITileProps
   */
  descriptionAriaLabel?: string;
  /**
   * The accessible label for the selection checkbox.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  toggleSelectionAriaLabel?: boolean;
}
