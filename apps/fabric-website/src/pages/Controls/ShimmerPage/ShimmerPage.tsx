import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ShimmerPageProps } from './ShimmerPage.doc';

export const ShimmerPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ShimmerPageProps[props.platform]} />;
};
