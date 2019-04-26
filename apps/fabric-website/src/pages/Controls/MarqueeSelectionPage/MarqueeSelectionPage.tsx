import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MarqueeSelectionPageProps } from './MarqueeSelectionPage.doc';

export class MarqueeSelectionPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...MarqueeSelectionPageProps[this.props.platform]} />;
  }
}
