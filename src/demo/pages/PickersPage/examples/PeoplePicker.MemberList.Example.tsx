import * as React from 'react';
import {
  ListPeoplePicker,
  IContextualMenuItem,
  IPersonaProps,
  Button
} from '../../../../index';
import { IPersonaWithMenu } from '../../../../components/Pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { people } from './PeoplePickerExampleData';
import { assign } from '../../../../utilities/object';

export interface IPeoplePickerExampleState {
  preselectedItems: any[]
}

export class PeoplePickerMemberListExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList;
  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      isDisabled: true,
    },
  ];

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._peopleList = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona, { menuItems: this.contextualMenuItems });
      this._peopleList.push(target);
    });
    this.state = { preselectedItems: [] };
  }

  public render() {
    return (
      <div>
        <ListPeoplePicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
          suggestionsHeaderText={ 'Suggested People' }
          className={ 'ms-PeoplePicker' }
          startingItems={ this.state.preselectedItems }
          // suggestions={ suggestions }
          // searchCategoryName={ 'Top Results' }
          // noResultsText={ 'No Results Available' }
          // onSearchFieldChanged={ this._onFilterChanged }
          // onRemoveSuggestion={ this._onRemoveSuggestion }
          // primarySearchText='Showing top 5 results'
          // secondarySearchText='Search Contacts & Directory'
          // disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
          />
        <Button onClick={ this._addPreselectedItems.bind(this) }> Click To Add Preselected Items </Button>
      </div>
    );
  }

  private _addPreselectedItems() {
    this.setState({ preselectedItems: people.slice(0, 2) });
  }

  private _onFilterChanged(filterText: string) {
    return filterText ? this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  }
}
