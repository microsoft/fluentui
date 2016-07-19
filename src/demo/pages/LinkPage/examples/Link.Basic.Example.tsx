import * as React from 'react';
import {
  Link
} from '../../../../index';

export class LinkBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Link href='http://dev.office.com/fabric/components/link'>I am a link with an href.</Link>
        <span> Also, </span>
        <Link>i am a link without an href.</Link>
      </div>
    );
  }

}
