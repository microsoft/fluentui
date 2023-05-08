import * as React from 'react';
import { Page, IPageProps, PlatformContext } from '@fluentui/react-docsite-components/lib/index2';
import { getSubTitle } from '../../utilities/index';
import { Platforms } from '../../interfaces/Platforms';
import { SiteDefinition } from '../../SiteDefinition/SiteDefinition';
import { IPageJson } from '@fluentui/react/lib/common/DocPage.types';

export interface IControlsPageProps extends IPageProps<Platforms> {}

const apiRequireContext = require.context('@fluentui/public-docsite-resources/dist/api/', true, /^(?!references).*/);

const webPlatformBanner = {
  banner: {
    title: 'Fluent UI v9',
    message: 'Check out the all new [Fluent UI version 9](https://react.fluentui.dev)!',
  },
};

const ControlsAreaPageBase: React.FunctionComponent<IControlsPageProps> = props => {
  let jsonDocs: IPageJson;
  if (props.platform === 'web' && !props.jsonDocs) {
    // Get the control's .page.json file for API docs if it exists
    for (const path of apiRequireContext.keys()) {
      if (path.indexOf(`/${props.title}.page.json`) !== -1) {
        jsonDocs = apiRequireContext<IPageJson>(path);
        break;
      }
    }
  }
  return (
    <Page
      subTitle={getSubTitle(props.platform!)}
      jsonDocs={jsonDocs!}
      {...props}
      {...(props.platform === Platforms.web && webPlatformBanner)}
      versionSwitcherDefinition={
        props.platform === Platforms.web ? SiteDefinition.versionSwitcherDefinition : undefined
      }
    />
  );
};

export const ControlsAreaPage: React.FunctionComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <ControlsAreaPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
