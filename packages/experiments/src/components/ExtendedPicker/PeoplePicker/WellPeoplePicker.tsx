/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseWellPicker } from '../BaseWellPicker';
import { IBaseWellPickerProps } from '../BaseWellPicker.Props';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import './PeoplePicker.scss';
import { IPickerItemProps, ValidationState, } from 'office-ui-fabric-react/lib/Pickers';
import { FloatingPeoplePicker, BaseFloatingPeoplePicker } from './FloatingPeoplePicker';
import { IBaseFloatingPickerProps } from '../BaseFloatingPicker.Props';

export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }> {
}

export interface IPeopleWellPickerProps extends IBaseWellPickerProps<IPersonaProps> {
}

export class BaseWellPeoplePicker extends BaseWellPicker<IPersonaProps, IPeopleWellPickerProps> {
}

export class WellPeoplePicker extends BaseWellPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
    floatingPickerType: FloatingPeoplePicker as new (props: IBaseFloatingPickerProps<IPersonaProps>) => BaseFloatingPeoplePicker,
  };
}