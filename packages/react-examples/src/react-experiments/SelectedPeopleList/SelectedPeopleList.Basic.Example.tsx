import * as React from 'react';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IPersona } from '@fluentui/react/lib/Persona';
import { people } from '@fluentui/example-data';
import { SelectedPeopleList } from '@fluentui/react-experiments/lib/SelectedItemsList';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersona[];
}

export class SelectedPeopleListBasicExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private index: number;
  private addMultipleKey = 50;

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSelectedItems: [people[40]],
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        <PrimaryButton text="Add multiple items" onClick={this._addMoreItems} />
        {this._renderExtendedPicker()}
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          selectedItems={[...this.state.currentSelectedItems]}
          onItemsRemoved={this._onItemsRemoved}
        />
      </div>
    );
  }

  private _onAddItemButtonClicked = (): void => {
    if (!this.index) {
      this.index = 0;
    }
    this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, people[this.index]] });
    this.index++;
  };

  private _addMoreItems = (): void => {
    const moreItems = people.map(obj => {
      return { ...obj, key: ++this.addMultipleKey };
    });
    this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, ...moreItems] });
  };

  private _onItemsRemoved = (items: IPersona[]): void => {
    const currentSelectedItemsCopy = [...this.state.currentSelectedItems];
    items.forEach(item => {
      const indexToRemove = currentSelectedItemsCopy.indexOf(item);
      currentSelectedItemsCopy.splice(indexToRemove, 1);
      this.setState({ currentSelectedItems: [...currentSelectedItemsCopy] });
    });
  };
}
