import * as React from 'react';
import { IBaseFloatingPickerProps } from '../../../../FloatingPicker';
import { ISelectedPeopleItemProps } from '../SelectedPeopleList';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IPersonaProps } from '../../../../Persona';
import { IStyle } from '@fluentui/react/lib/Styling';

export interface IEditingSelectedPeopleItemProps extends ISelectedPeopleItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditingComplete: (oldItem: any, newItem: any) => void;
  onRenderFloatingPicker?: React.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
  floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
}

export interface IEditingSelectedPeopleItemStylesProps {}

export interface IEditingSelectedPeopleItemStyles {
  root: IStyle;
  input: IStyle;
}
