import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LabelPageProps } from './LabelPage.doc';

export const LabelPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...LabelPageProps[props.platform!]} />;
};
