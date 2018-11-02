import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { Video360BasicExample } from './examples/Video360.Basic.Example';
import { Video360MenuExample } from './examples/Video360.Menu.Example';

const Video360BasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/Video360/examples/Video360.Basic.Example.tsx') as string;
const Video360MenuExampleCode = require('!raw-loader!@uifabric/mr/src/components/Video360/examples/Video360.Menu.Example.tsx') as string;

export class Video360Page extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Video360"
        componentName="Video360Example"
        exampleCards={
          <div>
            <ExampleCard title="Video360 Basic" code={Video360BasicExampleCode}>
              <Video360BasicExample />
            </ExampleCard>
            <ExampleCard title="Video360 Menu" code={Video360MenuExampleCode}>
              <Video360MenuExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/mr/src/components/Video360/Video360.types.ts')]} />
        }
        overview={
          <div>
            <p>Video360 description</p>
          </div>
        }
        /* tslint:enable:max-line-length */
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
