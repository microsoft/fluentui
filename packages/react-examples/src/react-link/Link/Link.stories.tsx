import * as React from 'react';
import { Stack, IStackTokens, Text } from '@fluentui/react';
import { Link, LinkProps } from '@fluentui/react-link';

const linksStackTokens: IStackTokens = {
  childrenGap: 10,
};

const LinkExamples = (props: LinkProps) => (
  <Stack tokens={linksStackTokens}>
    <div>
      <Link {...props}>Stand-alone link</Link>
    </div>
    <div>
      <Link {...props} disabled>
        Stand-alone disabled link
      </Link>
    </div>
    <div>
      <Link {...props} disabled disabledFocusable>
        Stand-alone disabled focusable link
      </Link>
    </div>
    <div>
      This is{' '}
      <Link {...props} inline>
        a link
      </Link>{' '}
      used alongside other text content.
    </div>
    <div>
      This is{' '}
      <Link {...props} inline disabled>
        a disabled link
      </Link>{' '}
      used alongside other text content.
    </div>
    <div>
      This is{' '}
      <Link {...props} inline disabled disabledFocusable>
        a disabled focusable link
      </Link>{' '}
      used alongside other text content.
    </div>
  </Stack>
);

const examplesStackTokens: IStackTokens = {
  childrenGap: 20,
};

export const Links = () => (
  <Stack tokens={examplesStackTokens}>
    <Text variant="xLarge">Links with an href render as an anchor</Text>
    <LinkExamples href="https://www.bing.com" />

    <Text variant="xLarge">Links without an href render as a button</Text>
    <LinkExamples />
  </Stack>
);
