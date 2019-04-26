import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ListPageProps } from './ListPage.doc';

export class ListPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ListPageProps[this.props.platform]} />;
  }
}
