import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LinkPageProps } from './LinkPage.doc';

export class LinkPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...LinkPageProps[this.props.platform]} />;
  }
}
