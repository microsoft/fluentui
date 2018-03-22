import * as React from 'react';
import {
  BaseComponent
} from '../../../Utilities';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITagPickerDemoPageState } from 'office-ui-fabric-react/lib/components/pickers/examples/ITagPickerDemoPageState';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const _testTags = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow'
].map(item => ({ key: item, name: item }));

export class TagPickerBasicExample extends BaseComponent<{}, ITagPickerDemoPageState> {
  private _picker: TagPicker;

  constructor(props: {}) {
    super(props);
    this.state = {
      isPickerDisabled: false
    };
  }

  public render() {
    return (
      <div>
        <Checkbox
          className={ exampleStyles.exampleCheckbox }
          label='Disable Tag Picker'
          checked={ this.state.isPickerDisabled }
          onChange={ this._onDisabledButtonClick }
        />
        Filter items in suggestions: This picker will filter added items from the search suggestions.
        <TagPicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ this._getTextFromItem }
          pickerSuggestionsProps={
            {
              suggestionsHeaderText: 'Suggested Tags',
              noResultsFoundText: 'No Color Tags Found'
            }
          }
          itemLimit={ 2 }
          disabled={ this.state.isPickerDisabled }
          inputProps={ {
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            'aria-label': 'Tag Picker'
          } }
        />
        <br />
        Filter items on selected: This picker will show already-added suggestions but will not add duplicate tags.
        <TagPicker
          componentRef={ this._resolveRef('_picker') }
          onResolveSuggestions={ this._onFilterChangedNoFilter }
          onItemSelected={ this._onItemSelected }
          getTextFromItem={ this._getTextFromItem }
          pickerSuggestionsProps={
            {
              suggestionsHeaderText: 'Suggested Tags',
              noResultsFoundText: 'No Color Tags Found'
            }
          }
          itemLimit={ 2 }
          disabled={ this.state.isPickerDisabled }
          inputProps={ {
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            'aria-label': 'Tag Picker'
          } }
        />
      </div>
    );
  }

  private _getTextFromItem(item: any): any {
    return item.name;
  }

  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
  }

  private _onFilterChanged = (filterText: string, tagList: { key: string, name: string }[]): { key: string, name: string }[] => {
    return filterText ? _testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
      .filter(tag => !this._listContainsDocument(tag, tagList)) : [];
  }

  private _onFilterChangedNoFilter = (filterText: string, tagList: { key: string, name: string }[]): { key: string, name: string }[] => {
    return filterText ? _testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  }

  private _onItemSelected = (item: { key: string, name: string }): { key: string, name: string } | null => {
    if (this._listContainsDocument(item, this._picker.items)) {
      return null;
    }
    return item;
  }

  private _listContainsDocument(tag: { key: string, name: string }, tagList: { key: string, name: string }[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}
