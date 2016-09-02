/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePickerProps';
import { TagItem } from './TagItem';

export interface ITag {
  key: string;
  name: string;
}

export class TagPicker extends BasePicker<ITag, IBasePickerProps<ITag>> {
  protected static defaultProps = {
    onRenderItem:  (props) => { return <TagItem { ...props }>{ props.item.name }</TagItem>; },
    onRenderSuggestion: (props: ITag) => <div> {props.name} </div>
  };
}
