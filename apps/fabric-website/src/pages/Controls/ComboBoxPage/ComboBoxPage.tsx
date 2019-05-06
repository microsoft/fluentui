import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ComboBoxPageProps } from './ComboBoxPage.doc';

export const ComboBoxPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ComboBoxPageProps[props.platform]} />;
};
