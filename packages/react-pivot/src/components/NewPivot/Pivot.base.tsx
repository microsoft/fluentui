import * as React from 'react';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from '../Pivot/Pivot.types';
import { KeyCodes, getId, getNativeProps, divProperties, classNamesFunction } from '@uifabric/utilities';

import { IPivotItemProps } from '../Pivot/PivotItem.types';

import { styles } from '../../../../office-ui-fabric-react/src/components/Stack/Stack.styles';

// Pivot Component
/**
 * Get the set of PivotLinks as array of IPivotItemProps
 * The set of Links is determined by child components of type PivotItem
 * Generate the Id for the tab button
 * Check if the key exists in the pivot items
 * Handle the onClick event on PivotLinks
 * Handle the onKeyPress event on the PivotLinks
 * Updates the state with the new selected index
 *
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

export interface IPivotState {
  selectedKey: string | undefined;
}

/**
 * Generate the Id for the tab button.
 */
let key = 0;

const nextItemKey = (): string => {
  return `itemKey-${key++}`;
};

/**
 *
 */
export const PivotBase = (props: IPivotProps) => {
  const links: IPivotProps[] = [];
  let index = 0;

  /**
   * Check the children elements to ensure props are passed
   */
  React.Children.forEach(props.children, element => {
    if (!React.isValidElement(element)) {
      return;
    }
    if (element && element.props) {
      const link = { ...element.props, index: index++ };
      if (!link.tabId) {
        link.tabId = nextItemKey();
      }
      links.push(link);
    }
  });

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(props.defaultSelectedKey !== undefined);

  /**
   *
   */
  const renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;
    return (
      <span className={styles.linkContent}>
        {itemIcon !== undefined && <span>{itemIcon}</span>}
        {headerText !== undefined && <span className={styles.text}> {link.headerText}</span>}
        {itemCount !== undefined && <span className={styles.count}> ({itemCount})</span>}
      </span>
    );
  };

  /**
   * Search items for matching key
   */
  const findItem = (itemKey: string | null | undefined): IPivotItemProps | null => {
    if (!itemKey) {
      return null;
    }
    for (let i = 0; i < links.length; i++) {
      if (itemKey === links[i].itemKey) {
        return links[i];
      }
    }
    return null;
  };

  /**
   * Update the state when an item is selected
   */
  const updateSelectedItem = (itemKey: string, ev?: React.MouseEvent<HTMLElement>): void => {
    const item = findItem(itemKey);

    if (item) {
      if (props.onLinkClick) {
        props.onLinkClick(item, ev);
      }
      setSelectedKey(itemKey);
    }
  };

  /**
   * Onclick handler
   */
  const onLinkClick = (itemKey: string, ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    updateSelectedItem(itemKey, ev);
  };

  /**
   * On key press handler
   */
  const onKeyPress = (itemKey: string, ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      updateSelectedItem(itemKey);
    }
  };

  /**
   * Render the links
   */
  const renderPivotLink = (link: IPivotItemProps): JSX.Element => {
    const { itemKey, headerButtonProps, tabId, onRenderItemLink } = link;
    const itemKeyActual = itemKey!;
    const isSelected: boolean = selectedKey === itemKey;

    const linkContent = onRenderItemLink ? onRenderItemLink(link, renderLinkContent) : renderLinkContent(link);

    let contentString = link.headerText || '';
    contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
    contentString += link.itemIcon ? ' xx' : '';

    return (
      <button
        {...headerButtonProps}
        id={tabId}
        key={itemKey}
        className={[styles.link, isSelected && styles.selected].join('')}
        onClick={ev => onLinkClick(itemKeyActual, ev)}
        onKeyPress={ev => onKeyPress(itemKeyActual, ev)}
        role="tab"
        aria-selected={isSelected}
        name={link.headerText}
        data-content={contentString}
      >
        {linkContent}
      </button>
    );
  };

  const renderPivotLinks = () => {
    const items = links.map(renderPivotLink);
    // Import focus zone library
    return (
      <div className={styles.root} role="tablist">
        {items}
      </div>
    );
  };

  const renderPivotItem = (): JSX.Element | null => {
    const item = findItem(selectedKey);
    if (props.headersOnly || !item) {
      return null;
    }
    return (
      <div role="tabpanel" aria-labelledby={item.tabId}>
        {React.Children.toArray(props.children)[(item as any).index]}
      </div>
    );
  };

  // const _classNames: { [key in keyof IPivotStyles]: string };

  const { classes = {} } = props;
  const nativeProps = getNativeProps(props, divProperties);

  const render = () => {
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    return (
      <div>
        <Pivot aria-label="Basic Pivot Example">
          <PivotItem headerText="#1" itemKey="first">
            Pivot #1
          </PivotItem>
          <PivotItem headerText="Recent" itemKey="second">
            Pivot #2
          </PivotItem>
          <PivotItem headerText="Shared with me" itemKey="third">
            Pivot #3
          </PivotItem>
        </Pivot>
      </div>
    );
  };
  return render();
};
