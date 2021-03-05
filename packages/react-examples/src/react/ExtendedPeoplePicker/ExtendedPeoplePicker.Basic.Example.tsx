import * as React from 'react';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { ExtendedPeoplePicker } from '@fluentui/react/lib/ExtendedPicker';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { SuggestionsStore, FloatingPeoplePicker } from '@fluentui/react/lib/FloatingPicker';
import { SelectedPeopleList, IExtendedPersonaProps } from '@fluentui/react/lib/SelectedItemsList';
import { FocusZoneTabbableElements } from '@fluentui/react/lib/FocusZone';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';
import { people, mru, groupOne, groupTwo } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';

const theme = getTheme();

const startsWith = (text: string, filterText: string): boolean => {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
};

const classNames = mergeStyleSets({
  picker: { maxWidth: 400, marginBottom: 15 },
  headerItem: {
    borderBottom: '1px solid ' + theme.palette.neutralLight,
    padding: '8px 12px',
  },
  footerItem: {
    borderBottom: '1px solid ' + theme.palette.neutralLight,
    height: 60,
    paddingLeft: 12,
  },
  to: { padding: '0 10px' },
});

const focusZoneProps = {
  shouldInputLoseFocusOnArrowKey: () => true,
  handleTabKey: FocusZoneTabbableElements.all,
};

export const ExtendedPeoplePickerBasicExample: React.FunctionComponent = () => {
  const picker = React.useRef<ExtendedPeoplePicker>(null);
  const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>(people);
  const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>(mru);
  const [searchMoreAvailable, setSearchMoreAvailable] = React.useState<boolean>(true);

  const getEditingItemText = (item: IExtendedPersonaProps): string => {
    return item.text as string;
  };

  const onSetFocusButtonClicked = React.useCallback((): void => {
    picker.current?.focus();
  }, []);

  const onExpandItem = (item: IExtendedPersonaProps): void => {
    const selectedItemsList = picker.current?.selectedItemsList.current;
    if (selectedItemsList) {
      (selectedItemsList as SelectedPeopleList).replaceItem(item, getExpandedGroupItems(item));
    }
  };

  const onRemoveSuggestion = (item: IPersonaProps): void => {
    const itemIndex = peopleList.indexOf(item);
    const itemMruIndex = mostRecentlyUsed.indexOf(item);
    if (itemIndex >= 0) {
      setPeopleList(peopleList.slice(0, itemIndex).concat(peopleList.slice(itemIndex + 1)));
    }
    if (itemMruIndex >= 0) {
      setMostRecentlyUsed(mostRecentlyUsed.slice(0, itemMruIndex).concat(mostRecentlyUsed.slice(itemMruIndex + 1)));
    }
  };

  const onFilterChanged = (filterText: string, currentPersonas?: IPersonaProps[]): Promise<IPersonaProps[]> | null => {
    let filteredPersonas: IPersonaProps[] = [];
    if (filterText) {
      filteredPersonas = peopleList.filter((item: IPersonaProps) => startsWith(item.text || '', filterText));
      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
    }
    return convertResultsToPromise(filteredPersonas);
  };

  const returnMostRecentlyUsed = (): IPersonaProps[] | Promise<IPersonaProps[]> | null => {
    let currentMostRecentlyUsed = mostRecentlyUsed;
    const items = picker.current?.items || [];
    currentMostRecentlyUsed = removeDuplicates(currentMostRecentlyUsed, items);
    return convertResultsToPromise(currentMostRecentlyUsed);
  };

  const onCopyItems = (items: IExtendedPersonaProps[]): string => {
    return items.map(item => item.text).join(', ');
  };

  const shouldShowForceResolve = (): boolean => {
    const floatingPicker = picker.current?.floatingPicker.current;
    return !!floatingPicker && validateInput(floatingPicker.inputText) && floatingPicker.suggestions.length === 0;
  };

  const shouldShowSuggestedContacts = (): boolean => {
    return picker.current?.inputElement?.value === '';
  };

  const listContainsPersona = (persona: IPersonaProps, personas?: IPersonaProps[]): boolean => {
    return !!personas && personas.some((item: IPersonaProps) => item.text === persona.text);
  };

  const removeDuplicates = (personas: IPersonaProps[], possibleDupes?: IPersonaProps[]): IPersonaProps[] => {
    return personas.filter((persona: IPersonaProps) => !listContainsPersona(persona, possibleDupes));
  };

  const onInputChanged = (): void => {
    setSearchMoreAvailable(true);
  };

  const convertResultsToPromise = (results: IPersonaProps[]): Promise<IPersonaProps[]> => {
    return new Promise<IPersonaProps[]>(resolve => setTimeout(() => resolve(results), 150));
  };

  const validateInput = (input: string): boolean => {
    return input.indexOf('@') !== -1;
  };

  const getExpandedGroupItems = (item: IExtendedPersonaProps): IExtendedPersonaProps[] => {
    return item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
  };

  const suggestionProps = useConst({
    showRemoveButtons: true,
    headerItemsProps: [
      {
        renderItem: () => {
          return (
            <div className={classNames.headerItem}>Use this address: {picker.current?.inputElement?.value || ''}</div>
          );
        },
        shouldShow: () => {
          return !!picker.current?.inputElement && picker.current.inputElement.value.indexOf('@') > -1;
        },
        onExecute: () => {
          const floatingPicker = picker.current?.floatingPicker.current;
          if (floatingPicker) {
            floatingPicker.forceResolveSuggestion();
          }
        },
        ariaLabel: 'Use the typed address',
      },
      {
        renderItem: () => {
          return <div className={classNames.headerItem}>Suggested Contacts</div>;
        },
        shouldShow: shouldShowSuggestedContacts,
      },
    ],
    footerItemsProps: [
      {
        renderItem: () => {
          return <div className={classNames.footerItem}>No results</div>;
        },
        shouldShow: () => {
          const floatingPicker = picker.current?.floatingPicker.current;
          return !!floatingPicker && floatingPicker.suggestions.length === 0;
        },
      },
      {
        renderItem: () => {
          return <div className={classNames.footerItem}>Search for more</div>;
        },
        onExecute: () => {
          setSearchMoreAvailable(false);
        },
        shouldShow: () => {
          return searchMoreAvailable && !shouldShowSuggestedContacts();
        },
        ariaLabel: 'Search more',
      },
    ],
    shouldSelectFirstItem: () => {
      return !shouldShowSuggestedContacts();
    },
  });

  const floatingPickerProps = {
    suggestionsStore: new SuggestionsStore<IPersonaProps>(),
    onResolveSuggestions: onFilterChanged,
    getTextFromItem: (persona: IPersonaProps) => persona.text || '',
    pickerSuggestionsProps: suggestionProps,
    key: 'normal',
    onRemoveSuggestion: onRemoveSuggestion,
    onValidateInput: validateInput,
    onZeroQuerySuggestion: returnMostRecentlyUsed,
    showForceResolve: shouldShowForceResolve,
    onInputChanged: onInputChanged,
    onSuggestionsHidden: () => {
      console.log('FloatingPicker: hidden');
    },
    onSuggestionsShown: () => {
      console.log('FloatingPicker: shown');
    },
  };

  const selectedItemsListProps = {
    onCopyItems: onCopyItems,
    onExpandGroup: onExpandItem,
    removeMenuItemText: 'Remove',
    copyMenuItemText: 'Copy name',
    editMenuItemText: 'Edit',
    getEditingItemText: getEditingItemText,
    onRenderFloatingPicker: FloatingPeoplePicker,
    floatingPickerProps: floatingPickerProps,
  };

  return (
    <div>
      <ExtendedPeoplePicker
        floatingPickerProps={floatingPickerProps}
        selectedItemsListProps={selectedItemsListProps}
        onRenderFloatingPicker={FloatingPeoplePicker}
        onRenderSelectedItems={SelectedPeopleList}
        className={classNames.picker}
        key="normal"
        inputProps={{
          onBlur: () => console.log('onBlur called'),
          onFocus: () => console.log('onFocus called'),
          'aria-label': 'People Picker',
        }}
        componentRef={picker}
        headerComponent={
          <div className={classNames.to} data-is-focusable>
            To:
          </div>
        }
        focusZoneProps={focusZoneProps}
      />
      <PrimaryButton text="Set focus" onClick={onSetFocusButtonClicked} />
    </div>
  );
};
