import { ColumnDefinition, ColumnWidthState, ColumnId, ColumnSizingOptions } from '../hooks';

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
  columns: ColumnDefinition<T>[],
  state: ColumnWidthState[] = [],
  columnSizingOptions: ColumnSizingOptions = {},
): ColumnWidthState[] {
  let updated = false;

  let updatedState = columns.map(column => {
    const { columnId } = column;
    const existingColumnState = state.find(col => col.columnId === column.columnId);

    if (existingColumnState) {
      const newIdealWidth = columnSizingOptions[column.columnId]?.idealWidth;
      const newMinWidth = columnSizingOptions[column.columnId]?.minWidth;
      const newPadding = columnSizingOptions[column.columnId]?.padding;
      if (
        (newIdealWidth && newIdealWidth !== existingColumnState.idealWidth) ||
        (newMinWidth && newMinWidth !== existingColumnState.minWidth) ||
        (newPadding && newPadding !== existingColumnState.padding)
      ) {
        updated = true;
        return {
          ...existingColumnState,
          idealWidth: columnSizingOptions[column.columnId]?.idealWidth ?? existingColumnState.idealWidth,
          width: columnSizingOptions[column.columnId]?.idealWidth ?? existingColumnState.idealWidth,
          minWidth: columnSizingOptions[column.columnId]?.minWidth ?? existingColumnState.minWidth,
          padding: columnSizingOptions[column.columnId]?.padding ?? existingColumnState.padding,
        };
      }

      return existingColumnState;
    }

    updated = true;
    return {
      columnId,
      width:
        columnSizingOptions[column.columnId]?.defaultWidth ??
        columnSizingOptions[column.columnId]?.idealWidth ??
        DEFAULT_WIDTH,
      minWidth: columnSizingOptions[column.columnId]?.minWidth ?? DEFAULT_MIN_WIDTH,
      idealWidth:
        columnSizingOptions[column.columnId]?.defaultWidth ??
        columnSizingOptions[column.columnId]?.idealWidth ??
        DEFAULT_WIDTH,
      padding: columnSizingOptions[column.columnId]?.padding ?? 16,
    };
  });

  if (updatedState.length !== state.length) {
    // Adding or removing columns, set all columns which have a different idealWidth than width to width = idealWidth,
    // so that the adjustColumnWidthsToFitContainer can successfully expand the last column,
    // since the column which was last before is not necessarily last now.
    if (updatedState.length > state.length) {
      updatedState = updatedState.map(s => {
        if (s.idealWidth !== s.width) {
          s.width = s.idealWidth;
        }
        return s;
      });
    }

    return updatedState;
  }

  const a1 = state.map(({ columnId }) => columnId);
  const a2 = updatedState.map(({ columnId }) => columnId);

  if (!a1.every((v, i) => v === a2[i])) {
    updated = true;
  }

  return updated ? updatedState : state;
}

export function getColumnById(state: ColumnWidthState[], columnId: ColumnId) {
  return state.find(c => c.columnId === columnId);
}

export function getColumnByIndex(state: ColumnWidthState[], index: number) {
  return state[index];
}

export function getTotalWidth(state: ColumnWidthState[]): number {
  return state.reduce((sum, column) => sum + column.width + column.padding, 0);
}

export function getLastColumn(state: ColumnWidthState[]) {
  return state[state.length - 1];
}

export function getLength(state: ColumnWidthState[]) {
  return state.length;
}

export function getColumnWidth(state: ColumnWidthState[], columnId: ColumnId): number {
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
  columnId: ColumnId,
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
