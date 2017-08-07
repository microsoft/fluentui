import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';
import { FlexBoxResizeGroupExample } from './examples/ResizeGroup.FlexBox.Example';

const ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx') as string;

const ResizeGroupFlexBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.FlexBox.Example.tsx') as string;

export class ResizeGroupPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='ResizeGroup'
        componentName='ResizeGroupExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='Use ResizeGroup to move commands into an overflow menu' code={ ResizeGroupBasicExampleCode }>
              <ResizeGroupOverflowSetExample />
            </ExampleCard>
            <ExampleCard title='Use ResizeGroup to prevent two groups of items from overlapping' code={ ResizeGroupFlexBoxExampleCode }>
              <FlexBoxResizeGroupExample />
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
            <span>
              <p>
                ResizeGroup is a React component that can be used to help fit the right amount of content within a container. The consumer
                of the ResizeGroup provides some initial data, a reduce function, and a render function. The render function is responsible
                for populating the contents of a the container when given some data. The initial data should represent the data that should
                be rendered when the ResizeGroup has infinite width. If the contents returned by the render function do not fit within the
                ResizeGroup, the reduce function is called to get a version of the data whose rendered width should be smaller than the data
                that was just rendered.
              </p>
              <p>
                An example scenario is shown below, where controls that do not fit on screen are rendered in an overflow menu. The data in
                this situation is a list of 'primary' controls that are rendered on the top level and a set of overflow controls rendered in
                the overflow menu. The initial data in this case has all the controls in the primary set. The implementation of onReduceData
                moves a control from the overflow well into the primary control set.
              </p>
              <p>
                This component queries the DOM for the dimensions of elements. Too many of these dimension queries will negatively affect
                the performance of the component and could cause poor interactive performance on websites. One way to reduce the number of
                measurements performed by the component is to provide a cacheKey in the initial data and in the return value of
                onReduceData. Two data objects with the same cacheKey are assumed to have the same width, resulting in measurements being
                skipped for that data object. In the controls with an overflow example, the cacheKey is simply the concatenation of the
                keys of the controls that appear in the top level.
              </p>
            </span>
          </div>
        }
        dos={
          <div>
            <ul>
              <li>
                Ensure the width of the parent of this component has a fixed width that does not depend on the dimensions of it's children.
                Failure to do so may result in ResizeGroup attempting to fill a width of 0px.
              </li>
              <li>
                Ensure that result of rendering the data returned by onReduceData is actually smaller than the previous data.
              </li>
              <li>
                Include a cacheKey in your data to improve performance. Two objects with the same cacheKey are assumed to have the same
                width, so the ResizeGroup will only store one measurement per resize group.
               </li>
              <li>
                Implement onGrowData for improved performance when the container for the resize group increases in size.
               </li>
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
