/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  assign,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IBasePickerSuggestionsProps, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
import { IBaseFloatingPicker } from '../../BaseFloatingPicker.Props';
import { FloatingPeoplePicker } from '../FloatingPeoplePicker';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { people, mru } from './PeoplePickerExampleData';
import './WellPeoplePicker.Basic.Example.scss';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
  searchValue: string;
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};

export class FloatingPeoplePickerTypesExample extends BaseComponent<any, IPeoplePickerExampleState> {
  private _picker: IBaseFloatingPicker;
  private _inputElement: HTMLDivElement;

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
      currentSelectedItems: [],
      searchValue: ''
    };
  }

  public render() {
    return (<div>
      <div className='ms-SearchBoxSmallExample' ref={ (ref: HTMLDivElement) => this._inputElement = ref }>
        <SearchBox
          labelText={ 'Search a person' }
          onChange={ this._onSearchChange }
          value={ this.state.searchValue }
        />
      </div>
      { this._renderFloatingPicker() }
    </div>)
  }

  @autobind
  private _onSearchChange(newValue: string) {
    if (newValue !== this.state.searchValue) {
      this.setState({ searchValue: newValue });
      this._picker.onQueryStringChanged(newValue);
    }
  }

  private _renderFloatingPicker() {
    return (
      <FloatingPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText as string }
        pickerSuggestionsProps={ suggestionProps }
        key={ 'normal' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        componentRef={ (component: IBaseFloatingPicker) => { this._picker = component; } }
        onChange={ this._onChange }
        inputElement={ this._inputElement }
      />
    );
  }

  @autobind
  private _onChange(selectedSuggestion: IPersonaProps) {
    this.setState({ searchValue: selectedSuggestion.primaryText as any });
    this._picker.hidePicker();
  }

  @autobind
  private _onRemoveSuggestion(item: IPersonaProps): void {
    let { peopleList, mostRecentlyUsed: mruState } = this.state;
    let indexPeopleList: number = peopleList.indexOf(item);
    let indexMostRecentlyUsed: number = mruState.indexOf(item);

    if (indexPeopleList >= 0) {
      let newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

    if (indexMostRecentlyUsed >= 0) {
      let newSuggestedPeople: IPersonaProps[] = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  }

  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter(item => this._doesTextStartWith(item.primaryText as string, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  @autobind
  private _validateInput(input: string) {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }
}
