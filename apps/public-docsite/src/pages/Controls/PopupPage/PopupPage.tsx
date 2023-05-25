import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PopupPageProps } from './PopupPage.doc';

export const PopupPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...PopupPageProps[props.platform!]} />;
};
