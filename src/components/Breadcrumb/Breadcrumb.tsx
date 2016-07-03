import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu } from '../../ContextualMenu';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { getRTL } from '../../utilities/rtl';
import { css } from '../../utilities/css';
import './Breadcrumb.scss';

export interface IBreadcrumbState {
  isOverflowOpen: boolean;
  overflowAnchor?: HTMLElement;
  renderedItems?: IBreadcrumbItem[];
  renderedOverflowItems?: IBreadcrumbItem[];
  internalId?: string;
}

const OVERFLOW_KEY = 'overflow';
const OVERFLOW_WIDTH = 44;

let _instance = 0;

export class Breadcrumb extends React.Component<IBreadcrumbProps, IBreadcrumbState> {
  public refs: {
    [key: string]: React.ReactInstance;
    renderingArea: HTMLElement;
  };

  public defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  private _breadcrumbItemWidths: { [key: string]: number };
  private _events: EventGroup;

  constructor(props: IBreadcrumbProps) {
    super(props);

    this._events = new EventGroup(this);
    this.state = this._getStateFromProps(props);
  }

  public componentDidMount() {
    this._updateItemMeasurements();
    this._updateRenderedItems();

    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillUnmount() {
    this._events.dispose();
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
    let { className } = this.props;
    let { isOverflowOpen, overflowAnchor, renderedItems, renderedOverflowItems, internalId } = this.state;
    let overflowMenuId = internalId + '-overflow';

    return (
      <div className={ css('ms-Breadcrumb', className) } ref='renderingArea'>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <ul className='ms-Breadcrumb-list'>
          { renderedOverflowItems && renderedOverflowItems.length ? (
            <li className='ms-Breadcrumb-overflow' key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
              <div className='ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis'
                  onClick={ this._onOverflowClicked.bind(this) }
                  data-is-focusable={ true }
                  role='button'
                  aria-haspopup='true'
                  aria-owns={ isOverflowOpen ? overflowMenuId : null } />
              <i className={ css('ms-Breadcrumb-chevron ms-Icon', getRTL() ? 'ms-Icon--chevronLeft' : 'ms-Icon--chevronRight') }></i>
            </li>
          ) : (null) }
          { renderedItems.map(
                (item, index) => (
             <li className='ms-Breadcrumb-listItem' key={ item.key || String(index) } ref={ item.key || String(index) } >
              <a className='ms-Breadcrumb-itemLink'
                  onClick={ item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null }
                  href={ item.href }
                  role={ item.onClick ? 'button' : 'link' }>
                  { item.text }
                  </a>
              <i className={ css('ms-Breadcrumb-chevron ms-Icon', getRTL() ? 'ms-Icon--chevronLeft' : 'ms-Icon--chevronRight') }></i>
            </li>
          )) }
          </ul>
        </FocusZone>
        { isOverflowOpen ? (
          <ContextualMenu
            targetElement={ overflowAnchor }
            items={ renderedOverflowItems.map(
                (item, index) => ({
                  name: item.text,
                  key: item.key,
                  onClick: this._onBreadcrumbClicked.bind(this, item),
                  href: item.href
                })
              ) }
            id={ overflowMenuId }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._onOverflowDismissed.bind(this) } />
        ) : (null) }
      </div>
    );
  }

  private _onOverflowClicked(ev: MouseEvent) {
    this.setState({
      'isOverflowOpen' : !this.state.isOverflowOpen,
      'overflowAnchor' : ev.currentTarget as HTMLElement
    });
  }

  private _onOverflowDismissed(ev: MouseEvent) {
    this.setState({
      'isOverflowOpen' : false,
      'overflowAnchor' : null
    });
  }

  private _onBreadcrumbClicked(item: any, ev: MouseEvent) {
    if (item.onclick) {
      item.onclick(item.key);
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
      renderedOverflowItems: null,
      internalId: 'Breadcrumb-' + _instance++
    };
  }

}
