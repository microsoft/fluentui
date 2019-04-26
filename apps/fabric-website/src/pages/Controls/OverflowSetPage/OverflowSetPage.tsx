import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { OverflowSetPageProps } from './OverflowSetPage.doc';

export class OverflowSetPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...OverflowSetPageProps[this.props.platform]} />;
  }
}
