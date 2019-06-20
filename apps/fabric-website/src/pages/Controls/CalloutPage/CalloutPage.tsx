import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CalloutPageProps } from './CalloutPage.doc';

export const CalloutPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CalloutPageProps[props.platform]} />;
};
