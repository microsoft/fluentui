import * as React from 'react';

import { BaseComponent, css, classNamesFunction } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/interfaces';
import { DetailsList } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType, IShimmerElement } from '../../Shimmer';
import {
  IShimmeredDetailsListProps,
  IShimmeredDetailsListStyleProps,
  IShimmeredDetailsListStyles
} from './ShimmeredDetailsList.types';
import { CheckboxVisibility } from './DetailsList.types';

import { IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';

const getRowClassNames = classNamesFunction<IDetailsRowStyleProps, IDetailsRowStyles>();

const getClassNames = classNamesFunction<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>();

const SHIMMER_INITIAL_ITEMS = 10;
const DEFAULT_SHIMMER_HEIGHT = 7;

// This values are matching values from ./DetailsRow.css
const DEFAULT_SIDE_PADDING = 8;
const DEFAULT_ROW_HEIGHT = 42;
const COMPACT_ROW_HEIGHT = 32;

export class ShimmeredDetailsListBase extends BaseComponent<IShimmeredDetailsListProps, {}> {
  private _shimmerItems: null[];

  constructor(props: IShimmeredDetailsListProps) {
    super(props);

    this._shimmerItems = props.shimmerLines ? new Array(props.shimmerLines) : new Array(SHIMMER_INITIAL_ITEMS);
  }

  public render(): JSX.Element {
    const {
      items,
      listProps,
      styles,
      theme,
      shimmerLines,
      onRenderCustomPlaceholder,
      enableShimmer,
      ...detailsListProps
    } = this.props;

    // Adds to the optional listProp classname a fading out overlay classname only when shimmer enabled.
    const classNames = getClassNames(styles, {
      theme: theme!,
      className: listProps && listProps.className,
      enableShimmer
    });

    const newListProps = { ...listProps, className: classNames.root };

    return (
      <DetailsList
        {...detailsListProps}
        enableShimmer={enableShimmer}
        items={enableShimmer ? this._shimmerItems : items}
        onRenderMissingItem={this._onRenderShimmerPlaceholder}
        listProps={newListProps}
      />
    );
  }

  private _onRenderShimmerPlaceholder = (index: number, rowProps: IDetailsRowProps): React.ReactNode => {
    const { onRenderCustomPlaceholder, compact } = this.props;
    const { selectionMode, checkboxVisibility, theme, styles } = rowProps;
    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
    const rowClassNames = getRowClassNames(styles, {
      theme: theme!
    });

    const placeholderElements: React.ReactNode = onRenderCustomPlaceholder
      ? onRenderCustomPlaceholder()
      : this._renderDefaultShimmerPlaceholder(rowProps);

    return (
      <div
        className={css(showCheckbox && rowClassNames.shimmerLeftBorder, !compact && rowClassNames.shimmerBottomBorder)}
      >
        <Shimmer customElementsGroup={placeholderElements} />
      </div>
    );
  };

  private _renderDefaultShimmerPlaceholder = (rowProps: IDetailsRowProps): React.ReactNode => {
    const { columns, compact } = rowProps;
    const shimmerElementsRow: JSX.Element[] = [];
    const gapHeight: number = compact ? COMPACT_ROW_HEIGHT : DEFAULT_ROW_HEIGHT;

    columns.map((column, columnIdx) => {
      const shimmerElements: IShimmerElement[] = [];
      const groupWidth: number = DEFAULT_SIDE_PADDING * 2 + column.calculatedWidth!;

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
          width: column.calculatedWidth! - DEFAULT_SIDE_PADDING * 3,
          height: DEFAULT_SHIMMER_HEIGHT
        });
        shimmerElements.push({
          type: ShimmerElementType.gap,
          width: DEFAULT_SIDE_PADDING * 4,
          height: gapHeight
        });
      }
      shimmerElementsRow.push(
        <ShimmerElementsGroup key={columnIdx} width={`${groupWidth}px`} shimmerElements={shimmerElements} />
      );
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
