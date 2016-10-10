/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IPeoplePickerItemWithMenuProps } from './PeoplePickerItem.Props';
import { Persona, PersonaPresence } from '../../../Persona';
import { ContextualMenu, DirectionalHint } from '../../../ContextualMenu';
import { Button, ButtonType } from '../../../Button';

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
      <div className='ms-PickerPersona-container'>
        <div className='ms-PickerItem-content'>
          <Persona
            { ...item }
            presence={ item.presence ? item.presence : PersonaPresence.online }
            />
        </div>
        <div ref='ellipsisRef' className='ms-PickerItem-content'>
          <Button
            icon={ 'More' }
            buttonType={ ButtonType.icon } onClick={ this.onContextualMenu }
            />
        </div>
        <div className='ms-PickerItem-content'>
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
            directionalHint={ DirectionalHint.bottomAutoEdge }/>)
          : null }
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