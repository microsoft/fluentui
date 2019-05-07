import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { IconPageProps } from './IconPage.doc';

export const IconPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...IconPageProps[props.platform]} />;
};
