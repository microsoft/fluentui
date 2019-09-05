import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersona } from 'office-ui-fabric-react/lib/Persona';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { people } from '@uifabric/example-data';
import { SelectedPeopleList, ISelectedPeopleList } from '@uifabric/experiments/lib/SelectedItemsList';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersona[];
  controlledComponent: boolean;
}

export class SelectedPeopleListBasicExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: ISelectedPeopleList;
  private index: number;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  constructor(props: {}) {
    super(props);

    this.state = {
      controlledComponent: false,
      currentSelectedItems: [people[40]]
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        <Toggle label="Controlled component" defaultChecked={false} onChange={this._toggleControlledComponent} />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        {this._renderExtendedPicker()}
      </div>
    );
  }

  private _toggleControlledComponent = (ev: React.MouseEvent<HTMLElement>, toggleState: boolean): void => {
    this.setState({ controlledComponent: toggleState });
  };

  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          ref={this._setComponentRef}
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          selectedItems={this.state.controlledComponent ? this.state.currentSelectedItems : undefined}
          selection={this.selection}
          onItemsRemoved={this.state.controlledComponent ? this._onItemsRemoved : undefined}
        />
      </div>
    );
  }

  private _setComponentRef = (component: ISelectedPeopleList): void => {
    this._selectionList = component;
  };

  private _onAddItemButtonClicked = (): void => {
    if (!this.index) {
      this.index = 0;
    }

    if (this.state.controlledComponent) {
      this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, people[this.index]] });
    } else if (this._selectionList) {
      this._selectionList.addItems([people[this.index]]);
    } else {
      return;
    }

    this.index++;
  };

  private _onItemsRemoved = (items: IPersona[]): void => {
    const currentSelectedItemsCopy = this.state.currentSelectedItems.slice();
    items.forEach(item => {
      const indexToRemove = currentSelectedItemsCopy.indexOf(item);
      currentSelectedItemsCopy.splice(indexToRemove, 1);
    });
  };

  private _onSelectionChange(): void {
    this.forceUpdate();
  }
}
