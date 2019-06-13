import { normalize } from '../../Styling';
import { IChicletXsmallStyleProps, IChicletXsmallStyles } from './ChicletXsmall.types';

export const getStyles = (props: IChicletXsmallStyleProps): IChicletXsmallStyles => {
  const { theme, className } = props;
  const { palette } = theme;

  return {
    root: [
      'ms-ChicletXsmall',
      theme.fonts.xSmall,
      normalize,
      {
        backgroundColor: palette.white,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        padding: 4,
        width: 250,
        height: 103,
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
        float: 'left',
        height: 30.32,
        padding: '17.44px',
        backgroundColor: '	#DCDCDC'
      }
    ],
    titleBox: [
      {
        float: 'left',
        marginLeft: 4,
        borderBottom: '1px solid gray',
        height: 63,
        width: 170
      }
    ],
    title: [
      {
        float: 'left',
        fontSize: theme.fonts.medium.fontSize,
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: 37, // Two lines of text, making sure the third line is hidden
        width: 170,
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ]
  };
};
