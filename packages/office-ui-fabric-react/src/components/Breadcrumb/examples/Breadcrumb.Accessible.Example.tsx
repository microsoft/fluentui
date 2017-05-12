/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Breadcrumb, IBreadcrumbItem
} from 'office-ui-fabric-react/lib/Breadcrumb';

import {
  autobind
} from '../../../Utilities';

import { Link } from 'office-ui-fabric-react/lib/Link';

export class BreadcrumbAccessibleExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Breadcrumb
          items={ [
            { text: 'Main Page', 'key': 'p1', onClick: this._onBreadcrumbItemClicked },
            { text: 'Second Page', 'key': 'p2', onClick: this._onBreadcrumbItemClicked },
            { text: 'Current Page', 'key': 'p3', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ] }
          navigationLandmarkAriaLabel={'Website breadcrumb'}/>
      </div>
    );
  }

  @autobind
  private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  }

}
