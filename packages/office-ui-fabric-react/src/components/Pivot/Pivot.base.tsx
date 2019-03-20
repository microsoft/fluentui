import * as React from 'react';
import { BaseComponent, KeyCodes, getId, getNativeProps, divProperties, classNamesFunction, warn } from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();

export interface IPivotState {
  selectedKey: string | undefined;
}

const PivotItemType = (<PivotItem /> as React.ReactElement<IPivotItemProps>).type;

type PivotLinkCollection = {
  links: IPivotItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
};

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
export class PivotBase extends BaseComponent<IPivotProps, IPivotState> {
  private _pivotId: string;
  private _focusZone = React.createRef<FocusZone>();
  private _classNames: { [key in keyof IPivotStyles]: string };

  constructor(props: IPivotProps) {
    super(props);

    this._warnDeprecations({
      initialSelectedKey: 'defaultSelectedKey',
      initialSelectedIndex: 'defaultSelectedIndex'
    });

    this._pivotId = getId('Pivot');
    const links: IPivotItemProps[] = this._getPivotLinks(props).links;

    const { defaultSelectedKey = props.initialSelectedKey, defaultSelectedIndex = props.initialSelectedIndex } = props;

    let selectedKey: string | undefined;

    if (defaultSelectedKey) {
      selectedKey = defaultSelectedKey;
    } else if (typeof defaultSelectedIndex === 'number') {
      selectedKey = links[defaultSelectedIndex].itemKey!;
    } else if (links.length) {
      selectedKey = links[0].itemKey!;
    }

    this.state = {
      selectedKey
    };
  }

  /**
   * Sets focus to the first pivot tab.
   */
  public focus(): void {
    if (this._focusZone.current) {
      this._focusZone.current.focus();
    }
  }

  public render(): JSX.Element {
    const linkCollection = this._getPivotLinks(this.props);
    const selectedKey = this._getSelectedKey(linkCollection);

    const divProps = getNativeProps(this.props, divProperties);

    this._classNames = this._getClassNames(this.props);

    return (
      <div {...divProps}>
        {this._renderPivotLinks(linkCollection, selectedKey)}
        {this._renderPivotItem(linkCollection, selectedKey)}
      </div>
    );
  }

  private _getSelectedKey(linkCollection: PivotLinkCollection) {
    const { selectedKey: propsSelectedKey } = this.props;
    if (this._isKeyValid(linkCollection, propsSelectedKey)) {
      return propsSelectedKey;
    }

    const { selectedKey: stateSelectedKey } = this.state;
    if (this._isKeyValid(linkCollection, stateSelectedKey)) {
      return stateSelectedKey;
    }

    if (linkCollection.links.length) {
      return linkCollection.links[0].itemKey;
    }

    return undefined;
  }

  /**
   * Renders the set of links to route between pivots
   */
  private _renderPivotLinks(linkCollection: PivotLinkCollection, selectedKey: string | undefined): JSX.Element {
    const items = linkCollection.links.map(l => this._renderPivotLink(linkCollection, l, selectedKey));

    return (
      <FocusZone componentRef={this._focusZone} direction={FocusZoneDirection.horizontal}>
        <div className={this._classNames.root} role="tablist">
          {items}
        </div>
      </FocusZone>
    );
  }

  private _renderPivotLink = (linkCollection: PivotLinkCollection, link: IPivotItemProps, selectedKey: string | undefined): JSX.Element => {
    const { itemKey, headerButtonProps } = link;
    const tabId = linkCollection.keyToTabIdMapping[itemKey!];
    const { onRenderItemLink } = link;
    let linkContent: JSX.Element | null;
    const isSelected: boolean = selectedKey === itemKey;

    if (onRenderItemLink) {
      linkContent = onRenderItemLink(link, this._renderLinkContent);
    } else {
      linkContent = this._renderLinkContent(link);
    }

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
  private _renderPivotItem(linkCollection: PivotLinkCollection, itemKey: string | undefined): JSX.Element | null {
    if (this.props.headersOnly || !itemKey) {
      return null;
    }

    const index = linkCollection.keyToIndexMapping[itemKey];
    const selectedTabId = linkCollection.keyToTabIdMapping[itemKey];

    return (
      <div role="tabpanel" aria-labelledby={selectedTabId} className={this._classNames.itemContainer}>
        {React.Children.toArray(this.props.children)[index]}
      </div>
    );
  }

  /**
   * Gets the set of PivotLinks as arrary of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  private _getPivotLinks(props: IPivotProps): PivotLinkCollection {
    const result: PivotLinkCollection = {
      links: [],
      keyToIndexMapping: {},
      keyToTabIdMapping: {}
    };

    React.Children.map(props.children, (child: any, index: number) => {
      if (typeof child === 'object' && child.type === PivotItemType) {
        const pivotItem = child as PivotItem;
        const { linkText, ...pivotItemProps } = pivotItem.props;
        const itemKey = pivotItem.props.itemKey || index.toString();

        result.links.push({
          // Use linkText (deprecated) if headerText is not provided
          headerText: linkText,
          ...pivotItemProps,
          itemKey: itemKey
        });
        result.keyToIndexMapping[itemKey] = index;
        result.keyToTabIdMapping[itemKey] = this._getTabId(itemKey, index);
      } else {
        warn('The children of a Pivot component must be of type PivotItem to be rendered.');
      }
    });

    return result;
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
  private _isKeyValid(linkCollection: PivotLinkCollection, itemKey: string | undefined): boolean {
    return itemKey !== undefined && linkCollection.keyToIndexMapping[itemKey] !== undefined;
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

    const linkCollection = this._getPivotLinks(this.props);

    if (this.props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
      const index = linkCollection.keyToIndexMapping[itemKey];

      // React.Element<any> cannot directly convert to PivotItem.
      const item = React.Children.toArray(this.props.children)[index] as any;

      if (typeof item === 'object' && item.type === PivotItemType) {
        this.props.onLinkClick(item as PivotItem, ev);
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
}
