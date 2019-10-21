import * as React from 'react';
import { BaseComponent, css } from '../../../../Utilities';
import { IPeoplePickerItemWithMenuProps } from './PeoplePickerItem.types';
import { Persona, PersonaPresence } from '../../../../Persona';
import { ContextualMenu, DirectionalHint } from '../../../../ContextualMenu';
import { IconButton } from '../../../../Button';
import { FocusZone } from '../../../../FocusZone';

import * as stylesImport from './PickerItemsDefault.scss';
const styles: any = stylesImport;

/** PeoplePickerItemWithMenu state interface. */
export interface IPeoplePickerItemWithMenuState {
  contextualMenuVisible: boolean;
}

/**
 * PeoplePickerItem with an additional contextual menu.
 * @deprecated Do not use. Will be removed in Fabric 7.0
 */
export class SelectedItemWithMenu extends BaseComponent<IPeoplePickerItemWithMenuProps, IPeoplePickerItemWithMenuState> {
  public refs: {
    [key: string]: any;
  };

  private _ellipsisRef = React.createRef<HTMLDivElement>();

  constructor(props: IPeoplePickerItemWithMenuProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
  }

  public render(): JSX.Element {
    const { item, onRemoveItem, removeButtonAriaLabel } = this.props;
    return (
      <div data-is-focusable={true} className={css('ms-PickerItem-container', styles.itemContainer)}>
        <FocusZone className={css('ms-PickerPersona-container', styles.personaContainer)}>
          <div className={css('ms-PickerItem-content', styles.itemContent)}>
            <Persona {...item as any} presence={item.presence !== undefined ? item.presence : PersonaPresence.none} />
          </div>
          <div ref={this._ellipsisRef} className={css('ms-PickerItem-content', styles.itemContent)}>
            <IconButton iconProps={{ iconName: 'More' }} onClick={this._onContextualMenu} />
          </div>
          <div className={css('ms-PickerItem-content', styles.itemContent)}>
            <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onRemoveItem} ariaLabel={removeButtonAriaLabel} />
          </div>
          {this.state.contextualMenuVisible ? (
            <ContextualMenu
              items={item.menuItems!}
              shouldFocusOnMount={true}
              target={this._ellipsisRef.current}
              onDismiss={this._onCloseContextualMenu}
              directionalHint={DirectionalHint.bottomAutoEdge}
            />
          ) : null}
        </FocusZone>
      </div>
    );
  }

  private _onContextualMenu = (ev?: any): void => {
    this.setState({ contextualMenuVisible: true });
  };

  private _onCloseContextualMenu = (ev: React.MouseEvent | React.KeyboardEvent) => {
    this.setState({ contextualMenuVisible: false });
  };
}
