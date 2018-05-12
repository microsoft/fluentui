/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  assign
} from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { SuggestionsStore } from '../../Suggestions/SuggestionsStore';
import { IBaseFloatingPicker, IBaseFloatingPickerSuggestionProps, FloatingPeoplePicker } from 'office-ui-fabric-react/lib/FloatingPicker';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { people, mru } from 'office-ui-fabric-react/lib/ExtendedPicker';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import './FloatingPeoplePicker.Basic.Example.scss';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
  searchValue: string;
}

export class FloatingPeoplePickerTypesExample extends BaseComponent<{}, IPeoplePickerExampleState> {
  private _picker: IBaseFloatingPicker;
  private _inputElement: HTMLInputElement;

  constructor(props: {}) {
    super(props);
    const peopleList: IPersonaWithMenu[] = [];
    people.forEach((persona: IPersonaProps) => {
      const target: IPersonaWithMenu = {};

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

  public render(): JSX.Element {
    return (
      <div>
        <div className='ms-SearchBoxSmallExample' ref={ this._setInputElementRef }>
          <SearchBox
            placeholder={ 'Search a person' }
            onChange={ this._onSearchChange }
            value={ this.state.searchValue }
            onFocus={ this._onFocus }
          />
        </div>
        { this._renderFloatingPicker() }
      </div>
    );
  }

  private _onFocus = (): void => {
    if (this._picker) {
      this._picker.showPicker();
    }
  }

  private _setInputElementRef = (ref: HTMLDivElement) => {
    if (ref && ref.getElementsByClassName('ms-SearchBox-field').length > 0) {
      this._inputElement = ref.getElementsByClassName('ms-SearchBox-field')[0] as HTMLInputElement;
    }
  }

  private _renderFloatingPicker(): JSX.Element {
    const suggestionProps: IBaseFloatingPickerSuggestionProps = {
      footerItemsProps: [{
        renderItem: () => { return (<div>Showing { this._picker.suggestions.length } results</div>); },
        shouldShow: () => {
          return this._picker.suggestions.length > 0;
        }
      }],
    };

    return (
      <FloatingPeoplePicker
        suggestionsStore={ new SuggestionsStore<IPersonaProps>() }
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ this._getTextFromItem }
        pickerSuggestionsProps={ suggestionProps }
        key={ 'normal' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        componentRef={ this._setComponentRef }
        onChange={ this._onPickerChange }
        inputElement={ this._inputElement }
        resolveDelay={ 300 }
      />
    );
  }

  private _setComponentRef = (component: IBaseFloatingPicker): void => {
    this._picker = component;
  }

  private _onSearchChange = (newValue: string): void => {
    if (newValue !== this.state.searchValue) {
      this.setState({ searchValue: newValue });
      this._picker.onQueryStringChanged(newValue);
    }
  }

  private _onPickerChange = (selectedSuggestion: IPersonaProps): void => {
    this.setState({ searchValue: selectedSuggestion.text ? selectedSuggestion.text : '' });
    this._picker.hidePicker();
  }

  private _onRemoveSuggestion = (item: IPersonaProps): void => {
    const { peopleList, mostRecentlyUsed: mruState } = this.state;
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mruState.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[]
        = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  }

  private _onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  }

  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]): boolean {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter((item: IPersonaProps) => item.text === persona.text).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter((item: IPersonaProps) => this._doesTextStartWith(item.text as string, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]): IPersonaProps[] {
    return personas.filter((persona: IPersonaProps) => !this._listContainsPersona(persona, possibleDupes));
  }

  private _validateInput = (input: string): boolean => {
    if (input.indexOf('@') !== -1) {
      return true;
    } else if (input.length > 1) {
      return false;
    } else {
      return false;
    }
  }
}