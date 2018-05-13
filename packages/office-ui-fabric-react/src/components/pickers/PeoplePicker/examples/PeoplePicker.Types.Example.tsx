/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  assign
} from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  IBasePicker,
  ListPeoplePicker,
  NormalPeoplePicker,
  ValidationState
} from 'office-ui-fabric-react/lib/Pickers';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { people, mru } from './PeoplePickerExampleData';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Promise } from 'es6-promise';
import './PeoplePicker.Types.Example.scss';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  delayResults?: boolean;
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
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

const limitedSearchAdditionalProps: IBasePickerSuggestionsProps = {
  searchForMoreText: 'Load all Results',
  resultsMaximumNumber: 10,
  searchingText: 'Searching...'
};

const limitedSearchSuggestionProps: IBasePickerSuggestionsProps = assign(limitedSearchAdditionalProps, suggestionProps);

export class PeoplePickerTypesExample extends BaseComponent<any, IPeoplePickerExampleState> {
  private _picker: IBasePicker<IPersonaProps>;

  constructor(props: {}) {
    super(props);
    const peopleList: IPersonaWithMenu[] = [];
    people.forEach((persona: IPersonaProps) => {
      const target: IPersonaWithMenu = {};

      assign(target, persona);
      peopleList.push(target);
    });

    this.state = {
      currentPicker: 1,
      delayResults: false,
      peopleList: peopleList,
      mostRecentlyUsed: mru,
      currentSelectedItems: []
    };
  }

  public render() {
    let currentPicker: JSX.Element | undefined = undefined;

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
      case 6:
        currentPicker = this._renderProcessSelectionPicker();
      case 7:
        currentPicker = this._renderControlledPicker();
        break;
      default:
    }

    return (
      <div>
        { currentPicker }
        <div className={ 'dropdown-div' }>
          <Dropdown
            label='Select People Picker Type'
            options={ [
              { key: 1, text: 'Normal' },
              { key: 2, text: 'Compact' },
              { key: 3, text: 'Members List' },
              { key: 4, text: 'Preselected Items' },
              { key: 5, text: 'Limit Search' },
              { key: 6, text: 'Process Selection' },
              { key: 7, text: 'Controlled Picker' }
            ] }
            selectedKey={ this.state.currentPicker }
            onChanged={ this._dropDownSelected }
          />
          <Toggle
            label='Delay Suggestion Results'
            defaultChecked={ false }
            onChanged={ this._toggleDelayResultsChange }
          />
        </div>
        <PrimaryButton
          text='Set focus'
          onClick={ this._onSetFocusButtonClicked }
        />
      </div>
    );
  }

  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }
  private _renderListPicker() {
    return (
      <ListPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        getTextFromItem={ this._getTextFromItem }
        className={ 'ms-PeoplePicker' }
        pickerSuggestionsProps={ suggestionProps }
        key={ 'list' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderNormalPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        getTextFromItem={ this._getTextFromItem }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        removeButtonAriaLabel={ 'Remove' }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        onInputChange={ this._onInputChange }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderCompactPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        getTextFromItem={ this._getTextFromItem }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderPreselectedItemsPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        getTextFromItem={ this._getTextFromItem }
        className={ 'ms-PeoplePicker' }
        defaultSelectedItems={ people.splice(0, 3) }
        key={ 'list' }
        pickerSuggestionsProps={ suggestionProps }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderLimitedSearch() {
    limitedSearchSuggestionProps.resultsFooter = this._renderFooterText;

    return (
      <CompactPeoplePicker
        onResolveSuggestions={ this._onFilterChangedWithLimit }
        onEmptyInputFocus={ this._returnMostRecentlyUsedWithLimit }
        getTextFromItem={ this._getTextFromItem }
        className={ 'ms-PeoplePicker' }
        onGetMoreResults={ this._onFilterChanged }
        pickerSuggestionsProps={ limitedSearchSuggestionProps }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderProcessSelectionPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        onEmptyInputFocus={ this._returnMostRecentlyUsed }
        getTextFromItem={ this._getTextFromItem }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        onRemoveSuggestion={ this._onRemoveSuggestion }
        onValidateInput={ this._validateInput }
        removeButtonAriaLabel={ 'Remove' }
        onItemSelected={ this._onItemSelected }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._resolveRef('_picker') }
        resolveDelay={ 300 }
      />
    );
  }

  private _renderControlledPicker() {
    const controlledItems = [];
    for (let i = 0; i < 5; i++) {
      const item = this.state.peopleList[i];
      if (this.state.currentSelectedItems!.indexOf(item) === -1) {
        controlledItems.push(this.state.peopleList[i]);
      }
    }
    return (
      <div>
        <NormalPeoplePicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ this._getTextFromItem }
          pickerSuggestionsProps={ suggestionProps }
          className={ 'ms-PeoplePicker' }
          key={ 'controlled' }
          selectedItems={ this.state.currentSelectedItems }
          onChange={ this._onItemsChange }
          inputProps={ {
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called')
          } }
          componentRef={ this._resolveRef('_picker') }
          resolveDelay={ 300 }
        />
        <label> Click to Add a person </label>
        { controlledItems.map((item, index) => <div key={ index }>
          <DefaultButton
            className='controlledPickerButton'
            // tslint:disable-next-line:jsx-no-lambda
            onClick={ () => {
              this.setState({
                currentSelectedItems: this.state.currentSelectedItems!.concat([item])
              });
            } }
          >
            <Persona { ...item } />
          </DefaultButton>
        </div>) }
      </div>
    );
  }

  private _onItemsChange = (items: any[]): void => {
    this.setState({
      currentSelectedItems: items
    });
  }

  private _onSetFocusButtonClicked = (): void => {
    if (this._picker) {
      this._picker.focusInput();
    }
  }

  private _renderFooterText = (): JSX.Element => {
    return <div>No additional results</div>;
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
      const newSuggestedPeople: IPersonaProps[] = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  }

  private _onItemSelected = (item: IPersonaProps): Promise<IPersonaProps> => {
    const processedItem = Object.assign({}, item);
    processedItem.text = `${item.text} (selected)`;
    return new Promise<IPersonaProps>((resolve, reject) => setTimeout(() => resolve(processedItem), 250));
  }

  private _onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  private _returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
    return this._filterPromise(mostRecentlyUsed);
  }

  private _returnMostRecentlyUsedWithLimit = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
    mostRecentlyUsed = mostRecentlyUsed.splice(0, 3);
    return this._filterPromise(mostRecentlyUsed);
  }

  private _onFilterChangedWithLimit = (filterText: string, currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
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
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter(item => this._doesTextStartWith(item.text as string, filterText));
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

  private _toggleDelayResultsChange = (toggleState: boolean): void => {
    this.setState({ delayResults: toggleState });
  }

  private _dropDownSelected = (option: IDropdownOption): void => {
    this.setState({ currentPicker: option.key });
  }

  private _validateInput = (input: string): ValidationState => {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Takes in the picker input and modifies it in whichever way
   * the caller wants, i.e. parsing entries copied from Outlook (sample
   * input: "Aaron Reid <aaron>").
   *
   * @param input The text entered into the picker.
   */
  private _onInputChange(input: string): string {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }

    return input;
  }
}
