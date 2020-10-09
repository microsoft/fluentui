import { IPageProps } from '@uifabric/example-app-base/lib/index2';

export const ResourcesPageProps: IPageProps = {
  title: 'Resources',
  overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/ResourcesOverview.md') as string,
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/ResourcesPage',
};
