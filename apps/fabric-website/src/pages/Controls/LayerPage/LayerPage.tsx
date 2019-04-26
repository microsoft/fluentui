import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LayerPageProps } from './LayerPage.doc';

export class LayerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...LayerPageProps[this.props.platform]} />;
  }
}
