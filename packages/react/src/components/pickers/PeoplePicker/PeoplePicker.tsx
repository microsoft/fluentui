import * as React from 'react';

import { getRTL, getInitials, styled } from '../../../Utilities';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { ValidationState } from '../BasePicker.types';
import { PeoplePickerItem } from './PeoplePickerItems/PeoplePickerItem';
import { PeoplePickerItemSuggestion } from './PeoplePickerItems/PeoplePickerItemSuggestion';
import { getStyles } from '../BasePicker.styles';
import type {
  IBasePickerProps,
  IBasePickerSuggestionsProps,
  IBasePickerStyleProps,
  IBasePickerStyles,
} from '../BasePicker.types';
import type { IPersonaProps } from '../../../Persona';
import type { IPeoplePickerItemSelectedProps } from './PeoplePickerItems/PeoplePickerItem.types';

/**
 * PeoplePicker props interface which renders Personas as items.
 * {@docCategory PeoplePicker}
 * */
export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {}

/**
 * {@docCategory PeoplePicker}
 */
export class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {}

/**
 * {@docCategory PeoplePicker}
 */
export class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {}

/**
 * Standard People Picker.
 * {@docCategory PeoplePicker}
 */
export class NormalPeoplePickerBase extends BasePeoplePicker {
  /** Default props for NormalPeoplePicker. */
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => <PeoplePickerItem {...props} />,
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => (
      <PeoplePickerItemSuggestion personaProps={personaProps} suggestionsProps={suggestionsProps} />
    ),
    createGenericItem,
  };
}

/**
 * Compact layout. It uses personas without secondary text when displaying search results.
 * {@docCategory PeoplePicker}
 */
export class CompactPeoplePickerBase extends BasePeoplePicker {
  /** Default props for CompactPeoplePicker. */
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => <PeoplePickerItem {...props} />,
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => (
      <PeoplePickerItemSuggestion personaProps={personaProps} suggestionsProps={suggestionsProps} compact={true} />
    ),
    createGenericItem,
  };
}

/**
 * MemberList layout. The selected people show up below the search box.
 * {@docCategory PeoplePicker}
 */
export class ListPeoplePickerBase extends MemberListPeoplePicker {
  /** Default props for ListPeoplePicker. */
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => <PeoplePickerItem {...props} />,
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => (
      <PeoplePickerItemSuggestion personaProps={personaProps} suggestionsProps={suggestionsProps} />
    ),
    createGenericItem,
  };
}

/**
 * {@docCategory PeoplePicker}
 */
export interface IGenericItem {
  primaryText: string;
  imageInitials: string;
  ValidationState: ValidationState;
}

/**
 * {@docCategory PeoplePicker}
 */
export function createGenericItem(
  name: string,
  currentValidationState: ValidationState,
): IGenericItem & { key: React.Key } {
  const personaToConvert = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    ValidationState: currentValidationState,
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
    scope: 'NormalPeoplePicker',
  },
);

export const CompactPeoplePicker = styled<IPeoplePickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  CompactPeoplePickerBase,
  getStyles,
  undefined,
  {
    scope: 'CompactPeoplePicker',
  },
);

export const ListPeoplePicker = styled<IPeoplePickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  ListPeoplePickerBase,
  getStyles,
  undefined,
  {
    scope: 'ListPeoplePickerBase',
  },
);
