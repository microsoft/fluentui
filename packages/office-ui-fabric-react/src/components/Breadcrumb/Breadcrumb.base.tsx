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
    maxDisplayedItems: 999,
    overflowIndex: 0
  };

  protected focusZone = createRef<FocusZone>();

  constructor(props: IBreadcrumbProps) {
    super(props);

    this._validateProps(props);
  }

  /**
   * Sets focus to the first breadcrumb link.
   */
  public focus(): void {
    if (this.focusZone.current) {
      this.focusZone.current.focus();
    }
  }

  public render(): JSX.Element {
    const { onReduceData = this._onReduceData, overflowIndex, maxDisplayedItems, items } = this.props;
    const renderedItems = [...items];
    const renderedOverflowItems = renderedItems.splice(overflowIndex!, renderedItems.length - maxDisplayedItems!);
    const breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems,
      renderedOverflowItems
    };

    return (
      <ResizeGroup
        onRenderData={ this._onRenderBreadcrumb }
        onReduceData={ onReduceData }
        data={ breadCrumbData }
      />
    );
  }

  public componentWillReceiveProps(nextProps: IBreadcrumbProps): void {
    this._validateProps(nextProps);
  }

  private _onReduceData = (data: IBreadCrumbData): IBreadCrumbData | undefined => {
    let { renderedItems, renderedOverflowItems } = data;
    const { overflowIndex } = data.props;

    const movedItem = renderedItems[overflowIndex!];
    renderedItems = [...renderedItems];
    renderedItems.splice(overflowIndex!, 1);

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
      overflowAriaLabel,
      overflowIndex
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

    const itemElements: JSX.Element[] = renderedItems.map(
      (item, index) => (
        <li className={ css('ms-Breadcrumb-listItem', styles.listItem) } key={ item.key || String(index) }>
          { onRenderItem(item, this._onRenderItem) }
          { index !== lastItemIndex && <Divider
            className={ css('ms-Breadcrumb-chevron', styles.chevron) }
            iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
          /> }
        </li>
      ));

    if (renderedOverflowItems && renderedOverflowItems.length !== 0) {
      itemElements.splice(overflowIndex!, 0, (
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
      ));
    }

    return (
      <div
        className={ css('ms-Breadcrumb', className, styles.root) }
        role='navigation'
        aria-label={ ariaLabel }
      >
        <FocusZone componentRef={ this.focusZone } direction={ FocusZoneDirection.horizontal } >
          <ol className={ css('ms-Breadcrumb-list', styles.list) }>
            { itemElements }
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
          aria-current={ item.isCurrentItem ? 'page' : undefined }
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

  /**
   * Validate incoming props
   * @param props Props to validate
   */
  private _validateProps(props: IBreadcrumbProps): void {
    const { items, overflowIndex } = props;
    if (overflowIndex! < 0 || overflowIndex! > items.length - 1) {
      throw new Error('Breadcrumb: overflowIndex out of range');
    }
  }
}
