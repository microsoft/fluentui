import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ProgressIndicatorPageProps } from './ProgressIndicatorPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

export const ProgressIndicatorPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;

  return <ControlsAreaPage {...props} title="Progress Indicator" {...ProgressIndicatorPageProps[platform]} />;
};
