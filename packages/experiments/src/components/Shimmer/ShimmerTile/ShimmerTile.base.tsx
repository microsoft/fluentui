import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../../Utilities';
import {
  IShimmerTileProps,
  IShimmerTileStyleProps,
  IShimmerTileStyles
} from './ShimmerTile.types';
import { SIZES, TileSize } from 'experiments/lib/Tile';
import { ShimmerGap } from '../ShimmerGap/ShimmerGap';
import { ShimmerLine } from '../ShimmerLine/ShimmerLine';

const enum ShimmerTileLayoutValues {
  largeSquareWidth = 96,
  largeSquareHeight = 96,
  largeNameWidth = 144,
  largeNameHeight = 7,
  largeActivityWidth = 96,
  largeActivityHeight = 7,
  smallSquareWidth = 62,
  smallSquareHeight = 61,
  smallNameWidth = 106,
  smallNameHeight = 5,
  smallActivityWidth = 62,
  smallActivityHeight = 5,
}

const PLACEHOLDER_SIZES: {
  [P in TileSize]: {
    squareWidth: number;
    squareHeight: number;
    nameWidth: number;
    nameHeight: number;
    activityWidth: number;
    activityHeight: number;
  };
} = {
    small: {
      squareWidth: ShimmerTileLayoutValues.smallSquareWidth,
      squareHeight: ShimmerTileLayoutValues.smallSquareHeight,
      nameWidth: ShimmerTileLayoutValues.smallNameWidth,
      nameHeight: ShimmerTileLayoutValues.smallNameHeight,
      activityWidth: ShimmerTileLayoutValues.smallActivityWidth,
      activityHeight: ShimmerTileLayoutValues.smallActivityHeight
    },
    large: {
      squareWidth: ShimmerTileLayoutValues.largeSquareWidth,
      squareHeight: ShimmerTileLayoutValues.largeSquareHeight,
      nameWidth: ShimmerTileLayoutValues.largeNameWidth,
      nameHeight: ShimmerTileLayoutValues.largeNameHeight,
      activityWidth: ShimmerTileLayoutValues.largeActivityWidth,
      activityHeight: ShimmerTileLayoutValues.largeActivityHeight
    }
  };

const getClassNames = classNamesFunction<IShimmerTileStyleProps, IShimmerTileStyles>();

export class ShimmerTileBase extends BaseComponent<IShimmerTileProps, {}> {
  private _classNames: {[key in keyof IShimmerTileStyles]: string};

  constructor(props: IShimmerTileProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      getStyles,
      contentSize = { width: 176, height: 171 },
      itemActivity = true,
      itemName = true,
      itemThumbnail = true,
      tileSize = 'large'
    } = this.props;

    const {
      nameplatePadding,
      nameplateMargin,
      nameplateActivityHeight,
      nameplateNameHeight,
      foregroundMargin
    } = SIZES[tileSize];

    const {
      squareWidth,
      squareHeight,
      nameWidth,
      nameHeight,
      activityWidth,
      activityHeight
    } = PLACEHOLDER_SIZES[tileSize];

    let nameplateHeight = 0;

    if (itemName || itemActivity) {
      nameplateHeight += nameplatePadding * 2;
      if (itemName) {
        nameplateHeight += nameplateNameHeight;
      }
      if (itemActivity) {
        nameplateHeight += nameplateActivityHeight + nameplateMargin;
      }
    }

    this._classNames = getClassNames(getStyles!, {});

    return (
      <div
        className={ this._classNames.root }
      >
        <ShimmerGap
          widthInPixel={ contentSize.width }
          height={ contentSize.height - squareHeight - nameplateHeight }
        />
        <div
          className={ this._classNames.thumbnail }
        >
          <ShimmerGap
            widthInPixel={ (contentSize.width - squareWidth) / 2 }
            height={ squareHeight }
          />
          {
            itemThumbnail ?
              <ShimmerLine
                widthInPixel={ squareWidth }
                height={ squareHeight }
              /> :
              <ShimmerGap
                widthInPixel={ squareWidth }
                height={ squareHeight }
              />
          }
          <ShimmerGap
            widthInPixel={ (contentSize.width - squareWidth) / 2 }
            height={ squareHeight }
          />
        </div>
      </div>
    );
  }
}