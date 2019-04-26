import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PivotPageProps } from './PivotPage.doc';

export class PivotPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...PivotPageProps[this.props.platform]} />;
  }
}
