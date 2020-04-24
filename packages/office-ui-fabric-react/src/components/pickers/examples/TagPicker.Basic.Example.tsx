import * as React from 'react';

import { TagPicker, IBasePicker, ITag } from 'office-ui-fabric-react/lib/Pickers';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

const _testTags: ITag[] = [
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
  'yellow',
].map(item => ({ key: item, name: item }));

export interface ITagPickerDemoPageState {
  isPickerDisabled?: boolean;
}

export class TagPickerBasicExample extends React.Component<{}, ITagPickerDemoPageState> {
  // All pickers extend from BasePicker specifying the item type.
  private _picker = React.createRef<IBasePicker<ITag>>();

  constructor(props: {}) {
    super(props);
    this.state = {
      isPickerDisabled: false,
    };
  }

  public render() {
    return (
      <div className={rootClass}>
        <Checkbox
          styles={checkboxStyles}
          label="Disable Tag Picker"
          checked={this.state.isPickerDisabled}
          onChange={this._onDisabledButtonClick}
        />
        Filter items in suggestions: This picker will filter added items from the search suggestions.
        <TagPicker
          removeButtonAriaLabel="Remove"
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found',
          }}
          itemLimit={2}
          disabled={this.state.isPickerDisabled}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            'aria-label': 'Tag Picker',
          }}
        />
        <br />
        Filter items on selected: This picker will show already-added suggestions but will not add duplicate tags.
        <TagPicker
          removeButtonAriaLabel="Remove"
          componentRef={this._picker}
          onResolveSuggestions={this._onFilterChangedNoFilter}
          onItemSelected={this._onItemSelected}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found',
          }}
          itemLimit={2}
          disabled={this.state.isPickerDisabled}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            'aria-label': 'Tag Picker',
          }}
        />
      </div>
    );
  }

  private _getTextFromItem(item: ITag): string {
    return item.name;
  }

  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled,
    });
  };

  private _onFilterChanged = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];
  };

  private _onFilterChangedNoFilter = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText ? _testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  };

  private _onItemSelected = (item: ITag): ITag | null => {
    if (this._picker.current && this._listContainsDocument(item, this._picker.current.items)) {
      return null;
    }
    return item;
  };

  private _listContainsDocument(tag: ITag, tagList?: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}
