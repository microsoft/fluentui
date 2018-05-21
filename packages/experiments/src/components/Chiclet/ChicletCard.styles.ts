import {
  normalize
} from '../../Styling';
import { IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';

export const getStyles = (
  props: IChicletCardStyleProps
): IChicletCardStyles => {
  const { theme } = props;
  const { palette } = theme;

  return ({
    root: [
      'ms-Chiclet',
      normalize,
      {
        WebkitFontSmoothing: 'antialiased',
        backgroundColor: palette.white,
        borderRadius: '2px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        width: '600px',
        height: '126px',
        userSelect: 'none',
        position: 'relative',
        selectors: {
          ':hover': {
            cursor: 'pointer'
          }
        }
      }
    ],
    icon: [
      'ms-ChicletCardPreview-icon',
      {
        height: '24px',
        left: '10px',
        bottom: '10px',
        position: 'absolute'
      }
    ],
    preview: [
      'ms-ChicletCardPreview',
      {
        float: 'left',
        height: '122px',
        width: '198px',
        position: 'relative',
        backgroundColor: palette.white,
        display: 'block',
        padding: '2px 0px 2px 2px',
      }
    ],
    info: [
      'ms-ChicletCardInfo',
      {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
        wordWrap: 'break-word',
        width: '400px'
      }
    ],
    title: [
      'ms-ChicletCardTitle',
      {
        padding: '9px 26px 5px 11px',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: '41px', // Two lines of text, making sure the third line is hidden
        width: '363px',
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ],
    description: [
      'ms-ChicletCardLink',
      {
        padding: '0px 16px 17px 11px',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: '1.33',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#797671', // @todo: get theme from designers
        width: '248px',
        height: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ]
  });
};