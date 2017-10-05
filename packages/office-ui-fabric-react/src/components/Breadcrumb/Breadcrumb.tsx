import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getRTL
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';

import * as stylesImport from './Breadcrumb.scss';
const styles: any = stylesImport;

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';
const nullFunction = (): null => null;

export class Breadcrumb extends BaseComponent<IBreadcrumbProps, any> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  constructor(props: IBreadcrumbProps) {
    super(props);
  }

  public render() {
    const { onReduceData = this._onReduceData, maxDisplayedItems, items } = this.props;
    const breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems: items.slice(-maxDisplayedItems!),
      renderedOverflowItems: items.slice(0, -maxDisplayedItems!)
    };

    return (
      <ResizeGroup
        onRenderData={ this._onRenderBreadcrumb }
        onReduceData={ onReduceData }
        data={ breadCrumbData }
      />
    );
  }

  @autobind
  private _onReduceData(data: IBreadCrumbData): IBreadCrumbData | undefined {
    let { renderedItems, renderedOverflowItems } = data;
    let movedItem = renderedItems[0];
    renderedItems = renderedItems.slice(1);

    renderedOverflowItems = [...renderedOverflowItems, movedItem];

    if (movedItem !== undefined) {
      return { ...data, renderedItems, renderedOverflowItems };
    }
  }

  @autobind
  private _onRenderBreadcrumb(data: IBreadCrumbData) {
    let { className, ariaLabel, onRenderItem = this._onRenderItem } = data.props;
    let { renderedOverflowItems, renderedItems } = data;

    let contextualItems = renderedOverflowItems.map(
      (item, index) => ({
        name: item.text,
        key: item.key,
        onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
        href: item.href
      })
    );

    return (
      <div
        className={ css('ms-Breadcrumb', className, styles.root) }
        ref='renderingArea'
        role='navigation'
        aria-label={ ariaLabel }
      >
        <FocusZone direction={ FocusZoneDirection.horizontal } >
          <ol className={ css('ms-Breadcrumb-list', styles.list) }>
            { renderedOverflowItems && renderedOverflowItems.length !== 0 && (
              <li className={ css('ms-Breadcrumb-overflow', styles.overflow) } key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
                <IconButton
                  className={ css('ms-Breadcrumb-overflowButton', styles.overflowButton) }
                  iconProps={ { iconName: 'More' } }
                  role='button'
                  aria-haspopup='true'
                  onRenderMenuIcon={ nullFunction }
                  menuProps={ {
                    items: contextualItems,
                    directionalHint: DirectionalHint.bottomLeftEdge
                  } }
                />
                { Icon({
                  className: css('ms-Breadcrumb-chevron', styles.chevron),
                  iconName: getRTL() ? 'ChevronLeft' : 'ChevronRight'
                }) }
              </li>
            ) }
            { renderedItems.map(
              (item, index) => (
                <li className={ css('ms-Breadcrumb-listItem', styles.listItem) } key={ item.key || String(index) } ref={ item.key || String(index) }>
                  { onRenderItem(item, this._onRenderItem) }
                  <Icon
                    className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                    iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                  />
                </li>
              )) }
          </ol>
        </FocusZone>
      </div>
    );
  }

  @autobind
  private _onRenderItem(item: IBreadcrumbItem) {
    if (item.onClick || item.href) {
      return (
        <Link
          className={ css('ms-Breadcrumb-itemLink', styles.itemLink) }
          href={ item.href }
          aria-current={ item.isCurrentItem ? 'page' : null }
          onClick={ this._onBreadcrumbClicked.bind(this, item) }
        >
          <TooltipHost
            content={ item.text }
            overflowMode={ TooltipOverflowMode.Parent }
          >
            { item.text }
          </TooltipHost>
        </Link>
      );
    } else {
      return (
        <span className={ css('ms-Breadcrumb-item', styles.item) }>
          <TooltipHost
            content={ item.text }
            overflowMode={ TooltipOverflowMode.Parent }
          >
            { item.text }
          </TooltipHost>
        </span>
      );
    }
  }

  @autobind
  private _onBreadcrumbClicked(item: IBreadcrumbItem, ev: React.MouseEvent<HTMLElement>) {
    if (item.onClick) {
      item.onClick(ev, item);
    }
  }
}
