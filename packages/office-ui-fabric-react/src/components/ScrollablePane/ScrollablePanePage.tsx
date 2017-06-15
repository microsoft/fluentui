import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';
import { FontClassNames } from '../../Styling';

const ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/ScrollablePane.Default.Example.tsx') as string;

export class PanelPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Panel'
        componentName='PanelExample'
        exampleCards={
          <div>
            <ExampleCard title='Default' code={ ScrollablePaneDefaultExampleCode }>
              <ScrollablePaneDefaultExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/Panel.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Panels are modal UI overlays that provide contextual app information. They often request some kind of creation or management action from the user. Panels are paired with the Overlay component, also known as a Light Dismiss. The Overlay blocks interactions with the app view until dismissed either through clicking or tapping on the Overlay or by selecting a close or completion action within the Panel.
            </p>

            <h2 className={ FontClassNames.xLarge }>Examples of experiences that use Panels</h2>

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
