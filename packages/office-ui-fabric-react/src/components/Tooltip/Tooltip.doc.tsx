import * as React from 'react';
import { TooltipCustomExample } from './examples/Tooltip.Custom.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { TooltipBasicExample } from './examples/Tooltip.Basic.Example';
import { TooltipDisplayExample } from './examples/Tooltip.Display.Example';
import { TooltipInteractiveExample } from './examples/Tooltip.Interactive.Example';
import { TooltipOverflowExample } from './examples/Tooltip.Overflow.Example';
import { TooltipNoScrollExample } from './examples/Tooltip.NoScroll.Example';
import { TooltipAbsolutePositionExample } from './examples/Tooltip.Absolute.Position.Example';
import { TooltipStatus } from './Tooltip.checklist';

const TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx') as string;
const TooltipDisplayExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Display.Example.tsx') as string;
const TooltipBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Tooltip/Tooltip.Basic.Example.Codepen.txt') as string;
const TooltipCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Custom.Example.tsx') as string;
const TooltipInteractiveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Interactive.Example.tsx') as string;
const TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx') as string;
const TooltipNoScrollExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.NoScroll.Example.tsx') as string;
const TooltipAbsolutePositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Absolute.Position.Example.tsx') as string;

export const TooltipPageProps: IDocPageProps = {
  title: 'Tooltip',
  componentName: 'Tooltip',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Tooltip',
  componentStatus: TooltipStatus,
  examples: [
    {
      title: 'Default Tooltip',
      code: TooltipBasicExampleCode,
      view: <TooltipBasicExample />,
      codepenJS: TooltipBasicExampleCodepen
    },
    {
      title: 'Tooltip wrapping inline or inline-block elements',
      code: TooltipDisplayExampleCode,
      view: <TooltipDisplayExample />
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
    },
    {
      title: 'Tooltip without scroll (improves performance)',
      code: TooltipNoScrollExampleCode,
      view: <TooltipNoScrollExample />
    },
    {
      title: 'Tooltip with position absolute',
      code: TooltipAbsolutePositionExampleCode,
      view: <TooltipAbsolutePositionExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/Tooltip.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/TooltipHost.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/docs/TooltipOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
