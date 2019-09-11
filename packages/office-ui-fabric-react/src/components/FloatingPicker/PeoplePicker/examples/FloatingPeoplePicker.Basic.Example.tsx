import * as React from 'react';

import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import {
  IBaseFloatingPicker,
  IBaseFloatingPickerSuggestionProps,
  FloatingPeoplePicker,
  SuggestionsStore
} from 'office-ui-fabric-react/lib/FloatingPicker';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { people } from '@uifabric/example-data';

export interface IPeoplePickerExampleState {
  peopleList: IPersonaProps[];
  searchValue: string;
}

export class FloatingPeoplePickerTypesExample extends React.Component<{}, IPeoplePickerExampleState> {
  private _picker = React.createRef<IBaseFloatingPicker>();
  private _inputElement: HTMLInputElement;

  constructor(props: {}) {
    super(props);

    this.state = {
      peopleList: people,
      searchValue: ''
    };
  }

  public render(): JSX.Element {
    const suggestionProps: IBaseFloatingPickerSuggestionProps = {
      footerItemsProps: [
        {
          renderItem: () => {
            const picker = this._picker.current;
            return <div>Showing {picker ? picker.suggestions.length : 0} results</div>;
          },
          shouldShow: () => {
            const picker = this._picker.current;
            return !!picker && picker.suggestions.length > 0;
          }
        }
      ]
    };

    return (
      <div>
        <div style={{ width: 208 }} ref={this._setInputElementRef}>
          <SearchBox
            placeholder="Search for person"
            onChange={this._onSearchChange}
            value={this.state.searchValue}
            onFocus={this._onFocus}
          />
        </div>
        <FloatingPeoplePicker
          suggestionsStore={new SuggestionsStore<IPersonaProps>()}
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={suggestionProps}
          key="normal"
          onRemoveSuggestion={this._onRemoveSuggestion}
          onValidateInput={this._validateInput}
          componentRef={this._picker}
          onChange={this._onPickerChange}
          inputElement={this._inputElement}
          resolveDelay={300}
        />
      </div>
    );
  }

  private _onFocus = (): void => {
    if (this._picker.current) {
      this._picker.current.showPicker();
    }
  };

  private _setInputElementRef = (ref: HTMLDivElement | null) => {
    const inputElements = ref && ref.getElementsByClassName('ms-SearchBox-field');
    if (inputElements && inputElements.length > 0) {
      this._inputElement = inputElements[0] as HTMLInputElement;
    }
  };

  private _onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
    if (newValue !== this.state.searchValue && this._picker.current) {
      this.setState({ searchValue: newValue });
      this._picker.current.onQueryStringChanged(newValue);
    }
  };

  private _onPickerChange = (selectedSuggestion: IPersonaProps): void => {
    this.setState({ searchValue: selectedSuggestion.text || '' });
    if (this._picker.current) {
      this._picker.current.hidePicker();
    }
  };

  private _onRemoveSuggestion = (item: IPersonaProps): void => {
    const { peopleList } = this.state;
    const itemIndex = peopleList.indexOf(item);

    if (itemIndex >= 0) {
      this.setState({
        peopleList: peopleList.slice(0, itemIndex).concat(peopleList.slice(itemIndex + 1))
      });
    }
  };

  private _onFilterChanged = (filterText: string, currentPersonas?: IPersonaProps[]): IPersonaProps[] => {
    if (filterText) {
      // Filter by items starting with the current filter text, then remove duplicates
      return this.state.peopleList
        .filter((item: IPersonaProps) => _startsWith(item.text || '', filterText))
        .filter((persona: IPersonaProps) => !this._listContainsPersona(persona, currentPersonas));
    }
    return [];
  };

  private _getTextFromItem = (persona: IPersonaProps): string => {
    return persona.text || '';
  };

  private _listContainsPersona(persona: IPersonaProps, personas?: IPersonaProps[]): boolean {
    return !!personas && personas.some((item: IPersonaProps) => item.text === persona.text);
  }

  private _validateInput = (input: string): boolean => {
    return input.indexOf('@') !== -1;
  };
}

function _startsWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}
