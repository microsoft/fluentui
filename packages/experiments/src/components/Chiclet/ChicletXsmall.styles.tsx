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
        width: 28.64,
        left: 3,
        bottom: 36,
        padding: '17.44px',
        position: 'absolute',
        backgroundColor: '	#DCDCDC'
      }
    ],
    title: [
      {
        padding: '9px 2px 0px 76px',
        fontSize: theme.fonts.medium.fontSize,
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: 37, // Two lines of text, making sure the third line is hidden
        width: 150,
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ],
    line: [
      {
        marginLeft: '75px',
        marginRight: '5px',
        marginTop: '13px',
        marginBottom: '0px'
      }
    ]
  };
};
