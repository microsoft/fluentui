import {
  IPersonaProps
} from '../../Persona';
import { PeoplePickerType } from './PeoplePicker.Props';
import * as React from 'react';
export interface IPeoplePickerItemProps extends React.Props<any> {
  /**
   * The persona information to be rendered
   */
  persona: IPersonaProps;
  /**
   * Callback for when the persona is removed
   */
  onRemovePersona?: (index: number, personaProps: IPersonaProps) => void;
  /**
   * Callback for when the persona is selected
   */
  onSelectPersona?: (personaProps: IPersonaProps) => void;
  /**
   * The index for where the persona is in an array
   * either the suggestions list or selected list
   */
  index?: number;
  /**
   * Whether or not this item is selected
   */
  isSelected?: boolean;
  /**
   * The type of people picker
   */
  peoplePickerType?: PeoplePickerType;
}