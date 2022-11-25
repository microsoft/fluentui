import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedQuickActionsPageProps } from './AnnouncedQuickActionsPage.doc';

export const AnnouncedQuickActionsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedQuickActionsPageProps[props.platform!]} />;
};
