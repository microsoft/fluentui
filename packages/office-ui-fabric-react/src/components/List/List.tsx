import * as React from 'react';
import { IListProps } from './List.types';
import { BaseComponent } from '../../Utilities';
import { ListPage } from './ListPage';

interface IListState {
  pages: JSX.Element[];
}

export class List extends BaseComponent<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      pages: _derivePages(props)
    };
  }

  public render() {
    const { pages } = this.state;

    return <div>{pages}</div>;
  }
}

function _derivePages(props: IListProps): JSX.Element[] {
  const { items = [], onRenderCell } = props;
  const itemsPerPage = 20;
  const pages: JSX.Element[] = [];

  for (let startIndex = 0; startIndex < items.length; startIndex += itemsPerPage) {
    pages.push(
      <ListPage
        key={String(pages.length)}
        items={items}
        visible={true}
        startIndex={startIndex}
        endIndex={Math.min(startIndex + itemsPerPage - 1, items.length - 1)}
        onRenderCell={onRenderCell}
      />
    );
  }

  return pages;
}
