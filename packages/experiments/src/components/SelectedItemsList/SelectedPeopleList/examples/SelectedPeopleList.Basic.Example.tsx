import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people } from './PeopleExampleData';
import { SelectedPeopleList, ISelectedPeopleList } from '../../SelectedPeopleList/SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IPersona } from '../../../../../../office-ui-fabric-react/lib';

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
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          selectedItems={this.state.controlledComponent ? this.state.currentSelectedItems : undefined}
          componentRef={this._setComponentRef}
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
    if (this._selectionList) {
      if (!this.index) {
        this.index = 0;
      }

      if (this.state.controlledComponent) {
        this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, people[this.index]] });
      } else {
        this._selectionList.addItems([people[this.index]]);
      }
      this.index++;
    }
  };

  private _onItemsRemoved = (item: IPersona): void => {
    const indexToRemove = this.state.currentSelectedItems.indexOf(item);
    this.setState({
      currentSelectedItems: this.state.currentSelectedItems
        .slice(0, indexToRemove)
        .concat(this.state.currentSelectedItems.slice(indexToRemove + 1))
    });
  };

  private _onSelectionChange(): void {
    this.forceUpdate();
  }
}
