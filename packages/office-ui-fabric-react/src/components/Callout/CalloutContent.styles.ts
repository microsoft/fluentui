import { HighContrastSelector, IRawStyle, focusClear, getGlobalClassNames } from '../../Styling';
import { ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';

function getBeakStyle(beakWidth?: number): IRawStyle {
  return {
    height: beakWidth,
    width: beakWidth
  };
}

const GlobalClassNames = {
  container: 'ms-Callout-container',
  root: 'ms-Callout',
  beak: 'ms-Callout-beak',
  beakCurtain: 'ms-Callout-beakCurtain',
  calloutMain: 'ms-Callout-main'
};

export const getStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  const { theme, className, overflowYHidden, calloutWidth, beakWidth, backgroundColor, calloutMaxWidth } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const { palette } = theme;
  return {
    container: [
      classNames.container,
      {
        position: 'relative'
      }
    ],
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        position: 'absolute',
        boxSizing: 'border-box',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.neutralLight,
        boxShadow: '0 0 5px 0px rgba(0,0,0,0.4)',
        selectors: {
          [HighContrastSelector]: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'WindowText'
          }
        }
      },
      focusClear(),
      className,
      !!calloutWidth && { width: calloutWidth },
      !!calloutMaxWidth && { maxWidth: calloutMaxWidth }
    ],
    beak: [
      classNames.beak,
      {
        position: 'absolute',
        backgroundColor: palette.white,
        boxShadow: 'inherit',
        border: 'inherit',
        boxSizing: 'border-box',
        transform: 'rotate(45deg)'
      },
      getBeakStyle(beakWidth),
      backgroundColor && {
        backgroundColor: backgroundColor
      }
    ],
    beakCurtain: [
      classNames.beakCurtain,
      {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: palette.white
      }
    ],
    calloutMain: [
      classNames.calloutMain,
      {
        backgroundColor: palette.white,
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative'
      },
      overflowYHidden && {
        overflowY: 'hidden'
      },
      backgroundColor && {
        backgroundColor: backgroundColor
      }
    ]
  };
};
