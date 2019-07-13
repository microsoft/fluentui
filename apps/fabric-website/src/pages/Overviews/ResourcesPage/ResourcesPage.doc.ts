import { IPageProps } from '@uifabric/example-app-base/lib/index2';

export const ResourcesPageProps: IPageProps = {
  title: 'Resources',
  overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesOverview.md') as string,
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ResourcesPage'
};
