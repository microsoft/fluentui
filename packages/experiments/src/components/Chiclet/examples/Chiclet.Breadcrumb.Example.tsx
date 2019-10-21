import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react/lib/Tooltip';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles, FontWeights } from 'office-ui-fabric-react/lib/Styling';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

const chevronStyle = mergeStyles({
  fontSize: 8,
  paddingLeft: 3,
  paddingRight: 3
});

const descriptionStyle = mergeStyles({
  fontSize: 12,
  fontWeight: FontWeights.semibold,
  lineHeight: 14,
  textAlign: 'left',
  color: '#797671',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

export class ChicletBreadcrumbExample extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const divider = () => <Icon iconName={getRTL() ? 'ChevronLeft' : 'ChevronRightSmall'} className={chevronStyle} />;
    const breadcrumb = (
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files' },
          { text: 'OneDrive Design', key: 'OneDrive Design' },
          { text: 'Emails', key: 'Emails' },
          { text: 'Campaigns', key: 'Campaigns' }
        ]}
        className={descriptionStyle}
        onRenderItem={this._onRenderItem}
        dividerAs={divider}
      />
    );

    return (
      <Chiclet
        url={SAMPLE_URL}
        title="Quarterly Results.docx"
        image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
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
