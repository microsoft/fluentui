import * as React from 'react';
import type { IStyle } from '../../../Styling';
import type { IRefObject, ISize, IStyleFunctionOrObject } from '../../../Utilities';
import type { TileSize } from '../Tile.types';

export interface IShimmerTile {}

/**
 * ShimmerTile component props.
 */
export interface IShimmerTileProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerTile interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerTile>;

  /**
   * The intended dimensions for the Tile.
   */
  contentSize?: ISize;

  /**
   * The breakpoint size for the Tile.
   * @default large
   */
  tileSize?: TileSize;

  /**
   * Set to false if you choose not to display a name on the nameplate for the tile.
   * @default true
   */
  itemName?: boolean;

  /**
   * Set to false if you choose not to display a activity on the nameplate for the tile.
   * @default true
   */
  itemActivity?: boolean;

  /**
   * Set to false if you choose not to display a thumbnail of item type above the nameplate for the tile.
   * @default true
   */
  itemThumbnail?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerTileStyleProps, IShimmerTileStyles>;
}

export interface IShimmerTileStyleProps {
  contentSize?: ISize;
}

export interface IShimmerTileStyles {
  root?: IStyle;
}
