import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { Breadcrumb, getRTL, IBreadcrumbItem, Icon, TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class ChicletBreadcrumbExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const divider = () => <Icon iconName={getRTL() ? 'ChevronLeft' : 'ChevronRightSmall'} className={exampleStyles.chevron} />;
    const breadcrumb = (
      <Breadcrumb
        items={[
          { text: 'Files', key: 'Files' },
          { text: 'OneDrive Design', key: 'OneDrive Design' },
          { text: 'Emails', key: 'Emails' },
          { text: 'Campaigns', key: 'Campaigns' }
        ]}
        className={exampleStyles.description}
        onRenderItem={this._onRenderItem}
        dividerAs={divider}
      />
    );

    return <Chiclet url={TEST_URL} size={ChicletSize.medium} description={breadcrumb} />;
  }

  private _onRenderItem(item: IBreadcrumbItem): JSX.Element {
    return (
      <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent} className={exampleStyles.description}>
        {item.text}
      </TooltipHost>
    );
  }
}
