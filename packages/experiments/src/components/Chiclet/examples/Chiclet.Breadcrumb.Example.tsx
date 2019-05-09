import * as React from 'react';
import { Chiclet } from '../Chiclet';
import { ChicletSize } from '../Chiclet.types';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react/lib/Tooltip';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';

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

    return <Chiclet url="http://localhost:4322" size={ChicletSize.medium} description={breadcrumb} />;
  }

  private _onRenderItem(item: IBreadcrumbItem): JSX.Element {
    return (
      <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent} className={exampleStyles.description}>
        {item.text}
      </TooltipHost>
    );
  }
}
