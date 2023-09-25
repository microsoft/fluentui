import * as React from 'react';
import {
  initializeComponentRef,
  getRTL,
  classNamesFunction,
  getNativeProps,
  htmlElementProperties,
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import type { IProcessedStyleSet } from '../../Styling';
import type { IContextualMenuItem, IContextualMenuItemProps } from '../../ContextualMenu';
import type {
  IBreadcrumbProps,
  IBreadcrumbItem,
  IDividerAsProps,
  IBreadcrumbData,
  IBreadcrumbStyleProps,
  IBreadcrumbStyles,
} from './Breadcrumb.types';
import { composeRenderFunction } from '../../Utilities';

/** @deprecated Use IBreadcrumbData */
export type IBreadCrumbData = IBreadcrumbData;

const getClassNames = classNamesFunction<IBreadcrumbStyleProps, IBreadcrumbStyles>();

const OVERFLOW_KEY = 'overflow';
const nullFunction = (): null => null;

const nonActionableItemProps: Partial<IContextualMenuItemProps> = {
  styles: props => {
    const { theme } = props;
    return {
      root: {
        selectors: {
          '&.is-disabled': {
            color: theme.semanticColors.bodyText,
          },
        },
      },
    };
  },
};

/**
 * {@docCategory Breadcrumb}
 */
export class BreadcrumbBase extends React.Component<IBreadcrumbProps, any> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999,
    overflowIndex: 0,
  };

  private _classNames: IProcessedStyleSet<IBreadcrumbStyles>;
  private _focusZone = React.createRef<FocusZone>();

  constructor(props: IBreadcrumbProps) {
    super(props);

    initializeComponentRef(this);
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
    this._validateProps(this.props);

    const {
      onReduceData = this._onReduceData,
      onGrowData = this._onGrowData,
      overflowIndex,
      maxDisplayedItems,
      items,
      className,
      theme,
      styles,
    } = this.props;
    const renderedItems = [...items];
    const renderedOverflowItems = renderedItems.splice(overflowIndex!, renderedItems.length - maxDisplayedItems!);
    const breadcrumbData: IBreadcrumbData = {
      props: this.props,
      renderedItems,
      renderedOverflowItems,
    };

    this._classNames = getClassNames(styles, {
      className,
      theme: theme!,
    });

    return (
      <ResizeGroup
        onRenderData={this._onRenderBreadcrumb}
        onReduceData={onReduceData}
        onGrowData={onGrowData}
        data={breadcrumbData}
      />
    );
  }

  /**
   * Remove the first rendered item past the overlow point and put it and the end the overflow set.
   */
  private _onReduceData = (data: IBreadcrumbData): IBreadcrumbData | undefined => {
    let { renderedItems, renderedOverflowItems } = data;
    const { overflowIndex } = data.props;

    const movedItem = renderedItems[overflowIndex!];

    if (!movedItem) {
      return undefined;
    }

    renderedItems = [...renderedItems];
    renderedItems.splice(overflowIndex!, 1);

    renderedOverflowItems = [...renderedOverflowItems, movedItem];

    return { ...data, renderedItems, renderedOverflowItems };
  };

  /**
   * Remove the last item of the overflow set and insert the item as the start of the rendered set past the overflow
   * point.
   */
  private _onGrowData = (data: IBreadcrumbData): IBreadcrumbData | undefined => {
    let { renderedItems, renderedOverflowItems } = data;
    const { overflowIndex, maxDisplayedItems } = data.props;

    renderedOverflowItems = [...renderedOverflowItems];
    const movedItem = renderedOverflowItems.pop();

    if (!movedItem || renderedItems.length >= maxDisplayedItems!) {
      return undefined;
    }

    renderedItems = [...renderedItems];
    renderedItems.splice(overflowIndex!, 0, movedItem);

    return { ...data, renderedItems, renderedOverflowItems };
  };

  private _onRenderBreadcrumb = (data: IBreadcrumbData) => {
    const {
      ariaLabel,
      dividerAs: DividerType = Icon as React.ElementType<IDividerAsProps>,
      onRenderItem,
      overflowAriaLabel,
      overflowIndex,
      onRenderOverflowIcon,
      overflowButtonAs,
    } = data.props;
    const { renderedOverflowItems, renderedItems } = data;

    const contextualItems = renderedOverflowItems.map((item): IContextualMenuItem => {
      const isActionable = !!(item.onClick || item.href);
      return {
        text: item.text,
        name: item.text,
        key: item.key,
        onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
        href: item.href,
        disabled: !isActionable,
        itemProps: isActionable ? undefined : nonActionableItemProps,
      };
    });

    // Find index of last rendered item so the divider icon
    // knows not to render on that item
    const lastItemIndex = renderedItems.length - 1;
    const hasOverflowItems = renderedOverflowItems && renderedOverflowItems.length !== 0;

    const itemElements: JSX.Element[] = renderedItems.map((item, index) => {
      let finalOnRenderItem = this._onRenderItem;

      if (item.onRender) {
        finalOnRenderItem = composeRenderFunction(item.onRender, finalOnRenderItem);
      }

      if (onRenderItem) {
        finalOnRenderItem = composeRenderFunction(onRenderItem, finalOnRenderItem);
      }

      return (
        <li className={this._classNames.listItem} key={item.key || String(index)}>
          {finalOnRenderItem(item)}
          {(index !== lastItemIndex || (hasOverflowItems && index === overflowIndex! - 1)) && (
            <DividerType
              className={this._classNames.chevron}
              iconName={getRTL(this.props.theme) ? 'ChevronLeft' : 'ChevronRight'}
              item={item}
            />
          )}
        </li>
      );
    });

    if (hasOverflowItems) {
      const iconProps = !onRenderOverflowIcon ? { iconName: 'More' } : {};
      const onRenderMenuIcon = onRenderOverflowIcon ? onRenderOverflowIcon : nullFunction;
      const OverflowButton = overflowButtonAs ? overflowButtonAs : IconButton;

      itemElements.splice(
        overflowIndex!,
        0,
        <li className={this._classNames.overflow} key={OVERFLOW_KEY}>
          <OverflowButton
            className={this._classNames.overflowButton}
            iconProps={iconProps}
            role="button"
            aria-haspopup="true"
            ariaLabel={overflowAriaLabel}
            onRenderMenuIcon={onRenderMenuIcon}
            menuProps={{
              items: contextualItems,
              directionalHint: DirectionalHint.bottomLeftEdge,
            }}
          />
          {overflowIndex !== lastItemIndex + 1 && (
            <DividerType
              className={this._classNames.chevron}
              iconName={getRTL(this.props.theme) ? 'ChevronLeft' : 'ChevronRight'}
              item={renderedOverflowItems[renderedOverflowItems.length - 1]}
            />
          )}
        </li>,
      );
    }

    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, htmlElementProperties, [
      'className',
    ]);

    return (
      <div className={this._classNames.root} role="navigation" aria-label={ariaLabel} {...nativeProps}>
        <FocusZone
          componentRef={this._focusZone}
          direction={FocusZoneDirection.horizontal}
          {...this.props.focusZoneProps}
        >
          <ol className={this._classNames.list}>{itemElements}</ol>
        </FocusZone>
      </div>
    );
  };

  private _onRenderItem = (item?: IBreadcrumbItem) => {
    if (!item) {
      return null;
    }

    const { as, href, onClick, isCurrentItem, text, onRenderContent, ...additionalProps } = item;

    let finalOnRenderContent = defaultOnRenderCrumbContent;

    if (onRenderContent) {
      finalOnRenderContent = composeRenderFunction(onRenderContent, finalOnRenderContent);
    }

    if (this.props.onRenderItemContent) {
      finalOnRenderContent = composeRenderFunction(this.props.onRenderItemContent, finalOnRenderContent);
    }

    if (onClick || href) {
      return (
        <Link
          {...additionalProps}
          as={as}
          className={this._classNames.itemLink}
          href={href}
          aria-current={isCurrentItem ? 'page' : undefined}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this._onBreadcrumbClicked.bind(this, item)}
        >
          <TooltipHost content={text} overflowMode={TooltipOverflowMode.Parent} {...this.props.tooltipHostProps}>
            {finalOnRenderContent(item)}
          </TooltipHost>
        </Link>
      );
    } else {
      const Tag = as || 'span';
      return (
        <Tag {...additionalProps} className={this._classNames.item}>
          <TooltipHost content={text} overflowMode={TooltipOverflowMode.Parent} {...this.props.tooltipHostProps}>
            {finalOnRenderContent(item)}
          </TooltipHost>
        </Tag>
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
   * @param props - Props to validate
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

function defaultOnRenderCrumbContent(item?: IBreadcrumbItem): JSX.Element | null {
  return item ? <>{item.text}</> : null;
}
