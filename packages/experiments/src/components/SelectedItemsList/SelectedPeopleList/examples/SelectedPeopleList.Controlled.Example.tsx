import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IExtendedPersonaProps } from 'office-ui-fabric-react/lib/SelectedItemsList';
import { SelectedPeopleList } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { people } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/PeopleExampleData';
import { IControlledSelectedItemsList } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedItemsList.types';

export interface IUncontrolledSelectedPeopleListControlledExampleState {
  currentSelectedItems: IExtendedPersonaProps[];
  nextPersonIndex: number;
}

export class SelectedPeopleListControlledExample extends React.Component<{}, IUncontrolledSelectedPeopleListControlledExampleState> {
  private _selectionList = React.createRef<IControlledSelectedItemsList>();
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
        <SelectedPeopleList
          isControlled={true}
          key="normal"
          selectedItems={this.state.currentSelectedItems}
          componentRef={this._selectionList}
          selection={this._selection}
          onItemChange={this._onItemChange}
          onItemsRemoved={this._onItemsRemoved}
        />
      </div>
    );
  }

  private _onAddItemButtonClicked = (): void => {
    const { nextPersonIndex, currentSelectedItems } = this.state;
    this.setState({
      currentSelectedItems: [...currentSelectedItems, people[nextPersonIndex]],
      nextPersonIndex: nextPersonIndex + 1
    });
  };

  private _onItemsRemoved = (removedItem: IExtendedPersonaProps | IExtendedPersonaProps[]) => {
    const lemma = Array.isArray(removedItem)
      ? (item: IExtendedPersonaProps) => removedItem.indexOf(item) === -1
      : (item: IExtendedPersonaProps) => removedItem !== item;
    this.setState({
      currentSelectedItems: this.state.currentSelectedItems.filter(lemma),
      nextPersonIndex: this.state.nextPersonIndex
    });
  };

  private _onItemChange = (newItem: IExtendedPersonaProps | IExtendedPersonaProps[], index: number) => {
    const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;
    if (index >= 0) {
      const newItems: IExtendedPersonaProps[] = [...this.state.currentSelectedItems];
      newItems.splice(index, 1, ...newItemsArray);
      this.setState({
        currentSelectedItems: newItems,
        nextPersonIndex: this.state.nextPersonIndex
      });
    }
  };
}
