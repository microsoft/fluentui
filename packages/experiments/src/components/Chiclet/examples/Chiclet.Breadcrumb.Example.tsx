import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { Breadcrumb, getRTL, IBreadcrumbItem, Icon, TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

const chevronStyle = mergeStyles({
  fontSize: 8,
  paddingLeft: 3,
  paddingRight: 3
});

const descriptionStyle = mergeStyles({
  fontSize: 12,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.33,
  letterSpacing: 'normal',
  textAlign: 'left',
  color: '#797671',
  width: 248,
  height: 16,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

export class ChicletBreadcrumbExample extends React.Component<{}, {}> {
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
        url={TEST_URL}
        title="Quarterly Results.docx"
        image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
        size={ChicletSize.medium}
        description={breadcrumb}
      />
    );
  }

  private _onRenderItem(item: IBreadcrumbItem): JSX.Element {
    return (
      <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent} className={descriptionStyle}>
        {item.text}
      </TooltipHost>
    );
  }
}
