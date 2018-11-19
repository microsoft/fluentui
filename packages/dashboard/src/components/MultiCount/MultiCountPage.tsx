import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
const MultiCountExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/MultiCount/examples/MultiCount.Example.tsx') as string;

import { MultiCountExample } from './examples/MultiCount.Example';
import { MultiCountVariantExample } from './examples/MultiCountVariant.Example';

export class MultiCountPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    const style = {
      width: '300px'
    };
    return (
      <ComponentPage
        title="Multicount chart"
        componentName="MulticountExample"
        exampleCards={
          <div>
            <ExampleCard title="Multicount" code={MultiCountExampleCode}>
              <div style={style}>
                <MultiCountExample />
              </div>
            </ExampleCard>
            <ExampleCard
              title="Multicount Variant. Multicount accepts font size and color as optional attributes."
              code={MultiCountExampleCode}
            >
              <div style={style}>
                <MultiCountVariantExample />
              </div>
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/MultiCount/MultiCount.types.ts')]}
          />
        }
        overview={
          <div>
            This datviz has bodyText to show the data along with it's description. It also has a annotation text which comes with a icon
            indicating whether the change is positive,negative or nuetral.
          </div>
        }
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
      />
    );
  }
}
