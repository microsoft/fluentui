import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListShimmerPageProps } from './DetailsListShimmerPage.doc';

export class DetailsListShimmerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListShimmerPageProps[this.props.platform]} />;
  }
}
