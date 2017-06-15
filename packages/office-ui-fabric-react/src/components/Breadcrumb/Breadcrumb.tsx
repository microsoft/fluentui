import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getId,
  getRTL,
  assign
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { IContextualMenuItem } from '../../ContextualMenu';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';

import * as stylesImport from './Breadcrumb.scss';
const styles: any = stylesImport;

export interface IBreadcrumbState {
  isOverflowOpen: boolean;
  overflowAnchor?: HTMLElement;
}

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  overflowMenuId: string;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';
const OVERFLOW_WIDTH = 44;

export class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbState> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  public refs: {
    [key: string]: React.ReactInstance;
    renderingArea: HTMLElement;
  };

  private _id: string;

  constructor(props: IBreadcrumbProps) {
    super(props);

    this._id = getId('Breadcrumb');
    this.state = this._getStateFromProps(props);
  }

  public render() {
    let { onReduceData = this._onReduceData } = this.props;
    let overflowMenuId = this._id + '-overflow';
    let breadCrumbData: IBreadCrumbData = {
      props: this.props,
      overflowMenuId: this._id,
      renderedItems: this.props.items.slice(0, this.props.maxDisplayedItems),
      renderedOverflowItems: this.props.items.slice(this.props.maxDisplayedItems + 1)
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
  private _onReduceData(data: IBreadCrumbData): IBreadCrumbData {
    let { renderedItems, renderedOverflowItems } = data;
    let movedItem = renderedItems[renderedItems.length - 1];

    if (movedItem !== undefined) {
      return assign({}, data, {
        renderedItems: renderedItems.slice(0, -1),
        renderedOverflowItems: renderedOverflowItems.concat(movedItem),
      });
    }
  }

  @autobind
  private _onRenderBreadcrumb(data: IBreadCrumbData) {
    let { className, ariaLabel, items, onRenderItem = this._onRenderItem } = data.props;
    let { renderedOverflowItems, renderedItems, overflowMenuId } = data;
    let { isOverflowOpen, overflowAnchor } = this.state;

    let contextualItems: IContextualMenuItem[] = renderedOverflowItems.map(
      (item, index) => ({
        names: item.text,
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
            { renderedOverflowItems && renderedOverflowItems.length && (
              <li className={ css('ms-Breadcrumb-overflow', styles.overflow) } key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
                <IconButton
                  className={ css('ms-Breadcrumb-overflowButton', styles.overflowButton) }
                  iconProps={ { iconName: 'more' } }
                  onClick={ this._onOverflowClicked }
                  role='button'
                  aria-haspopup='true'
                  aria-owns={ isOverflowOpen ? overflowMenuId : null }
                  menuIconProps={ { iconName: null } }
                  menuProps={ {
                    items: contextualItems,
                    id: overflowMenuId,
                    directionalHint: DirectionalHint.bottomLeftEdge
                  } }
                />
                <Icon
                  className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                  iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                />
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
  private _onOverflowClicked(ev: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      'isOverflowOpen': !this.state.isOverflowOpen,
      'overflowAnchor': ev.currentTarget as HTMLElement
    });
  }

  @autobind
  private _onOverflowDismissed(ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      'isOverflowOpen': false,
      'overflowAnchor': null
    });
  }

  @autobind
  private _onBreadcrumbClicked(item: IBreadcrumbItem, ev: React.MouseEvent<HTMLElement>) {
    if (item.onClick) {
      item.onClick(ev, item);
    }
    this.setState({
      'isOverflowOpen': false
    });
  }

  private _getStateFromProps(nextProps: IBreadcrumbProps) {
    return {
      isOverflowOpen: false,
      overflowAnchor: null
    };
  }

}
