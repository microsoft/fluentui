import * as React from 'react';
import { BaseComponent, getRTL, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem, IDividerAsProps } from './Breadcrumb.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.types';

const getClassNames = classNamesFunction<IBreadcrumbStyleProps, IBreadcrumbStyles>();

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';
const nullFunction = (): null => null;

export class BreadcrumbBase extends BaseComponent<IBreadcrumbProps, any> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999,
    overflowIndex: 0
  };

  private _classNames: IProcessedStyleSet<IBreadcrumbStyles>;
  private _focusZone = React.createRef<FocusZone>();

  constructor(props: IBreadcrumbProps) {
    super(props);

    this._validateProps(props);
  }

  /**
   * Sets focus to the first breadcrumb link.
   */
  public focus(): void {
    if (this._focusZone.current) {
      this._focusZone.current.focus();
    }
  }

  public render(): JSX.Element {
    const { onReduceData = this._onReduceData, overflowIndex, maxDisplayedItems, items, className, theme, styles } = this.props;
    const renderedItems = [...items];
    const renderedOverflowItems = renderedItems.splice(overflowIndex!, renderedItems.length - maxDisplayedItems!);
    const breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems,
      renderedOverflowItems
    };

    this._classNames = getClassNames(styles, {
      className,
      theme: theme!
    });

    return <ResizeGroup onRenderData={this._onRenderBreadcrumb} onReduceData={onReduceData} data={breadCrumbData} />;
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
  };

  private _onRenderBreadcrumb = (data: IBreadCrumbData) => {
    const {
      ariaLabel,
      dividerAs: DividerType = Icon as React.ReactType<IDividerAsProps>,
      onRenderItem = this._onRenderItem,
      overflowAriaLabel,
      overflowIndex
    } = data.props;
    const { renderedOverflowItems, renderedItems } = data;

    const contextualItems = renderedOverflowItems.map((item, index) => ({
      name: item.text,
      key: item.key,
      onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
      href: item.href
    }));

    // Find index of last rendered item so the divider icon
    // knows not to render on that item
    const lastItemIndex = renderedItems.length - 1;
    const hasOverflowItems = renderedOverflowItems && renderedOverflowItems.length !== 0;

    const itemElements: JSX.Element[] = renderedItems.map((item, index) => (
      <li className={this._classNames.listItem} key={item.key || String(index)}>
        {onRenderItem(item, this._onRenderItem)}
        {(index !== lastItemIndex || (hasOverflowItems && index === overflowIndex! - 1)) && (
          <DividerType className={this._classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} item={item} />
        )}
      </li>
    ));

    if (hasOverflowItems) {
      itemElements.splice(
        overflowIndex!,
        0,
        <li className={this._classNames.overflow} key={OVERFLOW_KEY}>
          <IconButton
            className={this._classNames.overflowButton}
            iconProps={{ iconName: 'More' }}
            role="button"
            aria-haspopup="true"
            ariaLabel={overflowAriaLabel}
            onRenderMenuIcon={nullFunction}
            menuProps={{
              items: contextualItems,
              directionalHint: DirectionalHint.bottomLeftEdge
            }}
          />
          {overflowIndex !== lastItemIndex + 1 && (
            <DividerType
              className={this._classNames.chevron}
              iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}
              item={renderedOverflowItems[renderedOverflowItems.length - 1]}
            />
          )}
        </li>
      );
    }

    const nativeProps = getNativeProps(this.props, htmlElementProperties, ['className']);

    return (
      <div className={this._classNames.root} role="navigation" aria-label={ariaLabel} {...nativeProps}>
        <FocusZone componentRef={this._focusZone} direction={FocusZoneDirection.horizontal}>
          <ol className={this._classNames.list}>{itemElements}</ol>
        </FocusZone>
      </div>
    );
  };

  private _onRenderItem = (item: IBreadcrumbItem) => {
    if (item.onClick || item.href) {
      return (
        <Link
          className={this._classNames.itemLink}
          href={item.href}
          aria-current={item.isCurrentItem ? 'page' : undefined}
          onClick={this._onBreadcrumbClicked.bind(this, item)}
        >
          <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent}>
            {item.text}
          </TooltipHost>
        </Link>
      );
    } else {
      return (
        <span className={this._classNames.item}>
          <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent}>
            {item.text}
          </TooltipHost>
        </span>
      );
    }
  };

  private _onBreadcrumbClicked = (item: IBreadcrumbItem, ev: React.MouseEvent<HTMLElement>) => {
    if (item.onClick) {
      item.onClick(ev, item);
    }
  };

  /**
   * Validate incoming props
   * @param props Props to validate
   */
  private _validateProps(props: IBreadcrumbProps): void {
    const { maxDisplayedItems, overflowIndex, items } = props;
    if (
      overflowIndex! < 0 ||
      (maxDisplayedItems! > 1 && overflowIndex! > maxDisplayedItems! - 1) ||
      (items.length > 0 && overflowIndex! > items.length - 1)
    ) {
      throw new Error('Breadcrumb: overflowIndex out of range');
    }
  }
}
