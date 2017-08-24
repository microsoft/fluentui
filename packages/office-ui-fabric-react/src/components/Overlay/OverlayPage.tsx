import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { OverlayDarkExample } from './examples/Overlay.Dark.Example';
import { OverlayLightExample } from './examples/Overlay.Light.Example';
import { ComponentStatusState } from '../ComponentStatusState';

const OverlayLightExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Light.Example.tsx') as string;
const OverlayDarkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Dark.Example.tsx') as string;

export class OverlayPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Overlay'
        componentName='OverlayExample'
        exampleCards={
          <div>
            <ExampleCard title='Light' code={ OverlayLightExampleCode }>
              <OverlayLightExample />
            </ExampleCard>
            <ExampleCard title='Dark' code={ OverlayDarkExampleCode }>
              <OverlayDarkExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/Overlay.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Overlays are used to render a semi-transparent layer on top of existing UI. Overlays help focus the user on the content that sits above the added layer and are often used to help designate a modal or blocking experience. Overlays can be seen used in conjunction with Panels and Dialogs.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a dark Overlay with a first-run experience.</li>
              <li>Use a white Overlay for dialogs and panels.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use an Overlay when you want the user to interact with the UI that is being covered.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Overlay/Overlay.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Button}>
          </ComponentStatus>
        }>
      </ComponentPage>
    );
  }

}
