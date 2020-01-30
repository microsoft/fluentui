import * as React from 'react';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';

const OverflowSetCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;

export const OverflowSetPageProps: IDocPageProps = {
  title: 'OverflowSet',
  componentName: 'OverflowSet',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/OverflowSet',
  examples: [
    {
      title: 'OverflowSet Basic Example',
      code: OverflowSetBasicExampleCode,
      view: <OverflowSetBasicExample />
    },
    {
      title: 'OverflowSet Vertical Example',
      code: OverflowSetVerticalExampleCode,
      view: <OverflowSetVerticalExample />
    },
    {
      title: 'OverflowSet Custom Example',
      code: OverflowSetCustomExampleCode,
      view: <OverflowSetCustomExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/docs/OverflowSetOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
