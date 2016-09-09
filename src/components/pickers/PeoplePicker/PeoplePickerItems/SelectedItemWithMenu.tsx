/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IPickerItemProps } from '../../PickerItem.Props';
import { Persona, IPersonaProps, PersonaPresence } from '../../../Persona';
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from '../../../ContextualMenu';
import { Button, ButtonType } from '../../../Button';

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class SelectedItemWithMenu extends React.Component<IPickerItemProps<IPersonaProps>, IPeoplePickerItemState> {
  public refs: {
    [key: string]: any,
    ellipsisRef: HTMLElement
  };

  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      isDisabled: true,
    },
  ];

  constructor(props: IPickerItemProps<IPersonaProps>) {
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
      <div className='ms-result-content ms-Picker-MenuItem'>
        <div className='ms-result-item'>
          <Persona
            { ...item }
            presence={ item.presence ? item.presence : PersonaPresence.online }
            />
        </div>
        <div ref='ellipsisRef' className='ms-result-item'>
          <Button
            icon={ 'More' }
            buttonType={ ButtonType.icon } onClick={ this.onContextualMenu }
            />
        </div>
        <div className='ms-result-item'>
          <Button
            icon={ 'Cancel' }
            buttonType={ ButtonType.icon }
            onClick={ onRemoveItem }
            />
        </div>
        { this.state.contextualMenuVisible ? (
          <ContextualMenu
            items={ this.contextualMenuItems }
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