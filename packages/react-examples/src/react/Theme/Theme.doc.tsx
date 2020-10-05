import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

export const ThemePageProps: IDocPageProps = {
  title: 'Themes',
  componentName: 'ThemeExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Theme',
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react/Theme/docs/ThemesOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
