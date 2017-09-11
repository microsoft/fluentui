import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { LinkBasicExample } from './examples/Link.Basic.Example';
import { ComponentStatusState } from '../ComponentStatus/ComponentStatusState';

let LinkBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Link/examples/Link.Basic.Example.tsx') as string;

export class LinkPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Link'
        componentName='LinkExample'
        exampleCards={
          <ExampleCard title='Link' code={ LinkBasicExampleCode }>
            <LinkBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/Link.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              With a Link, users can navigate to another page, window, or Help topic; display a definition; initiate a command; or choose an option. A Link indicates that it can be clicked, typically by being displayed using the visited or unvisited link system colors. Traditionally, Links are underlined as well, but that approach is often unnecessary and falling out of favor to reduce visual clutter.
            </p>

            <p>
              A Link is the lightest weight clickable control, and is often used to reduce the visual complexity of a design.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use to navigate to another page, window, or help topic; display a definition; initiate a command; or choose an option.</li>
              <li>Make Links discoverable by visual inspection alone. Users shouldn't have to interact with your program to find links.</li>
              <li>Use Links that give specific descriptive information about the result of clicking on the link, using as much text as necessary. Users should be able to accurately predict the result of a link from its link text and optional Tooltip.</li>
              <li>Use text that suggests clicking, such as a command starting with an imperative verb like "Show", "Print", "Copy", or "Delete".</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>
                Use if the action is destructive or irreversible. Because users associate links with navigation (and the ability to back out), Links aren't appropriate for commands with significant consequences.
              </li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Link/Link.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Link}
          >
          </ComponentStatus>
        }
      >
      </ComponentPage>
    );
  }

}
