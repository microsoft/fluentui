/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { getRTL, getInitials } from '../../../Utilities';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { IBasePickerProps, ValidationState } from '../BasePicker.Props';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { IPersonaProps } from '../../../Persona';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { SuggestionsController } from '../Suggestions/SuggestionsController';
import './PeoplePicker.scss';

export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}

export class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}

export class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}

/**
 * Standard People Picker.
 */
export class NormalPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props} />,
    onRenderSuggestionsItem: (props, itemProps?) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

/**
* Compact layout. It uses small personas when displaying search results.
*/
export class CompactPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props} />,
    onRenderSuggestionsItem: (props, itemProps?) => SuggestionItemSmall({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

/**
 * MemberList layout. The selected people show up below the search box.
 */
export class ListPeoplePicker extends MemberListPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props} />,
    onRenderSuggestionsItem: (props, itemProps?) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

export function createGenericItem(name: string, currentValidationState: ValidationState) {
  let personaToConvert = {
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