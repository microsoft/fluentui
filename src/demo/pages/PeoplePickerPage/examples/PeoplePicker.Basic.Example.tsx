import * as React from 'react';
import {
  PeoplePicker
} from '../../../../index';
import { people } from './PeoplePickerExampleData';

export interface IPeoplePickerExampleState {
}

export class PeoplePickerBasicExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = people;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render() {
    return (
      <PeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        // suggestions={ suggestions }
        // searchCategoryName={ 'Suggested Contacts' }
        // noResultsText={ 'No Results Available' }
        // onSearchFieldChanged={ this._onFilterChanged }
        // onRemoveSuggestion={ this._onRemoveSuggestion }
        // primarySearchText='Showing top results'
        // secondarySearchText='Search Contacts & Directory'
        // disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
        />
    );
  }

  private _onFilterChanged(filterText: string) {
    return filterText ? this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  }
}
