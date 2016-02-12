import * as React from 'react';
import Breadcrumb from '../../../../components/Breadcrumb';

export default class BreadcrumbExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='BreadcrumbExample'>
        <h1>Breadcrumb</h1>

        <Breadcrumb>I'm a Breadcrumb</Breadcrumb>
      </div>
    );
  }

}
