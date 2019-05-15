import * as React from 'react';
import { PlatformContext } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FluentThemePageProps } from './FluentThemePage.doc';
import { Platforms } from '../../../interfaces/Platforms';

export class FluentThemePageBase extends React.Component<IControlsPageProps, {}> {
  public render() {
    const { platform } = this.props;
    return <ControlsAreaPage {...this.props} {...FluentThemePageProps[platform]} />;
  }
}

export const FluentThemePage: React.StatelessComponent<IControlsPageProps> = (props: IControlsPageProps) => (
  <PlatformContext.Consumer>{(platform: Platforms) => <FluentThemePageBase platform={platform} {...props} />}</PlatformContext.Consumer>
);
