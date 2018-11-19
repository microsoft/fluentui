// @codepen
import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';

export class BreadcrumbStaticExample extends React.Component {
  public render(): JSX.Element {
    return (
      <div style={{ display: 'inline-block' }}>
        <Breadcrumb
          items={[
            { text: 'Files', key: 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', key: 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', key: 'f2', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 3', key: 'f3', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 4', key: 'f4', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 5', key: 'f5', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ]}
          // Returning undefined to OnReduceData tells the breadcrumb not to shrink
          onReduceData={this._returnUndefined}
          maxDisplayedItems={3}
          ariaLabel={'Breadcrumb with static width'}
          overflowAriaLabel={'More items'}
        />
      </div>
    );
  }

  private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  };

  private _returnUndefined(): undefined {
    return undefined;
  }
}
