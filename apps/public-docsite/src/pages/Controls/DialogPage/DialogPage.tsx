import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DialogPageProps } from './DialogPage.doc';

export const DialogPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DialogPageProps[props.platform!]} />;
};
