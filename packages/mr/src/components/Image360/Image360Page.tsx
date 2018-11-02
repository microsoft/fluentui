import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { Image360BasicExample } from './examples/Image360.Basic.Example';
import { Image360MenuExample } from './examples/Image360.Menu.Example';

const Image360BasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/Image360/examples/Image360.Basic.Example.tsx') as string;
const Image360MenuExampleCode = require('!raw-loader!@uifabric/mr/src/components/Image360/examples/Image360.Menu.Example.tsx') as string;

export class Image360Page extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Image360"
        componentName="Image360Example"
        exampleCards={
          <div>
            <ExampleCard title="Image360 Basic" code={Image360BasicExampleCode}>
              <Image360BasicExample />
            </ExampleCard>
            <ExampleCard title="Image360 Menu" code={Image360MenuExampleCode}>
              <Image360MenuExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/mr/src/components/Image360/Image360.types.ts')]} />
        }
        overview={
          <div>
            <p>Image360 description</p>
          </div>
        }
        /* tslint:enable:max-line-length */
        // bestPractices={<div />}
        // dos={
        //   <div>
        //     <ul>
        //       <li />
        //     </ul>
        //   </div>
        // }
        // donts={
        //   <div>
        //     <ul>
        //       <li />
        //     </ul>
        //   </div>
        // }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
