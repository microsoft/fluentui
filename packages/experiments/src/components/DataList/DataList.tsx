import * as React from 'react';
import { BaseComponent, IBaseProps, css, IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ISelection, Selection, SelectionZone, SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { IItem } from './List';
import { StaticList } from './StaticList';
import { VirtualizedList, IVirtualizedListProps } from './VirtualizedList';
import { DataListRow } from './DataListRow';
import { DataListHeader } from './DataListHeader';
import * as stylesImport from './DataList.scss';
const styles: any = stylesImport;

export interface ISizing {
  grow: number;

  shrink: number;

  basis: number | string;
}

export interface IColumn {
  key: string;

  name: string;

  sizing?: ISizing;

  fieldName: string | null;

  minWidth: number;
  maxWidth?: number;

  /**
   * Optional property that determines whether the column can be dropped if there is not enough room to satisfy all min-width
   * requests. Only works for columns from right to left.
   */
  isCollapsable?: boolean;

  isResizable?: boolean;
}

export interface IDataListProps<TItem extends IItem> extends IBaseProps {
  items: TItem[];

  columns: IColumn[];

  isVirtualized?: boolean;

  itemHeight: number;

  dropColumns?: boolean;
}

export class DataList<TItem extends IItem = any> extends BaseComponent<IDataListProps<TItem>, {}> {
  private container: HTMLElement;

  private selection: ISelection;
  private start = 0;

  constructor(props: IDataListProps<TItem>, context: any) {
    super(props, context);

    this.selection = new Selection();
    this.selection.setItems(this.props.items, true);
  }

  public render(): JSX.Element {
    const { items, isVirtualized, itemHeight, columns, dropColumns } = this.props;

    /*onItemInvoked={ onItemInvoked }
          onItemContextMenu={ onItemContextMenu }*/

    return <div className={ css(
      'ms-DataList',
      styles.root,
      dropColumns && styles.dropColumns
    ) } ref={ this._resolveRef('container') }>
      <DataListHeader columns={ columns } itemHeight={ itemHeight } />

      <FocusZone
        ref={ this._resolveRef('_focusZone') }
        className={ styles.focusZone }
        direction={ FocusZoneDirection.vertical }
        isInnerZoneKeystroke={ () => false }
      >
        <SelectionZone
          ref={ this._resolveRef('_selectionZone') }
          selection={ this.selection }
          selectionPreservedOnEmptyClick={ true }
          selectionMode={ SelectionMode.single }
        >

          {
            isVirtualized ?
              (
                React.createElement(
                  VirtualizedList,
                  {
                    items,
                    itemHeight,
                    onRenderItem: this.renderRow,
                    itemOverdraw: 4,
                    scrollContainer: () => this.container
                  } as IVirtualizedListProps<TItem>
                )
              ) : (
                <StaticList items={ items } onRenderItem={ this.renderRow } />
              )
          }

        </SelectionZone>
      </FocusZone>
    </div>;
  }

  public componentWillMount() {
    performance.mark('control-start');
    this.start = performance.now();
  }

  public componentDidMount() {
    performance.mark('control-end');
    performance.measure('control', 'control-start', 'control-end');

    console.log(`DataList rendering ${performance.now() - this.start}s`);
  }

  private renderRow = (index: number, item: TItem): (JSX.Element | null) => {
    const { itemHeight, columns } = this.props;

    return <div key={ item.key }>
      {
        React.createElement(
          DataListRow as { new(): DataListRow<TItem> },
          {
            columns,
            index,
            item,
            itemHeight,
            selection: this.selection
          })
      }
    </div>;
  }
}
