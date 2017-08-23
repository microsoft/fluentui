import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IItem {
  key: string;
}

export interface IList<TItem extends IItem> {
}

export interface IListProps<TItem extends IItem> {
  className?: string;

  items: TItem[];

  onRenderItem: (index: number, item: TItem) => JSX.Element | null;
}