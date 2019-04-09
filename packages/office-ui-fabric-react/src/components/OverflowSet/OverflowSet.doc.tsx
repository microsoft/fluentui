import * as React from 'react';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';
import { OverflowSetStatus } from './OverflowSet.checklist';

const OverflowSetCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetCustomExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;
const OverflowSetVerticalExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;

export const OverflowSetPageProps: IDocPageProps = {
  title: 'OverflowSet',
  componentName: 'OverflowSet',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/OverflowSet',
  componentStatus: OverflowSetStatus,
  examples: [
    {
      title: 'OverflowSet Basic Example',
      code: OverflowSetBasicExampleCode,
      codepenJS: OverflowSetBasicExampleCodepen,
      view: <OverflowSetBasicExample />
    },
    {
      title: 'OverflowSet Vertical Example',
      code: OverflowSetVerticalExampleCode,
      codepenJS: OverflowSetVerticalExampleCodepen,
      view: <OverflowSetVerticalExample />
    },
    {
      title: 'OverflowSet Custom Example',
      code: OverflowSetCustomExampleCode,
      codepenJS: OverflowSetCustomExampleCodepen,
      view: <OverflowSetCustomExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/OverflowSet.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/docs/OverflowSetOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
