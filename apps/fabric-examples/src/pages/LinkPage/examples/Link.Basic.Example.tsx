import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';

export class LinkBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <span>When a link has an href, </span>
        <Link href='http://dev.office.com/fabric/components/link'>it renders as an anchor tag.</Link>
        <span> Without an href, </span>
        <Link>the link is rendered as a button</Link>.
        <span> You can also use the disabled attribute to create a </span>
        <Link disabled={ true } href='http://dev.office.com/fabric/components/link'>disabled link</Link>.
      </div>
    );
  }

}
