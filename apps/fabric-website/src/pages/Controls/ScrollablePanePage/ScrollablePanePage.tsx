import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ScrollablePanePageProps } from './ScrollablePanePage.doc';

export class ScrollablePanePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ScrollablePanePageProps[this.props.platform]} />;
  }
}
