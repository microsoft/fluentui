import { IObjectWithKey } from 'office-ui-fabric-react/lib/Selection';

export interface IGenericListProps<TItem extends IObjectWithKey> {
  className?: string;

  items: TItem[];

  itemHeight: number;

  onRenderItem: (item: TItem, index: number) => JSX.Element | null;
}