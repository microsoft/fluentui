import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { ChicletBasicExample } from './Chiclet.Basic.Example';
const ChicletBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Basic.Example.tsx') as string;
import { ChicletBreadcrumbExample } from './Chiclet.Breadcrumb.Example';
const ChicletBreadcrumbExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Breadcrumb.Example.tsx') as string;
import { ChicletFooterExample } from './Chiclet.Footer.Example';
const ChicletFooterExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Footer.Example.tsx') as string;
import { ChicletPreviewExample } from './Chiclet.Preview.Example';
const ChicletPreviewExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Preview.Example.tsx') as string;
import { ChicletXsmallExample } from './Chiclet.Xsmall.Example';
const ChicletXsmallExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Xsmall.Example.tsx') as string;
import { ChicletXsmallFooterExample } from './Chiclet.Xsmall.Footer.Example';
const ChicletXsmallFooterExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Chiclet/Chiclet.Xsmall.Footer.Example.tsx') as string;

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
            <ExampleCard
              title="Medium-sized Chiclet with Breadcrumb"
              isOptIn={true}
              code={ChicletBreadcrumbExampleCode}
            >
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
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Chiclet/Chiclet.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
