import * as React from 'react';
import { useControllableValue, useId } from '@fluentui/react-hooks';
import { classNamesFunction, css, divProperties, getNativeProps, getRTL, KeyCodes, warn } from '@fluentui/utilities';
import { CommandButton } from '../../Button';
import { useOverflow } from '../../utilities/useOverflow';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { DirectionalHint } from '../ContextualMenu/ContextualMenu.types';
import { Icon } from '../Icon/Icon';
import { PivotItem } from './PivotItem';
import type { IButton } from '../../Button';
import type { IFocusZone } from '../../FocusZone';
import type { IContextualMenuProps } from '../ContextualMenu/ContextualMenu.types';
import type { IPivot, IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import type { IPivotItemProps } from './PivotItem.types';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();

const COMPONENT_NAME = 'Pivot';

type PivotLinkCollection = {
  links: IPivotItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
};

const getTabId = (props: IPivotProps, pivotId: string, itemKey: string, index: number): string => {
  if (props.getTabId) {
    return props.getTabId(itemKey, index);
  }
  return pivotId + `-Tab${index}`;
};

// Gets the set of PivotLinks as array of IPivotItemProps
// The set of Links is determined by child components of type PivotItem
const getLinkItems = (props: IPivotProps, pivotId: string): PivotLinkCollection => {
  const result: PivotLinkCollection = {
    links: [],
    keyToIndexMapping: {},
    keyToTabIdMapping: {},
  };

  React.Children.forEach(React.Children.toArray(props.children), (child: React.ReactNode, index: number) => {
    if (isPivotItem(child)) {
      // eslint-disable-next-line deprecation/deprecation
      const { linkText, ...pivotItemProps } = child.props;
      const itemKey = child.props.itemKey || index.toString();
      result.links.push({
        headerText: linkText,
        ...pivotItemProps,
        itemKey: itemKey,
      });
      result.keyToIndexMapping[itemKey] = index;
      result.keyToTabIdMapping[itemKey] = getTabId(props, pivotId, itemKey, index);
    } else if (child) {
      warn('The children of a Pivot component must be of type PivotItem to be rendered.');
    }
  });
  return result;
};

const isPivotItem = (item: React.ReactNode): item is PivotItem => {
  return React.isValidElement(item) && (item.type as React.ComponentType)?.name === PivotItem.name;
};

export const PivotBase: React.FunctionComponent<IPivotProps> = React.forwardRef<HTMLDivElement, IPivotProps>(
  (props, ref) => {
    const focusZoneRef = React.useRef<IFocusZone>(null);
    const overflowMenuButtonComponentRef = React.useRef<IButton>(null);
    const pivotId: string = useId('Pivot');

    const [selectedKey, setSelectedKey] = useControllableValue(props.selectedKey, props.defaultSelectedKey);

    const { componentRef, theme, linkSize, linkFormat, overflowBehavior, overflowAriaLabel, focusZoneProps } = props;

    let classNames: { [key in keyof IPivotStyles]: string };
    const nameProps = {
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    };
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, [
      'aria-label',
      'aria-labelledby',
    ]);

    let linkCollection = getLinkItems(props, pivotId);

    React.useImperativeHandle(componentRef as React.RefObject<IPivot>, () => ({
      focus: () => {
        focusZoneRef.current?.focus();
      },
    }));

    const renderLinkContent = (link?: IPivotItemProps): JSX.Element | null => {
      if (!link) {
        return null;
      }

      const { itemCount, itemIcon, headerText } = link;
      return (
        <span className={classNames.linkContent}>
          {itemIcon !== undefined && (
            <span className={classNames.icon}>
              <Icon iconName={itemIcon} />
            </span>
          )}
          {headerText !== undefined && <span className={classNames.text}> {link.headerText}</span>}
          {itemCount !== undefined && <span className={classNames.count}> ({itemCount})</span>}
        </span>
      );
    };

    const renderPivotLink = (
      renderLinkCollection: PivotLinkCollection,
      link: IPivotItemProps,
      renderPivotLinkSelectedKey: string | null | undefined,
      className: string,
    ): JSX.Element => {
      const { itemKey, headerButtonProps, onRenderItemLink } = link;
      const tabId = renderLinkCollection.keyToTabIdMapping[itemKey!];
      let linkContent: JSX.Element | null;
      const isSelected: boolean = renderPivotLinkSelectedKey === itemKey;

      if (onRenderItemLink) {
        linkContent = onRenderItemLink(link, renderLinkContent);
      } else {
        linkContent = renderLinkContent(link);
      }

      let contentString = link.headerText || '';
      contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
      // Adding space supplementary for icon
      contentString += link.itemIcon ? ' xx' : '';
      return (
        <CommandButton
          {...headerButtonProps}
          id={tabId}
          key={itemKey}
          className={css(className, isSelected && classNames.linkIsSelected)}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={(ev: React.MouseEvent<HTMLElement>) => onLinkClick(itemKey!, ev)}
          // eslint-disable-next-line react/jsx-no-bind
          onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => onKeyDown(itemKey!, ev)}
          aria-label={link.ariaLabel}
          role={link.role || 'tab'}
          aria-selected={isSelected}
          name={link.headerText}
          keytipProps={link.keytipProps}
          data-content={contentString}
        >
          {linkContent}
        </CommandButton>
      );
    };

    const onLinkClick = (itemKey: string, ev: React.MouseEvent<HTMLElement>): void => {
      ev.preventDefault();
      updateSelectedItem(itemKey, ev);
    };

    const onKeyDown = (itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void => {
      // eslint-disable-next-line deprecation/deprecation
      if (ev.which === KeyCodes.enter) {
        ev.preventDefault();
        updateSelectedItem(itemKey);
      }
    };

    const updateSelectedItem = (itemKey: string, ev?: React.MouseEvent<HTMLElement>): void => {
      setSelectedKey(itemKey);
      linkCollection = getLinkItems(props, pivotId);
      if (props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
        const selectedIndex = linkCollection.keyToIndexMapping[itemKey];
        const item = React.Children.toArray(props.children)[selectedIndex];
        if (isPivotItem(item)) {
          props.onLinkClick(item, ev);
        }
      }

      overflowMenuButtonComponentRef.current?.dismissMenu();
    };

    const renderPivotItem = (itemKey: string | undefined, isActive: boolean): JSX.Element | null => {
      if (props.headersOnly || !itemKey) {
        return null;
      }

      const index = linkCollection.keyToIndexMapping[itemKey];
      const selectedTabId = linkCollection.keyToTabIdMapping[itemKey];
      return (
        <div
          role="tabpanel"
          hidden={!isActive}
          key={itemKey}
          aria-hidden={!isActive}
          aria-labelledby={selectedTabId}
          className={classNames.itemContainer}
        >
          {React.Children.toArray(props.children)[index]}
        </div>
      );
    };

    const isKeyValid = (itemKey: string | null | undefined): boolean => {
      return itemKey === null || (itemKey !== undefined && linkCollection.keyToIndexMapping[itemKey] !== undefined);
    };

    const getSelectedKey = () => {
      if (isKeyValid(selectedKey)) {
        return selectedKey;
      }
      if (linkCollection.links.length) {
        return linkCollection.links[0].itemKey;
      }
      return undefined;
    };

    classNames = getClassNames(props.styles!, {
      theme: theme!,
      linkSize,
      linkFormat,
    });

    const renderedSelectedKey = getSelectedKey();
    const renderedSelectedIndex = renderedSelectedKey ? linkCollection.keyToIndexMapping[renderedSelectedKey] : 0;

    const items = linkCollection.links.map(l =>
      renderPivotLink(linkCollection, l, renderedSelectedKey, classNames.link),
    );

    // The overflow menu starts empty and items[] is updated as the overflow items change
    const overflowMenuProps: IContextualMenuProps = React.useMemo(
      () => ({
        items: [],
        alignTargetEdge: true,
        directionalHint: DirectionalHint.bottomRightEdge,
      }),
      [],
    );

    const { menuButtonRef: overflowMenuButtonRef } = useOverflow({
      onOverflowItemsChanged: (overflowIndex, elements) => {
        // Set data-is-overflowing on each item
        elements.forEach(({ ele, isOverflowing }) => (ele.dataset.isOverflowing = `${isOverflowing}`));

        // Update the menu items
        overflowMenuProps.items = linkCollection.links
          .slice(overflowIndex)
          .filter(link => link.itemKey !== renderedSelectedKey)
          .map((link, index) => {
            link.role = 'menuitem';

            return {
              key: link.itemKey || `${overflowIndex + index}`,
              onRender: () => renderPivotLink(linkCollection, link, renderedSelectedKey, classNames.linkInMenu),
            };
          });
      },
      rtl: getRTL(theme),
      pinnedIndex: renderedSelectedIndex,
    });

    return (
      <div ref={ref} {...divProps}>
        <FocusZone
          componentRef={focusZoneRef}
          role="tablist"
          {...nameProps}
          direction={FocusZoneDirection.horizontal}
          {...focusZoneProps}
          className={css(classNames.root, focusZoneProps?.className)}
        >
          {items}
          {overflowBehavior === 'menu' && (
            <CommandButton
              className={css(classNames.link, classNames.overflowMenuButton)}
              elementRef={overflowMenuButtonRef}
              componentRef={overflowMenuButtonComponentRef}
              menuProps={overflowMenuProps}
              menuIconProps={{ iconName: 'More', style: { color: 'inherit' } }}
              ariaLabel={overflowAriaLabel}
            />
          )}
        </FocusZone>
        {renderedSelectedKey &&
          linkCollection.links.map(
            link =>
              (link.alwaysRender === true || renderedSelectedKey === link.itemKey) &&
              renderPivotItem(link.itemKey, renderedSelectedKey === link.itemKey),
          )}
      </div>
    );
  },
);
PivotBase.displayName = COMPONENT_NAME;
