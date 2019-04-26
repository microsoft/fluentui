import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MarqueeSelectionUtilityPageProps } from './MarqueeSelectionUtilityPage.doc';

export class MarqueeSelectionUtilityPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...MarqueeSelectionUtilityPageProps[this.props.platform]} />;
  }
}
