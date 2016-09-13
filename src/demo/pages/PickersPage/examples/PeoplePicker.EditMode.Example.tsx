import * as React from 'react';
import {
  NormalPeoplePicker,
  IPersonaProps
} from '../../../../index';
const PeopleData = require('./PeoplePickerExampleData');

export interface IPeoplePickerExampleState {
  suggestions?: Array<IPersonaProps>;
  initialItems?: Array<IPersonaProps>;
}

export class PeoplePickerEditModeExample extends React.Component<any, IPeoplePickerExampleState> {
  private _existingList = PeopleData.slice(0, 2);
  private _peopleList = PeopleData;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render() {

    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        suggestionsHeaderText={'Suggested People'}
        className={ 'ms-PeoplePicker' }
        startingItems={ this._existingList }
        // suggestions={ suggestions }
        // searchCategoryName={ 'Top Results' }
        // noResultsText={ 'No Results Available' }
        // onSearchFieldChanged={ this._onFilterChanged }
        // onRemoveSuggestion={ this._onRemoveSuggestion }
        // type={ PeoplePickerType.compact }
        // primarySearchText='Showing top 5 results'
        // secondarySearchText='Search Contacts & Directory'
        // disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
        />
    );
  }

  private _onFilterChanged(filterText: string) {
    return this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) >= 0);
  }
}
