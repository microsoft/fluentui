import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListAdvancedPageProps } from './DetailsListAdvancedPage.doc';

export class DetailsListAdvancedPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListAdvancedPageProps[this.props.platform]} />;
  }
}
