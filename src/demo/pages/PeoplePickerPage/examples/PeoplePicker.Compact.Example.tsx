import * as React from 'react';
import {
  PeoplePicker,
  PeoplePickerType,
  IPersonaProps
} from '../../../../index';
const PeopleData = require('./PeoplePickerExampleData');

export interface IPeoplePickerExampleState {
  suggestions?: Array<IPersonaProps>;
}

export class PeoplePickerCompactExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = PeopleData;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onRemoveSuggestion = this._onRemoveSuggestion.bind(this);
    this.state = {
      suggestions: this._peopleList,
    };
  }

  public render() {
    let { suggestions } = this.state;

    return (
      <PeoplePicker
        suggestions={ suggestions }
        searchCategoryName={ 'Top Results' }
        noResultsText={ 'No Results Available' }
        onSearchFieldChanged={ this._onFilterChanged }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        type={ PeoplePickerType.compact }
        primarySearchText='Showing top 5 results'
        secondarySearchText='Search Contacts & Directory'
        disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
      />
    );
  }

  private _onFilterChanged(filterText: string) {
    this.setState({
      suggestions: this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) >= 0)
    });
  };

  private _onRemoveSuggestion(index: number, persona: IPersonaProps) {
    let personas = this.state.suggestions;
    personas.splice(index, 1);
    this.setState({
      suggestions: personas
    });
  }
}
