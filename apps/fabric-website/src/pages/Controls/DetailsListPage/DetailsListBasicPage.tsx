import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListBasicPageProps } from './DetailsListBasicPage.doc';

export class DetailsListBasicPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListBasicPageProps[this.props.platform]} />;
  }
}
