import { IPageProps } from '@uifabric/example-app-base/lib/index2';

export const ResourcesPageProps: IPageProps = {
  title: 'Resources',
  overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesOverview.md') as string,
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Overviews/ResourcesPage',
};
