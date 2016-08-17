import {
  IPersonaProps,
  PersonaSize
} from '../../Persona';
import { PeoplePickerType } from './PeoplePicker.Props';
export interface IPeoplePickerItemProps {
  persona: IPersonaProps;
  onRemovePersona?: (index: number, personaProps: IPersonaProps) => void;
  onSelectPersona?: (personaProps: IPersonaProps) => void;
  className?: string;
  index?: number;
  isSelected?: boolean;
  peoplePickerType?: PeoplePickerType;

}