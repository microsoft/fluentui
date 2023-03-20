import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedSearchResultsPageProps } from './AnnouncedSearchResultsPage.doc';

export const AnnouncedSearchResultsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedSearchResultsPageProps[props.platform!]} />;
};
