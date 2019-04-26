import * as React from 'react';
import { Page, IPageProps, withPlatform } from '@uifabric/example-app-base/lib/index2';
import { getSubTitle } from '../../utilities/index';
import { Platforms } from '../../interfaces/Platforms';

export interface IControlsPageProps extends IPageProps<Platforms> {}

const ControlsAreaPageBase: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform, ...rest } = props;
  return <Page platform={platform} subTitle={getSubTitle(platform)} {...rest} />;
};

export const ControlsAreaPage: React.StatelessComponent<IControlsPageProps> = withPlatform<Platforms>(ControlsAreaPageBase);
