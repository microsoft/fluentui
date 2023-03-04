import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SliderExample } from './Slider.Example';
const SliderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Slider/Slider.Example.tsx') as string;

import { SliderVerticalExample } from './Slider.Vertical.Example';
const SliderVerticalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Slider/Slider.Vertical.Example.tsx') as string;

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
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Slider/Slider.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
