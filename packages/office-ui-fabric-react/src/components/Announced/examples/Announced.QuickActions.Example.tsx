import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  IDetailsList,
  IDetailsRowProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';

const _items: IAnnouncedQuickActionsExampleItem[] = [];

const _columns: IColumn[] = ['Name', 'Modified', 'Modified By', 'File Size'].map((name: string) => {
  const fieldName = name.replace(' ', '').toLowerCase();
  return {
    fieldName,
    name,
    key: fieldName,
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  };
});

const _names: string[] = [
  'Annie Lindqvist',
  'Aaron Reid',
  'Alex Lundberg',
  'Roko Kolar',
  'Christian Bergqvist',
  'Valentina Lovric',
  'Makenzie Sharett'
];

function getMockDateString(): string {
  return 'Thu Jan 05 2017‌';
}

export interface IAnnouncedQuickActionsExampleItem {
  key: number;
  name: string;
  modified: string;
  modifiedby: string;
  filesize: string;
}

export interface IAnnouncedQuickActionsExampleState {
  items: IAnnouncedQuickActionsExampleItem[];
  selectionDetails: {};
  renameDialogOpen: boolean;
  dialogContent: JSX.Element | undefined;
  announced?: JSX.Element;
}

export class AnnouncedQuickActionsExample extends React.Component<{}, IAnnouncedQuickActionsExampleState> {
  private _selection: Selection;
  private _detailsList = React.createRef<IDetailsList>();
  private _textField = React.createRef<ITextField>();
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);

    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 20; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          modified: getMockDateString(),
          modifiedby: _names[Math.floor(Math.random() * _names.length)],
          filesize: Math.floor(Math.random() * 30).toString() + ' MB'
        });
      }
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails(),
      renameDialogOpen: false,
      dialogContent: undefined,
      announced: undefined
    };
  }

  public componentDidUpdate(prevState: IAnnouncedQuickActionsExampleState) {
    if (prevState.announced !== this.state.announced && this.state.announced !== undefined) {
      this._async.setTimeout(() => {
        this.setState({
          announced: undefined
        });
      }, 2000);
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { items, renameDialogOpen, dialogContent } = this.state;

    return (
      <>
        {this._renderAnnounced()}
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
            onRenderItemColumn={this._onRenderItemColumn}
            onRenderRow={this._onRenderRow}
          />
          <Dialog hidden={!renameDialogOpen} onDismiss={this._closeRenameDialog} closeButtonAriaLabel="Close">
            {dialogContent}
          </Dialog>
        </MarqueeSelection>
      </>
    );
  }

  private _onRenderRow = (props: IDetailsRowProps): JSX.Element => {
    return <DetailsRow {...props} />;
  };

  private _onRenderItemColumn = (item: IAnnouncedQuickActionsExampleItem, index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName as keyof IAnnouncedQuickActionsExampleItem];

    if (column.key === 'name') {
      return (
        <div>
          {fieldContent}
          <IconButton
            menuIconProps={{ iconName: 'MoreVertical' }}
            role="button"
            aria-haspopup={true}
            aria-label="Show actions"
            styles={{ root: { float: 'right', height: 'inherit' } }}
            menuProps={{
              items: [
                {
                  key: 'delete',
                  text: 'Delete',
                  onClick: () => this._deleteItem(index)
                },
                {
                  key: 'rename',
                  text: 'Rename',
                  onClick: () => this._renameItem(item, index)
                }
              ]
            }}
          />
        </div>
      );
    } else {
      return <span>{fieldContent}</span>;
    }
  };

  private _renderAnnounced = (): JSX.Element | undefined => {
    const { announced } = this.state;
    return announced;
  };

  private _deleteItem = (index: number): void => {
    const items = this.state.items;
    items.splice(items.indexOf(items[index]), 1);

    this.setState({
      items: [...items],
      announced: <Announced message="Item deleted" aria-live="assertive" />
    });
    return;
  };

  private _renameItem(item: IAnnouncedQuickActionsExampleItem, index: number): void {
    this.setState({
      renameDialogOpen: true,
      dialogContent: (
        <>
          <TextField componentRef={this._textField} label="Rename" defaultValue={item.name} />
          <DialogFooter>
            <PrimaryButton onClick={this._updateItemName.bind(this, index)} text="Save" />
          </DialogFooter>
        </>
      )
    });
    return;
  }

  private _updateItemName(index: number): void {
    if (this._textField && this._textField.current) {
      const items = this.state.items;
      items[index].name = this._textField.current.value || items[index].name;
      this.setState({
        renameDialogOpen: false,
        items: [...items],
        announced: <Announced message="Item renamed" aria-live="assertive" />
      });
    } else {
      return;
    }
  }

  private _closeRenameDialog = (): void => {
    this.setState({
      renameDialogOpen: false
    });
  };

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
}
