import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';

const labelStyles: Partial<ILabelStyles> = {
  root: { margin: '10px 0', selectors: { '&:not(:first-child)': { marginTop: 24 } } }
};

const items: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 2 with a long name', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 3 long', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'This is non-clickable folder 4', key: 'f4' },
  { text: 'This is folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true }
];

export const BreadcrumbCollapsingExample: React.FunctionComponent = () => {
  return (
    <div>
      <Label styles={labelStyles}>With no maxDisplayedItems</Label>
      <Breadcrumb items={items} ariaLabel="Breadcrumb with no maxDisplayedItems" overflowAriaLabel="More links" />

      <Label styles={labelStyles}>With maxDisplayedItems set to 3</Label>
      <Breadcrumb
        items={items}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with maxDisplayedItems set to 3"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With maxDisplayedItems set to 2 and overflowIndex set to 1 (second element)</Label>
      <Breadcrumb
        items={items}
        maxDisplayedItems={2}
        overflowIndex={1}
        ariaLabel="Breadcrumb with maxDisplayedItems set to 2 and overflowIndex set to 1"
        overflowAriaLabel="More links"
      />
    </div>
  );
};

function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}
