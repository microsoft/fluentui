import * as React from 'react';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import {
  IBaseFloatingPicker,
  IBaseFloatingPickerSuggestionProps,
  FloatingPeoplePicker,
  SuggestionsStore,
} from 'office-ui-fabric-react/lib/FloatingPicker';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { people } from '@uifabric/example-data';

let inputElement: HTMLInputElement;
const suggestionsStore = new SuggestionsStore<IPersonaProps>();
const searchBoxWrapperStyling = { width: 208 };
const getTextFromItem = (persona: IPersonaProps): string => {
  return persona.text || '';
};
const listContainsPersona = (persona: IPersonaProps, personas?: IPersonaProps[]): boolean => {
  return !!personas && personas.some((item: IPersonaProps) => item.text === persona.text);
};
const validateInput = (input: string): boolean => {
  return input.indexOf('@') !== -1;
};
const startsWith = (text: string, filterText: string): boolean => {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
};
const setInputElementRef = (ref: HTMLDivElement | null) => {
  const inputElements = ref && ref.getElementsByClassName('ms-SearchBox-field');
  if (inputElements && inputElements.length > 0) {
    inputElement = inputElements[0] as HTMLInputElement;
  }
};

export const FloatingPeoplePickerTypesExample: React.FunctionComponent = () => {
  const [peopleList, setPeopleList] = React.useState(people);
  const [searchValue, setSearchValue] = React.useState('');
  const picker = React.useRef<IBaseFloatingPicker>(null);

  const onFocus = (): void => {
    if (picker.current) {
      picker.current.showPicker();
    }
  };
  const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
    if (newValue !== searchValue && picker.current) {
      setSearchValue(newValue);
      picker.current.onQueryStringChanged(newValue);
    }
  };
  const onPickerChange = (selectedSuggestion: IPersonaProps): void => {
    setSearchValue(selectedSuggestion.text || '');
    if (picker.current) {
      picker.current.hidePicker();
    }
  };
  const onRemoveSuggestion = (item: any): void => {
    const itemIndex = peopleList.indexOf(item);
    if (itemIndex >= 0) {
      setPeopleList(peopleList.slice(0, itemIndex).concat(peopleList.slice(itemIndex + 1)));
    }
  };
  const suggestionProps: IBaseFloatingPickerSuggestionProps = {
    footerItemsProps: [
      {
        renderItem: () => {
          return <>Showing {picker.current ? picker.current.suggestions.length : 0} results</>;
        },
        shouldShow: () => {
          return !!picker.current && picker.current.suggestions.length > 0;
        },
      },
    ],
  };
  const onFilterChanged = (filterText: string, currentPersonas?: IPersonaProps[]): IPersonaProps[] => {
    if (filterText) {
      // Filter by items starting with the current filter text, then remove duplicates
      return peopleList
        .filter((item: IPersonaProps) => startsWith(item.text || '', filterText))
        .filter((persona: IPersonaProps) => !listContainsPersona(persona, currentPersonas));
    }
    return [];
  };
  return (
    <>
      <div style={searchBoxWrapperStyling} ref={setInputElementRef}>
        <SearchBox placeholder="Search for person" onChange={onSearchChange} value={searchValue} onFocus={onFocus} />
      </div>
      <FloatingPeoplePicker
        suggestionsStore={suggestionsStore}
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        key="normal"
        onRemoveSuggestion={onRemoveSuggestion}
        onValidateInput={validateInput}
        componentRef={picker}
        onChange={onPickerChange}
        inputElement={inputElement}
        resolveDelay={300}
      />
    </>
  );
};
