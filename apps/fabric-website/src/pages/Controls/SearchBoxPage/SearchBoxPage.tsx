import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SearchBoxPageProps } from './SearchBoxPage.doc';

export class SearchBoxPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SearchBoxPageProps[this.props.platform]} />;
  }
}
