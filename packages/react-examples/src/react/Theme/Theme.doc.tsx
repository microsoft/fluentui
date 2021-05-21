import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

export const ThemePageProps: IDocPageProps = {
  title: 'Themes',
  componentName: 'ThemeExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-examples/src/react/Theme',
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Theme/docs/ThemesOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
