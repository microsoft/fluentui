import * as React from 'react';

import { ContextualMenu, DirectionalHint, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { getRTL, setRTL, classNamesFunction, styled } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';

import { IHeaderProps, IHeaderStyleProps, IHeaderStyles } from './Header.types';
import { getStyles } from './Header.styles';

export interface IHeaderState {
  contextMenu?: {
    target: HTMLElement;
    items: IContextualMenuItem[];
  };
}

const getClassNames = classNamesFunction<IHeaderStyleProps, IHeaderStyles>();

export class HeaderBase extends React.Component<IHeaderProps, IHeaderState> {
  private _isRTLEnabled: boolean;

  constructor(props: IHeaderProps) {
    super(props);

    this._isRTLEnabled = getRTL();
    this.state = {
      contextMenu: undefined,
    };
  }

  public render(): JSX.Element {
    const { title, styles, isLargeDown = false, theme } = this.props;
    const { contextMenu } = this.state;

    // For screen sizes large down, hide the side links.
    const sideLinks = isLargeDown ? [] : this.props.sideLinks;

    const classNames = getClassNames(styles, { theme, isLargeDown });
    const { subComponentStyles } = classNames;

    return (
      <div>
        <div className={classNames.root}>
          {isLargeDown && (
            <button className={classNames.button} onClick={this._onMenuClick}>
              <Icon iconName="GlobalNavButton" styles={subComponentStyles.icons} />
            </button>
          )}
          <div className={classNames.title}>{title}</div>
          <div className={classNames.buttons}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              {sideLinks
                .map(link => (
                  <a key={link.url} className={classNames.button} href={link.url}>
                    {link.name}
                  </a>
                ))
                .concat([
                  <button
                    key="headerButton"
                    className={classNames.button}
                    onClick={this._onGearClick}
                    aria-label="Settings"
                    aria-expanded={!!contextMenu}
                  >
                    <Icon iconName="Settings" styles={subComponentStyles.icons} />
                  </button>,
                ])}
            </FocusZone>
          </div>
        </div>
        {contextMenu && (
          <ContextualMenu
            items={contextMenu.items}
            isBeakVisible={true}
            target={contextMenu.target}
            directionalHint={DirectionalHint.bottomAutoEdge}
            gapSpace={5}
            onDismiss={this._onDismiss}
          />
        )}
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
            items: this._getOptionMenuItems(),
          },
    });
  };

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [
      {
        key: 'isRTL',
        name: `Render in ${this._isRTLEnabled ? 'LTR' : 'RTL'}`,
        iconProps: { iconName: 'Settings' },
        onClick: this._onRTLToggled,
      },
    ];
  }

  private _onRTLToggled = () => {
    setRTL(!this._isRTLEnabled, true);
    location.reload();
  };

  private _onDismiss = () => {
    this.setState({
      contextMenu: undefined,
    });
  };
}

export const Header: React.FunctionComponent<IHeaderProps> = styled<IHeaderProps, IHeaderStyleProps, IHeaderStyles>(
  HeaderBase,
  getStyles,
  undefined,
  {
    scope: 'Header',
  },
);
