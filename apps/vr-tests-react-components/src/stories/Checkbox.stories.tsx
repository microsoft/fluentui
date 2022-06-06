import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@fluentui/react-checkbox';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Checkbox Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('input')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('unchecked', () => <Checkbox label="Unchecked" />)
  .addStory('checked', () => <Checkbox checked label="Checked" />)
  .addStory('mixed', () => <Checkbox checked="mixed" label="Mixed" />)
  .addStory('disabled', () => <Checkbox disabled label="Disabled" />);

storiesOf('Checkbox Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('disabled+checked', () => <Checkbox disabled checked label="Disabled checked" />)
  .addStory('disabled+mixed', () => <Checkbox disabled checked="mixed" label="Disabled mixed" />)
  .addStory('no-label', () => <Checkbox />)
  .addStory('label-before', () => <Checkbox labelPosition="before" label="Label before" />)
  .addStory('label-wrapping', () => (
    <Checkbox
      label={
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua
        </>
      }
    />
  ))
  .addStory('required', () => <Checkbox required label="Required" />)
  .addStory('required+label-before', () => (
    <Checkbox required labelPosition="before" label="Required with label before" />
  ))
  .addStory('circular', () => <Checkbox shape="circular" label="Circular" />)
  .addStory('circular+checked', () => <Checkbox shape="circular" checked label="Circular checked" />)
  .addStory('circular+mixed', () => <Checkbox shape="circular" checked="mixed" label="Circular mixed" />)
  //
  // large variants
  //
  .addStory('large', () => <Checkbox size="large" label="Large" />)
  .addStory('large+checked', () => <Checkbox size="large" checked label="Large checked" />)
  .addStory('large+mixed', () => <Checkbox size="large" checked="mixed" label="Large mixed" />)
  .addStory('large+circular', () => <Checkbox size="large" shape="circular" label="Large circular" />)
  .addStory('large+circular+checked', () => (
    <Checkbox size="large" shape="circular" checked label="Large circular checked" />
  ))
  .addStory('large+circular+mixed', () => (
    <Checkbox size="large" shape="circular" checked="mixed" label="Large circular mixed" />
  ))
  .addStory('large+label-wrapping', () => (
    <Checkbox
      size="large"
      label={
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua
        </>
      }
    />
  ));
