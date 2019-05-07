import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { KeytipsPageProps } from './KeytipsPage.doc';

export const KeytipsPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...KeytipsPageProps[props.platform]} />;
};
