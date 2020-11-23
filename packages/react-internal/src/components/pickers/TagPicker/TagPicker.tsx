import * as React from 'react';
import { styled, initializeComponentRef } from '../../../Utilities';
import { BasePicker } from '../BasePicker';
import { IBasePickerStyleProps, IBasePickerStyles } from '../BasePicker.types';
import { getStyles } from '../BasePicker.styles';
import { TagItem } from './TagItem';
import { TagItemSuggestion } from './TagItemSuggestion';
import { ITagPickerProps, ITag, ITagItemProps } from './TagPicker.types';

/**
 * {@docCategory TagPicker}
 */
export class TagPickerBase extends BasePicker<ITag, ITagPickerProps> {
  public static defaultProps = {
    onRenderItem: (props: ITagItemProps) => <TagItem {...props}>{props.item.name}</TagItem>,
    onRenderSuggestionsItem: (props: ITag) => <TagItemSuggestion>{props.name}</TagItemSuggestion>,
  };

  constructor(props: ITagPickerProps) {
    super(props);
    initializeComponentRef(this);
  }
}

export const TagPicker = styled<ITagPickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  TagPickerBase,
  getStyles,
  undefined,
  {
    scope: 'TagPicker',
  },
);
