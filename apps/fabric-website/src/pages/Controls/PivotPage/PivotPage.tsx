import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PivotPageProps } from './PivotPage.doc';

export const PivotPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...PivotPageProps[props.platform]} />;
};
