import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PanelSmallRightExample } from './examples/Panel.SmallRight.Example';
import { PanelSmallLeftExample } from './examples/Panel.SmallLeft.Example';
import { PanelSmallFluidExample } from './examples/Panel.SmallFluid.Example';
import { PanelMediumExample } from './examples/Panel.Medium.Example';
import { PanelLargeExample } from './examples/Panel.Large.Example';
import { PanelLargeFixedExample } from './examples/Panel.LargeFixed.Example';
import { PanelExtraLargeExample } from './examples/Panel.ExtraLarge.Example';
import { PanelLightDismissExample } from './examples/Panel.LightDismiss.Example';
import { PanelNonModalExample } from './examples/Panel.NonModal.Example';

const PanelSmallRightExampleCode = require('raw-loader!./examples/Panel.SmallRight.Example.tsx') as string;
const PanelSmallLeftExampleCode = require('raw-loader!./examples/Panel.SmallLeft.Example.tsx') as string;
const PanelSmallFluidExampleCode = require('raw-loader!./examples/Panel.SmallFluid.Example.tsx') as string;
const PanelMediumExampleCode = require('raw-loader!./examples/Panel.Medium.Example.tsx') as string;
const PanelLargeExampleCode = require('raw-loader!./examples/Panel.Large.Example.tsx') as string;
const PanelLargeFixedExampleCode = require('raw-loader!./examples/Panel.LargeFixed.Example.tsx') as string;
const PanelExtraLargeExampleCode = require('raw-loader!./examples/Panel.ExtraLarge.Example.tsx') as string;
const PanelLightDismissExampleCode = require('raw-loader!./examples/Panel.LightDismiss.Example.tsx') as string;
const PanelNonModalExampleCode = require('raw-loader!./examples/Panel.NonModal.Example.tsx') as string;

export class PanelPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Panel'
        componentName='PanelExample'
        exampleCards={
          <div>
            <ExampleCard title='Panel - Small Panel, Anchored Right, Fixed Width' code={ PanelSmallRightExampleCode }>
              <PanelSmallRightExample />
            </ExampleCard>
            <ExampleCard title='Panel - Small Panel, Anchored Left, Fixed Width' code={ PanelSmallLeftExampleCode }>
              <PanelSmallLeftExample />
            </ExampleCard>
            <ExampleCard title='Panel - Small Panel, Full Screen, Fluid Width' code={ PanelSmallFluidExampleCode }>
              <PanelSmallFluidExample />
            </ExampleCard>
            <ExampleCard title='Panel - Medium' code={ PanelMediumExampleCode }>
              <PanelMediumExample />
            </ExampleCard>
            <ExampleCard title='Panel - Large' code={ PanelLargeExampleCode }>
              <PanelLargeExample />
            </ExampleCard>
            <ExampleCard title='Panel - LargeFixed' code={ PanelLargeFixedExampleCode }>
              <PanelLargeFixedExample />
            </ExampleCard>
            <ExampleCard title='Panel - Extra Large' code={ PanelExtraLargeExampleCode }>
              <PanelExtraLargeExample />
            </ExampleCard>
            <ExampleCard title='Panel - Light Dismiss' code={ PanelLightDismissExampleCode }>
              <PanelLightDismissExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Non-Modal' code={ PanelNonModalExampleCode }>
              <PanelNonModalExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/Panel/Panel.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Panels are modal UI overlays that provide contextual app information. They often request some kind of creation or management action from the user. Panels are paired with the Overlay component, also known as a Light Dismiss. The Overlay blocks interactions with the app view until dismissed either through clicking or tapping on the Overlay or by selecting a close or completion action within the Panel.
            </p>

            <h2 className='ms-font-xl'>Examples of experiences that use Panels</h2>

            <ul>
              <li>Member or group list creation or management</li>
              <li>Document list creation or management</li>
              <li>Permissions creation or management</li>
              <li>Settings creation or management</li>
              <li>Multi-field forms</li>
            </ul>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use for self-contained experiences where the user does not need to interact with the app view to complete the task. </li>
              <li>Use for complex creation, edit or management experiences.</li>
              <li>Consider how the panel and its contained contents will scale across Fabric’s responsive web breakpoints.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use for experiences where the user needs to interact with the app view. Use a Pane (which pushes content, doesn’t use an overlay, and sits on the same z-index as the rest of the UI) instead.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Panel/Panel.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
