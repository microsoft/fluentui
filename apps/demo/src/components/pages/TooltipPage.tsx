import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { TooltipCustomExample } from 'office-ui-fabric-react/lib/components/Tooltip/examples/Tooltip.Custom.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { TooltipBasicExample } from 'office-ui-fabric-react/lib/components/Tooltip/examples/Tooltip.Basic.Example';
import { TooltipInteractiveExample } from 'office-ui-fabric-react/lib/components/Tooltip/examples/Tooltip.Interactive.Example';
import { TooltipOverflowExample } from 'office-ui-fabric-react/lib/components/Tooltip/examples/Tooltip.Overflow.Example';
import { TooltipStatus } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.checklist';

import './TooltipPage.global.scss';

const TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx') as string;
const TooltipCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Custom.Example.tsx') as string;
const TooltipInteractiveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Interactive.Example.tsx') as string;
const TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx') as string;

export const TooltipPageProps: IDemoPageProps = {
  title: 'Tooltip',
  componentName: 'Tooltip',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Tooltip',
  componentStatus: TooltipStatus,
  examples: [
    {
      title: 'Default Tooltip',
      code: TooltipBasicExampleCode,
      view: <TooltipBasicExample />
    },
    {
      title: 'Tooltip with list',
      code: TooltipCustomExampleCode,
      view: <TooltipCustomExample />
    },
    {
      title: 'Tooltip with a closing delay',
      code: TooltipInteractiveExampleCode,
      view: <TooltipInteractiveExample />
    },
    {
      title: 'Tooltip only on overflow',
      code: TooltipOverflowExampleCode,
      view: <TooltipOverflowExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/Tooltip.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/TooltipHost.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/docs/TooltipOverview.md'),
  isHeaderVisible: true,
  allowNativeProps: true
};

export const TooltipPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage {...{ ...TooltipPageProps, ...props }} />
  </LayerHost>
);
