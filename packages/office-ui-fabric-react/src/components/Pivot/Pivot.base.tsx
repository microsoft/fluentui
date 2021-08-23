import * as React from 'react';
import {
  warnDeprecations,
  KeyCodes,
  getId,
  getNativeProps,
  divProperties,
  classNamesFunction,
  warn,
  initializeComponentRef,
  css,
} from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection, IFocusZoneProps } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();
const PivotName = 'Pivot';

export interface IPivotState {
  selectedKey: string | undefined;
}

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
export class PivotBase extends React.Component<IPivotProps, IPivotState> {
  private _pivotId: string;
  private _focusZone = React.createRef<FocusZone>();
  private _classNames: { [key in keyof IPivotStyles]: string };

  constructor(props: IPivotProps) {
    super(props);

    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations(PivotName, props, {
        initialSelectedKey: 'defaultSelectedKey',
        initialSelectedIndex: 'defaultSelectedIndex',
      });
    }

    this._pivotId = getId(PivotName);
    const links: IPivotItemProps[] = this._getPivotLinks(props).links;

    // eslint-disable-next-line deprecation/deprecation
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
      selectedKey,
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
    const { focusZoneProps } = this.props;
    const linkCollection = this._getPivotLinks(this.props);
    const selectedKey = this._getSelectedKey(linkCollection);

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    this._classNames = this._getClassNames(this.props);

    return (
      <div role="toolbar" {...divProps}>
        {this._renderPivotLinks(linkCollection, selectedKey, focusZoneProps)}
        {selectedKey &&
          linkCollection.links.map(
            (link) =>
              (link.alwaysRender === true || selectedKey === link.itemKey) &&
              this._renderPivotItem(linkCollection, link.itemKey, selectedKey === link.itemKey),
          )}
      </div>
    );
  }

  private _getSelectedKey(linkCollection: PivotLinkCollection) {
    const { selectedKey: propsSelectedKey } = this.props;

    if (this._isKeyValid(linkCollection, propsSelectedKey) || propsSelectedKey === null) {
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
  private _renderPivotLinks(
    linkCollection: PivotLinkCollection,
    selectedKey: string | null | undefined,
    focusZoneProps: IFocusZoneProps | undefined,
  ): JSX.Element {
    const items = linkCollection.links.map((l) => this._renderPivotLink(linkCollection, l, selectedKey));

    return (
      <FocusZone
        role="tablist"
        componentRef={this._focusZone}
        direction={FocusZoneDirection.horizontal}
        {...focusZoneProps}
        className={css(this._classNames.root, focusZoneProps?.className)}
      >
        {items}
      </FocusZone>
    );
  }

  private _renderPivotLink = (
    linkCollection: PivotLinkCollection,
    link: IPivotItemProps,
    selectedKey: string | null | undefined,
  ): JSX.Element => {
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
        // eslint-disable-next-line react/jsx-no-bind
        onClick={this._onLinkClick.bind(this, itemKey)}
        // eslint-disable-next-line react/jsx-no-bind
        onKeyDown={this._onKeyDown.bind(this, itemKey)}
        aria-label={link.ariaLabel}
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
   * Renders a Pivot Item
   */
  private _renderPivotItem(
    linkCollection: PivotLinkCollection,
    itemKey: string | undefined,
    isActive: boolean,
  ): JSX.Element | null {
    if (this.props.headersOnly || !itemKey) {
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
        className={this._classNames.itemContainer}
      >
        {React.Children.toArray(this.props.children)[index]}
      </div>
    );
  }

  /**
   * Gets the set of PivotLinks as array of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  private _getPivotLinks(props: IPivotProps): PivotLinkCollection {
    const result: PivotLinkCollection = {
      links: [],
      keyToIndexMapping: {},
      keyToTabIdMapping: {},
    };

    React.Children.map(React.Children.toArray(props.children), (child: React.ReactChild, index: number) => {
      if (_isPivotItem(child)) {
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
  private _isKeyValid(linkCollection: PivotLinkCollection, itemKey: string | null | undefined): boolean {
    return itemKey !== undefined && itemKey !== null && linkCollection.keyToIndexMapping[itemKey] !== undefined;
  }

  /**
   * Handles the onClick event on PivotLinks
   */
  private _onLinkClick(itemKey: string, ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    this._updateSelectedItem(itemKey, ev);
  }

  /**
   * Handle the onKeyDown event on the PivotLinks
   */
  private _onKeyDown(itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void {
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
      selectedKey: itemKey,
    });

    const linkCollection = this._getPivotLinks(this.props);

    if (this.props.onLinkClick && linkCollection.keyToIndexMapping[itemKey] >= 0) {
      const index = linkCollection.keyToIndexMapping[itemKey];

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
      rootIsTabs,
    });
  }
}

function _isPivotItem(item: React.ReactNode): item is PivotItem {
  // In theory, we should be able to just check item.type === PivotItem.
  // However, under certain unclear circumstances (see https://github.com/microsoft/fluentui/issues/10785),
  // the object identity is different despite the function implementation being the same.
  return (
    !!item &&
    typeof item === 'object' &&
    !!(item as React.ReactElement).type &&
    // Casting as an any to avoid [ object Object ] errors.
    ((item as React.ReactElement).type as any).name === (PivotItem as any).name
  );
}
