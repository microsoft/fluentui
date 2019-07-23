import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: {
    margin: '10px 0',
    selectors: {
      '&:not(:first-child)': { marginTop: 24 }
    }
  }
};

export const BreadcrumbBasicExample: React.FunctionComponent = () => {
  return (
    <div>
      <Label styles={labelStyles}>With no maxDisplayedItems</Label>
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 2 with a long name', key: 'f2', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 3 long', key: 'f3', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 4', key: 'f4', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 5 another', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true }
        ]}
        ariaLabel="Breadcrumb with no maxDisplayedItems"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With Custom Divider Icon</Label>
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 2', key: 'f2', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 3', key: 'f3', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 4', key: 'f4', onClick: _onBreadcrumbItemClicked },
          { text: 'This is folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true }
        ]}
        dividerAs={_getCustomDivider}
        ariaLabel="Breadcrumb with custom divider icon"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With maxDisplayedItems set to three</Label>
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files', href: '#/examples/breadcrumb', onClick: _onBreadcrumbItemClicked },
          {
            text: 'This is link 1',
            key: 'l1',
            href: '#/examples/breadcrumb',
            onClick: _onBreadcrumbItemClicked
          },
          {
            text: 'This is link 2',
            key: 'l2',
            href: '#/examples/breadcrumb',
            onClick: _onBreadcrumbItemClicked
          },
          {
            text: 'This is link 3 with a long name',
            key: 'l3',
            href: '#/examples/breadcrumb',
            onClick: _onBreadcrumbItemClicked
          },
          {
            text: 'This is link 4',
            key: 'l4',
            href: '#/examples/breadcrumb',
            onClick: _onBreadcrumbItemClicked
          },
          {
            text: 'This is link 5',
            key: 'l5',
            href: '#/examples/breadcrumb',
            onClick: _onBreadcrumbItemClicked,
            isCurrentItem: true
          }
        ]}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with maxDisplayedItems set to three"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With maxDisplayedItems set to two and overflowIndex set to 1 (second element)</Label>
      <Breadcrumb
        items={[
          { text: 'TestText1', key: 'TestKey1' },
          { text: 'TestText2', key: 'TestKey2' },
          { text: 'TestText3', key: 'TestKey3' },
          { text: 'TestText4', key: 'TestKey4' }
        ]}
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

function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
  const tooltipText = dividerProps.item ? dividerProps.item.text : '';
  return (
    <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
      <span aria-hidden="true" style={{ cursor: 'pointer' }}>
        /
      </span>
    </TooltipHost>
  );
}
