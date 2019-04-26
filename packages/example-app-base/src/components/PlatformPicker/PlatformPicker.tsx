import * as React from 'react';
import { css, DefaultButton, IButtonStyles, FocusZone, FontWeights } from 'office-ui-fabric-react';
import { INavPage } from '../Nav/index';
import { IPlatformPickerProps, IPlatform } from './PlatformPicker.types';
import * as styles from './PlatformPicker.module.scss';

export class PlatformPicker<TPlatforms extends string = string> extends React.PureComponent<IPlatformPickerProps<TPlatforms>> {
  public render(): JSX.Element {
    const { activePlatform, platforms, pagePlatforms } = this.props;
    const platformButtonStyles: IButtonStyles = {
      root: {
        height: '30px'
      },
      flexContainer: {
        flexDirection: 'row-reverse'
      },
      label: {
        textAlign: 'left',
        fontWeight: FontWeights.semibold,
        margin: 0
      }
    };

    return (
      <FocusZone className={styles.platformPicker}>
        <ul className={styles.platformPickerList}>
          {Object.keys(platforms)
            .filter(platform => !!platforms[platform as TPlatforms])
            .map((platformKey: TPlatforms) => {
              const platform: IPlatform = platforms[platformKey]!;
              let disabled: boolean = true;
              let pages: INavPage<TPlatforms>[] | undefined;
              if (pagePlatforms) {
                disabled = !pagePlatforms[platformKey];
                pages = pagePlatforms[platformKey];
              }
              const icon = platform.icon;
              let iconClassName = css(styles.icon, platform.iconClassName);

              switch (icon) {
                case 'TVMonitor':
                  iconClassName = css(styles.icon, styles.webIcon, platform.iconClassName);
                  break;

                case 'WindowsLogo':
                  iconClassName = css(styles.icon, styles.windowsLogo, platform.iconClassName);
                  break;
              }

              return (
                <li key={platformKey} className={styles.platformItem}>
                  <DefaultButton
                    href={pages && this._getFirstPageUrl(pages)}
                    className={css(styles.button, platformKey === activePlatform && styles.activePlatform)}
                    iconProps={{
                      iconName: icon,
                      className: iconClassName
                    }}
                    /* tslint:disable-next-line jsx-no-lambda */
                    onClick={() => this._handlePlatformClick(platformKey)}
                    styles={platformButtonStyles}
                    disabled={disabled}
                  >
                    {platform.name}
                  </DefaultButton>
                </li>
              );
            })}
        </ul>
      </FocusZone>
    );
  }

  private _handlePlatformClick = (platformKey: TPlatforms): void => {
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
