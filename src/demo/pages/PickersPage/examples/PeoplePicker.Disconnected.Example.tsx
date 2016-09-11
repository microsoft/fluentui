import * as React from 'react';
import {
  PeoplePicker
} from '../../../../index';
const PeopleData = require('./PeoplePickerExampleData');

export interface IPeoplePickerExampleState {
}
export class PeoplePickerDisconnectedExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = PeopleData;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render() {
    return (
      <PeoplePicker
        // suggestions={ suggestions }
        // searchCategoryName={ 'Top Results' }
        // noResultsText={ 'No Results Available' }
        // onSearchFieldChanged={ this._onFilterChanged }
        // onRemoveSuggestion={ this._onRemoveSuggestion }
        // isConnected={ false }
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
