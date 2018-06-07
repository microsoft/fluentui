import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';
import { OverflowSetStatus } from './OverflowSet.checklist';

const OverflowSetCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;

export const OverflowSetPageProps: IDemoPageProps = {
  title: 'OverflowSet',
  componentName: 'OverflowSet',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/OverflowSet',
  componentStatus: OverflowSetStatus,
  examples: [
    {
      title: 'OverflowSet Basic Example',
      code: OverflowSetBasicExampleCode,
      view: (
        <LayerHost>
          <OverflowSetBasicExample />
        </LayerHost>
      )
    },
    {
      title: 'OverflowSet Vertical Example',
      code: OverflowSetVerticalExampleCode,
      view: (
        <LayerHost>
          <OverflowSetVerticalExample />
        </LayerHost>
      )
    },
    {
      title: 'OverflowSet Custom Example',
      code: OverflowSetCustomExampleCode,
      view: (
        <LayerHost>
          <OverflowSetCustomExample />
        </LayerHost>
      )
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/OverflowSet.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/docs/OverflowSetOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  allowNativeProps: true
};

export const OverflowSetPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...OverflowSetPageProps, ...props }} />
);
