import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedBulkOperationsPageProps } from './AnnouncedBulkOperationsPage.doc';

export const AnnouncedBulkOperationsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedBulkOperationsPageProps[props.platform!]} />;
};
