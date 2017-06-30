import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';

const ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx') as string;

export class ResizeGroupPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='ResizeGroup'
        componentName='ResizeGroupExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='ResizeGroup' code={ ResizeGroupBasicExampleCode }>
              <ResizeGroupOverflowSetExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/ResizeGroup.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/ResizeGroup'>ResizeGroup</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
        dos={
          <div>
            <ul>
              <li>
                Ensure the width of the parent of this component has a fixed width that does not depend on the dimensions of it's children.
                Failure to do so may result in ResizeGroup attempting to fill a width of 0px.
              </li>
              <li>Include a cacheKey in your data to improve performance </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Do any DOM measurements inside your onReduce function as this will degrade performance</li>
              <li>Provide too many different return values for onReduce, it will degrade performance</li>
            </ul>
          </div>
        }
      />
    );
  }
}
