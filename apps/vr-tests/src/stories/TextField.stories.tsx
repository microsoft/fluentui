import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/index';
import { TextField } from '@fluentui/react';

storiesOf('TextField', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-TextField-field')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-TextField-field')
        .hover('.ms-TextField-field')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => <TextField label="Standard" />)
  .addStory('Placeholder', () => <TextField label="Standard" placeholder="Placeholder" />, {
    includeRtl: true,
  })
  .addStory('Disabled', () => <TextField label="Disabled" disabled />)
  .addStory('Required', () => <TextField label="Required" required />)
  .addStory('Error', () => <TextField label="Error" errorMessage="Error message" />, {
    includeRtl: true,
  })
  .addStory('Multiline', () => <TextField label="Multiline" multiline rows={4} />, {
    includeRtl: true,
  })
  .addStory('Multiline nonresizable', () => (
    <TextField label="Multiline" multiline rows={4} resizable={false} />
  ))
  .addStory('Underlined', () => <TextField label="Underlined" underlined />)
  .addStory('Borderless', () => (
    <TextField label="Borderless" borderless placeholder="Placeholder text" />
  ))
  .addStory(
    'Icon',
    () => (
      <TextField
        styles={{ icon: { color: 'green' } }}
        label="Green styled icon"
        iconProps={{ iconName: 'Calendar' }}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Prefix with Value, Disabled, and Prefix Style-Override',
    () => (
      <TextField
        label="Green styled prefix"
        prefix="https://"
        defaultValue="example.com"
        styles={{ prefix: { color: 'green' } }}
        disabled
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Prefix with Value, Disabled',
    () => <TextField label="Prefix" prefix="https://" defaultValue="example.com" disabled />,
    {
      includeRtl: true,
    },
  )
  .addStory('Suffix', () => <TextField label="Suffix" suffix=".com" />, {
    includeRtl: true,
  });
