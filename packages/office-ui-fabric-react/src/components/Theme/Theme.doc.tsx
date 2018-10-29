import { IDocPageProps } from '../../common/DocPage.types';

export const ThemePageProps: IDocPageProps = {
  title: 'Themes',
  componentName: 'ThemeExample',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Theme',
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Theme/docs/ThemesOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
