import * as React from 'react';
import Link from '../../../../components/Link';

export default class LinkExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='LinkExample'>
        <h1 className='ms-font-xxl'>Link</h1>
        <div><Link text='Links' url='http://dev.office.com/fabric/components/link' /> are used as a styled replacement for A tags.</div>
        <h2 className='ms-font-xl'>Examples</h2>

        <div>Insert code example.</div>

        <Link text='Links' url='http://dev.office.com/fabric/components/link' />

      </div>
    );
  }

}
