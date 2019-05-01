import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PeoplePickerPageProps } from './PeoplePickerPage.doc';

export const PeoplePickerPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...PeoplePickerPageProps[props.platform]} />;
};
