import './Header.scss';

import * as React from 'react';

import { ContextualMenu, DirectionalHint, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { ResponsiveMode, withResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { getRTL, setRTL } from 'office-ui-fabric-react/lib/Utilities';

import { FontClassNames } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IHeaderProps {
  title: string;
  sideLinks: { name: string; url: string }[];

  isMenuVisible: boolean;
  onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;

  responsiveMode?: ResponsiveMode;
}

export interface IHeaderState {
  contextMenu?: {
    target: HTMLElement;
    items: IContextualMenuItem[];
  };
}

@withResponsiveMode
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  private _isRTLEnabled: boolean;

  constructor(props: IHeaderProps) {
    super(props);

    this._isRTLEnabled = getRTL();
    this.state = {
      contextMenu: undefined
    };
  }

  public render(): JSX.Element {
    const { title, responsiveMode = ResponsiveMode.xLarge } = this.props;
    const { contextMenu } = this.state;
    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    // For screen sizes large down, hide the side links.
    const sideLinks = isLargeDown ? [] : this.props.sideLinks;

    return (
      <div>
        <div className="Header">
          {isLargeDown && (
            <button className="Header-button" onClick={this._onMenuClick}>
              <Icon iconName="GlobalNavButton" />
            </button>
          )}
          <div className={'Header-title ' + FontClassNames.large}>{title}</div>
          <div className="Header-buttons">
            <FocusZone direction={FocusZoneDirection.horizontal}>
              {sideLinks
                .map((link: { name: string; url: string }, linkIndex: number) => (
                  <a key={linkIndex} className="Header-button" href={link.url}>
                    {link.name}
                  </a>
                ))
                .concat([
                  <button key="headerButton" className="Header-button" onClick={this._onGearClick}>
                    <Icon iconName="Settings" />
                  </button>
                ])}
            </FocusZone>
          </div>
        </div>
        {contextMenu ? (
          <ContextualMenu
            items={contextMenu.items}
            isBeakVisible={true}
            target={contextMenu.target}
            directionalHint={DirectionalHint.bottomAutoEdge}
            gapSpace={5}
            onDismiss={this._onDismiss}
          />
        ) : null}
      </div>
    );
  }

  private _onMenuClick = () => {
    const { onIsMenuVisibleChanged, isMenuVisible } = this.props;

    if (onIsMenuVisibleChanged) {
      onIsMenuVisibleChanged(!isMenuVisible);
    }
  };

  private _onGearClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { contextMenu } = this.state;

    this.setState({
      contextMenu: contextMenu
        ? undefined
        : {
            target: ev.currentTarget as HTMLElement,
            items: this._getOptionMenuItems()
          }
    });
  };

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [
      {
        key: 'isRTL',
        name: `Render in ${this._isRTLEnabled ? 'LTR' : 'RTL'}`,
        iconProps: { iconName: 'Settings' },
        onClick: this._onRTLToggled
      }
    ];
  }

  private _onRTLToggled = () => {
    setRTL(!this._isRTLEnabled, true);
    location.reload();
  };

  private _onDismiss = () => {
    this.setState({
      contextMenu: undefined
    });
  };
}
