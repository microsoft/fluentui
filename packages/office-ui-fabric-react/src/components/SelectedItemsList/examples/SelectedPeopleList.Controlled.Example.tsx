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

export interface ISelectedPeopleListControlledExampleState {
  currentSelectedItems: IExtendedPersonaProps[];
  nextPersonIndex: number;
}

export class SelectedPeopleListControlledExample extends React.Component<{}, ISelectedPeopleListControlledExampleState> {
  private _selectionList = React.createRef<SelectedPeopleList>();
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSelectedItems: [people[40]],
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
        <Stack horizontal wrap styles={{ root: { maxWidth: '100%' } }}>
          <SelectedPeopleList
            key="normal"
            removeButtonAriaLabel="Remove"
            selectedItems={this.state.currentSelectedItems}
            componentRef={this._selectionList}
            onCopyItems={this._onCopyItems}
            onExpandGroup={this._onExpandItem}
            copyMenuItemText="Copy"
            removeMenuItemText="Remove"
            selection={this._selection}
            onRenderItem={this._onRenderItem}
            onItemDeleted={this._onItemDeleted}
          />
        </Stack>
      </div>
    );
  }

  private _onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
    return <ExtendedSelectedItem {...props} />;
  };

  private _onAddItemButtonClicked = (): void => {
    const { nextPersonIndex, currentSelectedItems } = this.state;
    this.setState({
      currentSelectedItems: [...currentSelectedItems, people[nextPersonIndex]],
      nextPersonIndex: nextPersonIndex + 1
    });
  };

  private _onItemDeleted = (item: IExtendedPersonaProps): void => {
    const { currentSelectedItems } = this.state;
    const indexToRemove = currentSelectedItems.indexOf(item);
    const newSelectedItems = [...currentSelectedItems];
    newSelectedItems.splice(indexToRemove, 1);
    this.setState({ currentSelectedItems: newSelectedItems });
  };

  private _onExpandItem = (item: IExtendedPersonaProps): void => {
    const { currentSelectedItems } = this.state;
    const expandedItem = item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
    const indexToExpand = currentSelectedItems.indexOf(item);
    this.setState({
      currentSelectedItems: currentSelectedItems
        .slice(0, indexToExpand)
        .concat(expandedItem)
        .concat(currentSelectedItems.slice(indexToExpand + 1))
    });
  };

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    return items.map((item: IExtendedPersonaProps) => item.text).join(', ');
  }
}
