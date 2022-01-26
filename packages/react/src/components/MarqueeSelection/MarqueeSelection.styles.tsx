import { HighContrastSelector } from '../../Styling';
import type { IMarqueeSelectionStyleProps, IMarqueeSelectionStyles } from './MarqueeSelection.types';

export const getStyles = (props: IMarqueeSelectionStyleProps): IMarqueeSelectionStyles => {
  const { theme, className } = props;
  const { palette } = theme;

  return {
    root: [
      className,
      {
        position: 'relative',
        cursor: 'default',
      },
    ],
    dragMask: [
      {
        position: 'absolute',
        background: 'rgba(255, 0, 0, 0)',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        selectors: {
          [HighContrastSelector]: {
            background: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    ],
    box: [
      {
        position: 'absolute',
        boxSizing: 'border-box',
        border: `1px solid ${palette.themePrimary}`,
        pointerEvents: 'none',
        zIndex: 10,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight',
          },
        },
      },
    ],
    boxFill: [
      {
        position: 'absolute',
        boxSizing: 'border-box',
        backgroundColor: palette.themePrimary,
        opacity: 0.1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        selectors: {
          [HighContrastSelector]: {
            background: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    ],
  };
};
