import {
  HighContrastSelector
} from '../../Styling';
import { ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';

export const getStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  const {
    theme,
    className,
    directionalClassname,
    overflowYHidden,
    calloutWidth,
    contentMaxHeight,
    positions
  } = props;

  const { palette } = theme;
  return {
    container: [
      'ms-Callout-container',
      {
        position: 'relative',
      }
    ],
    root: [
      'ms-Callout',
      {
        position: 'absolute',
        boxSizing: 'border-box',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.neutralLight,
        selectors: {
          [HighContrastSelector]: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'WindowText',
          }
        }
      },
      !!calloutWidth && { width: calloutWidth },
      !positions && {
        opacity: 0,
        filter: 'opacity(0)',
      },
      positions && {
        top: positions.elementPosition.top,
        bottom: positions.elementPosition.bottom,
        left: positions.elementPosition.left,
        right: positions.elementPosition.right,
      },
      className,
      directionalClassname
    ],
    beak: [
      'ms-Callout-beak',
      {
        position: 'absolute',
        backgroundColor: palette.white,
        boxShadow: 'inherit',
        border: 'inherit',
        boxSizing: 'border-box',
        // -webkit-transform: rotate(45deg); TODO
        // -ms-transform: rotate(45deg); TODO
        transform: 'rotate(45deg)'
      }
    ],
    beakCurtain: [
      {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: palette.white,
      }
    ],
    calloutMain: [
      'ms-Callout-main',
      {
        backgroundColor: palette.white,
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
      },
      !!contentMaxHeight && { width: contentMaxHeight },
      overflowYHidden && {
        overflowY: 'hidden'
      }
    ],
  };
};