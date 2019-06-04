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
        WebkitFontSmoothing: 'antialiased',
        backgroundColor: palette.white,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
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
        left: 10,
        bottom: 10,
        position: 'absolute'
      }
    ],
    /*preview: [
      {
        float: 'left',
        height: 122,
        width: 198,
        position: 'relative',
        backgroundColor: palette.white,
        display: 'block',
        padding: '2px 0px 2px 2px'
      }
    ],*/
    info: [
      {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
        wordWrap: 'break-word',
        width: 400
      }
    ],
    title: [
      {
        padding: '9px 26px 5px 100px',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: 37, // Two lines of text, making sure the third line is hidden
        width: 150,
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ]
  };
};
