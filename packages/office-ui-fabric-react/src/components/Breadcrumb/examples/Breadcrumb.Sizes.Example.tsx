/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Breadcrumb, IBreadcrumbItem, BreadcrumbSize
} from 'office-ui-fabric-react/lib/Breadcrumb';
import {
  autobind
} from '../../../Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export class BreadcrumbSizesExample extends React.Component<any, any> {
  constructor() {
    super();
  }

  public render() {
    return (
      <div>
        <Label
          className={ exampleStyles.exampleLabel }
        >
          Small size
        </Label>
        <Breadcrumb
          items={ [
            { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ] }
          ariaLabel={ 'Website breadcrumb' }
          size={ BreadcrumbSize.small }
        />
        <Label
          className={ exampleStyles.exampleLabel }
          style={ { marginTop: '24px' } }
        >
          Large size
        </Label>
        <Breadcrumb
          items={ [
            { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ] }
          ariaLabel={ 'Website breadcrumb' }
          size={ BreadcrumbSize.large }
        />
        <Label
          className={ exampleStyles.exampleLabel }
          style={ { marginTop: '24px' } }
        >
          XXLarge size
        </Label>
        <Breadcrumb
          items={ [
            { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true },
            { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked }
          ] }
          ariaLabel={ 'Website breadcrumb' }
          size={ BreadcrumbSize.xxlarge }
        />
      </div >
    );
  }

  @autobind
  private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  }

}