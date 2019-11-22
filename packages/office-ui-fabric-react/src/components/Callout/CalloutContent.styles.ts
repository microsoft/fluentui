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

  const { semanticColors, effects } = theme;

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
        borderRadius: effects.roundedCorner2,
        boxShadow: effects.elevation16,
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
        backgroundColor: semanticColors.menuBackground,
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
        backgroundColor: semanticColors.menuBackground,
        borderRadius: effects.roundedCorner2
      }
    ],
    calloutMain: [
      classNames.calloutMain,
      {
        backgroundColor: semanticColors.menuBackground,
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        borderRadius: effects.roundedCorner2
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
