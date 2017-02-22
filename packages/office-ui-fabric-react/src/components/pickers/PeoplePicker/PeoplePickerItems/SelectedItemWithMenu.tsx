/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { IPeoplePickerItemWithMenuProps } from './PeoplePickerItem.Props';
import { Persona, PersonaPresence } from '../../../../Persona';
import { ContextualMenu, DirectionalHint } from '../../../../ContextualMenu';
import { Button, ButtonType } from '../../../../Button';
import { FocusZone } from '../../../../FocusZone';
import styles from './PickerItemsDefault.scss';

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class SelectedItemWithMenu extends React.Component<IPeoplePickerItemWithMenuProps, IPeoplePickerItemState> {
  public refs: {
    [key: string]: any,
    ellipsisRef: HTMLElement
  };

  constructor(props: IPeoplePickerItemWithMenuProps) {
    super(props);
    this.onContextualMenu = this.onContextualMenu.bind(this);
    this._onCloseContextualMenu = this._onCloseContextualMenu.bind(this);
    this.state = { contextualMenuVisible: false };
  }

  public render() {
    let {
      item,
      onRemoveItem
    } = this.props;
    return (
      <div data-is-focusable={ true } className={ css('ms-PickerItem-container', styles.pickerItemContainer) }>
        <FocusZone className={ css('ms-PickerPersona-container', styles.pickerPersonaContainer) } >
          <div className={ css('ms-PickerItem-content', styles.pickerItemContent) }>
            <Persona
              { ...item }
              presence={ item.presence !== undefined ? item.presence : PersonaPresence.none }
            />
          </div>
          <div ref='ellipsisRef' className={ css('ms-PickerItem-content', styles.pickerItemContent) }>
            <Button
              icon={ 'More' }
              buttonType={ ButtonType.icon } onClick={ this.onContextualMenu }
            />
          </div>
          <div className={ css('ms-PickerItem-content', styles.pickerItemContent) }>
            <Button
              icon={ 'Cancel' }
              buttonType={ ButtonType.icon }
              onClick={ onRemoveItem }
            />
          </div>
          { this.state.contextualMenuVisible ? (
            <ContextualMenu
              items={ item.menuItems }
              shouldFocusOnMount={ true }
              targetElement={ this.refs.ellipsisRef }
              onDismiss={ this._onCloseContextualMenu }
              directionalHint={ DirectionalHint.bottomAutoEdge } />)
            : null }
        </FocusZone>
      </div>
    );
  }

  private onContextualMenu(ev?: any) {
    this.setState({ contextualMenuVisible: true });
  }

  private _onCloseContextualMenu(ev: Event) {
    this.setState({ contextualMenuVisible: false });
  }
}
