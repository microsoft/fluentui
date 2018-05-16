import * as React from 'react';
import {
  Chiclet
} from '../Chiclet';
import { ChicletSize } from '../Chiclet.types';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react/lib/Tooltip';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { getRTL } from '../../../Utilities';

export class ChicletBreadcrumbExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    var footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'Save' } }, { iconProps: { iconName: 'Share' } }];
    var footer = <FooterComponent buttonProps={ footerButtonProps } activities="10 Comments  16 Shares  87 Views" />;

    var divider = () => <Icon iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRightSmall' } className={ exampleStyles.chevron } />;
    var breadcrumb = <Breadcrumb
      items={ [
        { text: 'Files', 'key': 'Files' },
        { text: 'OneDrive Design', 'key': 'OneDrive Design' },
        { text: 'Emails', 'key': 'Emails' },
        { text: 'Campaigns', 'key': 'Campaigns' },
      ] }
      className={ exampleStyles.description }
      onRenderItem={ this._onRenderItem }
      dividerAs={ divider }
    />;

    return (
      <Chiclet url="http://localhost:4322" size={ ChicletSize.medium } footer={ footer } description={ breadcrumb }
      />
    );
  }

  private _onRenderItem(item: IBreadcrumbItem) {
    return (
      <TooltipHost
        content={ item.text }
        overflowMode={ TooltipOverflowMode.Parent }
        className={ exampleStyles.description }
      >
        { item.text }
      </TooltipHost>
    );
  }
}

export class FooterComponent extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  activities: string;
}

function _renderFooter(buttonProps: IButtonProps[], activities: string): React.ReactElement<any> {
  return (<div className={ exampleStyles.footer }>
    <div className={ exampleStyles.activities }>
      { activities ? activities : (null) }
    </div>
    <div className={ exampleStyles.actions }>
      { buttonProps && buttonProps.map((buttonProp, index) => {
        return (
          <div className={ exampleStyles.action } key={ index }>
            <IconButton { ...buttonProp } />
          </div>
        );
      }) }
    </div>
  </div>);
}
