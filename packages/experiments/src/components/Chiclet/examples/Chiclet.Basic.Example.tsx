import * as React from 'react';
import {
  BaseChiclet
} from '../BaseChiclet';
import { ChicletSize } from '../Chiclet.types';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react/lib/Tooltip';
import { Breadcrumb, IBreadcrumbProps, IBreadcrumbItem, IDividerAsProps, Divider } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IRenderFunction, IComponentAs, getRTL } from '../../../Utilities';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    var footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'Save' } }, { iconProps: { iconName: 'Share' } }];
    var footer = <FooterComponent buttonProps={ footerButtonProps } activities="10 Comments  16 Shares  87 Views" />;
    var breadcrumb: IBreadcrumbProps = {
      items: [
        { text: 'Files', 'key': 'Files' },
        { text: 'OneDrive Design', 'key': 'OneDrive Design' },
        { text: 'Emails', 'key': 'Emails' },
        { text: 'Campaigns', 'key': 'Campaigns' },
      ]
    };
    var divider = () => <Icon iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRightSmall' } className={ exampleStyles.chevron } />;
    var description =
      <DescriptionComponent breadcrumb={ breadcrumb } onRenderItem={ this._onRenderItem } dividerAs={ divider } />
    return (
      <BaseChiclet url="http://localhost:4322" size={ ChicletSize.Medium } footer={ footer } description={ description }
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

export class DescriptionComponent extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    const { description, breadcrumb, onRenderItem, dividerAs } = this.props;

    return _renderDescription(description, breadcrumb, onRenderItem, dividerAs);
  }
}

export interface IDescriptionComponent extends React.Props<DescriptionComponent> {
  description?: string;
  breadcrumb?: IBreadcrumbProps;
  onRenderItem?: IRenderFunction<IBreadcrumbItem>;
}

function _renderDescription(description: string, breadcrumb: IBreadcrumbProps, onRenderItem: IRenderFunction<IBreadcrumbItem>, dividerAs: IComponentAs<IDividerAsProps>): React.ReactElement<any> {
  return (
    <div>
      <Breadcrumb
        items={ breadcrumb.items }
        className={ exampleStyles.description }
        onRenderItem={ onRenderItem }
        dividerAs={ dividerAs }
      />
    </div>
  );
}