import { INavPage } from '@uifabric/example-app-base/lib/index2';

export const ResourcesPages: INavPage = {
  title: 'Resources',
  url: '#/resources',
  isUhfLink: true,
  component: require<any>('../../../pages/Overviews/ResourcesPage/ResourcesPage').ResourcesPage
};
