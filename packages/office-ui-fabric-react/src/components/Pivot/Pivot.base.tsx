import * as React from 'react';
import {
  warnDeprecations,
  KeyCodes,
  getId,
  getNativeProps,
  divProperties,
  classNamesFunction,
  warn,
} from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';

const getClassNamesCall = classNamesFunction<IPivotStyleProps, IPivotStyles>();
const PivotName = 'Pivot';

export interface IPivotState {
  selectedKey: string | undefined;
}

type PivotLinkCollection = {
  links: IPivotItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
};

export const PivotBase: React.FunctionComponent<IPivotProps> = (props: IPivotProps) => {
  const [selectedKey, setSelectedKey] = React.useState(props.defaultSelectedKey);
  let pivotId: string;
  const focusZone = React.createRef<FocusZone>();
  let classNames: { [key in keyof IPivotStyles]: string };

  if (process.env.NODE_ENV !== 'production') {
    warnDeprecations(PivotName, props, {
      initialSelectedKey: 'defaultSelectedKey',
      initialSelectedIndex: 'defaultSelectedIndex',
    });
  }

  pivotId = getId(PivotName);

  const getTabId = (itemKey: string, index: number): string => {
    if (props.getTabId) {
      return props.getTabId(itemKey, index);
    }

    return pivotId + `-Tab${index}`;
  };

  const getPivotLinks = (): PivotLinkCollection => {
    const result: PivotLinkCollection = {
      links: [],
      keyToIndexMapping: {},
      keyToTabIdMapping: {},
    };
    /**
     * Gets the set of PivotLinks as array of IPivotItemProps
     * The set of Links is determined by child components of type PivotItem
     */
    React.Children.map(React.Children.toArray(props.children), (child: React.ReactChild, index: number) => {
      if (isPivotItem(child)) {
        const pivotItem = child;
        const { linkText, ...pivotItemProps } = pivotItem.props;
        const itemKey = pivotItem.props.itemKey || index.toString();
        result.links.push({
          // Use linkText (deprecated) if headerText is not provided
          headerText: linkText,
          ...pivotItemProps,
          itemKey: itemKey,
        });
        result.keyToIndexMapping[itemKey] = index;
        result.keyToTabIdMapping[itemKey] = getTabId(itemKey, index);
      } else {
        warn('The children of a Pivot component must be of type PivotItem to be rendered.');
      }
    });
    return result;
  };

  const render = (): JSX.Element => {
    const linkCollection = getPivotLinks();
    const renderSelectedKey = selectedKey;
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    classNames = getClassNames();

    return (
      <div role="toolbar" {...divProps}>
        {renderPivotLinks(linkCollection, renderSelectedKey)}
        {renderSelectedKey && renderPivotItem(linkCollection, renderSelectedKey)}
      </div>
    );
  };

  const renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;
    const renderLinkContentClassNames = classNames;

    return (
      <span className={renderLinkContentClassNames.linkContent}>
        {itemIcon !== undefined && (
          <span className={renderLinkContentClassNames.icon}>
            <Icon iconName={itemIcon} />
          </span>
        )}
        {headerText !== undefined && <span className={renderLinkContentClassNames.text}> {link.headerText}</span>}
        {itemCount !== undefined && <span className={renderLinkContentClassNames.count}> ({itemCount})</span>}
      </span>
    );
  };

  const renderPivotItem = (linkCollection: PivotLinkCollection, itemKey: string | undefined): JSX.Element | null => {
    if (props.headersOnly || !itemKey) {
      return null;
    }
    const index = linkCollection.keyToIndexMapping[itemKey];
    const selectedTabId = linkCollection.keyToTabIdMapping[itemKey];

    return (
      <div role="tabpanel" aria-labelledby={selectedTabId} className={classNames.itemContainer}>
        {React.Children.toArray(props.children)[index]}
      </div>
    );
  };

  const renderPivotLinks = (
    linkCollection: PivotLinkCollection,
    renderPivotLinksSelectedKey: string | null | undefined,
  ): JSX.Element => {
    const items = linkCollection.links.map(l => renderPivotLink(linkCollection, l, renderPivotLinksSelectedKey));
    return (
      <FocusZone componentRef={focusZone} direction={FocusZoneDirection.horizontal}>
        <div className={classNames.root} role="tablist">
          {items}
        </div>
      </FocusZone>
    );
  };

  const renderPivotLink = (
    linkCollection: PivotLinkCollection,
    link: IPivotItemProps,
    renderPivotLinkSelectedKey: string | null | undefined,
  ): JSX.Element => {
    const { itemKey, headerButtonProps } = link;
    const tabId = linkCollection.keyToTabIdMapping[itemKey!];
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

  const onKeyPress = (itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      updateSelectedItem(itemKey);
    }
  };

  const updateSelectedItem = (itemKey: string, ev?: React.MouseEvent<HTMLElement>): void => {
    setSelectedKey(itemKey);
    const linkCollection = getPivotLinks();

    if (props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
      const index = linkCollection.keyToIndexMapping[itemKey];
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
  return render();
};

function isPivotItem(item: React.ReactNode): item is PivotItem {
  return (
    !!item &&
    typeof item === 'object' &&
    !!(item as React.ReactElement).type &&
    ((item as React.ReactElement).type as React.ComponentType).name === PivotItem.name
  );
}
