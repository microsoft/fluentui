import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SpinButtonPageProps } from './SpinButtonPage.doc';

export class SpinButtonPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SpinButtonPageProps[this.props.platform]} />;
  }
}
