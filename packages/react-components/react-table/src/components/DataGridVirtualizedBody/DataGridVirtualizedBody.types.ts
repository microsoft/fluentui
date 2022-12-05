import { DataGridBodyProps, DataGridBodySlots, DataGridBodyState } from '../DataGridBody/DataGridBody.types';

export type DataGridVirtualizedBodySlots = DataGridBodySlots;

/**
 * DataGridVirtualizedBody Props
 */
export type DataGridVirtualizedBodyProps = DataGridBodyProps & {
  itemSize: number;
  height: number;
};

/**
 * State used in rendering DataGridVirtualizedBody
 */
export type DataGridVirtualizedBodyState = DataGridBodyState & Pick<DataGridVirtualizedBodyProps, 'itemSize'>;
