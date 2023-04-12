import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { HoverCardPageProps } from './HoverCardPage.doc';

export const HoverCardPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...HoverCardPageProps[props.platform!]} />;
};
