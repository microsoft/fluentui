import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Radio, RadioGroup } from '@fluentui/react-radio';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Radio Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'Radio',
    () => (
      <>
        <Radio label="Unchecked" />
        <Radio label="Checked" checked />
        <Radio label="Required" required />
        <Radio label="Disabled" disabled />
        <Radio label="Disabled checked" disabled checked />
        <Radio label="Disabled checked" disabled checked />
        <Radio label="Label after" labelPosition="after" />
        <Radio label="Label below" labelPosition="below" />
        <Radio
          label={
            <>
              Label wrapping - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua
            </>
          }
        />
      </>
    ),
    {
      includeDarkMode: true,
      includeHighContrast: true,
      includeRtl: true,
    },
  )
  .addStory('Radio Group', () => (
    <>
      <h3>Horizontal</h3>
      <RadioGroup value="A" layout="horizontal">
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
      <h3>Horizontal stacked</h3>
      <RadioGroup layout="horizontalStacked">
        <Radio value="A" label="Option A" defaultChecked />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
      <h3>Disabled</h3>
      <RadioGroup disabled value="A">
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
    </>
  ));
