import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SpinnerPageProps } from './SpinnerPage.doc';

export class SpinnerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SpinnerPageProps[this.props.platform]} />;
  }
}
