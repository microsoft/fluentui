import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';
import {
  Body,
  Caption,
  Display,
  Headline,
  LargeTitle,
  Subheadline,
  Title1,
  Title2,
  Title3,
} from '@fluentui/react-text';
import { FluentProviderDecorator } from '../utilities/index';

storiesOf('react-text Typography wrappers', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper">{story()}</div>
    </Screener>
  ))
  .addStory('Display', () => <Display>Display</Display>)
  .addStory('Large Title', () => <LargeTitle>LargeTitle</LargeTitle>)
  .addStory('Title 1', () => <Title1>Title1</Title1>)
  .addStory('Title 2', () => <Title2>Title2</Title2>)
  .addStory('Title 3', () => <Title3>Title3</Title3>)
  .addStory('Headline', () => <Headline>Headline</Headline>)
  .addStory('Subheadline', () => <Subheadline>Subheadline</Subheadline>)
  .addStory('Body', () => <Body>Body</Body>)
  .addStory('Caption', () => <Caption>Caption</Caption>);
