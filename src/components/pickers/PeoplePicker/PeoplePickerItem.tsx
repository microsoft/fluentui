import * as React from 'react';
import { IPickerItemProps } from '../BasePicker';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../Persona';
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from '../../ContextualMenu';
import { Button, ButtonType } from '../../Button';
export interface IPeoplePickerItemProps extends IPickerItemProps {
  item: IPersonaProps;
}

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class PeoplePickerItem extends React.Component<IPeoplePickerItemProps, IPeoplePickerItemState> {
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

  refs: {
    [key: string]: any,
    ellipsisRef: HTMLElement
  }

  constructor(props: IPeoplePickerItemProps) {
    super(props);
    this.onContextualMenu = this.onContextualMenu.bind(this);
    this._onCloseContextualMenu = this._onCloseContextualMenu.bind(this);
    this.state = { contextualMenuVisible: false };
  }

  render(): JSX.Element {
    let {
      item,
      index,
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
            icon={ 'ellipsis' }
            buttonType={ ButtonType.icon } onClick={ this.onContextualMenu }
            />
        </div>
        <div className='ms-result-item'>
          <Button
            icon={ 'x' }
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
    let targetElement: HTMLElement = ev.target as HTMLElement;
    this.setState({ contextualMenuVisible: true });
  }

  private _onCloseContextualMenu(ev: Event) {
    this.setState({ contextualMenuVisible: false });
  }
}