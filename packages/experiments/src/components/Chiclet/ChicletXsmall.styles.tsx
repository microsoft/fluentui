import { normalize, getGlobalClassNames } from '../../Styling';
import { IChicletXsmallStyleProps, IChicletXsmallStyles } from './ChicletXsmall.types';

const GlobalClassNames = {
  root: 'ms-ChicletXsmall',
  icon: 'ms-ChicletXsmall-icon',
  innerIcon: 'ms-Chiclet-innerIcon',
  preview: 'ms-ChicletXsmall-preview',
  titleBox: 'ms-ChicletXsmall-titleBox',
  title: 'ms-ChicletXsmall-title'
};

export const getStyles = (styleProps: IChicletXsmallStyleProps): IChicletXsmallStyles => {
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
        width: 250,
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative',
        selectors: {
          ':hover': {
            cursor: 'pointer'
          }
        }
      },
      className
    ],
    icon: [
      classNames.icon,
      {
        height: 30.32,
        padding: '17.44px',
        // revisit
        backgroundColor: theme.palette.neutralLight
      }
    ],
    innerIcon: [
      classNames.innerIcon,
      {
        position: 'absolute',
        height: 10,
        alignSelf: 'baseline'
      }
    ],
    preview: [
      classNames.preview,
      {
        flexBasis: '25%'
      }
    ],
    titleBox: [
      classNames.titleBox,
      {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 4,
        flexBasis: '70%'
      },
      footerProvided && {
        borderBottom: '1px solid gray'
      }
    ],
    url: [
      {
        fontSize: theme.fonts.small.fontSize,
        width: 170,
        height: 17,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ],
    title: [
      classNames.title,
      {
        fontSize: theme.fonts.medium.fontSize,
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        width: 170,
        height: 37, // Two lines of text, making sure the third line is hidden
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ]
  };
};
