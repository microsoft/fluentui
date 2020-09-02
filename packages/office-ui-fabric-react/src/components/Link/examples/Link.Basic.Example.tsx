import * as React from 'react';
import { Link, Text } from 'office-ui-fabric-react';

export const LinkBasicExample: React.FunctionComponent = () => {
  return (
    <div>
      <Text>
        When a link has an href,{' '}
        <Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link">
          it renders as an anchor tag.
        </Link>{' '}
        Without an href, <Link>the link is rendered as a button</Link>. You can also use the disabled attribute to
        create a{' '}
        <Link disabled={true} href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link">
          disabled link.
        </Link>
      </Text>
      <Text>
        It's not recommended to use Links with imgs because Links are meant to render textual inline content. Buttons
        are inline-block or in the case of imgs, block. However, it is possible to create a linked image button by
        making a button with an unstyled variant and adding the img content and href source to that.
      </Text>
    </div>
  );
};
