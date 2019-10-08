import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';

export const BreadcrumbStaticExample: React.FunctionComponent = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <Breadcrumb
        items={[
          { text: 'Not a link', key: 'Files' },
          { text: 'Link', key: 'f1', onClick: _onBreadcrumbItemClicked },
          { text: 'Link', key: 'f2', onClick: _onBreadcrumbItemClicked },
          { text: 'Not a link', key: 'f3' },
          { text: 'Link', key: 'f4', onClick: _onBreadcrumbItemClicked },
          {
            text: 'Link',
            key: 'f5',
            onClick: _onBreadcrumbItemClicked,
            isCurrentItem: true
          }
        ]}
        // Returning undefined to OnReduceData tells the breadcrumb not to shrink
        onReduceData={_returnUndefined}
        maxDisplayedItems={3}
        ariaLabel={'Breadcrumb with static width'}
        overflowAriaLabel={'More items'}
      />
    </div>
  );
};

function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}

const _returnUndefined = () => undefined;
