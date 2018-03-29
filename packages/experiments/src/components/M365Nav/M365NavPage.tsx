import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { M365NavExample } from './examples/M365Nav.Example';
const M365NavExampleCode =
  require('!raw-loader!experiments/src/components/M365Nav/examples/M365Nav.Example.tsx') as string;

export class M365NavPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='M365 Nav'
        componentName='M365NavToggler'
        exampleCards={
          <div>
            <ExampleCard title='M365 Nav' isOptIn={ true } code={ M365NavExampleCode }>
              <M365NavExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/M365Nav/M365Nav.types.ts')
            ] }
            renderOnly={ ['IM365NavProps', 'IM365NavState'] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use M365 Nav component in all M365 Admin Centers to acheive coherence</li>
              <li>Use the hamburger icon at the top to switch between expanded and collapsed state</li>
              <li>Use the optional named second menu group if needed to split/categorize the menu items.</li>
              <li>Use only supported actions on leaf nodes - expand if there is child menu or script execution
                through onClick props or open url (includes hashtag) based on target property</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Provide script or url for the parent node. Parent node is used to expand/collapse it's child nodes.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
