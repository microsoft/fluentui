import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LinkPageProps } from './LinkPage.doc';

export const LinkPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...LinkPageProps[props.platform]} />;
};
