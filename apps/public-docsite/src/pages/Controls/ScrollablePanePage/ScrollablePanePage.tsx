import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ScrollablePanePageProps } from './ScrollablePanePage.doc';

export const ScrollablePanePage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ScrollablePanePageProps[props.platform!]} />;
};
