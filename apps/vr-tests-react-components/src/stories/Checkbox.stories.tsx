import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@fluentui/react-checkbox';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Checkbox Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('Disabled', () => (
    <>
      <Checkbox disabled label="Disabled" />
      <Checkbox disabled checked label="Disabled checked" />
      <Checkbox disabled checked="mixed" label="Disabled mixed" />
      <Checkbox size="large" disabled label="Disabled - large" />
      <Checkbox size="large" disabled checked label="Disabled checked - large" />
      <Checkbox size="large" disabled checked="mixed" label="Disabled mixed - large" />
    </>
  ))
  .addStory('Circular', () => (
    <>
      <Checkbox shape="circular" label="Circular" />
      <Checkbox shape="circular" checked label="Circular checked" />
      <Checkbox shape="circular" checked="mixed" label="Circular mixed" />
      <Checkbox size="large" shape="circular" label="Circular- large" />
      <Checkbox size="large" shape="circular" checked label="Circular checked- large" />
      <Checkbox size="large" shape="circular" checked="mixed" label="Circular mixed - large" />
    </>
  ))
  .addStory('Required', () => (
    <>
      <Checkbox required label="Required" />
      <Checkbox required labelPosition="before" label="Required with label before" />
      <Checkbox size="large" required label="Required - large" />
      <Checkbox size="large" required labelPosition="before" label="Required with label before - large" />
    </>
  ))
  .addStory('Default', () => (
    <>
      <Checkbox label="Unchecked" />
      <Checkbox checked label="Checked" />
      <Checkbox checked="mixed" label="Mixed" />
      <Checkbox labelPosition="before" label="Label before" />
      <Checkbox
        label={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua
          </>
        }
      />
      <Checkbox size="large" label="Unchecked - large" />
      <Checkbox size="large" checked label="Checked - large" />
      <Checkbox size="large" checked="mixed" label="Mixed - large" />
      <Checkbox size="large" labelPosition="before" label="Label before - large" />
      <Checkbox
        size="large"
        label={
          <>
            large - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua
          </>
        }
      />
    </>
  ));
