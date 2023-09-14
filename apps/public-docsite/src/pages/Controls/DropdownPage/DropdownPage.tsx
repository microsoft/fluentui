import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DropdownPageProps } from './DropdownPage.doc';

export const DropdownPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DropdownPageProps[props.platform!]} />;
};
