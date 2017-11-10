import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import {
  IStyle,
  IStyleFunction,
  ITheme,
  classNamesFunction
} from '../../Styling';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { ActionButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { ICrumbProps, ICrumbStyleProps, ICrumbStyles } from './Crumb.types';

const getClassNames = classNamesFunction<ICrumbStyleProps, ICrumbStyles>();
const nullFunction = () => null;

@customizable('Crumb', ['getStyles', 'theme'])
export class CrumbBase extends React.Component<ICrumbProps, {}> {

  public render() {
    let {
      as: RootElement = 'li',
      item = { text: '', onClick: undefined, href: undefined, isCurrentItem: false },
      menuProps,
      theme,
      withChevron,
      iconProps,
      getStyles
    } = this.props;

    const classNames = getClassNames(getStyles!, { theme: theme!, isCurrentItem: !!item.isCurrentItem });

    return (
      <RootElement className={ classNames.root }>
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
                className={ classNames.textContent }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Self }
              >
                <span>{ item.text }</span>
              </TooltipHost>
            ) }
          </ActionButton>
        ) : (
            <span className={ classNames.crumbLabel }>
              <TooltipHost
                className={ classNames.textContent }
                content={ item.text }
                overflowMode={ TooltipOverflowMode.Self }
              >
                <span>{ item.text }</span>
              </TooltipHost>
            </span>
          ) }
        { withChevron && (
          <Icon
            className={ classNames.chevron }
            iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
          />
        ) }
      </RootElement>
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