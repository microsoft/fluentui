import * as React from 'react';
import { useControllableValue, useId } from '@fluentui/react-hooks';
import { classNamesFunction, css, divProperties, getNativeProps, getRTL, KeyCodes, warn } from '@fluentui/utilities';
import {
  DirectionalHint,
  FocusZone,
  FocusZoneDirection,
  Icon,
  IContextualMenuProps,
  IFocusZone,
} from '@fluentui/react';
import { CommandButton, IButton } from '@fluentui/react/lib/Button';
import { TabsImperativeHandle, TabItemProps, TabsProps, TabsStyleProps, TabsStyles, TabItem } from './index';
import { useOverflow } from '../../utilities/useOverflow';

const getClassNames = classNamesFunction<TabsStyleProps, TabsStyles>();

const COMPONENT_NAME = 'Tabs';

type TabItemCollection = {
  tabs: TabItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
};

const getTabId = (props: TabsProps, baseId: string, itemKey: string, index: number): string => {
  if (props.getTabId) {
    return props.getTabId(itemKey, index);
  }
  return baseId + `-Tab${index}`;
};

// Gets the set of Tabs as array of TabItemProps
// The set of Tabs is determined by child components of type TabItem
const getTabItems = (props: TabsProps, baseId: string): TabItemCollection => {
  const result: TabItemCollection = {
    tabs: [],
    keyToIndexMapping: {},
    keyToTabIdMapping: {},
  };

  React.Children.forEach(React.Children.toArray(props.children), (child: React.ReactNode, index: number) => {
    if (isTabItem(child)) {
      const { itemKey = index.toString(), ...tabItemProps } = child.props;
      result.tabs.push({
        ...tabItemProps,
        itemKey: itemKey,
      });
      result.keyToIndexMapping[itemKey] = index;
      result.keyToTabIdMapping[itemKey] = getTabId(props, baseId, itemKey, index);
    } else if (child) {
      warn('The children of a Tabs component must be of type TabItem to be rendered.');
    }
  });
  return result;
};

const isTabItem = (item: React.ReactNode): item is TabItem => {
  return ((item as React.ReactElement)?.type as React.ComponentType)?.name === TabItem.name;
};

export const TabsBase: React.FunctionComponent<TabsProps> = React.forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => {
    const focusZoneRef = React.useRef<IFocusZone>(null);
    const overflowMenuButtonComponentRef = React.useRef<IButton>(null);
    const baseId: string = useId('Tabs');

    const [selectedKey, setSelectedKey] = useControllableValue(props.selectedKey, props.defaultSelectedKey);

    const { componentRef, theme, tabSize, tabFormat, overflowBehavior } = props;

    let classNames: { [key in keyof TabsStyles]: string };
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    let tabCollection = getTabItems(props, baseId);

    React.useImperativeHandle(componentRef as React.RefObject<TabsImperativeHandle>, () => ({
      focus: () => {
        focusZoneRef.current?.focus();
      },
    }));

    const renderTabContent = (tab?: TabItemProps): JSX.Element | null => {
      if (!tab) {
        return null;
      }

      const { itemCount, itemIcon, headerText } = tab;
      return (
        <span className={classNames.tabContent}>
          {itemIcon !== undefined && (
            <span className={classNames.icon}>
              <Icon iconName={itemIcon} />
            </span>
          )}
          {headerText !== undefined && <span className={classNames.text}> {tab.headerText}</span>}
          {itemCount !== undefined && <span className={classNames.count}> ({itemCount})</span>}
        </span>
      );
    };

    const renderTab = (
      renderTabCollection: TabItemCollection,
      tab: TabItemProps,
      renderTabSelectedKey: string | null | undefined,
      className: string,
    ): JSX.Element => {
      const { itemKey, headerButtonProps, onRenderTab } = tab;
      const tabId = renderTabCollection.keyToTabIdMapping[itemKey!];
      let tabContent: JSX.Element | null;
      const isSelected: boolean = renderTabSelectedKey === itemKey;

      if (onRenderTab) {
        tabContent = onRenderTab(tab, renderTabContent);
      } else {
        tabContent = renderTabContent(tab);
      }

      let contentString = tab.headerText || '';
      contentString += tab.itemCount ? ' (' + tab.itemCount + ')' : '';
      // Adding space supplementary for icon
      contentString += tab.itemIcon ? ' xx' : '';
      return (
        <CommandButton
          {...headerButtonProps}
          id={tabId}
          key={itemKey}
          className={css(className, isSelected && classNames.tabIsSelected)}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={(ev: React.MouseEvent<HTMLElement>) => onTabClick(itemKey!, ev)}
          // eslint-disable-next-line react/jsx-no-bind
          onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => onKeyDown(itemKey!, ev)}
          aria-label={tab.ariaLabel}
          role={tab.role || 'tab'}
          aria-selected={isSelected}
          name={tab.headerText}
          keytipProps={tab.keytipProps}
          data-content={contentString}
        >
          {tabContent}
        </CommandButton>
      );
    };

    const onTabClick = (itemKey: string, ev: React.MouseEvent<HTMLElement>): void => {
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
      tabCollection = getTabItems(props, baseId);
      if (props.onTabClick && tabCollection.keyToIndexMapping[itemKey] >= 0) {
        const selectedIndex = tabCollection.keyToIndexMapping[itemKey];
        const item = React.Children.toArray(props.children)[selectedIndex];
        if (isTabItem(item)) {
          props.onTabClick(item, ev);
        }
      }

      overflowMenuButtonComponentRef.current?.dismissMenu();
    };

    const renderTabItem = (itemKey: string | undefined, isActive: boolean): JSX.Element | null => {
      if (props.headersOnly || !itemKey) {
        return null;
      }

      const index = tabCollection.keyToIndexMapping[itemKey];
      const selectedTabId = tabCollection.keyToTabIdMapping[itemKey];
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
      return itemKey !== undefined && itemKey !== null && tabCollection.keyToIndexMapping[itemKey] !== undefined;
    };

    const getSelectedKey = () => {
      if (isKeyValid(selectedKey)) {
        return selectedKey;
      }
      if (tabCollection.tabs.length) {
        return tabCollection.tabs[0].itemKey;
      }
      return undefined;
    };

    classNames = getClassNames(props.styles!, {
      theme: theme!,
      tabSize,
      tabFormat,
    });

    const renderedSelectedKey = getSelectedKey();
    const renderedSelectedIndex = renderedSelectedKey ? tabCollection.keyToIndexMapping[renderedSelectedKey] : 0;

    const items = tabCollection.tabs.map(l => renderTab(tabCollection, l, renderedSelectedKey, classNames.tab));

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
        overflowMenuProps.items = tabCollection.tabs.slice(overflowIndex).map((tab, index) => ({
          key: tab.itemKey || `${overflowIndex + index}`,
          onRender: () => renderTab(tabCollection, tab, renderedSelectedKey, classNames.tabInMenu),
        }));
      },
      rtl: getRTL(theme),
      pinnedIndex: renderedSelectedIndex,
    });

    return (
      <div role="toolbar" {...divProps} ref={ref}>
        <FocusZone
          componentRef={focusZoneRef}
          direction={FocusZoneDirection.horizontal}
          className={classNames.root}
          role="tablist"
        >
          {items}
          {overflowBehavior === 'menu' && (
            <CommandButton
              className={css(classNames.tab, classNames.overflowMenuButton)}
              elementRef={overflowMenuButtonRef}
              componentRef={overflowMenuButtonComponentRef}
              menuProps={overflowMenuProps}
              menuIconProps={{ iconName: 'More', style: { color: 'inherit' } }}
            />
          )}
        </FocusZone>
        {renderedSelectedKey &&
          tabCollection.tabs.map(
            tab =>
              (tab.alwaysRender === true || renderedSelectedKey === tab.itemKey) &&
              renderTabItem(tab.itemKey, renderedSelectedKey === tab.itemKey),
          )}
      </div>
    );
  },
);
TabsBase.displayName = COMPONENT_NAME;
