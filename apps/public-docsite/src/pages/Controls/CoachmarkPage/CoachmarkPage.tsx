import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CoachmarkPageProps } from './CoachmarkPage.doc';

export const CoachmarkPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CoachmarkPageProps[props.platform!]} />;
};
