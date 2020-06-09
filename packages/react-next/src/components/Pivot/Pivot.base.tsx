import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { warnDeprecations, KeyCodes, getNativeProps, divProperties, classNamesFunction, warn } from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles, IPivot } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection, IFocusZone } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { Icon } from '../../Icon';
import { css } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import { useOverflow } from './useOverflow';
import { IContextualMenuItem } from '../../ContextualMenu';

const getClassNamesCall = classNamesFunction<IPivotStyleProps, IPivotStyles>({
  useStaticStyles: true,
});

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

const getLinkItems = (props: IPivotProps, pivotId: string): PivotLinkCollection => {
  const result: PivotLinkCollection = {
    links: [],
    keyToIndexMapping: {},
    keyToTabIdMapping: {},
  };
  React.Children.forEach(React.Children.toArray(props.children), (child: React.ReactChild, index: number) => {
    if (isPivotItem(child)) {
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

const getDefaultKey = (props: IPivotProps, pivotId: string): string => {
  const { defaultSelectedKey, defaultSelectedIndex } = props;
  if (defaultSelectedKey !== undefined) {
    return defaultSelectedKey;
  }
  const pivotLinks = getLinkItems(props, pivotId).links;
  if (defaultSelectedIndex !== undefined) {
    return pivotLinks[defaultSelectedIndex]?.itemKey || '';
  } else if (pivotLinks.length) {
    return pivotLinks[0]?.itemKey || '';
  }
  return '';
};

const isPivotItem = (item: React.ReactNode): item is PivotItem => {
  return ((item as React.ReactElement)?.type as React.ComponentType)?.name === PivotItem.name;
};

export const PivotBase: React.FunctionComponent<IPivotProps> = React.forwardRef(
  (props: IPivotProps, ref: React.Ref<HTMLDivElement>) => {
    const { componentRef } = props;
    const pivotId: string = useId('Pivot');
    const [selectedKey, setSelectedKey] = React.useState<string>(() => getDefaultKey(props, pivotId));
    const focusZoneRef = React.useRef<IFocusZone>(null);
    let classNames: { [key in keyof IPivotStyles]: string };

    React.useImperativeHandle(componentRef as React.RefObject<IPivot>, () => ({
      focus: () => {
        focusZoneRef.current?.focus();
      },
    }));

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations(pivotId, props, {
        initialSelectedKey: 'defaultSelectedKey',
        initialSelectedIndex: 'defaultSelectedIndex',
      });
    }

    const renderLinkContent = (link: IPivotItemProps): JSX.Element => {
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

    const onKeyPress = (itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter) {
        ev.preventDefault();
        updateSelectedItem(itemKey);
      }
    };

    const renderPivotLink = (
      renderLinkCollection: PivotLinkCollection,
      link: IPivotItemProps,
      renderPivotLinkSelectedKey: string | null | undefined,
    ): JSX.Element => {
      const { itemKey, headerButtonProps } = link;
      const tabId = renderLinkCollection.keyToTabIdMapping[itemKey!];
      const { onRenderItemLink } = link;
      let linkContent: JSX.Element | null;
      const isSelected: boolean = renderPivotLinkSelectedKey === itemKey;
      if (onRenderItemLink) {
        linkContent = onRenderItemLink(link, renderLinkContent);
      } else {
        linkContent = renderLinkContent(link);
      }
      let contentString = link.headerText || '';
      contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
      contentString += link.itemIcon ? ' xx' : '';
      return (
        <CommandButton
          {...headerButtonProps}
          id={tabId}
          key={itemKey}
          className={css(classNames.link, isSelected && classNames.linkIsSelected)}
          onClick={onLinkClick.bind(this, itemKey)}
          onKeyPress={onKeyPress.bind(this, itemKey)}
          ariaLabel={link.ariaLabel}
          role="tab"
          aria-selected={isSelected}
          name={link.headerText}
          keytipProps={link.keytipProps}
          data-content={contentString}
          data-is-pinned={isSelected ? 'true' : undefined}
        >
          {linkContent}
        </CommandButton>
      );
    };

    // const renderPivotLinkMenuItem = (
    //   renderLinkCollection: PivotLinkCollection,
    //   link: IPivotItemProps,
    //   renderPivotLinkSelectedKey: string | null | undefined,
    // ): JSX.Element => {
    //   const { itemKey, headerButtonProps } = link;
    //   const tabId = renderLinkCollection.keyToTabIdMapping[itemKey!];
    //   const { onRenderItemLink } = link;
    //   let linkContent: JSX.Element | null;
    //   const isSelected: boolean = renderPivotLinkSelectedKey === itemKey;
    //   if (onRenderItemLink) {
    //     linkContent = onRenderItemLink(link, renderLinkContent);
    //   } else {
    //     linkContent = renderLinkContent(link);
    //   }
    //   let contentString = link.headerText || '';
    //   contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
    //   contentString += link.itemIcon ? ' xx' : '';
    //   return (
    //     <ContextualMenuItem
    //       {...headerButtonProps}
    //       id={tabId}

    //       key={itemKey}
    //       className={css(classNames.link, isSelected && classNames.linkIsSelected)}
    //       onClick={onLinkClick.bind(this, itemKey)}
    //       onKeyPress={onKeyPress.bind(this, itemKey)}
    //       aria-label={link.ariaLabel}
    //       role="tab"
    //       aria-selected={isSelected}
    //       data-content={contentString}
    //     >
    //       {linkContent}
    //     </ContextualMenuItem>
    //   );
    // };

    const onLinkClick = (itemKey: string, ev: React.MouseEvent<HTMLElement>): void => {
      ev.preventDefault();
      updateSelectedItem(itemKey, ev);
    };

    const updateSelectedItem = (itemKey: string, ev?: React.MouseEvent<HTMLElement>): void => {
      setSelectedKey(itemKey);
      linkCollection = getLinkItems(props, pivotId);
      if (props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
        index = linkCollection.keyToIndexMapping[itemKey];
        const item = React.Children.toArray(props.children)[index];
        if (isPivotItem(item)) {
          props.onLinkClick(item, ev);
        }
      }
    };

    const getClassNames = (): { [key in keyof IPivotStyles]: string } => {
      const { theme, linkSize, linkFormat } = props;

      return getClassNamesCall(props.styles!, {
        theme: theme!,
        linkSize,
        linkFormat,
      });
    };

    const renderPivotItem = (itemKey: string | undefined, isActive: boolean): JSX.Element | null => {
      if (props.headersOnly || !itemKey) {
        return null;
      }
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

    let linkCollection = getLinkItems(props, pivotId);
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);
    let index = linkCollection.keyToIndexMapping[selectedKey];
    const selectedTabId = linkCollection.keyToTabIdMapping[selectedKey];
    const renderSelectedKey = selectedKey;
    classNames = getClassNames();
    const items = linkCollection.links.map(l => renderPivotLink(linkCollection, l, renderSelectedKey));

    const [overflowIndex, setOverflowIndex] = React.useState<number | undefined>(undefined);

    const overflowContainerRef = React.useRef<HTMLElement | null>();
    const overflowMenuRef = React.useRef<HTMLElement | null>();
    const setOverflowMenuRef = (button: React.Component | null) => {
      const node = findDOMNode(button);
      overflowMenuRef.current = node instanceof HTMLElement ? node : null;
      overflowContainerRef.current = overflowMenuRef.current?.parentElement;
    };

    useOverflow(overflowContainerRef, overflowMenuRef, {
      onOverflowChanged: (newOverflowIndex: number | undefined) => {
        if (overflowIndex !== newOverflowIndex) {
          setOverflowIndex(newOverflowIndex);
        }
      },
    });

    const renderOverflowMenu = (): JSX.Element => {
      const menuItems: IContextualMenuItem[] = [];

      if (overflowIndex !== undefined) {
        for (let i = overflowIndex; i < linkCollection.links.length; i++) {
          const { itemKey, headerText, itemCount, itemIcon } = linkCollection.links[i];

          let text = '';
          if (headerText !== undefined) {
            text += headerText;
          }
          if (itemCount !== undefined) {
            text += ' (' + itemCount + ')';
          }

          menuItems.push({
            key: itemKey || i + '',
            text,
            iconProps: { iconName: itemIcon },
            onClick: updateSelectedItem.bind(this, itemKey),
          });
        }
      }

      return (
        <CommandButton
          className={classNames.overflowMenu}
          ref={setOverflowMenuRef}
          menuProps={{ items: menuItems }}
          // menuIconProps={{ iconName: '' }}
        >
          {/* <span className={classNames.linkContent}>
            <span className={classNames.icon}>
              <Icon iconName="ExpandMenu" />
            </span>
          </span> */}
        </CommandButton>
      );
    };

    return (
      <div role="toolbar" {...divProps} ref={ref}>
        <FocusZone
          componentRef={focusZoneRef}
          direction={FocusZoneDirection.horizontal}
          className={classNames.root}
          role="tablist"
        >
          <div>
            {items}
            {renderOverflowMenu()}
          </div>
        </FocusZone>
        {selectedKey &&
          linkCollection.links.map(
            link =>
              (link.alwaysRender === true || selectedKey === link.itemKey) &&
              renderPivotItem(link.itemKey, selectedKey === link.itemKey),
          )}
      </div>
    );
  },
);
PivotBase.displayName = COMPONENT_NAME;
