import * as React from 'react';
import { classNamesFunction, FocusZone, DefaultButton, Icon, TooltipHost } from 'office-ui-fabric-react';
import { IPlatformBarProps, IPlatformBarStyleProps, IPlatformBarStyles } from './PlatformBar.types';
import { IPlatform } from '../PlatformPicker/index';

const getClassNames = classNamesFunction<IPlatformBarStyleProps, IPlatformBarStyles>();

export class PlatformBarBase extends React.PureComponent<IPlatformBarProps> {
  private _classNames: { [key in keyof IPlatformBarStyles]: string };

  public render(): JSX.Element {
    const { styles, theme, platforms, innerWidth } = this.props;

    this._classNames = getClassNames(styles, {
      theme: theme!,
      innerWidth
    });

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.inner}>
          <FocusZone as="ul" className={this._classNames.platformGrid}>
            {this._renderPlatformGrid(platforms)}
          </FocusZone>
        </div>
      </div>
    );
  }

  private _renderPlatformGrid = (platforms: { [key: string]: IPlatform | undefined }): JSX.Element[] => {
    return Object.keys(platforms).map(platformKey => {
      const platform = platforms[platformKey];
      return <li key={platform!.name}>{this._renderPlatformSquare(platform!, platformKey)}</li>;
    });
  };

  private _renderPlatformSquare = (platform: IPlatform, platformKey: string): JSX.Element => {
    const { styles, theme } = this.props;
    const { name, icon, color } = platform;
    const classNames = getClassNames(styles, { theme: theme!, platformColor: color });

    return (
      <TooltipHost content={name} id={platformKey}>
        <DefaultButton
          className={classNames.platformButton}
          aria-describedby={platformKey}
          /* tslint:disable-next-line jsx-no-lambda */
          onClick={() => this._handlePlatformClick(platformKey)}
        >
          <Icon iconName={icon} className={classNames.platformIcon} />
        </DefaultButton>
      </TooltipHost>
    );
  };

  private _handlePlatformClick = (platformKey: string): void => {
    const { onPlatformClick } = this.props;
    if (onPlatformClick) {
      onPlatformClick(platformKey);
    }
  };
}
