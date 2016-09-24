import * as React from 'react';
import {
  ListPeoplePicker,
  NormalPeoplePicker,
  CompactPeoplePicker,
  IContextualMenuItem,
  Dropdown,
  IDropdownOption,
  IPersonaProps,
  IBasePickerSuggestionsProps
} from '../../../../index';
import { IPersonaWithMenu } from '../../../../components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { people } from './PeoplePickerExampleData';
import { assign } from '../../../../utilities/object';
import './PeoplePicker.Types.Example.scss';

export interface IPeoplePickerExampleState {
  currentPicker: number | string;
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found'
};

export class PeoplePickerTypesExample extends React.Component<any, IPeoplePickerExampleState> {
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
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._peopleList = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona, { menuItems: this.contextualMenuItems });
      this._peopleList.push(target);
    });

    this.state = { currentPicker: 1 };
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
            onChanged={ this._dropDownSelected.bind(this) }
            />
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
        onResolveSuggestions={ this._filterWithLimit.bind(this) }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        className={ 'ms-PeoplePicker' }
        onGetMoreResults={ this._onFilterChanged }
        pickerSuggestionsProps={ limitedSearchSuggestionProps }
        />
    );
  }

  private _onFilterChanged(filterText: string, items: IPersonaProps[]) {
    return filterText ? this._peopleList.filter(item => item.primaryText.toLowerCase().indexOf(filterText.toLowerCase() ) === 0).filter(item => !this._listContainsPersona(item, items)) : [];
  }

  private _listContainsPersona(persona: IPersonaProps, items: IPersonaProps[]) {
    if (!items || !items.length || items.length === 0) {
      return false;
    }
    return items.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterWithLimit(filterText: string, currentItems: IPersonaProps[]) {
    return filterText ? this._onFilterChanged(filterText, currentItems).splice(0, 2) : [];
  }

  private _dropDownSelected(option: IDropdownOption) {
    this.setState({ currentPicker: option.key });
  }

}
