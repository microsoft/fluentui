import React from 'react';
import { Link, Text } from '@fluentui/react';

type Props = {};

export const LinkExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Link</div>
      <div className="description">v8: Link --&gt; v9: Link</div>
      <div className="controls column">
        <Text>
          When a link has an href,{' '}
          <Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
            it renders as an anchor tag.
          </Link>{' '}
        </Text>
        <Text>
          Without an href, <Link underline>the link is rendered as a HTML button</Link>
        </Text>
      </div>
    </div>
  );
};
