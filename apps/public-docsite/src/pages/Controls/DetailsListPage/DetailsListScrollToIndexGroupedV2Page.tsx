import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListScrollToIndexGroupedV2PageProps } from './DetailsListScrollToIndexGroupedV2Page.doc';

export const DetailsListScrollToIndexGroupedV2Page: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListScrollToIndexGroupedV2PageProps[props.platform!]} />;
};
