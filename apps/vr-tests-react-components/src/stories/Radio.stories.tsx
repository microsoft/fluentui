import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { AirplaneFilled } from '@fluentui/react-icons';
import { Radio, RadioGroup } from '@fluentui/react-radio';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Radio Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('input')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('unchecked', () => <Radio label="Unchecked" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('checked', () => <Radio checked label="Checked" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('disabled', () => <Radio disabled label="Disabled" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('indicator+checked', () => <Radio checked indicator={<AirplaneFilled />} label="Custom indicator" />);

storiesOf('Radio Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('disabled+checked', () => <Radio disabled checked label="Disabled checked" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('indicator+unchecked', () => <Radio indicator={<AirplaneFilled />} label="Custom indicator" />)
  .addStory('no-label', () => <Radio />, { includeRtl: true })
  .addStory('label-after', () => <Radio labelPosition="after" label="Label after" />, { includeRtl: true })
  .addStory('label-below', () => <Radio labelPosition="below" label="Label below" />, { includeRtl: true })
  .addStory(
    'label-wrapping',
    () => (
      <Radio
        label={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua
          </>
        }
      />
    ),
    { includeRtl: true },
  )
  .addStory('required', () => <Radio required label="Required" />, { includeRtl: true })
  //
  // RadioGroup
  //
  .addStory(
    'group-vertical',
    () => (
      <RadioGroup defaultValue="A">
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
    ),
    { includeRtl: true },
  )
  .addStory(
    'group-horizontal',
    () => (
      <RadioGroup value="A" layout="horizontal">
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
    ),
    { includeRtl: true },
  )
  .addStory(
    'group-horizontal-stacked',
    () => (
      <RadioGroup layout="horizontal-stacked">
        <Radio value="A" label="Option A" defaultChecked />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
    ),
    { includeRtl: true },
  )
  .addStory(
    'group-disabled',
    () => (
      <RadioGroup disabled value="A">
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
      </RadioGroup>
    ),
    { includeRtl: true },
  );
