import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LabelPageProps } from './LabelPage.doc';

export class LabelPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...LabelPageProps[this.props.platform]} />;
  }
}
