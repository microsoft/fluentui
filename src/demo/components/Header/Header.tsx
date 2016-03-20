import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../../utilities/focus/index';
import { default as ContextualMenu, IContextualMenuItem, DirectionalHint } from '../../../components/ContextualMenu/index';
import './Header.scss';

export interface IHeaderProps {
  title: string;
  sideLinks: { name: string, url: string }[];
}

export interface IHeaderState {
  contextMenu: {
    target: HTMLElement,
    items: IContextualMenuItem[]
  };
  isRTLEnabled: boolean;
}

export class Header extends React.Component<IHeaderProps, any> {
  constructor() {
    super();

    this._onGearClick = this._onGearClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onRTLToggled = this._onRTLToggled.bind(this);

    this.state = {
      contextMenu: null
    };
  }

  public render() {
    let { title, sideLinks } = this.props;
    let { contextMenu } = this.state;

    return (
      <div>
        <div className='Header'>
          <div className='Header-title ms-font-xl ms-fontColor-white'>
            <i className='ms-Icon ms-Icon--classroom' />
            { title }
          </div>
          <div className='Header-buttons'>
            <FocusZone direction={ FocusZoneDirection.horizontal }>
              { sideLinks.map((link, linkIndex) => (
                <a key={ linkIndex } className='Header-button ms-fontColor-white' href={ link.url }>{ link.name }</a>
              )).concat([
                <button key='headerButton' className='Header-button' onClick={ this._onGearClick }>
                  <i className='ms-Icon ms-Icon--gear'/>
                </button>
              ]) }
            </FocusZone>
          </div>
        </div>
        { contextMenu ? (
        <ContextualMenu
          items={ contextMenu.items }
          isBeakVisible={ true }
          targetElement={ contextMenu.target }
          directionalHint={ DirectionalHint.bottomRightEdge }
          gapSpace={ 5 }
          onDismiss={ this._onDismiss } />
        ) : (null) }
      </div>
    );
  }

  private _onGearClick(ev: React.MouseEvent) {
    let { contextMenuItems } = this.state;

    this.setState({
      contextMenu: {
        target: ev.currentTarget,
        items: contextMenuItems ? null : this._getOptionMenuItems()
      }
    });
  }

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [{
      key: 'isRTL',
      name: 'Render in RTL',
      icon: 'gear',
      onClick: this._onRTLToggled
    }];
  }

  private _onRTLToggled(item, ev: React.MouseEvent) {
    let { isRTLEnabled } = this.state;
    let { documentElement } = document;

    if (isRTLEnabled) {
      documentElement.setAttribute('dir', 'ltr');
    } else {
      documentElement.setAttribute('dir', 'rtl');
    }

    this.setState({
      isRTLEnabled: !isRTLEnabled,
      contextMenu: null
    });
  }

  private _onDismiss() {
    this.setState({
      contextMenu: null
    });
  }
}
