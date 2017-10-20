import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { CommandButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem, IBreadcrumbClassNames } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';

const nullFunction = () => null;

export interface ICrumbProps {
  classNames: IBreadcrumbClassNames;
  withChevron: boolean;
  item?: IBreadcrumbItem;
  menuProps?: any;
  iconProps?: any;
}

export class Crumb extends React.Component<ICrumbProps, {}> {
  public render() {
    let {
      item = { text: '', onClick: undefined, href: undefined, isCurrentItem: false },
      menuProps,
      classNames,
      withChevron,
      iconProps
    } = this.props;

    return (
      <li className={ classNames.crumb }>
        { (item.onClick || item.href || menuProps) ? (
          <CommandButton
            className={ classNames.crumbButton }
            href={ item.href }
            aria-current={ item.isCurrentItem ? 'page' : null }
            // onClick={ item.onClick }
            menuProps={ menuProps }
            onRenderMenuIcon={ nullFunction }
          >
            { iconProps && (
              <Icon { ...iconProps } />
            ) }
            { item.text && (
              <TooltipHost
                className={ classNames.crumbTextContent }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Parent }
              >
                { item.text }
              </TooltipHost>
            ) }
          </CommandButton>
        ) : (
            <span className={ classNames.crumbLabel }>
              <TooltipHost
                className={ classNames.crumbTextContent }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Parent }
              >
                { item.text }
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
}