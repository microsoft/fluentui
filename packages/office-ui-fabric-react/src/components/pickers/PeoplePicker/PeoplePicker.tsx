import * as React from 'react';

import { getRTL, getInitials, styled } from '../../../Utilities';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import {
  IBasePickerProps,
  IBasePickerSuggestionsProps,
  ValidationState,
  IBasePickerStyleProps,
  IBasePickerStyles
} from '../BasePicker.types';
import { PeoplePickerItem } from './PeoplePickerItems/PeoplePickerItem';
import { IPersonaProps } from '../../../Persona';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { IPeoplePickerItemProps } from './PeoplePickerItems/PeoplePickerItem.types';
import { getStyles } from '../BasePicker.styles';
import { PeoplePickerItemWithMenu } from './PeoplePickerItems/PeoplePickerItemWithMenu';

export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {}

export class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {}

export class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {}

/**
 * Standard People Picker.
 */
export class NormalPeoplePickerBase extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <PeoplePickerItemWithMenu {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

/**
 * Compact layout. It uses small personas when displaying search results.
 */
export class CompactPeoplePickerBase extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <PeoplePickerItem {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemSmall({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

/**
 * MemberList layout. The selected people show up below the search box.
 */
export class ListPeoplePickerBase extends MemberListPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <PeoplePickerItem {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

export interface IGenericItem {
  primaryText: string;
  imageInitials: string;
  ValidationState: ValidationState;
}

export function createGenericItem(name: string, currentValidationState: ValidationState): IGenericItem & { key: React.Key } {
  const personaToConvert = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    ValidationState: currentValidationState
  };

  if (currentValidationState !== ValidationState.warning) {
    personaToConvert.imageInitials = getInitials(name, getRTL());
  }

  return personaToConvert;
}

export const NormalPeoplePicker = styled<IPeoplePickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  NormalPeoplePickerBase,
  getStyles,
  undefined,
  {
    scope: 'NormalPeoplePicker'
  }
);

export const CompactPeoplePicker = styled<IPeoplePickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  CompactPeoplePickerBase,
  getStyles,
  undefined,
  {
    scope: 'CompactPeoplePicker'
  }
);

export const ListPeoplePicker = styled<IPeoplePickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  ListPeoplePickerBase,
  getStyles,
  undefined,
  {
    scope: 'ListPeoplePickerBase'
  }
);
