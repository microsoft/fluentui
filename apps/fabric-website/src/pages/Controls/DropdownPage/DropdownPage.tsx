import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DropdownPageProps } from './DropdownPage.doc';

export const DropdownPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DropdownPageProps[props.platform]} />;
};
