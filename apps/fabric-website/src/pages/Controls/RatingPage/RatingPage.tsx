import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { RatingPageProps } from './RatingPage.doc';

export class RatingPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...RatingPageProps[this.props.platform]} />;
  }
}
