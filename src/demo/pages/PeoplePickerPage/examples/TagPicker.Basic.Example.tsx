import * as React from 'react';
import {
  TagPicker,
  ITagPickerProps
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
        onResolveSuggestions={ this._onResolveSuggestions }
      />
    );
  }

  private _onResolveSuggestions(text) {
    return text && text!=='' ? _testTags.filter(color => color.name.indexOf(text) > -1) : [];
  }
}
