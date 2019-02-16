import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
const exampleStyles: any = exampleStylesImport;

export class BreadcrumbBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Label className={exampleStyles.exampleLabel}>With no maxDisplayedItems</Label>
        <Breadcrumb
          items={[
            { text: 'Files', key: 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', key: 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2 with a long name', key: 'f2', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 3 long', key: 'f3', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 4', key: 'f4', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 5 another', key: 'f5', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ]}
          ariaLabel={'Breadcrumb with no maxDisplayedItems'}
        />

        <Label className={exampleStyles.exampleLabel} style={{ marginTop: '24px' }}>
          With Custom Divider Icon
        </Label>
        <Breadcrumb
          items={[
            { text: 'Files', key: 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', key: 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', key: 'f2', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 3', key: 'f3', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 4', key: 'f4', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 5', key: 'f5', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
          ]}
          dividerAs={this._getCustomDivider}
          ariaLabel={'Breadcrumb with custom divider icon'}
        />

        <Label className={exampleStyles.exampleLabel} style={{ marginTop: '24px' }}>
          With maxDisplayedItems set to three
        </Label>
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
          ariaLabel={'Breadcrumb with maxDisplayedItems set to three'}
          overflowAriaLabel={'More links'}
        />

        <Label className={exampleStyles.exampleLabel} style={{ marginTop: '24px' }}>
          With maxDisplayedItems set to two and overflowIndex set to 1 (second element)
        </Label>
        <Breadcrumb
          items={[
            { text: 'TestText1', key: 'TestKey1' },
            { text: 'TestText2', key: 'TestKey2' },
            { text: 'TestText3', key: 'TestKey3' },
            { text: 'TestText4', key: 'TestKey4' }
          ]}
          maxDisplayedItems={2}
          overflowIndex={1}
          overflowAriaLabel={'More items'}
          ariaLabel={'Breadcrumb with maxDisplayedItems set to two and overflowIndex set to 1'}
        />
      </div>
    );
  }

  private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  };

  private _getCustomDivider = (dividerProps: IDividerAsProps): JSX.Element => {
    const tooltipText = dividerProps.item ? dividerProps.item.text : '';
    return (
      <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
        <span style={{ cursor: 'pointer' }}>/</span>
      </TooltipHost>
    );
  };
}
