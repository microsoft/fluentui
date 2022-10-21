import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryWright, Steps } from 'storywright';
import {
  Body1,
  Caption1,
  Display,
  Subtitle1,
  LargeTitle,
  Subtitle2,
  Text,
  Title1,
  Title2,
  Title3,
  Caption2,
} from '@fluentui/react-text';

storiesOf('Text Converged', module)
  .addDecorator((story: () => React.ReactNode) => (
    <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '250px' }}>
        {story()}
      </div>
    </StoryWright>
  ))
  .addStory(
    'Default',
    () => (
      <>
        <p>
          <Title3 block>Default</Title3>
          <Text>Lorem ipsum dolor sit amet, nullam rhoncus tristique tellus in Portucale.</Text>
        </p>
        <p>
          <Title3 block>No wrapping</Title3>
          <Text block wrap={false}>
            Lorem ipsum dolor sit amet, nullam rhoncus tristique tellus in Portucale.
          </Text>
        </p>
        <p>
          <Title3 block>Truncate</Title3>
          <Text block wrap={false} truncate>
            Lorem ipsum dolor sit amet, nullam rhoncus tristique tellus in Portucale.
          </Text>
        </p>
        <p>
          <Title3 block>Italic</Title3>
          <Text block italic>
            Hello, world
          </Text>
        </p>
        <p>
          <Title3 block>Underline</Title3>
          <Text block underline>
            Hello, world
          </Text>
        </p>
        <p>
          <Title3 block>Strikethrough</Title3>
          <Text block strikethrough>
            Hello, world
          </Text>
        </p>
        <p>
          <Title3 block>Sizes</Title3>
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
        </p>
        <p>
          <Title3 block>Fonts</Title3>
          <Text block font="base">
            Base
          </Text>
          <Text block font="monospace">
            Monospace
          </Text>
          <Text block font="numeric">
            Numeric
          </Text>
        </p>
        <p>
          <Title3 block>Weights</Title3>
          <Text block weight="regular">
            Regular
          </Text>
          <Text block weight="medium">
            Medium
          </Text>
          <Text block weight="semibold">
            Semibold
          </Text>
        </p>
        <p>
          <Title3 block>Alignments</Title3>
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
            Justified lorem ipsum dolor sit amet, nullam rhoncus tristique tellus in Portucale.
          </Text>
        </p>
      </>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Typography wrappers',
    () => (
      <>
        <Display block>Display</Display>
        <LargeTitle block>LargeTitle</LargeTitle>
        <Title1 block>Title1</Title1>
        <Title2 block>Title2</Title2>
        <Title3 block>Title3</Title3>
        <Subtitle1 block>Subtitle1</Subtitle1>
        <Subtitle2 block>Subtitle2</Subtitle2>
        <Body1 block>Body1</Body1>
        <Caption1 block>Caption1</Caption1>
        <Caption2 block>Caption2</Caption2>
      </>
    ),
    { includeRtl: true },
  );
