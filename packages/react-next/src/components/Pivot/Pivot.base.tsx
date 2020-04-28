import * as React from 'react';
import { warnDeprecations, KeyCodes, getNativeProps, divProperties, classNamesFunction, warn } from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles, IPivot } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection, IFocusZone } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';
import { useId } from '@uifabric/react-hooks';

const getClassNamesCall = classNamesFunction<IPivotStyleProps, IPivotStyles>();
export interface IPivotState {
  selectedKey: string | undefined;
}

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

export const PivotBase: React.FunctionComponent<IPivotProps> = (props: IPivotProps) => {
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
        className={isSelected ? classNames.linkIsSelected : classNames.link}
        onClick={onLinkClick.bind(this, itemKey)}
        onKeyPress={onKeyPress.bind(this, itemKey)}
        ariaLabel={link.ariaLabel}
        role="tab"
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
    const { theme } = props;
    const rootIsLarge: boolean = props.linkSize === PivotLinkSize.large;
    const rootIsTabs: boolean = props.linkFormat === PivotLinkFormat.tabs;
    return getClassNamesCall(props.styles!, {
      theme: theme!,
      rootIsLarge,
      rootIsTabs,
    });
  };

  let linkCollection = getLinkItems(props, pivotId);
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);
  let index = linkCollection.keyToIndexMapping[selectedKey];
  const selectedTabId = linkCollection.keyToTabIdMapping[selectedKey];
  const renderSelectedKey = selectedKey;
  classNames = getClassNames();
  const items = linkCollection.links.map(l => renderPivotLink(linkCollection, l, renderSelectedKey));
  return (
    <div role="toolbar" {...divProps}>
      <FocusZone
        componentRef={focusZoneRef}
        direction={FocusZoneDirection.horizontal}
        className={classNames.root}
        role="tablist"
      >
        {items}
      </FocusZone>
      <div role="tabpanel" aria-labelledby={selectedTabId} className={classNames.itemContainer}>
        {React.Children.toArray(props.children)[index]}
      </div>
    </div>
  );
};
