import { IPageProps } from '@uifabric/example-app-base/lib/index2';

export const HomePageProps: IPageProps = {
  title: 'Welcome to Microsoft UI Fabric',
  fileNamePrefix: 'Home',
  overview: require('!raw-loader!@uifabric/fabric-website/src/pages/HomePage/docs/default/HomeOverview.md') as string,
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/HomePage'
};
