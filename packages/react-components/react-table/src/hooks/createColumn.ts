import { CreateTableColumnOptions } from './types';

const defaultCompare = () => 0;

const defaultRenderCell = () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('@fluentui/react-table: You are using the default column renderCell function that renders null');
  }

  return null;
};

const defaultRenderHeaderCell = () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('@fluentui/react-table: You are using the default column renderHeaderCell function that renders null');
  }

  return null;
};

/**
 * Helper function to create column definition with defaults
 * @param options - column definition options
 * @returns - column definition with defaults
 */
export function createTableColumn<TItem>(options: CreateTableColumnOptions<TItem>) {
  const {
    columnId,
    renderCell = defaultRenderCell,
    renderHeaderCell = defaultRenderHeaderCell,
    compare = defaultCompare,
  } = options;

  return {
    columnId,
    renderCell,
    renderHeaderCell,
    compare,
  };
}
