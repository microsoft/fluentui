/* tslint:disable */
import * as React from 'react';
import { css } from '../../../Utilities';
/* tslint:enable */
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.types';
import { TagItem, ITagItemProps } from './TagItem';
import * as stylesImport from './TagItem.scss';
const styles: any = stylesImport;

export interface ITag {
  key: string;
  name: string;
}

export interface ITagPickerProps extends IBasePickerProps<ITag> {}

export class TagPicker extends BasePicker<ITag, ITagPickerProps> {
  protected static defaultProps = {
    onRenderItem: (props: ITagItemProps) => {
      return <TagItem {...props}>{props.item.name}</TagItem>;
    },
    onRenderSuggestionsItem: (props: ITag) => (
      <div className={css('ms-TagItem-TextOverflow', styles.tagItemTextOverflow)}> {props.name} </div>
    )
  };
}
