/* tslint:disable */
import * as React from 'react';
import { IBaseFloatingPickerProps } from '../../../../FloatingPicker';
import { ISelectedPeopleItemProps } from '../SelectedPeopleList';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IPersonaProps } from '../../../../Persona';

export interface IEditingSelectedPeopleItemProps extends ISelectedPeopleItemProps {
  // tslint:disable-next-line:no-any
  onEditingComplete: (oldItem: any, newItem: any) => void;
  onRenderFloatingPicker?: React.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
  floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
}

export interface IEditingSelectedPeopleItemStyles {}
