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

import styles from './Breadcrumb.scss';

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';

export class Breadcrumb extends BaseComponent<IBreadcrumbProps, any> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  private _id: string;

  constructor(props: IBreadcrumbProps) {
    super(props);
  }

  public render() {
    let { onReduceData = this._onReduceData } = this.props;
    let breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems: this.props.items.slice(0, this.props.maxDisplayedItems),
      renderedOverflowItems: this.props.items.slice(this.props.maxDisplayedItems)
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
    let movedItem = renderedItems[renderedItems.length - 1];
    renderedItems = renderedItems.slice(0, -1);
    renderedOverflowItems = [...renderedOverflowItems, movedItem];

    if (movedItem !== undefined) {
      return { ...data, renderedItems, renderedOverflowItems };
    }
  }

  @autobind
  private _onRenderBreadcrumb(data: IBreadCrumbData) {
    let { className, ariaLabel, items, onRenderItem = this._onRenderItem } = data.props;
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
                  menuIconProps={ null }
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
                  { onRenderItem(item, this._defaultRenderItem) }
                  <Icon
                    className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                    iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' } />
                </li>
              )) }
          </ol>
        </FocusZone>
      </div>
    );
  }

  @autobind
  private _onRenderItem(item: IBreadcrumbItem, defaultRender?: (item?: IBreadcrumbItem) => JSX.Element): JSX.Element {
    return this._defaultRenderItem(item);
  }

  @autobind
  private _defaultRenderItem(item: IBreadcrumbItem) {
    if (item.onClick || item.href) {
      return (
        <Link
          className={ css('ms-Breadcrumb-itemLink', styles.itemLink) }
          href={ item.href }
          aria-current={ item.isCurrentItem ? 'page' : null }
          onClick={ this._onBreadcrumbClicked.bind(this, item) }>
          { item.text }
        </Link>
      );
    } else {
      return (
        <span className={ css('ms-Breadcrumb-item', styles.item) }>
          { item.text }
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
