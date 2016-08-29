import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePickerProps';
import { TagItem } from './TagItem';

export interface ITag {
  key: string;
  name: string;
}

export interface ITagPickerProps extends IBasePickerProps<ITag> {
}

export class TagPicker extends BasePicker<ITag, ITagPickerProps> {
  static defaultProps = {
    onRenderItem: (props) => <TagItem { ...props }>{ props.item.name }</TagItem>,
    onRenderSuggestion:  (props: ITag) => <div> {props.name} </div>
  }
}
