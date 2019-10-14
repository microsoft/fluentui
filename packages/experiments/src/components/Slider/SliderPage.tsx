import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, Markdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { SliderExample } from './examples/Slider.Example';
const SliderExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Slider/examples/Slider.Example.tsx') as string;

import { SliderVerticalExample } from './examples/Slider.Vertical.Example';
const SliderVerticalExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Slider/examples/Slider.Vertical.Example.tsx') as string;

export class SliderPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Slider"
        componentName=" Slider"
        exampleCards={
          <div>
            <ExampleCard title="Horizontal Sliders" code={SliderExampleCode}>
              <SliderExample />
            </ExampleCard>
            <ExampleCard title="Vertical Sliders" code={SliderVerticalExampleCode}>
              <SliderVerticalExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Slider/Slider.types.ts')]} />
        }
        overview={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Slider/docs/SliderOverview.md')}</Markdown>}
        bestPractices={<div />}
        dos={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Slider/docs/SliderDos.md')}</Markdown>}
        donts={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Slider/docs/SliderDonts.md')}</Markdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
