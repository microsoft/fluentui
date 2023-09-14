import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ProgressIndicatorPageProps } from './ProgressIndicatorPage.doc';

export const ProgressIndicatorPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;

  return <ControlsAreaPage {...props} title="Progress Indicator" {...ProgressIndicatorPageProps[platform!]} />;
};
