import {
  IPersonaProps,
  PersonaSize
} from '../../Persona';
import { PeoplePickerType } from './PeoplePicker.Props';
import * as React from 'react';
export interface IPeoplePickerItemProps extends React.Props<any>{
  persona: IPersonaProps;
  onRemovePersona?: (index: number, personaProps: IPersonaProps) => void;
  onSelectPersona?: (personaProps: IPersonaProps) => void;
  className?: string;
  index?: number;
  isSelected?: boolean;
  peoplePickerType?: PeoplePickerType;
}