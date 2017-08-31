import * as React from 'react';
import { getRTL, setRTL } from 'office-ui-fabric-react/lib/Utilities';
import {
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { withResponsiveMode, ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './Header.scss';
import { FontClassNames } from '@uifabric/styling/lib/index';

export interface IHeaderProps {
  title: string;
  sideLinks: { name: string, url: string }[];

  isMenuVisible: boolean;
  onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;

  responsiveMode?: ResponsiveMode;
}

export interface IHeaderState {
  contextMenu?: {
    target: HTMLElement,
    items: IContextualMenuItem[]
  };
}

@withResponsiveMode
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  private _isRTLEnabled: boolean;

  constructor(props: IHeaderProps) {
    super(props);

    this._onGearClick = this._onGearClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onRTLToggled = this._onRTLToggled.bind(this);
    this._onMenuClick = this._onMenuClick.bind(this);

    this._isRTLEnabled = getRTL();
    this.state = {
      contextMenu: undefined
    };
  }

  public render(): JSX.Element {
    let { title, sideLinks, responsiveMode } = this.props;
    let { contextMenu } = this.state;

    if (responsiveMode === undefined) {
      responsiveMode = ResponsiveMode.large;
    }

    // In medium and below scenarios, hide the side links.
    if (responsiveMode <= ResponsiveMode.large) {
      sideLinks = [];
    }

    return (
      <div>
        <div className='Header'>
          { (responsiveMode <= ResponsiveMode.large) && (
            <button className='Header-button' onClick={ this._onMenuClick }>
              <Icon iconName='GlobalNavButton' />
            </button>
          ) }
          <div className={ 'Header-title ' + FontClassNames.large }>
            <Icon iconName='Org' />
            { title }
          </div>
          <div className='Header-buttons'>
            <FocusZone direction={ FocusZoneDirection.horizontal }>
              { sideLinks.map((link: {
                name: string;
                url: string;
              }, linkIndex: number) => (
                  <a key={ linkIndex } className='Header-button' href={ link.url }>{ link.name }</a>
                )).concat([
                  <button key='headerButton' className='Header-button' onClick={ this._onGearClick }>
                    <Icon iconName='Settings' />
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
            directionalHint={ DirectionalHint.bottomAutoEdge }
            gapSpace={ 5 }
            onDismiss={ this._onDismiss }
          />
        ) : (null) }
      </div>
    );
  }

  private _onMenuClick(ev: React.MouseEvent<HTMLElement>): void {
    let { onIsMenuVisibleChanged, isMenuVisible } = this.props;

    if (onIsMenuVisibleChanged) {
      onIsMenuVisibleChanged(!isMenuVisible);
    }
  }

  private _onGearClick(ev: React.MouseEvent<HTMLElement>): void {
    let { contextMenu } = this.state;

    this.setState({
      contextMenu: contextMenu ? undefined : {
        target: ev.currentTarget as HTMLElement,
        items: this._getOptionMenuItems()
      }
    });
  }

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [{
      key: 'isRTL',
      name: `Render in ${this._isRTLEnabled ? 'LTR' : 'RTL'}`,
      icon: 'Settings',
      onClick: this._onRTLToggled
    }];
  }

  private _onRTLToggled(ev: React.MouseEvent<HTMLElement>): void {
    setRTL(!this._isRTLEnabled);
    location.reload();
  }

  private _onDismiss(): void {
    this.setState({
      contextMenu: undefined
    });
  }
}
