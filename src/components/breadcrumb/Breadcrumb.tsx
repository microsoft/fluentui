import * as React from 'react';
import './Breadcrumb.scss';

export interface IBreadcrumbProps {
}

export default class Breadcrumb extends React.Component<IBreadcrumbProps, any> {
    render() {
      return (
        <div className="ms-Breadcrumb">
          <span className="ms-Breadcrumb-currentLarge">Working files</span>
          <a href="#" className="ms-Breadcrumb-parent">OneDrive @ Contoso</a>
          <span className="ms-Breadcrumb-current">Working files</span>
        </div>
      );
    }
}