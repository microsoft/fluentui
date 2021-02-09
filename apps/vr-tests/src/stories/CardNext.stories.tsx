import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Card } from '@fluentui/react-cards/lib/next';
import { withCompatThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities/index';

function onClick() {
  console.log('Card was clicked');
}

storiesOf('Card Next', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Card')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Card')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Card')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Card>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ))
  .addStory('Clickable', () => (
    <Card onClick={onClick}>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ))
  .addStory('Compact', () => (
    <Card compact>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ))
  .addStory('Disabled', () => (
    <Card disabled>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ))
  .addStory('Selected', () => (
    <Card selected>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ));

storiesOf('Card Next - Block', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Card')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Card')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Card')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Card block>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  ));
