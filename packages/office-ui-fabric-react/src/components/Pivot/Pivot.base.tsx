import * as React from 'react';
import { BaseComponent, KeyCodes, getId, getNativeProps, divProperties, classNamesFunction, warn, css } from '../../Utilities';
import { CommandButton, CommandBarButton, IButtonProps } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles, IPivot } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';
import { IOverflowSet } from '../OverflowSet/OverflowSet.types';
import { OverflowSet } from '../OverflowSet';
import { IResizeGroup } from '../ResizeGroup/ResizeGroup.types';
import { ResizeGroup } from '../ResizeGroup';
import { ICommandBarItemProps } from '../CommandBar/CommandBar.types';
import { IContextualMenuItem, ContextualMenuItemType } from '../ContextualMenu/ContextualMenu.types';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();
export interface IPivotData {
  /**
   * Items being rendered as tabs
   */
  items: IPivotItemProps[];
  /**
   * Items being rendered in the overflow
   */
  overflowItems: IContextualMenuItem[];
  /**
   * Unique string used to cache the width of the command bar
   */
  cacheKey: string;
}

interface IPivotInitialData {
  items: IPivotItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
}

export interface IPivotState {
  selectedKey: string | undefined;
}

/**
 *  Usage:
 *
 *     <Pivot>
 *       <PivotItem headerText="Foo">
 *         <Label>Pivot #1</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bar">
 *         <Label>Pivot #2</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bas">
 *         <Label>Pivot #3</Label>
 *       </PivotItem>
 *     </Pivot>
 */
export class PivotBase extends BaseComponent<IPivotProps, IPivotState> implements IPivot {
  private _pivotId: string;
  private _overflowSet = React.createRef<IOverflowSet>();
  private _resizeGroup = React.createRef<IResizeGroup>();
  private _classNames: { [key in keyof IPivotStyles]: string };
  private _links: IPivotItemProps[];
  private _keyToIndexMapping: { [key: string]: number };
  private _keyToTabIdMapping: { [key: string]: string };

  constructor(props: IPivotProps) {
    super(props);

    this._warnDeprecations({
      initialSelectedKey: 'defaultSelectedKey',
      initialSelectedIndex: 'defaultSelectedIndex'
    });

    this._pivotId = getId('Pivot');
    const links = this._getPivotLinks(props).items;

    const { defaultSelectedKey = props.initialSelectedKey, defaultSelectedIndex = props.initialSelectedIndex } = props;

    let selectedKey: string | undefined;

    if (defaultSelectedKey) {
      selectedKey = defaultSelectedKey;
    } else if (typeof defaultSelectedIndex === 'number') {
      selectedKey = links[defaultSelectedIndex].itemKey!;
    } else if (links.length) {
      selectedKey = links[0].itemKey!;
    }

    this._links = links;
    this.state = {
      selectedKey
    };
  }

  /**
   * Sets focus to the first pivot tab.
   */
  public focus(): void {
    if (this._overflowSet.current) {
      this._overflowSet.current.focus();
    }
  }

  public remeasure(): void {
    this._resizeGroup.current && this._resizeGroup.current.remeasure();
  }

  public render(): JSX.Element {
    const { dataDidRender, onReduceData = this._onReduceData, onGrowData = this._onGrowData } = this.props;

    const pivotLinksData = this._getPivotLinks(this.props);

    // Set the initial data
    const pivotData: IPivotData = {
      items: [...pivotLinksData.items],
      overflowItems: [],
      cacheKey: ''
    };
    this._links = pivotLinksData.items;
    this._keyToIndexMapping = pivotLinksData.keyToIndexMapping;
    this._keyToTabIdMapping = pivotLinksData.keyToTabIdMapping;

    const selectedKey = this._getSelectedKey();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    this._classNames = this._getClassNames(this.props);

    return (
      <div {...divProps}>
        <ResizeGroup
          {...divProps} // should I do something different to support backwards comp?
          componentRef={this._resizeGroup}
          data={pivotData}
          onReduceData={onReduceData}
          onGrowData={onGrowData}
          onRenderData={this._renderPivotLinks}
          dataDidRender={dataDidRender}
        />
        {/* {this._renderPivotLinks(pivotLinks)} */}
        {selectedKey && this._renderPivotItem(this._keyToIndexMapping, this._keyToTabIdMapping, selectedKey)}
      </div>
    );
  }

  private _getSelectedKey = () => {
    const { selectedKey: propsSelectedKey } = this.props;

    if (this._isKeyValid(this._keyToIndexMapping, propsSelectedKey) || propsSelectedKey === null) {
      return propsSelectedKey;
    }

    const { selectedKey: stateSelectedKey } = this.state;
    if (this._isKeyValid(this._keyToIndexMapping, stateSelectedKey)) {
      return stateSelectedKey;
    }

    if (this._links.length) {
      return this._links[0].itemKey;
    }

    return undefined;
  };

  /**
   * Renders the set of links to route between pivots
   */
  private _renderPivotLinks = (data: IPivotData): JSX.Element => {
    // const selectedKey = this._getSelectedKey();
    // const items = linkCollection.links.map(l => this._renderPivotLink(linkCollection, l, selectedKey));

    return (
      // <FocusZone componentRef={this._focusZone} direction={FocusZoneDirection.horizontal}>
      <OverflowSet
        componentRef={this._overflowSet}
        className={css(this._classNames.root)}
        focusZoneProps={{
          direction: FocusZoneDirection.horizontal
        }}
        role={'presentation'}
        // TODO: Is is fair to assume itemKey will always have a value??
        items={data.items.map(x => {
          return { ...x, key: x.itemKey || '' };
        })}
        overflowItems={data.overflowItems.length ? data.overflowItems : undefined}
        onRenderItem={this._renderPivotLink}
        onRenderOverflowButton={this._onRenderOverflowButton}
      />
      // <div className={this._classNames.root} role="tablist">
      //   {items}
      // </div>
      // </FocusZone>
    );
  };

  private _renderPivotLink = (link: IPivotItemProps): JSX.Element => {
    const { itemKey, headerButtonProps } = link;
    const tabId = this._keyToTabIdMapping[itemKey!];
    const { onRenderItemLink } = link;
    let linkContent: JSX.Element | null;
    const isSelected: boolean = this._getSelectedKey() === itemKey;

    if (onRenderItemLink) {
      linkContent = onRenderItemLink(link, this._renderLinkContent);
    } else {
      linkContent = this._renderLinkContent(link);
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
        className={isSelected ? this._classNames.linkIsSelected : this._classNames.link}
        onClick={this._onLinkClick.bind(this, itemKey)}
        onKeyPress={this._onKeyPress.bind(this, itemKey)}
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

  private _renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;
    const classNames = this._classNames;

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

  /**
   * Renders the current Pivot Item
   */
  private _renderPivotItem(
    keyToIndexMapping: { [key: string]: number },
    keyToTabIdMapping: { [key: string]: string },
    itemKey: string | undefined
  ): JSX.Element | null {
    if (this.props.headersOnly || !itemKey) {
      return null;
    }

    const index = keyToIndexMapping[itemKey];
    const selectedTabId = keyToTabIdMapping[itemKey];

    return (
      <div role="tabpanel" aria-labelledby={selectedTabId} className={this._classNames.itemContainer}>
        {React.Children.toArray(this.props.children)[index]}
      </div>
    );
  }

  /**
   * Gets the set of PivotLinks as array of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  private _getPivotLinks(props: IPivotProps): IPivotInitialData {
    const result: IPivotItemProps[] = [];
    const keyToIndexMapping: { [key: string]: number } = {};
    const keyToTabIdMapping: { [key: string]: string } = {};

    React.Children.map(React.Children.toArray(props.children), (child: React.ReactChild, index: number) => {
      if (_isPivotItem(child)) {
        const pivotItem = child;
        const { linkText, ...pivotItemProps } = pivotItem.props;
        const itemKey = pivotItem.props.itemKey || index.toString();

        result.push({
          // Use linkText (deprecated) if headerText is not provided
          headerText: linkText,
          ...pivotItemProps,
          itemKey: itemKey
        });
        keyToIndexMapping[itemKey] = index;
        keyToTabIdMapping[itemKey] = this._getTabId(itemKey, index);
      } else {
        warn('The children of a Pivot component must be of type PivotItem to be rendered.');
      }
    });

    return {
      items: result,
      keyToIndexMapping: keyToIndexMapping,
      keyToTabIdMapping: keyToTabIdMapping
    };
  }

  /**
   * Generates the Id for the tab button.
   */
  private _getTabId(itemKey: string, index: number): string {
    if (this.props.getTabId) {
      return this.props.getTabId(itemKey, index);
    }

    return this._pivotId + `-Tab${index}`;
  }

  /**
   * whether the key exists in the pivot items.
   */
  private _isKeyValid(keyToIndexMapping: { [key: string]: number }, itemKey: string | null | undefined): boolean {
    return itemKey !== undefined && itemKey !== null && keyToIndexMapping[itemKey] !== undefined;
  }

  /**
   * Handles the onClick event on PivotLinks
   */
  private _onLinkClick(itemKey: string, ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    this._updateSelectedItem(itemKey, ev);
  }

  /**
   * Handle the onKeyPress eventon the PivotLinks
   */
  private _onKeyPress(itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      this._updateSelectedItem(itemKey);
    }
  }

  /**
   * Updates the state with the new selected index
   */
  private _updateSelectedItem(itemKey: string, ev?: React.MouseEvent<HTMLElement>): void {
    this.setState({
      selectedKey: itemKey
    });

    if (this.props.onLinkClick && this._keyToIndexMapping[itemKey] >= 0) {
      const index = this._keyToIndexMapping[itemKey];

      // React.Element<any> cannot directly convert to PivotItem.
      const item = React.Children.toArray(this.props.children)[index];

      if (_isPivotItem(item)) {
        this.props.onLinkClick(item, ev);
      }
    }
  }

  private _getClassNames(props: IPivotProps): { [key in keyof IPivotStyles]: string } {
    const { theme } = props;
    const rootIsLarge: boolean = props.linkSize === PivotLinkSize.large;
    const rootIsTabs: boolean = props.linkFormat === PivotLinkFormat.tabs;

    return getClassNames(props.styles!, {
      theme: theme!,
      rootIsLarge,
      rootIsTabs
    });
  }

  private _onRenderOverflowButton = (overflowItems: ICommandBarItemProps[]): JSX.Element => {
    const {
      overflowButtonAs: OverflowButtonType = CommandBarButton,
      overflowButtonProps = {} // assure that props is not empty
    } = this.props;

    const combinedOverflowItems: ICommandBarItemProps[] = [
      ...(overflowButtonProps.menuProps ? overflowButtonProps.menuProps.items : []),
      ...overflowItems
    ];

    const overflowProps: IButtonProps = {
      ...overflowButtonProps,
      styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.styles },
      className: css('ms-CommandBar-overflowButton', overflowButtonProps.className),
      menuProps: { ...overflowButtonProps.menuProps, items: combinedOverflowItems },
      menuIconProps: { iconName: 'More', ...overflowButtonProps.menuIconProps }
    };

    return <OverflowButtonType {...overflowProps as IButtonProps} />;
  };

  private _computeCacheKey(data: IPivotData): string {
    const { items: primaryItems, overflowItems } = data;
    const returnKey = (acc: string, current: IPivotItemProps): string => {
      const { cacheKey = current.itemKey } = current;
      return acc + cacheKey;
    };

    const primaryKey = primaryItems.reduce(returnKey, '');
    const overflowKey = !!overflowItems.length ? 'overflow' : '';

    return [primaryKey, overflowKey].join(' ');
  }

  private _onReduceData = (data: IPivotData): IPivotData | undefined => {
    const { shiftOnReduce, onDataReduced } = this.props;
    let { items: primaryItems, overflowItems, cacheKey } = data;

    // Use first item if shiftOnReduce, otherwise use last item
    const movedItem = primaryItems[shiftOnReduce ? 0 : primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;

      const convertedItem: IContextualMenuItem = {
        key: movedItem.itemKey || '',
        ...movedItem,
        componentRef: undefined, // mismatched types
        itemType: ContextualMenuItemType.Normal, // mismatched types
        onMouseDown: undefined, // mismatched types
        text: movedItem.linkText || movedItem.headerText,
        // TODO: Is is fair to assume itemKey will always have a value??
        onClick: (ev?: React.MouseEvent<HTMLElement>): boolean => {
          // if (ev && ev.keyCode) {
          // | React.KeyboardEvent<HTMLElement>
          // }
          console.log('Before');
          this._onLinkClick(movedItem.itemKey || '', ev!);
          console.log('***Hit me');
          return true; // tell the menu to close
        }
      };

      // TODO: Is is fair to assume itemKey will always have a value??
      overflowItems = [convertedItem, ...overflowItems];
      primaryItems = shiftOnReduce ? primaryItems.slice(1) : primaryItems.slice(0, -1);
      const newData: IPivotData = { ...data, items: primaryItems, overflowItems };
      cacheKey = this._computeCacheKey(newData);

      if (onDataReduced) {
        onDataReduced(movedItem);
      }

      newData.cacheKey = cacheKey;
      return newData;
    }

    return undefined;
  };

  private _onGrowData = (data: IPivotData): IPivotData | undefined => {
    const { shiftOnReduce, onDataGrown } = this.props;
    let { items: primaryItems, overflowItems, cacheKey } = data;
    const movedItem = overflowItems[0];

    // Since we converted the tab into a buton, we need to grab the original properties
    // Since we set an itemKey on every entry even if not provided(we use index) this should always resolve to a record
    const originalItem = movedItem && movedItem.key ? this._links.find(x => x.itemKey === movedItem.key) : undefined;

    // Make sure that moved item exists
    if (originalItem !== undefined) {
      originalItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(1);
      // if shiftOnReduce, movedItem goes first, otherwise, last.
      primaryItems = shiftOnReduce ? [originalItem, ...primaryItems] : [...primaryItems, originalItem];

      const newData: IPivotData = { ...data, items: primaryItems, overflowItems };
      cacheKey = this._computeCacheKey(newData);

      if (onDataGrown) {
        onDataGrown(originalItem);
      }

      newData.cacheKey = cacheKey;
      return newData;
    }

    return undefined;
  };
}

function _isPivotItem(item: React.ReactNode): item is PivotItem {
  // In theory, we should be able to just check item.type === PivotItem.
  // However, under certain unclear circumstances (see https://github.com/OfficeDev/office-ui-fabric-react/issues/10785),
  // the object identity is different despite the function implementation being the same.
  return (
    !!item &&
    typeof item === 'object' &&
    !!(item as React.ReactElement).type &&
    ((item as React.ReactElement).type as React.ComponentType).name === PivotItem.name
  );
}
