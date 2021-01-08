import { INavPage } from '@fluentui/react-docsite-components/lib/index2';

export const ResourcesPages: INavPage = {
  title: 'Resources',
  url: '#/resources',
  isUhfLink: true,
  component: require<any>('../../../pages/Overviews/ResourcesPage/ResourcesPage').ResourcesPage,
};
