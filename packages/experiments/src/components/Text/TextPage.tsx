import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { TextAttributesExample } from './examples/Text.Attributes.Example';
const TextAttributesExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Text/examples/Text.Attributes.Example.tsx') as string;
import { TextFontStyleExample } from './examples/Text.FontStyle.Example';
const TextFontStyleExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Text/examples/Text.FontStyle.Example.tsx') as string;
import { TextFontTypeExample } from './examples/Text.FontType.Example';
const TextFontTypeExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Text/examples/Text.FontType.Example.tsx') as string;

export class TextPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Text"
        componentName="Text"
        exampleCards={
          <div>
            <ExampleCard title="Change Text's Attributes" code={TextAttributesExampleCode}>
              <TextAttributesExample />
            </ExampleCard>
            <ExampleCard title="Change Text's Style" code={TextFontStyleExampleCode}>
              <TextFontStyleExample />
            </ExampleCard>
            <ExampleCard title="Change Text's Type" code={TextFontTypeExampleCode}>
              <TextFontTypeExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Text/Text.tsx')]}
          />
        }
        overview={<div />}
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
