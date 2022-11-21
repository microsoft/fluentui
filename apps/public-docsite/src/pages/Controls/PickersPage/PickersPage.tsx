import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PickersPageProps } from './PickersPage.doc';

export const PickersPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...PickersPageProps[props.platform!]} />;
};
