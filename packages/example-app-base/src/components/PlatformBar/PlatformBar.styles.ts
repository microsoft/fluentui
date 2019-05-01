import { getGlobalClassNames } from 'office-ui-fabric-react';
import { IPlatformBarStyleProps, IPlatformBarStyles } from './PlatformBar.types';
import { MotionDurations, MotionTimings } from '@uifabric/fluent-theme';

const GlobalClassNames: { [key in keyof IPlatformBarStyles]: string } = {
  root: 'ms-PlatformBar',
  platformGrid: 'ms-PlatformBarGrid',
  platformButton: 'ms-PlatformBarButton',
  platformIcon: 'ms-PlatformBarIcon'
};

export const getStyles = (props: IPlatformBarStyleProps): IPlatformBarStyles => {
  const { theme, className, platformColor } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        background: '#50E3C2',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      className
    ],

    platformGrid: [
      classNames.platformGrid,
      {
        display: 'inline-flex',
        justifyContent: 'flex-end',
        flex: '1 0 auto',
        margin: 0
      }
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
        transition: `background ${MotionDurations.duration1} ${MotionTimings.decelerate}`,

        selectors: {
          '&:hover': {
            background: palette.themeLight
          }
        }
      }
    ],

    platformIcon: [
      classNames.platformIcon,
      {
        fontSize: 32,
        color: palette.black,

        selectors: {
          svg: {
            width: 32,
            height: 32
          },
          path: {
            stroke: palette.black
          }
        }
      }
    ]
  };
};
