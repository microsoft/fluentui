import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { RatingPageProps } from './RatingPage.doc';

export const RatingPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...RatingPageProps[props.platform!]} />;
};
