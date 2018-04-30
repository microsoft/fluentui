import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  concatStyleSets,
  getTheme
} from '../../Styling';
import { IChicletCardStyles } from './ChicletCard.types';

const ChicletCardTitleLineHeight = '21px';

/* Actions */
const msChicletCardActionsActionSize = '34px';
const msChicletCardActionsHorizontalPadding = '12px';
const msChicletCardActionsVerticalPadding = '2px';

export const getClassNames = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IChicletCardStyles
): IChicletCardStyles => {
  const styles: IChicletCardStyles = {
    root: {
      WebkitFontSmoothing: 'antialiased',
      backgroundColor: theme.palette.white,
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
    },
    icon: [
      'ms-DocumentCardPreview-icon',
      {
        padding: '10px 166px 8px 8px',
        //bottom: '10px',
        position: 'absolute',
        color: '#166EBE'
      }
    ],
    preview: [
      'ms-ChicletCardPreview',
      {
        float: 'left',
        height: '122px',
        width: '198px',
        position: 'relative',
        //opacity: '0.02',
        overflow: 'hidden', // need to fix
        backgroundColor: theme.palette.white,
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
        //lineHeight: '21px',
        overflow: 'hidden',
        wordWrap: 'break-word',
        weight: '400px'
      }
    ],
    title: [
      'ms-ChicletCardTitle',
      {
        padding: '9px 26px 5px 11px',
        //font: theme.fonts.large,
        fontSize: '16px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        color: theme.palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: '41px', // Two lines of text, making sure the third line is hidden
        width: '363px',
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ],
    link: [
      'ms-ChicletCardLink',
      {
        padding: '0px 16px 25px 11px',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: '1.33',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#797671',
        width: '248px',
        height: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ],
    actions: [
      'ms-ChicletFooter',
      {
        paddingRight: '6px',
        height: '24px',
        position: 'relative'
      }
    ],
    action: [
      'ms-ChicletFooter-action',
      {
        float: 'right',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        backgroundColor: theme.palette.white,
        color: '#0078D7'
      }
    ]
  };

  return concatStyleSets(styles, customStyles)!;

});