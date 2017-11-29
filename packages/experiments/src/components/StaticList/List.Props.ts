import { IObjectWithKey } from 'office-ui-fabric-react/lib/Selection';
// tslint:disable-next-line:no-unused-variable
export interface IGenericList<TItem extends IObjectWithKey> {
}

export interface IGenericListProps<TItem extends IObjectWithKey> {
  className?: string;

  items: TItem[];

  itemHeight: number;

  onRenderItem: (item: TItem, index: number) => JSX.Element | null;
}