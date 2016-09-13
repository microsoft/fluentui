import * as React from 'react';
import {
  IPersonaProps,
  CompactPeoplePicker
} from '../../../../index';
import { people } from './PeoplePickerExampleData';

export interface IPeoplePickerExampleState {
}

export class PeoplePickerCompactExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = people;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render() {

    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        suggestionsHeaderText={'Suggested People'}
        className={'ms-PeoplePicker'}
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
    return filterText ? this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  }

}
