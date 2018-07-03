import { IColumn } from './DetailsList.types';
import { IDetailsRowStyles } from './DetailsRow.types';

export interface IDetailsRowFieldsProps {
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columnStartIndex: number;
  columns: IColumn[];
  compact?: boolean;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  shimmer?: boolean;
  rowClassNames: { [className in keyof IDetailsRowStyles]: string };
}
