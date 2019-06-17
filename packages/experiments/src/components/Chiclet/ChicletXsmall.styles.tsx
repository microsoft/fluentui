import { normalize } from '../../Styling';
import { IChicletXsmallStyleProps, IChicletXsmallStyles } from './ChicletXsmall.types';

export const getStyles = (styleProps: IChicletXsmallStyleProps): IChicletXsmallStyles => {
  const { theme, className, footer } = styleProps;
  const { palette } = theme;

  console.log(footer);
  return {
    root: [
      'ms-ChicletXsmall',
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
      {
        height: 30.32,
        padding: '17.44px',
        backgroundColor: '	#DCDCDC'
      }
    ],
    innerIcon: [
      {
        position: 'absolute',
        height: 10,
        alignSelf: 'baseline'
      }
    ],
    preview: [
      {
        flexBasis: '25%'
      }
    ],
    titleBox: [
      {
        marginLeft: 4,
        borderBottom: '1px solid gray',
        flexBasis: '70%'
      }
    ],
    title: [
      {
        fontSize: theme.fonts.medium.fontSize,
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: 37, // Two lines of text, making sure the third line is hidden
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ]
  };
};
