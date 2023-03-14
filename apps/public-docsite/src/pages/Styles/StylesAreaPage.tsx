import * as React from 'react';
import { Page, IPageProps, PlatformContext } from '@fluentui/react-docsite-components/lib/index2';
import { getSubTitle } from '../../utilities/index';
import { Platforms } from '../../interfaces/Platforms';

export interface IStylesPageProps extends IPageProps<Platforms> {}

export const StylesAreaPageBase: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <Page {...props} platform={platform} subTitle={getSubTitle(platform!)} />;
};

export const StylesAreaPage: React.FunctionComponent<IStylesPageProps> = (props: IStylesPageProps) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <StylesAreaPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
