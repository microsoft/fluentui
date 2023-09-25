import * as React from 'react';
import { TilesGridMode } from './TilesList.types';
import { List, ScrollToMode } from '@fluentui/react/lib/List';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { css, FocusRects, composeRenderFunction } from '@fluentui/react/lib/Utilities';
import * as TilesListStylesModule from './TilesList.scss';
import { Shimmer } from '@fluentui/react/lib/Shimmer';
import type {
  ITilesListProps,
  ITilesGridItem,
  ITilesGridSegment,
  ITileSize,
  ITilesGridItemCellProps,
  ITilesListRowProps,
  ITilesListRootProps,
} from './TilesList.types';
import type { IPageProps, IListOnRenderRootProps } from '@fluentui/react/lib/List';
import type { IRenderFunction, IRectangle } from '@fluentui/react/lib/Utilities';

const TilesListStyles: any = TilesListStylesModule;

const MAX_TILE_STRETCH = 1.5;
const CELLS_PER_PAGE = 100;
const MIN_ASPECT_RATIO = 0.5;
const MAX_ASPECT_RATIO = 3;

const ROWS_OF_PLACEHOLDER_CELLS = 3;

export interface ITilesListState<TItem> {
  cells: ITileCell<TItem>[];
}

/**
 * @internal
 */
export interface ITileGrid {
  minRowHeight: number;
  mode: TilesGridMode;
  spacing: number;
  maxScaleFactor: number;
  marginTop: number;
  marginBottom: number;
  key: string;
  isPlaceholder?: boolean;
  maxRowCount?: number;
}

/**
 * @internal
 */
export interface ITileCell<TItem> {
  key: string;
  content: TItem;
  aspectRatio: number;
  grid: ITileGrid;
  isPlaceholder?: boolean;
  desiredHeight?: number;
  onRender(props: {
    item: TItem;
    finalSize: {
      width: number;
      height: number;
    };
    position: {
      column: number;
    };
  }): React.ReactNode;
}

interface IRowData {
  scaleFactor: number;
  cellCount: number;
  isLastRow?: boolean;
  maxScaleFactor?: number;
}

interface IPageData<TItem> {
  pageWidths: {
    [index: number]: number;
  };
  rows: {
    [index: number]: IRowData;
  };
  cellSizes: {
    [index: number]: ITileSize;
  };
  extraCells: ITileCell<TItem>[] | undefined;
}

interface IPageSpecification<TItem> {
  itemCount: number;
  data: IPageData<TItem>;
}

interface IPageSpecificationCache<TItem> {
  byIndex: {
    [index: number]: IPageSpecification<TItem>;
  };
  width: number;
}

/**
 * Component which renders a virtualized flexbox list of 'tiles', which have arbitrary width and height
 * and which support scaling to fill rows when needed.
 */
export class TilesList<TItem> extends React.Component<ITilesListProps<TItem>, ITilesListState<TItem>> {
  private _pageSpecificationCache: IPageSpecificationCache<TItem> | undefined;
  private listRef: React.RefObject<List>;

  constructor(props: ITilesListProps<TItem>, context: any) {
    super(props, context);

    this.listRef = React.createRef();

    this.state = {
      cells: this._getCells(props.items),
    };
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ITilesListProps<TItem>): void {
    if (nextProps.items !== this.props.items) {
      this.setState({
        cells: this._getCells(nextProps.items),
      });
    }
  }

  public UNSAFE_componentWillUpdate(nextProps: ITilesListProps<TItem>, nextState: ITilesListState<TItem>): void {
    if (nextState.cells !== this.state.cells) {
      this._pageSpecificationCache = undefined;
    }
  }

  public render(): JSX.Element {
    const { cells } = this.state;

    const {
      className,
      onActiveElementChanged,
      items,
      cellsPerPage,
      ref,
      role,
      focusZoneComponentRef,
      listProps = {},
      ...divProps
    } = this.props;

    const { onRenderRoot, onRenderPage, ...otherListProps } = listProps;

    const finalOnRenderRoot = onRenderRoot
      ? composeRenderFunction(onRenderRoot, this._onRenderListRoot)
      : this._onRenderListRoot;
    const finalOnRenderPage = onRenderPage
      ? composeRenderFunction(onRenderPage, this._onRenderPage)
      : this._onRenderPage;

    return (
      <FocusZone
        {...divProps}
        ref={ref as (element: FocusZone | null) => void}
        componentRef={focusZoneComponentRef}
        className={css('ms-TilesList', className)}
        direction={FocusZoneDirection.bidirectional}
        onActiveElementChanged={this.props.onActiveElementChanged}
      >
        <FocusRects />
        <List
          items={cells}
          role={role}
          onRenderRoot={finalOnRenderRoot}
          getPageSpecification={this._getPageSpecification}
          onRenderPage={finalOnRenderPage}
          ref={this.listRef}
          usePageCache={true}
          {...otherListProps}
        />
      </FocusZone>
    );
  }

  public scrollToIndex(index: number, mode: ScrollToMode = ScrollToMode.auto): void {
    if (this.listRef && this.listRef.current) {
      if (this.state.cells[index].grid.mode === TilesGridMode.none) {
        // if we are using grid mode none, we reliably know the height of the cell,
        // so we can implement the measureItem callback.
        this.listRef.current.scrollToIndex(
          index,
          (itemIndex: number) => {
            const cell = this.state.cells[index];
            if (cell && cell.desiredHeight !== undefined) {
              return cell.desiredHeight;
            }
            return 0;
          },
          mode,
        );
      } else {
        // otherwise, we do not implement the measure item callback,
        // then the List will just scroll to the nearest page
        this.listRef.current.scrollToIndex(index, undefined, mode);
      }
    }
  }

  public getTotalListHeight(): number {
    if (this.listRef && this.listRef.current && this.listRef.current.getTotalListHeight) {
      return this.listRef.current.getTotalListHeight();
    }
    return 0; // Stub
  }

  private _onRenderCell(item: ITileCell<TItem>, finalSize: ITileSize, column: number): JSX.Element {
    if (item.grid.mode === TilesGridMode.none) {
      return (
        <div role="presentation" className={css(TilesListStyles.header)}>
          {item.onRender({
            item: item.content,
            finalSize: { width: 0, height: 0 },
            position: {
              column,
            },
          })}
        </div>
      );
    }

    const itemWidthOverHeight = item.aspectRatio;
    const itemHeightOverWidth = 1 / itemWidthOverHeight;

    return (
      <div
        role="presentation"
        className={css(TilesListStyles.cell)}
        style={
          item.grid.mode === TilesGridMode.fillHorizontal
            ? {
                height: `${item.grid.minRowHeight}px`,
              }
            : {
                paddingTop: `${(100 * itemHeightOverWidth).toFixed(2)}%`,
              }
        }
      >
        <div role="presentation" className={css(TilesListStyles.cellContent)}>
          {item.onRender({
            item: item.content,
            finalSize,
            position: {
              column,
            },
          })}
        </div>
      </div>
    );
  }

  private _onRenderListRoot = (
    props: IListOnRenderRootProps<TItem>,
    defaultRender?: IRenderFunction<IListOnRenderRootProps<TItem>>,
  ): JSX.Element | null => {
    const { onRenderRoot } = this.props;

    if (!defaultRender) {
      return null;
    }

    const { pages } = props;

    let rowCount = 0;
    let maxColCount = 0;

    for (const page of pages) {
      const data = page.data as IPageData<TItem> | undefined;

      if (data) {
        for (const key of Object.keys(data.rows)) {
          const rowData = data.rows[Number(key)];

          rowCount++;
          maxColCount = Math.max(maxColCount, rowData.cellCount);
        }
      }
    }

    const baseOnRenderRoot = (baseProps: ITilesListRootProps<TItem>): JSX.Element | null => {
      return defaultRender({
        ...props,
        divProps: {
          ...props.divProps,
          ...baseProps.divProps,
        },
        surfaceElement: baseProps.surfaceElement,
      });
    };

    const finalOnRenderRoot = onRenderRoot ? composeRenderFunction(onRenderRoot, baseOnRenderRoot) : baseOnRenderRoot;

    return finalOnRenderRoot({
      surfaceElement: props.surfaceElement,
      divProps: props.divProps,
      rowCount: rowCount,
      columnCount: maxColCount,
    });
  };

  /**
   * Renders a single list page using a flexbox layout.
   * By default, List provides no special formatting for a list page. For Tiles, the parent element
   * needs flexbox metadata and padding to support the alignment rules.
   */
  private _onRenderPage = (pageProps?: IPageProps, defaultRender?: IRenderFunction<IPageProps>): JSX.Element | null => {
    if (!pageProps) {
      return null;
    }

    const { role, onRenderRow } = this.props;

    const finalOnRenderRow = onRenderRow ? composeRenderFunction(onRenderRow, this._renderRow) : this._renderRow;

    const { page, className: pageClassName, ...divProps } = pageProps;

    const { items } = page;

    const data: IPageData<TItem> = page.data;

    const cells: ITileCell<TItem>[] = items || [];

    const grids: React.ReactNode[] = [];

    const previousCell = this.state.cells[page.startIndex - 1];
    const nextCell = this.state.cells[page.startIndex + page.itemCount];

    const endIndex = cells.length;

    let currentRow: IRowData | undefined;
    let currentRowCells = [];

    let shimmerWrapperWidth = 0;

    for (let i = 0; i < endIndex; ) {
      // For each cell at the start of a grid.
      const grid = cells[i].grid;

      const { isPlaceholder, maxRowCount } = grid;

      const renderedCells: React.ReactNode[] = [];

      const width = data.pageWidths[page.startIndex + i];

      let rowCount = 0;
      let isAtMaxRowCount = false;
      let columnIndex = 0;

      for (; i < endIndex && cells[i].grid === grid; i++) {
        // For each cell in the current grid.
        const cell = cells[i];

        const index = page.startIndex + i;
        const cellAsFirstRow = data.rows[index];

        if (cellAsFirstRow) {
          if (currentRowCells.length > 0) {
            renderedCells.push(
              finalOnRenderRow({
                cellElements: currentRowCells,
                divProps: {
                  className: TilesListStyles.row,
                  role: 'presentation',
                },
              }),
            );
            currentRowCells = [];
          }

          if (cellAsFirstRow !== currentRow) {
            rowCount++;
          }

          if (typeof maxRowCount === 'number' && rowCount > maxRowCount) {
            isAtMaxRowCount = true;
            break;
          }

          currentRow = cellAsFirstRow;
          columnIndex = 0;
        }

        let finalSize = data.cellSizes[index];

        if (currentRow) {
          const { scaleFactor, isLastRow, maxScaleFactor: currentRowMaxScaleFactor } = currentRow;

          if (currentRowMaxScaleFactor) {
            // If the current row has its own max scale factor,
            // compute final size from the provided value.
            const finalScaleFactor = Math.min(currentRowMaxScaleFactor, grid.maxScaleFactor);

            finalSize = {
              width: finalSize.width * finalScaleFactor,
              height: grid.mode === TilesGridMode.fill ? finalSize.height * finalScaleFactor : grid.minRowHeight,
            };
          } else if (
            (grid.mode === TilesGridMode.fill || grid.mode === TilesGridMode.fillHorizontal) &&
            (!isLastRow || scaleFactor <= grid.maxScaleFactor)
          ) {
            // Compute the final size from the overall max scale factor, if present.
            const finalScaleFactor = Math.min(grid.maxScaleFactor, scaleFactor);

            finalSize = {
              width: finalSize.width * finalScaleFactor,
              height: grid.mode === TilesGridMode.fill ? finalSize.height * finalScaleFactor : grid.minRowHeight,
            };
          }
        }

        const renderedCell = (keyOffset: number = 0): JSX.Element => {
          return (
            <div
              key={`${grid.key}-item-${cell.key}${keyOffset ? '-' + keyOffset : ''}`}
              data-list-index={index}
              role={role ? 'presentation' : 'listitem'}
              className={css('ms-List-cell', this._onGetCellClassName(), {
                [`ms-TilesList-cell--firstInRow ${TilesListStyles.cellFirstInRow}`]: !!cellAsFirstRow,
              })}
              data-automationid="ListCell"
              style={{
                ...this._onGetCellStyle(cell, currentRow),
              }}
            >
              {this._onRenderCell(cell, finalSize, columnIndex + keyOffset)}
            </div>
          );
        };

        if (cell.isPlaceholder && grid.mode !== TilesGridMode.none) {
          const cellsPerRow = Math.floor(width / (grid.spacing + finalSize.width));
          const totalPlaceholderItems = cellsPerRow * ROWS_OF_PLACEHOLDER_CELLS;
          shimmerWrapperWidth = cellsPerRow * finalSize.width + grid.spacing * (cellsPerRow - 1);
          for (let j = 0; j < totalPlaceholderItems; j++) {
            currentRowCells.push(renderedCell(j));
          }
        } else {
          shimmerWrapperWidth = finalSize.width / 3;
          currentRowCells.push(renderedCell());
        }

        columnIndex++;
      }

      if (isAtMaxRowCount) {
        for (; i < endIndex && cells[i].grid === grid; i++) {
          // Consume the rest of the grid.
        }
      }

      const isOpenStart = previousCell && previousCell.grid === grid;
      const isOpenEnd = nextCell && nextCell.grid === grid;

      const margin = grid.spacing / 2;

      if (currentRowCells.length > 0) {
        renderedCells.push(
          finalOnRenderRow({
            cellElements: currentRowCells,
            divProps: {
              className: css(TilesListStyles.row, {
                [TilesListStyles.headerRow]: grid.mode === TilesGridMode.none,
              }),
              role: 'presentation',
            },
          }),
        );
        currentRowCells = [];
      }

      const finalGrid: JSX.Element = (
        <div
          key={grid.key}
          role="presentation"
          className={css('ms-TilesList-grid', {
            [`${TilesListStyles.grid}`]: grid.mode !== TilesGridMode.none,
            [`${TilesListStyles.shimmeredList}`]: isPlaceholder,
          })}
          style={{
            width: `${width}px`,
            margin: `${-margin}px`,
            marginTop: isOpenStart ? '0' : `${grid.marginTop - margin}px`,
            marginBottom: isOpenEnd ? '0' : `${grid.marginBottom - margin}px`,
          }}
        >
          {renderedCells}
        </div>
      );

      grids.push(
        isPlaceholder ? <Shimmer key={i} customElementsGroup={finalGrid} width={shimmerWrapperWidth} /> : finalGrid,
      );
    }

    return (
      <div role="presentation" {...divProps} className={css(pageClassName, this._onGetPageClassName())}>
        {grids}
      </div>
    );
  };

  /**
   * Gets the specification for the list page, which requires pre-calculating the flexbox layout
   * to determine the set of tiles which fit neatly within a rectangle. Any tiles left dangling
   * at the end of a page are overflowed into the next page unless they are just before a grid
   * boundary.
   */
  private _getPageSpecification = (
    startIndex: number,
    bounds: IRectangle,
  ): {
    itemCount: number;
    data: IPageData<TItem>;
  } => {
    if (this._pageSpecificationCache) {
      if (this._pageSpecificationCache.width !== bounds.width) {
        this._pageSpecificationCache = undefined;
      }
    }

    if (!this._pageSpecificationCache) {
      this._pageSpecificationCache = {
        width: bounds.width,
        byIndex: {},
      };
    }

    const pageSpecificationCache = this._pageSpecificationCache;

    if (pageSpecificationCache.byIndex[startIndex]) {
      // If the page specification has already been calculated, return it.
      // List recalculates all pages if any input changes, so this memoization
      // cuts down on calculation of individual pages without changes.
      return pageSpecificationCache.byIndex[startIndex];
    }

    const { cells } = this.state;
    const { cellsPerPage = CELLS_PER_PAGE } = this.props;

    const endIndex = Math.min(cells.length, startIndex + cellsPerPage);

    let rowWidth = 0;
    let rowStart = 0;
    let i = startIndex;

    let isAtGridEnd = true;

    const startCells: IPageData<TItem>['rows'] = {};
    let extraCells: IPageData<TItem>['extraCells'] | undefined;
    const cellSizes: IPageData<TItem>['cellSizes'] = {};
    const widths: IPageData<TItem>['pageWidths'] = {};

    for (; i < endIndex; ) {
      // For each cell at the start of a grid.
      const grid = cells[i].grid;

      const { maxRowCount } = grid;

      rowWidth = 0;
      rowStart = i;

      const boundsWidth = bounds.width + grid.spacing;

      widths[i] = boundsWidth;

      let currentRow: IRowData = (startCells[i] = {
        scaleFactor: 1,
        cellCount: 0,
      });

      if (grid.mode === TilesGridMode.none) {
        // The current "grid" just takes up the full width.
        // No flex calculations necessary.
        isAtGridEnd = true;
        cellSizes[i] = {
          width: bounds.width,
          height: 0,
        };
        currentRow.cellCount++;
        i++;
        continue;
      }

      let rowCount = 0;
      let isAtMaxRowCount = false;

      for (; i < endIndex && cells[i].grid === grid; i++) {
        if (typeof maxRowCount === 'number' && rowCount >= maxRowCount) {
          isAtMaxRowCount = true;
          break;
        }

        // For each cell in the current grid.
        const { aspectRatio } = cells[i];

        const width = aspectRatio * grid.minRowHeight + grid.spacing;

        if (rowWidth + width > boundsWidth) {
          const totalMargin = grid.spacing * (i - rowStart);
          currentRow.scaleFactor = (boundsWidth - totalMargin) / (rowWidth - totalMargin);
        }

        rowWidth += width;

        cellSizes[i] = {
          // Assign the expected base size of the cell.
          // Scaling will be handled at render time.
          width: aspectRatio * grid.minRowHeight,
          height: grid.minRowHeight,
        };

        if (rowWidth > boundsWidth) {
          rowWidth = width;
          rowStart = i;
          // Add a marker for a new row, with the default scale factor.
          currentRow = startCells[i] = {
            scaleFactor: 1,
            cellCount: 0,
          };

          rowCount++;
        }

        currentRow.cellCount++;
      }

      if (!cells[i] || cells[i].grid !== grid || isAtMaxRowCount) {
        // If the next cell is part of a different grid.
        currentRow.isLastRow = true;
      } else {
        isAtGridEnd = false;
      }

      if (rowWidth < boundsWidth) {
        const totalMargin = grid.spacing * (i - rowStart);
        currentRow.scaleFactor = (boundsWidth - totalMargin) / (rowWidth - totalMargin);

        if ((grid.mode === TilesGridMode.fill || grid.mode === TilesGridMode.fillHorizontal) && currentRow.isLastRow) {
          if (i - rowStart > 0) {
            // If the grid is in 'fill' mode, and there is underflow in the last row, then by default, flexbox will
            // scale all widths to the maximum possible, which may cause regularly-sized items to be larger than
            // those in previous rows.
            // A way to counter that is to pretend that the last row is actually filled with more items, and calculate
            // the resulting scale factor. Then pass the new maximum width to flexbox.
            // The result should be perfectly-aligned final items.
            // The 'phantom' items are not actually rendered in the list.

            // Project the average tile width across the rest of the row.
            const width = (rowWidth - totalMargin) / (i - rowStart) + grid.spacing;

            let phantomRowWidth = rowWidth;

            for (let j = i; ; j++) {
              if (phantomRowWidth + width > boundsWidth) {
                // The final phantom item has been added, so the row is complete.
                const phantomTotalMargin = grid.spacing * (j - rowStart);
                // Set the new scale factor based on the total width including the phantom items.
                currentRow.maxScaleFactor = (boundsWidth - phantomTotalMargin) / (phantomRowWidth - phantomTotalMargin);
                break;
              }

              phantomRowWidth += width;
            }
          }
        }
      }

      if (
        !isAtGridEnd &&
        currentRow.scaleFactor >
          (grid.mode === TilesGridMode.fill || grid.mode === TilesGridMode.fillHorizontal ? grid.maxScaleFactor : 1)
      ) {
        // If the last computed row is not the end of the grid, and the content cannot scale to fit the width,
        // declare these cells as 'extra' and let them be pushed into the next page.
        extraCells = cells.slice(rowStart, i);
      }

      if (isAtMaxRowCount) {
        while (i < cells.length && cells[i].grid === grid) {
          // Consume the rest of the cells in the grid if the max row count has been achieved.
          i++;
        }
      }
    }

    // If there are extra cells, cut off the page so the extra cells will be pushed into the next page.
    // Otherwise, take all the cells.
    const itemCount = i - (extraCells ? extraCells.length : 0) - startIndex;

    const pageSpecification: IPageSpecification<TItem> = {
      itemCount: itemCount,
      data: {
        pageWidths: widths,
        rows: startCells,
        extraCells: extraCells,
        cellSizes: cellSizes,
      },
    };

    pageSpecificationCache.byIndex[startIndex] = pageSpecification;

    return pageSpecification;
  };

  private _renderRow: IRenderFunction<ITilesListRowProps<TItem>> = (props: ITilesListRowProps<TItem>): JSX.Element => {
    const { cellElements, divProps } = props;

    return (
      <div role="presentation" {...divProps}>
        {cellElements}
      </div>
    );
  };

  private _onGetCellClassName = (): string => {
    return TilesListStyles.listCell;
  };

  private _onGetPageClassName = (): string => {
    return TilesListStyles.listPage;
  };

  /**
   * Get the style to be applied to a single list cell, which will specify the flex behavior
   * within the flexbox layout.
   */
  private _onGetCellStyle = (item: ITileCell<TItem>, currentRow?: IRowData): React.CSSProperties => {
    const {
      grid: { mode: gridMode, maxScaleFactor },
      grid,
    } = item;

    if (gridMode === TilesGridMode.none) {
      return {};
    }

    const itemWidthOverHeight = item.aspectRatio || 1;
    const margin = grid.spacing / 2;
    const isFill = gridMode === TilesGridMode.fill || gridMode === TilesGridMode.fillHorizontal;
    const width = itemWidthOverHeight * grid.minRowHeight;

    let maxWidth: number;

    if (currentRow && currentRow.maxScaleFactor) {
      // If the row has its own max scale factor, force flexbox to limit at that value.
      // This typically happens if there is underflow in the final row of a grid.
      maxWidth = width * Math.min(currentRow.maxScaleFactor, maxScaleFactor);
    } else if (isFill && (!currentRow || !currentRow.isLastRow || currentRow.scaleFactor <= maxScaleFactor)) {
      // If the entire grid has a max scale factor, use that limit.
      maxWidth = width * maxScaleFactor;
    } else {
      maxWidth = width;
    }

    return {
      flex: isFill ? `${itemWidthOverHeight} ${itemWidthOverHeight} ${width}px` : `0 0 ${width}px`,
      maxWidth: `${maxWidth}px`,
      margin: !item.isPlaceholder ? `${margin}px` : 0,
      borderStyle: item.isPlaceholder ? 'solid' : 'none',
      borderWidth: item.isPlaceholder ? `${margin}px` : 0,
    };
  };

  /**
   * Flattens the grid and item specifications into a cell list. List will partition the cells into
   * pages use `getPageSpecification`, so each cell is marked up with metadata to assist the flexbox
   * algorithm.
   */
  private _getCells(items: (ITilesGridSegment<TItem> | ITilesGridItem<TItem>)[]): ITileCell<TItem>[] {
    const cells: ITileCell<TItem>[] = [];

    for (const item of items) {
      if (isGridSegment(item)) {
        // The item is a grid of child items.
        const {
          spacing = 0,
          maxScaleFactor = MAX_TILE_STRETCH,
          marginBottom = 0,
          marginTop = 0,
          minAspectRatio = MIN_ASPECT_RATIO,
          maxAspectRatio = MAX_ASPECT_RATIO,
        } = item;

        const grid: ITileGrid = {
          minRowHeight: item.minRowHeight,
          spacing: spacing,
          mode: item.mode,
          key: `grid-${item.key}`,
          maxScaleFactor: maxScaleFactor,
          marginTop: item.isPlaceholder ? 0 : marginTop,
          marginBottom: item.isPlaceholder ? 0 : marginBottom,
          isPlaceholder: item.isPlaceholder,
          maxRowCount: item.maxRowCount,
        };

        for (const gridItem of item.items) {
          const { desiredSize, onRender: itemOnRender, onRenderCell } = gridItem;

          const aspectRatio = Math.min(
            maxAspectRatio,
            Math.max(minAspectRatio, (desiredSize && desiredSize.width / desiredSize.height) || 1),
          );

          const onRender =
            onRenderCell ||
            ((props: ITilesGridItemCellProps<TItem>) => {
              if (!itemOnRender) {
                return null;
              }

              return itemOnRender(props.item, props.finalSize);
            });

          cells.push({
            aspectRatio: aspectRatio,
            content: gridItem.content,
            onRender,
            grid: grid,
            key: gridItem.key,
            isPlaceholder: gridItem.isPlaceholder,
            desiredHeight: desiredSize ? desiredSize.height : undefined,
          });
        }
      } else {
        const { onRenderCell, onRender: itemOnRender } = item;

        const onRender =
          onRenderCell ||
          ((props: ITilesGridItemCellProps<TItem>) => {
            if (!itemOnRender) {
              return null;
            }

            return itemOnRender(props.item, props.finalSize);
          });

        // The item is not part of the grid, and should take up a whole row.
        cells.push({
          aspectRatio: 1,
          content: item.content,
          onRender,
          grid: {
            minRowHeight: 0,
            spacing: 0,
            mode: TilesGridMode.none,
            key: `grid-header-${item.key}`,
            maxScaleFactor: 1,
            marginBottom: 0,
            marginTop: 0,
            isPlaceholder: item.isPlaceholder,
          },
          key: `header-${item.key}`,
          isPlaceholder: item.isPlaceholder,
        });
      }
    }

    return cells;
  }
}

function isGridSegment<TItem>(
  item: ITilesGridSegment<TItem> | ITilesGridItem<TItem>,
): item is ITilesGridSegment<TItem> {
  return !!(item as ITilesGridSegment<TItem>).items;
}
