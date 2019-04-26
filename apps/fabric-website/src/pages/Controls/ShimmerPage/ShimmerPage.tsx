import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ShimmerPageProps } from './ShimmerPage.doc';

export class ShimmerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ShimmerPageProps[this.props.platform]} />;
  }
}
