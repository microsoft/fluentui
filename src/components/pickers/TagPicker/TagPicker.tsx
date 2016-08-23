import * as React from 'react';
import { BasePicker, IBasePickerProps } from '../BasePicker';
import { TagSuggestions } from './TagSuggestions';
import { TagItem } from './TagItem';

export interface ITag {
  key: string;
  name: string;
}

export interface ITagPickerProps {
  onResolveSuggestions?: (text?: string, selectedItems?: ITag[]) => ITag[];
}

export class TagPicker extends React.Component<ITagPickerProps, {}> {
  render() {
    let { onResolveSuggestions } = this.props;

    return (
      <BasePicker
        onRenderItem={ props => <TagItem { ...props }>{ props.item.name }</TagItem> }
        onRenderSuggestions={ props => <TagSuggestions { ...props } onResolveSuggestions={ onResolveSuggestions } /> }
      />
    );
  }
}
