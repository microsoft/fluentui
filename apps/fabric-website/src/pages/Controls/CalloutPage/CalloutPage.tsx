import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CalloutPageProps } from './CalloutPage.doc';

export class CalloutPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...CalloutPageProps[this.props.platform]} />;
  }
}
