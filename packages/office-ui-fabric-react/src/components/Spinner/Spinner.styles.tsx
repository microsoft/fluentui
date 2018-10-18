import { ISpinnerStyleProps, ISpinnerStyles, SpinnerSize } from './Spinner.types';
import { hiddenContentStyle, keyframes, HighContrastSelector } from '../../Styling';

const spinAnimation: string = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});

export const getStyles = (props: ISpinnerStyleProps): ISpinnerStyles => {
  const { theme, size, className } = props;
  const { palette } = theme;

  return {
    root: ['ms-Spinner', className],
    circle: [
      'ms-Spinner-circle',
      {
        margin: 'auto',
        boxSizing: 'border-box',
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        border: '1.5px solid ' + palette.themeLight,
        borderTopColor: palette.themePrimary,
        animationName: spinAnimation,
        animationDuration: '1.3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.53,.21,.29,.67)',
        selectors: {
          [HighContrastSelector]: {
            borderTopColor: 'Highlight'
          }
        }
      },
      size === SpinnerSize.xSmall && [
        'ms-Spinner--xSmall',
        {
          width: 12,
          height: 12
        }
      ],
      size === SpinnerSize.small && [
        'ms-Spinner--small',
        {
          width: 16,
          height: 16
        }
      ],
      size === SpinnerSize.medium && [
        'ms-Spinner--medium',
        {
          width: 20,
          height: 20
        }
      ],
      size === SpinnerSize.large && [
        'ms-Spinner--large',
        {
          width: 28,
          height: 28
        }
      ]
    ],
    label: [
      'ms-Spinner-label',
      {
        color: palette.themePrimary,
        marginTop: 10,
        textAlign: 'center'
      }
    ],
    screenReaderText: hiddenContentStyle
  };
};
