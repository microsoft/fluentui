import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

export const IntroductionPageProps: IDocPageProps = {
  title: 'Introduction',
  componentName: 'Introduction',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting',
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Introduction/docs/Documentation.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
