import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

const AnchorLink = (props: LinkProps & { as?: 'a' }) => <Link {...props} href="https://www.bing.com" />;
const ButtonLink = (props: LinkProps) => <Link {...props} />;

storiesOf('Link Converged - Rendered as anchor', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('.fui-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        // This needs to be added so that the focus outline is shown correctly
        .executeScript(
          "document.getElementsByClassName('fui-FluentProvider')[0].setAttribute('data-keyboard-nav', true)",
        )
        .focus('.fui-Link')
        .snapshot('focused', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('fui-FluentProvider')[0].removeAttribute('data-keyboard-nav')")
        .mouseDown('.fui-Link')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.fui-Link')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive('Stand-alone', () => <AnchorLink>Stand-alone link</AnchorLink>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStoryInteractive(
    'Stand-alone Disabled Focusable',
    () => (
      <AnchorLink disabled disabledFocusable>
        Stand-alone disabled focusable link
      </AnchorLink>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStoryInteractive(
    'Inline',
    () => (
      <div>
        This is <AnchorLink inline>a link</AnchorLink> used alongside other text content.
      </div>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Inline Disabled Focusable', () => (
    <div>
      This is{' '}
      <AnchorLink inline disabled disabledFocusable>
        a disabled focusable link
      </AnchorLink>{' '}
      used alongside other text content.
    </div>
  ));

// We put the disabled stories separately so they do not error on the focused step.
storiesOf('Link Converged - Rendered as anchor', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('.fui-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.fui-Link')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.fui-Link')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive('Stand-alone Disabled', () => <AnchorLink disabled>Stand-alone disabled link</AnchorLink>)
  .addStoryInteractive('Inline Disabled', () => (
    <div>
      This is{' '}
      <AnchorLink inline disabled>
        a disabled link
      </AnchorLink>{' '}
      used alongside other text content.
    </div>
  ));

storiesOf('Link Converged - Rendered as button', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('.fui-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        // This needs to be added so that the focus outline is shown correctly
        .executeScript(
          "document.getElementsByClassName('fui-FluentProvider')[0].setAttribute('data-keyboard-nav', true)",
        )
        .focus('.fui-Link')
        .snapshot('focused', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('fui-FluentProvider')[0].removeAttribute('data-keyboard-nav')")
        .mouseDown('.fui-Link')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.fui-Link')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive('Stand-alone', () => <ButtonLink>Stand-alone link</ButtonLink>, { includeRtl: true })
  .addStoryInteractive('Stand-alone Disabled Focusable', () => (
    <ButtonLink disabled disabledFocusable>
      Stand-alone disabled focusable link
    </ButtonLink>
  ))
  .addStoryInteractive(
    'Inline',
    () => (
      <div>
        This is <ButtonLink inline>a link</ButtonLink> used alongside other text content.
      </div>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Inline Disabled Focusable', () => (
    <div>
      This is{' '}
      <ButtonLink inline disabled disabledFocusable>
        a disabled focusable link
      </ButtonLink>{' '}
      used alongside other text content.
    </div>
  ));

// We put the disabled stories separately so they do not error on the focused step.
storiesOf('Link Converged - Rendered as button', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('.fui-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.fui-Link')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.fui-Link')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive('Stand-alone Disabled', () => <ButtonLink disabled>Stand-alone disabled link</ButtonLink>)
  .addStoryInteractive('Inline Disabled', () => (
    <div>
      This is{' '}
      <ButtonLink inline disabled>
        a disabled link
      </ButtonLink>{' '}
      used alongside other text content.
    </div>
  ));
