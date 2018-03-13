/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  assign,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IBasePickerSuggestionsProps, SuggestionsController } from 'office-ui-fabric-react/lib/Pickers';
import { ExtendedPeoplePicker } from '../PeoplePicker/ExtendedPeoplePicker';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { people, mru, groupOne, groupTwo } from './PeopleExampleData';
import './ExtendedPeoplePicker.Basic.Example.scss';
import { FloatingPeoplePicker, IBaseFloatingPickerProps } from '../../FloatingPicker';
import { IBaseSelectedItemsListProps, ISelectedPeopleProps, SelectedPeopleList, IExtendedPersonaProps }
  from '../../SelectedItemsList';

export interface IPeoplePickerExampleState {
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
}

// tslint:disable-next-line:no-any
export class ExtendedPeoplePickerTypesExample extends BaseComponent<{}, IPeoplePickerExampleState> {
  private _picker: ExtendedPeoplePicker;
  private _floatingPickerProps: IBaseFloatingPickerProps<IPersonaProps>;
  private _selectedItemsListProps: ISelectedPeopleProps;
  private _suggestionProps: IBasePickerSuggestionsProps;

  constructor(props: {}) {
    super(props);
    let peopleList: IPersonaWithMenu[] = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona);
      peopleList.push(target);
    });

    this.state = {
      peopleList: peopleList,
      mostRecentlyUsed: mru,
    };

    this._suggestionProps = {
      suggestionsHeaderText: 'Suggested People',
      mostRecentlyUsedHeaderText: 'Suggested Contacts',
      noResultsFoundText: 'No results found',
      loadingText: 'Loading',
      showRemoveButtons: true,
      suggestionsAvailableAlertText: 'People Picker Suggestions available',
      suggestionsContainerAriaLabel: 'Suggested contacts',
      searchForMoreText: 'Search more',
      forceResolveText: 'Use this name',
    };

    this._floatingPickerProps = {
      suggestionsController: new SuggestionsController<IPersonaProps>(),
      onResolveSuggestions: this._onFilterChanged,
      getTextFromItem: this._getTextFromItem,
      pickerSuggestionsProps: this._suggestionProps,
      key: 'normal',
      onRemoveSuggestion: this._onRemoveSuggestion,
      onValidateInput: this._validateInput,
      onZeroQuerySuggestion: this._returnMostRecentlyUsed,
      showForceResolve: this._shouldShowForceResolve,
    };

    this._selectedItemsListProps = {
      onCopyItems: this._onCopyItems,
      onExpandGroup: this._onExpandItem,
      removeMenuItemText: 'Remove',
      copyMenuItemText: 'Copy name',
      editMenuItemText: 'Edit',
      getEditingItemText: this._getEditingItemText,
      onRenderFloatingPicker: this._onRenderFloatingPicker,
      floatingPickerProps: this._floatingPickerProps,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        { this._renderExtendedPicker() }
        <PrimaryButton
          text='Set focus'
          onClick={ this._onSetFocusButtonClicked }
        />
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <ExtendedPeoplePicker
        floatingPickerProps={ this._floatingPickerProps }
        selectedItemsListProps={ this._selectedItemsListProps }
        onRenderFloatingPicker={ this._onRenderFloatingPicker }
        onRenderSelectedItems={ this._onRenderSelectedItems }
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
        inputProps={ {
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker'
        } }
        componentRef={ this._setComponentRef }
        headerComponent={ this._renderHeader() }
      />
    );
  }

  private _renderHeader(): JSX.Element {
    return <div>TO:</div>;
  }

  private _onRenderFloatingPicker(props: IBaseFloatingPickerProps<IPersonaProps>): JSX.Element {
    return (<FloatingPeoplePicker { ...props } />);
  }

  private _onRenderSelectedItems(props: IBaseSelectedItemsListProps<IExtendedPersonaProps>): JSX.Element {
    return (<SelectedPeopleList { ...props } />);
  }

  private _getEditingItemText(item: IExtendedPersonaProps): string {
    return item.primaryText as string;
  }

  @autobind
  private _setComponentRef(component: ExtendedPeoplePicker): void {
    this._picker = component;
  }

  @autobind
  private _onSetFocusButtonClicked(): void {
    if (this._picker) {
      this._picker.focus();
    }
  }

  @autobind
  private _onExpandItem(item: IExtendedPersonaProps): void {
    // tslint:disable-next-line:no-any
    (this._picker.selectedItemsList as SelectedPeopleList).replaceItem(item, this._getExpandedGroupItems(item as any));
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
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): Promise<IPersonaProps[]> | null {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._convertResultsToPromise(filteredPersonas);
    } else {
      return this._convertResultsToPromise([]);
    }
  }

  @autobind
  private _returnMostRecentlyUsed(currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    let { mostRecentlyUsed } = this.state;
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, this._picker.items);
    return this._convertResultsToPromise(mostRecentlyUsed);
  }

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    let copyText = '';
    items.forEach((item: IExtendedPersonaProps, index: number) => {
      copyText += item.primaryText;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  }

  @autobind
  private _shouldShowForceResolve(): boolean {
    return Boolean(
      this._picker.floatingPicker &&
      this._validateInput(this._picker.floatingPicker.inputText) &&
      this._picker.floatingPicker.suggestions.length === 0
    );
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]): boolean {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter((item: IPersonaProps) => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter((item: IPersonaProps) => this._doesTextStartWith(item.primaryText as string, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]): IPersonaProps[] {
    return personas.filter((persona: IPersonaProps) => !this._listContainsPersona(persona, possibleDupes));
  }

  private _getTextFromItem(persona: IPersonaProps): string {
    return persona.primaryText as string;
  }

  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    // tslint:disable-next-line:no-any
    return new Promise<IPersonaProps[]>((resolve: any, reject: any) => setTimeout(() => resolve(results), 150));
  }

  @autobind
  private _validateInput(input: string): boolean {
    if (input.indexOf('@') !== -1) {
      return true;
    } else if (input.length > 1) {
      return false;
    } else {
      return false;
    }
  }

  private _getExpandedGroupItems(item: IExtendedPersonaProps): IExtendedPersonaProps[] {
    switch (item.primaryText) {
      case 'Group One':
        return groupOne;
      case 'Group Two':
        return groupTwo;
      default:
        return [];
    }
  }
}
