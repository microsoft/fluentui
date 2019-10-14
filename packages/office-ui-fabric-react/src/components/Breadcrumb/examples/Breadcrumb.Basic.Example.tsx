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
const itemsWithHref: IBreadcrumbItem[] = [
  // Normally each breadcrumb would have a unique href, but to make the navigation less disruptive
  // in the example, it uses the breadcrumb page as the href for all the items
  { text: 'Files', key: 'Files', href: '#/controls/web/breadcrumb' },
  { text: 'This is folder 1', key: 'f1', href: '#/controls/web/breadcrumb' },
  { text: 'This is folder 2 with a long name', key: 'f2', href: '#/controls/web/breadcrumb' },
  { text: 'This is folder 3 long', key: 'f3', href: '#/controls/web/breadcrumb' },
  { text: 'This is non-clickable folder 4', key: 'f4' },
  { text: 'This is folder 5', key: 'f5', href: '#/controls/web/breadcrumb', isCurrentItem: true }
];
const itemsWithHeading: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
  // Generally, only the last item should ever be a heading.
  // It would typically be h1 or h2, but we're using h4 here to better fit the structure of the page.
  { text: 'This is folder 2', key: 'd2', isCurrentItem: true, as: 'h4' }
];

export const BreadcrumbBasicExample: React.FunctionComponent = () => {
  return (
    <div>
      <Label styles={labelStyles}>With no maxDisplayedItems, and items rendered as buttons</Label>
      <Breadcrumb
        items={items}
        ariaLabel="Breadcrumb with no maxDisplayedItems, and items rendered as buttons"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With maxDisplayedItems set to 3, and items rendered as links</Label>
      <Breadcrumb
        items={itemsWithHref}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with maxDisplayedItems set to 3, and items rendered as links"
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
      <Breadcrumb items={itemsWithHeading} ariaLabel="With last item rendered as heading" overflowAriaLabel="More links" />

      <Label styles={labelStyles}>With custom rendered divider and overflow icon</Label>
      <Breadcrumb
        items={itemsWithHeading}
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
