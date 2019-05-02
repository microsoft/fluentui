import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SliderPageProps } from './SliderPage.doc';

export const SliderPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SliderPageProps[props.platform]} />;
};
