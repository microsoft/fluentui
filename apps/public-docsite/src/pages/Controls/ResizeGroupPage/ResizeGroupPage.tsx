import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ResizeGroupPageProps } from './ResizeGroupPage.doc';

export const ResizeGroupPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ResizeGroupPageProps[props.platform!]} />;
};
