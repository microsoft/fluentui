import * as React from 'react';
import { getRTL, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../compat/Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { IContextualMenuItem, IContextualMenuItemProps } from '../../ContextualMenu';
import {
  IBreadcrumbProps,
  IBreadcrumbItem,
  IDividerAsProps,
  IBreadcrumbData,
  IBreadcrumbStyleProps,
  IBreadcrumbStyles,
} from './Breadcrumb.types';

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

const useComponentRef = (props: IBreadcrumbProps, focusZone: React.RefObject<FocusZone>) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus() {
        if (focusZone.current) {
          focusZone.current.focus();
        }
      },
    }),
    [focusZone],
  );
};

export const BreadcrumbBase = React.forwardRef<HTMLDivElement, IBreadcrumbProps>((props, ref) => {
  const focusZone = React.useRef<FocusZone>(null);

  /**
   * Remove the first rendered item past the overlow point and put it at the end the overflow set.
   */
  const reduceData = (data: IBreadcrumbData): IBreadcrumbData | undefined => {
    const movedItem = renderedItems[data.props.overflowIndex!];

    if (!movedItem) {
      return undefined;
    }

    data.renderedItems = [...data.renderedItems];
    data.renderedItems.splice(data.props.overflowIndex!, 1);

    data.renderedOverflowItems = [...data.renderedOverflowItems, movedItem];

    return { ...data };
  };

  /**
   * Remove the last item of the overflow set and insert the item at the start of the rendered set past the overflow
   * point.
   */
  const growData = (data: IBreadcrumbData): IBreadcrumbData | undefined => {
    data.renderedOverflowItems = [...data.renderedOverflowItems];
    const movedItem = renderedOverflowItems.pop();

    if (!movedItem || data.renderedItems.length >= data.props.maxDisplayedItems!) {
      return undefined;
    }

    data.renderedItems = [...data.renderedItems];
    data.renderedItems.splice(data.props.overflowIndex!, 0, movedItem);

    return { ...data };
  };

  const {
    items = [],
    maxDisplayedItems = 999,
    overflowIndex = 0,
    onReduceData = reduceData,
    onGrowData = growData,
    className,
    theme,
    tooltipHostProps,
    styles,
  } = props;

  const classNames: IProcessedStyleSet<IBreadcrumbStyles> = getClassNames(styles, {
    className,
    theme: theme!,
  });

  const renderedItems = [...items];
  const renderedOverflowItems = renderedItems.splice(overflowIndex!, renderedItems.length - maxDisplayedItems!);

  const breadcrumbData: IBreadcrumbData = {
    props: props,
    renderedItems,
    renderedOverflowItems,
  };

  const renderItem = (item: IBreadcrumbItem) => {
    if (item.onClick || item.href) {
      return (
        <Link
          as={item.as}
          className={classNames.itemLink}
          href={item.href}
          aria-current={item.isCurrentItem ? 'page' : undefined}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onBreadcrumbClicked.bind(this, item)}
        >
          <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent} {...tooltipHostProps}>
            {item.text}
          </TooltipHost>
        </Link>
      );
    } else {
      const Tag = item.as || 'span';
      return (
        <Tag className={classNames.item}>
          <TooltipHost content={item.text} overflowMode={TooltipOverflowMode.Parent} {...tooltipHostProps}>
            {item.text}
          </TooltipHost>
        </Tag>
      );
    }
  };

  const renderBreadcrumb = (data: IBreadcrumbData) => {
    const {
      ariaLabel,
      dividerAs: DividerType = Icon as React.ElementType<IDividerAsProps>,
      onRenderItem = renderItem,
      overflowAriaLabel,
      onRenderOverflowIcon,
    } = data.props;

    const contextualItems = data.renderedOverflowItems.map(
      (item): IContextualMenuItem => {
        const isActionable = !!(item.onClick || item.href);
        return {
          name: item.text,
          key: item.key,
          onClick: item.onClick ? onBreadcrumbClicked.bind(ref, item) : null,
          href: item.href,
          disabled: !isActionable,
          itemProps: isActionable ? undefined : nonActionableItemProps,
        };
      },
    );

    // Find index of last rendered item so the divider icon
    // knows not to render on that item
    const lastItemIndex = data.renderedItems.length - 1;
    const hasOverflowItems = data.renderedOverflowItems && data.renderedOverflowItems.length !== 0;

    const itemElements: JSX.Element[] = data.renderedItems.map((item, index) => (
      <li className={classNames.listItem} key={item.key || String(index)}>
        {onRenderItem(item, onRenderItem)}
        {(index !== lastItemIndex || (hasOverflowItems && index === data.props.overflowIndex! - 1)) && (
          <DividerType
            className={classNames.chevron}
            iconName={getRTL(theme) ? 'ChevronLeft' : 'ChevronRight'}
            item={item}
          />
        )}
      </li>
    ));

    if (hasOverflowItems) {
      const iconProps = !onRenderOverflowIcon ? { iconName: 'More' } : {};
      const onRenderMenuIcon = onRenderOverflowIcon ? onRenderOverflowIcon : nullFunction;

      itemElements.splice(
        data.props.overflowIndex!,
        0,
        <li className={classNames.overflow} key={OVERFLOW_KEY}>
          <IconButton
            className={classNames.overflowButton}
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
          {data.props.overflowIndex !== lastItemIndex + 1 && (
            <DividerType
              className={classNames.chevron}
              iconName={getRTL(theme) ? 'ChevronLeft' : 'ChevronRight'}
              item={renderedOverflowItems[renderedOverflowItems.length - 1]}
            />
          )}
        </li>,
      );
    }

    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, htmlElementProperties, [
      'className',
    ]);

    return (
      <div className={classNames.root} role="navigation" aria-label={ariaLabel} {...nativeProps}>
        <FocusZone componentRef={focusZone} direction={FocusZoneDirection.horizontal} {...props.focusZoneProps}>
          <ol className={classNames.list}>{itemElements}</ol>
        </FocusZone>
      </div>
    );
  };

  const onBreadcrumbClicked = (item: IBreadcrumbItem, ev: React.MouseEvent<HTMLElement>) => {
    item.onClick?.(ev, item);
  };

  // Validate incoming props during the initial render.
  if (
    overflowIndex! < 0 ||
    (maxDisplayedItems! > 1 && overflowIndex! > maxDisplayedItems! - 1) ||
    (items.length > 0 && overflowIndex! > items.length - 1)
  ) {
    throw new Error('Breadcrumb: overflowIndex out of range');
  }

  useComponentRef(props, focusZone);

  return (
    <ResizeGroup
      ref={ref}
      // eslint-disable-next-line react/jsx-no-bind -- dependencies will likely mutate.
      onRenderData={renderBreadcrumb}
      onReduceData={onReduceData}
      onGrowData={onGrowData}
      data={breadcrumbData}
    />
  );
});
