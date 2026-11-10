import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { LayoutGroupBasicExample } from './LayoutGroup.Basic.Example';
import type { JSXElement } from '@fluentui/utilities';
const LayoutGroupBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/LayoutGroup/LayoutGroup.Basic.Example.tsx') as string;

export class LayoutGroupPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSXElement {
    return (
      <ComponentPage
        title="LayoutGroup"
        componentName="LayoutGroup"
        exampleCards={
          <div>
            <ExampleCard title="Layout Group" isOptIn={true} code={LayoutGroupBasicExampleCode}>
              <LayoutGroupBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/LayoutGroup/LayoutGroup.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
