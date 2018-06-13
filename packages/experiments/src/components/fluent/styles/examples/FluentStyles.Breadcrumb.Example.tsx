import * as React from 'react';
import { Breadcrumb } from 'office-ui-fabric-react';
import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/components/Breadcrumb/Breadcrumb.types';

export class FluentStylesBreadcrumbExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Breadcrumb
          items={[
            { text: 'Files', key: 'Files', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
            {
              text: 'This is link 1',
              key: 'l1',
              href: '#/examples/breadcrumb',
              onClick: this._onBreadcrumbItemClicked
            },
            {
              text: 'This is link 2',
              key: 'l2',
              href: '#/examples/breadcrumb',
              onClick: this._onBreadcrumbItemClicked
            },
            {
              text: 'This is link 3 with a long name',
              key: 'l3',
              href: '#/examples/breadcrumb',
              onClick: this._onBreadcrumbItemClicked
            },
            {
              text: 'This is link 4',
              key: 'l4',
              href: '#/examples/breadcrumb',
              onClick: this._onBreadcrumbItemClicked
            },
            {
              text: 'This is link 5',
              key: 'l5',
              href: '#/examples/breadcrumb',
              onClick: this._onBreadcrumbItemClicked,
              isCurrentItem: true
            }
          ]}
          maxDisplayedItems={3}
          ariaLabel={'Website breadcrumb'}
        />
      </div>
    );
  }
  private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  };
}
