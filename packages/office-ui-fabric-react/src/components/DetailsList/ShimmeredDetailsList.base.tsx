import * as React from 'react';

import { BaseComponent, classNamesFunction } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/interfaces';
import { DetailsList } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow.types';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType, IShimmerElement } from '../../Shimmer';
import { IShimmeredDetailsListProps, IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';
import { CheckboxVisibility } from './DetailsList.types';

import { DEFAULT_CELL_STYLE_PROPS, DEFAULT_ROW_HEIGHTS } from './DetailsRow.styles';

const getClassNames = classNamesFunction<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>();

const SHIMMER_INITIAL_ITEMS = 10;
const DEFAULT_SHIMMER_HEIGHT = 7;
const SHIMMER_LINE_VS_CELL_WIDTH_RATIO = 0.95;

export class ShimmeredDetailsListBase extends BaseComponent<IShimmeredDetailsListProps, {}> {
  private _shimmerItems: null[];

  constructor(props: IShimmeredDetailsListProps) {
    super(props);

    this._shimmerItems = props.shimmerLines ? new Array(props.shimmerLines) : new Array(SHIMMER_INITIAL_ITEMS);
  }

  public render(): JSX.Element {
    const { listProps, styles, theme, shimmerLines, onRenderCustomPlaceholder, enableShimmer, detailsListProps, ...restProps } = this.props;

    // TODO: cleanup in Fabric 7.0.
    let listClassName = listProps && listProps.className;
    if (detailsListProps && detailsListProps.listProps) {
      listClassName = detailsListProps.listProps.className;
    }

    // TODO: cleanup in Fabric 7.0.
    let items = this.props.items;
    if (detailsListProps) {
      items = detailsListProps.items;
    }

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: listClassName,
      enableShimmer
    });

    const newListProps = {
      ...listProps,
      ...(detailsListProps && detailsListProps.listProps),
      // Adds to the optional listProp className a fading out overlay className only when shimmer enabled.
      className: enableShimmer ? classNames.root : listClassName
    };

    return (
      <DetailsList
        {...restProps}
        {...detailsListProps}
        items={enableShimmer ? this._shimmerItems : items}
        onRenderMissingItem={this._onRenderShimmerPlaceholder}
        listProps={newListProps}
      />
    );
  }

  private _onRenderShimmerPlaceholder = (index: number, rowProps: IDetailsRowProps): React.ReactNode => {
    const { onRenderCustomPlaceholder, styles, theme } = this.props;

    const { selectionMode, checkboxVisibility, compact } = rowProps;

    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;

    const rowClassNames = getClassNames(styles, {
      theme: theme!,
      compact,
      showCheckbox
    });

    const placeholderElements: React.ReactNode = onRenderCustomPlaceholder
      ? onRenderCustomPlaceholder(rowProps)
      : this._renderDefaultShimmerPlaceholder(rowProps);

    return (
      <div className={rowClassNames.rowPlaceholderWrapper}>
        <Shimmer customElementsGroup={placeholderElements} />
      </div>
    );
  };

  private _renderDefaultShimmerPlaceholder = (rowProps: IDetailsRowProps): React.ReactNode => {
    const { columns, compact, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = rowProps;
    const shimmerElementsRow: JSX.Element[] = [];
    const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;
    const gapHeight: number = compact ? compactRowHeight : rowHeight;

    columns.map((column, columnIdx) => {
      const shimmerElements: IShimmerElement[] = [];
      const groupWidth: number =
        cellStyleProps.cellLeftPadding +
        cellStyleProps.cellRightPadding +
        column.calculatedWidth! +
        (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);

      shimmerElements.push({
        type: ShimmerElementType.gap,
        width: cellStyleProps.cellLeftPadding,
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
          width: cellStyleProps.cellRightPadding,
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
            cellStyleProps.cellRightPadding +
            (column.calculatedWidth! - column.calculatedWidth! * SHIMMER_LINE_VS_CELL_WIDTH_RATIO) +
            (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0),
          height: gapHeight
        });
      }
      shimmerElementsRow.push(<ShimmerElementsGroup key={columnIdx} width={`${groupWidth}px`} shimmerElements={shimmerElements} />);
    });
    // When resizing the window from narrow to wider, we need to cover the exposed Shimmer wave until the column resizing logic is done.
    shimmerElementsRow.push(
      <ShimmerElementsGroup
        key={'endGap'}
        width={'100%'}
        shimmerElements={[{ type: ShimmerElementType.gap, width: '100%', height: gapHeight }]}
      />
    );
    return <div style={{ display: 'flex' }}>{shimmerElementsRow}</div>;
  };
}
