import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedPageProps } from './AnnouncedPage.doc';

export const AnnouncedPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedPageProps[props.platform]} />;
};
