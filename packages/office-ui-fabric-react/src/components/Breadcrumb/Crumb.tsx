import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import { ITheme } from '../../Styling';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { ActionButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { getClassNames } from './Crumb.classNames';

const nullFunction = () => null;

export interface ICrumbProps {
  theme?: ITheme;
  withChevron: boolean;
  item?: IBreadcrumbItem;
  menuProps?: any;
  iconProps?: any;
}

@customizable('Crumb', ['theme'])
export class Crumb extends React.Component<ICrumbProps, {}> {
  public render() {
    let {
      item = { text: '', onClick: undefined, href: undefined, isCurrentItem: false },
      menuProps,
      theme,
      withChevron,
      iconProps
    } = this.props;
    const classNames = getClassNames(theme!, item.isCurrentItem);

    return (
      <li className={ classNames.root }>
        { (item.onClick || item.href || menuProps) ? (
          <ActionButton
            className={ classNames.crumbButton }
            href={ item.href }
            aria-current={ item.isCurrentItem ? 'page' : null }
            menuProps={ menuProps }
            onRenderMenuIcon={ nullFunction }
            onClick={ this._onClick }
          >
            { iconProps && (
              <Icon className={ classNames.overflowIcon } { ...iconProps } />
            ) }
            { item.text && (
              <TooltipHost
                className={ classNames.textContentWrapper }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Self }
              >
                <span className={ classNames.textContent }>{ item.text }</span>
              </TooltipHost>
            ) }
          </ActionButton>
        ) : (
            <span className={ classNames.crumbLabel }>
              <TooltipHost
                className={ classNames.textContentWrapper }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Self }
              >
                <span className={ classNames.textContent }>{ item.text }</span>
              </TooltipHost>
            </span>
          ) }
        { withChevron && (
          <Icon
            className={ classNames.chevron }
            iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
          />
        ) }
      </li>
    );
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    const { item } = this.props;

    if (item && item.onClick) {
      item.onClick(ev, item);
    }
  }
}