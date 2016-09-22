/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.Props';
import { TagItem } from './TagItem';

export interface ITag {
  key: string;
  name: string;
}

export interface ITagPickerProps extends IBasePickerProps<ITag> {
}

export class TagPicker extends BasePicker<ITag, ITagPickerProps> {
  protected static defaultProps = {
    onRenderItem: (props) => { return <TagItem { ...props }>{ props.item.name }</TagItem>; },
    onRenderSuggestionsItem: (props: ITag) => <div> {props.name} </div>
  };
}
