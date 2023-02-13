import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ImagePageProps } from './ImagePage.doc';

export const ImagePage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ImagePageProps[props.platform!]} />;
};
