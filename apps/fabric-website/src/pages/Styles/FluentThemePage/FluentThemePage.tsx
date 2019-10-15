import * as React from 'react';
import { PlatformContext } from '@uifabric/example-app-base/lib/index2';
import { StylesAreaPage, IStylesPageProps } from '../StylesAreaPage';
import { FluentThemePageProps } from './FluentThemePage.doc';
import { Platforms } from '../../../interfaces/Platforms';

export class FluentThemePageBase extends React.Component<IStylesPageProps, {}> {
  public render() {
    const { platform } = this.props;
    return <StylesAreaPage {...this.props} {...FluentThemePageProps[platform]} />;
  }
}

export const FluentThemePage: React.StatelessComponent<IStylesPageProps> = (props: IStylesPageProps) => (
  <PlatformContext.Consumer>{(platform: Platforms) => <FluentThemePageBase platform={platform} {...props} />}</PlatformContext.Consumer>
);
