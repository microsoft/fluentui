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

export class BreadcrumbBasicExample extends React.Component<any, any> {
  constructor() {
    super();
  }

  public render() {
    return (
      <div>
        <Breadcrumb
          items={ [
            { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 3', 'key': 'f3', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 4', 'key': 'f4', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 5', 'key': 'f5', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true },
          ] }
          maxDisplayedItems={ 6 }
          ariaLabel={ 'Website breadcrumb' } />
        <Breadcrumb
          items={ [
            { text: 'Files', 'key': 'Files', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is link 1', 'key': 'l1', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is link 2', 'key': 'l2', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is link 3 with a long name', 'key': 'l3', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is link 4', 'key': 'l4', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is link 5', 'key': 'l5', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true },
          ] }
          maxDisplayedItems={ 3 }
          ariaLabel={ 'Website breadcrumb' } />
      </div>
    );
  }

  @autobind
  private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  }

}
