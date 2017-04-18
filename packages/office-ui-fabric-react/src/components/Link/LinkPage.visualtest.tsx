import { Link } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class LinkVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { backgroundColor: 'white' } } >
      <Link className='Link' href='http://dev.office.com/fabric/components/link'>It renders as an anchor tag.</Link>
      <Link className='LinkDisabled' disabled={ true } href='http://dev.office.com/fabric/components/link'>Disabled link</Link>.
    </div>;
  }
}