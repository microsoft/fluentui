import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
  IExtendedPersonaProps,
  SelectedPeopleList,
  ISelectedPeopleItemProps,
  ExtendedSelectedItem
} from 'office-ui-fabric-react/lib/SelectedItemsList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { people, groupOne, groupTwo } from '@uifabric/example-data';

export interface ISelectedPeopleListBasicExampleState {
  nextPersonIndex: number;
}

export class SelectedPeopleListBasicExample extends React.Component<{}, ISelectedPeopleListBasicExampleState> {
  private _selectionList = React.createRef<SelectedPeopleList>();
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this.state = {
      nextPersonIndex: 0
    };
    this._selection = new Selection({ onSelectionChanged: () => this.forceUpdate() });
  }

  public render(): JSX.Element {
    return (
      <div>
        <PrimaryButton
          text="Add another item"
          onClick={this._onAddItemButtonClicked}
          disabled={this.state.nextPersonIndex >= people.length}
          styles={{ root: { display: 'block', marginBottom: 20 } }}
        />
        <Stack horizontal wrap>
          <SelectedPeopleList
            key="normal"
            removeButtonAriaLabel="Remove"
            defaultSelectedItems={[people[40]]}
            componentRef={this._selectionList}
            onCopyItems={this._onCopyItems}
            onExpandGroup={this._onExpandItem}
            copyMenuItemText="Copy"
            removeMenuItemText="Remove"
            selection={this._selection}
            onRenderItem={this._onRenderItem}
          />
        </Stack>
      </div>
    );
  }

  private _onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
    return <ExtendedSelectedItem {...props} />;
  };

  private _onAddItemButtonClicked = (): void => {
    if (this._selectionList.current) {
      const { nextPersonIndex } = this.state;
      this._selectionList.current.addItems([people[nextPersonIndex]]);
      this.setState({ nextPersonIndex: nextPersonIndex + 1 });
    }
  };

  private _onExpandItem = (item: IExtendedPersonaProps): void => {
    const expandedItem = item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
    this._selectionList.current!.replaceItem(item, expandedItem);
  };

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    return items.map((item: IExtendedPersonaProps) => item.text).join(', ');
  }
}
