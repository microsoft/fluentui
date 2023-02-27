import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListAnimationPageProps } from './DetailsListAnimationPage.doc';

export const DetailsListAnimationPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListAnimationPageProps[props.platform!]} />;
};
