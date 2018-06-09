import * as React from 'react';
import { LinkBasicExample } from 'office-ui-fabric-react/lib/components/Link/examples/Link.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { LinkStatus } from 'office-ui-fabric-react/lib/components/Link/Link.checklist';

const LinkBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Link/examples/Link.Basic.Example.tsx') as string;

export const LinkPageProps: IDemoPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Link',
  componentStatus: LinkStatus,
  examples: [
    {
      title: 'Link',
      code: LinkBasicExampleCode,
      view: <LinkBasicExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/Link.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDonts.md'),
  isHeaderVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button']
};

export const LinkPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...LinkPageProps, ...props }} />;
