import { ICalloutStyleProps, ICalloutStyles } from './Callout.types';
import {
  HighContrastSelector,
} from '../../Styling';

export function getStyles(props: ICalloutStyleProps): ICalloutStyles {
  const { theme, finalHeight, backgroundColor } = props;
  const { palette } = theme;

  return {
    root: [
      'ms-Callout',
      {
        boxShadow: '0 0 5px 0px',
        position: 'absolute',
        boxSizing: 'border-box',
        border: `1px solid ${palette.neutralLight}`,
        outline: 'transparent',
        selectors: {
          '::-moz-focus-inner': {
            border: '0'
          },
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          },
        }
      },
      props.className
    ],
    main: [
      'ms-Callout-main',
      {
        backgroundColor: backgroundColor || palette.white,
        overflowX: 'hidden',
        overflowY: !!finalHeight ? 'hidden' : 'auto',
        position: 'relative',
      }
    ],
    beak: [
      'ms-Callout-beak',
      {
        position: 'absolute',
        backgroundColor: backgroundColor || palette.white,
        boxShadow: 'inherit',
        border: 'inherit',
        boxSizing: 'border-box',
        transform: 'rotate(45deg)',
      }
    ],
    beakCurtain: [
      'ms-Callout-beakCurtain',
      {
        position: 'absolute',
        backgroundColor: palette.white,
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      }
    ],
    container: { position: 'relative' }
  }
};
