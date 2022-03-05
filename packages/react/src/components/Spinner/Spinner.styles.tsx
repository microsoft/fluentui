import { SpinnerSize } from './Spinner.types';
import {
  hiddenContentStyle,
  keyframes,
  HighContrastSelector,
  getGlobalClassNames,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import type { ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types';

const GlobalClassNames = {
  root: 'ms-Spinner',
  circle: 'ms-Spinner-circle',
  label: 'ms-Spinner-label',
};

const spinAnimation = memoizeFunction(() =>
  keyframes({
    '0%': {
      strokeDasharray: '0px 44px',
      transform: 'rotate(0deg)',
    },
    '50%': {
      strokeDasharray: '22px 22px',
      transform: 'rotate(450deg)',
    },
    '100%': {
      strokeDasharray: '0px 44px',
      transform: 'rotate(1080deg)',
    },
  }),
);

export const getStyles = (props: ISpinnerStyleProps): ISpinnerStyles => {
  const { theme, size, className, labelPosition } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelPosition === 'top' && {
        flexDirection: 'column-reverse',
      },
      labelPosition === 'right' && {
        flexDirection: 'row',
      },
      labelPosition === 'left' && {
        flexDirection: 'row-reverse',
      },
      className,
    ],
    wrapper: [
      classNames.circle,
      size === SpinnerSize.xSmall && [
        'ms-Spinner--xSmall',
        {
          width: 12,
          height: 12,
        },
      ],
      size === SpinnerSize.small && [
        'ms-Spinner--small',
        {
          width: 16,
          height: 16,
        },
      ],
      size === SpinnerSize.medium && [
        'ms-Spinner--medium',
        {
          width: 20,
          height: 20,
        },
      ],
      size === SpinnerSize.large && [
        'ms-Spinner--large',
        {
          width: 28,
          height: 28,
        },
      ],
    ],
    svg: [
      {
        verticalAlign: 'top',
      },
    ],
    circle: [
      {
        stroke: palette.themePrimary,
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        animationName: spinAnimation(),
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        selectors: {
          [HighContrastSelector]: {
            stroke: 'Highlight',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
    ],
    label: [
      classNames.label,
      theme.fonts.small,
      {
        color: palette.themePrimary,
        margin: '8px 0 0',
        textAlign: 'center',
      },
      labelPosition === 'top' && {
        margin: '0 0 8px',
      },
      labelPosition === 'right' && {
        margin: '0 0 0 8px',
      },
      labelPosition === 'left' && {
        margin: '0 8px 0 0',
      },
    ],
    screenReaderText: hiddenContentStyle,
  };
};
