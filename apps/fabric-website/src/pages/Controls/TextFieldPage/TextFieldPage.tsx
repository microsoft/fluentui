import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TextFieldPageProps } from './TextFieldPage.doc';

export const TextFieldPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...TextFieldPageProps[props.platform]} />;
};
