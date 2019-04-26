import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { OverlayPageProps } from './OverlayPage.doc';

export class OverlayPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...OverlayPageProps[this.props.platform]} />;
  }
}
