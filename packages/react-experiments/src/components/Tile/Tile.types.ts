import * as React from 'react';
import type { IBaseProps, ISize } from '@fluentui/react/lib/Utilities';
import type { ISelection } from '@fluentui/react/lib/Selection';
import { IRenderFunction } from '../../Utilities';

export interface ITileLayout {
  foregroundSize?: ISize | undefined;
  backgroundSize?: ISize | undefined;
}

export type TileSize = keyof {
  small: 'small';
  large: 'large';
};

export interface ITileStateProps extends ITileLayout {
  isSelected?: boolean;
}

export interface ITileForegroundProps extends ITileStateProps {
  foreground: JSX.Element | null;
  hideForeground: boolean;
  className?: string;
}

export interface ITileBackgroundProps extends ITileStateProps {
  background: JSX.Element | null;
  hideBackground: boolean;
  className?: string;
}

export interface ITileNameplateProps extends ITileStateProps {
  isSelected?: boolean;
  itemName?: React.ReactNode;
  itemActivity?: React.ReactNode;
  nameplateOnlyOnHover?: boolean;
  className?: string;
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
   * Full override for rendering the nameplace, which shows the name and activity.
   */
  onRenderNameplate?: IRenderFunction<ITileNameplateProps>;
  /**
   * Content to render as the full-size background of the tile.
   */
  background?: React.ReactNode | ((backgroundProps: ITileLayout) => JSX.Element | null);
  /**
   * Full override for rendering the background.
   */
  onRenderBackground?: IRenderFunction<ITileBackgroundProps>;
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
   * Content to render as the foreground of the tile, bounded by padding and the nameplate.
   */
  foreground?: React.ReactNode | ((foregroundProps: ITileLayout) => JSX.Element | null);
  /**
   * Full override for rendering the foreground.
   */
  onRenderForeground?: IRenderFunction<ITileForegroundProps>;
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

  /* whether the component should be rendered as disabled */
  disabled?: boolean;
}
