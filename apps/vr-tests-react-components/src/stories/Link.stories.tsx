import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

const AnchorLink = (props: LinkProps & { as?: 'a' }) => <Link {...props} href="https://www.bing.com" />;
const ButtonLink = (props: LinkProps) => <Link {...props} />;

storiesOf('Link Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'As anchor',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnchorLink>Stand-alone link</AnchorLink>
        <AnchorLink disabled>Stand-alone link disabled</AnchorLink>
        <AnchorLink disabled disabledFocusable>
          Stand-alone link disabled focusable
        </AnchorLink>
        <div>
          This is <AnchorLink inline>an inline link</AnchorLink> used alongside other text
        </div>
        <div>
          This is{' '}
          <AnchorLink inline disabled>
            a disabled link
          </AnchorLink>{' '}
          used alongside other text content.
        </div>
        <div>
          This is{' '}
          <AnchorLink inline disabled disabledFocusable>
            a disabled focusable link
          </AnchorLink>{' '}
          used alongside other text content.
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'As button',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ButtonLink>Stand-alone link</ButtonLink>
        <ButtonLink disabled>Stand-alone link disabled</ButtonLink>
        <ButtonLink disabled disabledFocusable>
          Stand-alone link disabled focusable
        </ButtonLink>
        <div>
          This is <ButtonLink inline>an inline link</ButtonLink> used alongside other text
        </div>
        <div>
          This is
          <ButtonLink inline disabled>
            a disabled link
          </ButtonLink>
          used alongside other text content.
        </div>
        <div>
          This is{' '}
          <ButtonLink inline disabled disabledFocusable>
            a disabled focusable link
          </ButtonLink>{' '}
          used alongside other text content.
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
