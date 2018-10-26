import * as React from 'react';
import { LinkBasicExample } from './examples/Link.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { LinkStatus } from './Link.checklist';

const LinkBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Link/examples/Link.Basic.Example.tsx') as string;
const LinkBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Link/Link.Basic.Example.Codepen.txt') as string;

export const LinkPageProps: IDocPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Link',
  componentStatus: LinkStatus,
  examples: [
    {
      title: 'Link',
      code: LinkBasicExampleCode,
      view: <LinkBasicExample />,
      codepenJS: LinkBasicExampleCodepen
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/Link.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button']
};
