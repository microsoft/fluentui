import * as React from 'react';
import { Link, LinkProps } from './index';

const flexStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const innerFlexStyles: React.CSSProperties = {
  ...flexStyles,
  gap: 10,
};

const LinkExamples = (props: LinkProps) => (
  <div style={innerFlexStyles}>
    <div>
      <Link {...props}>Stand-alone link</Link>
    </div>
    <div>
      <Link {...props} secondary>
        Standalone secondary link
      </Link>
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
      <Link {...props} inline secondary>
        a secondary link
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
  </div>
);

const outerFlexStyles: React.CSSProperties = {
  ...flexStyles,
  gap: 25,
};

export const Links = () => (
  <div style={outerFlexStyles}>
    <div>
      <h3>Links with an href render as an anchor</h3>
      <LinkExamples href="https://www.bing.com" />
    </div>
    <div>
      <h3>Links without an href render as a button</h3>
      <LinkExamples />
    </div>
  </div>
);

export default {
  title: 'Components/Link',
  component: Link,
};
