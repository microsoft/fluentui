import * as React from 'react';
import { Announced } from '../Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  IDetailsList,
  IDetailsRowProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { createRef } from 'office-ui-fabric-react/lib/Utilities';

const _items: any[] = [];

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Modified',
    fieldName: 'modified',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modified'
  },
  {
    key: 'column3',
    name: 'Modified By',
    fieldName: 'modifiedby',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modifiedby'
  },
  {
    key: 'column4',
    name: 'File Size',
    fieldName: 'filesize',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for filesize'
  }
];

const _names: string[] = [
  'Annie Lindqvist',
  'Aaron Reid',
  'Alex Lundberg',
  'Roko Kolar',
  'Christian Bergqvist',
  'Valentina Lovric',
  'Makenzie Sharett'
];

const nullFunction = (): null => null;

export class AnnouncedBasicExample extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails: {};
    showItemIndexInView: boolean;
  }
  > {
  private _selection: Selection;
  private _detailsList = createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);

    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 200; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          modified: i,
          modifiedby: _names[Math.floor(Math.random() * _names.length)],
          filesize: Math.floor(Math.random() * 30).toString() + ' MB'
        });
      }
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this._onItemInvoked = this._onItemInvoked.bind(this);

    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails(),
      showItemIndexInView: false
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div>
        <Announced message="Mail deleted" />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            componentRef={this._detailsList}
            items={items}
            columns={_columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            onRenderRow={this._onRenderRow}
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._detailsList!.current!.getStartItemIndexInView();
      alert('unmounting, getting first item index that was in view: ' + itemIndexInView);
    }
  }

  public _onKeyDown(): void {
    console.log('hello');
  }

  public _onRenderRow(props: IDetailsRowProps): JSX.Element {
    return <DetailsRow {...props} />;
  }

  public _onRenderItemColumn(item: any, index: number, column: IColumn) {
    const fieldContent = item[column.fieldName || ''];

    switch (column.key) {
      case 'column1':
        return (
          <span>
            {fieldContent}
            <IconButton
              iconProps={{ iconName: 'MoreVertical' }}
              role="button"
              aria-haspopup="true"
              onRenderMenuIcon={nullFunction}
              style={{ float: 'right', height: 'inherit' }}
              menuProps={{
                items: [
                  {
                    key: 'share',
                    text: 'Share'
                  },
                  {
                    key: 'delete',
                    text: 'Delete'
                  },
                  {
                    key: 'rename',
                    text: 'Rename'
                  }
                ]
              }}
            />
          </span>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onItemInvoked(item: any, index: number, ev: Event): void {
    if (ev instanceof KeyboardEvent && ev.code === 'Enter') {
      console.log('Pressed enter');
      // this.setState(prevState => ({
      //   items: prevState.items.filter(el => el != index)
      // }));
    }
  }
}
