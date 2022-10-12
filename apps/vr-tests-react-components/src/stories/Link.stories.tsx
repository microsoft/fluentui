import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

const AnchorLink = (props: LinkProps & { as?: 'a' }) => <Link {...props} href="https://www.bing.com" />;

storiesOf('Link Converged - Rendered as anchor', module)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.fui-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        // This needs to be added so that the focus outline is shown correctly
        .executeScript("document.getElementsByClassName('fui-Link')[0].setAttribute('data-fui-focus-visible', '')")
        .focus('.fui-Link')
        .snapshot('focused', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('fui-Link')[0].removeAttribute('data-fui-focus-visible')")
        .mouseDown('.fui-Link')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.fui-Link')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Stand-alone', () => <AnchorLink>Stand-alone link</AnchorLink>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Stand-alone Disabled Focusable',
    () => (
      <AnchorLink disabled disabledFocusable>
        Stand-alone disabled focusable link
      </AnchorLink>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Inline',
    () => (
      <div>
        This is <AnchorLink inline>a link</AnchorLink> used alongside other text content.
      </div>
    ),
    { includeRtl: true },
  )
  .addStory('Inline Disabled Focusable', () => (
    <div>
      This is{' '}
      <AnchorLink inline disabled disabledFocusable>
        a disabled focusable link
      </AnchorLink>{' '}
      used alongside other text content.
    </div>
  ));
