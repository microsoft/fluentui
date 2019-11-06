import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, Markdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { CardVerticalExample } from './examples/Card.Vertical.Example';
const CardVerticalExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Vertical.Example.tsx') as string;

import { CardHorizontalExample } from './examples/Card.Horizontal.Example';
const CardHorizontalExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Horizontal.Example.tsx') as string;

import { CardConfigureExample } from './examples/Card.Configure.Example';
const CardConfigureExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Configure.Example.tsx') as string;

export class CardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Card"
        componentName="Card"
        exampleCards={
          <div>
            <ExampleCard title="Vertical Card" code={CardVerticalExampleCode}>
              <CardVerticalExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Card" code={CardHorizontalExampleCode}>
              <CardHorizontalExample />
            </ExampleCard>
            <ExampleCard title="Configure Properties" code={CardConfigureExampleCode}>
              <CardConfigureExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/Card.types.ts')]} />
        }
        overview={<Markdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardOverview.md')}</Markdown>}
        bestPractices={<div />}
        dos={<Markdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDos.md')}</Markdown>}
        donts={<Markdown>{require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDonts.md')}</Markdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
