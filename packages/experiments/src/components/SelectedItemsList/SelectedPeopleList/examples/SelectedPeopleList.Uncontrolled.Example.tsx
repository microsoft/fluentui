import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/PeopleExampleData';
import {
  SelectedPeopleList,
  IUncontrolledSelectedPeopleList
} from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
export class SelectedPeopleListUncontrolledExample extends React.Component<{}> {
  private _selectionList: IUncontrolledSelectedPeopleList;

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        Right click any persona to open the context menu
        <br />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        <div>
          <SelectedPeopleList
            isControlled={false}
            key={'normal'}
            removeButtonAriaLabel={'Remove'}
            defaultSelectedItems={[people[40]]}
            componentRef={this._setComponentRef}
          />
        </div>
      </div>
    );
  }

  private _setComponentRef = (component: IUncontrolledSelectedPeopleList): void => {
    this._selectionList = component;
  };

  private _onAddItemButtonClicked = (): void => {
    const randomPerson = people[Math.floor(Math.random() * (people.length - 1))];
    this._selectionList.addItems([randomPerson]);
  };
}
