import * as React from 'react';
import {
  PeoplePicker,
  PeoplePickerType,
  IPersonaProps
} from '../../../../index';
const PeopleData = require('./PeoplePickerExampleData');

export interface IPeoplePickerExampleState {
  suggestions?: Array<IPersonaProps>;
  initialItems?: Array<IPersonaProps>;
}

export class PeoplePickerEditModeExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peoplePickerRef: PeoplePicker;
  private _existingList = PeopleData.slice(0, 2);
  private _peopleList = PeopleData;

  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onRemoveSuggestion = this._onRemoveSuggestion.bind(this);
    this.state = {
      suggestions: this._peopleList,
      initialItems: this._existingList
    };
  }

  public render() {
    let { suggestions, initialItems } = this.state;

    return (
      <div>
        <PeoplePicker
          ref={ (c: PeoplePicker) => this._peoplePickerRef = c }
          suggestions={ suggestions }
          initialItems={ initialItems }
          type={ PeoplePickerType.compact }
          canSearchMore={ false }
          addedMemberCountFormatText= { '{0} people added' }
          searchCategoryName={ 'Suggested Contacts' }
          noResultsText={ 'No Results Available' }
          onSearchFieldChanged={ this._onFilterChanged }
          onRemoveSuggestion={ this._onRemoveSuggestion }
          primarySearchText='Showing top results'
          secondarySearchText='Search Contacts & Directory'
          disconnectedText='We are having trouble connecting to the server.<br>Please try again in a few minutes.'
          />
      </div>
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
