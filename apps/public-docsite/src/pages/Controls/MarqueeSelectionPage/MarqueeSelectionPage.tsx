import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MarqueeSelectionPageProps } from './MarqueeSelectionPage.doc';

export const MarqueeSelectionPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...MarqueeSelectionPageProps[props.platform!]} />;
};
