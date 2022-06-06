import * as React from 'react';
import { css, FocusZone, FontWeights, HighContrastSelector } from '@fluentui/react';
import { DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { INavPage } from '../Nav/index';
import { IPlatformPickerProps, IPlatform } from './PlatformPicker.types';
import * as styles from './PlatformPicker.module.scss';

export class PlatformPicker<TPlatforms extends string = string> extends React.PureComponent<
  IPlatformPickerProps<TPlatforms>
> {
  public render(): JSX.Element {
    const { activePlatform, platforms, pagePlatforms } = this.props;

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
              const { icon, color = '#0078d4' } = platform;
              const iconClassName = css(styles.icon, platform.iconClassName);

              return (
                <li key={platformKey} className={styles.platformItem}>
                  <DefaultButton
                    href={pages && this._getFirstPageUrl(pages)}
                    className={css(styles.button, platformKey === activePlatform && styles.activePlatform)}
                    iconProps={{
                      iconName: platform.name !== 'Web Components' ? icon : '', // Hide icon to help label fit
                      className: iconClassName,
                    }}
                    /* eslint-disable-next-line react/jsx-no-bind */
                    onClick={() => this._handlePlatformClick(platformKey)}
                    styles={{
                      ...this._platformButtonStyles(color),
                      ...(platformKey === activePlatform && this._activePlatformButtonStyles(color)),
                    }}
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

  // @TODO: convert PlatformPicker to css-in-js and get rid of this method.
  private _platformButtonStyles = (color?: string): IButtonStyles => ({
    root: {
      height: '30px',
      selectors: {
        '&:not([disabled])': {
          background: 'transparent',
        },
        '&:hover:not([disabled])': {
          background: 'transparent',
          borderColor: color,
          color: 'black',
        },
      },
    },
    flexContainer: {
      flexDirection: 'row-reverse',
    },
    label: {
      textAlign: 'left',
      fontWeight: FontWeights.semibold,
      // fontSize: 10,
      margin: 0,
    },
  });

  private _activePlatformButtonStyles = (color?: string): IButtonStyles => ({
    root: {
      selectors: {
        '&:not([disabled]), &:hover:not([disabled])': {
          background: color,
          borderColor: color,

          selectors: {
            [HighContrastSelector]: {
              borderColor: 'Highlight',
              background: 'Window',
            },
          },
        },
      },
    },
  });

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
