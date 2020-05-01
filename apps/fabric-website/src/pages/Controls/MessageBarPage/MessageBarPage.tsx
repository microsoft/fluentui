import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MessageBarPageProps } from './MessageBarPage.doc';

export const MessageBarPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...MessageBarPageProps[props.platform]} />;
};
