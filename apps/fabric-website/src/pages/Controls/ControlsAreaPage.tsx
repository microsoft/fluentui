import * as React from 'react';
import { Page, IPageProps, PlatformContext } from '@uifabric/example-app-base/lib/index2';
import { getSubTitle } from '../../utilities/index';
import { Platforms } from '../../interfaces/Platforms';
import { IPageJson } from 'office-ui-fabric-react/lib/common/DocPage.types';

export interface IControlsPageProps extends IPageProps<Platforms> {}

const apiRequireContext = require.context('@uifabric/api-docs/lib/pages/office-ui-fabric-react');

const ControlsAreaPageBase: React.StatelessComponent<IControlsPageProps> = props => {
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
  return <Page subTitle={getSubTitle(props.platform)} jsonDocs={jsonDocs} {...props} />;
};

export const ControlsAreaPage: React.StatelessComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>{(platform: Platforms) => <ControlsAreaPageBase platform={platform} {...props} />}</PlatformContext.Consumer>
);
