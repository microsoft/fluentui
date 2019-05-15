import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SpinnerPageProps } from './SpinnerPage.doc';

export const SpinnerPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SpinnerPageProps[props.platform]} />;
};
