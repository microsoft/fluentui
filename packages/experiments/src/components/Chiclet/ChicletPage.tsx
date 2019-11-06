import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { ChicletBasicExample } from './examples/Chiclet.Basic.Example';
const ChicletBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Basic.Example.tsx') as string;
import { ChicletBreadcrumbExample } from './examples/Chiclet.Breadcrumb.Example';
const ChicletBreadcrumbExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Breadcrumb.Example.tsx') as string;
import { ChicletFooterExample } from './examples/Chiclet.Footer.Example';
const ChicletFooterExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Footer.Example.tsx') as string;
import { ChicletPreviewExample } from './examples/Chiclet.Preview.Example';
const ChicletPreviewExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Preview.Example.tsx') as string;
import { ChicletXsmallExample } from './examples/Chiclet.Xsmall.Example';
const ChicletXsmallExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Xsmall.Example.tsx') as string;
import { ChicletXsmallFooterExample } from './examples/Chiclet.Xsmall.Footer.Example';
const ChicletXsmallFooterExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Xsmall.Footer.Example.tsx') as string;

export class ChicletPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Chiclet"
        componentName="Chiclet"
        exampleCards={
          <div>
            <ExampleCard title="Basic Medium-sized Chiclet" isOptIn={true} code={ChicletBasicExampleCode}>
              <ChicletBasicExample />
            </ExampleCard>
            <ExampleCard title="Medium-sized Chiclet with Breadcrumb" isOptIn={true} code={ChicletBreadcrumbExampleCode}>
              <ChicletBreadcrumbExample />
            </ExampleCard>
            <ExampleCard title="Medium-sized Chiclet with Footer" isOptIn={true} code={ChicletFooterExampleCode}>
              <ChicletFooterExample />
            </ExampleCard>
            <ExampleCard title="Medium-sized Chiclet with Preview" isOptIn={true} code={ChicletPreviewExampleCode}>
              <ChicletPreviewExample />
            </ExampleCard>
            <ExampleCard title="Basic xSmall-sized Chiclet" isOptIn={true} code={ChicletXsmallExampleCode}>
              <ChicletXsmallExample />
            </ExampleCard>
            <ExampleCard title="xSmall-sized Chiclet with Footer" isOptIn={true} code={ChicletXsmallFooterExampleCode}>
              <ChicletXsmallFooterExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Chiclet/Chiclet.types.ts')]} />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to represent an item in a card with relevant metadata.</li>
            </ul>
          </div>
        }
        donts={
          // @todo: fill in description
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
