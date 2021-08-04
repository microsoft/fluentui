import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';
import { Text } from '@fluentui/react-text';
import { FluentProviderDecorator } from '../utilities/index';

storiesOf('react-text Text', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '50px' }}>
        {story()}
      </div>
    </Screener>
  ))
  .addStory('Default', () => <Text>Hello, world</Text>)
  .addStory('No wrap', () => <Text wrap={false}>Hello, world</Text>)
  .addStory('Truncated', () => (
    <Text block wrap={false} truncate>
      Hello, world
    </Text>
  ))
  .addStory('Italic', () => <Text italic>Hello, world</Text>)
  .addStory('Underline', () => <Text underline>Hello, world</Text>)
  .addStory('Strikethrough', () => <Text strikethrough>Hello, world</Text>)
  .addStory('Sizes', () => (
    <>
      <Text block size={100}>
        100
      </Text>
      <Text block size={200}>
        200
      </Text>
      <Text block size={300}>
        300
      </Text>
      <Text block size={400}>
        400
      </Text>
      <Text block size={500}>
        500
      </Text>
      <Text block size={600}>
        600
      </Text>
      <Text block size={700}>
        700
      </Text>
      <Text block size={800}>
        800
      </Text>
      <Text block size={900}>
        900
      </Text>
      <Text block size={1000}>
        1000
      </Text>
    </>
  ))
  .addStory('Fonts', () => (
    <>
      <Text block font="base">
        Base
      </Text>
      <Text block font="monospace">
        Monospace
      </Text>
      <Text block font="numeric">
        Numeric
      </Text>
    </>
  ))
  .addStory('Weights', () => (
    <>
      <Text block weight="regular">
        Regular
      </Text>
      <Text block weight="medium">
        Medium
      </Text>
      <Text block weight="semibold">
        Semibold
      </Text>
    </>
  ))
  .addStory('Alignments', () => (
    <>
      <Text block align="start">
        Start
      </Text>
      <Text block align="center">
        Center
      </Text>
      <Text block align="end">
        End
      </Text>
      <Text block align="justify">
        J u s t i f i e d element
      </Text>
    </>
  ));
