import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedBulkOperationsPageProps } from './AnnouncedBulkOperationsPage.doc';

export const AnnouncedBulkOperationsPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedBulkOperationsPageProps[props.platform]} />;
};
