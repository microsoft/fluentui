/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  assign,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { PeopleItemSelectionList } from '../PeopleItemList/PeopleItemList';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { people, mru } from './PeopleExampleData';
import '../../../../../office-ui-fabric-react/src/components/Pickers/PeoplePicker/examples/PeoplePicker.Types.Example.scss';
import { IBaseSelectionItemsList, IBaseSelectionItemsListProps } from '../BaseSelectionItemsList.Props';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
}

export class PeopleSelectionItemsListExample extends BaseComponent<IBaseSelectionItemsListProps<IPersonaProps>, IPeoplePickerExampleState> {
  private _selectionList: IBaseSelectionItemsList<IPersonaProps>;
  private index: number = 5;

  constructor() {
    super();
    let peopleList: IPersonaWithMenu[] = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona);
      peopleList.push(target);
    });

    this.state = {
      peopleList: peopleList,
      mostRecentlyUsed: mru,
      currentSelectedItems: []
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        { this._renderExtendedPicker() }
        <PrimaryButton
          text='Add random item'
          onClick={ this._onSetFocusButtonClicked }
        />
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <PeopleItemSelectionList
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
        removeButtonAriaLabel={ 'Remove' }
        defaultSelectedItems={ mru }
        componentRef={ this._setComponentRef }
      />
    );
  }

  @autobind
  private _setComponentRef(component: IBaseSelectionItemsList<IPersonaProps>): void {
    this._selectionList = component;
  }

  @autobind
  private _onSetFocusButtonClicked(): void {
    if (this._selectionList) {
      this._selectionList.addItem(people[this.index]);
      this.index++;
    }
  }
}