import { IPageProps } from '@fluentui/react-docsite-components/lib/index2';

export const ResourcesPageProps: IPageProps = {
  title: 'Resources',
  overview:
    require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/ResourcesOverview.md') as string,
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/ResourcesPage',
};
