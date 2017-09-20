import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SliderBasicExample } from './examples/Slider.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.Props';
import { SliderStatus } from './Slider.checklist';

const SliderBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Slider/examples/Slider.Basic.Example.tsx') as string;

export class SliderPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title={ 'Slider' }
        componentName='SliderExample'
        exampleCards={
          <ExampleCard title={ 'Slider' } code={ SliderBasicExampleCode }>
            <SliderBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Slider/Slider.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Slider is an element used to set a value. It provides a visual indication of adjustable content, as well as the current setting in the total range of content. It is displayed as a horizontal track with options on either side. A knob or lever is dragged to one end or the other to make the choice, indicating the current value. Marks on the Slider bar can show values and users can choose where they want to drag the knob or lever to set the value.
            </p>
            <p>
              A Slider is a good choice when you know that users think of the value as a relative quantity, not a numeric value. For example, users think about setting their audio volume to low or medium—not about setting the value to two or five.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Consider a Slider when changing a value.</li>
              <li>Use a slider when you want your users to be able to set defined values (such as volume or brightness).</li>
              <li>Include a label indicating what value the Slider changes.</li>
              <li>Use step points (or tick marks) if you don’t want the Slider to allow arbitrary values between min and max. </li>
              <li>Use a Slider when the user would benefit from instant feedback on the effect of setting changes. </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use a Slider when the options are not values.</li>
              <li>Don’t use a Slider for binary settings.</li>
              <li>Don’t create a continuous Slider if the range of values is large.</li>
              <li>Don’t use for a range of three values or less.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...SliderStatus}
          />
        }
      />
    );
  }
}
