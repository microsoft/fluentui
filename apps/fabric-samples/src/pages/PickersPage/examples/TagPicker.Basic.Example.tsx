import * as React from 'react';
import {
  TagPicker
} from '../../../../components/pickers/TagPicker/TagPicker';

let _testTags = [
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

export class TagPickerBasicExample extends React.Component<{}, {}> {

  public render() {
    return (
      <TagPicker
        onResolveSuggestions={ this._onFilterChanged.bind(this) }
        getTextFromItem= {(item: any) => { return item.name; } }
        pickerSuggestionsProps={
          {
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }
        }
        />
    );
  }

  private _onFilterChanged(filterText: string, tagList: { key: string, name: string }[]) {
    return filterText ? _testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsDocument(item, tagList)) : [];
  }

  private _listContainsDocument(tag: { key: string, name: string }, tagList: { key: string, name: string }[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}
