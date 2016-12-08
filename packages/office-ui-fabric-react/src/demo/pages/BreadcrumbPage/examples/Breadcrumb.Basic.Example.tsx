/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Breadcrumb, IBreadcrumbItem
} from '../../../../Breadcrumb';

export class BreadcrumbBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this._onBreadcrumbItemClicked = this._onBreadcrumbItemClicked.bind(this);
  }

  public render() {
    return (
      <Breadcrumb
        items={ [
          {text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked},
          {text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked},
          {text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked},
          {text: 'This is folder 3', 'key': 'f3', onClick: this._onBreadcrumbItemClicked},
          {text: 'This is folder 4', 'key': 'f4', onClick: this._onBreadcrumbItemClicked},
          {text: 'This is folder 5', 'key': 'f5', onClick: this._onBreadcrumbItemClicked},
        ] }
        maxDisplayedItems={ 3 } />
    );
  }

  private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
    console.log(`Breadcrumb item with key "${ item.key }" has been clicked.`);
  }

}
