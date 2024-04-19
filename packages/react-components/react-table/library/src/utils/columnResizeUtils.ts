import { TableColumnDefinition, ColumnWidthState, TableColumnId, TableColumnSizingOptions } from '../hooks';

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

export function getColumnById(state: ColumnWidthState[], columnId: TableColumnId) {
  return state.find(c => c.columnId === columnId);
}

export function getColumnByIndex(state: ColumnWidthState[], index: number) {
  return state[index];
}

export function getTotalWidth(state: ColumnWidthState[]): number {
  return state.reduce((sum, column) => sum + column.width + column.padding, 0);
}

export function getLength(state: ColumnWidthState[]) {
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
) {
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
 * This function takes the state and container width and makes sure the each column in the state
 * is its optimal width, and that the columns
 * a) fit to the container
 * b) always fill the whole container
 * @param state
 * @param containerWidth
 * @returns
 */
export function adjustColumnWidthsToFitContainer(state: ColumnWidthState[], containerWidth: number) {
  let newState = state;
  const totalWidth = getTotalWidth(newState);

  // The total width is smaller, we are expanding columns
  if (totalWidth < containerWidth) {
    let difference = containerWidth - totalWidth;
    let i = 0;
    // We start at the beginning and assign the columns their ideal width
    while (i < newState.length && difference > 0) {
      const currentCol = getColumnByIndex(newState, i);
      const colAdjustment = Math.min(currentCol.idealWidth - currentCol.width, difference);
      newState = setColumnProperty(newState, currentCol.columnId, 'width', currentCol.width + colAdjustment);
      difference -= colAdjustment;

      // if there is still empty space, after all columns are their ideal sizes, assign it to the last column
      if (i === newState.length - 1 && difference !== 0) {
        const lastCol = getColumnByIndex(newState, i);
        newState = setColumnProperty(newState, lastCol.columnId, 'width', lastCol.width + difference);
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
