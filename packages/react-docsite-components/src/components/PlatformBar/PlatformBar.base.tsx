import * as React from 'react';
import { classNamesFunction, FocusZone, Icon, TooltipHost } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IPlatformBarProps, IPlatformBarStyleProps, IPlatformBarStyles } from './PlatformBar.types';
import { IPlatform } from '../PlatformPicker/index';
import { INavPage } from '../Nav/index';

const getClassNames = classNamesFunction<IPlatformBarStyleProps, IPlatformBarStyles>();

export class PlatformBarBase<TPlatforms extends string = string> extends React.PureComponent<
  IPlatformBarProps<TPlatforms>
> {
  private _classNames: { [key in keyof IPlatformBarStyles]: string };

  public render(): JSX.Element {
    const { styles, theme, platforms, innerWidth } = this.props;

    this._classNames = getClassNames(styles, {
      theme: theme!,
      innerWidth,
    });

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.inner}>
          {/* Override default role of "presentation" to prevent warning about li outside of ul */}
          <FocusZone as="ul" className={this._classNames.platformGrid} role="list">
            {this._renderPlatformGrid(platforms)}
          </FocusZone>
        </div>
      </div>
    );
  }

  private _renderPlatformGrid = (platforms: { [key: string]: IPlatform | undefined }): JSX.Element[] => {
    return Object.keys(platforms)
      .filter(platform => !!platforms[platform as TPlatforms])
      .map((platformKey: TPlatforms) => {
        const platform: IPlatform = platforms[platformKey]!;
        return <li key={platform!.name}>{this._renderPlatformSquare(platform!, platformKey)}</li>;
      });
  };

  private _renderPlatformSquare = (platform: IPlatform, platformKey: TPlatforms): JSX.Element => {
    const { styles, theme, pagePlatforms } = this.props;
    const { name, icon, color } = platform;
    const classNames = getClassNames(styles, { theme: theme!, platformColor: color });

    let disabled: boolean = true;
    let pages: INavPage<TPlatforms>[] | undefined;
    if (pagePlatforms) {
      const platformPages = pagePlatforms[platformKey] as INavPage<TPlatforms>[];
      disabled = !platformPages;
      pages = platformPages;
    }

    return (
      <TooltipHost content={name} id={platformKey}>
        <DefaultButton
          href={pages && this._getFirstPageUrl(pages)}
          className={classNames.platformButton}
          aria-label={name}
          /* eslint-disable-next-line react/jsx-no-bind */
          onClick={() => this._handlePlatformClick(platformKey)}
          disabled={disabled}
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

  private _getFirstPageUrl = (pages: INavPage[]): string => {
    let url = '';
    for (const page of pages) {
      if (page.url) {
        url = page.url;
        break;
      }
      if (page.pages) {
        url = this._getFirstPageUrl(page.pages);
      }

      if (url.length > 0) {
        break;
      }
    }

    return url;
  };
}
