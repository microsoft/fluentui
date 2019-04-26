import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCompactPageProps } from './DetailsListCompactPage.doc';

export class DetailsListCompactPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListCompactPageProps[this.props.platform]} />;
  }
}
