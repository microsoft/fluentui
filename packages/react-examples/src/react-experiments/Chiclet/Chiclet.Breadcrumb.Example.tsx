import * as React from 'react';
import { Chiclet, ChicletSize } from '@fluentui/react-experiments';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { Icon } from '@fluentui/react/lib/Icon';
import { TooltipHost, TooltipOverflowMode } from '@fluentui/react/lib/Tooltip';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { mergeStyles, FontWeights } from '@fluentui/react/lib/Styling';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

const chevronStyle = mergeStyles({
  fontSize: 8,
  paddingLeft: 3,
  paddingRight: 3,
});

const descriptionStyle = mergeStyles({
  fontSize: 12,
  fontWeight: FontWeights.semibold,
  lineHeight: 14,
  textAlign: 'left',
  color: '#797671',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const Divider = () => <Icon iconName={getRTL() ? 'ChevronLeft' : 'ChevronRightSmall'} className={chevronStyle} />;

export class ChicletBreadcrumbExample extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const breadcrumb = (
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files' },
          { text: 'OneDrive Design', key: 'OneDrive Design' },
          { text: 'Emails', key: 'Emails' },
          { text: 'Campaigns', key: 'Campaigns' },
        ]}
        className={descriptionStyle}
        onRenderItem={this._onRenderItem}
        dividerAs={Divider}
      />
    );

    return (
      <Chiclet
        url={SAMPLE_URL}
        title="Quarterly Results.docx"
        image="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/96/docx.svg"
        size={ChicletSize.medium}
        description={breadcrumb}
      />
    );
  }

  private _onRenderItem(item: IBreadcrumbItem): JSX.Element {
    return (
      <TooltipHost overflowMode={TooltipOverflowMode.Parent} className={descriptionStyle}>
        {item.text}
      </TooltipHost>
    );
  }
}
