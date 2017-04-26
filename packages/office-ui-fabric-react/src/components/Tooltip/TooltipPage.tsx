import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { TooltipBottomExample } from './examples/Tooltip.Bottom.Example';
import { TooltipBasicExample } from './examples/Tooltip.Basic.Example';
import { TooltipOverflowExample } from './examples/Tooltip.Overflow.Example';

import './TooltipPage.scss';

const TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx') as string;
const TooltipBottomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Bottom.Example.tsx') as string;
const TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx') as string;

export class TooltipPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='Tooltip'
        componentName='TooltipExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='Tooltip with custom gapSpace' code={ TooltipBasicExampleCode }>
              <TooltipBasicExample />
            </ExampleCard>

            <ExampleCard title='Tooltip Bottom Direction. No delay' code={ TooltipBottomExampleCode }>
              <TooltipBottomExample />
            </ExampleCard>

            <ExampleCard title='Tooltip only on overflow' code={ TooltipOverflowExampleCode }>
              <TooltipOverflowExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/Tooltip.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Tooltip'>Tooltips</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
      />
    );
  }
}
