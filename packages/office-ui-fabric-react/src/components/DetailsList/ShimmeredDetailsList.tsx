import * as React from 'react';

import { BaseComponent, css } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/interfaces';
import { IDetailsListProps, CheckboxVisibility } from './DetailsList.types';
import { DetailsList } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType, IShimmerElement } from '../Shimmer';

import * as rowStyles from './DetailsRow.scss';
import * as listStyles from './DetailsList.scss';

export interface IShimmeredDetailsListProps extends IDetailsListProps {
  shimmerLines?: number;
  onRenderCustomPlaceholder?: () => React.ReactNode;
}

const SHIMMER_INITIAL_ITEMS = 10;
const DEFAULT_SHIMMER_HEIGHT = 7;
const SHIMMER_LINE_VS_CELL_WIDTH_RATIO = 0.95;

// This values are matching values from ./DetailsRow.css
const DEFAULT_SIDE_PADDING = 8;
const DEFAULT_EXTRA_SIDE_PADDING = 24;
const DEFAULT_ROW_HEIGHT = 42;
const COMPACT_ROW_HEIGHT = 32;

export class ShimmeredDetailsList extends BaseComponent<IShimmeredDetailsListProps, {}> {
  private _shimmerItems: null[];

  constructor(props: IShimmeredDetailsListProps) {
    super(props);

    this._shimmerItems = props.shimmerLines ? new Array(props.shimmerLines) : new Array(SHIMMER_INITIAL_ITEMS);
  }

  public render(): JSX.Element {
    const { items, listProps } = this.props;
    const { shimmerLines, onRenderCustomPlaceholder, enableShimmer, ...detailsListProps } = this.props;

    // Adds to the optional listProp classname a fading out overlay classname only when shimmer enabled.
    const shimmeredListClassname: string = css(
      listProps && listProps.className,
      enableShimmer && listStyles.shimmerFadeOut
    );
    const newListProps = { ...listProps, className: shimmeredListClassname };

    return (
      <DetailsList
        { ...detailsListProps }
        items={ enableShimmer ? this._shimmerItems : items }
        onRenderMissingItem={ this._onRenderShimmerPlaceholder }
        listProps={ newListProps }
      />
    );
  }

  private _onRenderShimmerPlaceholder = (index: number, rowProps: IDetailsRowProps): React.ReactNode => {
    const { onRenderCustomPlaceholder, compact } = this.props;
    const { selectionMode, checkboxVisibility } = rowProps;
    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;

    const placeholderElements: React.ReactNode = onRenderCustomPlaceholder
      ? onRenderCustomPlaceholder()
      : this._renderDefaultShimmerPlaceholder(rowProps);

    return (
      <div className={ css(showCheckbox && rowStyles.shimmerLeftBorder, !compact && rowStyles.shimmerBottomBorder) }>
        <Shimmer customElementsGroup={ placeholderElements } />
      </div>
    );
  }

  private _renderDefaultShimmerPlaceholder = (rowProps: IDetailsRowProps): React.ReactNode => {
    const { columns, compact } = rowProps;
    const shimmerElementsRow: JSX.Element[] = [];
    const gapHeight: number = compact ? COMPACT_ROW_HEIGHT : DEFAULT_ROW_HEIGHT;

    columns.map((column, columnIdx) => {
      const shimmerElements: IShimmerElement[] = [];
      const groupWidth: number =
        DEFAULT_SIDE_PADDING * 2 +
        column.calculatedWidth! +
        (column.isPadded ? DEFAULT_EXTRA_SIDE_PADDING : 0);

      shimmerElements.push({
        type: ShimmerElementType.gap,
        width: DEFAULT_SIDE_PADDING,
        height: gapHeight
      });

      if (column.isIconOnly) {
        shimmerElements.push({
          type: ShimmerElementType.line,
          width: column.calculatedWidth!,
          height: column.calculatedWidth!
        });
        shimmerElements.push({
          type: ShimmerElementType.gap,
          width: DEFAULT_SIDE_PADDING,
          height: gapHeight
        });
      } else {
        shimmerElements.push({
          type: ShimmerElementType.line,
          width: column.calculatedWidth! * SHIMMER_LINE_VS_CELL_WIDTH_RATIO,
          height: DEFAULT_SHIMMER_HEIGHT
        });
        shimmerElements.push({
          type: ShimmerElementType.gap,
          width:
            DEFAULT_SIDE_PADDING +
            (column.calculatedWidth! - column.calculatedWidth! * SHIMMER_LINE_VS_CELL_WIDTH_RATIO) +
            (column.isPadded ? DEFAULT_EXTRA_SIDE_PADDING : 0),
          height: gapHeight
        });
      }
      shimmerElementsRow.push(
        <ShimmerElementsGroup key={ columnIdx } width={ `${groupWidth}px` } shimmerElements={ shimmerElements } />
      );
    });
    // When resizing the window from narrow to wider, we need to cover the exposed Shimmer wave until the column resizing logic is done.
    shimmerElementsRow.push(
      <ShimmerElementsGroup
        key={ 'endGap' }
        width={ '100%' }
        shimmerElements={ [{ type: ShimmerElementType.gap, width: '100%', height: gapHeight }] }
      />
    );
    return <div style={ { display: 'flex' } }>{ shimmerElementsRow }</div>;
  }
}
