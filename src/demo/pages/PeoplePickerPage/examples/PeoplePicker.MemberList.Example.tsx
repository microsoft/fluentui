import * as React from 'react';
import {
  PeoplePicker,
  PeoplePickerType,
  IPersonaProps
} from '../../../../index';

export interface IPeoplePickerExampleState {
  suggestions?: Array<IPersonaProps>;
}

export class PeoplePickerMemberListExample extends React.Component<any, IPeoplePickerExampleState> {
  private _peopleList = [
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'PV',
      primaryText: 'Peter Venkman',
      secondaryText: 'Ghostbuster',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'PC',
      primaryText: 'Phil Connors',
      secondaryText: 'Reporter',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'CS',
      primaryText: 'Carl Spackler',
      secondaryText: 'Golpher',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'SZ',
      primaryText: 'Steve Zissou',
      secondaryText: 'Oceanographer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'BH',
      primaryText: 'Bob Harris',
      secondaryText: 'Actor',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
    {
      imageUrl: '//www.fillmurray.com/200/200',
      imageInitials: 'BB',
      primaryText: 'Bunny Breckinridge',
      secondaryText: 'Actor',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    },
  ];

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
        type={ PeoplePickerType.memberList }
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
