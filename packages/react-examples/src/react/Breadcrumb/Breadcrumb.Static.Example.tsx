import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';

const items: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 2 with a long name', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 3 long', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'This is non-clickable folder 4', key: 'f4' },
  { text: 'This is folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },
];

export const BreadcrumbStaticExample: React.FunctionComponent = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <Breadcrumb
        items={items}
        // Returning undefined to OnReduceData tells the breadcrumb not to shrink
        onReduceData={_returnUndefined}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with static width"
        overflowAriaLabel="More items"
      />
    </div>
  );
};

function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}

const _returnUndefined = () => undefined;
