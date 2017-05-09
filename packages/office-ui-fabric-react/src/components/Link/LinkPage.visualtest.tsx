import { Link } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class LinkVPage extends React.Component<any, any> {
  public render() {
    return <div >

      <Link className='myLink' href='http://bing.com'>it renders as an anchor tag.</Link>
      <Link disabled={ true } className='myLinkDisabled' href='http://bing.com'>disabled link</Link>.
    </div>;
  }
}