import * as React from 'react';

import { classNamesFunction, css } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/interfaces';
import { DetailsList } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow.types';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType, IShimmerElement } from '../../Shimmer';
import {
  IShimmeredDetailsListProps,
  IShimmeredDetailsListStyleProps,
  IShimmeredDetailsListStyles,
} from './ShimmeredDetailsList.types';
import { CheckboxVisibility } from './DetailsList.types';
import { useShallowMemo } from '@uifabric/react-hooks';

import { DEFAULT_CELL_STYLE_PROPS, DEFAULT_ROW_HEIGHTS } from './DetailsRow.styles';

const getClassNames = classNamesFunction<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>();

const SHIMMER_INITIAL_ITEMS = 10;
const DEFAULT_SHIMMER_HEIGHT = 7;
const SHIMMER_LINE_VS_CELL_WIDTH_RATIO = 0.95;

export function ShimmeredDetailsListBase(props: IShimmeredDetailsListProps): JSX.Element | null {
  const {
    detailsListStyles,
    enableShimmer,
    items,
    listProps,
    onRenderCustomPlaceholder,
    removeFadingOverlay,
    shimmerLines,
    styles,
    theme,
    ariaLabelForGrid,
    ariaLabelForShimmer,
    ...restProps
  } = props;

  const detailsListProps = useShallowMemo(() => restProps, restProps);

  const shimmerItems = React.useMemo(() => {
    return shimmerLines ? new Array(shimmerLines) : new Array(SHIMMER_INITIAL_ITEMS);
  }, [shimmerLines]);

  const listClassName = listProps && listProps.className;

  const classNames = React.useMemo(
    () =>
      getClassNames(styles, {
        theme: theme!,
      }),
    [styles, theme],
  );

  const newListProps = React.useMemo(() => {
    return {
      ...listProps,
      // Adds to the optional listProp className a fading out overlay className only when `enableShimmer` toggled on
      // and the overlay is not disabled by `removeFadingOverlay` prop.
      className: enableShimmer && !removeFadingOverlay ? css(classNames.root, listClassName) : listClassName,
    };
  }, [listProps, enableShimmer, removeFadingOverlay, classNames.root, listClassName]);

  const onRenderShimmerPlaceholder = React.useCallback(
    (index: number, rowProps: IDetailsRowProps): React.ReactNode => {
      const placeholderElements: React.ReactNode = onRenderCustomPlaceholder
        ? onRenderCustomPlaceholder(rowProps, index, renderDefaultShimmerPlaceholder)
        : renderDefaultShimmerPlaceholder(rowProps);

      return <Shimmer customElementsGroup={placeholderElements} />;
    },
    [onRenderCustomPlaceholder],
  );

  return React.useMemo(() => {
    return (
      <DetailsList
        {...detailsListProps}
        styles={detailsListStyles}
        items={enableShimmer ? shimmerItems : items}
        isPlaceholderData={enableShimmer}
        ariaLabelForGrid={(enableShimmer && ariaLabelForShimmer) || ariaLabelForGrid}
        onRenderMissingItem={onRenderShimmerPlaceholder}
        listProps={newListProps}
      />
    );
  }, [detailsListProps, detailsListStyles, enableShimmer, shimmerItems, items, ariaLabelForShimmer, newListProps]);
}

function renderDefaultShimmerPlaceholder(rowProps: IDetailsRowProps): React.ReactNode {
  const { columns, compact, selectionMode, checkboxVisibility, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = rowProps;

  const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;
  // 1px to take into account the border-bottom of DetailsRow.
  const gapHeight: number = compact ? compactRowHeight : rowHeight + 1;

  const shimmerElementsRow: JSX.Element[] = [];

  const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;

  if (showCheckbox) {
    shimmerElementsRow.push(
      <ShimmerElementsGroup
        key={'checkboxGap'}
        shimmerElements={[{ type: ShimmerElementType.gap, width: '40px', height: gapHeight }]}
      />,
    );
  }

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
      height: gapHeight,
    });

    if (column.isIconOnly) {
      shimmerElements.push({
        type: ShimmerElementType.line,
        width: column.calculatedWidth!,
        height: column.calculatedWidth!,
      });
      shimmerElements.push({
        type: ShimmerElementType.gap,
        width: cellStyleProps.cellRightPadding,
        height: gapHeight,
      });
    } else {
      shimmerElements.push({
        type: ShimmerElementType.line,
        width: column.calculatedWidth! * SHIMMER_LINE_VS_CELL_WIDTH_RATIO,
        height: DEFAULT_SHIMMER_HEIGHT,
      });
      shimmerElements.push({
        type: ShimmerElementType.gap,
        width:
          cellStyleProps.cellRightPadding +
          (column.calculatedWidth! - column.calculatedWidth! * SHIMMER_LINE_VS_CELL_WIDTH_RATIO) +
          (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0),
        height: gapHeight,
      });
    }
    shimmerElementsRow.push(
      <ShimmerElementsGroup key={columnIdx} width={`${groupWidth}px`} shimmerElements={shimmerElements} />,
    );
  });
  // When resizing the window from narrow to wider, we need to cover the exposed Shimmer wave
  // until the column resizing logic is done.
  shimmerElementsRow.push(
    <ShimmerElementsGroup
      key={'endGap'}
      width={'100%'}
      shimmerElements={[{ type: ShimmerElementType.gap, width: '100%', height: gapHeight }]}
    />,
  );
  return <div style={{ display: 'flex' }}>{shimmerElementsRow}</div>;
}
