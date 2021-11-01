import { normalize, FontWeights } from '../../Styling';
import type { IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';

export const getStyles = (props: IChicletCardStyleProps): IChicletCardStyles => {
  const { theme, className } = props;
  const { palette } = theme;

  const previewWidth = ((1 / 3) * 100).toString() + '%';
  const infoWidth = ((2 / 3) * 100).toString() + '%';

  return {
    root: [
      'ms-ChicletCard',
      theme.fonts.medium,
      normalize,
      {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        backgroundColor: palette.white,
        borderRadius: 2,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        width: 576,
        height: 112,
        userSelect: 'none',
        position: 'relative',
        selectors: {
          ':hover': {
            cursor: 'pointer',
          },
        },
      },
      className,
    ],
    preview: [
      'ms-ChicletCard-preview',
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 112,
        width: previewWidth,
        backgroundColor: palette.white,
      },
    ],
    info: [
      {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
        wordWrap: 'break-word',
        width: infoWidth,
      },
    ],
    title: [
      {
        padding: '16px 16px 4px 16px',
        fontSize: 16,
        fontWeight: FontWeights.semibold,
        color: palette.neutralPrimary,
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        maxHeight: 37,
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word',
      },
    ],
    description: [
      {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 16px 0px 16px',
        fontSize: 12,
        fontWeight: FontWeights.semibold,
        lineHeight: '1.33',
        textAlign: 'left',
        color: palette.neutralSecondary,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    ],
  };
};
