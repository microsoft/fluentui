import * as React from 'react';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITagPickerDemoPageState } from 'office-ui-fabric-react/lib/components/pickers/examples/ITagPickerDemoPageState';

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

export class TagPickerBasicExample extends React.Component<{}, ITagPickerDemoPageState> {
  constructor() {
    super();
    this.state = {
      isPickerDisabled: false
    };
  }

  public render() {
    return (
      <div>
        <Checkbox label='Disable Tag Picker' checked={ this.state.isPickerDisabled } onChange={ this._onDisabledButtonClick.bind(this) } />
        <TagPicker ref='tagPicker'
          onResolveSuggestions={ this._onFilterChanged.bind(this) }
          getTextFromItem={ (item: any) => { return item.name; } }
          pickerSuggestionsProps={
            {
              suggestionsHeaderText: 'Suggested Tags',
              noResultsFoundText: 'No Color Tags Found'
            }
          }
          disabled={ this.state.isPickerDisabled }
        />
      </div>
    );
  }

  private _onDisabledButtonClick(): void {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
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
