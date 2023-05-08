import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FacepilePageProps } from './FacepilePage.doc';

export const FacepilePage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...FacepilePageProps[props.platform!]} />;
};
