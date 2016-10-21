/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  ListPeoplePicker,
  NormalPeoplePicker,
  CompactPeoplePicker,
  IContextualMenuItem,
  Dropdown,
  IDropdownOption,
  IPersonaProps,
  IBasePickerSuggestionsProps,
  BaseComponent,
  autobind,
  Toggle
} from '../../../../index';
import { IPersonaWithMenu } from '../../../../components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { people } from './PeoplePickerExampleData';
import { assign } from '../../../../utilities/object';
import './PeoplePicker.Types.Example.scss';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  delayResults?: boolean;
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found'
};

export class PeoplePickerTypesExample extends BaseComponent<any, IPeoplePickerExampleState> {
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
      isDisabled: true
    }
  ];

  constructor() {
    super();
    this._peopleList = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona, { menuItems: this.contextualMenuItems });
      this._peopleList.push(target);
    });

    this.state = {
      currentPicker: 1,
      delayResults: false
    };
  }

  public render() {
    let currentPicker: JSX.Element;

    switch (this.state.currentPicker) {
      case 1:
        currentPicker = this._renderNormalPicker();
        break;
      case 2:
        currentPicker = this._renderCompactPicker();
        break;
      case 3:
        currentPicker = this._renderListPicker();
        break;
      case 4:
        currentPicker = this._renderPreselectedItemsPicker();
        break;
      case 5:
        currentPicker = this._renderLimitedSearch();
        break;
    }

    return (
      <div>
        { currentPicker }
        <div className={'dropdown-div'}>
          <Dropdown label='Select People Picker Type'
            options={[
              { key: 1, text: 'Normal' },
              { key: 2, text: 'Compact' },
              { key: 3, text: 'Members List' },
              { key: 4, text: 'Preselected Items' },
              { key: 5, text: 'Limit Search' }
            ]}
            selectedKey={ this.state.currentPicker }
            onChanged={ this._dropDownSelected }
            />
          <Toggle
            label='Delay Suggestion Results'
            defaultChecked={ false }
            onChanged={ this._toggleChange }/>
        </div>
      </div>
    );
  }

  public _renderListPicker() {
    return (
      <ListPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        className={ 'ms-PeoplePicker' }
        pickerSuggestionsProps={ suggestionProps }
        key={'list'}
        />
    );
  }

  public _renderNormalPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
        />
    );
  }

  public _renderCompactPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        />
    );
  }

  public _renderPreselectedItemsPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        className={ 'ms-PeoplePicker' }
        defaultSelectedItems={ people.splice(0, 3) }
        key={ 'list' }
        pickerSuggestionsProps={ suggestionProps }
        />
    );
  }

  public _renderLimitedSearch() {
    let limitedSearchSuggestionProps = suggestionProps;
    limitedSearchSuggestionProps.searchForMoreText = 'Load all Results';
    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChangedWithLimit }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        className={ 'ms-PeoplePicker' }
        onGetMoreResults={ this._onFilterChanged }
        pickerSuggestionsProps={ limitedSearchSuggestionProps }
        />
    );
  }

  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  @autobind
  private _onFilterChangedWithLimit(filterText: string, currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    return this._onFilterChanged(filterText, currentPersonas, 3);
  }

  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    if (this.state.delayResults) {
      return this._convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(item => this._doesTextStartWith(item.primaryText, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  @autobind
  private _toggleChange(toggleState: boolean) {
    this.setState({ delayResults: toggleState });
  }

  @autobind
  private _dropDownSelected(option: IDropdownOption) {
    this.setState({ currentPicker: option.key });
  }

}
