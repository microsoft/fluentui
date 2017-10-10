/* tslint:disable */
import * as React from 'react';
import { IPickerItemProps, ValidationState, IBasePickerProps } from 'office-ui-fabric-react/lib/Pickers';
/* tslint:enable */
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import './PeoplePicker.scss';
import { FloatingPeoplePicker, BaseFloatingPeoplePicker } from './FloatingPeoplePicker';
import { IBaseFloatingPickerProps } from '../BaseFloatingPicker.Props';

export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }> {
}

export interface IPeopleWellPickerProps extends IBasePickerProps<IPersonaProps> {
}

export class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IPeopleWellPickerProps> {
}

export class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
  public static defaultProps: any = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
    floatingPickerType: FloatingPeoplePicker as new (props: IBaseFloatingPickerProps<IPersonaProps>) => BaseFloatingPeoplePicker,
  };
}