import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';
import { FluentProviderDecorator } from '../utilities/index';

const AnchorLink = (props: LinkProps) => <Link {...props} href="https://www.bing.com" />;
const ButtonLink = (props: LinkProps) => <Link {...props} />;

storiesOf('Link Next - Rendered as anchor', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('a')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('a')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('a')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Stand-alone', () => <AnchorLink>Stand-alone link</AnchorLink>)
  .addStory('Stand-alone Disabled', () => (
    <AnchorLink disabled>Stand-alone disabled link</AnchorLink>
  ))
  .addStory('Stand-alone Disabled Focusable', () => (
    <AnchorLink disabled disabledFocusable>
      Stand-alone disabled focusable link
    </AnchorLink>
  ))
  .addStory('Inline', () => (
    <div>
      This is <AnchorLink inline>a link</AnchorLink> used alongside other text content.
    </div>
  ))
  .addStory('Inline Disabled', () => (
    <div>
      This is{' '}
      <AnchorLink inline disabled>
        a disabled link
      </AnchorLink>{' '}
      used alongside other text content.
    </div>
  ))
  .addStory('Inline Disabled Focusable', () => (
    <div>
      This is{' '}
      <AnchorLink inline disabled disabledFocusable>
        a disabled focusable link
      </AnchorLink>{' '}
      used alongside other text content.
    </div>
  ));

storiesOf('Link Next - Rendered as button', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Stand-alone', () => <ButtonLink>Stand-alone link</ButtonLink>)
  .addStory('Stand-alone Disabled', () => (
    <ButtonLink disabled>Stand-alone disabled link</ButtonLink>
  ))
  .addStory('Stand-alone Disabled Focusable', () => (
    <ButtonLink disabled disabledFocusable>
      Stand-alone disabled focusable link
    </ButtonLink>
  ))
  .addStory('Inline', () => (
    <div>
      This is <ButtonLink inline>a link</ButtonLink> used alongside other text content.
    </div>
  ))
  .addStory('Inline Disabled', () => (
    <div>
      This is{' '}
      <ButtonLink inline disabled>
        a disabled link
      </ButtonLink>{' '}
      used alongside other text content.
    </div>
  ))
  .addStory('Inline Disabled Focusable', () => (
    <div>
      This is{' '}
      <ButtonLink inline disabled disabledFocusable>
        a disabled focusable link
      </ButtonLink>{' '}
      used alongside other text content.
    </div>
  ));
