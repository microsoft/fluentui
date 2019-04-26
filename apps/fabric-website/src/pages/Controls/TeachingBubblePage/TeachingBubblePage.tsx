import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TeachingBubblePageProps } from './TeachingBubblePage.doc';

export class TeachingBubblePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...TeachingBubblePageProps[this.props.platform]} />;
  }
}
