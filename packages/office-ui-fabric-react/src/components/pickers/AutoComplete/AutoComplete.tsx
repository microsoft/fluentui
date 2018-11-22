/* tslint:disable */
import * as React from 'react';
import { css } from '../../../Utilities';
/* tslint:enable */
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.types';
import { SearchBox } from '../../../SearchBox';

export interface ISuggestedItem {
  key: string;
  name: string;
}

export interface IAutoCompleteProps extends IBasePickerProps<ISuggestedItem> {}

export class AutoComplete extends BasePicker<ISuggestedItem, IAutoCompleteProps> {
  protected static defaultProps = {
    onRenderSearchInputTarget: (props: any) => {
      <SearchBox />;
    },
    onRenderSuggestionsItem: (props: ISuggestedItem) => <div className={css('ms-TagItem-TextOverflow')}> {props.name} </div>
  };
}
