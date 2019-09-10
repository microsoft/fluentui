import * as React from 'react';

import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ExtendedPeoplePicker } from 'office-ui-fabric-react/lib/ExtendedPicker';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
  SuggestionsStore,
  FloatingPeoplePicker,
  IBaseFloatingPickerProps,
  IBaseFloatingPickerSuggestionProps
} from 'office-ui-fabric-react/lib/FloatingPicker';
import { ISelectedPeopleProps, SelectedPeopleList, IExtendedPersonaProps } from 'office-ui-fabric-react/lib/SelectedItemsList';
import { IFocusZoneProps, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { mergeStyleSets, getTheme, IStyle, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { people, mru, groupOne, groupTwo } from '@uifabric/example-data';

export interface IPeoplePickerExampleState {
  peopleList: IPersonaProps[];
  mostRecentlyUsed: IPersonaProps[];
  searchMoreAvailable: boolean;
  currentlySelectedItems: IExtendedPersonaProps[];
  suggestionItems: IPersonaProps[];
}

interface IClassNames {
  picker: IStyle;
  headerItem: IStyle;
  footerItem: IStyle;
  to: IStyle;
}

export class ExtendedPeoplePickerControlledExample extends React.Component<{}, IPeoplePickerExampleState> {
  private _picker = React.createRef<ExtendedPeoplePicker>();
  private _floatingPickerProps: IBaseFloatingPickerProps<IPersonaProps>;
  private _selectedItemsListProps: ISelectedPeopleProps;
  private _focusZoneProps: IFocusZoneProps;
  private _suggestionProps: IBaseFloatingPickerSuggestionProps;
  private _classNames: IProcessedStyleSet<IClassNames>;

  constructor(props: {}) {
    super(props);

    this.state = {
      peopleList: people,
      mostRecentlyUsed: mru,
      searchMoreAvailable: true,
      currentlySelectedItems: [],
      suggestionItems: []
    };

    this._suggestionProps = {
      showRemoveButtons: true,
      headerItemsProps: [
        {
          renderItem: () => {
            const picker = this._picker.current;
            return (
              <div className={this._classNames.headerItem}>
                Use this address: {picker && picker.inputElement ? picker.inputElement.value : ''}
              </div>
            );
          },
          shouldShow: () => {
            const picker = this._picker.current;
            return !!(picker && picker.inputElement) && picker.inputElement.value.indexOf('@') > -1;
          },
          onExecute: () => {
            const picker = this._picker.current;
            const floatingPicker = picker && picker.floatingPicker.current;
            if (floatingPicker) {
              floatingPicker.forceResolveSuggestion();
            }
          },
          ariaLabel: 'Use the typed address'
        },
        {
          renderItem: () => {
            return <div className={this._classNames.headerItem}>Suggested Contacts</div>;
          },
          shouldShow: this._shouldShowSuggestedContacts
        }
      ],
      footerItemsProps: [
        {
          renderItem: () => {
            return <div className={this._classNames.footerItem}>No results</div>;
          },
          shouldShow: () => {
            const picker = this._picker.current;
            const floatingPicker = picker && picker.floatingPicker.current;
            return !!floatingPicker && floatingPicker.suggestions.length === 0;
          }
        },
        {
          renderItem: () => {
            return <div className={this._classNames.footerItem}>Search for more</div>;
          },
          onExecute: () => {
            this.setState({ searchMoreAvailable: false });
          },
          shouldShow: () => {
            return this.state.searchMoreAvailable && !this._shouldShowSuggestedContacts();
          },
          ariaLabel: 'Search more'
        }
      ],
      shouldSelectFirstItem: () => {
        return !this._shouldShowSuggestedContacts();
      }
    };

    this._floatingPickerProps = {
      suggestionsStore: new SuggestionsStore<IPersonaProps>(),
      onResolveSuggestions: this._onFilterChanged,
      getTextFromItem: (persona: IPersonaProps) => persona.text || '',
      pickerSuggestionsProps: this._suggestionProps,
      key: 'normal',
      onRemoveSuggestion: this._onRemoveSuggestion,
      onValidateInput: this._validateInput,
      onZeroQuerySuggestion: this._returnMostRecentlyUsed,
      showForceResolve: this._shouldShowForceResolve,
      onInputChanged: this._onInputChanged,
      onSuggestionsHidden: () => {
        console.log('FLOATINGPICKER: hidden');
      },
      onSuggestionsShown: () => {
        console.log('FLOATINGPICKER: shown');
      }
    };

    this._selectedItemsListProps = {
      onCopyItems: this._onCopyItems,
      onExpandGroup: this._onExpandItem,
      removeMenuItemText: 'Remove',
      copyMenuItemText: 'Copy name',
      editMenuItemText: 'Edit',
      getEditingItemText: this._getEditingItemText,
      onRenderFloatingPicker: FloatingPeoplePicker,
      floatingPickerProps: this._floatingPickerProps
    };

    this._focusZoneProps = {
      shouldInputLoseFocusOnArrowKey: () => true,
      handleTabKey: FocusZoneTabbableElements.all
    };
  }

  public render(): JSX.Element {
    const theme = getTheme();
    this._classNames = mergeStyleSets({
      picker: { maxWidth: 400, marginBottom: 15 },
      headerItem: {
        borderBottom: '1px solid ' + theme.palette.neutralLight,
        padding: '8px 12px'
      },
      footerItem: {
        borderBottom: '1px solid ' + theme.palette.neutralLight,
        height: 60,
        paddingLeft: 12
      },
      to: { padding: '0 10px' }
    });

    return (
      <div>
        {this._renderExtendedPicker()}
        <PrimaryButton text="Set focus" onClick={this._onSetFocusButtonClicked} />
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <ExtendedPeoplePicker
        selectedItems={this.state.currentlySelectedItems}
        suggestionItems={this.state.suggestionItems}
        onItemAdded={this._onItemAdded}
        onItemsRemoved={this._onItemsRemoved}
        floatingPickerProps={this._floatingPickerProps}
        selectedItemsListProps={this._selectedItemsListProps}
        onRenderFloatingPicker={FloatingPeoplePicker}
        onRenderSelectedItems={SelectedPeopleList}
        className={this._classNames.picker}
        key="normal"
        inputProps={{
          onBlur: () => console.log('onBlur called'),
          onFocus: () => console.log('onFocus called'),
          'aria-label': 'People Picker'
        }}
        componentRef={this._picker}
        headerComponent={this._renderHeader()}
        focusZoneProps={this._focusZoneProps}
      />
    );
  }

  private _renderHeader(): JSX.Element {
    return (
      <div className={this._classNames.to} data-is-focusable={true}>
        To:
      </div>
    );
  }

  private _getEditingItemText = (item: IExtendedPersonaProps): string => {
    return item.text || '';
  };

  private _onSetFocusButtonClicked = (): void => {
    if (this._picker.current) {
      this._picker.current.focus();
    }
  };

  private _onExpandItem = (item: IExtendedPersonaProps): void => {
    const { currentlySelectedItems } = this.state;
    const indexToRemove = currentlySelectedItems.indexOf(item);
    const newItems = currentlySelectedItems;
    newItems.splice(indexToRemove, 1, ...this._getExpandedGroupItems(item));
    this.setState({ currentlySelectedItems: newItems });
  };

  private _onRemoveSuggestion = (item: IPersonaProps): void => {
    const { peopleList, mostRecentlyUsed: mruState } = this.state;
    const itemIndex = peopleList.indexOf(item);
    const itemMruIndex = mruState.indexOf(item);

    const stateUpdate = {} as IPeoplePickerExampleState;
    if (itemIndex >= 0) {
      stateUpdate.peopleList = peopleList.slice(0, itemIndex).concat(peopleList.slice(itemIndex + 1));
    }
    if (itemMruIndex >= 0) {
      stateUpdate.mostRecentlyUsed = mruState.slice(0, itemMruIndex).concat(mruState.slice(itemMruIndex + 1));
    }
    this.setState(stateUpdate);
  };

  private _onFilterChanged = (filterText: string, currentPersonas?: IPersonaProps[]): Promise<IPersonaProps[]> | null => {
    let filteredPersonas: IPersonaProps[] = [];
    if (filterText) {
      filteredPersonas = this.state.peopleList.filter((item: IPersonaProps) => _startsWith(item.text || '', filterText));
      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
    }

    this.setState({ suggestionItems: filteredPersonas });
    return null;
  };

  private _returnMostRecentlyUsed = (): IPersonaProps[] | Promise<IPersonaProps[]> | null => {
    let { mostRecentlyUsed } = this.state;
    const items = (this._picker.current && this._picker.current.items) || [];
    mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, items);
    this.setState({ suggestionItems: mostRecentlyUsed });
    return null;
  };

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    return items.map(item => item.text).join(', ');
  }

  private _shouldShowForceResolve = (): boolean => {
    const picker = this._picker.current;
    const floatingPicker = picker && picker.floatingPicker.current;
    return !!floatingPicker && this._validateInput(floatingPicker.inputText) && floatingPicker.suggestions.length === 0;
  };

  private _shouldShowSuggestedContacts = (): boolean => {
    const picker = this._picker.current;
    return !!(picker && picker.inputElement) && picker.inputElement.value === '';
  };

  private _listContainsPersona(persona: IPersonaProps, personas?: IPersonaProps[]): boolean {
    return !!personas && personas.some((item: IPersonaProps) => item.text === persona.text);
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes?: IPersonaProps[]): IPersonaProps[] {
    return personas.filter((persona: IPersonaProps) => !this._listContainsPersona(persona, possibleDupes));
  }

  private _onInputChanged = (): void => {
    this.setState({ searchMoreAvailable: true });
  };

  private _onItemAdded = (selectedSuggestion: IExtendedPersonaProps) => {
    this.setState({ currentlySelectedItems: this.state.currentlySelectedItems.concat(selectedSuggestion) });
  };

  private _onItemsRemoved = (items: IExtendedPersonaProps[]): void => {
    const newItems = this.state.currentlySelectedItems.filter(value => items.indexOf(value) === -1);
    this.setState({ currentlySelectedItems: newItems });
  };

  private _validateInput = (input: string): boolean => {
    return input.indexOf('@') !== -1;
  };

  private _getExpandedGroupItems(item: IExtendedPersonaProps): IExtendedPersonaProps[] {
    return item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
  }
}

function _startsWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}
