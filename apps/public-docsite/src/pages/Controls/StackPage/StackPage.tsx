import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { StackPageProps } from './StackPage.doc';

export const StackPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...StackPageProps[props.platform!]} />;
};
