import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AnnouncedLazyLoadingPageProps } from './AnnouncedLazyLoadingPage.doc';

export const AnnouncedLazyLoadingPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...AnnouncedLazyLoadingPageProps[props.platform!]} />;
};
