import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: {
    margin: '10px 0',
    selectors: { '&:not(:first-child)': { marginTop: 24 } }
  }
};

const items: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 2 with a long name', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 3 long', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'This is non-clickable folder 4', key: 'f4' },
  { text: 'This is folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true }
];
const itemsWithHeadings: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 2', key: 'd2', isCurrentItem: true, as: 'h4' }
];

export const BreadcrumbBasicExample: React.FunctionComponent = () => {
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

      <Label styles={labelStyles}>With last item rendered as heading</Label>
      <Breadcrumb items={itemsWithHeadings} ariaLabel="With last item rendered as heading" overflowAriaLabel="More links" />

      <Label styles={labelStyles}>With custom rendered divider and overflow icon</Label>
      <Breadcrumb
        items={itemsWithHeadings}
        maxDisplayedItems={3}
        ariaLabel="With custom rendered divider and overflow icon"
        dividerAs={_getCustomDivider}
        onRenderOverflowIcon={_getCustomOverflowIcon}
        overflowAriaLabel="More links"
      />
    </div>
  );
};

function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}

function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
  const tooltipText = dividerProps.item ? dividerProps.item.text : '';
  return (
    <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
      <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
        /
      </span>
    </TooltipHost>
  );
}

function _getCustomOverflowIcon(): JSX.Element {
  return <Icon iconName={'ChevronDown'} />;
}
