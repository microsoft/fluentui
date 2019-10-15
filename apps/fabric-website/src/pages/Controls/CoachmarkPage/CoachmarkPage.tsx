import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CoachmarkPageProps } from './CoachmarkPage.doc';

export const CoachmarkPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CoachmarkPageProps[props.platform]} />;
};
