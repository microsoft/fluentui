import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CheckboxPageProps } from './CheckboxPage.doc';

export const CheckboxPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CheckboxPageProps[props.platform]} />;
};
