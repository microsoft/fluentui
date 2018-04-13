import * as React from 'react';
import {
  BaseComponent,
  css,
  getRTL,
  createRef
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.types';
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

  protected focusZone = createRef<FocusZone>();

  constructor(props: IBreadcrumbProps) {
    super(props);
  }

  /**
   * Sets focus to the first breadcrumb link.
   */
  public focus(): void {
    if (this.focusZone.value) {
      this.focusZone.value.focus();
    }
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

  private _onReduceData = (data: IBreadCrumbData): IBreadCrumbData | undefined => {
    let { renderedItems, renderedOverflowItems } = data;
    const movedItem = renderedItems[0];
    renderedItems = renderedItems.slice(1);

    renderedOverflowItems = [...renderedOverflowItems, movedItem];

    if (movedItem !== undefined) {
      return { ...data, renderedItems, renderedOverflowItems };
    }
  }

  private _onRenderBreadcrumb = (data: IBreadCrumbData) => {
    const {
      className,
      ariaLabel,
      dividerAs: Divider = Icon,
      onRenderItem = this._onRenderItem,
      overflowAriaLabel
    } = data.props;
    const { renderedOverflowItems, renderedItems } = data;

    const contextualItems = renderedOverflowItems.map(
      (item, index) => ({
        name: item.text,
        key: item.key,
        onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
        href: item.href
      })
    );

    // Find index of last rendered item so the divider icon
    // knows not to render on that item
    const lastItemIndex = renderedItems.length - 1;

    return (
      <div
        className={ css('ms-Breadcrumb', className, styles.root) }
        role='navigation'
        aria-label={ ariaLabel }
      >
        <FocusZone componentRef={ this.focusZone } direction={ FocusZoneDirection.horizontal } >
          <ol className={ css('ms-Breadcrumb-list', styles.list) }>
            { renderedOverflowItems && renderedOverflowItems.length !== 0 && (
              <li className={ css('ms-Breadcrumb-overflow', styles.overflow) } key={ OVERFLOW_KEY }>
                <IconButton
                  className={ css('ms-Breadcrumb-overflowButton', styles.overflowButton) }
                  iconProps={ { iconName: 'More' } }
                  role='button'
                  aria-haspopup='true'
                  ariaLabel={ overflowAriaLabel }
                  onRenderMenuIcon={ nullFunction }
                  menuProps={ {
                    items: contextualItems,
                    directionalHint: DirectionalHint.bottomLeftEdge
                  } }
                />
                <Divider
                  className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                  iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                />
              </li>
            ) }
            { renderedItems.map(
              (item, index) => (
                <li className={ css('ms-Breadcrumb-listItem', styles.listItem) } key={ item.key || String(index) }>
                  { onRenderItem(item, this._onRenderItem) }
                  { index !== lastItemIndex && <Divider
                    className={ css('ms-Breadcrumb-chevron', styles.chevron) }
                    iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                  /> }
                </li>
              )) }
          </ol>
        </FocusZone>
      </div>
    );
  }

  private _onRenderItem = (item: IBreadcrumbItem) => {
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

  private _onBreadcrumbClicked = (item: IBreadcrumbItem, ev: React.MouseEvent<HTMLElement>) => {
    if (item.onClick) {
      item.onClick(ev, item);
    }
  }
}
