import type {
  TableColumnDefinition,
  ColumnWidthState,
  AutoFitColumnsStrategy,
  TableColumnId,
  TableColumnSizingOptions,
} from '../hooks';

const DEFAULT_WIDTH = 150;
const DEFAULT_MIN_WIDTH = 100;

/**
 * This function takes the column definitions and the curent ColumnWidthState and returns new state.
 *  - It uses existing state for existing columns.
 *  - It removes any state for columns no longer present.
 *  - It checks if any column has been replaced and returns updated state if so
 *  - It returns old state if no changes in the state have been made (so that react doesn't call effects)
 * @param columns
 * @param state
 * @returns
 */

export function columnDefinitionsToState<T>(
  columns: TableColumnDefinition<T>[],
  state: ColumnWidthState[] = [],
  columnSizingOptions: TableColumnSizingOptions = {},
): ColumnWidthState[] {
  let updated = false;
  const stateMap = new Map(state.map(s => [s.columnId, s]));

  const updatedState = columns.map(column => {
    const existingColumnState = stateMap.get(column.columnId);

    if (existingColumnState) {
      const {
        idealWidth = existingColumnState.idealWidth,
        minWidth = existingColumnState.minWidth,
        padding = existingColumnState.padding,
      } = columnSizingOptions[column.columnId] ?? {};

      if (
        idealWidth !== existingColumnState.idealWidth ||
        minWidth !== existingColumnState.minWidth ||
        padding !== existingColumnState.padding
      ) {
        updated = true;
        return {
          ...existingColumnState,
          idealWidth,
          width: idealWidth,
          minWidth,
          padding,
        };
      }
      return existingColumnState;
    }

    const {
      defaultWidth,
      idealWidth = DEFAULT_WIDTH,
      minWidth = DEFAULT_MIN_WIDTH,
      padding,
    } = columnSizingOptions[column.columnId] ?? {};

    updated = true;
    return {
      columnId: column.columnId,
      width: Math.max(defaultWidth ?? idealWidth, minWidth),
      minWidth,
      idealWidth: Math.max(defaultWidth ?? idealWidth, minWidth),
      padding: padding ?? 16,
    };
  });

  // If the length of the new state changed (column was added or removed) or any of
  // the individual states has a new reference (column was replaced),
  // we have to reset the column widths to their ideal width (because the column which was last may not be last now).
  // Then the adjustColumnWidthsToFitContainer can do its job and properly stretch the last column.
  if (updatedState.length !== state.length || updated) {
    const column = updatedState.find(col => col.width > col.idealWidth);
    if (column) {
      column.width = column.idealWidth;
    }

    updated = true;
  }

  return updated ? updatedState : state;
}

export function getColumnById(state: ColumnWidthState[], columnId: TableColumnId): ColumnWidthState | undefined {
  return state.find(c => c.columnId === columnId);
}

export function getColumnByIndex(state: ColumnWidthState[], index: number): ColumnWidthState | undefined {
  return state[index];
}

export function getTotalWidth(state: ColumnWidthState[]): number {
  return state.reduce((sum, column) => sum + column.width + column.padding, 0);
}

export function getLength(state: ColumnWidthState[]): number {
  return state.length;
}

export function getColumnWidth(state: ColumnWidthState[], columnId: TableColumnId): number {
  const column = getColumnById(state, columnId);
  return column?.width ?? 0;
}

/**
 * This function takes the current state and returns an updated state, so that it can be set.
 * The reason for this is that we can update the state multiple times before commiting to render.
 * This is an optimization and also prevents flickering.
 * It also returns new copy of the state only if the value is different than the one currently in
 * the state, further preventing unnecessary updates.
 * @param localState
 * @param columnId
 * @param property
 * @param value
 * @returns
 */
export function setColumnProperty(
  localState: ColumnWidthState[],
  columnId: TableColumnId,
  property: keyof ColumnWidthState,
  value: number,
): ColumnWidthState[] {
  const currentColumn = getColumnById(localState, columnId);

  if (!currentColumn || currentColumn?.[property] === value) {
    return localState;
  }

  const updatedColumn = { ...currentColumn, [property]: value };

  const newState = localState.reduce((acc, current) => {
    if (current.columnId === updatedColumn.columnId) {
      return [...acc, updatedColumn];
    }
    return [...acc, current];
  }, [] as ColumnWidthState[]);

  return newState;
}

/**
 * Shares the container between the columns so that the space left over once every column has
 * reached its ideal width is split equally between them. Columns with equal ideal widths
 * therefore end up equally wide, which matches how the columns are laid out when resizing is
 * disabled and the browser distributes the row with flexbox.
 *
 * The result is derived only from `idealWidth`, `minWidth` and `padding`, never from the current
 * `width`, which makes it idempotent - re-running it on its own output changes nothing.
 * @param state
 * @param containerWidth
 * @param resizedColumns - columns the user has deliberately resized; they keep their chosen width
 * @returns
 */
export function distributeColumnWidthsEvenly(
  state: ColumnWidthState[],
  containerWidth: number,
  resizedColumns: ReadonlySet<TableColumnId> = new Set(),
): ColumnWidthState[] {
  // The container is measured after the first render, and is not measured at all when rendering on
  // the server. Sharing a container that has no width yet would collapse every column to its
  // minimal width, just to expand it again once the real width arrives.
  if (containerWidth <= 0) {
    return state;
  }

  // A column the user has resized keeps the width they chose instead of growing with the others,
  // otherwise the column would drift away from the resize handle they are dragging. The pin only
  // holds against columns that can still absorb space though - once every column has been
  // deliberately sized, they simply share the container again, so no dead space appears after the
  // last column.
  let fixedColumns = state.filter(column => resizedColumns.has(column.columnId));
  if (fixedColumns.length === state.length) {
    fixedColumns = [];
  }
  const sharingColumns = state.filter(column => !fixedColumns.includes(column));

  const availableSpace = containerWidth - sumOf(state, 'padding');
  const fixedIdealWidth = sumOf(fixedColumns, 'idealWidth');

  const shared = shareSpace(sharingColumns, availableSpace - fixedIdealWidth);
  // When the sharing columns bottom out at their minimal widths, the resized columns give up the
  // rest of the deficit instead of letting the columns overflow the container.
  const deficit = Math.min(0, availableSpace - fixedIdealWidth - shared.total);
  const fixed = shareSpace(fixedColumns, fixedIdealWidth + deficit);

  let newState = state;
  for (const [columnId, width] of [...shared.widths, ...fixed.widths]) {
    newState = setColumnProperty(newState, columnId, 'width', width);
  }

  return newState;
}

function sumOf(columns: ColumnWidthState[], property: 'idealWidth' | 'padding'): number {
  return columns.reduce((sum, column) => sum + column[property], 0);
}

/**
 * Gives every column its ideal width plus an equal share of the remaining space, without pushing
 * any column below its minimal width. A column whose share would push it below its minimal width
 * cannot take part in the sharing - keeping it at its minimal width leaves less space for the
 * rest, which can push further columns below their own minimal width, so this repeats until every
 * remaining share is large enough. When the space cannot hold every column at its minimal width,
 * the total therefore exceeds the space.
 */
function shareSpace(
  columns: ColumnWidthState[],
  space: number,
): { widths: Array<[TableColumnId, number]>; total: number } {
  let sharingColumns = columns;
  let remainingSpace = space;
  const widths: Array<[TableColumnId, number]> = [];
  let total = 0;

  while (sharingColumns.length > 0) {
    const share = (remainingSpace - sumOf(sharingColumns, 'idealWidth')) / sharingColumns.length;
    const tooNarrow = sharingColumns.filter(column => column.idealWidth + share < column.minWidth);

    if (tooNarrow.length === 0) {
      for (const column of sharingColumns) {
        widths.push([column.columnId, column.idealWidth + share]);
        total += column.idealWidth + share;
      }
      break;
    }

    for (const column of tooNarrow) {
      widths.push([column.columnId, column.minWidth]);
      total += column.minWidth;
      remainingSpace -= column.minWidth;
    }
    sharingColumns = sharingColumns.filter(column => !tooNarrow.includes(column));
  }

  return { widths, total };
}

/**
 * This function takes the state and container width and makes sure the each column in the state
 * is its optimal width, and that the columns
 * a) fit to the container
 * b) always fill the whole container
 * @param state
 * @param containerWidth
 * @param strategy - how the space left over after every column reached its ideal width is shared
 * @returns
 */
export function adjustColumnWidthsToFitContainer(
  state: ColumnWidthState[],
  containerWidth: number,
  strategy: AutoFitColumnsStrategy = 'last-column',
  resizedColumns?: ReadonlySet<TableColumnId>,
): ColumnWidthState[] {
  if (strategy === 'even') {
    return distributeColumnWidthsEvenly(state, containerWidth, resizedColumns);
  }

  let newState = state;
  const totalWidth = getTotalWidth(newState);

  // The total width is smaller, we are expanding columns
  if (totalWidth < containerWidth) {
    let difference = containerWidth - totalWidth;
    let i = 0;
    // We start at the beginning and assign the columns their ideal width
    while (i < newState.length && difference > 0) {
      const currentCol = getColumnByIndex(newState, i);
      if (!currentCol) {
        break;
      }
      const colAdjustment = Math.min(currentCol.idealWidth - currentCol.width, difference);
      newState = setColumnProperty(newState, currentCol.columnId, 'width', currentCol.width + colAdjustment);
      difference -= colAdjustment;

      // if there is still empty space, after all columns are their ideal sizes, assign it to the last column
      if (i === newState.length - 1 && difference !== 0) {
        const lastCol = getColumnByIndex(newState, i);
        if (lastCol) {
          newState = setColumnProperty(newState, lastCol.columnId, 'width', lastCol.width + difference);
        }
      }

      i++;
    }
  }

  // The total width is larger than container, we need to squash the columns
  else if (totalWidth >= containerWidth) {
    let difference = totalWidth - containerWidth;
    // We start with the last column
    let j = newState.length - 1;
    while (j >= 0 && difference > 0) {
      const currentCol = getColumnByIndex(newState, j);
      if (!currentCol) {
        j--;
        continue;
      }
      if (currentCol.width > currentCol.minWidth) {
        const colAdjustment = Math.min(currentCol.width - currentCol.minWidth, difference);
        difference -= colAdjustment;
        newState = setColumnProperty(newState, currentCol.columnId, 'width', currentCol.width - colAdjustment);
      }
      j--;
    }
  }

  return newState;
}
