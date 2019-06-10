import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DocumentCardPageProps } from './DocumentCardPage.doc';

export const DocumentCardPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DocumentCardPageProps[props.platform]} />;
};
