import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

export const ThemePageProps: IDocPageProps = {
  title: 'Themes',
  componentName: 'ThemeExample',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Theme',
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Theme/docs/ThemesOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
