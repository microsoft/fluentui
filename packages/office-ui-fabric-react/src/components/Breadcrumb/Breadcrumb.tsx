import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  getId,
  getRTL
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu } from '../../ContextualMenu';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';

import * as stylesImport from './Breadcrumb.scss';
const styles: any = stylesImport;

export interface IBreadcrumbState {
  isOverflowOpen: boolean;
  overflowAnchor?: HTMLElement;
  renderedItems?: IBreadcrumbItem[];
  renderedOverflowItems?: IBreadcrumbItem[];
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

  private _breadcrumbItemWidths: { [key: string]: number };
  private _id: string;

  constructor(props: IBreadcrumbProps) {
    super(props);

    this._id = getId('Breadcrumb');
    this.state = this._getStateFromProps(props);
  }

  public componentDidMount() {
    this._updateItemMeasurements();
    this._updateRenderedItems();

    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillReceiveProps(nextProps: IBreadcrumbProps) {
    this.setState(this._getStateFromProps(nextProps));
    this._breadcrumbItemWidths = null;
  }

  public componentDidUpdate(prevProps: IBreadcrumbProps, prevStates: IBreadcrumbState) {
    if (!this._breadcrumbItemWidths) {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    }
  }

  public render() {
    let { className, ariaLabel } = this.props;
    let { isOverflowOpen, overflowAnchor, renderedItems, renderedOverflowItems } = this.state;
    let overflowMenuId = this._id + '-overflow';

    let { onRenderItem = this._onRenderItem } = this.props;

    return (
      <div
        className={ css('ms-Breadcrumb', className, styles.root) }
        ref='renderingArea'
        role='navigation'
        aria-label={ ariaLabel }
      >
        <FocusZone direction={ FocusZoneDirection.horizontal } >
          <ol className={ css('ms-Breadcrumb-list', styles.list) }>
            { renderedOverflowItems && renderedOverflowItems.length ? (
              <li className={ css('ms-Breadcrumb-overflow', styles.overflow) } key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
                <IconButton
                  className={ css('ms-Breadcrumb-overflowButton', styles.overflowButton) }
                  iconProps={ { iconName: 'more' } }
                  onClick={ this._onOverflowClicked }
                  role='button'
                  aria-haspopup='true'
                  aria-owns={ isOverflowOpen ? overflowMenuId : null }
                />
                <Icon
                  className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                  iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                />
              </li>
            ) : (null) }
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
        { isOverflowOpen ? (
          <ContextualMenu
            targetElement={ overflowAnchor }
            isBeakVisible={ true }
            items={ renderedOverflowItems.map(
              (item, index) => ({
                name: item.text,
                key: item.key,
                onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
                href: item.href
              })
            ) }
            id={ overflowMenuId }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._onOverflowDismissed } />
        ) : (null) }
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

  private _updateItemMeasurements() {
    let { items } = this.props;

    if (!this._breadcrumbItemWidths) {
      this._breadcrumbItemWidths = {};
    }

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (!this._breadcrumbItemWidths[item.key]) {
        let el = this.refs[item.key] as HTMLElement;

        this._breadcrumbItemWidths[item.key] = el.getBoundingClientRect().width;
      }
    }
  }

  private _updateRenderedItems() {
    let { items, maxDisplayedItems } = this.props;
    let renderingArea = this.refs.renderingArea;
    let renderedItems = [];
    let renderedOverflowItems = [].concat(items);
    let consumedWidth = 0;

    let style = window.getComputedStyle(renderingArea);
    let availableWidth = renderingArea.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);

    availableWidth -= OVERFLOW_WIDTH;

    let i;
    let minIndex = Math.max(0, renderedOverflowItems.length - maxDisplayedItems);

    for (i = renderedOverflowItems.length - 1; i >= minIndex; i--) {
      let item = renderedOverflowItems[i];
      let itemWidth = this._breadcrumbItemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {
        break;
      } else {
        consumedWidth += itemWidth;
      }
    }

    renderedItems = renderedOverflowItems.splice(i + 1);

    this.setState({
      isOverflowOpen: this.state.isOverflowOpen,
      overflowAnchor: this.state.overflowAnchor,
      renderedItems: renderedItems,
      renderedOverflowItems: renderedOverflowItems,
    });
  }

  private _getStateFromProps(nextProps: IBreadcrumbProps) {
    return {
      isOverflowOpen: false,
      overflowAnchor: null,
      renderedItems: nextProps.items || [],
      renderedOverflowItems: null
    };
  }

}
