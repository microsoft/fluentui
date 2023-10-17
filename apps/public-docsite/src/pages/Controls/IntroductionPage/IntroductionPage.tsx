import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { IntroductionPageProps } from './IntroductionPage.doc';

export const IntroductionPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...IntroductionPageProps[platform!]} />;
};
