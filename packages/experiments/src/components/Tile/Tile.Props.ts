
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { Selection } from 'office-ui-fabric-react/lib/utilities/selection/Selection';

export interface ITileProps extends IBaseProps, React.AllHTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
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
   * @type {Selection}
   * @memberof ITileProps
   */
  selection?: Selection;
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
   * The accessible label for the selection checkbox.
   *
   * @type {boolean}
   * @memberof ITileProps
   */
  toggleSelectionAriaLabel?: boolean;
}
