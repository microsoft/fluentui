import { normalize, getGlobalClassNames, FontWeights } from '../../Styling';
import type { IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';

const GlobalClassNames = {
  root: 'ms-ChicletXsmall',
  icon: 'ms-ChicletXsmall-icon',
  innerIcon: 'ms-ChicletXsmall-innerIcon',
  preview: 'ms-ChicletXsmall-preview',
  info: 'ms-ChicletXsmall-info',
  title: 'ms-ChicletXsmall-title',
};

export const getStyles = (styleProps: IChicletCardStyleProps): IChicletCardStyles => {
  const { theme, className, footerProvided } = styleProps;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.xSmall,
      normalize,
      {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: palette.white,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        padding: 4,
        paddingBottom: 0,
        width: 250,
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative',
        selectors: {
          ':hover': {
            cursor: 'pointer',
          },
        },
      },
      className,
    ],
    icon: [
      classNames.icon,
      {
        // @todo: change values for height, width, and padding according to redline
        height: 29,
        width: 29,
        padding: '17.44px',
        backgroundColor: theme.palette.neutralLight,
      },
    ],
    preview: [
      classNames.preview,
      {
        // @todo: change value for width according to redline
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        width: 59,
      },
      !footerProvided && {
        marginBottom: 4,
      },
    ],
    info: [
      classNames.info,
      {
        // @todo: change values for height and width according to redline
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 10,
        width: 170,
        height: 63,
      },
      footerProvided && {
        borderBottom: '1px solid gray',
      },
    ],
    url: [
      {
        fontSize: theme.fonts.small.fontSize,
        // @todo: change values for height and width according to redline
        width: 170,
        height: 15,
        fontWeight: FontWeights.semibold,
        color: palette.neutralSecondary,
        paddingBottom: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    ],
    title: [
      classNames.title,
      {
        fontSize: theme.fonts.medium.fontSize,
        letterSpacing: 'normal',
        textAlign: 'left',
        fontWeight: FontWeights.semibold,
        color: palette.neutralPrimary,
        width: 170,
        height: 35, // Two lines of text, making sure the third line is hidden
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word',
      },
    ],
  };
};
