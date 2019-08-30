import * as React from 'react';

import { BaseComponent, assign } from 'office-ui-fabric-react/lib/Utilities';
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
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { people, mru } from '@uifabric/example-data';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface IPeoplePickerExampleState {
  currentPicker?: number | string;
  delayResults?: boolean;
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  currentSelectedItems?: IPersonaProps[];
  isPickerDisabled?: boolean;
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
  // All pickers extend from BasePicker specifying the item type.
  private _picker = React.createRef<IBasePicker<IPersonaProps>>();

  constructor(props: {}) {
    super(props);

    this.state = {
      currentPicker: 1,
      delayResults: false,
      peopleList: people,
      mostRecentlyUsed: mru,
      currentSelectedItems: [],
      isPickerDisabled: false
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
        break;
      case 7:
        currentPicker = this._renderControlledPicker();
        break;
      default:
    }

    return (
      <div>
        {currentPicker}
        <div style={{ width: 200 }}>
          <Dropdown
            label="Select People Picker Type"
            options={[
              { key: 1, text: 'Normal' },
              { key: 2, text: 'Compact' },
              { key: 3, text: 'Members List' },
              { key: 4, text: 'Preselected Items' },
              { key: 5, text: 'Limit Search' },
              { key: 6, text: 'Process Selection' },
              { key: 7, text: 'Controlled Picker' }
            ]}
            selectedKey={this.state.currentPicker}
            onChange={this._dropDownSelected}
          />
          <Checkbox
            styles={{ root: { marginTop: 10 } }}
            label="Disable People Picker"
            checked={this.state.isPickerDisabled}
            onChange={this._onDisabledButtonClick}
          />
          <Toggle label="Delay Suggestion Results" defaultChecked={false} onChange={this._toggleDelayResultsChange} />
        </div>
        <PrimaryButton text="Set focus" onClick={this._onSetFocusButtonClicked} />
      </div>
    );
  }

  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }
  private _renderListPicker() {
    return (
      <ListPeoplePicker
        onResolveSuggestions={this._onFilterChanged}
        onEmptyInputFocus={this._returnMostRecentlyUsed}
        getTextFromItem={this._getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        key={'list'}
        onRemoveSuggestion={this._onRemoveSuggestion}
        onValidateInput={this._validateInput}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
      />
    );
  }

  private _renderNormalPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={this._onFilterChanged}
        onEmptyInputFocus={this._returnMostRecentlyUsed}
        getTextFromItem={this._getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        key={'normal'}
        onRemoveSuggestion={this._onRemoveSuggestion}
        onValidateInput={this._validateInput}
        removeButtonAriaLabel={'Remove'}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        onInputChange={this._onInputChange}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
      />
    );
  }

  private _renderCompactPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={this._onFilterChanged}
        onEmptyInputFocus={this._returnMostRecentlyUsed}
        getTextFromItem={this._getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        onRemoveSuggestion={this._onRemoveSuggestion}
        onValidateInput={this._validateInput}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
      />
    );
  }

  private _renderPreselectedItemsPicker() {
    return (
      <CompactPeoplePicker
        onResolveSuggestions={this._onFilterChanged}
        onEmptyInputFocus={this._returnMostRecentlyUsed}
        getTextFromItem={this._getTextFromItem}
        className={'ms-PeoplePicker'}
        defaultSelectedItems={people.splice(0, 3)}
        key={'list'}
        pickerSuggestionsProps={suggestionProps}
        onRemoveSuggestion={this._onRemoveSuggestion}
        onValidateInput={this._validateInput}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
      />
    );
  }

  private _renderLimitedSearch() {
    limitedSearchSuggestionProps.resultsFooter = this._renderFooterText;

    return (
      <CompactPeoplePicker
        onResolveSuggestions={this._onFilterChangedWithLimit}
        onEmptyInputFocus={this._returnMostRecentlyUsedWithLimit}
        getTextFromItem={this._getTextFromItem}
        className={'ms-PeoplePicker'}
        onGetMoreResults={this._onFilterChanged}
        pickerSuggestionsProps={limitedSearchSuggestionProps}
        onRemoveSuggestion={this._onRemoveSuggestion}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
      />
    );
  }

  private _renderProcessSelectionPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={this._onFilterChanged}
        onEmptyInputFocus={this._returnMostRecentlyUsed}
        getTextFromItem={this._getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        onRemoveSuggestion={this._onRemoveSuggestion}
        onValidateInput={this._validateInput}
        removeButtonAriaLabel={'Remove'}
        onItemSelected={this._onItemSelected}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        resolveDelay={300}
        disabled={this.state.isPickerDisabled}
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
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={suggestionProps}
          className={'ms-PeoplePicker'}
          key={'controlled'}
          selectedItems={this.state.currentSelectedItems}
          onChange={this._onItemsChange}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called')
          }}
          componentRef={this._picker}
          resolveDelay={300}
          disabled={this.state.isPickerDisabled}
        />
        <label> Click to Add a person </label>
        {controlledItems.map((item, index) => (
          <div key={index}>
            <DefaultButton
              styles={{ root: { height: 'auto' } }}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => {
                this.setState({
                  currentSelectedItems: this.state.currentSelectedItems!.concat([item])
                });
              }}
            >
              <Persona {...item} />
            </DefaultButton>
          </div>
        ))}
      </div>
    );
  }

  private _onItemsChange = (items: any[]): void => {
    this.setState({
      currentSelectedItems: items
    });
  };

  private _onSetFocusButtonClicked = (): void => {
    if (this._picker.current) {
      this._picker.current.focusInput();
    }
  };

  private _renderFooterText = (): JSX.Element => {
    return <div>No additional results</div>;
  };

  private _onRemoveSuggestion = (item: IPersonaProps): void => {
    const { peopleList, mostRecentlyUsed: mruState } = this.state;
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mruState.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mruState
        .slice(0, indexMostRecentlyUsed)
        .concat(mruState.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  };

  private _onItemSelected = (item: IPersonaProps): Promise<IPersonaProps> => {
    const processedItem = { ...item };
    processedItem.text = `${item.text} (selected)`;
    return new Promise<IPersonaProps>((resolve, reject) => setTimeout(() => resolve(processedItem), 250));
  };

  private _onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  private _returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
    return this._filterPromise(mostRecentlyUsed);
  };

  private _returnMostRecentlyUsedWithLimit = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
    mostRecentlyUsed = mostRecentlyUsed.splice(0, 3);
    return this._filterPromise(mostRecentlyUsed);
  };

  private _onFilterChangedWithLimit = (
    filterText: string,
    currentPersonas: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    return this._onFilterChanged(filterText, currentPersonas, 3);
  };

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

  private _toggleDelayResultsChange = (ev: React.MouseEvent<HTMLElement>, toggleState: boolean): void => {
    this.setState({ delayResults: toggleState });
  };

  private _dropDownSelected = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ currentPicker: option.key });
  };

  private _validateInput = (input: string): ValidationState => {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  };

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

  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
  };
}
