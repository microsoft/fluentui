import * as React from 'react';
import { initializeComponentRef, classNamesFunction } from '../../../Utilities';
import { TileLayoutSizes } from '../Tile';
import { ShimmerGap, ShimmerElementsGroup, ShimmerElementType } from '@fluentui/react/lib/Shimmer';
import type { IShimmerTileProps, IShimmerTileStyleProps, IShimmerTileStyles } from './ShimmerTile.types';
import type { TileSize } from '../Tile.types';

const ShimmerTileLayoutValues = {
  largeSquareWidth: 96,
  largeSquareHeight: 96,
  largeNameWidth: 144,
  largeNameHeight: 7,
  largeActivityWidth: 96,
  largeActivityHeight: 7,
  smallSquareWidth: 62,
  smallSquareHeight: 61,
  smallNameWidth: 106,
  smallNameHeight: 5,
  smallActivityWidth: 62,
  smallActivityHeight: 5,
};

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
    activityHeight: ShimmerTileLayoutValues.smallActivityHeight,
  },
  large: {
    squareWidth: ShimmerTileLayoutValues.largeSquareWidth,
    squareHeight: ShimmerTileLayoutValues.largeSquareHeight,
    nameWidth: ShimmerTileLayoutValues.largeNameWidth,
    nameHeight: ShimmerTileLayoutValues.largeNameHeight,
    activityWidth: ShimmerTileLayoutValues.largeActivityWidth,
    activityHeight: ShimmerTileLayoutValues.largeActivityHeight,
  },
};

const getClassNames = classNamesFunction<IShimmerTileStyleProps, IShimmerTileStyles>();

export class ShimmerTileBase extends React.Component<IShimmerTileProps, {}> {
  private _classNames: { [key in keyof IShimmerTileStyles]: string };

  constructor(props: IShimmerTileProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const {
      styles,
      contentSize = { width: 176, height: 171 },
      itemActivity = true,
      itemName = true,
      itemThumbnail = true,
      tileSize = 'large',
    } = this.props;

    const { nameplatePadding, nameplateMargin, nameplateActivityHeight, nameplateNameHeight } =
      TileLayoutSizes[tileSize];

    const { squareWidth, squareHeight, nameWidth, nameHeight, activityWidth, activityHeight } =
      PLACEHOLDER_SIZES[tileSize];

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

    this._classNames = getClassNames(styles!, {});

    return (
      <div className={this._classNames.root}>
        <ShimmerGap width={contentSize.width} height={contentSize.height - squareHeight - nameplateHeight} />
        <ShimmerElementsGroup
          shimmerElements={[
            {
              type: ShimmerElementType.gap,
              width: (contentSize.width - squareWidth) / 2,
              height: squareHeight,
            },
            itemThumbnail
              ? {
                  type: ShimmerElementType.line,
                  width: squareWidth,
                  height: squareHeight,
                }
              : {
                  type: ShimmerElementType.gap,
                  width: squareWidth,
                  height: squareHeight,
                },
            {
              type: ShimmerElementType.gap,
              width: (contentSize.width - squareWidth) / 2,
              height: squareHeight,
            },
          ]}
        />
        {itemActivity || itemName ? (
          <div>
            <ShimmerGap width={contentSize.width} height={nameplatePadding} />
            {itemName ? (
              <ShimmerElementsGroup
                shimmerElements={[
                  {
                    type: ShimmerElementType.gap,
                    width: (contentSize.width - nameWidth) / 2,
                    height: nameplateNameHeight,
                  },
                  {
                    type: ShimmerElementType.line,
                    width: nameWidth,
                    height: nameHeight,
                  },
                  {
                    type: ShimmerElementType.gap,
                    width: (contentSize.width - nameWidth) / 2,
                    height: nameplateNameHeight,
                  },
                ]}
              />
            ) : null}
            {itemActivity ? (
              <ShimmerElementsGroup
                shimmerElements={[
                  {
                    type: ShimmerElementType.gap,
                    width: (contentSize.width - activityWidth) / 2,
                    height: nameplateActivityHeight,
                  },
                  {
                    type: ShimmerElementType.line,
                    width: activityWidth,
                    height: activityHeight,
                  },
                  {
                    type: ShimmerElementType.gap,
                    width: (contentSize.width - activityWidth) / 2,
                    height: nameplateActivityHeight,
                  },
                ]}
              />
            ) : null}
            <ShimmerGap width={contentSize.width} height={nameplatePadding} />
          </div>
        ) : null}
      </div>
    );
  }
}
