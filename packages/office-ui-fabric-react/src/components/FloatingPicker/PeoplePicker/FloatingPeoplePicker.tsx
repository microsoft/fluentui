import { getRTL, getInitials } from '../../../Utilities';
import { BaseFloatingPicker } from '../BaseFloatingPicker';
import { IBaseFloatingPickerProps } from '../BaseFloatingPicker.types';
import { SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { IPersonaProps } from '../../../Persona';
import './PeoplePicker.scss';
import { IBasePickerSuggestionsProps, ISuggestionModel } from '../../../Pickers';

export interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {}

export class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {}

export class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
  // tslint:disable-next-line:no-any
  public static defaultProps: Partial<IBaseFloatingPickerProps<IPersonaProps>> = {
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemNormal({ ...props }, { ...itemProps }),
    createForceResolvedItem: createItem
  };
}

export function createItem(name: string): ISuggestionModel<IPersonaProps> {
  // tslint:disable-next-line:no-any
  const personaToConvert: any = {
    key: name,
    primaryText: name,
    imageInitials: getInitials(name, getRTL())
  };

  return personaToConvert;
}
