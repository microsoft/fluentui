import { getRTL, getInitials } from '../../../Utilities';
import { BaseFloatingPicker } from '../BaseFloatingPicker';
import { IBaseFloatingPickerProps } from '../BaseFloatingPicker.Props';
import { SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import './PeoplePicker.scss';
import { ValidationState, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';

export interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {
}

export class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {
}

export class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
  public static defaultProps = {
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem,
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