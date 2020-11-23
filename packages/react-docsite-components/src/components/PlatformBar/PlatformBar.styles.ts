import { getGlobalClassNames, getColorFromString, getShade, Shade } from '@fluentui/react';
import { IPlatformBarStyleProps, IPlatformBarStyles } from './PlatformBar.types';
import { MotionDurations, MotionTimings } from '@fluentui/theme';

const GlobalClassNames: { [key in keyof IPlatformBarStyles]: string } = {
  root: 'ms-PlatformBar',
  inner: 'ms-PlatformBarInner',
  platformGrid: 'ms-PlatformBarGrid',
  platformButton: 'ms-PlatformBarButton',
  platformIcon: 'ms-PlatformBarIcon',
};

export const getStyles = (props: IPlatformBarStyleProps): IPlatformBarStyles => {
  const { theme, className, platformColor, innerWidth } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const platformColorObj = platformColor && getColorFromString(platformColor);
  const platformShade = platformColorObj && getShade(platformColorObj, Shade.Shade7);

  return {
    root: [
      classNames.root,
      {
        background: '#50E3C2',
      },
      className,
    ],

    inner: [
      classNames.inner,
      {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '0 auto',
        maxWidth: innerWidth,
      },
    ],

    platformGrid: [
      classNames.platformGrid,
      {
        display: 'inline-flex',
        justifyContent: 'flex-end',
        flex: '1 0 auto',
        margin: 0,
      },
    ],

    platformButton: [
      classNames.platformButton,
      {
        background: platformColor ? platformColor : palette.themePrimary,
        width: 96,
        height: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 0,
        borderRadius: 0,
        transition: `background ${MotionDurations.duration2} ${MotionTimings.decelerate}`,

        selectors: {
          '&:hover, &:active, &:active:hover': {
            background: platformShade ? platformShade.str : palette.themeLight,
          },
        },
      },
    ],

    platformIcon: [
      classNames.platformIcon,
      {
        fontSize: 32,
        color: palette.black,

        selectors: {
          svg: {
            width: 32,
            height: 32,
          },
          path: {
            stroke: palette.black,
          },
        },
      },
    ],
  };
};
