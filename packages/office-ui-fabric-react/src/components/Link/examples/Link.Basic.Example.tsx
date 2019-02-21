// @codepen
import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import './Link.Example.scss';

export class LinkBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-LinkExample">
        <span>When a link has an href, </span>
        <Link href="http://dev.office.com/fabric/components/link">it renders as an anchor tag.</Link>
        <span> Without an href, </span>
        <Link>the link is rendered as a button</Link>.<span> You can also use the disabled attribute to create a </span>
        <Link disabled={true} href="http://dev.office.com/fabric/components/link">
          disabled link.
        </Link>
        <span>
          {' '}
          Example of a Link with <Link href="http://dev.office.com/fabric/components/link">mixed link content that wraps.</Link>
        </span>
        <br />
        <br />
        It's not recommended to use Links with imgs because Links are meant to render textual inline content. Buttons are inline-block or in
        the case of imgs, block. However, it is possible to create a linked image button by making a button with an unstyled variant and
        adding the img content and href source to that.
      </div>
    );
  }
}
